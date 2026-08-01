"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8">
        <p className="mono text-[11px] text-text-faint">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>

        <p className="mono hidden text-[11px] text-text-faint md:block">
          Next.js · TypeScript · Tailwind v4 · Motion
        </p>

        <a
          href="#top"
          className="group flex items-center gap-2 text-[11.5px] text-text-dim transition-colors hover:text-text"
        >
          Back to top
          <span className="grid size-7 place-items-center rounded-full border border-line transition-colors group-hover:border-line-strong">
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </div>
    </footer>
  );
}
