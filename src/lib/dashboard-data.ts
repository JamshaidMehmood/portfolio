/**
 * Synthetic (but plausible) hiring data for the live dashboard demo.
 * Shaped after the real HireStream dashboards: funnel, offer-acceptance
 * trend, distribution, and a recruiter performance table — sliced by role
 * and date range, exactly like the production filters.
 */

export type RoleId = "recruiter" | "lead" | "leadership";
export type RangeId = "7d" | "30d" | "90d";

export const roles: {
  id: RoleId;
  label: string;
  scope: string;
  tableTitle: string;
}[] = [
  {
    id: "recruiter",
    label: "Recruiter",
    scope: "My requisitions",
    tableTitle: "My pipelines",
  },
  {
    id: "lead",
    label: "Team Lead",
    scope: "Team of 6",
    tableTitle: "Recruiter performance",
  },
  {
    id: "leadership",
    label: "Leadership",
    scope: "All departments",
    tableTitle: "Department performance",
  },
];

export const ranges: { id: RangeId; label: string; points: number }[] = [
  { id: "7d", label: "7 days", points: 7 },
  { id: "30d", label: "30 days", points: 10 },
  { id: "90d", label: "90 days", points: 12 },
];

export type Kpi = {
  key: string;
  label: string;
  value: number;
  suffix?: string;
  delta: number;
  /** true when a falling number is the good outcome (e.g. time-to-hire) */
  inverse?: boolean;
};

export type FunnelStage = { stage: string; count: number };

export type Dataset = {
  kpis: Kpi[];
  funnel: FunnelStage[];
  trend: { label: string; value: number }[];
  sources: { name: string; value: number; color: string }[];
  table: { name: string; reqs: number; hires: number; accept: number }[];
};

/** Label counts must match the value counts in `trendValues` below. */
const trendLabels: Record<RangeId, string[]> = {
  "7d": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "30d": ["D3", "D6", "D9", "D12", "D15", "D18", "D21", "D24", "D27", "D30"],
  "90d": ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
};

const trendValues: Record<RoleId, Record<RangeId, number[]>> = {
  recruiter: {
    "7d": [62, 58, 71, 66, 79, 74, 83],
    "30d": [54, 61, 57, 66, 63, 72, 68, 77, 74, 81],
    "90d": [48, 52, 49, 58, 55, 63, 61, 69, 66, 74, 71, 79],
  },
  lead: {
    "7d": [70, 66, 74, 78, 73, 81, 86],
    "30d": [63, 68, 65, 72, 70, 76, 74, 80, 78, 84],
    "90d": [58, 61, 59, 66, 64, 70, 68, 74, 72, 78, 76, 82],
  },
  leadership: {
    "7d": [74, 71, 77, 75, 82, 80, 88],
    "30d": [68, 72, 70, 75, 73, 79, 77, 82, 81, 87],
    "90d": [62, 65, 64, 69, 68, 73, 72, 77, 76, 81, 80, 85],
  },
};

const funnelBase: Record<RoleId, number[]> = {
  recruiter: [420, 186, 94, 41, 22, 16],
  lead: [1840, 812, 405, 187, 96, 71],
  leadership: [7360, 3120, 1584, 702, 388, 291],
};

const funnelStages = [
  "Applied",
  "Screened",
  "Interviewed",
  "Final round",
  "Offered",
  "Hired",
];

const kpiBase: Record<RoleId, Kpi[]> = {
  recruiter: [
    { key: "openings", label: "Open requisitions", value: 12, delta: 8.3 },
    { key: "pipeline", label: "Active candidates", value: 186, delta: 14.2 },
    { key: "ttf", label: "Avg. time to hire", value: 24, suffix: "d", delta: -11.4, inverse: true },
    { key: "accept", label: "Offer acceptance", value: 83, suffix: "%", delta: 6.1 },
  ],
  lead: [
    { key: "openings", label: "Open requisitions", value: 47, delta: 4.9 },
    { key: "pipeline", label: "Active candidates", value: 812, delta: 9.8 },
    { key: "ttf", label: "Avg. time to hire", value: 27, suffix: "d", delta: -7.2, inverse: true },
    { key: "accept", label: "Offer acceptance", value: 86, suffix: "%", delta: 3.4 },
  ],
  leadership: [
    { key: "openings", label: "Open requisitions", value: 214, delta: 12.6 },
    { key: "pipeline", label: "Active candidates", value: 3120, delta: 18.5 },
    { key: "ttf", label: "Avg. time to hire", value: 31, suffix: "d", delta: -4.8, inverse: true },
    { key: "accept", label: "Offer acceptance", value: 88, suffix: "%", delta: 2.2 },
  ],
};

const sourceBase: Record<RoleId, { name: string; value: number }[]> = {
  recruiter: [
    { name: "Referral", value: 38 },
    { name: "Job board", value: 31 },
    { name: "Sourced", value: 19 },
    { name: "Careers page", value: 12 },
  ],
  lead: [
    { name: "Referral", value: 34 },
    { name: "Job board", value: 29 },
    { name: "Sourced", value: 24 },
    { name: "Careers page", value: 13 },
  ],
  leadership: [
    { name: "Referral", value: 29 },
    { name: "Job board", value: 33 },
    { name: "Sourced", value: 22 },
    { name: "Careers page", value: 16 },
  ],
};

const sourceColors = ["#7b61ff", "#22d3ee", "#34d399", "#fbbf24"];

const tableBase: Record<RoleId, Dataset["table"]> = {
  recruiter: [
    { name: "Engineering", reqs: 5, hires: 7, accept: 86 },
    { name: "Design", reqs: 3, hires: 4, accept: 80 },
    { name: "Data", reqs: 4, hires: 5, accept: 83 },
  ],
  lead: [
    { name: "Ayesha Khan", reqs: 11, hires: 18, accept: 91 },
    { name: "Bilal Ahmed", reqs: 9, hires: 14, accept: 84 },
    { name: "Sana Riaz", reqs: 8, hires: 13, accept: 88 },
    { name: "Usman Tariq", reqs: 10, hires: 11, accept: 79 },
  ],
  leadership: [
    { name: "Engineering", reqs: 86, hires: 124, accept: 90 },
    { name: "Product & Design", reqs: 41, hires: 63, accept: 87 },
    { name: "Data & Analytics", reqs: 38, hires: 54, accept: 89 },
    { name: "Go-to-market", reqs: 49, hires: 50, accept: 82 },
  ],
};

export function getDataset(role: RoleId, range: RangeId): Dataset {
  const kpis = kpiBase[role].map((k) =>
    k.key === "pipeline" || k.key === "openings"
      ? { ...k, value: Math.round(k.value * (range === "7d" ? 0.42 : range === "30d" ? 1 : 1.9)) }
      : k,
  );

  return {
    kpis,
    funnel: funnelStages.map((stage, i) => ({
      stage,
      count: Math.round(
        funnelBase[role][i] * (range === "7d" ? 0.28 : range === "30d" ? 1 : 2.7),
      ),
    })),
    trend: trendLabels[range].map((label, i) => ({
      label,
      value: trendValues[role][range][i],
    })),
    sources: sourceBase[role].map((s, i) => ({ ...s, color: sourceColors[i] })),
    table: tableBase[role],
  };
}
