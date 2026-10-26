export const CASE_STUDIES = [
  {
    slug: "ibm-hashicorp-agentic-infra",
    title: "IBM Research / HashiCorp R&D",
    subtitle: "Infrastructure & security — Go, Terraform, OPA",
    period: "May 2026 – Jul 2026",
    role: "Software Engineering Intern",
    tags: ["Go", "Terraform", "Vault", "OPA/Rego", "LLMs"],
    heroMetric: { label: "Focus", value: "Verify", hint: "before apply" },
    metrics: [
      { label: "Stack", value: "Go", unit: "+ Terraform" },
      { label: "Policy", value: "OPA", unit: "/ Rego" },
      { label: "Eval", value: "Red-team", unit: "agents" },
    ],
    problem: `Infrastructure access and policy work is slow when humans hand-author Terraform and Vault rules for every request. Natural-language tooling can draft configs faster — but incorrect permissions or malformed plans are worse than a slow ticket. This internship sat in that tension: use LLMs to accelerate infrastructure automation without letting unsafe model output reach execution.

The surface was developer workflow, not a chatbot demo. Requirements arrived in plain language; the system had to produce configurations, verify them, and fail closed when structure or policy constraints did not hold.`,
    architecture: `I engineered Go backend workflows that translated natural-language requirements into Terraform and Vault policy configurations, wiring LLM-generated outputs into real infrastructure and authorization services.

An OPA/Rego verification layer with adversarial test cases validated generated configurations, detected incorrect permissions, and strengthened error handling on security-sensitive paths. I also prototyped a multi-agent red-team workflow for LLM-generated infrastructure policies — adversarial evaluation, output validation, and end-to-end tests to investigate failure modes before anything looked “done.”`,
    results: `Natural-language requirements could become reviewed, constrained infrastructure artifacts instead of unchecked model dumps. Verification before execution was the trust boundary: bad grants and malformed configs failed in the pipeline, not in a live cluster.

The red-team / eval loop made failure modes visible early — the same habit I want in any agentic system that touches auth.`,
    decisions: `I refused “generate and hope”: OPA/Rego checks and adversarial cases were first-class. Go won for parsing, validation, and service boundaries where failure modes needed to be explicit.

Multi-agent red-teaming beat one-shot generation because infrastructure policy is adversarial by nature — you want to exercise the wrong permissions on purpose before production does.`,
  },
  {
    slug: "time2cash-legal-ai",
    title: "Time2Cash",
    subtitle: "Microservices + LLM retrieval at document scale",
    period: "Jan 2026 – May 2026",
    role: "Software Engineer Intern",
    tags: ["Python", "Kafka", "PostgreSQL", "Redis", "FAISS"],
    heroMetric: { label: "Manual review", value: "−65%", hint: "vs. prior process" },
    metrics: [
      { label: "Daily volume", value: "50K+", unit: "docs/day" },
      { label: "Uptime", value: "99.2%", unit: "" },
      { label: "Revenue surfaced", value: "$2M+", unit: "leakage flagged" },
    ],
    problem: `Legal and finance teams were buried in unstructured agreements and billing artifacts. Manual review was slow and uneven — especially when the question was revenue leakage, not “does this clause exist?”

The product needed backends that could handle tens of thousands of documents per day, plus an LLM retrieval path that made analysis dependable instead of vibes-based.`,
    architecture: `I built and maintained Python microservices with Kafka for asynchronous processing, PostgreSQL for persistent records, and Redis for fast access — supporting 50K+ legal documents per day at high uptime.

An LLM + FAISS retrieval pipeline indexed unstructured financial and legal records for semantic search and automated review. I investigated data-quality and cross-service failures, tightening input validation, retrieval checks, and test coverage so document-analysis results were more dependable.`,
    results: `Manual review time dropped on the order of sixty-five percent, with over two million in potential revenue leakage surfaced through data-driven analysis. Holding ~99.2% uptime under real document skew meant caring about retries, validation, and how failures showed up across services.`,
    decisions: `Kafka for async fan-out beat scaling the API alone. Retrieval checks and validation were part of the product — not a later polish — because wrong extractions look fluent and cost money.`,
  },
  {
    slug: "jane-street-insight",
    title: "Jane Street — INSIGHT",
    subtitle: "Selected participant · quantitative + engineering trade-offs",
    period: "2026",
    role: "INSIGHT Program",
    tags: ["Problem solving", "Engineering trade-offs"],
    heroMetric: { label: "Selection", value: "INSIGHT", hint: "Jane Street" },
    metrics: [
      { label: "Focus", value: "Quant +", unit: "engineering" },
      { label: "Format", value: "Collaborative", unit: "exercises" },
    ],
    problem: `INSIGHT is a selective program — depth in a short window. The goal is to explore quantitative problem solving and engineering trade-offs with the same clarity the firm expects day to day.`,
    architecture: `Collaborative technical exercises pushed on how you frame a problem, what you optimize, and how you communicate trade-offs under time pressure — not only whether an answer “works.”`,
    results: `Sharper instincts for precise problem framing and for talking through systems trade-offs the way production teams do.`,
    decisions: `Prefer small correct steps and explicit assumptions over vague “scale it” answers.`,
  },
  {
    slug: "nationwide-2025",
    title: "Nationwide Insurance",
    subtitle: "Java services + underwriting workflows — Columbus",
    period: "May 2025 – Aug 2025",
    role: "Software Engineer Intern",
    tags: ["Java", "SQL", "Testing", "1M+ customers"],
    heroMetric: { label: "User confidence", value: "+40%", hint: "reported" },
    metrics: [
      { label: "Customer base", value: "1M+", unit: "" },
      { label: "Decision accuracy", value: "+15%", unit: "" },
    ],
    problem: `Underwriting teams need correct data flows and trustworthy UI surfaces. Defects that span application and database layers are expensive: slow to find, easy to misdiagnose, and risky to ship around.`,
    architecture: `I developed Java services and SQL-backed underwriting workflows for an enterprise customer base of 1M+. Day to day that meant tracing defects across application and database layers, checking SQL data flows, and collaborating on testing and code review so underwriting-facing features stayed correct.`,
    results: `Contributions tied to roughly fifteen percent better decision accuracy and forty percent higher reported user confidence in the workflows we touched.`,
    decisions: `Treat database and application as one debugging surface. Prefer reproducing the bad row or query path over guessing in the UI.`,
  },
  {
    slug: "cmu-ta-15121",
    title: "CMU — Teaching Assistant",
    subtitle: "Data structures & algorithms in Java",
    period: "Aug 2025 – Present",
    role: "Teaching Assistant",
    tags: ["Java", "Pedagogy", "Algorithms"],
    heroMetric: { label: "Students / week", value: "25+", unit: "" },
    metrics: [
      { label: "Focus", value: "Debug +", unit: "correctness" },
      { label: "Format", value: "Labs +", unit: "1:1" },
    ],
    problem: `Intro data structures is where students first hit the gap between “I memorized the algorithm” and “I can implement and debug it.” Panic submissions and mystery failures are common.`,
    architecture: `I guide 25+ students weekly through Java debugging, data-structure implementations, and algorithm analysis — explaining error diagnosis, correctness, and runtime trade-offs in individual and group sessions.`,
    results: `Students leave sessions with a clearer debugging loop, not just a patched assignment. Teaching the same idea five ways also sharpens how I explain design in industry.`,
    decisions: `Questions before keyboard: “what did you expect?” and “what did you try?” beat handing over a solution.`,
  },
  {
    slug: "axway-2023",
    title: "Axway",
    subtitle: "Frontend for an enterprise API portal",
    period: "Jun 2023 – Jul 2023",
    role: "Software Engineer Intern",
    tags: ["React", "Frontend", "API portal"],
    heroMetric: { label: "Surface", value: "API portal", hint: "developer UX" },
    metrics: [
      { label: "Stack", value: "React", unit: "components" },
      { label: "Focus", value: "Reusable", unit: "UI" },
    ],
    problem: `Enterprise API management portals have to feel coherent for developers integrating against real APIs — reusable UI, clear workflows, and surfaces that stay in sync with backend contracts.`,
    architecture: `I developed reusable React components for an enterprise API Management Portal, integrating developer-facing interfaces with API-backed application workflows.`,
    results: `Shipped UI pieces that other flows could reuse, with clearer wiring between what developers see and what the APIs actually do.`,
    decisions: `Prefer component reuse and clear API-backed state over one-off screens that drift from the contract.`,
  },
  {
    slug: "distributed-kv-raft",
    title: "Distributed Key-Value Store",
    subtitle: "Go · Raft · concurrency",
    period: "2026",
    role: "Systems project",
    tags: ["Go", "Raft", "RPC", "Concurrency"],
    heroMetric: { label: "Consensus", value: "Raft", hint: "interfaces" },
    metrics: [
      { label: "Lang", value: "Go", unit: "" },
      { label: "Net", value: "RPC", unit: "+ channels" },
      { label: "Focus", value: "Election", unit: "/ recovery" },
    ],
    problem: `A single-process map hides the hard parts of distributed storage: concurrent clients, leader election, and what consistency means when messages fail.`,
    architecture: `I developed concurrent Go networking and state-management components using goroutines, channels, and RPC, including Raft state inspection and election-related interfaces. Testing covered concurrent message handling and failure-sensitive paths — leader election behavior, consistency requirements, and recovery trade-offs.`,
    results: `End-to-end ownership of the awkward bits: concurrency under load and how the system behaves when leadership and messages go wrong.`,
    decisions: `Separate connection handling from shared-state management. Treat election and recovery as first-class test surfaces, not happy-path footnotes.`,
  },
  {
    slug: "limit-order-book",
    title: "Limit Order Book",
    subtitle: "C++ matching with price-priority invariants",
    period: "2026",
    role: "Systems / DS project",
    tags: ["C++", "Data structures", "Testing"],
    heroMetric: { label: "Matching", value: "Price-prio", hint: "deterministic" },
    metrics: [
      { label: "Lang", value: "C++", unit: "" },
      { label: "Orders", value: "Buy/Sell", unit: "limit" },
      { label: "Tests", value: "Fills +", unit: "boundaries" },
    ],
    problem: `A limit order book has to stay correct under partial fills, price-level updates, and messy boundary cases — not only the textbook happy path.`,
    architecture: `I implemented a C++ limit order book with price-priority matching for buy and sell orders, emphasizing efficient updates, deterministic execution, and correct state transitions. Tests covered partial fills, price-level updates, and boundary conditions to validate matching invariants.`,
    results: `A clearer mental model for how matching state evolves — and how tests encode the invariants you actually care about.`,
    decisions: `Deterministic state transitions first; performance only after the book can’t lie about fills.`,
  },
  {
    slug: "transformer-from-scratch",
    title: "Transformer from Scratch",
    subtitle: "Attention + training loop in PyTorch",
    period: "2026",
    role: "ML systems project",
    tags: ["Python", "PyTorch", "Attention"],
    heroMetric: { label: "Goal", value: "End-to-end", hint: "understand execution" },
    metrics: [
      { label: "Core", value: "Attention", unit: "" },
      { label: "Stack", value: "PyTorch", unit: "" },
      { label: "Debug", value: "Shapes", unit: "+ forward" },
    ],
    problem: `Calling a library transformer hides what actually runs. I wanted to implement attention, tensor transforms, and training pieces myself so shape bugs and forward-pass behavior were things I could debug, not mysteries.`,
    architecture: `Implemented attention, tensor transformations, and training components for a transformer in PyTorch; debugged shape mismatches and checked forward-pass behavior to understand model execution end to end.`,
    results: `Comfort reading a forward pass as a real program — dimensions, attention patterns, and where training can silently go wrong.`,
    decisions: `Build enough of the stack to own the failure modes. Library wrappers come after the shapes make sense.`,
  },
  {
    slug: "sproutcards",
    title: "SproutCards",
    subtitle: "Notes → study decks in the browser",
    period: "2025",
    role: "Side project",
    tags: ["TypeScript", "React", "Heuristics"],
    heroMetric: { label: "Runs offline", value: "100%", hint: "no API keys" },
    metrics: [
      { label: "Privacy", value: "Local", unit: "only" },
      { label: "Cards", value: "Auto", unit: "from paste" },
    ],
    problem: `Studying from long notes often means re-reading instead of testing recall. I wanted paste → cards with no account and no cloud.`,
    architecture: `Everything runs in the browser: split text, score salient terms, generate recall prompts. No embeddings server — transparency over sophistication.`,
    results: `Usable cards in seconds without leaking notes off-device. Also powers the site Playground demo.`,
    decisions: `Heuristic-first on purpose: guessable behavior beats a black-box summarizer for a stress-night tool.`,
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
