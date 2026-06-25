"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { ShieldCheck } from "lucide-react";
import { openAccount } from "@/app/actions/accounts";
import { SubmitButton } from "@/components/submit-button";

export function OpenAccountForm({ kycApproved }: { kycApproved: boolean }) {
  const [state, formAction] = useFormState(openAccount, null);

  if (!kycApproved) {
    return (
      <div className="card space-y-3 p-5">
        <h2 className="font-semibold">Open a new account</h2>
        <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-3 text-sm">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-muted-foreground">
            Verify your identity to open accounts. Once approved, your first checking
            account is opened automatically with a $300 welcome bonus.
          </p>
        </div>
        <Link href="/kyc" className="btn-primary w-full">
          Complete verification
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="card space-y-4 p-5">
      <h2 className="font-semibold">Open a new account</h2>
      <div>
        <label className="label" htmlFor="type">
          Account type
        </label>
        <select id="type" name="type" className="input" defaultValue="savings">
          <option value="checking">Checking — everyday spending</option>
          <option value="savings">Savings — 3.5% APY</option>
          <option value="loan">Loan — 8.5% APR</option>
        </select>
      </div>

      {state?.error && (
        <p className="rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded-md bg-success/10 px-3 py-2 text-sm text-success">
          {state.success}
        </p>
      )}

      <SubmitButton>Open account</SubmitButton>
    </form>
  );
}
