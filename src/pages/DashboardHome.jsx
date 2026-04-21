import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Radio, Server, Zap } from "lucide-react";
import { BASE, LINKS } from "../data/constants";
import TypewriterLine from "../components/TypewriterLine";

const HERO_TAGLINE_PHRASES = [
  "CMU · CS · Systems / ML",
  "Agentic AI · systems · reliability",
  "What ships · what stays up · what we measure",
];

const HERO_PHOTO_SOURCES = [
  `${BASE}AasthaPic.JPG`,
  `${BASE}aastha-pic.jpg`,
  `${BASE}aastha-pic.jpeg`,
  `${BASE}aastha-pic.png`,
  `${BASE}aastha-pic.webp`,
  `${BASE}aastha-pic.svg`,
];

function Sparkline() {
  const [pts, setPts] = useState(() => Array.from({ length: 24 }, () => 40 + Math.random() * 30));
  useEffect(() => {
    const id = setInterval(() => {
      setPts((prev) => [...prev.slice(1), 35 + Math.random() * 45]);
    }, 900);
    return () => clearInterval(id);
  }, []);
  const d = useMemo(() => {
    const w = 280;
    const h = 64;
    return pts
      .map((y, i) => {
        const x = (i / (pts.length - 1)) * w;
        const yy = h - (y / 100) * h;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${yy.toFixed(1)}`;
      })
      .join(" ");
  }, [pts]);
  return (
    <svg className="dash-spark" viewBox="0 0 280 64" aria-hidden>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(15,118,110,0.22)" />
          <stop offset="100%" stopColor="rgba(15,118,110,0)" />
        </linearGradient>
      </defs>
      <path d={`${d} L280,64 L0,64 Z`} fill="url(#sg)" />
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}

const SERVICES = [
  { id: "api", name: "api-gateway", status: "healthy", region: "us-east", icon: Server, detail: "REST + auth patterns" },
  { id: "doc", name: "document-ai", status: "active", region: "remote", icon: Zap, detail: "LLM + review workflows" },
  { id: "pipe", name: "ingest-pipeline", status: "streaming", region: "kafka", icon: Radio, detail: "async document load" },
];

const LOG_LINES = [
  "[metrics] batch_latency_p99=182ms",
  "[rag] retrieval_precision@3=0.84 (eval set)",
  "[deploy] jenkins #4824 → prod ✓",
  "[sproutcards] deck_generated cards=8 latency_ms=12",
];

export default function DashboardHome() {
  const [tick, setTick] = useState(0);
  const [logOffset, setLogOffset] = useState(0);
  const [photoSrcIndex, setPhotoSrcIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setLogOffset((o) => (o + 1) % LOG_LINES.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const uptime = useMemo(() => {
    const start = new Date("2023-06-01T12:00:00Z").getTime();
    const s = Math.floor((Date.now() - start) / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    return `${d}d ${h}h`;
  }, [tick]);

  return (
    <div className="dash">
      <section className="dash-hero">
        <motion.div className="dash-hero-inner" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="dash-hero-row">
            <div className="dash-hero-copy">
              <p className="dash-kicker">AT A GLANCE</p>
              <h1 className="dash-title">
                Aastha Mittal
                <span className="sr-only">
                  — CMU computer science; systems, machine learning, agentic AI, and reliability.
                </span>
                <TypewriterLine phrases={HERO_TAGLINE_PHRASES} className="dash-title-tag dash-typewriter" />
              </h1>
              <p className="dash-blurb">
                I&apos;m an ML/AI enthusiast, deep into agentic AI and where it meets systems. I care about what stays up under load, what ships, and
                what gets measured. This page is a playful control panel for that story: numbers tie back to real roles, and the{" "}
                <Link to="/playground">Playground</Link> has small demos you can actually run (retrieval over a tiny corpus, and SproutCards from
                notes). Wander into <Link to="/projects">projects</Link> when you want the long version.
              </p>
              <div className="dash-hero-cta">
                <Link to="/projects" className="dash-btn dash-btn-primary">
                  Case studies <ArrowRight size={16} />
                </Link>
                <Link to="/playground" className="dash-btn dash-btn-ghost">
                  Open playground
                </Link>
                <a href={LINKS.email} className="dash-btn dash-btn-ghost">
                  Email
                </a>
              </div>
            </div>
            <figure className="dash-hero-photo-wrap">
              <img
                className="dash-hero-photo"
                src={HERO_PHOTO_SOURCES[photoSrcIndex]}
                width={268}
                height={313}
                alt="Aastha Mittal"
                decoding="async"
                onError={() => {
                  setPhotoSrcIndex((i) => Math.min(i + 1, HERO_PHOTO_SOURCES.length - 1));
                }}
              />
            </figure>
          </div>
        </motion.div>
      </section>

      <section className="dash-grid">
        <div className="dash-card dash-card-wide">
          <h2 className="dash-card-title">Throughput &amp; reliability (resume-backed)</h2>
          <div className="dash-metrics">
            <div className="dash-metric">
              <span className="dash-metric-label">Req/day (peak service)</span>
              <motion.span className="dash-metric-value" key={tick} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }}>
                50K+
              </motion.span>
            </div>
            <div className="dash-metric">
              <span className="dash-metric-label">Uptime (stated)</span>
              <span className="dash-metric-value accent">99.2%</span>
            </div>
            <div className="dash-metric">
              <span className="dash-metric-label">Test coverage (typical areas)</span>
              <span className="dash-metric-value">90%+</span>
            </div>
            <div className="dash-metric">
              <span className="dash-metric-label">Portfolio uptime (fun)</span>
              <span className="dash-metric-value mono">{uptime}</span>
            </div>
          </div>
          <Sparkline />
          <p className="dash-card-foot">The sparkline is just for visual rhythm — the tile numbers come from my résumé and internships.</p>
        </div>

        <div className="dash-card">
          <h2 className="dash-card-title">Services (you)</h2>
          <ul className="dash-services">
            {SERVICES.map((s) => (
              <li key={s.id} className="dash-service">
                <s.icon size={18} className="dash-service-icon" aria-hidden />
                <div>
                  <div className="dash-service-name">
                    {s.name}{" "}
                    <span className={`dash-pill dash-pill-${s.status}`}>{s.status}</span>
                  </div>
                  <div className="dash-service-meta">
                    {s.region} · {s.detail}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/projects" className="dash-inline-link">
            Deep dives → Projects
          </Link>
        </div>

        <div className="dash-card">
          <h2 className="dash-card-title">Event stream</h2>
          <ul className="dash-log">
            {Array.from({ length: 4 }, (_, i) => LOG_LINES[(i + logOffset) % LOG_LINES.length]).map((line, i) => (
              <motion.li
                key={`${line}-${i}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="dash-log-line"
              >
                {line}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="dash-card dash-card-cta">
          <h2 className="dash-card-title">Design reasoning</h2>
          <p className="dash-cta-text">
            <Link to="/thinking">Thinking</Link> is where I write down tradeoffs I&apos;d explain in a system-design chat — queues, retrieval
            trust, CI/CD, and what I care about in a classroom.
          </p>
          <Link to="/thinking" className="dash-btn dash-btn-primary dash-btn-block">
            Read Thinking <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
