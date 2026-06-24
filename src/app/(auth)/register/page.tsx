"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { signUp } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submit-button";

export default function RegisterPage() {
  const [state, formAction] = useFormState(signUp, null);

  return (
    <div className="card p-8">
      <h1 className="text-2xl font-bold">Open an account</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        It takes less than two minutes.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label className="label" htmlFor="full_name">
            Full name
          </label>
          <input id="full_name" name="full_name" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="input"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            At least 8 characters.
          </p>
        </div>

        {state?.error && (
          <p className="rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">
            {state.error}
          </p>
        )}

        <SubmitButton>Create account</SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
}
