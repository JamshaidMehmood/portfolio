"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { marqueeSkills, metrics } from "@/lib/content";
import { Counter } from "./ui/Counter";
import { Stagger, StaggerItem } from "./ui/Reveal";
import { SpotlightCard } from "./ui/Spotlight";

export function Metrics() {
  return (
    <section className="relative border-y border-line bg-canvas-2/50">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-9 flex items-center gap-3">
          <span className="label">Impact at HireStream</span>
          <span className="h-px flex-1 bg-line" />
          <span className="mono text-[10.5px] text-text-faint">2024 — 2026</span>
        </div>

        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line lg:grid-cols-4">
          {metrics.map((m) => {
            const Trend = m.trend === "down" ? TrendingDown : TrendingUp;
            const good = m.trend === "down" ? "text-accent-2" : "text-pos";
            return (
              <StaggerItem key={m.label} className="bg-canvas">
                <SpotlightCard className="h-full" radius={280}>
                  <div className="flex h-full flex-col justify-between gap-6 p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <Counter
                        to={m.value}
                        prefix={m.prefix}
                        suffix={m.suffix}
                        className="mono text-[clamp(2rem,4.4vw,2.9rem)] font-semibold leading-none tracking-[-0.045em] text-text"
                      />
                      <Trend className={`mt-1 size-4 shrink-0 ${good}`} />
                    </div>
                    <div>
                      <p className="text-[13.5px] font-medium leading-snug text-text">
                        {m.label}
                      </p>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-text-faint">
                        {m.detail}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      {/* tech marquee -------------------------------------------- */}
      <div className="marquee-mask overflow-hidden border-t border-line py-5">
        <div className="animate-marquee flex w-max gap-3">
          {[...marqueeSkills, ...marqueeSkills].map((s, idx) => (
            <span
              key={`${s}-${idx}`}
              className="mono shrink-0 rounded-full border border-line px-3.5 py-1.5 text-[11.5px] text-text-dim"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
