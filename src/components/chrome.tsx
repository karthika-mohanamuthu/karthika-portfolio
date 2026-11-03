"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav } from "@/lib/data";

/** Fixed aurora backdrop: drifting colour blobs, grid and grain. */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[20%] -left-[10%] h-[60vmax] w-[60vmax] animate-aurora rounded-full bg-violet/30 blur-[120px]" />
      <div
        className="absolute top-[10%] -right-[15%] h-[55vmax] w-[55vmax] animate-aurora rounded-full bg-pink/25 blur-[130px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute -bottom-[25%] left-[20%] h-[50vmax] w-[50vmax] animate-aurora rounded-full bg-cyan/15 blur-[130px]"
        style={{ animationDelay: "-12s" }}
      />
      <div
        className="absolute top-[45%] left-[45%] h-[30vmax] w-[30vmax] animate-aurora rounded-full bg-orange/15 blur-[120px]"
        style={{ animationDelay: "-3s" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]" />
      <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}

/** Soft glow that trails the mouse cursor (desktop only). */
export function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-0 hidden h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(244,63,158,0.16),transparent_65%)] md:block"
    />
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-pink via-orange to-cyan"
    />
  );
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
    nav.forEach(({ id }) => {
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-40 flex justify-center px-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-ink/70 shadow-[0_10px_40px_-10px_rgba(139,92,246,0.45)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-2 font-display text-lg font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-pink via-orange to-amber text-sm text-ink">
            K
          </span>
          Karthika<span className="text-pink">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map(({ id, label }) => (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === id ? "text-ink" : "text-white/70 hover:text-white"
                }`}
              >
                {label}
              </a>
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-pink to-orange"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="absolute top-16 right-4 left-4 rounded-3xl border border-white/10 bg-ink/90 p-3 backdrop-blur-xl md:hidden"
          >
            {nav.map(({ id, label }, i) => (
              <motion.li key={id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-display text-xl hover:bg-white/5"
                >
                  {label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
