import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RAG_CORPUS } from "../data/ragCorpus";

const STOP = new Set(["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by", "is", "are", "was", "were", "be", "been", "it", "this", "that", "from", "as", "we", "you"]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

function buildIdf(docs) {
  const df = {};
  const N = docs.length;
  docs.forEach((d) => {
    const seen = new Set(tokenize(d.title + " " + d.text));
    seen.forEach((w) => {
      df[w] = (df[w] || 0) + 1;
    });
  });
  const idf = {};
  Object.keys(df).forEach((w) => {
    idf[w] = Math.log(1 + N / (1 + df[w]));
  });
  return idf;
}

function scoreDoc(queryTokens, doc, idf) {
  const words = tokenize(doc.title + " " + doc.text);
  const tf = {};
  words.forEach((w) => {
    tf[w] = (tf[w] || 0) + 1;
  });
  let s = 0;
  queryTokens.forEach((q) => {
    if (tf[q] && idf[q]) s += tf[q] * idf[q];
  });
  return s;
}

function retrieve(query, corpus, topK = 3) {
  const qTok = tokenize(query);
  if (qTok.length === 0) return [];
  const idf = buildIdf(corpus);
  const scored = corpus
    .map((d) => ({ doc: d, score: scoreDoc(qTok, d, idf) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
  return scored;
}

function synthesizeAnswer(query, chunks) {
  if (chunks.length === 0) {
    return "No strong matches in the demo corpus — try terms like Kafka, RAG, Nationwide, FitForm, or teaching.";
  }
  const body = chunks
    .map((c, i) => `(${i + 1}) ${c.title}\n${c.text.slice(0, 220)}${c.text.length > 220 ? "…" : ""}`)
    .join("\n\n");
  return `Summary (demo)\n\nQuestion: “${query.trim()}”\n\n${body}\n\n---\nThis playground runs fully in your browser (no API keys). Scoring is lexical / TF-style, not neural embeddings.`;
}

const STEPS = ["embed_query", "retrieve", "fuse", "generate"];

export default function RAGDemo() {
  const [q, setQ] = useState("How does Kafka help with document pipelines?");
  const [phase, setPhase] = useState("idle");
  const [stepIdx, setStepIdx] = useState(-1);
  const [results, setResults] = useState([]);
  const [answer, setAnswer] = useState("");

  const run = async () => {
    setPhase("running");
    setStepIdx(0);
    setAnswer("");
    setResults([]);
    for (let i = 0; i < STEPS.length; i++) {
      setStepIdx(i);
      await new Promise((r) => setTimeout(r, 420 + Math.random() * 200));
    }
    const top = retrieve(q, RAG_CORPUS, 3).map((x) => x.doc);
    setResults(top);
    setAnswer(synthesizeAnswer(q, top));
    setPhase("done");
    setStepIdx(STEPS.length);
  };

  const stepLabel = useMemo(() => {
    if (stepIdx < 0) return "Idle";
    if (stepIdx >= STEPS.length) return "Complete";
    const labels = ["Embedding query (demo hash)", "Retrieving top-k passages", "Fusing context window", "Generating grounded answer"];
    return labels[stepIdx] ?? "";
  }, [stepIdx]);

  return (
    <div className="play-rag">
      <p className="play-rag-intro">
        Ask a question about Aastha&apos;s work (Kafka, RAG, insurance scale, FitForm, teaching…). The pipeline below is simulated in-browser:
        lexical retrieval over a fixed corpus, then a templated &quot;answer&quot; — useful to show how RAG <em>feels</em>, not to replace production
        embeddings.
      </p>
      <div className="play-rag-input">
        <label htmlFor="rag-q">Question</label>
        <textarea
          id="rag-q"
          rows={3}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. What tradeoffs matter for RAG evaluation?"
        />
        <button type="button" className="play-btn play-btn-primary" onClick={run} disabled={phase === "running"}>
          {phase === "running" ? "Running pipeline…" : "Run retrieval + answer"}
        </button>
      </div>

      <div className="play-pipeline" aria-live="polite">
        <div className="play-pipeline-title">Pipeline</div>
        <div className="play-pipeline-steps">
          {STEPS.map((s, i) => (
            <motion.div
              key={s}
              className={`play-step ${stepIdx > i ? "done" : ""} ${stepIdx === i ? "active" : ""}`}
              initial={false}
              animate={{ opacity: stepIdx >= i ? 1 : 0.35 }}
            >
              <span className="play-step-idx">{i + 1}</span>
              <span className="play-step-name">{s.replace(/_/g, " ")}</span>
            </motion.div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {phase === "running" && (
            <motion.p key="status" className="play-status" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {stepLabel}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="play-rag-results">
        <h3>Retrieved passages</h3>
        {results.length === 0 && phase !== "running" && <p className="play-muted">Run a query to see top chunks.</p>}
        <ul className="play-chunk-list">
          {results.map((doc) => (
            <li key={doc.id} className="play-chunk">
              <strong>{doc.title}</strong>
              <p>{doc.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="play-rag-answer">
        <h3>Grounded answer (demo)</h3>
        <pre className="play-answer-pre">{answer || "—"}</pre>
      </div>
    </div>
  );
}
