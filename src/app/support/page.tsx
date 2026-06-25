import type { Metadata } from "next";
import { Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { NexusNav } from "@/components/home/nexus-nav";
import { SiteFooter } from "@/components/home/site-footer";
import { ContactForm } from "@/components/home/contact-form";

export const metadata: Metadata = { title: "Customer Service — Nexus Bank" };

const channels = [
  { icon: Phone, title: "Call us", body: "1-800-NEXUS-00", note: "Mon–Sun, 7am–11pm ET" },
  { icon: Mail, title: "Email", body: "care@nexusbank.demo", note: "Replies within 1 business day" },
  { icon: Clock, title: "Hours", body: "24/7 online banking", note: "Always-on account access" },
];

const faqs = [
  {
    q: "How do I open an account?",
    a: "Select “Open an account”, register, and complete identity verification. Once approved, your checking account opens automatically with a welcome bonus.",
  },
  {
    q: "How long do transfers take?",
    a: "Internal transfers between Nexus accounts are instant and fully audited. You’ll see the new balances immediately.",
  },
  {
    q: "Is my money protected?",
    a: "Every account is guarded by row-level security and identity verification, and all data is encrypted in transit and at rest.",
  },
  {
    q: "How do I reset my password?",
    a: "Go to Settings → Password while signed in, or use “Forgot username/password?” on the sign-in screen.",
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-nexus-ink">
      <NexusNav />

      <section className="bg-nexus-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-nexus-aqua">
            <MessageSquare className="h-4 w-4" /> Customer Service
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            We&apos;re here to help
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">
            Reach a real person, find quick answers, or send us a message — whatever
            works best for you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-5 sm:grid-cols-3">
          {channels.map((c) => (
            <div key={c.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-nexus-navy text-white">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold">{c.title}</h3>
              <p className="mt-1 font-semibold text-nexus-cobalt">{c.body}</p>
              <p className="text-sm text-slate-500">{c.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Frequently asked</h2>
            <div className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white">
              {faqs.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="cursor-pointer list-none font-semibold text-nexus-ink marker:hidden">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
