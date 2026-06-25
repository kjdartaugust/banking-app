import type { Metadata } from "next";
import { CalendarClock, Video, Building2, Headphones, Check } from "lucide-react";
import { NexusNav } from "@/components/home/nexus-nav";
import { SiteFooter } from "@/components/home/site-footer";
import { ScheduleForm } from "@/components/home/schedule-form";

export const metadata: Metadata = { title: "Schedule a Meeting — Nexus Bank" };

const formats = [
  { icon: Video, title: "Virtual", body: "Meet a specialist over secure video, from anywhere." },
  { icon: Building2, title: "In branch", body: "Sit down with an advisor at a location near you." },
  { icon: Headphones, title: "Phone", body: "Prefer to talk it through? We’ll call you." },
];

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-nexus-ink">
      <NexusNav />

      <section className="bg-nexus-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-nexus-aqua">
            <CalendarClock className="h-4 w-4" /> Schedule a meeting
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Talk to a Nexus specialist
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">
            Get personalized guidance on banking, lending, or investing — book a time
            that works for you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Choose how you meet</h2>
            <div className="mt-5 space-y-4">
              {formats.map((f) => (
                <div key={f.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-nexus-navy text-white">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold">{f.title}</h3>
                    <p className="text-sm text-slate-600">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-600">
              {["No cost, no obligation", "Typically 30 minutes", "Confirmation by email"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-nexus-cobalt" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight">Request a time</h2>
            <ScheduleForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
