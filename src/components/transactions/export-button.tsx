"use client";

import { Download } from "lucide-react";
import type { Transaction } from "@/lib/types";

function csvCell(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export function ExportButton({
  transactions,
  ownedAccountIds,
  filename = "nexus-statement.csv",
}: {
  transactions: Transaction[];
  ownedAccountIds: string[];
  filename?: string;
}) {
  function handleExport() {
    const header = ["Date", "Description", "Type", "Direction", "Amount", "Status"];
    const rows = transactions.map((tx) => {
      const credit =
        tx.to_account_id != null && ownedAccountIds.includes(tx.to_account_id);
      return [
        new Date(tx.created_at).toISOString(),
        tx.description ?? tx.type,
        tx.type,
        credit ? "Credit" : "Debit",
        `${credit ? "" : "-"}${Number(tx.amount).toFixed(2)}`,
        tx.status,
      ];
    });

    const csv = [header, ...rows]
      .map((r) => r.map(csvCell).join(","))
      .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      disabled={transactions.length === 0}
      className="btn-outline"
    >
      <Download className="h-4 w-4" /> Export CSV
    </button>
  );
}
