"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, profile } from "@/lib/content";
import { ThemeToggle } from "./ui/ThemeToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently crossing the upper third of the viewport.
  // Offset math rather than IntersectionObserver, because the gaps between
  // observed sections (the metrics strip, the footer) would otherwise leave
  // the pill stuck on whichever section it saw last.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * 0.34;
      let current = "";

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line && top + el.offsetHeight > line) {
          current = item.id;
          break;
        }
      }

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
        style={{ scaleX: progress }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-canvas/72 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="relative grid size-8 place-items-center rounded-[9px] border border-line-strong bg-panel">
              <span className="mono text-[12px] font-semibold text-text">JM</span>
              <span className="absolute inset-0 rounded-[9px] bg-gradient-to-br from-accent/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
            <span className="hidden text-[13.5px] font-medium tracking-tight text-text sm:block">
              {profile.name}
            </span>
          </a>

          {/* `lg` rather than `md`: seven items plus the CTA wrap at 768px */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] text-text-dim transition-colors duration-200 hover:text-text"
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-line-strong bg-surface-3"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={`relative ${active === item.id ? "text-text" : ""}`}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href={`mailto:${profile.email}`}
              className="group hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-line-strong bg-surface-2 px-4 py-[7px] text-[13px] font-medium text-text transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 sm:flex"
            >
              Get in touch
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-[10px] border border-line-strong bg-panel text-text lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-1 overflow-y-auto px-8 py-24">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.4 }}
                  className="flex shrink-0 items-baseline gap-4 border-b border-line py-3.5 text-xl font-medium tracking-tight text-text"
                >
                  <span className="mono text-[11px] text-text-faint">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={`mailto:${profile.email}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mono mt-8 text-[12px] text-accent"
              >
                {profile.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
