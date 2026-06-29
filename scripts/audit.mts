/**
 * Exhaustive deterministic audit of the recommendation engine.
 * Runs every relevant answer combination through every category and checks
 * invariants. Run with: npx --yes tsx scripts/audit.mts
 */
import { CATALOG } from "../lib/catalog";
import { CATEGORIES, QUESTIONS } from "../lib/questions";
import { recommend } from "../lib/engine";
import type { Answers, CategoryId } from "../lib/types";

let problems = 0;
const fail = (msg: string) => {
  problems++;
  console.log("  ✗ " + msg);
};

/* ---- Static check: every candidate tech id exists in the catalog ---- */
console.log("\n[1] Static: candidate ids exist in CATALOG");
for (const cat of CATEGORIES) {
  for (const layer of cat.layers) {
    for (const cand of layer.candidates) {
      if (!CATALOG[cand.tech]) {
        fail(`${cat.id}/${layer.label}: candidate "${cand.tech}" missing from CATALOG`);
      }
    }
  }
}
if (problems === 0) console.log("  ✓ all candidate ids resolve");

/* ---- Build the answer space for a category ---- */
function questionsFor(catId: CategoryId) {
  return QUESTIONS.filter((q) => q.appliesTo === "all" || q.appliesTo.includes(catId));
}

function* combos(catId: CategoryId): Generator<Answers> {
  const qs = questionsFor(catId);
  const idx = qs.map(() => 0);
  while (true) {
    const a: Answers = {};
    qs.forEach((q, i) => (a[q.id] = q.options[idx[i]].id));
    yield a;
    // increment odometer
    let k = qs.length - 1;
    while (k >= 0) {
      idx[k]++;
      if (idx[k] < qs[k].options.length) break;
      idx[k] = 0;
      k--;
    }
    if (k < 0) break;
  }
}

/* ---- Exhaustive run with per-combo invariants ---- */
console.log("\n[2] Exhaustive run: per-combo invariants");
const startProblems = problems;

// Track, per category+layer, which techs ever win and whether winners ever
// had a real (non-generic) reason.
const winners = new Map<string, Set<string>>(); // key cat/layer -> tech names
const everyReasonGeneric = new Map<string, boolean>(); // key cat/layer -> true until a real reason seen
const distinctStacks = new Map<CategoryId, Set<string>>();

const GENERIC = "A strong general-purpose choice for this layer";

let totalCombos = 0;
for (const cat of CATEGORIES) {
  distinctStacks.set(cat.id, new Set());
  for (const a of combos(cat.id)) {
    totalCombos++;
    let rec;
    try {
      rec = recommend(cat.id, a);
    } catch (e) {
      fail(`${cat.id}: recommend() threw for ${JSON.stringify(a)} -> ${String(e)}`);
      continue;
    }
    const stackKey = rec.summary.map((s) => s.tech).join(" | ");
    distinctStacks.get(cat.id)!.add(stackKey);

    for (const layer of rec.layers) {
      const key = `${cat.id} / ${layer.layer}`;
      if (!winners.has(key)) winners.set(key, new Set());
      winners.get(key)!.add(layer.primary.name);

      // primary must differ from every alternative
      for (const alt of layer.alternatives) {
        if (alt.name === layer.primary.name) {
          fail(`${key}: alternative equals primary (${layer.primary.name})`);
        }
      }
      // primary must have a name and at least one reason
      if (!layer.primary.name) fail(`${key}: empty primary name`);
      if (layer.primary.reasons.length === 0) fail(`${key}: no reasons`);

      const hasReal = layer.primary.reasons.some((r) => r !== GENERIC);
      if (!everyReasonGeneric.has(key)) everyReasonGeneric.set(key, true);
      if (hasReal) everyReasonGeneric.set(key, false);
    }
  }
}
console.log(`  ran ${totalCombos} combinations`);
if (problems === startProblems) console.log("  ✓ no per-combo invariant violations");

/* ---- Report: layers whose winner reason is ALWAYS generic ---- */
console.log("\n[3] Warning: layers where the winner never has a specific reason");
let genericLayers = 0;
for (const [key, alwaysGeneric] of everyReasonGeneric) {
  if (alwaysGeneric) {
    genericLayers++;
    console.log(`  • ${key} (winner always shows the generic reason)`);
  }
}
if (genericLayers === 0) console.log("  ✓ none");

/* ---- Report: candidates that can NEVER win their layer ---- */
console.log("\n[4] Info: candidates that never win in any combination");
let neverWin = 0;
for (const cat of CATEGORIES) {
  for (const layer of cat.layers) {
    const key = `${cat.id} / ${layer.label}`;
    const won = winners.get(key) ?? new Set();
    for (const cand of layer.candidates) {
      const name = CATALOG[cand.tech]?.name;
      if (name && !won.has(name)) {
        neverWin++;
        console.log(`  • ${key}: "${name}" never wins (only offered as alternative at best)`);
      }
    }
  }
}
if (neverWin === 0) console.log("  ✓ every candidate wins for some input");

/* ---- Report: does the recommendation actually vary per category? ---- */
console.log("\n[5] Info: distinct stacks produced per category");
for (const cat of CATEGORIES) {
  console.log(`  • ${cat.id}: ${distinctStacks.get(cat.id)!.size} distinct stacks`);
}

/* ---- Targeted scenario assertions (the issues fixed after review) ---- */
console.log("\n[6] Targeted scenarios");
const base = { experience: "jsts", scale: "growth", team: "small", priority: "speed", budget: "min" };
function pick(catId: CategoryId, a: Answers, layerLabel: string) {
  const rec = recommend(catId, a);
  return rec.layers.find((l) => l.layer === layerLabel)?.primary.name;
}
function expect(label: string, got: string | undefined, want: string) {
  if (got === want) console.log(`  ✓ ${label} -> ${got}`);
  else fail(`${label}: expected "${want}", got "${got}"`);
}
// 3D web game must NOT be Phaser (2D-only)
expect(
  "game web+3d engine",
  pick("game", { ...base, gameDim: "3d", gamePlatform: "web" }, "Engine"),
  "Babylon.js",
);
// 2D web game stays Phaser
expect(
  "game web+2d engine",
  pick("game", { ...base, gameDim: "2d", gamePlatform: "web" }, "Engine"),
  "Phaser",
);
// Flutter (cross + performance) build must not be Expo EAS
expect(
  "mobile flutter build",
  pick("mobile", { ...base, platforms: "cross", priority: "performance", mobileOffline: "no" }, "Build & distribution"),
  "Codemagic",
);
// Cross + RN (not performance) build is Expo EAS
expect(
  "mobile expo build",
  pick("mobile", { ...base, platforms: "cross", mobileOffline: "no" }, "Build & distribution"),
  "Expo EAS",
);
// Native build must not be Expo EAS
expect(
  "mobile native build",
  pick("mobile", { ...base, platforms: "native", mobileOffline: "no" }, "Build & distribution"),
  "Codemagic",
);
// Web auth default for a JS/TS team is Better Auth, not Auth.js
expect(
  "web auth default",
  pick("web", { ...base, webRender: "app", realtime: "no", priority: "scale" }, "Authentication"),
  "Better Auth",
);
// Offline-first mobile (not speed) gets a local-first sync engine
expect(
  "mobile offline-first db",
  pick("mobile", { ...base, platforms: "cross", mobileOffline: "yes", priority: "scale" }, "Database"),
  "PowerSync",
);

console.log("\n" + (problems === 0 ? "RESULT: ✓ no problems" : `RESULT: ✗ ${problems} problem(s)`));
process.exit(problems === 0 ? 0 : 1);
