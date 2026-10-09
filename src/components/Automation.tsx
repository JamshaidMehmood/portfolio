"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { automation } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { SpotlightCard } from "./ui/Spotlight";
import { Counter } from "./ui/Counter";

const ease = [0.22, 1, 0.36, 1] as const;

/** Longest bar sets the scale, so every row is comparable at a glance. */
const SCALE = Math.max(...automation.coverage.map((c) => c.after));

export function Automation() {
  const half = Math.ceil(automation.coverage.length / 2);
  const columns = [
    automation.coverage.slice(0, half),
    automation.coverage.slice(half),
  ];

  return (
    <section
      id="automation"
      className="relative border-t border-line py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="dot-bg pointer-events-none absolute inset-0 opacity-[0.3]"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow={automation.eyebrow}
          title={automation.title}
          lead={automation.lead}
        />

        {/* period + stack ------------------------------------------- */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mono rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1.5 text-[11px] text-accent">
              {automation.period}
            </span>
            {automation.stack.map((t) => (
              <span
                key={t}
                className="mono rounded-full border border-line px-3 py-1.5 text-[11px] text-text-dim"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        {/* headline stats ------------------------------------------- */}
        <Stagger className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {automation.headline.map((s) => (
            <StaggerItem key={s.label} className="bg-canvas">
              <SpotlightCard className="h-full" radius={300}>
                <div className="flex h-full flex-col justify-between gap-5 p-6 sm:p-7">
                  <div>
                    <div className="flex items-baseline gap-2">
                      {s.before !== undefined && (
                        <>
                          <span className="mono text-[15px] text-text-faint line-through decoration-text-faint/40">
                            {s.before}
                          </span>
                          <ArrowRight className="size-3.5 shrink-0 text-text-faint" />
                        </>
                      )}
                      <Counter
                        to={s.after}
                        className="mono text-[clamp(1.85rem,4vw,2.6rem)] font-semibold leading-none tracking-[-0.045em] text-text"
                      />
                    </div>
                    <span className="mono mt-2.5 inline-block rounded-full border border-pos/25 bg-pos/[0.08] px-2.5 py-1 text-[10.5px] text-pos">
                      {s.delta}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13.5px] font-medium leading-snug text-text">
                      {s.label}
                    </p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-text-faint">
                      {s.note}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        {/* coverage by area ----------------------------------------- */}
        <div className="mt-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h3 className="text-[17px] font-medium tracking-[-0.02em] text-text">
                Coverage by product area
              </h3>
              <div className="flex items-center gap-4">
                <Legend className="bg-surface-5" label="Before" />
                <Legend
                  className="bg-gradient-to-r from-accent to-accent-2"
                  label="After"
                />
              </div>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-x-12 gap-y-1 lg:grid-cols-2">
            {columns.map((col, ci) => (
              <div key={ci} className="space-y-1">
                {col.map((row, i) => (
                  <CoverageRow key={row.area} {...row} delay={i * 0.04} />
                ))}
              </div>
            ))}
          </div>

          <Reveal>
            <p className="mt-6 max-w-[80ch] text-pretty text-[12.5px] leading-relaxed text-text-faint">
              {automation.coverageTail}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const barVariants = {
  hidden: { width: 0 },
  show: (pct: number) => ({
    width: `${pct}%`,
    transition: { duration: 0.9, ease },
  }),
};

function CoverageRow({
  area,
  before,
  after,
  delay,
}: {
  area: string;
  before: number;
  after: number;
  delay: number;
}) {
  const fromZero = before === 0;

  return (
    // The trigger lives on the row, not the bars: a bar starts at width 0,
    // and an IntersectionObserver on a zero-width box never reports a hit.
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delayChildren: delay }}
      className="group grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line/60 py-2.5"
    >
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="truncate text-[12.5px] text-text-dim transition-colors group-hover:text-text">
            {area}
          </span>
          {fromZero && (
            <span className="mono shrink-0 rounded-[4px] border border-accent-2/25 bg-accent-2/[0.07] px-1.5 py-px text-[8.5px] tracking-[0.1em] text-accent-2">
              NEW
            </span>
          )}
        </div>

        <div className="relative mt-1.5 h-[5px] w-full overflow-hidden rounded-full bg-surface-2">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
            variants={barVariants}
            custom={(after / SCALE) * 100}
          />
          {/* the slice that already existed, drawn over the new total */}
          {before > 0 && (
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full bg-surface-5"
              variants={barVariants}
              custom={(before / SCALE) * 100}
            />
          )}
        </div>
      </div>

      <div className="mono shrink-0 text-right text-[11px] leading-tight">
        <span className="text-text">{after}</span>
        <span className="text-text-faint"> / </span>
        <span className="text-pos">+{after - before}</span>
      </div>
    </motion.div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-[5px] w-7 rounded-full ${className}`} />
      <span className="mono text-[10px] tracking-[0.12em] text-text-faint">
        {label}
      </span>
    </span>
  );
}
