"use client";

import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="mono text-[11px] tracking-[0.2em] text-accent">
            {index}
          </span>
          <span className="h-px w-8 bg-line-strong" />
          <span className="label">{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="text-gradient mt-5 text-balance text-[clamp(1.9rem,4.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          {title}
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-4 text-pretty text-[15px] leading-relaxed text-text-dim">
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
