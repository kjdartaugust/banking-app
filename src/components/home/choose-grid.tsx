import Link from "next/link";
import {
  Wallet,
  PiggyBank,
  CreditCard,
  Home,
  Car,
  LineChart,
  Plane,
  Briefcase,
} from "lucide-react";
import { Reveal } from "@/components/home/reveal";

const items = [
  { icon: Wallet, label: "Checking" },
  { icon: PiggyBank, label: "Savings & CDs" },
  { icon: CreditCard, label: "Credit Cards" },
  { icon: Home, label: "Home Loans" },
  { icon: Car, label: "Auto" },
  { icon: LineChart, label: "Investing" },
  { icon: Plane, label: "Travel" },
  { icon: Briefcase, label: "Business" },
];

export function ChooseGrid() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="text-center tracking-tight text-3xl font-bold text-nexus-ink sm:text-4xl">
            Choose what&apos;s <span className="text-nexus-aqua">right for you</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Explore products and services designed around the way you live, save,
            and grow.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.05}>
              <Link
                href="/register"
                className="group flex flex-col items-center gap-3 rounded-xl border border-slate-100 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-nexus-cobalt/30 hover:shadow-lg"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-nexus-mist text-nexus-navy transition-colors group-hover:bg-nexus-navy group-hover:text-white">
                  <item.icon className="h-7 w-7" />
                </span>
                <span className="text-sm font-bold text-nexus-ink">{item.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
