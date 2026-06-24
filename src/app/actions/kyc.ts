"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function submitKyc(_prev: unknown, formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated." };

  const dob = String(formData.get("date_of_birth"));
  const address = String(formData.get("address"));
  const idType = String(formData.get("id_type"));
  const idNumber = String(formData.get("id_number"));
  const document = formData.get("document") as File | null;

  if (!dob || !address || !idNumber) {
    return { error: "Please fill in all required fields." };
  }

  let documentUrl: string | null = null;
  if (document && document.size > 0) {
    if (document.size > 5 * 1024 * 1024) {
      return { error: "Document must be under 5 MB." };
    }
    const ext = document.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("kyc-documents")
      .upload(path, document, { upsert: true });
    if (uploadError) return { error: `Upload failed: ${uploadError.message}` };
    documentUrl = path;
  }

  const { error } = await supabase.from("kyc_submissions").insert({
    user_id: user.id,
    date_of_birth: dob,
    address,
    id_type: idType,
    id_number: idNumber,
    document_url: documentUrl,
    status: "pending",
  });
  if (error) return { error: error.message };

  await supabase.from("profiles").update({ kyc_status: "pending" }).eq("id", user.id);

  revalidatePath("/kyc");
  revalidatePath("/dashboard");
  return { success: "Verification submitted. We'll review it shortly." };
}
