"use client";

import { motion } from "motion/react";
import type { FunnelStage } from "@/lib/dashboard-data";

const fmt = new Intl.NumberFormat("en-US");

export function FunnelChart({ data }: { data: FunnelStage[] }) {
  const top = data[0]?.count || 1;

  return (
    <ul className="space-y-3">
      {data.map((s, i) => {
        const pct = (s.count / top) * 100;
        const conv = i === 0 ? null : (s.count / data[i - 1].count) * 100;

        return (
          <li key={s.stage} className="group/row">
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-[12px] text-text-dim">{s.stage}</span>
              <span className="flex items-baseline gap-2">
                {conv !== null && (
                  <span className="mono text-[10px] text-text-faint">
                    {conv.toFixed(0)}%
                  </span>
                )}
                <span className="mono text-[12.5px] font-medium text-text">
                  {fmt.format(s.count)}
                </span>
              </span>
            </div>
            <div className="h-[7px] overflow-hidden rounded-full bg-white/[0.045]">
              <motion.div
                key={`${s.stage}-${s.count}`}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #7b61ff ${0}%, #22d3ee 100%)`,
                  opacity: 1 - i * 0.11,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
