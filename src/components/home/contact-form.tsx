"use client";

import { useFormState } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { SubmitButton } from "@/components/submit-button";

export function ContactForm() {
  const [state, action] = useFormState(submitContact, null);

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-nexus-cobalt" />
        <h3 className="mt-4 text-lg font-bold text-nexus-ink">Message sent</h3>
        <p className="mt-2 text-sm text-slate-600">{state.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">Full name</label>
          <input id="name" name="name" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="input" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="topic">Topic</label>
        <select id="topic" name="topic" className="input" defaultValue="My account">
          <option>My account</option>
          <option>Transfers & payments</option>
          <option>Cards</option>
          <option>Loans & lending</option>
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label className="label" htmlFor="message">How can we help?</label>
        <textarea id="message" name="message" required rows={4} className="input resize-none" />
      </div>
      {state?.error && (
        <p className="rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">{state.error}</p>
      )}
      <SubmitButton className="btn-primary w-full">Send message</SubmitButton>
    </form>
  );
}
