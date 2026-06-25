"use server";

// Demo support actions — no email backend is wired up, so these validate the
// input and acknowledge receipt. Swap in an email/ticketing integration later.

export async function submitContact(_prev: unknown, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { error: "Please complete every field." };
  }
  if (!email.includes("@")) {
    return { error: "Enter a valid email address." };
  }

  return {
    success: "Thanks — we’ve received your message and will reply within 1 business day.",
  };
}

export async function submitMeeting(_prev: unknown, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const date = String(formData.get("date") || "").trim();
  const mode = String(formData.get("mode") || "Virtual");
  const topic = String(formData.get("topic") || "general banking");

  if (!name || !email || !date) {
    return { error: "Name, email, and a preferred date are required." };
  }

  const pretty = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return {
    success: `You're booked! We'll email ${email} to confirm your ${mode.toLowerCase()} ${topic} meeting on ${pretty}.`,
  };
}
