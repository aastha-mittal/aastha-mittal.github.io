import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STOP = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "it",
  "this",
  "that",
  "these",
  "those",
  "from",
  "as",
  "we",
  "you",
  "i",
  "my",
  "our",
  "their",
  "has",
  "have",
  "had",
  "not",
  "no",
  "so",
  "if",
  "then",
  "than",
  "into",
  "about",
  "your",
]);

function sentencesFromText(raw) {
  return raw
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12);
}

function pickKeyword(sentence) {
  const words = sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  if (words.length === 0) return "this idea";
  const freq = {};
  words.forEach((w) => {
    freq[w] = (freq[w] || 0) + 1;
  });
  let best = words[0];
  let bestRank = -1;
  for (const w of words) {
    const rank = freq[w] * 10 + Math.min(w.length, 12);
    if (rank > bestRank) {
      bestRank = rank;
      best = w;
    }
  }
  return best;
}

function buildCards(text) {
  const sents = sentencesFromText(text);
  const cards = [];
  const seen = new Set();
  for (const s of sents) {
    if (cards.length >= 12) break;
    const kw = pickKeyword(s);
    const key = `${kw}:${s.slice(0, 40)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const pretty = kw.charAt(0).toUpperCase() + kw.slice(1);
    cards.push({
      id: cards.length,
      front: `What’s the gist around “${pretty}”?`,
      back: s,
    });
  }
  if (cards.length === 0 && text.trim().length > 0) {
    cards.push({
      id: 0,
      front: "What’s one thing you want to remember?",
      back: text.trim().slice(0, 400),
    });
  }
  return cards;
}

export default function StudySproutDemo() {
  const [raw, setRaw] = useState(
    "Gradient descent nudges weights using the loss surface. Regularization keeps models from memorizing noise. Attention lets models focus on different parts of the input sequence.",
  );
  const [flipped, setFlipped] = useState({});

  const cards = useMemo(() => buildCards(raw), [raw]);

  return (
    <div className="play-sprout">
      <p className="play-sprout-intro">
        <strong>SproutCards</strong> is a tiny study helper: paste messy notes, get gentle flashcards — all locally in your browser. No
        accounts, no model API — just heuristics that pick a keyword per sentence and turn it into a recall prompt. Cute on purpose; serious
        enough to actually review before an exam.
      </p>
      <label className="play-sprout-label" htmlFor="sprout-in">
        Your notes
      </label>
      <textarea
        id="sprout-in"
        className="play-sprout-textarea"
        rows={5}
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder="Paste a paragraph from lecture notes, a README, or anything you’re trying to remember…"
      />
      <p className="play-sprout-hint">
        {cards.length} card{cards.length === 1 ? "" : "s"} sprouted — tap a card to flip.
      </p>
      <div className="play-sprout-grid">
        <AnimatePresence mode="popLayout">
          {cards.map((c) => (
            <motion.button
              key={c.id}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`play-sprout-card ${flipped[c.id] ? "flipped" : ""}`}
              onClick={() => setFlipped((f) => ({ ...f, [c.id]: !f[c.id] }))}
            >
              <span className="play-sprout-emoji" aria-hidden>
                🌱
              </span>
              <span className="play-sprout-card-inner">
                {flipped[c.id] ? <span className="play-sprout-back">{c.back}</span> : <span className="play-sprout-front">{c.front}</span>}
              </span>
              <span className="play-sprout-tap">tap to flip</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
