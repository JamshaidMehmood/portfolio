/**
 * Single source of truth for every piece of copy on the site.
 * Everything here is drawn from the real résumé — edit this file, not the
 * components, when facts change.
 */

export const profile = {
  name: "Jamshaid Mehmood",
  firstName: "Jamshaid",
  role: "Frontend Engineer",
  specialism: "Analytics & Reporting Interfaces",
  tagline: "I build the interfaces people make decisions in.",
  location: "Lahore, Pakistan",
  timezone: "PKT · UTC+5",
  email: "jamshaidmehmood1234@gmail.com",
  phone: "+92 304 5297828",
  phoneHref: "+923045297828",
  github: "https://github.com/JamshaidMehmood",
  linkedin: "https://www.linkedin.com/in/jamshaid-mehmood-05b88720a/",
  resume: "/Jamshaid_Mehmood_Frontend_Engineer_Resume.pdf",
  resumeLabel: "Résumé",
  available: true,
  availabilityNote: "Open to frontend & full-stack roles",
  intro:
    "Frontend engineer with 2 years on the UI layer of HireStream — a multi-tenant React/Next.js hiring platform used by enterprise recruiting teams. My work sits where data meets interface: analytics dashboards, paginated report surfaces, chart systems, and the state architecture that keeps them all deep-linkable.",
  intro2:
    "I also work down the stack. At HireStream I extend the Django REST Framework endpoints my own screens consume, and outside work I ship full-stack products end to end — SalesFlow CRM runs on Express, PostgreSQL and Prisma with JWT auth, TOTP two-factor and role-based access that I built myself.",
};

export const heroRotators = [
  "analytics dashboards",
  "reporting platforms",
  "component systems",
  "design-system UI",
  "data-heavy tables",
];

export type Metric = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  detail: string;
  trend?: "up" | "down";
};

export const metrics: Metric[] = [
  {
    value: 30,
    suffix: "+",
    label: "Modules migrated",
    detail: "Class components → hooks, platform-wide",
    trend: "up",
  },
  {
    value: 40,
    suffix: "%",
    label: "Technical debt cut",
    detail: "Measured after the hooks migration",
    trend: "down",
  },
  {
    value: 9,
    label: "Report UIs rebuilt",
    detail: "Server-side sort, filter, CSV export",
    trend: "up",
  },
  {
    value: 30,
    suffix: "%",
    label: "Fewer UI defects",
    detail: "After a targeted state-bug sweep",
    trend: "down",
  },
];

export const quickStats = [
  { k: "Experience", v: "2 yrs" },
  { k: "Dashboards shipped", v: "3 role-based" },
  { k: "Features delivered", v: "20" },
  { k: "Locales supported", v: "EN · DE" },
];

/* ------------------------------------------------------------------ */

