"use server";

import { requireAdminPermission } from "@/lib/supabase/require-permission";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { logActivity } from "@/lib/supabase/logging";
import type { Role, PermissionKey } from "@/lib/rbac";

export async function getUserProfiles() {
  await requireAdminPermission("admin_only");
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("user_id, role, permissions");
  if (error) return [];
  return data;
}

export async function upsertUserProfile(
  userId: string,
  role: Role,
  permissions: PermissionKey[]
): Promise<{ error?: string }> {
  await requireAdminPermission("admin_only");
  const supabase = createAdminClient();
  const { error } = await supabase.from("user_profiles").upsert(
    {
      user_id: userId,
      role,
      permissions,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
  if (error) return { error: error.message };
  await logActivity("update", "users", `Updated role/permissions for ${userId}`, userId);
  revalidatePath("/admin/users");
  return {};
}

export async function createUser(data: {
  email: string;
  password: string;
  role: Role;
  permissions: PermissionKey[];
}): Promise<{ error?: string }> {
  await requireAdminPermission("admin_only");
  const supabase = createAdminClient();
  const { data: created, error } = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
  });
  if (error) return { error: error.message };

  await logActivity("create", "users", `Created user ${data.email}`, created.user?.id);
  if (created.user?.id) {
    const res = await upsertUserProfile(created.user.id, data.role, data.permissions);
    if (res.error) return res;
  }
  revalidatePath("/admin/users");
  return {};
}

export async function setUserPassword(
  userId: string,
  password: string
): Promise<{ error?: string }> {
  await requireAdminPermission("admin_only");
  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.updateUserById(userId, { password });
  if (error) return { error: error.message };
  await logActivity("update", "users", `Reset password for ${userId}`, userId);
  return {};
}

export async function deleteUser(userId: string): Promise<{ error?: string }> {
  await requireAdminPermission("admin_only");
  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.deleteUser(userId);
  if (error) return { error: error.message };
  await logActivity("delete", "users", `Deleted user ${userId}`, userId);
  revalidatePath("/admin/users");
  return {};
}

