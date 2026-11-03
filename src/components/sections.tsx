"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, Award, BookOpen, Cloud, Code2, GraduationCap, Rocket, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { useRef } from "react";
import {
  certifications,
  delivery,
  education,
  experience,
  featured,
  profile,
  projects,
  skills,
} from "@/lib/data";
import { Chip, Magnetic, Reveal, SectionHeading, SpotlightCard } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------- About: words light up as you scroll ---------------- */

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = profile.about.split(" ");

  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="About"
          title={
            <>
              Modernization, cloud migration <span className="text-vivid">&amp; production support.</span>
            </>
          }
        />
        <p ref={ref} className="font-display text-2xl leading-snug font-medium tracking-tight sm:text-4xl">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ---------------- Marquee band ---------------- */

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <div className={`flex shrink-0 gap-4 pr-4 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-4 font-display text-3xl font-bold whitespace-nowrap text-white/90 sm:text-5xl"
          >
            {t}
            <Sparkles className={i % 2 ? "text-cyan" : "text-pink"} size={28} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  const row1 = ["C#", "ASP.NET MVC", "Microsoft Azure", "Entity Framework", "SQL Server", "REST APIs", "Azure DevOps", "IBM DB2"];
  const row2 = ["OAuth 2.0", "Azure AD", "Key Vault", "RBAC", "CI/CD", "IIS", "Swagger", "Agile/Scrum"];

  return (
    <div className="relative -rotate-2 border-y border-white/10 bg-gradient-to-r from-violet/20 via-pink/15 to-orange/20 py-6 backdrop-blur">
      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </div>
  );
}

/* ---------------- Projects ---------------- */

const hueMap = {
  violet: { glow: "rgba(139,92,246,0.28)", text: "text-violet", bg: "bg-violet/15", border: "border-violet/40", Icon: Code2 },
  cyan: { glow: "rgba(34,211,238,0.24)", text: "text-cyan", bg: "bg-cyan/15", border: "border-cyan/40", Icon: Cloud },
  pink: { glow: "rgba(244,63,158,0.26)", text: "text-pink", bg: "bg-pink/15", border: "border-pink/40", Icon: ShieldCheck },
  orange: { glow: "rgba(251,122,60,0.26)", text: "text-orange", bg: "bg-orange/15", border: "border-orange/40", Icon: Award },
} as const;

function FlowDiagram() {
  return (
    <div className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      {featured.flow.map((node, i) => (
        <div key={node} className="flex flex-col items-center gap-2 sm:flex-1 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.6, ease }}
            className="w-full rounded-2xl border border-white/15 bg-ink/60 px-4 py-3 text-center font-mono text-sm font-semibold whitespace-nowrap sm:w-auto"
          >
            {node}
          </motion.div>
          {i < featured.flow.length - 1 && (
            <div className="relative h-6 w-px overflow-hidden bg-white/10 sm:h-px sm:w-auto sm:flex-1">
              <motion.span
                className="absolute h-2 w-full rounded-full bg-gradient-to-b from-pink to-orange sm:hidden"
                animate={{ top: ["-20%", "120%"] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute top-1/2 hidden h-1.5 w-6 -translate-y-1/2 rounded-full bg-gradient-to-r from-pink to-orange shadow-[0_0_12px_rgba(244,63,158,0.9)] sm:block"
                animate={{ left: ["-20%", "110%"] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Selected work"
          title={
            <>
              Projects that <span className="text-vivid">ship &amp; scale.</span>
            </>
          }
          sub="Four completed enterprise projects, one training case study and a personal application project. Client work is described at a high level."
        />

        <Reveal>
          <SpotlightCard className="p-7 sm:p-10" color="rgba(251,122,60,0.22)">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-pink/40 to-orange/30 blur-3xl" />
            <span className="inline-flex items-center gap-2 rounded-full bg-amber/15 px-3 py-1 text-xs font-bold tracking-wide text-amber">
              <Rocket size={14} /> {featured.badge}
            </span>
            <h3 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">{featured.title}</h3>
            <p className="mt-4 max-w-2xl text-lg text-haze">{featured.blurb}</p>

            <FlowDiagram />

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {featured.points.map(([k, v], i) => (
                <motion.li
                  key={k}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease }}
                  className="flex gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-4"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-pink to-orange" />
                  <span>
                    <b className="text-white">{k}:</b> <span className="text-haze">{v}</span>
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {featured.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => {
            const h = hueMap[p.hue];
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <SpotlightCard className="h-full p-7" color={h.glow}>
                  <div className="flex items-start justify-between gap-4">
                    <motion.span
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      className={`grid h-12 w-12 place-items-center rounded-2xl border ${h.border} ${h.bg} ${h.text}`}
                    >
                      <h.Icon size={22} />
                    </motion.span>
                    <span className={`rounded-full border ${h.border} px-3 py-1 font-mono text-xs ${h.text}`}>{p.tag}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-haze">{p.body}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Delivery ---------------- */

export function Delivery() {
  const icons = [Rocket, Wrench, BookOpen];
  const colors = ["from-pink to-orange", "from-cyan to-violet", "from-lime to-cyan"];
  return (
    <section id="delivery" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Delivery highlights"
          title={
            <>
              Ownership, from <span className="text-vivid">commit to hypercare.</span>
            </>
          }
          sub="A practical record of enterprise delivery, collaboration and production ownership."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {delivery.map((d, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={d.title} delay={i * 0.1}>
                <SpotlightCard className="h-full p-7">
                  <span className="font-mono text-6xl font-bold text-white/[0.07]">0{i + 1}</span>
                  <span className={`mt-2 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${colors[i]} text-ink`}>
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-haze">{d.body}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */

export function Skills() {
  const accents = ["text-pink", "text-orange", "text-cyan", "text-lime", "text-violet", "text-amber", "text-pink", "text-cyan"];
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Toolkit"
          title={
            <>
              Tools I use <span className="text-vivid">day to day.</span>
            </>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={(i % 4) * 0.07}>
              <SpotlightCard className="h-full p-6">
                <h3 className={`font-mono text-xs tracking-[0.2em] uppercase ${accents[i]}`}>{s.group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <Chip key={it}>{it}</Chip>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5">
          <SpotlightCard className="p-7" color="rgba(251,191,36,0.2)">
            <div className="flex flex-wrap items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber to-orange text-ink">
                <Award size={22} />
              </span>
              <h3 className="font-display text-2xl font-bold">Certifications</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {certifications.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, type: "spring", stiffness: 260, damping: 18 }}
                  className="rounded-2xl border border-amber/30 bg-amber/10 px-4 py-2 text-sm font-semibold text-amber"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Experience timeline ---------------- */

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Experience"
          title={
            <>
              Enterprise delivery at <span className="text-vivid">TCS.</span>
            </>
          }
          sub="Enterprise application delivery at Tata Consultancy Services."
        />

        <div ref={ref} className="relative pl-10 sm:pl-14">
          <div className="absolute top-2 bottom-2 left-3 w-px bg-white/10 sm:left-5" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-3 w-px origin-top bg-gradient-to-b from-pink via-orange to-cyan shadow-[0_0_12px_rgba(244,63,158,0.8)] sm:left-5"
          />

          {experience.map((job, i) => (
            <Reveal key={job.role} delay={0.05} className="relative mb-10">
              <span className="absolute top-8 -left-[34px] grid h-5 w-5 place-items-center sm:-left-[45px]">
                <span className="absolute h-5 w-5 animate-ping rounded-full bg-pink/40" />
                <span className="relative h-3 w-3 rounded-full bg-gradient-to-br from-pink to-orange ring-4 ring-ink" />
              </span>
              <SpotlightCard className="p-7 sm:p-9" color={i === 0 ? "rgba(244,63,158,0.2)" : "rgba(34,211,238,0.2)"}>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">
                  {job.role}
                  <span className="text-haze">, {job.org}</span>
                </h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-cyan sm:text-sm">{job.meta}</p>
                <ul className="mt-5 space-y-3">
                  {job.points.map((pt, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.07, duration: 0.5, ease }}
                      className="flex gap-3 leading-relaxed text-white/85"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}

          <Reveal className="relative">
            <span className="absolute top-8 -left-[34px] grid h-5 w-5 place-items-center sm:-left-[45px]">
              <span className="relative h-3 w-3 rounded-full bg-gradient-to-br from-cyan to-violet ring-4 ring-ink" />
            </span>
            <SpotlightCard className="p-7 sm:p-9" color="rgba(139,92,246,0.25)">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-violet" />
                <h3 className="font-display text-2xl font-bold">Education</h3>
              </div>
              <ul className="mt-4 space-y-2 text-white/85">
                {education.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact + footer ---------------- */

export function Contact() {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet/25 via-pink/20 to-orange/25 p-10 text-center sm:p-20">
            <div className="absolute -top-1/2 left-1/2 h-[140%] w-[140%] -translate-x-1/2 animate-spin-slower rounded-full bg-[conic-gradient(from_90deg,transparent,rgba(244,63,158,0.25),transparent_30%,rgba(34,211,238,0.2),transparent_60%)] blur-2xl" />
            <div className="relative">
              <p className="font-mono text-xs tracking-[0.3em] text-white/70 uppercase">Get in touch</p>
              <h2 className="mt-5 font-display text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-8xl">
                Let’s work <span className="text-vivid">together.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
                Open to relocation and new opportunities in .NET, Azure and cloud modernization.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Magnetic>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold break-all text-ink shadow-[0_10px_50px_-5px_rgba(255,255,255,0.45)] transition-transform hover:scale-105"
                  >
                    {profile.email}
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-ink/40 px-7 py-4 font-semibold backdrop-blur transition-colors hover:bg-ink/70"
                  >
                    LinkedIn
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-sm text-haze">
      © 2026 {profile.name} · .NET Development · Azure · Enterprise Applications
    </footer>
  );
}
