"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import { profile } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (insecure context / permissions) — the
      // mailto link below is always available as the fallback.
    }
  };

  return (
    <section
      id="contact"
      className="noise relative overflow-hidden border-t border-line py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 size-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(123,97,255,0.16) 0%, transparent 68%)",
          }}
          animate={reduced ? {} : { scale: [1, 1.14, 1], opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-3.5 py-1.5">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 rounded-full bg-pos/60 animate-pulse-ring" />
              <span className="size-2 rounded-full bg-pos" />
            </span>
            <span className="mono text-[10.5px] uppercase tracking-[0.14em] text-text-dim">
              {profile.availabilityNote}
            </span>
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="text-gradient mt-7 text-balance text-[clamp(2.1rem,6vw,4rem)] font-semibold leading-[1.03] tracking-[-0.04em]">
            Let&rsquo;s build something
            <br />
            worth measuring.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-[52ch] text-pretty text-[15px] leading-relaxed text-text-dim">
            Whether you need dashboards that people actually trust, a reporting
            surface that scales past the prototype, or a frontend that stops
            accruing debt — I&rsquo;d like to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-2.5 rounded-full bg-text px-7 py-3.5 text-[14.5px] font-semibold text-canvas transition-transform duration-300 hover:scale-[1.025] active:scale-[0.99]"
            >
              <Mail className="size-4" />
              {profile.email}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={copy}
              className="flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-5 py-3.5 text-[14px] font-medium text-text-dim transition-all duration-300 hover:border-accent/50 hover:text-text"
              aria-live="polite"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-pos" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {[
              { href: `tel:${profile.phoneHref}`, Icon: Phone, label: profile.phone },
              { href: profile.github, Icon: GithubIcon, label: "GitHub" },
              { href: profile.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-2 text-[13.5px] text-text-dim transition-colors hover:text-text"
              >
                <Icon className="size-4 text-text-faint transition-colors group-hover:text-accent" />
                <span className="mono">{label}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
