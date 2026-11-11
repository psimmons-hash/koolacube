"use server";

import { createAdminClient } from "./admin";
import { requireAdminPermission } from "./require-permission";

export type LogAction = "create" | "update" | "delete" | "login" | "logout";

export async function logActivity(
  action: LogAction,
  tableName: string,
  details: string,
  recordId?: string,
  emailOverride?: string
) {
  try {
    const { user, admin: adminClient } = await requireAdminPermission("authenticated");
    const userId = user.id;
    const userEmail = user.email ?? "";
    // Audit identity must come from the verified session, never caller input.
    void emailOverride;
    if (!["create", "update", "delete", "login", "logout"].includes(action) ||
        typeof tableName !== "string" || tableName.length > 100 ||
        typeof details !== "string" || details.length > 4000) return;

    await adminClient.from("activity_logs").insert({
      user_id: userId,
      user_email: userEmail,
      action,
      table_name: tableName,
      record_id: recordId ?? null,
      details,
    });
  } catch {
    // Logging must never break the main action.
  }
}

