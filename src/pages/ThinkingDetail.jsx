import { Link, Navigate, useParams } from "react-router-dom";
import { getThinkingPost } from "../data/thinkingPosts";
import { ArrowLeft } from "lucide-react";

export default function ThinkingDetail() {
  const { slug } = useParams();
  const post = getThinkingPost(slug);
  if (!post) return <Navigate to="/thinking" replace />;

  return (
    <article className="think-detail">
      <Link to="/thinking" className="proj-back">
        <ArrowLeft size={16} /> All posts
      </Link>
      <header className="think-detail-head">
        <p className="think-card-meta">
          <time dateTime={post.date}>{post.date}</time> · {post.readTime}
        </p>
        <h1 className="think-detail-title">{post.title}</h1>
        <p className="think-detail-excerpt">{post.excerpt}</p>
      </header>
      <div className="think-detail-body">
        {post.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