export type CaseStudy = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  summary: string;
  problem: string;
  approach: string[];
  outcome: string;
  stack: string[];
  accent: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "dashboards",
    index: "01",
    title: "Role-Based Analytics Dashboards",
    kicker: "Figma → production",
    summary:
      "Three distinct dashboards — Recruiter, Team Lead and Leadership — each surfacing a different slice of the hiring funnel to a different decision-maker.",
    problem:
      "Recruiters, team leads and leadership were all reading the same undifferentiated screen. Nobody got the numbers that mattered to their role, and every question ended in a manual export.",
    approach: [
      "Translated Figma wireframes into three fully responsive, role-scoped dashboard layouts.",
      "Built the chart layer: HiringFunnel, GenderDistribution, OfferAcceptanceTrend, RecruiterPerformanceTable, UpcomingInterviewsCard.",
      "Wrapped Chart.js in lazy-loaded HOCs — CustomBar, CustomDoughnut, CustomHorizontalBar — so heavy viz never blocks first paint.",
      "Wired URL-synced filters, skeleton loaders and per-table pagination through every panel.",
    ],
    outcome:
      "Each role lands on a screen built for the decisions they actually make, and any filtered view can be shared as a link.",
    stack: ["React", "Next.js", "Redux", "Chart.js", "SCSS"],
    accent: "#7b61ff",
  },
  {
    id: "reports",
    index: "02",
    title: "Nine-Surface Reporting Platform",
    kicker: "Data-heavy tables at scale",
    summary:
      "A rebuild of the entire reporting section — nine report surfaces sharing one table architecture, one filter language and one export path.",
    problem:
      "Nine report pages had drifted into nine separate implementations. Filters behaved differently on each, state was lost on refresh, and no view could be shared.",
    approach: [
      "Rebuilt Hiring, Current Openings, Candidate Master, Offer Data, Source Performance, Time-Based Metrics, Scheduling, Referral and Custom List on a shared foundation.",
      "Added debounced search, server-side sort and filter, and a consistent status/source chip system.",
      "Backed every filter with the URL so any view is deep-linkable and survives a refresh.",
      "Shipped CSV export across all nine surfaces.",
    ],
    outcome:
      "Nine drifting pages collapsed into one predictable system — a new report surface is now a configuration, not a rewrite.",
    stack: ["React", "Redux", "URL state", "CSV export"],
    accent: "#22d3ee",
  },
  {
    id: "migration",
    index: "03",
    title: "Platform-Wide Hooks Migration",
    kicker: "30+ modules, zero regressions",
    summary:
      "Led the move of the entire product surface off class components — admin, templates, job listing and detail, sourcing, requisitions, candidate profile, interviews, onboarding, assessments and bulk-action modals.",
    problem:
      "A 30+ module codebase split between class components and hooks meant two mental models, two async patterns, and a rising cost on every feature.",
    approach: [
      "Sequenced the migration module by module so the product stayed shippable throughout.",
      "Standardised async patterns and lifecycle handling as each module converted.",
      "Folded repeated markup into the shared component library on the way past.",
    ],
    outcome:
      "Technical debt down 40%, one consistent mental model across the frontend, and measurably faster feature delivery afterwards.",
    stack: ["React Hooks", "Refactoring", "Codemods"],
    accent: "#34d399",
  },
  {
    id: "design-system",
    index: "04",
    title: "Shared Component Library",
    kicker: "Adopted across 12 surfaces",
    summary:
      "A reusable React component set — MetricsCard, DateRangePicker, OffsetPagination, EllipsisWithTooltip, NoteModal, RecruiterCard, FilterBar — powering 9 report UIs and 3 dashboards.",
    problem:
      "Every new report reimplemented its own toolbar, pagination and empty states. Layout drifted between screens and per-feature build time kept climbing.",
    approach: [
      "Extracted the recurring primitives into a single documented library.",
      "Established a tooltip-on-truncation pattern and a shared chip / badge / profile-link styling system.",
      "Built mobile and desktop dual-position action menus into the primitives themselves.",
    ],
    outcome:
      "Layout duplication eliminated and per-feature build time cut — new surfaces now assemble from existing parts.",
    stack: ["React", "SCSS", "Bootstrap", "Design tokens"],
    accent: "#fbbf24",
  },
  {
    id: "realtime",
    index: "05",
    title: "Async Export Progress UI",
    kicker: "WebSocket-driven feedback",
    summary:
      "A real-time progress snackbar that turns a long, silent report export into something users can watch finish.",
    problem:
      "Large exports ran for minutes with no feedback. Users assumed failure and re-triggered them, compounding server load.",
    approach: [
      "Consumed a WebSocket progress channel and drove a linear progress bar from it.",
      "Added disabled states to block duplicate exports while one is in flight.",
      "Designed the snackbar to persist across navigation within the app shell.",
    ],
    outcome:
      "Users get continuous feedback during long exports, and duplicate export requests stopped.",
    stack: ["WebSockets", "React", "Redux"],
    accent: "#fb7185",
  },
  {
    id: "i18n",
    index: "06",
    title: "Internationalisation Rollout",
    kicker: "EN · DE across the product",
    summary:
      "A full i18next pass over the frontend — including dynamic workflow and stage labels that come from the API, not the bundle.",
    problem:
      "The platform couldn't be sold to non-English enterprise clients. Hard-coded strings were spread across every module, and workflow labels were server-driven.",
    approach: [
      "Rolled i18next across the full frontend and every new component.",
      "Built a getTranslatedLabel utility for server-driven workflow and stage labels.",
      "Made dropdowns and formatting locale-aware end to end.",
    ],
    outcome:
      "The product ships in English and German, unblocking non-English enterprise accounts.",
    stack: ["i18next", "React", "Locale formatting"],
    accent: "#a78bfa",
  },
];

