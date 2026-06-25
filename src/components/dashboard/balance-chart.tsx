"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface BalancePoint {
  month: string;
  value: number;
}

export function BalanceChart({ data }: { data: BalancePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1652F0" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#1652F0" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={56}
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          cursor={{ stroke: "#1652F0", strokeWidth: 1, strokeDasharray: "4 4" }}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid hsl(var(--border))",
            background: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
            fontSize: 13,
            boxShadow: "0 10px 30px -12px rgba(10,22,40,0.3)",
          }}
          formatter={(v: number) => [
            `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
            "Net worth",
          ]}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#1652F0"
          strokeWidth={2.5}
          fill="url(#balanceFill)"
          dot={false}
          activeDot={{ r: 5, fill: "#1652F0" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
