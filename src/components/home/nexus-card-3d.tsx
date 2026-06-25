"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Wifi } from "lucide-react";
import { NexusLogo } from "@/components/home/nexus-logo";

export function NexusCard3D({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [12, -12]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-16, 16]), {
    stiffness: 150,
    damping: 18,
  });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div className={className} style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[1.586/1] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-nexus-navy via-[#10224a] to-nexus-cobalt p-6 text-white shadow-2xl"
      >
        {/* Animated glare */}
        <motion.div
          aria-hidden
          style={{ left: glareX }}
          className="pointer-events-none absolute top-0 h-full w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-md"
        />
        <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center justify-between" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center gap-2">
            <NexusLogo className="h-7 w-7" />
            <span className="text-sm font-extrabold tracking-[0.22em]">NEXUS</span>
          </div>
          <Wifi className="h-5 w-5 rotate-90 opacity-80" />
        </div>

        <div
          className="relative mt-6 h-9 w-12 rounded-md bg-gradient-to-br from-amber-200 to-yellow-500/80"
          style={{ transform: "translateZ(30px)" }}
        />

        <p
          className="relative mt-5 font-mono text-lg tracking-[0.18em] text-white/95"
          style={{ transform: "translateZ(50px)" }}
        >
          4829 •••• •••• 1628
        </p>

        <div
          className="relative mt-4 flex items-end justify-between"
          style={{ transform: "translateZ(30px)" }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/60">
              Card holder
            </p>
            <p className="text-sm font-semibold">A. NEXUS MEMBER</p>
          </div>
          <span className="rounded bg-white/15 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
            Infinite
          </span>
        </div>
      </motion.div>
    </div>
  );
}
