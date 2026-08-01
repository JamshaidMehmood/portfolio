"use client";

import { useState } from "react";
import { motion } from "motion/react";

type Slice = { name: string; value: number; color: string };

const SIZE = 132;
const R = 52;
const STROKE = 15;
const C = 2 * Math.PI * R;

export function DonutChart({ data }: { data: Slice[] }) {
  const [active, setActive] = useState<number | null>(null);
  const total = data.reduce((a, s) => a + s.value, 0) || 1;

  // Prefix-sum per slice rather than a running mutable offset — n is tiny and
  // it keeps the render pure.
  const arcs = data.map((s, i) => {
    const before = data.slice(0, i).reduce((sum, d) => sum + d.value, 0);
    const frac = s.value / total;
    return { ...s, frac, dash: frac * C, rotate: (before / total) * 360 };
  });

  const shown = active !== null ? arcs[active] : null;

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.045)"
            strokeWidth={STROKE}
          />
          {arcs.map((a, i) => (
            <motion.circle
              key={a.name}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke={a.color}
              strokeWidth={active === i ? STROKE + 3 : STROKE}
              strokeLinecap="butt"
              strokeDasharray={`${a.dash} ${C - a.dash}`}
              transform={`rotate(${a.rotate - 90} ${SIZE / 2} ${SIZE / 2})`}
              initial={{ strokeDashoffset: C, opacity: 0 }}
              animate={{
                strokeDashoffset: 0,
                opacity: active === null || active === i ? 1 : 0.32,
              }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="cursor-pointer transition-[stroke-width] duration-200"
            />
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="mono text-[19px] font-semibold leading-none text-text">
              {shown ? `${shown.value}%` : "100%"}
            </div>
            <div className="label mt-1 text-[9px]">
              {shown ? shown.name : "of hires"}
            </div>
          </div>
        </div>
      </div>

      <ul className="min-w-0 flex-1 space-y-2.5">
        {arcs.map((a, i) => (
          <li
            key={a.name}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="flex cursor-pointer items-center gap-2.5 transition-opacity duration-200"
            style={{ opacity: active === null || active === i ? 1 : 0.45 }}
          >
            <span
              className="size-2 shrink-0 rounded-[3px]"
              style={{ background: a.color }}
            />
            <span className="min-w-0 flex-1 truncate text-[12px] text-text-dim">
              {a.name}
            </span>
            <span className="mono text-[11.5px] text-text">{a.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
