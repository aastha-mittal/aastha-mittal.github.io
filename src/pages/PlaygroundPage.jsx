import { lazy, Suspense, useState } from "react";
import { FlaskConical, Sprout } from "lucide-react";

const RAGDemo = lazy(() => import("../playground/RAGDemo"));
const StudySproutDemo = lazy(() => import("../playground/StudySproutDemo"));

function Fallback() {
  return (
    <div className="play-fallback">
      <div className="play-fallback-spinner" />
      <p>Loading demo…</p>
    </div>
  );
}

export default function PlaygroundPage() {
  const [mode, setMode] = useState("rag");

  return (
    <div className="play-page">
      <header className="play-head">
        <p className="play-kicker">PLAYGROUND</p>
        <h1 className="play-title">Try the demos in your browser</h1>
        <p className="play-desc">
          <strong>RAG</strong> uses a small offline corpus and lexical scoring (no keys). <strong>SproutCards</strong> turns pasted notes into
          flip cards — same project as the case study — with simple, explainable heuristics.
        </p>
      </header>

      <div className="play-toggle" role="tablist" aria-label="Playground mode">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "rag"}
          className={`play-toggle-btn ${mode === "rag" ? "active" : ""}`}
          onClick={() => setMode("rag")}
        >
          <FlaskConical size={18} />
          RAG retrieval
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "sprout"}
          className={`play-toggle-btn ${mode === "sprout" ? "active" : ""}`}
          onClick={() => setMode("sprout")}
        >
          <Sprout size={18} />
          SproutCards
        </button>
      </div>

      <div className="play-panel">
        <Suspense fallback={<Fallback />}>
          {mode === "rag" && <RAGDemo />}
          {mode === "sprout" && <StudySproutDemo />}
        </Suspense>
      </div>
    </div>
  );
}
