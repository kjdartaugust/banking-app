"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function transferFunds(_prev: unknown, formData: FormData) {
  const fromAccount = String(formData.get("from_account"));
  const toAccountNumber = String(formData.get("to_account_number")).trim();
  const amount = Number(formData.get("amount"));
  const description = String(formData.get("description") || "").trim() || null;

  if (!fromAccount) return { error: "Select a source account." };
  if (!toAccountNumber) return { error: "Enter a destination account number." };
  if (!amount || amount <= 0) return { error: "Enter a valid amount." };

  const supabase = createClient();
  const { error } = await supabase.rpc("transfer_funds", {
    p_from_account: fromAccount,
    p_to_account_number: toAccountNumber,
    p_amount: amount,
    p_description: description,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  revalidatePath("/accounts");
  return { success: `Transferred successfully to ${toAccountNumber}.` };
}
