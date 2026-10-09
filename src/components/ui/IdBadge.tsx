"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { MapPin, RotateCcw } from "lucide-react";
import { profile } from "@/lib/content";
import { Avatar } from "./Avatar";

/**
 * Hero identity card. Hangs from a lanyard, swings when dragged, and flips
 * to a detail side on click.
 *
 * Drag and click share the same element, so a pointer-down records its
 * origin and the click only flips if the pointer barely moved — otherwise
 * letting go of a swing would flip the card every time.
 */
export function IdBadge({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  // Motion only fires onDragStart once the drag threshold is crossed, so
  // this stays false for a plain click — which is exactly the distinction
  // we need to avoid flipping the card at the end of every swing.
  const dragging = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // The card pivots from the clip, so horizontal drag reads as a swing.
  const tilt = useTransform(x, [-140, 140], [-16, 16]);
  const tiltSpring = useSpring(tilt, { stiffness: 220, damping: 14 });
  const strapSkew = useTransform(tiltSpring, (v) => `${v * 0.32}deg`);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* lanyard ------------------------------------------------------- */}
      <motion.div
        aria-hidden
        className="relative h-20 w-[30px] origin-top"
        style={reduced ? undefined : { rotate: strapSkew }}
      >
        <div className="absolute inset-x-0 top-0 h-full rounded-b-[3px] bg-gradient-to-b from-[var(--badge-clip-1)] via-[var(--line-strong)] to-transparent" />
        <div className="absolute inset-x-[9px] top-0 h-full bg-[repeating-linear-gradient(180deg,var(--badge-strap)_0_7px,transparent_7px_14px)]" />
        <div className="absolute inset-x-0 top-0 h-full rounded-b-[3px] border-x border-line" />
        {/* clip */}
        <div className="absolute -bottom-2 left-1/2 h-5 w-9 -translate-x-1/2 rounded-[4px] border border-line-strong bg-gradient-to-b from-[var(--badge-clip-1)] to-[var(--badge-clip-2)]" />
        <div className="absolute -bottom-[2px] left-1/2 h-2 w-4 -translate-x-1/2 rounded-full border border-line-strong bg-canvas" />
      </motion.div>

      {/* card ---------------------------------------------------------- */}
      <div className="[perspective:1400px]">
        <motion.div
          drag={reduced ? false : true}
          dragConstraints={{ left: -60, right: 60, top: -16, bottom: 34 }}
          dragElastic={0.22}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
          whileDrag={{ cursor: "grabbing" }}
          onDragStart={() => {
            dragging.current = true;
          }}
          onDragEnd={() => {
            // Cleared after the click that ends the drag has been handled.
            setTimeout(() => {
              dragging.current = false;
            }, 0);
          }}
          onClick={() => {
            if (!dragging.current) setFlipped((v) => !v);
          }}
          style={{ x, y, rotate: reduced ? 0 : tiltSpring }}
          className="relative w-[272px] cursor-grab touch-none select-none"
        >
          <motion.div
            className="relative h-[372px] w-full [transform-style:preserve-3d]"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <BadgeFace side="front" />
            <BadgeFace side="back" />
          </motion.div>
        </motion.div>
      </div>

      <p className="mono mt-6 flex items-center gap-2 text-[10.5px] tracking-[0.12em] text-text-faint">
        <RotateCcw className="size-3" />
        {reduced ? "Click to flip" : "Drag a little · click to flip"}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function BadgeFace({ side }: { side: "front" | "back" }) {
  const back = side === "back";

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[18px] border border-line-strong bg-[linear-gradient(168deg,var(--badge-1)_0%,var(--badge-2)_58%,var(--badge-3)_100%)] shadow-[var(--shadow-lift)] [backface-visibility:hidden]"
      style={back ? { transform: "rotateY(180deg)" } : undefined}
      aria-hidden={back ? undefined : undefined}
    >
      {/* punch hole */}
      <div className="absolute left-1/2 top-3.5 h-[9px] w-[52px] -translate-x-1/2 rounded-full border border-line-strong bg-canvas" />
      {/* sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 top-0 h-full w-28 rotate-12 bg-gradient-to-r from-transparent via-[var(--badge-sheen)] to-transparent"
      />

      {back ? <BackSide /> : <FrontSide />}
    </div>
  );
}

function FrontSide() {
  return (
    <div className="flex h-full flex-col px-5 pb-5 pt-10">
      <div className="flex items-center justify-between">
        <span className="mono text-[9.5px] tracking-[0.2em] text-text-faint">
          {profile.badge.id}
        </span>
        <span className="mono rounded-full border border-line px-2 py-[3px] text-[8.5px] tracking-[0.14em] text-accent-2">
          ENGINEERING
        </span>
      </div>

      <div className="mt-5 flex justify-center">
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(123,97,255,0.22),transparent_68%)] blur-md"
          />
          <Avatar className="relative size-[120px]" />
        </div>
      </div>

      <div className="mt-5 text-center">
        <p className="text-[17px] font-semibold tracking-[-0.025em] text-text">
          {profile.name}
        </p>
        <p className="mono mt-1.5 text-[10px] tracking-[0.13em] text-text-faint">
          {profile.badge.orgRole.toUpperCase()}
        </p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-text-dim">
          <MapPin className="size-3 text-text-faint" />
          {profile.location}
        </div>

        {/* barcode — decorative, deterministic so SSR and client agree */}
        <div
          aria-hidden
          className="mt-3.5 flex h-8 items-end justify-center gap-[2px] opacity-70"
        >
          {BARS.map((h, i) => (
            <span
              key={i}
              className="w-[2px] rounded-[1px] bg-text-dim"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BackSide() {
  return (
    <div className="flex h-full flex-col px-5 pb-5 pt-10">
      <span className="mono text-[9.5px] tracking-[0.2em] text-text-faint">
        A FEW QUICK FACTS
      </span>

      <dl className="mt-4 space-y-3.5">
        {profile.badge.facts.map((f) => (
          <div key={f.k} className="border-b border-line pb-3">
            <dt className="mono text-[9px] tracking-[0.16em] text-text-faint">
              {f.k.toUpperCase()}
            </dt>
            <dd className="mt-1 text-[12.5px] leading-snug text-text">{f.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex items-end justify-between gap-3">
        <div>
          <p className="mono text-[9px] tracking-[0.16em] text-text-faint">
            AVAILABLE
          </p>
          <p className="mt-1 text-[12px] leading-snug text-pos">
            {profile.availabilityNote}
          </p>
        </div>
        <div
          aria-hidden
          className="grid size-12 shrink-0 grid-cols-5 gap-[2px] rounded-[5px] border border-line p-1.5"
        >
          {QR.map((on, i) => (
            <span
              key={i}
              className={`rounded-[1px] ${on ? "bg-text-dim" : "bg-transparent"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Fixed patterns — a random() here would mismatch between server and client. */
const BARS = [
  62, 100, 44, 78, 36, 92, 54, 70, 40, 96, 58, 48, 84, 34, 74, 100, 46, 66, 38,
  88, 56, 76, 42, 94, 64, 50, 82, 36, 72, 98,
];

const QR = [
  1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0,
].map(Boolean);
