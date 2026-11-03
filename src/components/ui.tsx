"use client";

import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { profile } from "@/lib/data";

export const ease = [0.22, 1, 0.36, 1] as const;

/* Years of experience, computed in the browser from the career start date so the
 * figure never goes stale. The server snapshot is null (the static HTML can't know
 * "today"), which also avoids hydration mismatches. */
let cachedYears: number | undefined;
const noopSubscribe = () => () => {};
const getYears = () =>
  (cachedYears ??=
    Math.floor(((Date.now() - new Date(profile.careerStart).getTime()) / (365.25 * 24 * 3600 * 1000)) * 10) / 10);
export function useYearsOfExperience(): number | null {
  return useSyncExternalStore(noopSubscribe, getYears, () => null);
}

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
  const bg = useMotionTemplate`radial-gradient(360px circle at ${x}px ${y}px, rgba(91,46,224,0.06), transparent 70%)`;

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
      className={`group relative overflow-hidden rounded-2xl border border-accent/15 bg-white transition-colors duration-300 hover:border-accent/40 ${className}`}
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
    <span className="rounded-md border border-accent/15 bg-accent/5 px-2.5 py-1 text-[13px] text-slate-700">
      {children}
    </span>
  );
}
