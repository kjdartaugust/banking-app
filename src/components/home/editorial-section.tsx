import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/home/reveal";

interface Highlight {
  title: string;
  body: string;
}

export function EditorialSection({
  eyebrow,
  heading,
  body,
  image,
  imageSide = "left",
  highlights,
  cta = "Learn more",
}: {
  eyebrow: string;
  heading: string;
  body: string;
  image: string;
  imageSide?: "left" | "right";
  highlights: Highlight[];
  cta?: string;
}) {
  const imageFirst = imageSide === "left";

  return (
    <section className="bg-chase-mist py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <Reveal className={imageFirst ? "lg:order-1" : "lg:order-2"}>
          <div className="overflow-hidden rounded-2xl shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={heading}
              className="h-[420px] w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal className={imageFirst ? "lg:order-2" : "lg:order-1"} delay={0.1}>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-chase-gold">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-chase-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{body}</p>

          <div className="mt-8 space-y-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="font-bold text-chase-navy">{h.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{h.body}</p>
              </div>
            ))}
          </div>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-chase-blue hover:underline"
          >
            {cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
