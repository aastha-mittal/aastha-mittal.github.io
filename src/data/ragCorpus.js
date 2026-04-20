/** Small in-browser corpus for the RAG playground (keyword + TF-style scoring). */
export const RAG_CORPUS = [
  {
    id: "c1",
    title: "Time2Cash — scale & reliability",
    text: `Time2Cash backend services handle tens of thousands of requests per day with high uptime. The stack uses Python microservices, PostgreSQL for durable state, Redis for caching, and Kafka for asynchronous work between services. The goal is predictable latency and clear failure modes when load spikes.`,
  },
  {
    id: "c2",
    title: "Document AI — LLM review workflow",
    text: `The document analysis pipeline combines OpenAI APIs with statistical checks and Pandas workflows. Human reviewers see ranked suggestions first; low-confidence outputs are flagged. This reduced manual review time substantially and helped surface revenue leakage that manual review missed.`,
  },
  {
    id: "c3",
    title: "Nationwide — CI/CD impact",
    text: `CI/CD pipelines in Jenkins reduced deployment time from about two hours to roughly fifteen minutes across multiple environments. That meant faster feedback for product and less risk per release because smaller batches shipped more often.`,
  },
  {
    id: "c4",
    title: "Nationwide — quality & observability",
    text: `A Java testing framework with hundreds of unit tests and high coverage made refactors safer. Observability hooks across internal systems cut time to reproduce defects by a large margin because engineers could trace requests end to end.`,
  },
  {
    id: "c5",
    title: "Axway — APIs & gateway",
    text: `REST APIs served hundreds of thousands of users with OAuth-style token flows. The gateway layer handled thousands of requests per second with rate limiting and load-aware routing to protect upstream services.`,
  },
  {
    id: "c6",
    title: "RAG system — retrieval design",
    text: `The knowledge Q&A system uses vector search with FAISS and OpenAI embeddings. Precision and mean reciprocal rank metrics track retrieval quality. Human-in-the-loop review catches low-confidence generations before they reach users.`,
  },
  {
    id: "c7",
    title: "MedEase — multilingual product",
    text: `MedEase is an end-to-end web application with React and TypeScript on the frontend, Python services, Firebase, and cloud ML for language and intent. It supports many languages with high translation quality in evaluation.`,
  },
  {
    id: "c8",
    title: "FitForm — model & latency",
    text: `FitForm uses a neural network for posture classification across several exercise types with strong accuracy. Model compression reduced inference latency noticeably so feedback felt responsive during workouts.`,
  },
  {
    id: "c9",
    title: "Teaching — 15-121",
    text: `As a teaching assistant for introductory data structures, weekly labs and office hours help students debug Java programs and build intuition for asymptotics and correctness, not just finishing assignments.`,
  },
  {
    id: "c10",
    title: "Education — CMU",
    text: `Carnegie Mellon B.S. in Computer Science with concentrations in systems and machine learning. Expected graduation May 2028. Coursework includes machine learning, computer systems, probability, and algorithms.`,
  },
];
