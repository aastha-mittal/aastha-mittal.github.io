import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { THINKING_POSTS } from "../data/thinkingPosts";

export default function ThinkingPage() {
  return (
    <div className="think-page">
      <header className="think-head">
        <p className="think-kicker">THINKING</p>
        <h1 className="think-title">System design &amp; tradeoffs</h1>
        <p className="think-desc">
          Short notes on decisions I&apos;d stand behind in interviews — not generic advice, but how I reason about queues, RAG trust, CI/CD,
          and teaching.
        </p>
      </header>
      <ul className="think-list">
        {THINKING_POSTS.map((p, i) => (
          <motion.li
            key={p.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/thinking/${p.slug}`} className="think-card">
              <div className="think-card-meta">
                <time dateTime={p.date}>{p.date}</time>
                <span>{p.readTime}</span>
              </div>
              <h2>{p.title}</h2>
              <p>{p.excerpt}</p>
              <span className="think-read">
                Read <ArrowRight size={14} />
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
