"use client";

import { motion } from "motion/react";
import { skillGroups } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { SpotlightCard } from "./ui/Spotlight";

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-line py-24 sm:py-32">
      <div aria-hidden className="dot-bg pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="05"
          eyebrow="Capabilities"
          title="Frontend-first, full-stack aware."
          lead="The bars are a self-assessment against what I've actually shipped — not a claim to mastery. Backend sits here because I design UI against the shape of the data, and sometimes change that shape."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.07}>
              <SpotlightCard className="panel panel-hover h-full" radius={400}>
                <div className="p-6 sm:p-7">
                  <div className="mb-6 flex items-baseline justify-between gap-4">
                    <h3 className="text-[15.5px] font-medium tracking-[-0.02em] text-text">
                      {group.title}
                    </h3>
                    <span className="mono text-[10.5px] text-text-faint">
                      {group.note}
                    </span>
                  </div>

                  <ul className="space-y-3.5">
                    {group.items.map((item, i) => (
                      <li key={item.name}>
                        <div className="mb-1.5 flex items-baseline justify-between gap-3">
                          <span className="text-[13px] text-text-dim">
                            {item.name}
                          </span>
                          <span className="mono text-[10.5px] text-text-faint">
                            {item.level}
                          </span>
                        </div>
                        <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.055]">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                              duration: 0.95,
                              delay: 0.1 + i * 0.06,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
