import { useEffect, useState } from "react";

/**
 * Cycles through short strings with a typewriter + delete animation.
 */
export default function TypewriterLine({
  phrases,
  className = "",
  typingMs = 42,
  deletingMs = 32,
  pauseAfterTypeMs = 2400,
  pauseBeforeNextMs = 380,
}) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleLen, setVisibleLen] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | pause | deleting | between

  const full = phrases.length ? phrases[phraseIndex % phrases.length] : "";

  useEffect(() => {
    if (!phrases.length || !full.length) return undefined;

    let t;
    if (phase === "typing") {
      if (visibleLen < full.length) {
        t = setTimeout(() => setVisibleLen((n) => n + 1), typingMs);
      } else {
        t = setTimeout(() => setPhase("pause"), 0);
      }
    } else if (phase === "pause") {
      t = setTimeout(() => setPhase("deleting"), pauseAfterTypeMs);
    } else if (phase === "deleting") {
      if (visibleLen > 0) {
        t = setTimeout(() => setVisibleLen((n) => n - 1), deletingMs);
      } else {
        t = setTimeout(() => setPhase("between"), 0);
      }
    } else if (phase === "between") {
      t = setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
      }, pauseBeforeNextMs);
    }

    return () => clearTimeout(t);
  }, [
    phase,
    visibleLen,
    full,
    phrases.length,
    typingMs,
    deletingMs,
    pauseAfterTypeMs,
    pauseBeforeNextMs,
  ]);

  const shown = full.slice(0, visibleLen);

  return (
    <span className={className} aria-hidden="true">
      <span className="dash-typewriter-text">{shown}</span>
      <span className="dash-typewriter-cursor" />
    </span>
  );
}
