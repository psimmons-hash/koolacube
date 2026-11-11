import "server-only";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { PermissionKey } from "@/lib/rbac";

/** Verify the session and database-owned role at every privileged action boundary. */
export async function requireAdminPermission(permission: PermissionKey | "admin_only" | "authenticated") {
  const session = await createClient();
  const { data: { user }, error: authError } = await session.auth.getUser();
  if (authError || !user) throw new Error("Authentication required");

  const admin = createAdminClient();
  const { data: profile, error } = await admin
    .from("user_profiles")
    .select("role, permissions")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error || !profile || !["admin", "employee"].includes(profile.role)) {
    throw new Error("Access denied");
  }
  if (profile.role !== "admin" && permission !== "authenticated" &&
      (permission === "admin_only" || !Array.isArray(profile.permissions) || !profile.permissions.includes(permission))) {
    throw new Error("Access denied");
  }
  return { user, admin };
}
