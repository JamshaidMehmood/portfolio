"use client";

import { useId, useMemo, useState } from "react";
import { motion } from "motion/react";

type Point = { label: string; value: number };

const W = 560;
const H = 190;
const PAD = { t: 16, r: 12, b: 26, l: 30 };

export function TrendChart({ data }: { data: Point[] }) {
  const gid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);

  const { pts, area, line, yTicks, min, max } = useMemo(() => {
    const values = data.map((d) => d.value);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const pad = Math.max(4, (rawMax - rawMin) * 0.25);
    const min = Math.max(0, Math.floor((rawMin - pad) / 5) * 5);
    const max = Math.ceil((rawMax + pad) / 5) * 5;

    const iw = W - PAD.l - PAD.r;
    const ih = H - PAD.t - PAD.b;

    const pts = data.map((d, i) => ({
      ...d,
      x: PAD.l + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw),
      y: PAD.t + ih - ((d.value - min) / (max - min || 1)) * ih,
    }));

    // Catmull-Rom → cubic Bézier for a smooth but non-overshooting curve.
    let line = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      line += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    }

    const area = `${line} L ${pts[pts.length - 1].x} ${H - PAD.b} L ${pts[0].x} ${H - PAD.b} Z`;

    const yTicks = Array.from({ length: 4 }, (_, i) => {
      const v = min + ((max - min) / 3) * i;
      return { v: Math.round(v), y: PAD.t + ih - (i / 3) * ih };
    });

    return { pts, area, line, yTicks, min, max };
  }, [data]);

  const active = hover !== null ? pts[hover] : null;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none"
        role="img"
        aria-label={`Offer acceptance trend from ${min}% to ${max}%`}
        onPointerLeave={() => setHover(null)}
        onPointerMove={(e) => {
          const svg = e.currentTarget;
          const rect = svg.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * W;
          let nearest = 0;
          let best = Infinity;
          pts.forEach((p, i) => {
            const d = Math.abs(p.x - x);
            if (d < best) {
              best = d;
              nearest = i;
            }
          });
          setHover(nearest);
        }}
      >
        <defs>
          <linearGradient id={`fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7b61ff" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#7b61ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#7b61ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`stroke-${gid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7b61ff" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {yTicks.map((t) => (
          <g key={t.v}>
            <line
              x1={PAD.l}
              x2={W - PAD.r}
              y1={t.y}
              y2={t.y}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="3 4"
            />
            <text
              x={PAD.l - 8}
              y={t.y + 3.5}
              textAnchor="end"
              className="mono"
              fontSize="9"
              fill="#5c6572"
            >
              {t.v}
            </text>
          </g>
        ))}

        <motion.path
          key={`area-${data.map((d) => d.value).join()}`}
          d={area}
          fill={`url(#fill-${gid})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        <motion.path
          key={`line-${data.map((d) => d.value).join()}`}
          d={line}
          fill="none"
          stroke={`url(#stroke-${gid})`}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* x labels */}
        {pts.map((p, i) => (
          <text
            key={p.label}
            x={p.x}
            y={H - 8}
            textAnchor="middle"
            className="mono"
            fontSize="9"
            fill={hover === i ? "#eef1f5" : "#5c6572"}
          >
            {p.label}
          </text>
        ))}

        {/* crosshair */}
        {active && (
          <g>
            <line
              x1={active.x}
              x2={active.x}
              y1={PAD.t}
              y2={H - PAD.b}
              stroke="rgba(255,255,255,0.18)"
            />
            <circle cx={active.x} cy={active.y} r="9" fill="rgba(123,97,255,0.18)" />
            <circle
              cx={active.x}
              cy={active.y}
              r="3.5"
              fill="#0b0d10"
              stroke="#a78bfa"
              strokeWidth="2"
            />
          </g>
        )}

        {/* last-point marker when idle */}
        {!active && (
          <motion.circle
            cx={pts[pts.length - 1].x}
            cy={pts[pts.length - 1].y}
            r="3.5"
            fill="#0b0d10"
            stroke="#22d3ee"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 320, damping: 18 }}
          />
        )}
      </svg>

      {active && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-lg border border-line-strong bg-canvas-2/95 px-2.5 py-1.5 shadow-xl backdrop-blur"
          style={{
            left: `${(active.x / W) * 100}%`,
            top: `${(active.y / H) * 100}%`,
            marginTop: -10,
          }}
        >
          <div className="mono text-[9px] uppercase tracking-[0.12em] text-text-faint">
            {active.label}
          </div>
          <div className="mono text-[13px] font-semibold text-text">
            {active.value}%
          </div>
        </div>
      )}
    </div>
  );
}
