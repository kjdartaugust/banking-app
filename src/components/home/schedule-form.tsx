"use client";

import { useFormState } from "react-dom";
import { CalendarCheck } from "lucide-react";
import { submitMeeting } from "@/app/actions/contact";
import { SubmitButton } from "@/components/submit-button";

export function ScheduleForm() {
  const [state, action] = useFormState(submitMeeting, null);

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
        <CalendarCheck className="mx-auto h-12 w-12 text-nexus-cobalt" />
        <h3 className="mt-4 text-lg font-bold text-nexus-ink">Meeting requested</h3>
        <p className="mt-2 text-sm text-slate-600">{state.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="s-name">Full name</label>
          <input id="s-name" name="name" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="s-email">Email</label>
          <input id="s-email" name="email" type="email" required className="input" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="s-date">Preferred date</label>
          <input id="s-date" name="date" type="date" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="s-mode">Format</label>
          <select id="s-mode" name="mode" className="input" defaultValue="Virtual">
            <option>Virtual</option>
            <option>In branch</option>
            <option>Phone</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="s-topic">What would you like to discuss?</label>
        <select id="s-topic" name="topic" className="input" defaultValue="general banking">
          <option value="general banking">General banking</option>
          <option value="home lending">Home lending</option>
          <option value="investing">Investing & wealth</option>
          <option value="business">Business banking</option>
        </select>
      </div>
      {state?.error && (
        <p className="rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">{state.error}</p>
      )}
      <SubmitButton className="btn-primary w-full">Request meeting</SubmitButton>
    </form>
  );
}
