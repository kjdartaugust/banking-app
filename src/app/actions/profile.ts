"use server";

import { revalidatePath } from "next/cache";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function updateProfile(_prev: unknown, formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const fullName = String(formData.get("full_name") || "").trim();
  const phone = String(formData.get("phone") || "").trim() || null;
  if (!fullName) return { error: "Name is required." };

  const db = createAdminClient();
  const { error } = await db
    .from("profiles")
    .update({ full_name: fullName, phone })
    .eq("id", user.id);
  if (error) return { error: error.message };

  revalidatePath("/settings");
  revalidatePath("/", "layout");
  return { success: "Profile updated." };
}

export async function updatePassword(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password"));
  const confirm = String(formData.get("confirm"));
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== confirm) return { error: "Passwords don't match." };

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };

  return { success: "Password updated." };
}
