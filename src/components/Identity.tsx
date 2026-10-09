"use client";

import { Mail, MapPin } from "lucide-react";
import { education, profile } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { Avatar } from "./ui/Avatar";

const details = [
  { k: "Based in", v: profile.location },
  { k: "Timezone", v: profile.timezone },
  { k: "Currently", v: `${profile.badge.orgRole} · ${profile.badge.org}` },
  { k: "Focus", v: "Analytics UI · Test automation" },
  { k: "Education", v: `${education[0].degree} · ${education[0].grade}` },
  { k: "Status", v: profile.availabilityNote },
];

/** Portrait + the facts a recruiter scans for, in one strip. */
export function Identity() {
  return (
    <section id="identity" className="relative border-t border-line py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="panel flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="flex shrink-0 items-center gap-5">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-2.5 rounded-full bg-[radial-gradient(circle,rgba(123,97,255,0.20),transparent_70%)] blur-md"
                />
                <Avatar className="relative size-[92px] sm:size-[108px]" />
                <span className="absolute bottom-1 right-1 grid size-[18px] place-items-center rounded-full border-2 border-canvas bg-pos">
                  <span className="sr-only">Available for work</span>
                </span>
              </div>
              <div>
                <p className="text-[17px] font-semibold tracking-[-0.025em] text-text">
                  {profile.name}
                </p>
                <p className="mono mt-1 text-[10.5px] tracking-[0.13em] text-text-faint">
                  {profile.role.toUpperCase()}
                </p>
              </div>
            </div>

            <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              {details.map((d) => (
                <div key={d.k}>
                  <dt className="label">{d.k}</dt>
                  <dd className="mt-1.5 text-[13px] leading-snug text-text">
                    {d.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex shrink-0 flex-wrap gap-2 lg:flex-col">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-4 py-2 text-[12.5px] text-text transition-colors hover:border-accent/50 hover:bg-accent/[0.09]"
              >
                <Mail className="size-3.5 text-text-faint" />
                Email me
              </a>
              <span className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[12.5px] text-text-dim">
                <MapPin className="size-3.5 text-text-faint" />
                {profile.timezone}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
