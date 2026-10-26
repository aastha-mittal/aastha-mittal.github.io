/** Small in-browser corpus for the RAG playground (keyword + TF-style scoring). */
export const RAG_CORPUS = [
  {
    id: "c0",
    title: "IBM / HashiCorp — agentic infrastructure",
    text: `At IBM Research with HashiCorp R&D, Aastha engineered Go backend workflows that turn natural-language requirements into Terraform and Vault policy configurations. An OPA/Rego verification layer with adversarial test cases validates generated configs and incorrect permissions. A multi-agent red-team workflow investigates failure modes in LLM-generated infrastructure policies.`,
  },
  {
    id: "c1",
    title: "Time2Cash — scale & reliability",
    text: `Time2Cash Python microservices use Kafka for asynchronous processing, PostgreSQL for persistent records, and Redis for fast access, supporting 50K+ legal documents per day at 99.2% uptime. An LLM and FAISS retrieval pipeline reduced manual review by 65% and surfaced $2M+ in potential revenue leakage.`,
  },
  {
    id: "c2",
    title: "Jane Street — INSIGHT",
    text: `Aastha was selected for Jane Street INSIGHT and explored quantitative problem solving and engineering trade-offs through collaborative technical exercises.`,
  },
  {
    id: "c3",
    title: "Nationwide — underwriting systems",
    text: `At Nationwide, Java services and SQL-backed underwriting workflows supported an enterprise customer base of 1M+, contributing to about 15% better decision accuracy and 40% higher reported user confidence. Defect tracing spanned application and database layers.`,
  },
  {
    id: "c4",
    title: "Axway — React API portal",
    text: `At Axway, reusable React components powered an enterprise API Management Portal, integrating developer-facing interfaces with API-backed application workflows.`,
  },
  {
    id: "c5",
    title: "Distributed KV with Raft",
    text: `A Go key-value project uses goroutines, channels, and RPC with Raft state inspection and election-related interfaces. Tests cover concurrent message handling, leader election behavior, consistency, and recovery trade-offs.`,
  },
  {
    id: "c6",
    title: "Limit order book",
    text: `A C++ limit order book implements price-priority matching for buy and sell orders with efficient updates and deterministic execution. Tests cover partial fills, price-level updates, and boundary conditions.`,
  },
  {
    id: "c7",
    title: "Transformer from scratch",
    text: `A PyTorch project implements attention, tensor transformations, and training components for a transformer, with careful debugging of shape mismatches and forward-pass behavior.`,
  },
  {
    id: "c8",
    title: "Teaching — data structures",
    text: `As a CMU teaching assistant for data structures and algorithms, Aastha guides 25+ students weekly through Java debugging, implementations, and runtime trade-offs.`,
  },
  {
    id: "c9",
    title: "Education — CMU",
    text: `Carnegie Mellon B.S. in Computer Science, expected May 2028. Coursework includes data structures and algorithms, distributed systems, parallel algorithms, computer systems, probability and statistics, and machine learning.`,
  },
];
