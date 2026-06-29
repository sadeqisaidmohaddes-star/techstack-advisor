import type { CategorySpec, Predicate, Question } from "./types";

/* ------------------------------------------------------------------ *
 * Small predicate DSL so the scoring rules below stay readable.
 * ------------------------------------------------------------------ */
const is =
  (id: string, ...vals: string[]): Predicate =>
  (a) =>
    vals.includes(a[id]);

const not =
  (id: string, ...vals: string[]): Predicate =>
  (a) =>
    a[id] !== undefined && !vals.includes(a[id]);

const all =
  (...fns: Predicate[]): Predicate =>
  (a) =>
    fns.every((f) => f(a));

/* ------------------------------------------------------------------ *
 * Categories shown on the first screen.
 * ------------------------------------------------------------------ */
export const CATEGORIES_META: {
  id: CategorySpec["id"];
  label: string;
  tagline: string;
  emoji: string;
}[] = [
  { id: "web", label: "Web app", tagline: "Sites, dashboards, SaaS", emoji: "🌐" },
  { id: "mobile", label: "Mobile app", tagline: "iOS & Android", emoji: "📱" },
  { id: "data", label: "Data / ML", tagline: "Analysis, models, pipelines", emoji: "📊" },
  { id: "ai", label: "AI / LLM app", tagline: "Chatbots, RAG, agents", emoji: "🤖" },
  { id: "backend", label: "Backend / API", tagline: "Services & APIs", emoji: "🔌" },
  { id: "desktop", label: "Desktop app", tagline: "Windows, macOS, Linux", emoji: "🖥️" },
  { id: "game", label: "Game", tagline: "2D & 3D games", emoji: "🎮" },
  { id: "cli", label: "CLI tool", tagline: "Command-line utilities", emoji: "⌨️" },
];

/* ------------------------------------------------------------------ *
 * Questions. Shared ones (appliesTo "all") plus category-specific ones.
 * Category-specific questions come first so they appear right after the
 * user picks what they're building.
 * ------------------------------------------------------------------ */
