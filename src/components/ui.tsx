"use client";

import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts children into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
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
    const controls = animate(0, to, { duration: 1.8, ease, onUpdate: setVal });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Glass card with a cursor-following colour spotlight. */
export function SpotlightCard({
  children,
  className = "",
  color = "rgba(244,63,158,0.22)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, ${color}, transparent 65%)`;

  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-400);
        y.set(-400);
      }}
      className={`ring-vivid group relative overflow-hidden rounded-3xl bg-white/[0.035] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 ${className}`}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: bg }} />
      {children}
    </div>
  );
}

/** Element that gently pulls toward the cursor. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 15 });
  const y = useSpring(0, { stiffness: 220, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-pink">
        <span className="mr-3 inline-block h-px w-10 bg-gradient-to-r from-pink to-orange align-middle" />
        {kicker}
      </p>
      <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">{title}</h2>
      {sub && <p className="mt-5 text-lg text-haze">{sub}</p>}
    </Reveal>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-sm font-medium text-white/85 transition-colors hover:border-pink/60 hover:bg-pink/10 hover:text-white">
      {children}
    </span>
  );
}
