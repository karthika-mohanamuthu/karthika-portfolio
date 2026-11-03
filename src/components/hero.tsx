"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile, stats } from "@/lib/data";
import { CountUp, ease } from "./ui";

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative block h-[1.2em] overflow-hidden text-[0.75em] leading-[1.2] sm:text-[1em]">
      <AnimatePresence initial={false}>
        <motion.span
          key={profile.roles[i]}
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.6, ease }}
          className="absolute inset-x-0 top-0 block whitespace-nowrap text-accent"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const panel: [string, string][] = [
  ["role", "Software Engineer / .NET Developer"],
  ["company", "Tata Consultancy Services"],
  ["client", "Fortune 500 (ADM)"],
  ["focus", "Modernization · Azure · Security"],
  ["stack", "C# · ASP.NET MVC · SQL Server"],
  ["location", "Chennai · open to relocation"],
];

function ProfilePanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-accent/30 bg-[#1d1240] shadow-2xl shadow-accent/30 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-xs text-violet-300/60">profile.json</span>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:p-6">
        <div className="text-violet-300/60">{"{"}</div>
        {panel.map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + i * 0.12, duration: 0.5, ease }}
            className="pl-5 whitespace-nowrap"
          >
            <span className="text-violet-300">&quot;{k}&quot;</span>
            <span className="text-violet-300/60">: </span>
            <span className="text-white">&quot;{v}&quot;</span>
            {i < panel.length - 1 && <span className="text-violet-300/60">,</span>}
          </motion.div>
        ))}
        <div className="text-violet-300/60">
          {"}"}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            className="ml-1 inline-block h-4 w-[7px] translate-y-[3px] bg-violet-300"
          />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-dvh items-center pt-28 pb-16">
      <motion.div style={{ y, opacity }} className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-[13px] text-slate-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Open to relocation · {profile.location}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.035em]"
          >
            <span className="text-sheen block">Hi, I’m Karthika.</span>
            <RotatingRole />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-haze"
          >
            {profile.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-deep"
            >
              View projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-accent/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:bg-accent/5"
            >
              <Mail size={16} /> Email me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 rounded-lg border border-accent/20 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:bg-accent/5"
            >
              LinkedIn
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="hidden sm:block"
        >
          <ProfilePanel />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 divide-accent/15 rounded-2xl border border-accent/15 bg-white sm:grid-cols-4 sm:divide-x lg:col-span-2"
        >
          {stats.map((s) => (
            <div key={s.label} className="px-6 py-5">
              <div className="text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-haze">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
