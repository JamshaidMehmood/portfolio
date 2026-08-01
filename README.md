# Jamshaid Mehmood — Portfolio

Personal portfolio for a frontend engineer specialising in analytics and
reporting interfaces. Single page, statically prerendered, dark-only.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens in `globals.css`) |
| Animation | Motion (`motion/react`) |
| Icons | lucide-react + two hand-rolled brand marks |
| Fonts | Geist Sans / Geist Mono, self-hosted via the `geist` package |

No chart library — every chart in the live demo is hand-written SVG.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint (flat config, react-compiler rules on)
```

## Where things live

```
src/
  app/
    layout.tsx          fonts, metadata, viewport, skip link
    page.tsx            section order
    globals.css         design tokens + custom utilities
    icon.svg            JM monogram favicon
  lib/
    content.ts          ← every piece of copy on the site
    dashboard-data.ts   synthetic data for the live demo
    useMediaQuery.ts    SSR-safe matchMedia hook
  components/
    Nav / Hero / Metrics / Work / DashboardDemo / Projects /
    Experience / Skills / About / Contact / Footer
    charts/             TrendChart, FunnelChart, DonutChart (raw SVG)
    ui/                 Reveal, Counter, SectionHeading, Spotlight, BrandIcons
public/
  Jamshaid_Mehmood_Europass_CV.pdf              ← linked from the hero
  Jamshaid_Mehmood_Frontend_Engineer_Resume.pdf
```

**Edit `src/lib/content.ts`, not the components.** Name, links, metrics, case
studies, experience, skills, education and nav labels all come from there.

## Things worth knowing

- **The live demo is real.** `DashboardDemo` renders role-scoped datasets,
  fakes ~420 ms of latency on every filter change so the skeleton loaders are
  visible, and mirrors filter state into a mock address bar to show the
  deep-link pattern. Swap `getDataset` for a real fetch and it works unchanged.
- **Accent colour** is one variable: `--accent` in `globals.css`.
- **Reduced motion** is respected globally via a `prefers-reduced-motion`
  block; animation-heavy components also check `useReducedMotion()`.
- **No external requests at runtime** — fonts are self-hosted, charts are
  inline SVG, there is no analytics script.

## Deploying

Live at **https://jamshaid-mehmood.vercel.app** (Vercel project
`jamshaid-mehmood`, team `jamshaids-projects`). To redeploy:

```bash
npx vercel deploy --prod
```

If the domain ever changes, update `url` in `src/app/layout.tsx` so Open
Graph and canonical URLs follow it.
