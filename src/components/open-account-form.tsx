"use client";

import { useFormState } from "react-dom";
import { openAccount } from "@/app/actions/accounts";
import { SubmitButton } from "@/components/submit-button";

export function OpenAccountForm() {
  const [state, formAction] = useFormState(openAccount, null);

  return (
    <form action={formAction} className="card space-y-4 p-5">
      <h2 className="font-semibold">Open a new account</h2>
      <div>
        <label className="label" htmlFor="type">
          Account type
        </label>
        <select id="type" name="type" className="input" defaultValue="checking">
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
