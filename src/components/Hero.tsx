"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, FileText, MapPin } from "lucide-react";
import { heroRotators, profile, quickStats } from "@/lib/content";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";
import { IdBadge } from "./ui/IdBadge";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((v) => (v + 1) % heroRotators.length), 2600);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section
      id="top"
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pt-28 lg:pt-24"
    >
      {/* backdrop ------------------------------------------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0" />
        <motion.div
          className="absolute left-1/2 top-[-14%] size-[720px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(123,97,255,0.20) 0%, transparent 66%)",
          }}
          animate={reduced ? {} : { scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 top-1/3 size-[520px] rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 68%)",
          }}
          animate={reduced ? {} : { y: [0, -36, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      {/* content --------------------------------------------------- */}
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          {/* ---------------- copy column ---------------- */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              {profile.available && (
                <span className="inline-flex items-center gap-2 rounded-full border border-pos/25 bg-pos/[0.08] py-1.5 pl-2.5 pr-3.5">
                  <span className="relative grid size-2 place-items-center">
                    <span className="absolute size-2 rounded-full bg-pos/60 animate-pulse-ring" />
                    <span className="size-2 rounded-full bg-pos" />
                  </span>
                  <span className="mono text-[10.5px] uppercase tracking-[0.14em] text-pos">
                    Available
                  </span>
                </span>
              )}
              <span className="hidden items-center gap-1.5 text-[12.5px] text-text-faint sm:flex">
                <MapPin className="size-3.5" />
                {profile.location}
                <span className="mx-1 text-line-strong">·</span>
                <span className="mono">{profile.timezone}</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.08, ease }}
              className="mt-7 text-balance text-[clamp(2.5rem,6.2vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
            >
              <span className="text-gradient">{profile.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease }}
              className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[clamp(1rem,2.2vw,1.5rem)] font-medium tracking-[-0.025em] text-text-dim"
            >
              <span className="text-text">Frontend engineer</span>
              <span className="text-text-faint">building</span>
              <span className="relative inline-grid h-[1.35em] overflow-hidden align-bottom">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={heroRotators[i]}
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-105%", opacity: 0 }}
                    transition={{ duration: 0.55, ease }}
                    className="accent-gradient col-start-1 row-start-1 whitespace-nowrap font-semibold"
                  >
                    {heroRotators[i]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease }}
              className="mt-7 max-w-[54ch] text-pretty text-[15.5px] leading-[1.75] text-text-dim"
            >
              {profile.intro}
            </motion.p>

            {/* CTAs ---------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group relative overflow-hidden rounded-full bg-text px-6 py-3 text-[14px] font-semibold text-canvas transition-transform duration-300 hover:scale-[1.025] active:scale-[0.99]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View selected work
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </span>
              </a>

              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-6 py-3 text-[14px] font-medium text-text transition-all duration-300 hover:border-accent/50 hover:bg-accent/[0.09]"
              >
                <FileText className="size-4 text-text-faint transition-colors group-hover:text-accent" />
                {profile.resumeLabel}
                <ArrowUpRight className="size-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>

              <div className="ml-1 flex items-center gap-1.5">
                {[
                  { href: profile.github, Icon: GithubIcon, label: "GitHub" },
                  { href: profile.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full border border-line text-text-dim transition-all duration-300 hover:border-line-strong hover:bg-surface-3 hover:text-text"
                  >
                    <Icon className="size-[17px]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ---------------- badge column ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: -24, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            className="flex justify-center lg:justify-end"
          >
            <IdBadge />
          </motion.div>
        </div>

        {/* quick stats --------------------------------------------- */}
        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-7 sm:grid-cols-3 lg:grid-cols-6"
        >
          {quickStats.map((s) => (
            <div key={s.k}>
              <dt className="label">{s.k}</dt>
              <dd className="mono mt-1.5 text-[15px] font-medium text-text">
                {s.v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* scroll cue ------------------------------------------------ */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-9 w-[22px] justify-center rounded-full border border-line-strong pt-2">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-text-dim"
            animate={reduced ? {} : { y: [0, 11, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
