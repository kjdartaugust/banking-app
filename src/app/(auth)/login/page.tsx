"use client";

import { Suspense } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submit-button";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [state, formAction] = useFormState(signIn, null);
  const redirect = useSearchParams().get("redirect") ?? "/dashboard";

  return (
    <div className="card p-8">
      <h1 className="text-3xl font-extrabold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to access your accounts.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <input type="hidden" name="redirect" value={redirect} />
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
            className="input"
          />
        </div>

        {state?.error && (
          <p className="rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">
            {state.error}
          </p>
        )}

        <SubmitButton>Sign in</SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary">
          Open one
        </Link>
      </p>
    </div>
  );
}
