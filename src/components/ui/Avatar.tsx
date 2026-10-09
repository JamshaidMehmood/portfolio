"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Hand-drawn SVG portrait — no photo, no raster weight, crisp at any size.
 *
 * The face sits in its own <g> so it can parallax a few pixels against the
 * frame as the pointer moves, which is what stops a flat illustration from
 * reading as a sticker. Eyes blink on an irregular timer; both effects are
 * off under prefers-reduced-motion.
 */
export function Avatar({
  className = "",
  interactive = true,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const live = interactive && !reduced;

  // pointer parallax ------------------------------------------------------
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.4 });
  const faceX = useTransform(sx, [-1, 1], [-5, 5]);
  const faceY = useTransform(sy, [-1, 1], [-3.5, 3.5]);
  const pupilX = useTransform(sx, [-1, 1], [-2.4, 2.4]);
  const pupilY = useTransform(sy, [-1, 1], [-1.6, 1.6]);
  const hairX = useTransform(sx, [-1, 1], [-2, 2]);

  useEffect(() => {
    if (!live) return;
    const onMove = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // Normalise against a generous radius so the head drifts rather than
      // snapping to the cursor.
      px.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width * 2.4))));
      py.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height * 2.4))));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [live, px, py]);

  // blink -----------------------------------------------------------------
  const [lidY, setLidY] = useState(0);
  useEffect(() => {
    if (!live) return;
    let timer: ReturnType<typeof setTimeout>;
    let close: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        setLidY(1);
        close = setTimeout(() => setLidY(0), 120);
        schedule();
      }, 2600 + Math.random() * 3800);
    };
    schedule();
    return () => {
      clearTimeout(timer);
      clearTimeout(close);
    };
  }, [live]);

  const f = (n: string) => `${uid}-${n}`;

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Illustrated portrait of Jamshaid Mehmood"
    >
      <defs>
        <radialGradient id={f("bg")} cx="50%" cy="34%" r="76%">
          <stop offset="0%" stopColor="var(--av-1)" />
          <stop offset="58%" stopColor="var(--av-2)" />
          <stop offset="100%" stopColor="var(--av-3)" />
        </radialGradient>

        <linearGradient id={f("skin")} x1="28%" y1="6%" x2="78%" y2="100%">
          <stop offset="0%" stopColor="#e3ad7f" />
          <stop offset="52%" stopColor="#d2996b" />
          <stop offset="100%" stopColor="#b87f55" />
        </linearGradient>

        <linearGradient id={f("hair")} x1="22%" y1="0%" x2="84%" y2="92%">
          <stop offset="0%" stopColor="#2d323c" />
          <stop offset="46%" stopColor="#191d25" />
          <stop offset="100%" stopColor="#0f1217" />
        </linearGradient>

        <linearGradient id={f("suit")} x1="10%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor="#3a414e" />
          <stop offset="55%" stopColor="#2a303b" />
          <stop offset="100%" stopColor="#1b1f27" />
        </linearGradient>

        <linearGradient id={f("tie")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a4327c" />
          <stop offset="100%" stopColor="#6d1f52" />
        </linearGradient>

        {/* the suit is pinstriped in the photo — one repeat, tiled */}
        <pattern
          id={f("stripe")}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <rect width="7" height="7" fill="transparent" />
          <rect width="1" height="7" fill="#cfd6e2" opacity="0.22" />
        </pattern>

        <linearGradient id={f("rim")} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7b61ff" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>

        {/* Flat-fill glows left a visible ring edge; these fade out. */}
        <radialGradient id={f("glowA")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7b61ff" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#7b61ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={f("glowB")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>

        <clipPath id={f("disc")}>
          <circle cx="100" cy="100" r="96" />
        </clipPath>
      </defs>

      <circle cx="100" cy="100" r="96" fill={`url(#${f("bg")})`} />

      <g clipPath={`url(#${f("disc")})`}>
        {/* glow behind the head */}
        <circle cx="100" cy="76" r="70" fill={`url(#${f("glowA")})`} />
        <circle cx="140" cy="118" r="54" fill={`url(#${f("glowB")})`} />

        {/* suit, shirt and tie ----------------------------------------- */}
        <g>
          {/* jacket body */}
          <path
            d="M20 208c2-38 24-58 56-66l24-8 24 8c32 8 54 28 56 66z"
            fill={`url(#${f("suit")})`}
          />
          <path
            d="M20 208c2-38 24-58 56-66l24-8 24 8c32 8 54 28 56 66z"
            fill={`url(#${f("stripe")})`}
          />

          {/* shirt: only the V between the lapels */}
          <path d="M80 124L100 176L120 124Z" fill="#eaeef4" />
          {/* collar points */}
          <path d="M80 124l15 15-8 8-13-16z" fill="#f6f8fb" />
          <path d="M120 124l-15 15 8 8 13-16z" fill="#dbe1ea" />

          {/* tie */}
          <path d="M94 137h12l2 8-8 5-8-5z" fill={`url(#${f("tie")})`} />
          <path d="M94 150h12l-3 30-3 8-3-8z" fill={`url(#${f("tie")})`} />

          {/* lapels, over the shirt edges */}
          {[
            "M77 121l23 52-10 35H52c2-34 11-70 25-87z",
            "M123 121l-23 52 10 35h38c-2-34-11-70-25-87z",
          ].map((d) => (
            <g key={d}>
              <path d={d} fill={`url(#${f("suit")})`} />
              <path d={d} fill={`url(#${f("stripe")})`} />
            </g>
          ))}
          <path
            d="M77 121l23 52M123 121l-23 52"
            fill="none"
            stroke="#59616f"
            strokeWidth="1.1"
            opacity="0.65"
          />
          {/* double-breasted buttons */}
          <circle cx="88" cy="190" r="2.4" fill="#b9bfc9" opacity="0.65" />
          <circle cx="112" cy="190" r="2.4" fill="#b9bfc9" opacity="0.65" />
        </g>

        {/* neck --------------------------------------------------------- */}
        <path d="M87 108h26v30c0 7-6 12-13 12s-13-5-13-12z" fill="#b87f55" />
        <path d="M87 108h26v13c-6 5-20 5-26 0z" fill="#9c6945" opacity="0.6" />

        {/* head --------------------------------------------------------- */}
        <motion.g style={live ? { x: faceX, y: faceY } : undefined}>
          {/* ears */}
          <ellipse cx="68" cy="94" rx="7" ry="10" fill="#c0875c" />
          <ellipse cx="132" cy="94" rx="7" ry="10" fill="#c0875c" />
          <path
            d="M66 91c3-1 5 1 5 4s-2 6-4 5"
            fill="none"
            stroke="#a06f49"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M134 91c-3-1-5 1-5 4s2 6 4 5"
            fill="none"
            stroke="#a06f49"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          <path
            d="M70 80c0-22 13-38 30-38s30 16 30 38v12c0 23-13 40-30 40s-30-17-30-40z"
            fill={`url(#${f("skin")})`}
          />

          {/* beard — full, joined to the sideburns, moustache included */}
          <path
            d="M70 82c0 4 0 8 1 12 3 21 14 38 29 38s26-17 29-38c1-4 1-8 1-12 0 14-5 25-13 30-5 4-11 6-17 6s-12-2-17-6c-8-5-13-16-13-30z"
            fill={`url(#${f("hair")})`}
          />
          {/* beard sheen along the jaw */}
          <path
            d="M74 104c3 16 13 28 26 28s23-12 26-28c-1 14-5 23-11 28-5 4-10 6-15 6s-10-2-15-6c-6-5-10-14-11-28z"
            fill="#39404d"
            opacity="0.38"
          />

          {/* lips, sitting on the beard */}
          <path
            d="M91 115c4-2 14-2 18 0-2 3-6 5-9 5s-7-2-9-5z"
            fill="#9c5c46"
          />
          <path
            d="M91 115c4 3 14 3 18 0"
            fill="none"
            stroke="#5d3526"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* hair — volume on top, swept up and slightly across */}
          <motion.g style={live ? { x: hairX } : undefined}>
            <path
              d="M68 88c-3-25 6-44 28-45 5 0 10 1 14 3 13 6 20 24 18 46-2-12-5-19-10-23-11 6-25 8-38 6-6-1-11-4-14-8-1 6-1 13 2 21z"
              fill={`url(#${f("hair")})`}
            />
            {/* swept quiff at the front */}
            <path
              d="M75 60c4-10 13-16 24-16 6 0 11 2 15 5-8-2-15-2-21 0-8 2-14 5-18 11z"
              fill="#434b59"
              opacity="0.5"
            />
            <path
              d="M80 52c6-5 13-8 21-7 5 0 9 2 12 4-7-2-13-2-18-1-6 1-11 2-15 4z"
              fill="#525b6b"
              opacity="0.35"
            />
          </motion.g>

          {/* brows — thick, as in the photo */}
          <path
            d="M76 78c6-5 14-6 19-2l-1 4c-5-3-12-3-18 1z"
            fill="#14171d"
          />
          <path
            d="M124 78c-6-5-14-6-19-2l1 4c5-3 12-3 18 1z"
            fill="#14171d"
          />

          {/* eyes ------------------------------------------------------- */}
          <g>
            <ellipse cx="87" cy="90" rx="5.2" ry="3.3" fill="#f4efe8" />
            <ellipse cx="113" cy="90" rx="5.2" ry="3.3" fill="#f4efe8" />
            <motion.g style={live ? { x: pupilX, y: pupilY } : undefined}>
              <circle cx="87" cy="90" r="2.5" fill="#33251a" />
              <circle cx="113" cy="90" r="2.5" fill="#33251a" />
              <circle cx="88" cy="89" r="0.85" fill="#ffffff" opacity="0.8" />
              <circle cx="114" cy="89" r="0.85" fill="#ffffff" opacity="0.8" />
            </motion.g>
            {/* upper lid — keeps the eyes from reading wide-open */}
            <path
              d="M81.8 88.6c2.5-2.6 7.8-2.6 10.4 0M107.8 88.6c2.5-2.6 7.8-2.6 10.4 0"
              fill="none"
              stroke="#5f4530"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <motion.g
              animate={{ scaleY: lidY }}
              initial={{ scaleY: 0 }}
              style={{ originY: 0 }}
              transition={{ duration: 0.08, ease: "linear" }}
            >
              <rect x="81" y="85.5" width="12" height="9" fill="#d2996b" />
              <rect x="107" y="85.5" width="12" height="9" fill="#d2996b" />
            </motion.g>
          </g>

          {/* nose -------------------------------------------------------- */}
          <path
            d="M100 93v10c0 2-2 3-4 3.5"
            fill="none"
            stroke="#a06f49"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M95 107c3 1 7 1 10 0"
            fill="none"
            stroke="#9a6744"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.8"
          />
        </motion.g>
      </g>

      {/* frame ------------------------------------------------------------ */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke={`url(#${f("rim")})`}
        strokeWidth="1.6"
        opacity="0.5"
      />
    </svg>
  );
}
