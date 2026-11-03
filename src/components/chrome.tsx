"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav } from "@/lib/data";

/** Fixed backdrop: one soft accent glow and a faint grid. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[25%] -left-[10%] h-[60vmax] w-[60vmax] animate-drift rounded-full bg-accent/[0.16] blur-[140px]" />
      <div className="absolute -top-[10%] -right-[15%] h-[45vmax] w-[45vmax] animate-drift rounded-full bg-[#a78bfa]/[0.18] blur-[130px] [animation-delay:-12s]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(91,46,224,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(91,46,224,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent" />;
}

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    // Include the hero so the highlight clears when back at the top.
    ["top", ...nav.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-accent/15 bg-white/75 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="text-[15px] font-semibold tracking-tight">
          Karthika Mohanamuthu
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map(({ id, label }) => (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                className={`relative z-10 block rounded-md px-3.5 py-1.5 text-sm transition-colors ${
                  active === id ? "text-ink" : "text-haze hover:text-ink"
                }`}
              >
                {label}
              </a>
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-md bg-accent/10"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="grid h-9 w-9 place-items-center rounded-md border border-accent/15 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-accent/15 bg-white/95 px-6 backdrop-blur-xl md:hidden"
          >
            {nav.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="block py-3 text-base text-ink">
                  {label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
