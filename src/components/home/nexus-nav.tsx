"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarClock, Headphones, Search, Menu, X } from "lucide-react";
import { NexusLogo } from "@/components/home/nexus-logo";
import { products } from "@/lib/products";

const categories = products.map((p) => ({
  label: p.navLabel,
  href: `/products/${p.slug}`,
}));

export function NexusNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
      {/* Top utility bar */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-end gap-6 px-6 text-xs font-medium text-slate-600">
          <Link href="/register" className="hidden items-center gap-1.5 hover:text-nexus-navy sm:flex">
            <CalendarClock className="h-3.5 w-3.5" /> Schedule a meeting
          </Link>
          <Link href="/login" className="hidden items-center gap-1.5 hover:text-nexus-navy sm:flex">
            <Headphones className="h-3.5 w-3.5" /> Customer Service
          </Link>
          <span className="hidden text-slate-300 sm:block">|</span>
          <span className="hidden hover:text-nexus-navy sm:block">Español</span>
          <button aria-label="Search" className="text-slate-600 hover:text-nexus-navy">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b-2 border-nexus-navy/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-nexus-navy">
            <NexusLogo className="h-8 w-8 text-nexus-cobalt" />
            <span className="text-xl font-extrabold tracking-[0.18em]">NEXUS</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {categories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="border-b-2 border-transparent py-1 text-sm font-semibold text-slate-700 transition-colors hover:border-nexus-cobalt hover:text-nexus-navy"
              >
                {c.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="hidden rounded-md bg-nexus-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-nexus-cobalt sm:inline-block"
            >
              Open an account
            </Link>
            <button
              aria-label="Menu"
              className="text-nexus-navy lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-slate-100 lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-6 py-2">
              {categories.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="border-b border-slate-100 py-3 text-sm font-semibold text-slate-700"
                  onClick={() => setOpen(false)}
                >
                  {c.label}
                </Link>
              ))}
              <Link
                href="/register"
                className="mt-3 rounded-md bg-nexus-navy px-4 py-2.5 text-center text-sm font-bold text-white"
              >
                Open an account
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
