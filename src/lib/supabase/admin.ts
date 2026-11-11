import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses RLS. Server-only. Never import into client
 * components or expose the service-role key to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

