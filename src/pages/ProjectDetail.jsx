import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getCaseStudy } from "../data/caseStudies";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "results", label: "Results" },
  { id: "decisions", label: "Design decisions" },
];

function ProseBlocks({ text }) {
  const blocks = text.split(/\n\n+/).map((s) => s.trim()).filter(Boolean);
  return (
    <div className="proj-prose-wrap">
      {blocks.map((para, i) => (
        <p key={i} className="proj-prose">
          {para}
        </p>
      ))}
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const study = useMemo(() => getCaseStudy(slug), [slug]);
  const [tab, setTab] = useState("overview");

  if (slug === "nationwide-platform") {
    return <Navigate to="../nationwide-2025" replace />;
  }

  if (!study) return <Navigate to="/projects" replace />;

  return (
    <div className="proj-detail">
      <Link to="/projects" className="proj-back">
        <ArrowLeft size={16} /> All projects
      </Link>
      <header className="proj-detail-head">
        <p className="proj-kicker">{study.period}</p>
        <h1 className="proj-detail-title">{study.title}</h1>
        <p className="proj-detail-sub">{study.subtitle}</p>
        <p className="proj-detail-role">{study.role}</p>
      </header>

      <div className="proj-detail-metrics">
        {study.metrics.map((m) => (
          <div key={m.label} className="proj-dm">
            <span className="proj-dm-label">{m.label}</span>
            <span className="proj-dm-value">
              {m.value}
              {m.unit && <span className="proj-dm-unit"> {m.unit}</span>}
            </span>
          </div>
        ))}
      </div>

      <div className="proj-tabs" role="tablist" aria-label="Case study sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`proj-tab ${tab === t.id ? "active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          role="tabpanel"
          className="proj-tab-panel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "overview" && (
            <div className="proj-prose">
              <p>
                <strong>One-liner:</strong> {study.subtitle}
              </p>
              <p>
                Use the tabs for problem framing, how the system was structured, measurable outcomes, and the explicit tradeoffs I&apos;d
                defend in a system-design interview.
              </p>
            </div>
          )}
          {tab === "problem" && <ProseBlocks text={study.problem} />}
          {tab === "architecture" && <ProseBlocks text={study.architecture} />}
          {tab === "results" && <ProseBlocks text={study.results} />}
          {tab === "decisions" && <ProseBlocks text={study.decisions} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
