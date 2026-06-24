"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";
import { signIn } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submit-button";

export function HeroLoginCard() {
  const [state, formAction] = useFormState(signIn, null);

  return (
    <div className="animate-float">
      <div className="glass p-7 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Sign in securely</h2>
            <p className="text-xs text-muted-foreground">
              Access your accounts in seconds
            </p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="redirect" value="/dashboard" />
          <div>
            <label className="label" htmlFor="hero-email">
              Username / Email
            </label>
            <input
              id="hero-email"
              name="email"
              type="email"
              required
              className="input"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="label" htmlFor="hero-password">
              Password
            </label>
            <input
              id="hero-password"
              name="password"
              type="password"
              required
              className="input"
              placeholder="••••••••"
            />
          </div>

          {state?.error && (
            <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
              {state.error}
            </p>
          )}

          <SubmitButton>Sign in</SubmitButton>
        </form>

        <div className="mt-5 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> 256-bit encryption
          </span>
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Open an account →
          </Link>
        </div>
      </div>
    </div>
  );
}
