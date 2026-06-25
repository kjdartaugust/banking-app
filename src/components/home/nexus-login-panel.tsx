"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { Loader2, Fingerprint } from "lucide-react";
import { signIn } from "@/app/actions/auth";

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-nexus-navy py-3 text-sm font-bold text-white transition hover:bg-nexus-cobalt disabled:opacity-60"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      Sign in
    </button>
  );
}

export function NexusLoginPanel() {
  const [state, formAction] = useFormState(signIn, null);

  return (
    <div className="w-full rounded-2xl bg-white p-7 shadow-2xl ring-1 ring-black/5 sm:max-w-sm">
      <h2 className="text-lg font-bold text-nexus-ink">Sign in to Nexus</h2>

      <form action={formAction} className="mt-5 space-y-4">
        <input type="hidden" name="redirect" value="/dashboard" />
        <div>
          <label htmlFor="cl-user" className="mb-1 block text-xs font-semibold text-slate-600">
            Username
          </label>
          <input
            id="cl-user"
            name="email"
            type="email"
            required
            autoComplete="username"
            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-nexus-cobalt focus:ring-2 focus:ring-nexus-cobalt/20"
          />
        </div>
        <div>
          <label htmlFor="cl-pass" className="mb-1 block text-xs font-semibold text-slate-600">
            Password
          </label>
          <input
            id="cl-pass"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-nexus-cobalt focus:ring-2 focus:ring-nexus-cobalt/20"
          />
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-600">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
          Remember me
        </label>

        {state?.error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {state.error}
          </p>
        )}

        <SignInButton />
      </form>

      <Link
        href="/login"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-nexus-navy py-3 text-sm font-bold text-nexus-navy transition hover:bg-nexus-navy/5"
      >
        <Fingerprint className="h-4 w-4" /> Passwordless sign in
      </Link>

      <div className="mt-5 space-y-1.5 text-center text-xs">
        <Link href="/login" className="block text-nexus-cobalt hover:underline">
          Forgot username/password?
        </Link>
        <p className="text-slate-500">
          Not enrolled?{" "}
          <Link href="/register" className="font-semibold text-nexus-cobalt hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
