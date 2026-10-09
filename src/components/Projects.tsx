"use client";

import { ArrowUpRight, Code2, ExternalLink, KeyRound } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { SpotlightCard } from "./ui/Spotlight";
import { GithubIcon } from "./ui/BrandIcons";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Side projects"
          title="Where I build the backend too."
          lead="At work I own the frontend and extend the API behind it. On my own time I ship the whole thing — schema, endpoints, auth and client. These are on GitHub, and all four are deployed and running."
        />

        <div className="mt-14 space-y-4">
          {featured.map((p) => (
            <Reveal key={p.id}>
              <FeaturedCard project={p} />
            </Reveal>
          ))}

          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={0.06 * (i + 1)}>
                <CompactCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function FeaturedCard({ project: p }: { project: Project }) {
  return (
    <SpotlightCard className="panel" radius={520} color="rgba(123,97,255,0.16)">
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        {/* left ------------------------------------------------- */}
        <div className="border-b border-line p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center gap-2.5">
            {p.live && (
              <span className="inline-flex items-center gap-2 rounded-full border border-pos/25 bg-pos/[0.08] py-1 pl-2 pr-3">
                <span className="relative grid size-[7px] place-items-center">
                  <span className="absolute size-[7px] rounded-full bg-pos/60 animate-pulse-ring" />
                  <span className="size-[7px] rounded-full bg-pos" />
                </span>
                <span className="mono text-[9.5px] uppercase tracking-[0.13em] text-pos">
                  Live
                </span>
              </span>
            )}
            <span className="mono text-[10.5px] uppercase tracking-[0.12em] text-text-faint">
              {p.tagline}
            </span>
            <span className="mono ml-auto text-[10.5px] text-text-faint">
              {p.year}
            </span>
          </div>

          <h3 className="mt-5 text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold leading-none tracking-[-0.035em] text-text">
            {p.name}
          </h3>
          <p className="mono mt-3 text-[11px] leading-relaxed text-accent-2">
            {p.role}
          </p>

          <p className="mt-5 text-pretty text-[14px] leading-relaxed text-text-dim">
            {p.summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {p.live && (
              <a
                href={p.live.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full bg-text px-5 py-2.5 text-[13px] font-semibold text-canvas transition-transform duration-300 hover:scale-[1.03] active:scale-[0.99]"
              >
                <ExternalLink className="size-3.5" />
                Open live demo
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-5 py-2.5 text-[13px] font-medium text-text transition-all duration-300 hover:border-accent/50 hover:bg-accent/[0.09]"
            >
              <GithubIcon className="size-4" />
              Source
            </a>
          </div>

          {p.live && (
            <div className="mt-5 space-y-2">
              <p className="mono flex items-start gap-2 text-[10.5px] leading-relaxed text-text-faint">
                <ExternalLink className="mt-[1px] size-3 shrink-0" />
                {p.live.label}
              </p>
              {p.live.note && (
                <p className="mono flex items-start gap-2 text-[10.5px] leading-relaxed text-text-faint">
                  <KeyRound className="mt-[1px] size-3 shrink-0" />
                  {p.live.note}
                </p>
              )}
            </div>
          )}
        </div>

        {/* right ------------------------------------------------ */}
        <div className="p-6 sm:p-8">
          <div className="space-y-7">
            {p.highlights.map((h) => (
              <div key={h.label}>
                <p className="label mb-3">{h.label}</p>
                <ul className="space-y-2.5">
                  {h.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[13px] leading-relaxed text-text-dim"
                    >
                      <span
                        className="mt-[7px] size-1 shrink-0 rounded-full"
                        style={{ background: p.accent }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3 border-t border-line pt-6">
            {p.stack.map((s) => (
              <div key={s.group} className="flex flex-wrap items-center gap-1.5">
                <span className="label mr-1.5 w-[62px] shrink-0">{s.group}</span>
                {s.items.map((t) => (
                  <span
                    key={t}
                    className="mono rounded-md border border-line bg-surface-1 px-2 py-1 text-[10.5px] text-text-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

function CompactCard({ project: p }: { project: Project }) {
  return (
    <SpotlightCard className="panel panel-hover h-full" radius={380}>
      <div className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-center gap-2.5">
          <Code2 className="size-3.5" style={{ color: p.accent }} />
          <span className="mono text-[10.5px] uppercase tracking-[0.12em] text-text-faint">
            {p.tagline}
          </span>
          <span className="mono ml-auto text-[10.5px] text-text-faint">
            {p.year}
          </span>
        </div>

        <h3 className="mt-4 text-[18px] font-medium tracking-[-0.025em] text-text">
          {p.name}
        </h3>
        <p className="mono mt-2 text-[10.5px] text-text-faint">{p.role}</p>

        <p className="mt-4 text-pretty text-[13px] leading-relaxed text-text-dim">
          {p.summary}
        </p>

        <ul className="mt-5 space-y-2.5">
          {p.highlights[0].items.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-[12.5px] leading-relaxed text-text-dim"
            >
              <span
                className="mt-[7px] size-1 shrink-0 rounded-full"
                style={{ background: p.accent }}
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.stack.flatMap((s) => s.items).map((t) => (
            <span
              key={t}
              className="mono rounded-md border border-line bg-surface-1 px-2 py-1 text-[10.5px] text-text-dim"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={p.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-auto flex items-center gap-2 pt-7 text-[12.5px] font-medium text-text-dim transition-colors hover:text-text"
        >
          <GithubIcon className="size-3.5" />
          View source
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </SpotlightCard>
  );
}
