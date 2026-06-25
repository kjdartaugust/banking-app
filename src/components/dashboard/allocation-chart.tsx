"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export interface AllocationSlice {
  name: string;
  value: number;
}

const COLORS = ["#1652F0", "#0FB8C6", "#0A1628", "#94A3B8"];

export function AllocationChart({ data }: { data: AllocationSlice[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const slices = total > 0 ? data : [{ name: "No funds yet", value: 1 }];

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <ResponsiveContainer width={180} height={180}>
        <PieChart>
          <Pie
            data={slices}
            dataKey="value"
            innerRadius={52}
            outerRadius={84}
            paddingAngle={3}
            stroke="none"
          >
            {slices.map((_, i) => (
              <Cell key={i} fill={total > 0 ? COLORS[i % COLORS.length] : "#E2E8F0"} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
              fontSize: 13,
            }}
            formatter={(v: number, n) => [
              `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
              n,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>

      <ul className="space-y-2">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span className="text-muted-foreground">{d.name}</span>
            <span className="ml-auto pl-4 font-semibold">
              ${d.value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