export const QUESTIONS: Question[] = [
  // ---------- Web-specific ----------
  {
    id: "webRender",
    title: "How important are SEO and a fast first load?",
    subtitle: "This decides how much server-side rendering you need.",
    appliesTo: ["web"],
    options: [
      { id: "seo", label: "Critical", hint: "Marketing site, e-commerce, public content" },
      { id: "balanced", label: "Somewhat", hint: "A mix of public pages and app screens" },
      { id: "app", label: "Not important", hint: "App behind a login / internal dashboard" },
    ],
  },
  {
    id: "realtime",
    title: "Do you need real-time features?",
    subtitle: "Chat, live updates, presence, collaborative editing.",
    appliesTo: ["web"],
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No / not really" },
    ],
  },

  // ---------- Mobile-specific ----------
  {
    id: "platforms",
    title: "Which platforms are you targeting?",
    appliesTo: ["mobile"],
    options: [
      { id: "cross", label: "iOS & Android", hint: "One shared codebase" },
      { id: "ios", label: "iOS-first", hint: "Apple ecosystem" },
      { id: "android", label: "Android-first" },
      { id: "native", label: "Both, fully native", hint: "Separate native apps per platform" },
    ],
  },
  {
    id: "mobileOffline",
    title: "How much offline / device-hardware use?",
    subtitle: "Camera, sensors, background sync, working without a connection.",
    appliesTo: ["mobile"],
    options: [
      { id: "yes", label: "Heavy", hint: "Offline-first or deep hardware access" },
      { id: "no", label: "Light", hint: "Mostly online, standard features" },
    ],
  },

  // ---------- Data-specific ----------
  {
    id: "dataGoal",
    title: "What's the main goal?",
    appliesTo: ["data"],
    options: [
      { id: "analysis", label: "Analysis & dashboards" },
      { id: "ml", label: "Machine learning / modeling" },
      { id: "pipeline", label: "Pipelines / data engineering" },
      { id: "proto", label: "A quick prototype or app" },
    ],
  },
  {
    id: "dataScale",
    title: "How much data?",
    appliesTo: ["data"],
    options: [
      { id: "small", label: "Fits on one machine" },
      { id: "big", label: "Big / needs distributed compute" },
    ],
  },

  // ---------- Backend-specific ----------
  {
    id: "apiWorkload",
    title: "What kind of workload?",
    appliesTo: ["backend"],
    options: [
      { id: "crud", label: "Standard CRUD / business APIs" },
      { id: "realtime", label: "Real-time / streaming" },
      { id: "throughput", label: "High throughput, low latency" },
      { id: "data", label: "Data / ML-heavy" },
    ],
  },

  // ---------- AI / LLM-specific ----------
  {
    id: "aiKind",
    title: "What are you building?",
    appliesTo: ["ai"],
    options: [
      { id: "chatbot", label: "Chatbot / assistant", hint: "Conversational UI" },
      { id: "rag", label: "Q&A over my own data", hint: "Retrieval-augmented generation" },
      { id: "agents", label: "Agents / automation", hint: "Multi-step tool use" },
      { id: "generation", label: "Content generation", hint: "Text, images, structured output" },
      { id: "extraction", label: "Classification / extraction", hint: "Turn text into data" },
    ],
  },
  {
    id: "aiHost",
    title: "How should the model run?",
    appliesTo: ["ai"],
    options: [
      { id: "hosted", label: "Hosted API", hint: "Best quality, fastest to start" },
      { id: "self", label: "Self-hosted / open weights", hint: "Privacy, no per-token cost" },
      { id: "cheap", label: "Whatever's cheapest", hint: "Cost-optimized, mix providers" },
    ],
  },
  {
    id: "aiData",
    title: "Does it need to answer over your own data?",
    subtitle: "Documents, a knowledge base, product data, etc.",
    appliesTo: ["ai"],
    options: [
      { id: "yes", label: "Yes", hint: "You'll need retrieval (a vector store)" },
      { id: "no", label: "No", hint: "General model knowledge is enough" },
    ],
  },

  // ---------- Desktop-specific ----------
  {
    id: "desktopNeed",
    title: "What matters most for the desktop app?",
    appliesTo: ["desktop"],
    options: [
      { id: "web", label: "Reuse web skills", hint: "Cross-platform, web UI" },
      { id: "light", label: "Lightweight & fast", hint: "Tiny binary, low memory" },
      { id: "heavy", label: "Deep OS / native power", hint: "Heavy native integration" },
      { id: "windows", label: "Windows business app" },
    ],
  },

  // ---------- Game-specific ----------
  {
    id: "gameDim",
    title: "2D or 3D?",
    appliesTo: ["game"],
    options: [
      { id: "2d", label: "2D" },
      { id: "3d", label: "3D" },
    ],
  },
  {
    id: "gamePlatform",
    title: "Where will it run?",
    appliesTo: ["game"],
    options: [
      { id: "mobile", label: "Mobile" },
      { id: "pcconsole", label: "PC / console" },
      { id: "web", label: "Web browser" },
      { id: "indie", label: "Indie / cross-platform" },
    ],
  },

  // ---------- CLI-specific ----------
  {
    id: "cliDist",
    title: "Who runs it, and how is it distributed?",
    appliesTo: ["cli"],
    options: [
      { id: "npm", label: "Developers, via npm" },
      { id: "pip", label: "Developers, Python ecosystem" },
      { id: "binary", label: "Anyone, single binary" },
      { id: "perf", label: "Performance-critical / systems" },
    ],
  },

  // ---------- Shared ----------
  {
    id: "experience",
    title: "What's your team's strongest skill set?",
    subtitle: "We'll lean toward tools you already know.",
    appliesTo: "all",
    options: [
      { id: "jsts", label: "JavaScript / TypeScript" },
      { id: "python", label: "Python" },
      { id: "jvm", label: "Java / C# / JVM" },
      { id: "native", label: "Swift / Kotlin (native mobile)" },
      { id: "systems", label: "Go / Rust / C++" },
      { id: "none", label: "Limited / non-technical" },
    ],
  },
  {
    id: "scale",
    title: "What scale are you planning for?",
    appliesTo: "all",
    options: [
      { id: "hobby", label: "Hobby / MVP" },
      { id: "growth", label: "Growing product / startup" },
      { id: "enterprise", label: "Enterprise / high scale" },
    ],
  },
  {
    id: "team",
    title: "How big is the team?",
    appliesTo: "all",
    options: [
      { id: "solo", label: "Just me" },
      { id: "small", label: "Small team (2–10)" },
      { id: "large", label: "Large org (10+)" },
    ],
  },
  {
    id: "priority",
    title: "What matters most right now?",
    appliesTo: "all",
    options: [
      { id: "speed", label: "Shipping fast" },
      { id: "performance", label: "Raw performance" },
      { id: "scale", label: "Scalability & reliability" },
      { id: "cost", label: "Lowest cost" },
    ],
  },
  {
    id: "budget",
    title: "What's your infrastructure budget?",
    appliesTo: "all",
    options: [
      { id: "min", label: "Minimal / free tier" },
      { id: "mod", label: "Moderate" },
      { id: "flex", label: "Flexible" },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Per-category scoring specs.
 *
 * For each layer the engine adds every boost whose `when` matches the
 * user's answers to the candidate's base score, then picks the top
 * scorer (and surfaces the runner-up as an alternative).
 * ------------------------------------------------------------------ */
export const CATEGORIES: CategorySpec[] = [
  /* ============================= WEB ============================= */
  {
    id: "web",
    label: "Web app",
    tagline: "Sites, dashboards, SaaS",
    emoji: "🌐",
    layers: [
      {
        key: "language",
        label: "Primary language",
        candidates: [
          {
            tech: "ts",
            base: 6,
            boosts: [
              {
                when: is("experience", "jsts"),
                score: 2,
                reason: "You already work in JS/TS",
              },
              {
                when: () => true,
                score: 0,
                reason: "Full-stack TypeScript keeps one language across client and server",
              },
            ],
          },
          {
            tech: "python",
            base: 1,
            boosts: [{ when: is("experience", "python"), score: 3, reason: "Python on the backend matches your team" }],
          },
        ],
      },
      {
        key: "frontend",
        label: "Frontend framework",
        candidates: [
          {
            tech: "nextjs",
            base: 5,
            boosts: [
              { when: is("webRender", "seo"), score: 3, reason: "SEO and fast first load are priorities" },
              { when: is("scale", "enterprise"), score: 1, reason: "Scales to large apps" },
              { when: is("priority", "scale"), score: 1, reason: "Mature, production-proven at scale" },
              { when: is("webRender", "app"), score: -2, reason: "" },
            ],
          },
          {
            tech: "astro",
            base: 1,
            boosts: [
              { when: is("webRender", "seo"), score: 3, reason: "Content site that should ship minimal JS" },
              {
                when: all(is("webRender", "seo"), not("realtime", "yes"), is("priority", "performance", "cost")),
                score: 5,
                reason: "Mostly-static content — Astro ships almost no JavaScript",
              },
            ],
          },
          {
            tech: "react-vite",
            base: 1,
            boosts: [
              { when: is("webRender", "app"), score: 3, reason: "App behind a login — no SSR needed, a SPA is simpler" },
              { when: is("priority", "speed"), score: 1, reason: "Minimal setup, instant dev server" },
            ],
          },
          {
            tech: "sveltekit",
            base: 1,
            boosts: [
              { when: is("priority", "performance"), score: 3, reason: "Tiny runtime, very fast" },
              { when: is("team", "solo"), score: 1, reason: "Lean and pleasant for solo work" },
            ],
          },
          {
            tech: "angular",
            base: 0,
            boosts: [
              { when: all(is("scale", "enterprise"), is("team", "large")), score: 4, reason: "Large org at enterprise scale — Angular's structure helps" },
              { when: is("experience", "jvm"), score: 1, reason: "Familiar to enterprise/Java teams" },
            ],
          },
          {
            tech: "nuxt",
            base: 2,
            boosts: [
              { when: is("webRender", "seo"), score: 2, reason: "SSR-first Vue with strong SEO" },
              { when: is("priority", "performance"), score: 1, reason: "Lean Vue runtime" },
            ],
          },
        ],
      },
      {
        key: "styling",
        label: "Styling",
        candidates: [
          {
            tech: "tailwind",
            base: 5,
            boosts: [{ when: is("priority", "speed"), score: 1, reason: "Style quickly without leaving your markup" }],
          },
          {
            tech: "shadcn",
            base: 4,
            boosts: [
              { when: not("scale", "hobby"), score: 2, reason: "Building a real product — accessible components you own (on Tailwind)" },
              { when: is("team", "small", "large"), score: 1, reason: "Consistent UI across the team" },
            ],
          },
          {
            tech: "mui",
            base: 1,
            boosts: [
              { when: is("scale", "enterprise"), score: 2, reason: "Comprehensive component set for big apps" },
              { when: is("team", "large"), score: 1, reason: "Lots of ready-made components for large teams" },
            ],
          },
          { tech: "css-modules", base: 1 },
        ],
      },
      {
        key: "state",
        label: "Client state",
        candidates: [
          {
            tech: "tanstack-query",
            base: 4,
            boosts: [{ when: () => true, score: 0, reason: "Most 'state' is really server data — caching/sync handles it" }],
          },
          {
            tech: "zustand",
            base: 2,
            boosts: [
              { when: not("team", "large"), score: 1, reason: "Tiny global store, little ceremony" },
              { when: is("priority", "speed"), score: 1, reason: "Fastest way to share a bit of client state" },
            ],
          },
          {
            tech: "redux-toolkit",
            base: 1,
            boosts: [
              { when: is("scale", "enterprise"), score: 3, reason: "Predictable, structured state for complex apps" },
              { when: is("team", "large"), score: 2, reason: "Clear patterns scale across a large team" },
            ],
          },
          {
            tech: "react-context",
            base: 1,
            boosts: [
              { when: is("scale", "hobby"), score: 3, reason: "Built in — plenty for a small app" },
              { when: is("team", "solo"), score: 1, reason: "No extra dependency to manage" },
            ],
          },
        ],
      },
      {
        key: "backend",
        label: "Backend",
        candidates: [
          {
            tech: "nextjs-api",
            base: 4,
            boosts: [
              { when: not("team", "large"), score: 1, reason: "One codebase to build and deploy" },
              { when: not("scale", "enterprise"), score: 1, reason: "Server actions cover most needs without a separate service" },
            ],
          },
          {
            tech: "supabase",
            base: 2,
            boosts: [
              { when: not("scale", "enterprise"), score: 2, reason: "Skip writing a server — DB, auth, and APIs included" },
              { when: is("priority", "speed"), score: 2, reason: "Fastest path to a working backend" },
              { when: is("budget", "min"), score: 1, reason: "Generous free tier" },
            ],
          },
          {
            tech: "fastapi",
            base: 1,
            boosts: [{ when: is("experience", "python"), score: 7, reason: "A typed Python API matches your team" }],
          },
          {
            tech: "django",
            base: 0,
            boosts: [
              { when: all(is("experience", "python"), is("scale", "growth", "enterprise")), score: 9, reason: "Batteries-included Python for a larger app" },
            ],
          },
          {
            tech: "nestjs",
            base: 1,
            boosts: [
              { when: all(is("scale", "enterprise"), is("team", "large")), score: 5, reason: "Structured Node backend for a large team" },
            ],
          },
          {
            tech: "spring-boot",
            base: 0,
            boosts: [{ when: is("experience", "jvm"), score: 7, reason: "Matches your Java/JVM background" }],
          },
        ],
      },
      {
        key: "database",
        label: "Database",
        candidates: [
          {
            tech: "postgres",
            base: 5,
            boosts: [
              { when: is("scale", "enterprise"), score: 1, reason: "Handles serious scale and complex queries" },
              { when: is("priority", "scale"), score: 1, reason: "Rock-solid and reliable" },
            ],
          },
          {
            tech: "supabase-db",
            base: 2,
            boosts: [
              { when: is("priority", "speed"), score: 2, reason: "Managed Postgres with instant APIs and realtime" },
              { when: is("budget", "min"), score: 1, reason: "Generous free tier" },
              { when: is("realtime", "yes"), score: 2, reason: "Built-in realtime subscriptions" },
            ],
          },
          {
            tech: "sqlite",
            base: 1,
            boosts: [
              { when: is("scale", "hobby"), score: 3, reason: "Zero-config and file-based — perfect for small projects" },
              { when: is("budget", "min"), score: 2, reason: "No database server to pay for" },
              { when: is("team", "solo"), score: 1, reason: "Nothing to operate solo" },
            ],
          },
          {
            tech: "firebase",
            base: 1,
            boosts: [
              { when: is("realtime", "yes"), score: 3, reason: "Realtime sync out of the box" },
              { when: is("priority", "speed"), score: 1, reason: "No schema work to get started" },
            ],
          },
          {
            tech: "planetscale",
            base: 0,
            boosts: [
              { when: is("scale", "enterprise"), score: 2, reason: "Serverless MySQL that scales horizontally" },
              { when: is("priority", "scale"), score: 1, reason: "Built for high scale" },
            ],
          },
        ],
      },
      {
        key: "auth",
        label: "Authentication",
        candidates: [
          {
            tech: "better-auth",
            base: 5,
            boosts: [
              { when: is("experience", "jsts"), score: 1, reason: "Type-safe auth that lives in your codebase" },
              { when: is("budget", "min"), score: 1, reason: "Open-source and self-hosted — no per-user fees" },
            ],
          },
          {
            tech: "authjs",
            base: 2,
            boosts: [
              { when: is("experience", "jsts"), score: 1, reason: "Well-established, especially when migrating an existing NextAuth app" },
            ],
          },
          {
            tech: "clerk",
            base: 2,
            boosts: [
              { when: is("priority", "speed"), score: 3, reason: "Drop-in auth UI — fastest to ship" },
              { when: not("scale", "enterprise"), score: 1, reason: "Great DX for small/medium apps" },
              { when: not("budget", "min"), score: 1, reason: "Worth it when you have a little budget" },
            ],
          },
          {
            tech: "supabase-auth",
            base: 1,
            boosts: [
              { when: is("budget", "min"), score: 2, reason: "Free and tied to your Postgres with row-level security" },
              { when: not("scale", "enterprise"), score: 1, reason: "Simple to wire up" },
            ],
          },
          {
            tech: "auth0",
            base: 0,
            boosts: [
              { when: all(is("scale", "enterprise"), is("team", "large")), score: 5, reason: "Enterprise identity: SSO, compliance, fine-grained control" },
            ],
          },
        ],
      },
      {
        key: "hosting",
        label: "Hosting",
        candidates: [
          {
            tech: "vercel",
            base: 5,
            boosts: [
              { when: is("priority", "speed"), score: 2, reason: "Zero-config deploys with preview URLs" },
              { when: not("scale", "enterprise"), score: 1, reason: "Best-in-class DX for Next.js" },
              { when: not("team", "large"), score: 1, reason: "No ops to manage" },
            ],
          },
          {
            tech: "cloudflare",
            base: 2,
            boosts: [
              { when: is("priority", "cost"), score: 3, reason: "Cheapest at scale" },
              { when: is("budget", "min"), score: 2, reason: "Very generous free tier" },
              { when: is("scale", "enterprise"), score: 1, reason: "Global edge network" },
            ],
          },
          {
            tech: "netlify",
            base: 2,
            boosts: [{ when: is("priority", "speed"), score: 1, reason: "Simple, fast frontend deploys" }],
          },
          {
            tech: "railway",
            base: 1,
            boosts: [{ when: all(is("scale", "growth"), is("experience", "python")), score: 2, reason: "Deploy a Python backend and database together" }],
          },
          {
            tech: "aws",
            base: 0,
            boosts: [
              { when: all(is("scale", "enterprise"), is("team", "large")), score: 5, reason: "Full control and the widest service catalog" },
            ],
          },
        ],
      },
    ],
  },

  /* ============================ MOBILE ============================ */
  {
    id: "mobile",
    label: "Mobile app",
    tagline: "iOS & Android",
    emoji: "📱",
    layers: [
      {
        key: "framework",
        label: "App framework",
        candidates: [
          {
            tech: "expo",
            base: 2,
            boosts: [
              { when: is("platforms", "cross"), score: 4, reason: "iOS + Android from one React Native codebase" },
              { when: is("experience", "jsts"), score: 2, reason: "Reuses your JS/TS skills" },
              { when: is("mobileOffline", "no"), score: 1, reason: "Plenty of capability for standard apps" },
            ],
          },
          {
            tech: "flutter",
            base: 2,
            boosts: [
              { when: is("platforms", "cross"), score: 3, reason: "One codebase with native performance and custom UI" },
              { when: is("priority", "performance"), score: 2, reason: "Compiles to native, very smooth UI" },
            ],
          },
          {
            tech: "swiftui",
            base: 0,
            boosts: [
              { when: is("platforms", "ios"), score: 6, reason: "iOS-first — the best Apple-native experience" },
              { when: is("platforms", "native"), score: 3, reason: "Native iOS half of a two-app build" },
              { when: is("experience", "native"), score: 2, reason: "Matches your Swift skills" },
            ],
          },
          {
            tech: "compose",
            base: 0,
            boosts: [
              { when: is("platforms", "android"), score: 6, reason: "Android-first — modern native Kotlin UI" },
              { when: is("platforms", "native"), score: 3, reason: "Native Android half of a two-app build" },
              { when: is("experience", "native"), score: 2, reason: "Matches your Kotlin skills" },
            ],
          },
        ],
      },
      {
        key: "backend",
        label: "Backend",
        candidates: [
          {
            tech: "supabase",
            base: 4,
            boosts: [
              { when: is("priority", "speed"), score: 2, reason: "DB, auth, storage, and realtime with mobile SDKs" },
              { when: not("scale", "enterprise"), score: 1, reason: "Skip running your own server" },
              { when: is("budget", "min"), score: 1, reason: "Generous free tier" },
            ],
          },
          {
            tech: "hono",
            base: 2,
            boosts: [{ when: is("experience", "jsts"), score: 2, reason: "A lightweight TS API your app calls" }],
          },
          {
            tech: "fastapi",
            base: 1,
            boosts: [{ when: is("experience", "python"), score: 4, reason: "Python API matches your team" }],
          },
          {
            tech: "nestjs",
            base: 0,
            boosts: [{ when: all(is("scale", "enterprise"), is("team", "large")), score: 5, reason: "Structured backend for a large team" }],
          },
        ],
      },
      {
        key: "database",
        label: "Database",
        candidates: [
          {
            tech: "firebase",
            base: 3,
            boosts: [
              { when: is("mobileOffline", "yes"), score: 3, reason: "Offline-first sync built in" },
              { when: is("priority", "speed"), score: 1, reason: "No backend wiring to read/write data" },
            ],
          },
          {
            tech: "supabase-db",
            base: 3,
            boosts: [
              { when: is("budget", "min"), score: 1, reason: "Free Postgres with realtime" },
              { when: not("scale", "enterprise"), score: 1, reason: "Relational data with simple client access" },
            ],
          },
          {
            tech: "postgres",
            base: 1,
            boosts: [{ when: is("scale", "enterprise"), score: 2, reason: "Full relational power behind your own API" }],
          },
          {
            tech: "sqlite",
            base: 1,
            boosts: [{ when: is("mobileOffline", "yes"), score: 2, reason: "On-device local storage (pair with a sync engine for full offline-first)" }],
          },
          {
            tech: "powersync",
            base: 1,
            boosts: [
              { when: all(is("mobileOffline", "yes"), not("priority", "speed")), score: 6, reason: "Local-first SQLite that syncs to your Postgres — true offline-first" },
              { when: is("experience", "jsts"), score: 1, reason: "Drops into a React Native / Expo app" },
            ],
          },
        ],
      },
      {
        key: "auth",
        label: "Authentication",
        candidates: [
          {
            tech: "firebase-auth",
            base: 3,
            boosts: [
              { when: is("priority", "speed"), score: 2, reason: "Easy social logins across platforms" },
              { when: is("platforms", "cross"), score: 1, reason: "Works the same on iOS and Android" },
            ],
          },
          {
            tech: "supabase-auth",
            base: 3,
            boosts: [
              { when: is("budget", "min"), score: 1, reason: "Free and tied to your data" },
              { when: not("scale", "enterprise"), score: 1, reason: "Simple to integrate" },
            ],
          },
          {
            tech: "clerk",
            base: 2,
            boosts: [{ when: is("priority", "speed"), score: 2, reason: "Drop-in auth with native SDKs" }],
          },
          {
            tech: "auth0",
            base: 0,
            boosts: [{ when: all(is("scale", "enterprise"), is("team", "large")), score: 5, reason: "Enterprise identity and SSO" }],
          },
        ],
      },
      {
        key: "shipping",
        label: "Build & distribution",
        candidates: [
          {
            tech: "expo-eas",
            base: 1,
            boosts: [
              { when: all(is("platforms", "cross"), not("priority", "performance")), score: 5, reason: "Builds and ships React Native/Expo to both stores, with OTA updates" },
              { when: is("experience", "jsts"), score: 1, reason: "Pairs with an Expo / React Native app" },
            ],
          },
          {
            tech: "codemagic",
            base: 3,
            boosts: [
              { when: is("platforms", "native", "ios", "android"), score: 2, reason: "Builds fully-native (and Flutter) apps in CI" },
              { when: is("priority", "performance"), score: 1, reason: "Builds Flutter — the performance pick — end to end" },
            ],
          },
          {
            tech: "fastlane",
            base: 2,
            boosts: [{ when: is("platforms", "ios", "native"), score: 1, reason: "Automates signing and store release" }],
          },
          {
            tech: "app-stores",
            base: 2,
            boosts: [{ when: is("platforms", "native", "ios", "android"), score: 1, reason: "Standard native store submission" }],
          },
        ],
      },
    ],
  },

  /* ============================= DATA ============================= */
  {
    id: "data",
    label: "Data / ML",
    tagline: "Analysis, models, pipelines",
    emoji: "📊",
    layers: [
      {
        key: "language",
        label: "Primary language",
        candidates: [
          {
            tech: "python",
            base: 6,
            boosts: [{ when: () => true, score: 0, reason: "The lingua franca of data and ML" }],
          },
          {
            tech: "ts",
            base: 0,
            boosts: [
              { when: is("dataGoal", "proto"), score: 2, reason: "Handy if the prototype is a web app" },
              { when: is("experience", "jsts"), score: 2, reason: "Matches your team" },
            ],
          },
          {
            tech: "rust",
            base: 0,
            boosts: [{ when: is("priority", "performance"), score: 2, reason: "For performance-critical processing" }],
          },
        ],
      },
      {
        key: "tools",
        label: "Core tools",
        candidates: [
          {
            tech: "jupyter",
            base: 3,
            boosts: [
              { when: is("dataGoal", "analysis"), score: 3, reason: "Interactive analysis with pandas" },
              { when: is("dataScale", "small"), score: 1, reason: "Great for in-memory exploration" },
            ],
          },
          {
            tech: "pytorch",
            base: 1,
            boosts: [
              { when: is("dataGoal", "ml"), score: 5, reason: "Deep-learning modeling" },
              { when: is("dataScale", "big"), score: 1, reason: "Scales to large training jobs" },
            ],
          },
          {
            tech: "sklearn",
            base: 1,
            boosts: [
              { when: all(is("dataGoal", "ml"), is("dataScale", "small")), score: 6, reason: "Classic ML on tabular data that fits in memory" },
            ],
          },
          {
            tech: "spark",
            base: 0,
            boosts: [
              { when: is("dataScale", "big"), score: 5, reason: "Distributed processing for big data" },
              { when: is("dataGoal", "pipeline"), score: 2, reason: "Handles large-scale transforms" },
            ],
          },
          {
            tech: "dbt",
            base: 0,
            boosts: [{ when: is("dataGoal", "pipeline"), score: 5, reason: "SQL transforms with engineering rigor" }],
          },
          {
            tech: "streamlit",
            base: 0,
            boosts: [{ when: is("dataGoal", "proto"), score: 6, reason: "Turn a Python script into a shareable app" }],
          },
          {
            tech: "duckdb",
            base: 1,
            boosts: [
              { when: all(is("dataGoal", "analysis"), is("dataScale", "small")), score: 2, reason: "Fast local analytical SQL" },
              { when: is("priority", "performance"), score: 2, reason: "Very fast on a single machine" },
            ],
          },
        ],
      },
      {
        key: "storage",
        label: "Storage / database",
        candidates: [
          {
            tech: "duckdb",
            base: 2,
            boosts: [
              { when: is("dataScale", "small"), score: 3, reason: "Blazing local analytics, no server" },
              { when: is("dataGoal", "analysis"), score: 2, reason: "Built for analytical queries" },
            ],
          },
          {
            tech: "postgres",
            base: 3,
            boosts: [
              { when: is("dataGoal", "pipeline"), score: 1, reason: "Reliable destination for processed data" },
              { when: is("scale", "enterprise"), score: 1, reason: "Battle-tested relational store" },
            ],
          },
          {
            tech: "warehouse",
            base: 0,
            boosts: [
              { when: is("dataScale", "big"), score: 5, reason: "Query huge datasets with SQL" },
              { when: is("dataGoal", "analysis", "pipeline"), score: 2, reason: "Central warehouse for analytics" },
            ],
          },
          {
            tech: "s3",
            base: 0,
            boosts: [
              { when: all(is("dataScale", "big"), is("dataGoal", "pipeline")), score: 4, reason: "Cheap object storage for a data lake" },
              { when: is("budget", "min"), score: 1, reason: "Pay only for what you store" },
            ],
          },
        ],
      },
      {
        key: "hosting",
        label: "Run & share",
        candidates: [
          {
            tech: "colab",
            base: 2,
            boosts: [
              { when: is("dataGoal", "ml", "analysis"), score: 2, reason: "Notebooks with free GPUs" },
              { when: is("budget", "min"), score: 2, reason: "Free to start" },
            ],
          },
          {
            tech: "hf-spaces",
            base: 1,
            boosts: [
              { when: is("dataGoal", "ml"), score: 2, reason: "Host ML demos (GPUs available)" },
              { when: is("dataGoal", "proto"), score: 1, reason: "Share an app with a link" },
              { when: is("budget", "min"), score: 1, reason: "Free hosting tier" },
            ],
          },
          {
            tech: "aws",
            base: 1,
            boosts: [
              { when: is("dataScale", "big"), score: 3, reason: "Scalable compute for training and pipelines" },
              { when: is("scale", "enterprise"), score: 2, reason: "Full control over data infrastructure" },
            ],
          },
          {
            tech: "streamlit",
            base: 0,
            boosts: [{ when: is("dataGoal", "proto"), score: 3, reason: "One-click app hosting on Community Cloud" }],
          },
        ],
      },
    ],
  },

  /* ============================ BACKEND =========================== */
  {
    id: "backend",
    label: "Backend / API",
    tagline: "Services & APIs",
    emoji: "🔌",
    layers: [
      {
        key: "language",
        label: "Primary language",
        candidates: [
          {
            tech: "ts",
            base: 3,
            boosts: [{ when: is("experience", "jsts"), score: 3, reason: "Matches your team" }],
          },
          {
            tech: "python",
            base: 1,
            boosts: [
              { when: is("experience", "python"), score: 4, reason: "Matches your team" },
              { when: is("apiWorkload", "data"), score: 2, reason: "Best ecosystem for data/ML work" },
            ],
          },
          {
            tech: "go",
            base: 1,
            boosts: [
              { when: is("experience", "systems"), score: 3, reason: "Matches your systems background" },
              { when: is("apiWorkload", "throughput"), score: 3, reason: "Excellent for high-throughput services" },
              { when: is("priority", "performance"), score: 2, reason: "Fast and efficient under load" },
            ],
          },
          {
            tech: "rust",
            base: 0,
            boosts: [
              { when: all(is("apiWorkload", "throughput"), is("priority", "performance")), score: 4, reason: "Maximum performance with memory safety" },
              { when: is("experience", "systems"), score: 1, reason: "Matches your systems background" },
            ],
          },
          {
            tech: "java",
            base: 0,
            boosts: [{ when: is("experience", "jvm"), score: 5, reason: "Matches your JVM background" }],
          },
        ],
      },
      {
        key: "framework",
        label: "Framework",
        candidates: [
          {
            tech: "hono",
            base: 2,
            boosts: [
              { when: is("experience", "jsts"), score: 2, reason: "Ultralight TS, runs anywhere including the edge" },
              { when: is("apiWorkload", "throughput"), score: 1, reason: "Very low overhead" },
            ],
          },
          {
            tech: "nestjs",
            base: 1,
            boosts: [
              { when: all(is("scale", "enterprise"), is("team", "large")), score: 5, reason: "Structured Node framework for a big team" },
              { when: is("experience", "jsts"), score: 1, reason: "TypeScript-first" },
            ],
          },
          {
            tech: "fastapi",
            base: 1,
            boosts: [
              { when: is("experience", "python"), score: 4, reason: "Fast, typed Python APIs" },
              { when: is("apiWorkload", "data"), score: 2, reason: "Sits right next to your data/ML code" },
            ],
          },
          {
            tech: "django",
            base: 0,
            boosts: [
              { when: all(is("experience", "python"), is("apiWorkload", "crud")), score: 6, reason: "Batteries-included: ORM, admin, and auth" },
            ],
          },
          {
            tech: "go-gin",
            base: 0,
            boosts: [
              { when: is("apiWorkload", "throughput"), score: 4, reason: "High-throughput HTTP services" },
              { when: is("experience", "systems"), score: 2, reason: "Matches your Go skills" },
              { when: is("priority", "performance"), score: 2, reason: "Fast and lean" },
            ],
          },
          {
            tech: "spring-boot",
            base: 0,
            boosts: [{ when: is("experience", "jvm"), score: 6, reason: "Matches your JVM background" }],
          },
        ],
      },
      {
        key: "database",
        label: "Database",
        candidates: [
          {
            tech: "postgres",
            base: 5,
            boosts: [
              { when: is("scale", "enterprise"), score: 1, reason: "Handles serious scale" },
              { when: is("priority", "scale"), score: 1, reason: "Reliable and full-featured" },
            ],
          },
          {
            tech: "mongodb",
            base: 1,
            boosts: [{ when: is("experience", "jsts"), score: 1, reason: "Document model fits flexible JS data" }],
          },
          {
            tech: "firebase",
            base: 1,
            boosts: [{ when: is("apiWorkload", "realtime"), score: 3, reason: "Realtime data sync out of the box" }],
          },
          {
            tech: "sqlite",
            base: 1,
            boosts: [
              { when: is("scale", "hobby"), score: 3, reason: "Zero-config for small services" },
              { when: is("budget", "min"), score: 2, reason: "No database server to run" },
            ],
          },
          {
            tech: "planetscale",
            base: 0,
            boosts: [{ when: is("scale", "enterprise"), score: 2, reason: "Serverless MySQL that scales" }],
          },
        ],
      },
      {
        key: "cache",
        label: "Cache / queue",
        candidates: [
          {
            tech: "redis",
            base: 4,
            boosts: [
              { when: is("apiWorkload", "throughput", "realtime"), score: 2, reason: "Caching and queues to absorb load" },
              { when: not("scale", "hobby"), score: 1, reason: "Standard for sessions, caching, rate limiting" },
            ],
          },
          {
            tech: "none-cache",
            base: 3,
            boosts: [
              { when: is("scale", "hobby"), score: 2, reason: "Don't add a cache before you need one" },
              { when: is("team", "solo"), score: 1, reason: "One less thing to operate" },
            ],
          },
          {
            tech: "kafka",
            base: 0,
            boosts: [
              { when: all(is("apiWorkload", "realtime"), is("scale", "enterprise")), score: 4, reason: "Durable event streaming at scale" },
            ],
          },
        ],
      },
      {
        key: "auth",
        label: "Authentication",
        candidates: [
          {
            tech: "custom-jwt",
            base: 3,
            boosts: [
              { when: is("apiWorkload", "throughput"), score: 1, reason: "No external call on every request" },
              { when: not("team", "large"), score: 1, reason: "Full control, minimal dependencies" },
            ],
          },
          {
            tech: "clerk",
            base: 2,
            boosts: [
              { when: is("priority", "speed"), score: 2, reason: "Managed auth, fastest to ship" },
              { when: not("scale", "enterprise"), score: 1, reason: "Great DX" },
            ],
          },
          {
            tech: "authjs",
            base: 2,
            boosts: [{ when: is("experience", "jsts"), score: 1, reason: "Good fit if it serves a web frontend" }],
          },
          {
            tech: "auth0",
            base: 0,
            boosts: [{ when: all(is("scale", "enterprise"), is("team", "large")), score: 5, reason: "Enterprise identity and SSO" }],
          },
        ],
      },
      {
        key: "hosting",
        label: "Hosting",
        candidates: [
          {
            tech: "railway",
            base: 3,
            boosts: [
              { when: not("scale", "enterprise"), score: 1, reason: "Deploy the service and database together" },
              { when: is("priority", "speed"), score: 1, reason: "Minimal setup" },
              { when: not("team", "large"), score: 1, reason: "No ops overhead" },
            ],
          },
          {
            tech: "fly",
            base: 2,
            boosts: [
              { when: is("priority", "performance"), score: 2, reason: "Run containers close to users" },
              { when: is("apiWorkload", "throughput"), score: 1, reason: "Good for low-latency services" },
            ],
          },
          {
            tech: "render",
            base: 2,
            boosts: [{ when: is("scale", "growth"), score: 1, reason: "Simple managed services as you grow" }],
          },
          {
            tech: "aws",
            base: 0,
            boosts: [{ when: all(is("scale", "enterprise"), is("team", "large")), score: 5, reason: "Full control and the widest service catalog" }],
          },
          {
            tech: "cloudflare",
            base: 1,
            boosts: [
              { when: is("priority", "cost"), score: 2, reason: "Cheap edge compute" },
              { when: is("budget", "min"), score: 2, reason: "Very generous free tier" },
              { when: is("experience", "jsts"), score: 1, reason: "Workers run your TS at the edge" },
            ],
          },
        ],
      },
    ],
  },

  /* ============================== AI ============================== */
  {
    id: "ai",
    label: "AI / LLM app",
    tagline: "Chatbots, RAG, agents",
    emoji: "🤖",
    layers: [
      {
        key: "language",
        label: "Primary language",
        candidates: [
          {
            tech: "ts",
            base: 3,
            boosts: [
              { when: is("experience", "jsts"), score: 3, reason: "Matches your team" },
              { when: is("aiKind", "chatbot", "generation"), score: 1, reason: "Chat/generation UIs are TypeScript-first" },
            ],
          },
          {
            tech: "python",
            base: 3,
            boosts: [
              { when: is("experience", "python"), score: 3, reason: "Matches your team" },
              { when: is("aiKind", "agents", "extraction"), score: 1, reason: "Richest ecosystem for agents and data extraction" },
              { when: is("aiHost", "self"), score: 1, reason: "Best tooling for running local models" },
            ],
          },
        ],
      },
      {
        key: "framework",
        label: "App framework",
        candidates: [
          {
            tech: "nextjs",
            base: 3,
            boosts: [
              { when: is("aiKind", "chatbot", "generation"), score: 2, reason: "Ship a streaming chat/generation UI fast" },
              { when: is("experience", "jsts"), score: 1, reason: "One codebase for UI and AI routes" },
            ],
          },
          {
            tech: "fastapi",
            base: 1,
            boosts: [
              { when: is("experience", "python"), score: 3, reason: "A typed Python service for your AI logic" },
              { when: is("aiKind", "agents", "extraction", "rag"), score: 2, reason: "Clean API around Python AI code" },
            ],
          },
          {
            tech: "streamlit",
            base: 0,
            boosts: [
              { when: all(is("experience", "python"), is("scale", "hobby")), score: 3, reason: "Stand up an internal AI app in pure Python" },
            ],
          },
        ],
      },
      {
        key: "aiFramework",
        label: "AI framework",
        candidates: [
          {
            tech: "ai-sdk",
            base: 3,
            boosts: [
              { when: is("experience", "jsts"), score: 3, reason: "TS-native streaming, tool calling, and structured output" },
              { when: is("aiKind", "chatbot", "generation"), score: 1, reason: "Built for chat and generation UIs" },
            ],
          },
          {
            tech: "langgraph",
            base: 1,
            boosts: [{ when: is("aiKind", "agents"), score: 4, reason: "Stateful, multi-step agent orchestration" }],
          },
          {
            tech: "llamaindex",
            base: 1,
            boosts: [
              { when: is("aiData", "yes"), score: 3, reason: "Purpose-built for RAG over your data" },
              { when: is("aiKind", "rag"), score: 1, reason: "Best-in-class retrieval pipeline" },
            ],
          },
          {
            tech: "langchain",
            base: 1,
            boosts: [{ when: is("experience", "python"), score: 1, reason: "Mature Python ecosystem and integrations" }],
          },
        ],
      },
      {
        key: "model",
        label: "Model access",
        candidates: [
          {
            tech: "ai-gateway",
            base: 4,
            boosts: [
              { when: is("aiHost", "hosted"), score: 2, reason: "One API to the best models, with fallbacks and observability" },
              { when: is("aiHost", "cheap"), score: 2, reason: "Route to cheaper models and add automatic fallbacks" },
              { when: is("experience", "jsts"), score: 1, reason: "First-class with the AI SDK" },
            ],
          },
          {
            tech: "claude",
            base: 3,
            boosts: [{ when: is("aiHost", "hosted"), score: 1, reason: "Frontier reasoning, tool use, and long context" }],
          },
          {
            tech: "ollama",
            base: 0,
            boosts: [
              { when: is("aiHost", "self"), score: 6, reason: "Run open-weight models locally — private, no per-token cost" },
              { when: is("budget", "min"), score: 1, reason: "No usage bills" },
            ],
          },
        ],
      },
      {
        key: "vector",
        label: "Vector store",
        candidates: [
          {
            tech: "pgvector",
            base: 3,
            boosts: [
              { when: is("aiData", "yes"), score: 2, reason: "Vectors inside the Postgres you already run" },
              { when: is("budget", "min"), score: 1, reason: "No extra database to pay for" },
              { when: not("scale", "enterprise"), score: 1, reason: "Plenty fast up to large datasets" },
            ],
          },
          {
            tech: "pinecone",
            base: 1,
            boosts: [
              { when: all(is("aiData", "yes"), is("scale", "enterprise")), score: 5, reason: "Managed vector DB for large-scale production RAG" },
              { when: is("priority", "scale"), score: 1, reason: "Scales retrieval without ops" },
            ],
          },
          {
            tech: "chroma",
            base: 1,
            boosts: [
              { when: all(is("aiData", "yes"), is("scale", "hobby")), score: 2, reason: "Lightweight local vector store for prototypes" },
              { when: is("experience", "python"), score: 1, reason: "Drops into a Python pipeline" },
            ],
          },
          {
            tech: "weaviate",
            base: 0,
            boosts: [{ when: all(is("aiData", "yes"), is("priority", "scale")), score: 2, reason: "Open-source vector DB with hybrid search" }],
          },
          {
            tech: "none-vector",
            base: 2,
            boosts: [{ when: is("aiData", "no"), score: 4, reason: "No retrieval needed yet — keep it simple" }],
          },
        ],
      },
      {
        key: "database",
        label: "Database",
        candidates: [
          {
            tech: "postgres",
            base: 4,
            boosts: [
              { when: is("aiData", "yes"), score: 1, reason: "Pairs with pgvector for retrieval" },
              { when: is("scale", "enterprise"), score: 1, reason: "Reliable at scale" },
            ],
          },
          {
            tech: "supabase-db",
            base: 3,
            boosts: [
              { when: is("priority", "speed"), score: 2, reason: "Managed Postgres with pgvector and auth built in" },
              { when: is("budget", "min"), score: 1, reason: "Generous free tier" },
              { when: is("experience", "jsts"), score: 1, reason: "Easy client access from a TS app" },
            ],
          },
          {
            tech: "sqlite",
            base: 1,
            boosts: [
              { when: is("scale", "hobby"), score: 2, reason: "Zero-config for a small app" },
              { when: is("budget", "min"), score: 1, reason: "Nothing to operate" },
            ],
          },
        ],
      },
      {
        key: "hosting",
        label: "Hosting",
        candidates: [
          {
            tech: "vercel",
            base: 4,
            boosts: [
              { when: is("experience", "jsts"), score: 2, reason: "Zero-config deploys with streaming AI routes" },
              { when: is("aiKind", "chatbot", "generation"), score: 1, reason: "Built for streaming UIs" },
              { when: is("priority", "speed"), score: 1, reason: "Ship in minutes" },
            ],
          },
          {
            tech: "railway",
            base: 2,
            boosts: [{ when: is("experience", "python"), score: 3, reason: "Host a Python AI service and database together" }],
          },
          {
            tech: "fly",
            base: 1,
            boosts: [
              { when: is("aiHost", "self"), score: 3, reason: "Run close to GPUs / your own models" },
              { when: is("priority", "performance"), score: 1, reason: "Low-latency global compute" },
            ],
          },
          {
            tech: "cloudflare",
            base: 1,
            boosts: [
              { when: is("priority", "cost"), score: 2, reason: "Cheap edge compute" },
              { when: is("budget", "min"), score: 1, reason: "Generous free tier" },
            ],
          },
          {
            tech: "aws",
            base: 0,
            boosts: [{ when: all(is("scale", "enterprise"), is("team", "large")), score: 4, reason: "Full control for large-scale AI infrastructure" }],
          },
        ],
      },
    ],
  },

  /* ============================ DESKTOP =========================== */
  {
    id: "desktop",
    label: "Desktop app",
    tagline: "Windows, macOS, Linux",
    emoji: "🖥️",
    layers: [
      {
        key: "language",
        label: "Primary language",
        candidates: [
          {
            tech: "ts",
            base: 2,
            boosts: [
              { when: is("desktopNeed", "web"), score: 4, reason: "Reuse your web/JS skills" },
              { when: is("experience", "jsts"), score: 2, reason: "Matches your team" },
            ],
          },
          {
            tech: "rust",
            base: 0,
            boosts: [
              { when: is("desktopNeed", "light"), score: 4, reason: "Tauri's core is Rust — tiny and fast" },
              { when: is("priority", "performance"), score: 2, reason: "Top performance" },
            ],
          },
          {
            tech: "csharp",
            base: 0,
            boosts: [
              { when: is("desktopNeed", "windows"), score: 5, reason: "First-class on Windows" },
              { when: is("experience", "jvm"), score: 2, reason: "Matches your .NET/JVM background" },
            ],
          },
          {
            tech: "cpp",
            base: 0,
            boosts: [
              { when: is("desktopNeed", "heavy"), score: 5, reason: "Deep native performance and OS access" },
              { when: is("priority", "performance"), score: 2, reason: "Maximum control" },
            ],
          },
        ],
      },
      {
        key: "framework",
        label: "App framework",
        candidates: [
          {
            tech: "electron",
            base: 2,
            boosts: [
              { when: is("desktopNeed", "web"), score: 4, reason: "Mature web-tech desktop apps, huge ecosystem" },
              { when: is("experience", "jsts"), score: 2, reason: "Build the UI with web skills" },
            ],
          },
          {
            tech: "tauri",
            base: 2,
            boosts: [
              { when: is("desktopNeed", "light"), score: 5, reason: "Tiny, secure binaries with a web UI" },
              { when: is("desktopNeed", "web"), score: 3, reason: "Web UI with a much smaller footprint than Electron" },
              { when: is("budget", "min"), score: 1, reason: "Low resource use, lower hosting/update costs" },
            ],
          },
          {
            tech: "maui",
            base: 0,
            boosts: [
              { when: is("desktopNeed", "windows"), score: 5, reason: "Native Windows business apps in C#" },
              { when: is("experience", "jvm"), score: 1, reason: "Familiar to .NET teams" },
            ],
          },
          {
            tech: "qt",
            base: 0,
            boosts: [
              { when: is("desktopNeed", "heavy"), score: 5, reason: "Mature native C++ across platforms" },
              { when: is("experience", "systems"), score: 2, reason: "Matches your systems skills" },
            ],
          },
        ],
      },
      {
        key: "storage",
        label: "Local storage",
        candidates: [
          {
            tech: "sqlite",
            base: 5,
            boosts: [{ when: () => true, score: 0, reason: "The standard embedded database for desktop apps" }],
          },
          {
            tech: "duckdb",
            base: 1,
            boosts: [{ when: is("priority", "performance"), score: 1, reason: "For heavy local analytics" }],
          },
          {
            tech: "postgres",
            base: 0,
            boosts: [{ when: is("scale", "enterprise"), score: 2, reason: "If the app syncs to a central server" }],
          },
        ],
      },
      {
        key: "distribution",
        label: "Distribution",
        candidates: [
          {
            tech: "gh-releases",
            base: 3,
            boosts: [{ when: not("desktopNeed", "windows"), score: 1, reason: "Cross-platform installers with auto-update" }],
          },
          {
            tech: "app-stores",
            base: 1,
            boosts: [{ when: is("desktopNeed", "windows"), score: 3, reason: "Reach via the Microsoft Store" }],
          },
        ],
      },
    ],
  },

  /* ============================= GAME ============================= */
  {
    id: "game",
    label: "Game",
    tagline: "2D & 3D games",
    emoji: "🎮",
    layers: [
      {
        key: "engine",
        label: "Engine",
        candidates: [
          {
            tech: "unity",
            base: 3,
            boosts: [
              { when: is("gamePlatform", "mobile"), score: 3, reason: "Best-in-class for mobile games" },
              { when: is("gameDim", "2d"), score: 1, reason: "Strong 2D and 3D support" },
              { when: is("gamePlatform", "indie"), score: 1, reason: "Huge ecosystem and asset store" },
            ],
          },
          {
            tech: "unreal",
            base: 1,
            boosts: [
              { when: is("gamePlatform", "pcconsole"), score: 3, reason: "Built for PC/console" },
              { when: is("gameDim", "3d"), score: 3, reason: "AAA-grade 3D visuals" },
              { when: is("priority", "performance"), score: 2, reason: "High-end rendering performance" },
            ],
          },
          {
            tech: "godot",
            base: 1,
            boosts: [
              { when: is("budget", "min"), score: 3, reason: "Free and open-source, no royalties" },
              { when: is("gameDim", "2d"), score: 2, reason: "Excellent, lightweight 2D engine" },
              { when: is("gamePlatform", "indie"), score: 2, reason: "Lightweight and indie-friendly" },
            ],
          },
          {
            tech: "phaser",
            base: 0,
            boosts: [{ when: all(is("gamePlatform", "web"), is("gameDim", "2d")), score: 7, reason: "2D games that run in the browser (JS/TS)" }],
          },
          {
            tech: "babylonjs",
            base: 0,
            boosts: [{ when: all(is("gamePlatform", "web"), is("gameDim", "3d")), score: 6, reason: "A full 3D game engine that runs in the browser" }],
          },
          {
            tech: "threejs",
            base: 0,
            boosts: [{ when: all(is("gamePlatform", "web"), is("gameDim", "3d")), score: 5, reason: "Popular 3D rendering for the web (add a physics engine)" }],
          },
        ],
      },
      {
        key: "language",
        label: "Primary language",
        candidates: [
          {
            tech: "csharp",
            base: 2,
            boosts: [{ when: is("gamePlatform", "mobile", "indie"), score: 2, reason: "Unity's language" }],
          },
          {
            tech: "cpp",
            base: 0,
            boosts: [
              { when: is("gamePlatform", "pcconsole"), score: 4, reason: "Unreal / AAA pipelines use C++" },
              { when: is("priority", "performance"), score: 2, reason: "Maximum performance" },
            ],
          },
          {
            tech: "gdscript",
            base: 0,
            boosts: [
              { when: is("budget", "min"), score: 3, reason: "Godot's built-in, easy language" },
              { when: is("gamePlatform", "indie"), score: 2, reason: "Fast iteration for small teams" },
            ],
          },
          {
            tech: "ts",
            base: 0,
            boosts: [{ when: is("gamePlatform", "web"), score: 5, reason: "Web games are built in JS/TS" }],
          },
        ],
      },
      {
        key: "backend",
        label: "Multiplayer / backend",
        candidates: [
          {
            tech: "firebase",
            base: 3,
            boosts: [
              { when: is("priority", "speed"), score: 1, reason: "Quick leaderboards and saves" },
              { when: not("scale", "enterprise"), score: 1, reason: "Simple backend for casual games" },
            ],
          },
          {
            tech: "photon",
            base: 2,
            boosts: [
              { when: is("gamePlatform", "pcconsole"), score: 3, reason: "Real-time multiplayer networking" },
              { when: is("gameDim", "3d"), score: 1, reason: "Popular for action multiplayer" },
            ],
          },
          {
            tech: "supabase",
            base: 1,
            boosts: [
              { when: is("budget", "min"), score: 1, reason: "Free Postgres-backed game data" },
              { when: is("experience", "jsts"), score: 1, reason: "Easy if you know JS/TS" },
            ],
          },
          {
            tech: "playfab",
            base: 1,
            boosts: [{ when: is("scale", "enterprise"), score: 2, reason: "Full live-ops: economy, leaderboards, analytics" }],
          },
        ],
      },
      {
        key: "distribution",
        label: "Distribution",
        candidates: [
          {
            tech: "steam",
            base: 1,
            boosts: [{ when: is("gamePlatform", "pcconsole"), score: 4, reason: "The PC marketplace players use" }],
          },
          {
            tech: "app-stores",
            base: 1,
            boosts: [{ when: is("gamePlatform", "mobile"), score: 4, reason: "App Store / Play Store" }],
          },
          {
            tech: "itch",
            base: 1,
            boosts: [
              { when: is("gamePlatform", "indie"), score: 3, reason: "Indie-friendly marketplace" },
              { when: is("budget", "min"), score: 1, reason: "Free to publish" },
            ],
          },
          {
            tech: "vercel",
            base: 0,
            boosts: [{ when: is("gamePlatform", "web"), score: 4, reason: "Host a web game for free" }],
          },
        ],
      },
    ],
  },

  /* ============================== CLI ============================= */
  {
    id: "cli",
    label: "CLI tool",
    tagline: "Command-line utilities",
    emoji: "⌨️",
    layers: [
      {
        key: "language",
        label: "Primary language",
        candidates: [
          {
            tech: "ts",
            base: 1,
            boosts: [
              { when: is("cliDist", "npm"), score: 5, reason: "Distributes naturally via npm" },
              { when: is("experience", "jsts"), score: 2, reason: "Matches your team" },
            ],
          },
          {
            tech: "python",
            base: 1,
            boosts: [
              { when: is("cliDist", "pip"), score: 5, reason: "Distributes via PyPI/pipx" },
              { when: is("experience", "python"), score: 2, reason: "Matches your team" },
            ],
          },
          {
            tech: "go",
            base: 1,
            boosts: [
              { when: is("cliDist", "binary"), score: 5, reason: "Compiles to a single static binary" },
              { when: is("priority", "performance"), score: 1, reason: "Fast startup, low overhead" },
            ],
          },
          {
            tech: "rust",
            base: 0,
            boosts: [
              { when: is("cliDist", "perf"), score: 5, reason: "Fast, robust single binaries" },
              { when: is("priority", "performance"), score: 2, reason: "Top performance" },
              { when: is("experience", "systems"), score: 1, reason: "Matches your systems skills" },
            ],
          },
        ],
      },
      {
        key: "framework",
        label: "CLI framework",
        candidates: [
          { tech: "node-cli", base: 1, boosts: [{ when: is("cliDist", "npm"), score: 5, reason: "Commander/oclif for TS CLIs" }] },
          { tech: "typer", base: 1, boosts: [{ when: is("cliDist", "pip"), score: 5, reason: "Modern, typed Python CLIs" }] },
          { tech: "cobra", base: 1, boosts: [{ when: is("cliDist", "binary"), score: 5, reason: "The toolkit behind kubectl and gh" }] },
          { tech: "clap", base: 0, boosts: [{ when: is("cliDist", "perf"), score: 5, reason: "Ergonomic, fast Rust CLIs" }] },
        ],
      },
      {
        key: "distribution",
        label: "Distribution",
        candidates: [
          { tech: "npm-dist", base: 1, boosts: [{ when: is("cliDist", "npm"), score: 5, reason: "Install with npm / npx" }] },
          { tech: "pypi", base: 1, boosts: [{ when: is("cliDist", "pip"), score: 5, reason: "Install with pipx" }] },
          {
            tech: "gh-releases",
            base: 2,
            boosts: [{ when: is("cliDist", "binary", "perf"), score: 4, reason: "Prebuilt binaries via Releases / Homebrew" }],
          },
        ],
      },
    ],
  },
];

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
