import type { Tech } from "./types";

/**
 * Every technology the advisor can recommend, keyed by a stable id.
 * Keeping all metadata in one place means the engine only deals with ids.
 */
export const CATALOG: Record<string, Tech> = {
  // ---- Languages ----
  ts: {
    name: "TypeScript",
    blurb: "Typed JavaScript — one language across the entire stack.",
    url: "https://www.typescriptlang.org",
  },
  python: {
    name: "Python",
    blurb: "Readable and batteries-included; dominant in data/ML and great for backends.",
    url: "https://www.python.org",
  },
  go: {
    name: "Go",
    blurb: "Fast, simple, compiled — excellent for high-throughput services and CLIs.",
    url: "https://go.dev",
  },
  rust: {
    name: "Rust",
    blurb: "Memory-safe systems language with top-tier performance.",
    url: "https://www.rust-lang.org",
  },
  swift: {
    name: "Swift",
    blurb: "Apple's modern language for iOS and macOS.",
    url: "https://www.swift.org",
  },
  kotlin: {
    name: "Kotlin",
    blurb: "Modern JVM language and the first-class choice for Android.",
    url: "https://kotlinlang.org",
  },
  csharp: {
    name: "C#",
    blurb: "Versatile and mature — powers .NET, Unity, and enterprise apps.",
    url: "https://learn.microsoft.com/dotnet/csharp",
  },
  java: {
    name: "Java",
    blurb: "Ubiquitous, battle-tested JVM language for enterprise backends.",
    url: "https://dev.java",
  },
  dart: {
    name: "Dart",
    blurb: "The language behind Flutter for cross-platform UI.",
    url: "https://dart.dev",
  },
  cpp: {
    name: "C++",
    blurb: "Maximum control and performance for engines and systems.",
    url: "https://isocpp.org",
  },
  gdscript: {
    name: "GDScript",
    blurb: "Godot's friendly, Python-like scripting language.",
    url: "https://docs.godotengine.org",
  },

  // ---- Web frontend frameworks ----
  nextjs: {
    name: "Next.js",
    blurb: "React framework with SSR/SSG, routing, and server actions — the default for most web apps.",
    url: "https://nextjs.org",
  },
  "react-vite": {
    name: "React + Vite",
    blurb: "Fast single-page-app setup with the full React ecosystem.",
    url: "https://vite.dev",
  },
  sveltekit: {
    name: "SvelteKit",
    blurb: "Compile-time framework with a tiny runtime and excellent DX.",
    url: "https://svelte.dev/docs/kit",
  },
  nuxt: {
    name: "Nuxt (Vue)",
    blurb: "Batteries-included Vue meta-framework with SSR.",
    url: "https://nuxt.com",
  },
  astro: {
    name: "Astro",
    blurb: "Content-first; ships almost zero JS by default — ideal for sites.",
    url: "https://astro.build",
  },
  angular: {
    name: "Angular",
    blurb: "Opinionated, full-featured framework for large enterprise apps.",
    url: "https://angular.dev",
  },

  // ---- Styling ----
  tailwind: {
    name: "Tailwind CSS",
    blurb: "Utility-first CSS for fast, consistent styling.",
    url: "https://tailwindcss.com",
  },
  shadcn: {
    name: "shadcn/ui",
    blurb: "Accessible React components you copy in and own, built on Tailwind + Radix.",
    url: "https://ui.shadcn.com",
  },
  mui: {
    name: "MUI",
    blurb: "Comprehensive React component library (Material Design).",
    url: "https://mui.com",
  },
  "css-modules": {
    name: "CSS Modules",
    blurb: "Scoped plain CSS with no runtime and zero dependencies.",
    url: "https://github.com/css-modules/css-modules",
  },

  // ---- Web client state ----
  "tanstack-query": {
    name: "TanStack Query",
    blurb: "Server-state caching and sync — removes most manual state code.",
    url: "https://tanstack.com/query",
  },
  zustand: {
    name: "Zustand",
    blurb: "Tiny, simple global client state.",
    url: "https://zustand.docs.pmnd.rs",
  },
  "redux-toolkit": {
    name: "Redux Toolkit",
    blurb: "Structured, predictable state for large applications.",
    url: "https://redux-toolkit.js.org",
  },
  "react-context": {
    name: "React Context + hooks",
    blurb: "Built in to React — enough for light shared state.",
    url: "https://react.dev/reference/react/useContext",
  },

  // ---- Backend frameworks ----
  "nextjs-api": {
    name: "Next.js (Route Handlers + Server Actions)",
    blurb: "Your backend lives in the same app — one codebase, one deploy.",
    url: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
  },
  hono: {
    name: "Hono",
    blurb: "Ultralight, fast TypeScript web framework that runs anywhere, including the edge.",
    url: "https://hono.dev",
  },
  express: {
    name: "Express",
    blurb: "Minimal, ubiquitous Node web framework.",
    url: "https://expressjs.com",
  },
  nestjs: {
    name: "NestJS",
    blurb: "Opinionated, structured Node framework for larger teams.",
    url: "https://nestjs.com",
  },
  fastapi: {
    name: "FastAPI",
    blurb: "Modern, fast Python API framework with first-class typing.",
    url: "https://fastapi.tiangolo.com",
  },
  django: {
    name: "Django",
    blurb: "Batteries-included Python framework — ORM, admin, and auth out of the box.",
    url: "https://www.djangoproject.com",
  },
  "go-gin": {
    name: "Go + Gin",
    blurb: "High-performance HTTP services in Go.",
    url: "https://gin-gonic.com",
  },
  "spring-boot": {
    name: "Spring Boot",
    blurb: "Mature JVM framework for enterprise backends.",
    url: "https://spring.io/projects/spring-boot",
  },
  supabase: {
    name: "Supabase",
    blurb: "Backend-as-a-service: Postgres, auth, storage, and realtime APIs without writing a server.",
    url: "https://supabase.com",
  },

  // ---- Databases / storage ----
  postgres: {
    name: "PostgreSQL",
    blurb: "Powerful, reliable relational database — the sensible default.",
    url: "https://www.postgresql.org",
  },
  mysql: {
    name: "MySQL",
    blurb: "Popular, well-understood relational database.",
    url: "https://www.mysql.com",
  },
  sqlite: {
    name: "SQLite",
    blurb: "Zero-config embedded SQL database — perfect for small, local, or edge use.",
    url: "https://www.sqlite.org",
  },
  mongodb: {
    name: "MongoDB",
    blurb: "Flexible document database for evolving schemas.",
    url: "https://www.mongodb.com",
  },
  redis: {
    name: "Redis",
    blurb: "In-memory store for caching, sessions, queues, and rate limiting.",
    url: "https://redis.io",
  },
  "supabase-db": {
    name: "Supabase Postgres",
    blurb: "Managed Postgres with instant APIs, realtime, and row-level security.",
    url: "https://supabase.com/database",
  },
  planetscale: {
    name: "PlanetScale",
    blurb: "Serverless database platform (MySQL and Postgres) built to scale; no free tier.",
    url: "https://planetscale.com",
  },
  firebase: {
    name: "Firebase Firestore",
    blurb: "Realtime NoSQL with offline-first sync and generous client SDKs.",
    url: "https://firebase.google.com/products/firestore",
  },
  powersync: {
    name: "PowerSync",
    blurb: "Local-first SQLite on the device that syncs to your Postgres (e.g. Supabase) for true offline-first.",
    url: "https://www.powersync.com",
  },
  duckdb: {
    name: "DuckDB",
    blurb: "In-process analytical database — blazing fast on a single machine.",
    url: "https://duckdb.org",
  },
  warehouse: {
    name: "Cloud data warehouse",
    blurb: "BigQuery or Snowflake — query huge datasets with SQL.",
    url: "https://cloud.google.com/bigquery",
  },
  s3: {
    name: "Object storage (S3)",
    blurb: "Cheap, durable storage for raw data, lakes, and assets.",
    url: "https://aws.amazon.com/s3",
  },

  // ---- Auth ----
  "better-auth": {
    name: "Better Auth",
    blurb: "Comprehensive, framework-agnostic TypeScript auth you fully own and self-host — the modern default for new projects.",
    url: "https://www.better-auth.com",
  },
  authjs: {
    name: "Auth.js (NextAuth)",
    blurb: "Established open-source auth for Next.js; best when migrating an existing NextAuth app (now in maintenance mode).",
    url: "https://authjs.dev",
  },
  clerk: {
    name: "Clerk",
    blurb: "Drop-in auth and user-management UI — the fastest way to ship login.",
    url: "https://clerk.com",
  },
  "supabase-auth": {
    name: "Supabase Auth",
    blurb: "Auth tied to your Postgres with row-level security.",
    url: "https://supabase.com/auth",
  },
  "firebase-auth": {
    name: "Firebase Auth",
    blurb: "Easy multi-platform auth with social logins.",
    url: "https://firebase.google.com/products/auth",
  },
  auth0: {
    name: "Auth0",
    blurb: "Enterprise identity platform with SSO and compliance.",
    url: "https://auth0.com",
  },
  "custom-jwt": {
    name: "JWT / library auth",
    blurb: "Lightweight token auth handled inside your own service.",
    url: "https://jwt.io/introduction",
  },

  // ---- Hosting / deploy / distribution ----
  vercel: {
    name: "Vercel",
    blurb: "Zero-config hosting for Next.js and frontends — previews, edge, great DX.",
    url: "https://vercel.com",
  },
  netlify: {
    name: "Netlify",
    blurb: "Frontend hosting with serverless functions.",
    url: "https://www.netlify.com",
  },
  cloudflare: {
    name: "Cloudflare (Pages / Workers)",
    blurb: "Global edge hosting that's very cheap at scale.",
    url: "https://www.cloudflare.com",
  },
  railway: {
    name: "Railway",
    blurb: "Deploy your app and database together with minimal setup.",
    url: "https://railway.app",
  },
  render: {
    name: "Render",
    blurb: "Simple cloud for web services and databases.",
    url: "https://render.com",
  },
  fly: {
    name: "Fly.io",
    blurb: "Run containers close to your users worldwide.",
    url: "https://fly.io",
  },
  aws: {
    name: "AWS",
    blurb: "Maximum control and the widest service catalog — steeper ops.",
    url: "https://aws.amazon.com",
  },
  "expo-eas": {
    name: "Expo EAS",
    blurb: "Build and submit React Native / Expo apps to the App Store / Play Store, with over-the-air updates.",
    url: "https://expo.dev/eas",
  },
  codemagic: {
    name: "Codemagic",
    blurb: "Framework-agnostic mobile CI/CD — builds and ships Flutter, native, and React Native apps.",
    url: "https://codemagic.io",
  },
  fastlane: {
    name: "Fastlane",
    blurb: "Open-source automation for building, signing, and releasing iOS and Android apps.",
    url: "https://fastlane.tools",
  },
  colab: {
    name: "Google Colab",
    blurb: "Hosted notebooks with free GPUs for analysis and modeling.",
    url: "https://colab.research.google.com",
  },
  "hf-spaces": {
    name: "Hugging Face Spaces",
    blurb: "Host data apps and ML demos for free (GPUs available).",
    url: "https://huggingface.co/spaces",
  },
  "gh-releases": {
    name: "GitHub Releases",
    blurb: "Ship installers and prebuilt binaries (pairs well with Homebrew).",
    url: "https://docs.github.com/repositories/releasing-projects-on-github",
  },
  "app-stores": {
    name: "OS app stores",
    blurb: "Microsoft Store / Mac App Store distribution.",
    url: "https://developer.apple.com/app-store",
  },
  steam: {
    name: "Steam",
    blurb: "The dominant PC game distribution platform.",
    url: "https://partner.steamgames.com",
  },
  itch: {
    name: "itch.io",
    blurb: "Friendly, indie-first game distribution.",
    url: "https://itch.io",
  },

  // ---- Mobile frameworks ----
  expo: {
    name: "React Native (Expo)",
    blurb: "One TypeScript/React codebase for iOS and Android.",
    url: "https://expo.dev",
  },
  flutter: {
    name: "Flutter",
    blurb: "A single Dart codebase with native performance and fully custom UI.",
    url: "https://flutter.dev",
  },
  swiftui: {
    name: "SwiftUI",
    blurb: "Apple-native UI — the best possible iOS experience.",
    url: "https://developer.apple.com/xcode/swiftui",
  },
  compose: {
    name: "Jetpack Compose",
    blurb: "Modern native Android UI in Kotlin.",
    url: "https://developer.android.com/compose",
  },

  // ---- Game engines / services ----
  unity: {
    name: "Unity",
    blurb: "Versatile 2D/3D engine with a huge ecosystem (C#).",
    url: "https://unity.com",
  },
  unreal: {
    name: "Unreal Engine",
    blurb: "AAA-grade 3D engine with stunning visuals (C++ / Blueprints).",
    url: "https://www.unrealengine.com",
  },
  godot: {
    name: "Godot",
    blurb: "Free, open-source, lightweight 2D/3D engine.",
    url: "https://godotengine.org",
  },
  phaser: {
    name: "Phaser",
    blurb: "JS/TS framework for 2D games that run in the browser.",
    url: "https://phaser.io",
  },
  babylonjs: {
    name: "Babylon.js",
    blurb: "Full-featured 3D web game engine with built-in physics, audio, and scene tools.",
    url: "https://www.babylonjs.com",
  },
  threejs: {
    name: "Three.js",
    blurb: "The most popular 3D library for the web (WebGL/WebGPU); pair with a physics engine for games.",
    url: "https://threejs.org",
  },
  photon: {
    name: "Photon",
    blurb: "Real-time multiplayer networking and matchmaking.",
    url: "https://www.photonengine.com",
  },
  playfab: {
    name: "PlayFab",
    blurb: "Managed game backend — economy, leaderboards, and live ops.",
    url: "https://playfab.com",
  },

  // ---- Data / ML tools ----
  jupyter: {
    name: "Python + Jupyter / pandas",
    blurb: "Interactive exploration and analysis.",
    url: "https://jupyter.org",
  },
  pytorch: {
    name: "PyTorch",
    blurb: "The leading deep-learning framework for modeling.",
    url: "https://pytorch.org",
  },
  sklearn: {
    name: "scikit-learn",
    blurb: "Classic, reliable machine learning for tabular data.",
    url: "https://scikit-learn.org",
  },
  streamlit: {
    name: "Streamlit",
    blurb: "Turn a Python script into a shareable data app in minutes.",
    url: "https://streamlit.io",
  },
  spark: {
    name: "Apache Spark",
    blurb: "Distributed processing for big data.",
    url: "https://spark.apache.org",
  },
  dbt: {
    name: "dbt",
    blurb: "Transform data in SQL with software-engineering rigor.",
    url: "https://www.getdbt.com",
  },

  // ---- AI / LLM ----
  "ai-sdk": {
    name: "Vercel AI SDK",
    blurb: "Unified TypeScript toolkit for LLMs — streaming, tool calling, structured output, and agents.",
    url: "https://ai-sdk.dev",
  },
  "ai-gateway": {
    name: "Vercel AI Gateway",
    blurb: "One API across many model providers, with automatic fallbacks, observability, and zero data retention.",
    url: "https://vercel.com/docs/ai-gateway",
  },
  claude: {
    name: "Claude API (Anthropic)",
    blurb: "Frontier models (Opus, Sonnet, Haiku) with strong reasoning, tool use, and long context.",
    url: "https://docs.anthropic.com",
  },
  langchain: {
    name: "LangChain",
    blurb: "Popular framework for chaining LLM calls, tools, and memory (Python & JS).",
    url: "https://www.langchain.com",
  },
  llamaindex: {
    name: "LlamaIndex",
    blurb: "Data framework purpose-built for RAG — ingestion, indexing, and retrieval over your documents.",
    url: "https://www.llamaindex.ai",
  },
  langgraph: {
    name: "LangGraph",
    blurb: "Graph-based orchestration for stateful, multi-step agents.",
    url: "https://www.langchain.com/langgraph",
  },
  ollama: {
    name: "Ollama",
    blurb: "Run open-weight models (Llama, Mistral, Qwen) locally behind a simple API.",
    url: "https://ollama.com",
  },
  pgvector: {
    name: "pgvector",
    blurb: "Vector similarity search inside PostgreSQL — no separate database to run.",
    url: "https://github.com/pgvector/pgvector",
  },
  pinecone: {
    name: "Pinecone",
    blurb: "Managed, scalable vector database for production RAG.",
    url: "https://www.pinecone.io",
  },
  chroma: {
    name: "Chroma",
    blurb: "Lightweight open-source vector store — great for local dev and prototypes.",
    url: "https://www.trychroma.com",
  },
  weaviate: {
    name: "Weaviate",
    blurb: "Open-source vector database with hybrid search and built-in modules.",
    url: "https://weaviate.io",
  },
  "none-vector": {
    name: "No vector store yet",
    blurb: "Skip retrieval for now — add a vector store when you actually need RAG.",
    url: "https://en.wikipedia.org/wiki/Vector_database",
  },

  // ---- Desktop frameworks ----
  tauri: {
    name: "Tauri",
    blurb: "Tiny, secure desktop apps with a web UI and a Rust core.",
    url: "https://tauri.app",
  },
  electron: {
    name: "Electron",
    blurb: "Desktop apps with web tech — mature and widely used (heavier).",
    url: "https://www.electronjs.org",
  },
  maui: {
    name: ".NET MAUI",
    blurb: "C# cross-platform native desktop and mobile apps.",
    url: "https://learn.microsoft.com/dotnet/maui",
  },
  qt: {
    name: "Qt",
    blurb: "Mature C++ framework for native cross-platform apps.",
    url: "https://www.qt.io",
  },

  // ---- CLI ----
  "node-cli": {
    name: "Node + Commander / oclif",
    blurb: "TypeScript CLIs distributed via npm.",
    url: "https://github.com/tj/commander.js",
  },
  typer: {
    name: "Python + Typer",
    blurb: "Ergonomic, modern Python CLIs.",
    url: "https://typer.tiangolo.com",
  },
  cobra: {
    name: "Go + Cobra",
    blurb: "Single-binary CLIs — the toolkit behind kubectl and gh.",
    url: "https://cobra.dev",
  },
  clap: {
    name: "Rust + clap",
    blurb: "Fast, robust single-binary CLIs.",
    url: "https://docs.rs/clap",
  },
  "npm-dist": {
    name: "npm / npx",
    blurb: "Install and run via the Node package manager.",
    url: "https://docs.npmjs.com/cli/commands/npx",
  },
  pypi: {
    name: "PyPI / pipx",
    blurb: "Python package distribution and isolated installs.",
    url: "https://pypa.github.io/pipx",
  },

  // ---- Misc ----
  "none-cache": {
    name: "Skip caching for now",
    blurb: "Add a cache layer later, once you can measure a real need.",
    url: "https://en.wikipedia.org/wiki/Cache_(computing)",
  },
  kafka: {
    name: "Apache Kafka",
    blurb: "Durable event streaming at scale.",
    url: "https://kafka.apache.org",
  },
};
