"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";

/**
 * Card wrapper with a cursor-following radial highlight on the border layer.
 * Pure CSS mask + motion values, no re-renders on move.
 */
export function SpotlightCard({
  children,
  className = "",
  color = "rgba(123,97,255,0.28)",
  radius = 340,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 72%)`;

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-9999);
        y.set(-9999);
      }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
