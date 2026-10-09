"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Target, Route, CheckCircle2 } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/content";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function Work() {
  const narrow = useMediaQuery("(max-width: 640px)");

  // `undefined` means the visitor hasn't touched the list yet, so we fall back
  // to a viewport-dependent default: open on desktop, collapsed on a phone
  // (where one expanded row costs ~5 screens and buries the other five).
  const [chosen, setChosen] = useState<string | null | undefined>(undefined);
  const open = chosen === undefined ? (narrow ? null : caseStudies[0].id) : chosen;

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="Six problems, and what shipped."
          lead="Each of these came out of the same product. Together they're the story of turning a drifting hiring platform into a system — one where data views are shareable, components are shared, and the frontend has one mental model."
        />

        <div className="mt-14 overflow-hidden rounded-[var(--radius)] border border-line">
          {caseStudies.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <Row
                study={c}
                isOpen={open === c.id}
                onToggle={() => setChosen(open === c.id ? null : c.id)}
                last={i === caseStudies.length - 1}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({
  study,
  isOpen,
  onToggle,
  last,
}: {
  study: CaseStudy;
  isOpen: boolean;
  onToggle: () => void;
  last: boolean;
}) {
  return (
    <div
      className={`group relative transition-colors duration-400 ${
        last ? "" : "border-b border-line"
      } ${isOpen ? "bg-surface-1" : "hover:bg-surface-1"}`}
    >
      {/* accent rail */}
      <motion.span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[2px]"
        style={{ background: study.accent }}
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, scaleY: isOpen ? 1 : 0.3 }}
        transition={{ duration: 0.4, ease }}
      />

      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start gap-5 px-5 py-6 text-left sm:gap-7 sm:px-8 sm:py-7"
      >
        <span
          className="mono mt-1 text-[11px] tracking-[0.16em] transition-colors duration-300"
          style={{ color: isOpen ? study.accent : undefined }}
        >
          <span className={isOpen ? "" : "text-text-faint"}>{study.index}</span>
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[clamp(1.05rem,2.4vw,1.45rem)] font-medium leading-tight tracking-[-0.025em] text-text">
              {study.title}
            </span>
            <span
              className="mono rounded-full px-2 py-[3px] text-[10px] uppercase tracking-[0.1em]"
              style={{
                color: study.accent,
                background: `color-mix(in srgb, ${study.accent} 12%, transparent)`,
              }}
            >
              {study.kicker}
            </span>
          </span>
          <span className="mt-2.5 block max-w-[68ch] text-pretty text-[14px] leading-relaxed text-text-dim">
            {study.summary}
          </span>
        </span>

        <motion.span
          className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line text-text-dim transition-colors group-hover:border-line-strong group-hover:text-text"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease }}
        >
          <Plus className="size-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 px-5 pb-9 pl-5 sm:grid-cols-[1fr_1.15fr] sm:gap-10 sm:px-8 sm:pl-[76px]">
              <div className="space-y-7">
                <Block
                  icon={<Target className="size-3.5" />}
                  label="The problem"
                  accent={study.accent}
                >
                  <p className="text-[13.5px] leading-relaxed text-text-dim">
                    {study.problem}
                  </p>
                </Block>

                <Block
                  icon={<CheckCircle2 className="size-3.5" />}
                  label="Outcome"
                  accent={study.accent}
                >
                  <p className="text-[13.5px] leading-relaxed text-text">
                    {study.outcome}
                  </p>
                </Block>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {study.stack.map((s) => (
                    <span
                      key={s}
                      className="mono rounded-md border border-line bg-surface-1 px-2 py-1 text-[10.5px] text-text-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Block
                icon={<Route className="size-3.5" />}
                label="What I did"
                accent={study.accent}
              >
                <ul className="space-y-3">
                  {study.approach.map((a, i) => (
                    <motion.li
                      key={a}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.06, duration: 0.4 }}
                      className="flex gap-3 text-[13.5px] leading-relaxed text-text-dim"
                    >
                      <span
                        className="mono mt-[3px] shrink-0 text-[10px]"
                        style={{ color: study.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {a}
                    </motion.li>
                  ))}
                </ul>
              </Block>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Block({
  icon,
  label,
  accent,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span style={{ color: accent }}>{icon}</span>
        <span className="label">{label}</span>
      </div>
      {children}
    </div>
  );
}
