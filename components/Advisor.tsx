"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CATEGORIES_META, QUESTIONS } from "@/lib/questions";
import {
  recommend,
  recommendationToText,
  recommendationToMarkdown,
  scaffoldCommands,
} from "@/lib/engine";
import { decodeState, encodeState } from "@/lib/share";
import type { Answers, CategoryId, Question } from "@/lib/types";

type Phase = "intro" | "quiz" | "result";
type Theme = "dark" | "light";

function questionsFor(category: CategoryId | null): Question[] {
  if (!category) return [];
  return QUESTIONS.filter(
    (q) => q.appliesTo === "all" || q.appliesTo.includes(category),
  );
}

export default function Advisor() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");

  const questions = useMemo(() => questionsFor(category), [category]);

  const recommendation = useMemo(() => {
    if (phase !== "result" || !category) return null;
    return recommend(category, answers);
  }, [phase, category, answers]);

  /* ---- Theme: load + persist ---- */
  useEffect(() => {
    const saved = localStorage.getItem("tsa-theme");
    const initial: Theme =
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia?.("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    setTheme(initial);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("tsa-theme", theme);
  }, [theme]);

  /* ---- Restore state from a shared URL on first load ---- */
  useEffect(() => {
    const m = window.location.hash.match(/[#&]s=([^&]+)/);
    if (!m) return;
    const decoded = decodeState(m[1]);
    if (!decoded || !CATEGORIES_META.some((c) => c.id === decoded.category)) return;
    const qs = questionsFor(decoded.category);
    setCategory(decoded.category);
    setAnswers(decoded.answers);
    if (qs.every((q) => decoded.answers[q.id])) {
      setPhase("result");
    } else {
      const firstUnanswered = qs.findIndex((q) => !decoded.answers[q.id]);
      setStep(firstUnanswered < 0 ? 0 : firstUnanswered);
      setPhase("quiz");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Keep the URL in sync once we have a result ---- */
  useEffect(() => {
    if (phase === "result" && category) {
      const token = encodeState({ category, answers });
      window.history.replaceState(null, "", `#s=${token}`);
    }
  }, [phase, category, answers]);

  const startCategory = useCallback((id: CategoryId) => {
    setCategory(id);
    setAnswers({});
    setStep(0);
    setPhase("quiz");
  }, []);

  const choose = useCallback(
    (questionId: string, optionId: string) => {
      const qs = questionsFor(category);
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
      if (step < qs.length - 1) setStep(step + 1);
      else setPhase("result");
    },
    [category, step],
  );

  const back = useCallback(() => {
    if (phase === "result") {
      setPhase("quiz");
      setStep(Math.max(0, questionsFor(category).length - 1));
      return;
    }
    if (step === 0) {
      setPhase("intro");
      setCategory(null);
      return;
    }
    setStep(step - 1);
  }, [phase, step, category]);

  const restart = useCallback(() => {
    setPhase("intro");
    setCategory(null);
    setAnswers({});
    setStep(0);
    setCopiedKey(null);
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  const jumpTo = useCallback((index: number) => {
    setPhase("quiz");
    setStep(index);
  }, []);

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  }, []);

  /* ---- Keyboard navigation during the quiz ---- */
  useEffect(() => {
    if (phase !== "quiz") return;
    const q = questions[step];
    if (!q) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Backspace") {
        e.preventDefault();
        back();
        return;
      }
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= q!.options.length) {
        choose(q!.id, q!.options[n - 1].id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, step, questions, choose, back]);

  return (
    <main className="shell">
      <header className="topbar">
        <button className="brand" onClick={restart} aria-label="TechStack Advisor home">
          <span className="brand-mark">⚙︎</span>
          <span className="brand-name">TechStack Advisor</span>
        </button>
        <div className="topbar-actions">
          <button
            className="ghost icon-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title="Toggle theme"
          >
            {theme === "dark" ? "☀︎" : "☾"}
          </button>
          {phase !== "intro" && (
            <button className="ghost" onClick={restart}>
              Start over
            </button>
          )}
        </div>
      </header>

      {phase === "intro" && <Intro onPick={startCategory} />}

      {phase === "quiz" && questions[step] && (
        <Quiz
          total={questions.length}
          step={step}
          question={questions[step]}
          selected={answers[questions[step].id]}
          onChoose={choose}
          onBack={back}
        />
      )}

      {phase === "result" && recommendation && category && (
        <Result
          rec={recommendation}
          category={category}
          answers={answers}
          copiedKey={copiedKey}
          onCopy={copy}
          onBack={back}
          onRestart={restart}
          onJump={jumpTo}
        />
      )}

      <footer className="footnote">
        Recommendations are a starting point, not gospel — your context always wins.
      </footer>
    </main>
  );
}

/* ------------------------------- Intro ------------------------------- */

function Intro({ onPick }: { onPick: (id: CategoryId) => void }) {
  return (
    <section className="intro">
      <div className="hero">
        <p className="eyebrow">Pick a starting point</p>
        <h1>
          Find the right <span className="grad">tech stack</span> for what
          you&apos;re building.
        </h1>
        <p className="lede">
          Answer a handful of questions about your project and constraints.
          We&apos;ll recommend a complete, opinionated stack — explaining every
          choice, with strengths, trade-offs, and a command to get started.
        </p>
      </div>

      <div className="cat-grid">
        {CATEGORIES_META.map((c) => (
          <button key={c.id} className="cat-card" onClick={() => onPick(c.id)}>
            <span className="cat-emoji" aria-hidden>
              {c.emoji}
            </span>
            <span className="cat-label">{c.label}</span>
            <span className="cat-tag">{c.tagline}</span>
          </button>
        ))}
      </div>

      <p className="methodology">
        100% rule-based and offline — no AI call, no API key. Every pick comes
        from a transparent scoring engine you can read and tweak.
      </p>
    </section>
  );
}

/* -------------------------------- Quiz ------------------------------- */

function Quiz({
  total,
  step,
  question,
  selected,
  onChoose,
  onBack,
}: {
  total: number;
  step: number;
  question: Question;
  selected?: string;
  onChoose: (qid: string, oid: string) => void;
  onBack: () => void;
}) {
  const progress = Math.round((step / total) * 100);

  return (
    <section className="quiz">
      <div className="progress-row">
        <button className="ghost back" onClick={onBack}>
          ← Back
        </button>
        <span className="counter">
          Question {step + 1} of {total}
        </span>
      </div>
      <div className="progress" aria-hidden>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="q-head">
        <h2>{question.title}</h2>
        {question.subtitle && <p className="q-sub">{question.subtitle}</p>}
      </div>

      <div className="options">
        {question.options.map((opt, i) => (
          <button
            key={opt.id}
            className={`option ${selected === opt.id ? "selected" : ""}`}
            onClick={() => onChoose(question.id, opt.id)}
          >
            <span className="opt-num" aria-hidden>
              {i + 1}
            </span>
            <span className="opt-body">
              <span className="option-main">{opt.label}</span>
              {opt.hint && <span className="option-hint">{opt.hint}</span>}
            </span>
          </button>
        ))}
      </div>

      <p className="kbd-hint">
        Tip: press <kbd>1</kbd>–<kbd>{question.options.length}</kbd> to choose,{" "}
        <kbd>Backspace</kbd> to go back.
      </p>
    </section>
  );
}

/* ------------------------------- Result ------------------------------ */

function Result({
  rec,
  category,
  answers,
  copiedKey,
  onCopy,
  onBack,
  onRestart,
  onJump,
}: {
  rec: ReturnType<typeof recommend>;
  category: CategoryId;
  answers: Answers;
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
  onBack: () => void;
  onRestart: () => void;
  onJump: (index: number) => void;
}) {
  const qs = useMemo(() => questionsFor(category), [category]);
  const scaffold = useMemo(() => scaffoldCommands(rec), [rec]);

  function downloadMarkdown() {
    const md = recommendationToMarkdown(rec);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `techstack-${rec.categoryId}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="result">
      <div className="result-head">
        <p className="eyebrow">Your recommended stack</p>
        <h1>
          For your <span className="grad">{rec.categoryLabel.toLowerCase()}</span>
        </h1>
      </div>

      <div className="chips">
        {rec.summary.map((s) => (
          <span key={s.layer} className="chip">
            <span className="chip-layer">{s.layer}</span>
            <span className="chip-tech">{s.tech}</span>
          </span>
        ))}
      </div>

      <div className="result-actions">
        <button
          className="primary"
          onClick={() => onCopy(recommendationToText(rec), "stack")}
        >
          {copiedKey === "stack" ? "Copied ✓" : "Copy stack"}
        </button>
        <button
          className="ghost"
          onClick={() => onCopy(recommendationToMarkdown(rec), "md")}
        >
          {copiedKey === "md" ? "Copied ✓" : "Copy Markdown"}
        </button>
        <button className="ghost" onClick={downloadMarkdown}>
          Download .md
        </button>
        <button
          className="ghost"
          onClick={() => onCopy(window.location.href, "share")}
        >
          {copiedKey === "share" ? "Link copied ✓" : "Share link"}
        </button>
        <button className="ghost" onClick={onBack}>
          Edit answers
        </button>
        <button className="ghost" onClick={onRestart}>
          Start over
        </button>
      </div>

      {/* Answer review */}
      <details className="review">
        <summary>Your answers ({qs.length})</summary>
        <ul className="review-list">
          {qs.map((q, i) => {
            const opt = q.options.find((o) => o.id === answers[q.id]);
            return (
              <li key={q.id}>
                <span className="review-q">{q.title}</span>
                <span className="review-a">{opt?.label ?? "—"}</span>
                <button className="review-edit" onClick={() => onJump(i)}>
                  Change
                </button>
              </li>
            );
          })}
        </ul>
      </details>

      <div className="cards">
        {rec.layers.map((layer) => (
          <LayerCard key={layer.key} layer={layer} copiedKey={copiedKey} onCopy={onCopy} />
        ))}
      </div>

      {scaffold.length > 0 && (
        <div className="getstarted">
          <div className="getstarted-head">
            <h2>Getting started</h2>
            <button
              className="ghost"
              onClick={() =>
                onCopy(
                  scaffold.map((s) => `# ${s.name}\n${s.command}`).join("\n\n"),
                  "scaffold",
                )
              }
            >
              {copiedKey === "scaffold" ? "Copied ✓" : "Copy all"}
            </button>
          </div>
          <pre className="codeblock">
            <code>
              {scaffold.map((s) => (
                <span key={s.layer} className="code-line">
                  <span className="code-comment"># {s.name}</span>
                  {"\n"}
                  {s.command}
                  {"\n\n"}
                </span>
              ))}
            </code>
          </pre>
        </div>
      )}
    </section>
  );
}

/* ----------------------------- Layer card ---------------------------- */

function LayerCard({
  layer,
  copiedKey,
  onCopy,
}: {
  layer: ReturnType<typeof recommend>["layers"][number];
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}) {
  const { primary } = layer;
  const maxScore = Math.max(...layer.ranked.map((r) => r.score), 1);
  const cmdKey = `cmd:${layer.key}`;

  return (
    <article className="card">
      <p className="card-layer">{layer.layer}</p>
      <h3 className="card-tech">
        <a href={primary.url} target="_blank" rel="noreferrer">
          {primary.name} ↗
        </a>
      </h3>
      <p className="card-blurb">{primary.blurb}</p>

      <ul className="reasons">
        {primary.reasons.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      {primary.pros.length > 0 && (
        <p className="meta-line pros-line">
          <span className="meta-label">Strengths</span>
          {primary.pros.join(" · ")}
        </p>
      )}
      {primary.cons.length > 0 && (
        <p className="meta-line cons-line">
          <span className="meta-label">Watch-outs</span>
          {primary.cons.join(" · ")}
        </p>
      )}

      {primary.getStarted && (
        <div className="cmd">
          <code>{primary.getStarted}</code>
          <button
            className="cmd-copy"
            onClick={() => onCopy(primary.getStarted, cmdKey)}
            aria-label="Copy command"
          >
            {copiedKey === cmdKey ? "✓" : "Copy"}
          </button>
        </div>
      )}

      {layer.alternatives.length > 0 && (
        <p className="alt">
          Also consider{" "}
          {layer.alternatives.map((a, i) => (
            <span key={a.name}>
              {i > 0 && ", "}
              <a href={a.url} target="_blank" rel="noreferrer">
                {a.name}
              </a>
            </span>
          ))}
        </p>
      )}

      {layer.ranked.length > 2 && (
        <details className="scorecard">
          <summary>All options &amp; scores</summary>
          <ul className="score-list">
            {layer.ranked.map((r) => (
              <li key={r.name} className={r.name === primary.name ? "is-top" : ""}>
                <span className="score-name">{r.name}</span>
                <span className="score-bar" aria-hidden>
                  <span
                    className="score-fill"
                    style={{ width: `${Math.max(4, (r.score / maxScore) * 100)}%` }}
                  />
                </span>
                <span className="score-num">{r.score}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </article>
  );
}
