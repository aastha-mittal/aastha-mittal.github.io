import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "../data/caseStudies";

export default function ProjectsPage() {
  return (
    <div className="proj-page">
      <header className="proj-head">
        <p className="proj-kicker">CASE STUDIES</p>
        <h1 className="proj-title">Projects — interactive deep dives</h1>
        <p className="proj-desc">
          Each link opens a structured study: problem, architecture, results, and explicit <strong>design decisions</strong> — the same
          framing you&apos;d use in a strong hiring loop.
        </p>
      </header>
      <div className="proj-grid">
        {CASE_STUDIES.map((c, i) => (
          <motion.article
            key={c.slug}
            className="proj-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <div className="proj-card-top">
              <span className="proj-card-period">{c.period}</span>
              <span className="proj-card-role">{c.role}</span>
            </div>
            <h2 className="proj-card-title">{c.title}</h2>
            <p className="proj-card-sub">{c.subtitle}</p>
            <div className="proj-card-hero-metric">
              <span className="proj-hero-label">{c.heroMetric.label}</span>
              <span className="proj-hero-value">{c.heroMetric.value}</span>
              {c.heroMetric.hint && <span className="proj-hero-hint">{c.heroMetric.hint}</span>}
            </div>
            <div className="proj-tags">
              {c.tags.map((t) => (
                <span key={t} className="proj-tag">
                  {t}
                </span>
              ))}
            </div>
            <Link to={`/projects/${c.slug}`} className="proj-card-link">
              Open case study <ArrowUpRight size={16} />
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
