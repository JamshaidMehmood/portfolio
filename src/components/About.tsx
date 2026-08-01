"use client";

import { principles, profile } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";

export function About() {
  return (
    <section id="about" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              index="06"
              eyebrow="About"
              title="How I think about the work."
            />

            <div className="mt-8 space-y-5 text-[15px] leading-[1.8] text-text-dim">
              <p className="text-pretty">{profile.intro}</p>
              <p className="text-pretty">{profile.intro2}</p>
              <p className="text-pretty">
                What I care about most is the invisible part: whether a filtered
                view survives a refresh, whether a table stays readable at 400
                rows, whether the fifth engineer to touch a component can tell
                what it does. Most of my best work is stuff a user never
                consciously notices.
              </p>
            </div>

            <Reveal delay={0.2}>
              <figure className="mt-10 border-l-2 border-accent/50 pl-5">
                <blockquote className="text-pretty text-[16px] leading-relaxed text-text">
                  &ldquo;{profile.tagline}&rdquo;
                </blockquote>
                <figcaption className="label mt-3">
                  {profile.firstName}, on why analytics UI
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Stagger className="grid gap-px self-start overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2">
            {principles.map((p, i) => (
              <StaggerItem key={p.title} className="bg-canvas">
                <div className="h-full p-6 sm:p-7">
                  <span className="mono text-[10px] tracking-[0.16em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3.5 text-balance text-[15px] font-medium leading-snug tracking-[-0.02em] text-text">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-pretty text-[13px] leading-relaxed text-text-dim">
                    {p.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
