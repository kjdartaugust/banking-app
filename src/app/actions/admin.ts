"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/data";
import type { KycStatus, AccountStatus } from "@/lib/types";

export async function setKycStatus(formData: FormData) {
  const admin = await requireAdmin();
  const userId = String(formData.get("user_id"));
  const status = String(formData.get("status")) as KycStatus;

  const db = createAdminClient();
  await db.from("profiles").update({ kyc_status: status }).eq("id", userId);
  await db
    .from("kyc_submissions")
    .update({ status, reviewed_by: admin.id })
    .eq("user_id", userId)
    .eq("status", "pending");

  revalidatePath("/admin");
}

export async function setAccountStatus(formData: FormData) {
  await requireAdmin();
  const accountId = String(formData.get("account_id"));
  const status = String(formData.get("status")) as AccountStatus;

  const db = createAdminClient();
  await db.from("accounts").update({ status }).eq("id", accountId);
  revalidatePath("/admin");
}

export async function setUserRole(formData: FormData) {
  await requireAdmin();
  const userId = String(formData.get("user_id"));
  const role = String(formData.get("role"));

  const db = createAdminClient();
  await db.from("profiles").update({ role }).eq("id", userId);
  revalidatePath("/admin");
}

/** Credits an account and records a deposit transaction (bank-funded). */
export async function fundAccount(formData: FormData) {
  await requireAdmin();
  const accountId = String(formData.get("account_id"));
  const amount = Number(formData.get("amount"));
  if (!amount || amount <= 0) return;

  const db = createAdminClient();
  const { data: account } = await db
    .from("accounts")
    .select("balance")
    .eq("id", accountId)
    .single();
  if (!account) return;

  await db
    .from("accounts")
    .update({ balance: Number(account.balance) + amount })
    .eq("id", accountId);
  await db.from("transactions").insert({
    to_account_id: accountId,
    amount,
    type: "deposit",
    description: "Bank deposit",
  });

  revalidatePath("/admin");
  revalidatePath("/dashboard");
}
