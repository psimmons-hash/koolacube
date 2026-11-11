const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.join(__dirname, '..');
const src = fs.existsSync(path.join(root, 'src/lib')) ? path.join(root, 'src') : root;
function load(file, mocks) {
  const source = fs.readFileSync(path.join(src, file), 'utf8');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const exports = {};
  vm.runInNewContext(js, { exports, require(name) { if (name in mocks) return mocks[name]; throw new Error(`Unexpected dependency: ${name}`); }, process, Date, Array, Error });
  return exports;
}
function guard({ user = { id: 'verified-user', email: 'admin@example.test' }, authError = null, profile = { role: 'admin', permissions: [] }, dbError = null } = {}) {
  const seen = [];
  const admin = { from(table) { seen.push(['table', table]); return { select() { return this; }, eq(key, value) { seen.push([key, value]); return this; }, async maybeSingle() { return { data: profile, error: dbError }; } }; } };
  const mod = load('lib/supabase/require-permission.ts', {
    'server-only': {},
    '@/lib/supabase/server': { createClient: async () => ({ auth: { getUser: async () => ({ data: { user }, error: authError }) } }) },
    '@/lib/supabase/admin': { createAdminClient: () => { seen.push(['admin-client']); return admin; } },
  });
  return { ...mod, seen };
}
test('anonymous and invalid sessions never obtain a privileged client', async () => {
  for (const settings of [{ user: null }, { authError: new Error('expired') }]) {
    const g = guard(settings);
    await assert.rejects(g.requireAdminPermission('admin_only'), /Authentication required/);
    assert.equal(g.seen.length, 0);
  }
});
test('employee cannot manage users even with a forged admin_only permission', async () => {
  const g = guard({ profile: { role: 'employee', permissions: ['admin_only', 'maintenance'] } });
  await assert.rejects(g.requireAdminPermission('admin_only'), /Access denied/);
  await g.requireAdminPermission('maintenance');
  await assert.rejects(g.requireAdminPermission('settings'), /Access denied/);
});
test('missing, invalid, and unreadable profiles fail closed', async () => {
  for (const settings of [{ profile: null }, { profile: { role: 'owner', permissions: [] } }, { dbError: new Error('unavailable') }]) {
    await assert.rejects(guard(settings).requireAdminPermission('admin_only'), /Access denied/);
  }
});
test('administrator retains all permissions and lookup uses the verified user ID', async () => {
  const g = guard();
  const result = await g.requireAdminPermission('admin_only');
  assert.equal(result.user.id, 'verified-user');
  assert.ok(g.seen.some(x => x[0] === 'user_id' && x[1] === 'verified-user'));
});
for (const [area, permission] of [['users', 'admin_only'], ['maintenance', 'maintenance']]) {
  if (!fs.existsSync(path.join(src, `app/admin/${area}/actions.ts`))) continue;
  test(`every ${area} action denies access before database, email, logging or cache effects`, async () => {
    let checks = 0;
    const actions = load(`app/admin/${area}/actions.ts`, {
      '@/lib/supabase/require-permission': { requireAdminPermission: async p => { assert.equal(p, permission); checks++; throw new Error('Access denied'); } },
      '@/lib/supabase/admin': { createAdminClient: () => { assert.fail('privileged client used before authorization'); } },
      '@/lib/supabase/logging': { logActivity: () => { assert.fail('logging called before authorization'); } },
      'next/cache': { revalidatePath: () => { assert.fail('cache changed before authorization'); } },
    });
    assert.ok(Object.keys(actions).length > 0);
    for (const action of Object.values(actions)) await assert.rejects(action(), /Access denied/);
    assert.equal(checks, Object.keys(actions).length);
  });
}
if (fs.existsSync(path.join(src, 'lib/contact-validation.ts'))) {
  test('contact validation rejects invalid types, header injection and oversized input', () => {
    const { validateContactBody } = load('lib/contact-validation.ts', {});
    const valid = { firstName: 'Test', lastName: 'Customer', email: 'customer@example.test', service: 'Refrigeration', details: 'Please call.' };
    assert.equal(validateContactBody(valid), true);
    for (const invalid of [null, [], { ...valid, email: ['customer@example.test'] }, { ...valid, firstName: {} }, { ...valid, service: 'Repair\r\nBcc: attacker@example.test' }, { ...valid, details: 'x'.repeat(10001) }, { ...valid, email: 'invalid' }]) assert.equal(validateContactBody(invalid), false);
  });
}
