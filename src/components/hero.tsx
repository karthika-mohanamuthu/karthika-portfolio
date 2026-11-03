"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile, stats } from "@/lib/data";
import { CountUp, Magnetic } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-grid h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={profile.roles[i]}
          initial={{ y: "100%", opacity: 0, rotateX: -60 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          exit={{ y: "-100%", opacity: 0, rotateX: 60 }}
          transition={{ duration: 0.7, ease }}
          className="text-vivid col-start-1 row-start-1 whitespace-nowrap"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const orbitInner = ["C#", "Azure", ".NET", "SQL"];
const orbitOuter = ["OAuth 2.0", "Key Vault", "MVC", "DevOps", "RBAC", "EF"];

function Orbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* core */}
      <div className="absolute inset-[34%] animate-float rounded-full bg-gradient-to-br from-pink via-orange to-amber p-[2px] shadow-[0_0_120px_20px_rgba(244,63,158,0.45)]">
        <div className="grid h-full w-full place-items-center rounded-full bg-ink/80 backdrop-blur">
          <span className="font-display text-5xl font-extrabold text-vivid">KM</span>
        </div>
      </div>

      {/* inner ring */}
      <div className="absolute inset-[18%] animate-orbit rounded-full border border-dashed border-white/15">
        {orbitInner.map((t, i) => {
          const a = (i / orbitInner.length) * Math.PI * 2;
          return (
            <span
              key={t}
              className="absolute"
              style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}
            >
              <span className="block -translate-x-1/2 -translate-y-1/2 animate-orbit-rev">
                <span className="block rounded-full border border-cyan/40 bg-ink/80 px-3 py-1 font-mono text-xs text-cyan shadow-[0_0_20px_rgba(34,211,238,0.35)] backdrop-blur">
                  {t}
                </span>
              </span>
            </span>
          );
        })}
      </div>

      {/* outer ring */}
      <div className="absolute inset-0 animate-orbit-rev rounded-full border border-white/10">
        {orbitOuter.map((t, i) => {
          const a = (i / orbitOuter.length) * Math.PI * 2 + 0.4;
          return (
            <span
              key={t}
              className="absolute"
              style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}
            >
              <span className="block -translate-x-1/2 -translate-y-1/2 animate-orbit">
                <span className="block rounded-full border border-pink/40 bg-ink/80 px-3 py-1 font-mono text-xs whitespace-nowrap text-pink shadow-[0_0_20px_rgba(244,63,158,0.35)] backdrop-blur">
                  {t}
                </span>
              </span>
            </span>
          );
        })}
      </div>

      <div className="absolute inset-[8%] rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(139,92,246,0.25),transparent_40%)] animate-spin-slow blur-xl" />
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = ["Hi,", "I’m", "Karthika."];

  return (
    <section ref={ref} id="top" className="relative flex min-h-dvh items-center pt-32 pb-20">
      <motion.div style={{ y, opacity }} className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-4 py-1.5 text-sm font-medium text-lime"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Open to relocation · {profile.location}
          </motion.span>

          <h1 className="mt-7 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] font-extrabold tracking-[-0.04em]">
            <span className="block">
              {words.map((w, i) => (
                <span key={w} className="mr-[0.22em] inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease }}
              className="mt-2 block text-[0.62em] [perspective:600px]"
            >
              <RotatingRole />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-haze"
          >
            {profile.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink via-orange to-amber px-7 py-3.5 font-semibold text-ink shadow-[0_10px_40px_-8px_rgba(244,63,158,0.7)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                View projects
                <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold backdrop-blur transition-colors hover:border-white/40 hover:bg-white/10"
              >
                <Mail size={18} /> Email me
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold backdrop-blur transition-colors hover:border-cyan/60 hover:bg-cyan/10"
              >
                LinkedIn
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease }}
          className="hidden sm:block"
        >
          <Orbit />
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-2">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 + i * 0.1, ease }}
              whileHover={{ y: -6 }}
              className="ring-vivid rounded-3xl bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <div className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                <span className={["text-pink", "text-orange", "text-cyan", "text-lime"][i]}>
                  <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
                </span>
              </div>
              <div className="mt-1 text-sm text-haze">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
