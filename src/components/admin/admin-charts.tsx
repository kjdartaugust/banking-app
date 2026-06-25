"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface SignupPoint {
  month: string;
  count: number;
}
export interface DepositBar {
  type: string;
  amount: number;
}

const BAR_COLORS = ["#1652F0", "#0FB8C6", "#0A1628"];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
  color: "hsl(var(--card-foreground))",
  fontSize: 13,
} as const;

export function AdminCharts({
  signups,
  deposits,
}: {
  signups: SignupPoint[];
  deposits: DepositBar[];
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass p-5">
        <h2 className="mb-3 font-semibold">New users</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={signups} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={32} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip cursor={{ fill: "hsl(var(--muted) / 0.4)" }} contentStyle={tooltipStyle} formatter={(v: number) => [v, "Signups"]} />
            <Bar dataKey="count" fill="#1652F0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass p-5">
        <h2 className="mb-3 font-semibold">Deposits by account type</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={deposits} margin={{ top: 8, right: 8, left: -4, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
            <XAxis dataKey="type" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tickLine={false} axisLine={false} width={56} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip cursor={{ fill: "hsl(var(--muted) / 0.4)" }} contentStyle={tooltipStyle} formatter={(v: number) => [`$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`, "Total"]} />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {deposits.map((_, i) => (
                <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
