export type CategoryId =
  | "web"
  | "mobile"
  | "data"
  | "ai"
  | "desktop"
  | "game"
  | "backend"
  | "cli";

/** Map of questionId -> selected optionId */
export type Answers = Record<string, string>;

export interface Tech {
  name: string;
  blurb: string;
  url: string;
}

/** Extra reference content for a technology (generated, keyed by catalog id). */
export interface TechDetail {
  pros: string[];
  cons: string[];
  /** A single canonical shell command to start using it; "" if not applicable. */
  getStarted: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  hint?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  /** "all" => shown for every category, otherwise the list of categories it applies to */
  appliesTo: CategoryId[] | "all";
  options: QuestionOption[];
}

/** A condition over the user's answers. */
export type Predicate = (a: Answers) => boolean;

export interface Boost {
  when: Predicate;
  score: number;
  /** Shown to the user when this boost fires (only positive boosts are surfaced). */
  reason: string;
}

export interface Candidate {
  /** key into the catalog */
  tech: string;
  base: number;
  boosts?: Boost[];
}

export interface LayerSpec {
  /** stable key */
  key: string;
  /** human label, e.g. "Frontend framework" */
  label: string;
  candidates: Candidate[];
}

export interface CategorySpec {
  id: CategoryId;
  label: string;
  tagline: string;
  emoji: string;
  layers: LayerSpec[];
}

export interface RankedTech {
  name: string;
  url: string;
  score: number;
}

export interface LayerRecommendation {
  layer: string;
  /** stable layer key, useful for anchors/keys */
  key: string;
  primary: {
    name: string;
    blurb: string;
    url: string;
    reasons: string[];
    pros: string[];
    cons: string[];
    getStarted: string;
    score: number;
  };
  /** up to two runner-up technologies worth considering */
  alternatives: { name: string; url: string }[];
  /** every candidate with its computed score, highest first (transparency) */
  ranked: RankedTech[];
}

export interface Recommendation {
  categoryId: CategoryId;
  categoryLabel: string;
  layers: LayerRecommendation[];
  /** ["Frontend framework: Next.js", ...] for quick copy/summary */
  summary: { layer: string; tech: string }[];
}
