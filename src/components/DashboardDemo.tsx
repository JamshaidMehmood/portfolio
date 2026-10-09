"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Link2, RefreshCw } from "lucide-react";
import {
  getDataset,
  ranges,
  roles,
  type RangeId,
  type RoleId,
} from "@/lib/dashboard-data";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { TrendChart } from "./charts/TrendChart";
import { FunnelChart } from "./charts/FunnelChart";
import { DonutChart } from "./charts/DonutChart";

const fmt = new Intl.NumberFormat("en-US");
const ease = [0.22, 1, 0.36, 1] as const;

export function DashboardDemo() {
  const [role, setRole] = useState<RoleId>("lead");
  const [range, setRange] = useState<RangeId>("30d");
  const [loading, setLoading] = useState(false);
  // Bumped on every filter change so the fake-latency timer restarts even when
  // the visitor clicks twice in a row.
  const [request, setRequest] = useState(0);

  const data = useMemo(() => getDataset(role, range), [role, range]);

  // Mirrors the production behaviour: a filter change refetches, and the UI
  // shows skeletons rather than an empty frame while it does.
  useEffect(() => {
    if (request === 0) return;
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, [request]);

  const changeRole = (v: RoleId) => {
    setRole(v);
    setLoading(true);
    setRequest((n) => n + 1);
  };

  const changeRange = (v: RangeId) => {
    setRange(v);
    setLoading(true);
    setRequest((n) => n + 1);
  };

  const query = `?view=${role}&range=${range}&sort=hires:desc&page=1`;

  return (
    <section id="dashboard" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 h-[420px] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,97,255,0.09), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Live demo"
          title="Not a screenshot — the real thing."
          lead="A working slice of the dashboard pattern I build: role-scoped views, URL-backed filters, skeleton loading states, and charts rendered from raw SVG. Change the filters and watch the address bar mock update — that's the deep-link behaviour, running."
        />

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-[18px] border border-line-strong bg-canvas-2/70 shadow-[var(--shadow-lift)] backdrop-blur">
            {/* browser chrome ------------------------------------- */}
            <div className="flex items-center gap-3 border-b border-line bg-surface-1 px-4 py-3">
              <div className="flex gap-1.5">
                {["#fb7185", "#fbbf24", "#34d399"].map((c) => (
                  <span
                    key={c}
                    className="size-[9px] rounded-full"
                    style={{ background: c, opacity: 0.55 }}
                  />
                ))}
              </div>
              <div className="mono flex min-w-0 flex-1 items-center gap-2 rounded-md border border-line bg-canvas/70 px-2.5 py-1.5 text-[10.5px]">
                <Link2 className="size-3 shrink-0 text-text-faint" />
                <span className="truncate text-text-faint">
                  app.hirestream.io/analytics
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={query}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25 }}
                      className="inline-block text-accent-2"
                    >
                      {query}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
              <span className="mono hidden shrink-0 rounded border border-line px-1.5 py-0.5 text-[9px] text-text-faint sm:block">
                deep-linkable
              </span>
            </div>

            {/* filter bar ----------------------------------------- */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line px-4 py-3.5 sm:px-6">
              <SegmentedControl
                name="role"
                options={roles.map((r) => ({ id: r.id, label: r.label }))}
                value={role}
                onChange={(v) => changeRole(v as RoleId)}
              />
              <SegmentedControl
                name="range"
                options={ranges.map((r) => ({ id: r.id, label: r.label }))}
                value={range}
                onChange={(v) => changeRange(v as RangeId)}
              />
              <span className="ml-auto flex items-center gap-2 text-[11px] text-text-faint">
                <RefreshCw
                  className={`size-3 ${loading ? "animate-spin text-accent" : ""}`}
                />
                <span className="mono">
                  {loading
                    ? "fetching…"
                    : roles.find((r) => r.id === role)?.scope}
                </span>
              </span>
            </div>

            {/* body ------------------------------------------------ */}
            <div className="p-4 sm:p-6">
              {/* KPI row */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {data.kpis.map((k, i) => {
                  const good = k.inverse ? k.delta < 0 : k.delta > 0;
                  const Arrow = k.delta < 0 ? ArrowDownRight : ArrowUpRight;
                  return (
                    <motion.div
                      key={k.key}
                      layout
                      className="panel panel-hover p-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease }}
                    >
                      {/* wraps rather than truncates — these labels are wide
                          at mobile widths and losing the noun is worse than
                          losing a line of height */}
                      <p className="label">{k.label}</p>
                      {loading ? (
                        <Skeleton className="mt-3 h-7 w-20" />
                      ) : (
                        <AnimatePresence mode="popLayout">
                          <motion.p
                            key={`${k.key}-${k.value}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="mono mt-2.5 text-[clamp(1.35rem,2.6vw,1.75rem)] font-semibold leading-none tracking-[-0.035em] text-text"
                          >
                            {fmt.format(k.value)}
                            {k.suffix}
                          </motion.p>
                        </AnimatePresence>
                      )}
                      <p
                        className={`mono mt-2.5 flex items-center gap-1 text-[10.5px] ${
                          good ? "text-pos" : "text-neg"
                        }`}
                      >
                        <Arrow className="size-3" />
                        {Math.abs(k.delta).toFixed(1)}%
                        <span className="text-text-faint">vs prev.</span>
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* charts */}
              <div className="mt-3 grid gap-3 lg:grid-cols-[1.55fr_1fr]">
                <Panel
                  title="Offer acceptance trend"
                  meta={ranges.find((r) => r.id === range)?.label}
                >
                  {loading ? (
                    <Skeleton className="h-[190px] w-full" />
                  ) : (
                    <TrendChart key={`${role}-${range}`} data={data.trend} />
                  )}
                </Panel>

                <Panel title="Hiring funnel" meta="conversion">
                  {loading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-[7px] w-full" />
                      ))}
                    </div>
                  ) : (
                    <FunnelChart key={`${role}-${range}`} data={data.funnel} />
                  )}
                </Panel>
              </div>

              <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.55fr]">
                <Panel title="Source of hire" meta="share">
                  {loading ? (
                    <Skeleton className="h-[132px] w-full" />
                  ) : (
                    <DonutChart key={role} data={data.sources} />
                  )}
                </Panel>

                <Panel
                  title={roles.find((r) => r.id === role)!.tableTitle}
                  meta="sorted by hires"
                >
                  {loading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full" />
                      ))}
                    </div>
                  ) : (
                    <PerformanceTable data={data.table} />
                  )}
                </Panel>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3 sm:px-6">
              <span className="mono text-[10px] text-text-faint">
                Synthetic data · charts hand-rolled in SVG · no chart library
              </span>
              <span className="mono text-[10px] text-text-faint">
                {data.table.length} rows · page 1 of 1
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function SegmentedControl({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex rounded-full border border-line bg-canvas/60 p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className="relative rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors duration-200"
        >
          {value === o.id && (
            <motion.span
              layoutId={`seg-${name}`}
              className="absolute inset-0 rounded-full border border-line-strong bg-surface-4"
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
            />
          )}
          <span
            className={`relative ${value === o.id ? "text-text" : "text-text-faint hover:text-text-dim"}`}
          >
            {o.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function Panel({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="panel p-4 sm:p-5">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h3 className="text-[13px] font-medium tracking-tight text-text">
          {title}
        </h3>
        {meta && <span className="label">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-surface-2 ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--shimmer), transparent)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function PerformanceTable({
  data,
}: {
  data: { name: string; reqs: number; hires: number; accept: number }[];
}) {
  const maxHires = Math.max(...data.map((d) => d.hires));

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-line">
          {["Name", "Reqs", "Hires", "Accept"].map((h, i) => (
            <th
              key={h}
              className={`label pb-2 font-normal ${i === 0 ? "text-left" : "text-right"}`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => (
          <motion.tr
            key={r.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className="border-b border-line/60 last:border-0"
          >
            <td className="py-2.5 pr-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line bg-surface-2">
                  <span className="mono text-[9px] text-text-dim">
                    {r.name
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </span>
                <span className="truncate text-[12.5px] text-text">{r.name}</span>
              </div>
            </td>
            <td className="mono py-2.5 text-right text-[12px] text-text-dim">
              {r.reqs}
            </td>
            <td className="py-2.5 text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="hidden h-1 w-14 overflow-hidden rounded-full bg-surface-3 sm:block">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${(r.hires / maxHires) * 100}%` }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease }}
                  />
                </span>
                <span className="mono text-[12px] text-text">{r.hires}</span>
              </div>
            </td>
            <td className="mono py-2.5 text-right text-[12px]">
              <span
                className={
                  r.accept >= 85 ? "text-pos" : r.accept >= 80 ? "text-warn" : "text-neg"
                }
              >
                {r.accept}%
              </span>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
}