/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  summary: string;
  highlights: { label: string; items: string[] }[];
  stack: { group: string; items: string[] }[];
  live?: { url: string; label: string; note?: string };
  repo: string;
  featured: boolean;
  accent: string;
};

export const projects: Project[] = [
  {
    id: "salesflow",
    name: "SalesFlow CRM",
    tagline: "Full-stack sales CRM",
    year: "2026",
    role: "Sole engineer — frontend, API, database, deployment",
    summary:
      "A production-deployed CRM for managing contacts, deals, activities and sales performance. I designed the schema, built the REST API, wrote the auth stack — including TOTP two-factor and Google Sign-In — and shipped the React client on top of it.",
    highlights: [
      {
        label: "Backend & data",
        items: [
          "Express 5 REST API over PostgreSQL with Prisma for schema and migrations.",
          "Auth stack built from scratch: JWT sessions, bcrypt hashing, Google OAuth token verification, and TOTP two-factor with QR enrolment and recovery codes.",
          "Role-based access control — admins see the org, reps see their own records — enforced in middleware, not the UI.",
          "Audit log capturing create / update / delete / merge across every entity, plus multer-backed file attachments.",
        ],
      },
      {
        label: "Frontend & analytics",
        items: [
          "React 19 + Vite client with React Query for server state and caching.",
          "Dashboard of KPI cards, revenue charts, deal-stage distribution, quota progress and a forecast widget (Recharts).",
          "Drag-and-drop Kanban pipeline via DnD Kit, with configurable stages and lost-reason capture.",
          "Contacts at scale: search, multi-facet filters, sorting, CSV import/export, duplicate detection and merge.",
          "Reports on win rate, average deal size, sales-cycle length and lead-source performance.",
          "i18next EN/DE, persisted dark/light theme, responsive from phone to desktop.",
        ],
      },
    ],
    stack: [
      {
        group: "Frontend",
        items: ["React 19", "Vite", "Tailwind CSS 4", "React Query", "Recharts", "DnD Kit", "i18next"],
      },
      {
        group: "Backend",
        items: ["Node.js", "Express 5", "PostgreSQL", "Prisma", "JWT", "bcrypt", "otplib (2FA)", "multer"],
      },
    ],
    live: {
      url: "https://sales-flow-crm-dashboard-iks4.vercel.app/",
      label: "sales-flow-crm-dashboard-iks4.vercel.app",
      note: "Demo login: admin@example.com / password123",
    },
    repo: "https://github.com/JamshaidMehmood/SalesFlow-CRM-Dashboard",
    featured: true,
    accent: "#7b61ff",
  },
  {
    id: "virtual-art-gallery",
    name: "Virtual Art Gallery",
    tagline: "MERN gallery + walkable 3D tour",
    year: "2026",
    role: "Full-stack — React client, Express/MongoDB API, 3D tour, deployment",
    summary:
      "A full-stack MERN art gallery: browse, search and filter artwork, open detail pages, add pieces to a cart, upload your own work, and walk a 3D virtual tour of the collection. Deployed end to end — React + Tailwind on Vercel, a Node/Express API on Render, MongoDB Atlas for data and Cloudinary for media. It's the production rebuild and hardening of my final-year project.",
    highlights: [
      {
        label: "Frontend & 3D tour",
        items: [
          "Walkable 3D gallery tour built on three.js, code-split into its own bundle chunk so the WebGL viewer never blocks first paint.",
          "Artwork loads into the scene as WebGL textures with crossOrigin handled for Cloudinary-hosted images.",
          "Browse, search and filter the collection, view artwork detail pages, and add pieces to a cart.",
          "React (CRA) + Tailwind client on Vercel, with SPA deep-links (/tour, /discoverArt) resolving straight to the right view.",
        ],
      },
      {
        label: "Backend, media & hardening",
        items: [
          "Node/Express API over MongoDB Atlas with Cloudinary-backed uploads that survive redeploys.",
          "Upload pipeline with server-side watermarking, perceptual-hash duplicate detection, and authenticated (non-public) original files.",
          "JWT auth with an email-OTP signup and password-reset flow.",
          "Production hardening: multi-origin CORS with a Vercel preview-URL wildcard, and fail-fast boot checks that refuse to start on missing config.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["React (CRA)", "Tailwind CSS", "three.js", "WebGL"] },
      {
        group: "Backend",
        items: ["Node.js", "Express", "MongoDB Atlas", "Cloudinary", "JWT", "Email OTP"],
      },
      { group: "Deploy", items: ["Vercel", "Render"] },
    ],
    live: {
      url: "https://virtual-art-gallery-v2.vercel.app",
      label: "virtual-art-gallery-v2.vercel.app",
      note: "Demo login: amara@vag.local / Gallery@2026 · first load may take ~30–60s while the free-tier backend wakes",
    },
    repo: "https://github.com/JamshaidMehmood/virtual-art-gallery-v2",
    featured: true,
    accent: "#e879a6",
  },
  {
    id: "student-interests",
    name: "Student Interests System",
    tagline: "Node · Express · MongoDB",
    year: "2023",
    role: "Full-stack — Express API, MongoDB schema and server-rendered UI",
    summary:
      "A university web application for recording student interests and analysing trends across them, with two permission levels and a reporting dashboard.",
    highlights: [
      {
        label: "What I built",
        items: [
          "Express and MongoDB backend with session-based authentication and registration.",
          "Two-tier permissions — administrators get view / edit / delete actions on every record, regular users only their own.",
          "An analysis dashboard rendering activity trends as charts, plus an admin-managed interest catalogue.",
          "Server-rendered EJS views over a Bootstrap layout, with full CRUD on students and interests.",
        ],
      },
    ],
    stack: [
      { group: "Stack", items: ["Node.js", "Express", "MongoDB", "EJS", "Bootstrap"] },
    ],
    repo: "https://github.com/JamshaidMehmood/BITF20M032-ESys-PII",
    featured: false,
    accent: "#34d399",
  },
];

/* ------------------------------------------------------------------ */

export const experience = [
  {
    company: "Arbisoft",
    role: "Frontend Developer",
    product: "HireStream — multi-tenant HR & hiring SaaS",
    period: "Jul 2024 — Present",
    duration: "2 yrs",
    location: "Lahore, Pakistan",
    current: true,
    blurb:
      "Own the UI layer of a React 17 / Next.js hiring platform serving enterprise recruiting teams, from Figma handoff to production.",
    groups: [
      {
        title: "Application-Wide UI Revamp",
        points: [
          "Currently leading a revamp of the platform's entire user interface — modernising the visual language, layout and interaction patterns across every module, from Figma redesigns through to production.",
          "Rolling the new patterns out through the shared component library so the redesign lands consistently across dashboards, reports and workflow screens rather than page by page.",
        ],
      },
      {
        title: "Dashboards & Reporting",
        points: [
          "Shipped 3 role-based analytics dashboards (Recruiter, Team Lead, Leadership) with funnel, distribution and trend charts.",
          "Rebuilt 9 report UIs with debounced search, server-side sort/filter, a chip system and CSV export.",
          "Built a WebSocket-driven export progress UI with a linear progress bar and disabled states.",
        ],
      },
      {
        title: "Architecture & State",
        points: [
          "Implemented Redux action/reducer/selector patterns with URL-backed filter state — deep-link restore, per-table page-size memory, zero-loss browser navigation.",
          "Engineered a shared component library adopted across 9 report UIs and 3 dashboards.",
          "Led a 30+ module class-to-hooks migration, cutting technical debt 40%.",
        ],
      },
      {
        title: "Backend (Django REST)",
        points: [
          "Extended the Django REST Framework endpoints behind the report and dashboard surfaces — serializers, viewsets, filter backends and pagination — so the API returned the shape the UI needed instead of the UI reshaping it client-side.",
          "Moved sorting and filtering server-side across the reporting endpoints, keeping large result sets off the client.",
          "Wrote SQL and Python metrics scripts against the product database to verify dashboard figures and answer ad-hoc reporting requests.",
        ],
      },
      {
        title: "Craft & Quality",
        points: [
          "Rolled out i18next (EN/DE) across the full frontend, including server-driven workflow labels.",
          "Introduced skeleton loaders, debounced inputs and lazy-loaded chart wrappers to cut perceived load time.",
          "Diagnosed and fixed Formik re-init, search-highlight corruption, filter-reset-on-refresh and double-API-call bugs — 30% fewer reported UI issues.",
          "Built the Careers & Job Discovery UI with faceted search, bookmarks, recency labels and similarity scores.",
          "Shipped step-by-step virtual tour onboarding for Settings, Jobs, Candidates and Requisitions.",
          "Reviewed PRs, enforced ESLint standards, and delivered 20 distinct features across Agile/Scrum sprints.",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */

export type SkillGroup = {
  title: string;
  note: string;
  items: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Core Frontend",
    note: "Where I spend most of my time",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 88 },
      { name: "JavaScript (ES6+)", level: 93 },
      { name: "TypeScript", level: 80 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "SASS / SCSS", level: 88 },
    ],
  },
  {
    title: "State & Data",
    note: "Predictable, shareable UI state",
    items: [
      { name: "Redux", level: 92 },
      { name: "React Hooks", level: 94 },
      { name: "URL-synced state", level: 90 },
      { name: "Deep-link filters", level: 90 },
      { name: "WebSockets", level: 75 },
    ],
  },
  {
    title: "Backend & Data",
    note: "I build against the API, and inside it",
    items: [
      { name: "Django REST Framework", level: 80 },
      { name: "Python", level: 80 },
      { name: "Node.js / Express", level: 82 },
      { name: "PostgreSQL / Prisma", level: 78 },
      { name: "MongoDB / Mongoose", level: 74 },
      { name: "REST API design", level: 82 },
      { name: "Auth (JWT, OAuth, 2FA)", level: 78 },
      { name: "SQL", level: 80 },
    ],
  },
  {
    title: "UI, Tooling & Practice",
    note: "The rest of the delivery surface",
    items: [
      { name: "Figma → code", level: 92 },
      { name: "Chart.js / data viz", level: 86 },
      { name: "Webpack / ESLint", level: 80 },
      { name: "i18next", level: 88 },
      { name: "Formik / Yup", level: 85 },
      { name: "Git / Agile / Scrum", level: 90 },
    ],
  },
];

export const marqueeSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Redux",
  "React Query",
  "SCSS",
  "Tailwind",
  "Chart.js",
  "Recharts",
  "i18next",
  "Django REST",
  "Python",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Mongoose",
  "JWT / OAuth",
  "Vite",
  "Webpack",
  "Formik",
  "Figma",
  "WebSockets",
  "Agile",
];

/* ------------------------------------------------------------------ */

export const principles = [
  {
    title: "State belongs in the URL",
    body: "If a user filtered their way to a view, they should be able to send it to someone. Every filter, page and range I build is URL-backed by default.",
  },
  {
    title: "Perceived speed is speed",
    body: "Skeleton loaders, debounced inputs and lazy-loaded charts change how fast a data-heavy page feels long before the payload gets smaller.",
  },
  {
    title: "Build the primitive twice, then extract it",
    body: "Component libraries earn their keep when they're pulled out of real duplication — not designed up front against imagined needs.",
  },
  {
    title: "Pixel-precise against the design",
    body: "A Figma handoff is a spec. Responsive, cross-browser and exact — Chrome, Firefox and Safari, mobile through desktop.",
  },
];

/* ------------------------------------------------------------------ */

export const education = [
  {
    degree: "BS Information Technology",
    org: "Punjab University College of Information Technology (PUCIT)",
    location: "Lahore",
    period: "Jun 2020 — Jun 2024",
    grade: "CGPA 3.7 / 4.0",
  },
  {
    degree: "Intermediate (ICS)",
    org: "Punjab College of Information Technology (PGC)",
    location: "Lahore",
    period: "Mar 2018 — Mar 2020",
    grade: "90% · A+",
  },
];

export const certifications = [
  { name: "Responsive Web Design", org: "freeCodeCamp", year: "2024" },
];

/* ------------------------------------------------------------------ */

export const navItems = [
  { id: "work", label: "Work" },
  { id: "dashboard", label: "Live Demo" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
