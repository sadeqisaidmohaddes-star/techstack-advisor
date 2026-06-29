import type { Answers, CategoryId } from "./types";

export interface ShareState {
  category: CategoryId;
  answers: Answers;
}

/** Base64url-encode a JSON string (works in browser and Node). */
function toBase64Url(input: string): string {
  const b64 =
    typeof btoa === "function"
      ? btoa(unescape(encodeURIComponent(input)))
      : Buffer.from(input, "utf-8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  if (typeof atob === "function") {
    return decodeURIComponent(escape(atob(b64)));
  }
  return Buffer.from(b64, "base64").toString("utf-8");
}

/** Encode the quiz state into a compact, URL-safe token. */
export function encodeState(state: ShareState): string {
  return toBase64Url(JSON.stringify({ c: state.category, a: state.answers }));
}

/** Decode a token back into quiz state, or null if it's malformed. */
export function decodeState(token: string): ShareState | null {
  try {
    const parsed = JSON.parse(fromBase64Url(token));
    if (!parsed || typeof parsed.c !== "string" || typeof parsed.a !== "object") {
      return null;
    }
    return { category: parsed.c as CategoryId, answers: parsed.a as Answers };
  } catch {
    return null;
  }
}
