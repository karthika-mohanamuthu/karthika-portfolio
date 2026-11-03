"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  Cloud,
  Code2,
  ExternalLink,
  GraduationCap,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";
import { useRef } from "react";
import {
  about,
  caseStudy,
  certifications,
  education,
  experience,
  personalProject,
  profile,
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
    <div className="border-y border-accent/15 bg-accent/[0.04] py-5">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee">
          {[...strip, ...strip].map((t, i) => (
            <span key={i} className="flex items-center px-6 font-mono text-sm whitespace-nowrap text-slate-500">
              {t}
              <span className="ml-12 h-1 w-1 rounded-full bg-accent/30" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Shared: animated layer diagram ---------------- */

function FlowDiagram({ nodes }: { nodes: readonly string[] }) {
  return (
    <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      {nodes.map((node, i) => (
        <div key={node} className="flex flex-col items-center gap-2 sm:flex-1 sm:flex-row sm:last:flex-none">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease }}
            className="w-full rounded-lg border border-accent/15 bg-accent/5 px-4 py-2.5 text-center font-mono text-[13px] whitespace-nowrap text-ink sm:w-auto"
          >
            {node}
          </motion.div>
          {i < nodes.length - 1 && (
            <div className="relative h-5 w-px overflow-hidden bg-accent/15 sm:h-px sm:w-auto sm:min-w-6 sm:flex-1">
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

function IconTile({ icon: Icon }: { icon: typeof Code2 }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
      <Icon size={18} />
    </span>
  );
}

/* ---------------- Work: case study + personal project ---------------- */

const trackIcons = [Code2, Cloud, ShieldCheck];

function CaseStudy() {
  const meta = [
    { icon: Building2, label: "Client", value: `${caseStudy.client} · Fortune 500` },
    { icon: UserRound, label: "Role", value: caseStudy.role },
    { icon: CalendarDays, label: "Timeline", value: `${caseStudy.period} · via ${caseStudy.via}` },
  ];

  return (
    <Reveal>
      <Card className="p-7 sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <Sparkles size={13} /> Featured case study
        </span>
        <h3 className="mt-5 max-w-3xl text-2xl font-semibold tracking-tight sm:text-3xl">{caseStudy.title}</h3>

        <dl className="mt-6 grid gap-4 border-y border-accent/10 py-5 sm:grid-cols-3">
          {meta.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-3">
              <Icon size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">{label}</dt>
                <dd className="mt-0.5 text-[15px] text-ink">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <h4 className="text-xs font-medium tracking-wide text-slate-500 uppercase">The challenge</h4>
          <p className="mt-2 max-w-3xl leading-relaxed text-slate-700">{caseStudy.context}</p>
        </div>

        <div className="mt-8">
          <FlowDiagram nodes={caseStudy.flow} />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {caseStudy.tracks.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease }}
              className="group rounded-xl border border-accent/10 bg-paper p-5 transition-colors hover:border-accent/30"
            >
              <div className="flex items-start justify-between gap-3">
                <IconTile icon={trackIcons[i]} />
                <span className="font-mono text-xs text-slate-500">{t.tag}</span>
              </div>
              <h4 className="mt-4 font-semibold">{t.title}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-haze">{t.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h4 className="text-xs font-medium tracking-wide text-slate-500 uppercase">How I delivered</h4>
            <ul className="mt-3 space-y-2.5">
              {caseStudy.delivery.map((d) => (
                <li key={d} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium tracking-wide text-slate-500 uppercase">Stack</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {caseStudy.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
        </div>

        {caseStudy.outcomes.length > 0 && (
          <div className="mt-8 grid gap-4 rounded-xl bg-accent/5 p-5 sm:grid-cols-3">
            {caseStudy.outcomes.map((o) => (
              <div key={o.label}>
                <div className="text-2xl font-semibold text-accent">{o.value}</div>
                <div className="text-sm text-haze">{o.label}</div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 text-xs text-slate-500">Details are shared at a high level to respect client confidentiality.</p>
      </Card>
    </Reveal>
  );
}

function PersonalProject() {
  const p = personalProject;
  const links = [
    p.liveUrl && { href: p.liveUrl, label: "Live site" },
    p.repoUrl && { href: p.repoUrl, label: "Source code" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <Reveal>
      <Card className="p-7 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Rocket size={13} /> {p.badge}
          </span>
          {links.length > 0 && (
            <div className="flex gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/5"
                >
                  {l.label} <ExternalLink size={14} />
                </a>
              ))}
            </div>
          )}
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{p.title}</h3>
        <p className="mt-3 max-w-2xl text-haze">{p.blurb}</p>

        <div className="mt-8">
          <FlowDiagram nodes={p.flow} />
        </div>

        <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {p.points.map(([k, v]) => (
            <li key={k} className="flex gap-3 text-[15px] leading-relaxed">
              <BadgeCheck size={18} className="mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="font-medium text-ink">{k}:</span> <span className="text-haze">{v}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </Card>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Work"
          title="Selected work"
          sub="Enterprise modernization for a Fortune 500 client, and an application I’m building on my own."
        />
        <div className="space-y-6">
          <CaseStudy />
          <PersonalProject />
        </div>
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
    <section id="experience" className="bg-accent-soft/70 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Experience" title="Where I’ve worked" />

        <div ref={ref} className="relative pl-8 sm:pl-12">
          <div className="absolute top-2 bottom-2 left-[5px] w-px bg-accent/15 sm:left-[13px]" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-accent/70 sm:left-[13px]"
          />

          {experience.map((job, i) => (
            <Reveal key={job.role} className={i < experience.length - 1 ? "relative mb-6" : "relative"}>
              <span className="absolute top-8 -left-8 h-[11px] w-[11px] rounded-full border-2 border-accent bg-white sm:-left-[41px]" />
              <Card className="p-7 sm:p-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {job.role} <span className="font-normal text-haze">· {job.org}</span>
                  </h3>
                  <span className="shrink-0 font-mono text-sm text-accent">{job.period}</span>
                </div>
                <p className="mt-1.5 text-sm text-slate-500">{job.meta}</p>
                {"award" in job && job.award && (
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                    <Trophy size={14} /> {job.award}
                  </span>
                )}
                <ul className="mt-5 space-y-2.5">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-relaxed text-slate-700">
                      <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills + certifications ---------------- */

export function Skills() {
  return (
    <section id="skills" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Skills" title="What I work with" />
        <div className="grid gap-4 lg:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.06}>
              <Card className={`h-full p-7 ${i === 0 ? "ring-1 ring-accent/30" : ""}`}>
                <h3 className="font-semibold">{s.group}</h3>
                <p className="mt-1 text-sm text-slate-500">{s.note}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.items.map((it) =>
                    i === 0 ? (
                      <span key={it} className="rounded-md bg-accent px-2.5 py-1 text-[13px] font-medium text-white">
                        {it}
                      </span>
                    ) : (
                      <Chip key={it}>{it}</Chip>
                    ),
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Award size={18} className="text-accent" /> Certifications
          </h3>
        </Reveal>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <Card className="h-full p-5">
                <p className="font-mono text-xs text-accent">
                  {c.issuer}
                  {c.year && ` · ${c.year}`}
                </p>
                <p className="mt-2 text-[15px] leading-snug font-medium text-ink">{c.name}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About + education ---------------- */

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = about.summary.split(" ");

  return (
    <section id="about" className="bg-accent-soft/70 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="About" title="A little about me" />
        <p ref={ref} className="max-w-4xl text-xl leading-relaxed text-ink sm:text-2xl">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal>
            <Card className="h-full p-7">
              <div className="flex items-center gap-3">
                <IconTile icon={Target} />
                <h3 className="font-semibold">What I’m looking for</h3>
              </div>
              <p className="mt-4 leading-relaxed text-slate-700">{about.lookingFor}</p>
            </Card>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="h-full p-7">
              <div className="flex items-center gap-3">
                <IconTile icon={GraduationCap} />
                <h3 className="font-semibold">Education</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="font-medium text-ink">{e.degree}</p>
                    <p className="text-sm text-slate-500">{e.school}</p>
                  </li>
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
  const links = [
    { href: profile.linkedin, label: "LinkedIn" },
    ...(profile.github ? [{ href: profile.github, label: "GitHub" }] : []),
  ];
  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent-deep px-8 py-16 text-center text-white shadow-2xl shadow-accent/30 sm:py-20">
            <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-white/20 blur-[100px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
            <div className="relative">
              <p className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase">Contact</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Let’s work together.</h2>
              <p className="mx-auto mt-4 max-w-lg text-white/80">
                Open to relocation and new opportunities in .NET, Azure and cloud modernization.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium break-all text-accent-deep transition-colors hover:bg-accent-soft"
                >
                  <Mail size={16} className="shrink-0" />
                  {profile.email}
                </a>
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    {l.label}
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Download résumé
                  </a>
                )}
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
    <footer className="border-t border-accent/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row">
        <span>{profile.name}</span>
        <span>.NET Development · Azure · Enterprise Applications</span>
      </div>
    </footer>
  );
}
