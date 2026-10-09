"use client";

import { motion } from "motion/react";
import { Building2 } from "lucide-react";
import { certifications, education, experience } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Experience"
          title="Two-plus years on one product, end to end."
          lead="Depth over breadth: the same codebase from Figma handoff through production, long enough to own the consequences of my own architecture decisions."
        />

        <div className="mt-14 space-y-6">
          {experience.map((job) => (
            <Reveal key={job.company}>
              <article className="panel relative overflow-hidden">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full blur-[90px]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(123,97,255,0.16), transparent 70%)",
                  }}
                />

                <div className="relative border-b border-line p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-surface-2">
                        <Building2 className="size-5 text-accent" />
                      </span>
                      <div>
                        <h3 className="text-[19px] font-medium tracking-[-0.02em] text-text">
                          {job.role}
                          <span className="text-text-faint"> · </span>
                          <span className="text-text-dim">{job.company}</span>
                        </h3>
                        <p className="mt-1 text-[13px] text-text-dim">
                          {job.product}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-pos/25 bg-pos/[0.08] px-2.5 py-1">
                          <span className="size-1.5 rounded-full bg-pos" />
                          <span className="mono text-[9.5px] uppercase tracking-[0.12em] text-pos">
                            Current
                          </span>
                        </span>
                      )}
                      <div className="text-right">
                        <p className="mono text-[12px] text-text">{job.period}</p>
                        <p className="mono mt-0.5 text-[10.5px] text-text-faint">
                          {job.duration} · {job.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 max-w-[72ch] text-pretty text-[14px] leading-relaxed text-text-dim">
                    {job.blurb}
                  </p>
                </div>

                <div className="relative grid gap-px bg-line md:grid-cols-2 xl:grid-cols-3">
                  {job.groups.map((g, gi) => (
                    <div key={g.title} className="bg-canvas p-6 sm:p-7">
                      <div className="mb-4 flex items-center gap-2.5">
                        <span className="mono text-[10px] text-accent">
                          {String(gi + 1).padStart(2, "0")}
                        </span>
                        <h4 className="text-[13px] font-medium tracking-tight text-text">
                          {g.title}
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {g.points.map((p, pi) => (
                          <motion.li
                            key={p}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: pi * 0.05, duration: 0.45 }}
                            className="flex gap-2.5 text-[13px] leading-relaxed text-text-dim"
                          >
                            <span className="mt-[7px] size-1 shrink-0 rounded-full bg-text-faint" />
                            {p}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* The gap-px/bg-line trick paints the grid gutters, so an
                      incomplete final row would show as a bare strip. Pad it
                      out at each column count. */}
                  {Array.from({ length: (2 - (job.groups.length % 2)) % 2 }).map((_, i) => (
                    <div key={`pad2-${i}`} className="hidden bg-canvas md:block xl:hidden" />
                  ))}
                  {Array.from({ length: (3 - (job.groups.length % 3)) % 3 }).map((_, i) => (
                    <div key={`pad3-${i}`} className="hidden bg-canvas xl:block" />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* education + certs -------------------------------------- */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal delay={0.05}>
            <div className="panel h-full p-6 sm:p-7">
              <p className="label mb-5">Education</p>
              <ul className="space-y-5">
                {education.map((e) => (
                  <li
                    key={e.degree}
                    className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1.5 border-b border-line pb-5 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="text-[14.5px] font-medium tracking-tight text-text">
                        {e.degree}
                      </p>
                      <p className="mt-1 text-[12.5px] text-text-dim">{e.org}</p>
                    </div>
                    <div className="text-right">
                      <p className="mono text-[11.5px] text-text-dim">{e.period}</p>
                      <p className="mono mt-1 text-[11.5px] text-accent-2">
                        {e.grade}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel h-full p-6 sm:p-7">
              <p className="label mb-5">Certifications</p>
              <ul className="space-y-4">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <p className="text-[14px] font-medium tracking-tight text-text">
                      {c.name}
                    </p>
                    <p className="mono mt-1 text-[11.5px] text-text-faint">
                      {c.org} · {c.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
