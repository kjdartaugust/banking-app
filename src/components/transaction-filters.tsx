"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const types = ["all", "transfer", "deposit", "withdrawal", "interest", "fee"];

export function TransactionFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value && value !== "all") next.set(key, value);
      else next.delete(key);
      router.replace(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router]
  );

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label className="label text-xs">Type</label>
        <select
          className="input h-9 py-1"
          defaultValue={params.get("type") ?? "all"}
          onChange={(e) => update("type", e.target.value)}
        >
          {types.map((t) => (
            <option key={t} value={t} className="capitalize">
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label text-xs">From date</label>
        <input
          type="date"
          className="input h-9 py-1"
          defaultValue={params.get("from") ?? ""}
          onChange={(e) => update("from", e.target.value)}
        />
      </div>
      <div>
        <label className="label text-xs">To date</label>
        <input
          type="date"
          className="input h-9 py-1"
          defaultValue={params.get("to") ?? ""}
          onChange={(e) => update("to", e.target.value)}
        />
      </div>
      <button
        className="btn-outline h-9"
        onClick={() => router.replace(pathname)}
        type="button"
      >
        Clear
      </button>
    </div>
  );
}
