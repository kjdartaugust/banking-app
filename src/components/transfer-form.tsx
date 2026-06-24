"use client";

import { useFormState } from "react-dom";
import { transferFunds } from "@/app/actions/transfer";
import { SubmitButton } from "@/components/submit-button";
import { formatCurrency, maskAccountNumber } from "@/lib/utils";
import type { Account } from "@/lib/types";

export function TransferForm({ accounts }: { accounts: Account[] }) {
  const [state, formAction] = useFormState(transferFunds, null);
  const sources = accounts.filter((a) => a.type !== "loan" && a.status === "active");

  return (
    <form action={formAction} className="card space-y-4 p-6">
      <div>
        <label className="label" htmlFor="from_account">
          From account
        </label>
        <select id="from_account" name="from_account" className="input" required>
          {sources.length === 0 && <option value="">No eligible accounts</option>}
          {sources.map((a) => (
            <option key={a.id} value={a.id}>
              {a.type} · {maskAccountNumber(a.account_number)} ·{" "}
              {formatCurrency(a.balance, a.currency)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="to_account_number">
          To account number
        </label>
        <input
          id="to_account_number"
          name="to_account_number"
          className="input"
          placeholder="10-digit account number"
          required
        />
      </div>

      <div>
        <label className="label" htmlFor="amount">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0.01"
          className="input"
          placeholder="0.00"
          required
        />
      </div>

      <div>
        <label className="label" htmlFor="description">
          Note (optional)
        </label>
        <input id="description" name="description" className="input" />
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

      <SubmitButton>Send transfer</SubmitButton>
    </form>
  );
}
