export const THINKING_POSTS = [
  {
    slug: "kafka-vs-bigger-box",
    title: "When queues beat bigger boxes",
    excerpt: "Why we leaned on Kafka for document pipelines instead of only scaling the API tier.",
    date: "2026",
    readTime: "4 min",
    sections: [
      {
        heading: "Context",
        body: `High-volume document workflows don’t fail only from CPU — they fail from coupling. When one stage slows, you need back-pressure and replay, not silent timeouts.`,
      },
      {
        heading: "Decision",
        body: `Kafka let different services own their throughput. A spike in ingest didn’t starve scoring; consumers could catch up with clear metrics. Replaying a topic beats “run the batch again by hand” when something downstream misbehaved.`,
      },
      {
        heading: "Tradeoff",
        body: `Operational overhead is real: topics, consumer groups, monitoring. You earn that cost when the product’s failure mode is “lost work” or “silent partial processing.”`,
      },
    ],
  },
  {
    slug: "rag-trust-loop",
    title: "RAG isn’t done at retrieval",
    excerpt: "Why retrieval metrics + human review were part of v1, not a Phase 2.",
    date: "2025",
    readTime: "3 min",
    sections: [
      {
        heading: "Problem",
        body: `A good embedding model can still surface the wrong chunk. If users can’t trust citations, the whole UX collapses — even if the prose sounds fluent.`,
      },
      {
        heading: "Design",
        body: `We tracked precision and MRR on retrieval sets whenever we changed chunking or indexing. For generation, low-confidence outputs were routed to human review instead of being shown as fact.`,
      },
      {
        heading: "Lesson",
        body: `“Accuracy” for RAG is a system property: retrieval + generation + policy. Optimizing one without measuring the others is optimizing a toy.`,
      },
    ],
  },
  {
    slug: "ci-cd-as-risk-management",
    title: "CI/CD as risk management, not speed",
    excerpt: "What shorter deploy times actually bought our team at Nationwide.",
    date: "2025",
    readTime: "3 min",
    sections: [
      {
        heading: "Observation",
        body: `Long deploy windows mean bigger batches. Bigger batches mean harder rollbacks and scarier reviews — so people ship less often, which sounds safe but concentrates risk.`,
      },
      {
        heading: "Outcome",
        body: `Cutting deploy time from hours to minutes didn’t just save clock time; it changed how often we could ship small, reviewable changes. Incidents became easier to attribute.`,
      },
      {
        heading: "Takeaway",
        body: `Invest in pipelines when the organization’s bottleneck is fear of release — not when you only want shinier tools.`,
      },
    ],
  },
  {
    slug: "teaching-debugging",
    title: "Teaching debugging, not answers",
    excerpt: "What I optimize for as a 15-121 TA when students are stuck.",
    date: "2025",
    readTime: "2 min",
    sections: [
      {
        heading: "Goal",
        body: `Labs aren’t there to finish the homework for students — they’re there to build the habit of forming hypotheses, reading errors, and shrinking the problem.`,
      },
      {
        heading: "Practice",
        body: `I ask “what did you try?” and “what did you expect?” before touching code. One-on-one time goes to the smallest reproducible example, not a full solution dump.`,
      },
      {
        heading: "Why it matters",
        body: `Interview loops and internships reward people who can debug unfamiliar systems. That skill is transferable in a way that memorized solutions aren’t.`,
      },
    ],
  },
];

export function getThinkingPost(slug) {
  return THINKING_POSTS.find((p) => p.slug === slug);
}
