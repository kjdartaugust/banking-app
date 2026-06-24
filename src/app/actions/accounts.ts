"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { generateAccountNumber } from "@/lib/utils";
import type { AccountType } from "@/lib/types";

export async function openAccount(_prev: unknown, formData: FormData) {
  const type = String(formData.get("type")) as AccountType;
  if (!["checking", "savings", "loan"].includes(type)) {
    return { error: "Invalid account type." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const interest = type === "savings" ? 3.5 : type === "loan" ? 8.5 : 0;

  const { error } = await supabase.from("accounts").insert({
    user_id: user.id,
    account_number: generateAccountNumber(),
    type,
    interest_rate: interest,
  });

  if (error) return { error: error.message };

  revalidatePath("/accounts");
  revalidatePath("/dashboard");
  return { success: `New ${type} account opened.` };
}
