"use client";

import { useFormState } from "react-dom";
import { submitKyc } from "@/app/actions/kyc";
import { SubmitButton } from "@/components/submit-button";

export function KycForm() {
  const [state, formAction] = useFormState(submitKyc, null);

  return (
    <form action={formAction} className="card space-y-4 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="date_of_birth">
            Date of birth
          </label>
          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            required
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="id_type">
            ID type
          </label>
          <select id="id_type" name="id_type" className="input" defaultValue="passport">
            <option value="passport">Passport</option>
            <option value="drivers_license">Driver&apos;s license</option>
            <option value="national_id">National ID</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="address">
          Residential address
        </label>
        <input id="address" name="address" required className="input" />
      </div>

      <div>
        <label className="label" htmlFor="id_number">
          ID number
        </label>
        <input id="id_number" name="id_number" required className="input" />
      </div>

      <div>
        <label className="label" htmlFor="document">
          Upload ID document (optional, max 5 MB)
        </label>
        <input
          id="document"
          name="document"
          type="file"
          accept="image/*,application/pdf"
          className="input file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm"
        />
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

      <SubmitButton>Submit for verification</SubmitButton>
    </form>
  );
}
