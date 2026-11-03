"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  Cloud,
  Code2,
  GraduationCap,
  Mail,
  Rocket,
  ShieldCheck,
  Wrench,
} from "lucide-react";
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
import { Card, Chip, Reveal, SectionHeading, ease } from "./ui";

/* ---------------- Tech strip ---------------- */

const strip = [
  "C#", "ASP.NET MVC", "Microsoft Azure", "Entity Framework", "SQL Server", "REST APIs",
  "Azure DevOps", "IBM DB2", "OAuth 2.0", "Azure AD", "Key Vault", "RBAC", "CI/CD", "IIS",
];

export function TechStrip() {
  return (
    <div className="border-y border-white/[0.06] py-5">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee">
          {[...strip, ...strip].map((t, i) => (
            <span key={i} className="flex items-center px-6 font-mono text-sm whitespace-nowrap text-zinc-500">
              {t}
              <span className="ml-12 h-1 w-1 rounded-full bg-zinc-700" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- About: words brighten as you scroll ---------------- */

function Word({ children, range, progress }: { children: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = profile.about.split(" ");

  return (
    <section id="about" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="About" title="Modernization, cloud migration and production support." />
        <p ref={ref} className="max-w-4xl text-xl leading-relaxed text-zinc-100 sm:text-2xl">
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

/* ---------------- Projects ---------------- */

const projectIcons = [Code2, Cloud, ShieldCheck, Award];

function FlowDiagram() {
  return (
    <div className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      {featured.flow.map((node, i) => (
        <div key={node} className="flex flex-col items-center gap-2 sm:flex-1 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease }}
            className="w-full rounded-lg border border-white/10 bg-zinc-900/60 px-4 py-2.5 text-center font-mono text-[13px] whitespace-nowrap text-zinc-200 sm:w-auto"
          >
            {node}
          </motion.div>
          {i < featured.flow.length - 1 && (
            <div className="relative h-5 w-px overflow-hidden bg-white/10 sm:h-px sm:w-auto sm:flex-1">
              <motion.span
                className="absolute h-2 w-full bg-accent sm:hidden"
                animate={{ top: ["-30%", "130%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
              />
              <motion.span
                className="absolute top-0 hidden h-px w-8 bg-gradient-to-r from-transparent via-accent to-transparent sm:block"
                animate={{ left: ["-30%", "110%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
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
    <section id="projects" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Projects"
          title="Selected work"
          sub="Four completed enterprise projects, one training case study and a personal application project. Client work is described at a high level."
        />

        <Reveal>
          <Card className="p-7 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <Rocket size={13} /> {featured.badge}
            </span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{featured.title}</h3>
            <p className="mt-3 max-w-2xl text-haze">{featured.blurb}</p>

            <FlowDiagram />

            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {featured.points.map(([k, v]) => (
                <li key={k} className="flex gap-3 text-[15px] leading-relaxed">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    <span className="font-medium text-zinc-100">{k}:</span> <span className="text-haze">{v}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {featured.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </Card>
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => {
            const Icon = projectIcons[i];
            return (
              <Reveal key={p.title} delay={i * 0.06}>
                <Card className="h-full p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 transition-colors group-hover:text-accent">
                      <Icon size={18} />
                    </span>
                    <span className="font-mono text-xs text-zinc-500">{p.tag}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-haze">{p.body}</p>
                </Card>
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
  return (
    <section id="delivery" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Delivery"
          title="Ownership from development to hypercare."
          sub="A practical record of enterprise delivery, collaboration and production ownership."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {delivery.map((d, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={d.title} delay={i * 0.08}>
                <Card className="h-full p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300 transition-colors group-hover:text-accent">
                      <Icon size={18} />
                    </span>
                    <span className="font-mono text-xs text-zinc-600">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-haze">{d.body}</p>
                </Card>
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
  return (
    <section id="skills" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Skills" title="Tools I use day to day." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={(i % 4) * 0.05}>
              <Card className="h-full p-6">
                <h3 className="text-sm font-medium text-zinc-100">{s.group}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <Chip key={it}>{it}</Chip>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4">
          <Card className="p-7">
            <div className="flex items-center gap-3">
              <Award size={18} className="text-accent" />
              <h3 className="text-lg font-semibold">Certifications</h3>
            </div>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-[15px] text-zinc-300">
                  <BadgeCheck size={17} className="mt-0.5 shrink-0 text-zinc-500" />
                  {c}
                </li>
              ))}
            </ul>
          </Card>
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
    <section id="experience" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Experience"
          title="Professional experience"
          sub="Enterprise application delivery at Tata Consultancy Services."
        />

        <div ref={ref} className="relative pl-8 sm:pl-12">
          <div className="absolute top-2 bottom-2 left-[5px] w-px bg-white/[0.08] sm:left-[13px]" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent/70 sm:left-[13px]"
          />

          {experience.map((job) => (
            <Reveal key={job.role} className="relative mb-6">
              <span className="absolute top-8 -left-8 h-[11px] w-[11px] rounded-full border-2 border-accent bg-ink sm:-left-[41px]" />
              <Card className="p-7 sm:p-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {job.role} <span className="font-normal text-haze">· {job.org}</span>
                  </h3>
                </div>
                <p className="mt-1.5 text-sm text-zinc-500">{job.meta}</p>
                <ul className="mt-5 space-y-2.5">
                  {job.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 leading-relaxed text-zinc-300">
                      <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}

          <Reveal className="relative">
            <span className="absolute top-8 -left-8 h-[11px] w-[11px] rounded-full border-2 border-zinc-500 bg-ink sm:-left-[41px]" />
            <Card className="p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <GraduationCap size={20} className="text-accent" />
                <h3 className="text-lg font-semibold">Education</h3>
              </div>
              <ul className="mt-4 space-y-2 text-zinc-300">
                {education.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact + footer ---------------- */

export function Contact() {
  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] px-8 py-16 text-center sm:py-20">
            <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-accent-deep/20 blur-[100px]" />
            <div className="relative">
              <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Contact</p>
              <h2 className="text-sheen mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Let’s work together.</h2>
              <p className="mx-auto mt-4 max-w-lg text-haze">
                Open to relocation and new opportunities in .NET, Azure and cloud modernization.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium break-all text-ink transition-colors hover:bg-zinc-200"
                >
                  <Mail size={16} className="shrink-0" />
                  {profile.email}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center gap-2 rounded-lg border border-white/12 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
                >
                  LinkedIn
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
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
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
        <span>© 2026 {profile.name}</span>
        <span>.NET Development · Azure · Enterprise Applications</span>
      </div>
    </footer>
  );
}
