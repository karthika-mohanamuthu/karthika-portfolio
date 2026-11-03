"use client";

import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts children into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Animated number that counts up when scrolled into view. */
export function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.6, ease, onUpdate: setVal });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Card with a faint cursor-following highlight and border glow. */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const bg = useMotionTemplate`radial-gradient(360px circle at ${x}px ${y}px, rgba(142,162,255,0.07), transparent 70%)`;

  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-500);
        y.set(-500);
      }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-colors duration-300 hover:border-white/[0.16] ${className}`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: bg }} />
      <div className="relative">{children}</div>
    </div>
  );
}

export function SectionHeading({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-4 font-mono text-xs tracking-[0.2em] text-accent uppercase">{kicker}</p>
      <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-haze sm:text-lg">{sub}</p>}
    </Reveal>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[13px] text-zinc-300">
      {children}
    </span>
  );
}
