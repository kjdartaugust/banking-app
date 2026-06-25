"use client";

import { useFormState } from "react-dom";
import { updateProfile, updatePassword } from "@/app/actions/profile";
import { SubmitButton } from "@/components/submit-button";
import type { Profile } from "@/lib/types";

function Notice({ state }: { state: { error?: string; success?: string } | null }) {
  if (state?.error)
    return (
      <p className="rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">
        {state.error}
      </p>
    );
  if (state?.success)
    return (
      <p className="rounded-md bg-success/10 px-3 py-2 text-sm text-success">
        {state.success}
      </p>
    );
  return null;
}

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, action] = useFormState(updateProfile, null);

  return (
    <form action={action} className="card space-y-4 p-6">
      <div>
        <h2 className="font-semibold">Personal details</h2>
        <p className="text-sm text-muted-foreground">
          Update your name and contact number.
        </p>
      </div>
      <div>
        <label className="label" htmlFor="full_name">Full name</label>
        <input
          id="full_name"
          name="full_name"
          required
          defaultValue={profile.full_name ?? ""}
          className="input"
        />
      </div>
      <div>
        <label className="label" htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={profile.phone ?? ""}
          placeholder="+1 (555) 000-0000"
          className="input"
        />
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input
          id="email"
          value={profile.email ?? ""}
          disabled
          className="input cursor-not-allowed opacity-60"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Email is your sign-in identity and can&apos;t be changed here.
        </p>
      </div>
      <Notice state={state} />
      <SubmitButton className="btn-primary">Save changes</SubmitButton>
    </form>
  );
}

export function PasswordForm() {
  const [state, action] = useFormState(updatePassword, null);

  return (
    <form action={action} className="card space-y-4 p-6">
      <div>
        <h2 className="font-semibold">Password</h2>
        <p className="text-sm text-muted-foreground">
          Choose a strong password you don&apos;t use elsewhere.
        </p>
      </div>
      <div>
        <label className="label" htmlFor="password">New password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className="input"
        />
      </div>
      <div>
        <label className="label" htmlFor="confirm">Confirm new password</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          className="input"
        />
      </div>
      <Notice state={state} />
      <SubmitButton className="btn-primary">Update password</SubmitButton>
    </form>
  );
}
