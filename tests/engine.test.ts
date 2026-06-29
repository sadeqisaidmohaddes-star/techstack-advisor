import { test } from "node:test";
import assert from "node:assert/strict";
import { CATALOG } from "../lib/catalog";
import { CATEGORIES, QUESTIONS } from "../lib/questions";
import {
  recommend,
  recommendationToMarkdown,
  recommendationToText,
  scaffoldCommands,
} from "../lib/engine";
import { DETAILS } from "../lib/details";
import { decodeState, encodeState } from "../lib/share";
import type { Answers, CategoryId } from "../lib/types";

function firstAnswers(catId: CategoryId): Answers {
  const a: Answers = {};
  for (const q of QUESTIONS) {
    if (q.appliesTo === "all" || q.appliesTo.includes(catId)) {
      a[q.id] = q.options[0].id;
    }
  }
  return a;
}

const layerPick = (cat: CategoryId, a: Answers, layerLabel: string) =>
  recommend(cat, a).layers.find((l) => l.layer === layerLabel)?.primary.name;

test("every category produces a complete recommendation", () => {
  for (const cat of CATEGORIES) {
    const rec = recommend(cat.id, firstAnswers(cat.id));
    assert.ok(rec.layers.length > 0, `${cat.id} should have layers`);
    for (const layer of rec.layers) {
      assert.ok(layer.primary.name, `${cat.id}/${layer.layer} primary name`);
      assert.ok(layer.primary.reasons.length > 0, `${cat.id}/${layer.layer} reasons`);
      for (const alt of layer.alternatives) {
        assert.notEqual(alt.name, layer.primary.name, "alt must differ from primary");
      }
    }
  }
});

test("all candidate ids exist in the catalog", () => {
  for (const cat of CATEGORIES) {
    for (const layer of cat.layers) {
      for (const c of layer.candidates) {
        assert.ok(CATALOG[c.tech], `missing catalog entry: ${c.tech}`);
      }
    }
  }
});

test("every catalog tech has reference details", () => {
  for (const id of Object.keys(CATALOG)) {
    assert.ok(DETAILS[id], `missing details: ${id}`);
    assert.ok(DETAILS[id].pros.length >= 1, `pros for ${id}`);
    assert.ok(DETAILS[id].cons.length >= 1, `cons for ${id}`);
  }
});

test("known scenarios resolve correctly", () => {
  const base: Answers = {
    experience: "jsts",
    scale: "growth",
    team: "small",
    priority: "speed",
    budget: "min",
  };
  assert.equal(
    layerPick("game", { ...base, gameDim: "3d", gamePlatform: "web" }, "Engine"),
    "Babylon.js",
  );
  assert.equal(
    layerPick("web", { ...base, webRender: "app", realtime: "no", priority: "scale" }, "Authentication"),
    "Better Auth",
  );
  assert.equal(
    layerPick(
      "ai",
      { ...base, experience: "python", aiKind: "rag", aiHost: "hosted", aiData: "yes" },
      "AI framework",
    ),
    "LlamaIndex",
  );
  assert.equal(
    layerPick("ai", { ...base, aiKind: "agents", aiHost: "self", aiData: "no" }, "Model access"),
    "Ollama",
  );
});

test("text and markdown exports include every pick", () => {
  const rec = recommend("web", firstAnswers("web"));
  const txt = recommendationToText(rec);
  const md = recommendationToMarkdown(rec);
  assert.match(txt, /Recommended stack/);
  assert.match(md, /Recommended stack/);
  for (const s of rec.summary) {
    assert.ok(md.includes(s.tech), `markdown should mention ${s.tech}`);
  }
});

test("scaffold returns getting-started commands", () => {
  const rec = recommend("web", firstAnswers("web"));
  assert.ok(scaffoldCommands(rec).length > 0);
});

test("share state round-trips and rejects garbage", () => {
  const state = { category: "ai" as CategoryId, answers: { aiKind: "agents", scale: "growth" } };
  assert.deepEqual(decodeState(encodeState(state)), state);
  assert.equal(decodeState("@@@not-valid@@@"), null);
});
