export const CASE_STUDIES = [
  {
    slug: "time2cash-legal-ai",
    title: "Time2Cash",
    subtitle: "Microservices + LLM document review at scale",
    period: "Jan 2026 – Present",
    role: "Software Engineer Intern",
    tags: ["Python", "Kafka", "PostgreSQL", "OpenAI", "Legal tech"],
    heroMetric: { label: "Manual review time", value: "−65%", hint: "vs. prior process" },
    metrics: [
      { label: "Daily traffic", value: "50K+", unit: "req/day" },
      { label: "Uptime target", value: "99.2%", unit: "" },
      { label: "Revenue surfaced", value: "$2M+", unit: "leakage flagged" },
    ],
    problem: `Legal and finance teams at a growing legal-tech startup were buried in long agreements, amendments, and billing artifacts. Reviews were done mostly by hand: people skimmed PDFs, re-keyed numbers into spreadsheets, and hoped nothing important slipped through. That was slow, uneven between reviewers, and easy to under-scope — especially when the question was “are we leaving money on the table?” rather than “does this clause exist?”

Day to day, the pain showed up as queue time: documents waited for a senior reviewer because junior staff were not sure which clauses were material, and ad-hoc spreadsheets did not join structured billing history with contract text. Spikes in inbound work (quarter close, new client onboarding) turned predictable crunch into fire drills.

The product needed backends that could handle real daily load without catching fire when volume spiked, and an AI-assisted layer that prioritized what humans should read first — not replace them overnight.`,
    architecture: `I work in a Python microservice setup where each service has a narrow job: ingest and normalize documents, enrich them with structured fields, score risk or anomaly signals, and hand off to async workers when work should not block the API. PostgreSQL is the source of truth for durable state; Redis sits in front of hot reads; Kafka moves work between stages so a burst of uploads does not stall synchronous requests.

Concrete responsibilities on my side included tightening ingestion paths for messy PDFs (layout quirks, scanned pages, mixed languages), keeping worker pools sized so retries from a bad file did not starve the rest of the pipeline, and pairing with product on what “confidence” should mean in the UI — numbers, colors, and links back to source spans.

The LLM path is deliberately not “model says jump”: OpenAI calls feed into Pandas/NumPy post-processing and statistical checks against historical patterns, so outliers and low-confidence spans get flagged before anyone treats them as fact. I spent time on guardrails: comparing new extractions to rolling baselines, surfacing deltas that would look suspicious to a finance lead even if the prose sounded fine, and making sure failed or partial model responses degraded to explicit “needs human” states instead of silent blanks.

That split — fast CRUD and queues for scale, careful validation for anything dollar-related — is how we kept trust while still cutting manual time.`,
    results: `The same review capacity could cover more agreements with fewer misses, and leadership could point to concrete dollars: manual review time dropped on the order of sixty-five percent, with over two million in revenue leakage surfaced that had been easy to miss in spreadsheet-only workflows.

Operationally, the system had to behave under real skew: one customer might upload a handful of files; another might dump thousands in an hour. Holding high uptime (on the order of 99%+) under tens of thousands of requests per day meant paying attention to back-pressure, idempotent workers, dead-letter handling for poison messages, and dashboards that showed lag at each Kafka stage — not only API latency.

I also learned where automation stopped being helpful: when legal needed a narrative for an exception, the win was routing the right evidence quickly, not summarizing aggressively.`,
    decisions: `Kafka won over “scale the API tier” once document volume and fan-out work grew: replay and isolation between consumers mattered more than marginal CPU. I pushed for statistical and rules-based gates alongside the LLM because legal workflows need an audit story — not a chat transcript.

We rejected “LLM-only” scoring for dollar amounts: the product’s credibility lived in reconciling model output with structured history and explicit uncertainty. Where we could automate safely, we did; where judgment was required, we made the UI and queues support reviewers instead of hiding uncertainty.`,
  },
  {
    slug: "cmu-ta-15121",
    title: "CMU — Teaching Assistant (15-121)",
    subtitle: "Intro data structures in Java",
    period: "Aug 2025 – Present",
    role: "Teaching Assistant",
    tags: ["Java", "Pedagogy", "Algorithms"],
    heroMetric: { label: "Students / term", value: "25+", unit: "lab sections" },
    metrics: [
      { label: "Course", value: "15-121", unit: "Intro DS" },
      { label: "Focus", value: "Labs +", unit: "office hours" },
    ],
    problem: `Introduction to Data Structures is where many students first hit runtime limits, off-by-one bugs, and the gap between “I memorized the algorithm” and “I can implement it under time pressure.” The course moves quickly; if someone falls behind on recursion, trees, or asymptotics, everything after feels opaque.

Common failure modes I see repeatedly: confusing reference vs value when lists are nested; writing correct logic on paper but losing track of indices in code; and optimizing prematurely before correctness is nailed down — especially on graph and heap assignments where the grader’s hidden tests are unforgiving.

My job in labs is not to hand out answers — it is to help students build a debugging loop: reproduce the failure, shrink the example, read the error, and connect the bug to a concept they can fix once.`,
    architecture: `Weekly lab sections are structured around guided exercises and live coding — walk through invariants, draw memory on the board, and force students to predict what happens before they run. I alternate between whole-room explanation and circulating: when three students hit the same bug, I pause the room and show the fix pattern once so office hours do not repeat the same speech six times.

Office hours are one-on-one or small groups: we use the IDE together, set breakpoints where useful, and talk through Big-O when a solution is correct but too slow for the grader’s limits. For autograder failures, I push students to read feedback literally (“which test?” “what line?”) instead of re-submitting random tweaks.

I coordinate with the rest of the course staff so messaging stays aligned with lecture and we can flag topics where multiple students stall — for example when recursion clicks for some but not others, or when students conflate Java’s heap (memory region) with the heap data structure. That feedback loop helps instructors adjust emphasis and helps me calibrate how much hint to give without short-circuiting learning.`,
    results: `Students leave with stronger fundamentals for systems and algorithms courses later — fewer “I never understood pointers” gaps and more confidence reading stack traces and TA feedback. The measure I care about is not a single grade spike; it is whether someone leaves a session able to finish the next assignment with less panic and fewer mystery WA/TLE submissions.

For me, it sharpens communication: explaining the same idea five different ways is good practice for code reviews and design discussions in industry. It also keeps my own fundamentals honest — explaining AVL rotations or Dijkstra’s proof sketch out loud catches gaps in my own understanding faster than skimming notes.`,
    decisions: `I default to questions (“what did you expect?” / “what did you try?”) before touching their keyboard — that habit carries into pair programming and mentorship elsewhere. When someone is stuck on a proof-style invariant, I draw the structure first; when they are stuck on performance, we profile or count operations instead of guessing.

On academic integrity, I am strict about boundaries: I will debug their thinking and their test cases, not paste a solution shaped to match the spec. That lines up with how I want to be treated as an engineer — help me see the bug, do not bypass the learning.`,
  },
  {
    slug: "nationwide-2025",
    title: "Nationwide Insurance (2025)",
    subtitle: "Full-stack + CI/CD — Columbus",
    period: "May 2025 – Aug 2025",
    role: "Software Engineer Intern",
    tags: ["Java", "TypeScript", "Jenkins", "1M+ users"],
    heroMetric: { label: "Deploy time", value: "2h → 15m", hint: "CI/CD" },
    metrics: [
      { label: "Users", value: "1M+", unit: "served" },
      { label: "Tests", value: "90%+", unit: "coverage (areas)" },
    ],
    problem: `Nationwide ships software to a huge, regulated user base. Product and engineering both feel pressure to deliver faster, but “faster” cannot mean shipping blind: every release has to survive review, automated tests, and promotion through multiple environments. My summer focused on customer-facing features in a large application stack (JavaScript/TypeScript and Java), and on making releases smaller and more frequent by fixing the pipeline — long deploy windows had become a bottleneck that concentrated risk into rare, scary releases.

The practical symptom was thrash: teams waited on long-running deploy jobs, which encouraged bundling unrelated changes and made rollbacks painful. I wanted to shorten the feedback loop so a bug found in QA could be fixed and re-promoted the same day without a calendar event.`,
    architecture: `I worked across layers that real users touch: UI and service code, with an emphasis on tests and reviews so changes did not regress adjacent flows. On the front end, that meant component-level tests where behavior mattered, and careful handling of async flows and error states users actually see. On the Java side, I followed existing service patterns for validation and logging so new endpoints did not become special snowflakes.

Separately, I invested in Jenkins-based CI/CD: standardized build and test stages, clearer promotion steps across five-plus environments, caching where it was safe, and parallelization where dependencies allowed. I paid attention to flaky tests — not just green builds — because a pipeline that passes randomly erodes trust faster than a slow one.

Observability meant build logs you could grep, stage boundaries that failed loudly with actionable messages, and enough metadata on artifacts that “what got deployed?” was answerable without archaeology. That work was cross-functional — aligning with ops expectations and with product timelines so the pipeline changes actually unblocked teams rather than looking good on a slide.`,
    results: `Deployments moved from roughly two-hour windows to on the order of fifteen minutes in the environments we targeted, which made it realistic to ship smaller batches and get feedback sooner. The cultural effect mattered as much as the clock time: smaller batches meant clearer ownership when something regressed, and faster promotion meant less pressure to sneak fixes in through unrelated releases.

Feature work stayed grounded in coverage (often ninety percent or better in the areas I owned) and in code review culture — both as author and reviewer — which mattered as much as the CI numbers for long-term maintainability. I also got comfortable with the reality of large orgs: approvals, change windows, and coordination across teams — shipping is not only code.`,
    decisions: `I treated CI/CD as a product: measure before and after, communicate with stakeholders when behavior of the pipeline changed, and avoid “hero scripts” that only one person can fix. When I added automation, I documented the rollback path — a fast pipeline that nobody dares touch is not a win.

For application code, I biased toward tests that encoded real user paths, not only line coverage — especially around integration points between TS/JS and Java services. I preferred fewer, stronger tests over a wall of mocks that duplicated implementation details.`,
  },
  {
    slug: "nationwide-2024",
    title: "Nationwide Insurance (2024)",
    subtitle: "Quality + observability — Scottsdale",
    period: "May 2024 – Aug 2024",
    role: "Software Engineer Intern",
    tags: ["Java", "Testing", "Observability"],
    heroMetric: { label: "Defect repro time", value: "−75%", hint: "measured workflows" },
    metrics: [
      { label: "Unit tests", value: "200+", unit: "Java" },
      { label: "Coverage", value: "~90%", unit: "framework" },
    ],
    problem: `Before features can move quickly, the org needs confidence that regressions get caught early and that production issues can be understood without days of guesswork. My team needed a stronger backend testing story and clearer traces across internal systems so engineers could answer “what actually happened?” when something went wrong in the field.

In practice, incidents looked like: a customer report filtered through support, an engineer grepping logs without a request ID, and a meeting two days later once someone manually stitched timelines. The cost was not only time — it was confidence: teams hesitated to refactor because “it works in prod” was doing too much work.`,
    architecture: `I built out a Java testing framework with hundreds of unit tests and strong line coverage in the modules we cared about most — not just happy paths, but edge cases that had burned us before: null handling, boundary values, serialization quirks, and contract tests where services exchanged DTOs.

I leaned on parameterized tests and shared fixtures where it reduced duplication without obscuring intent. For flaky or environment-dependent cases, I separated “pure unit” tests from integration-style tests so local runs stayed fast and CI stayed meaningful.

In parallel, I integrated observability tooling into five-plus internal systems so requests and failures could be correlated across service boundaries — consistent correlation IDs, structured log fields, and enough context that you could pivot from “error at line X” to “which upstream call failed.” The goal was reproducibility: less “cannot reproduce,” more “here is the trace and the failing assertion.”

I worked closely with teammates to agree on naming and propagation rules; observability fails when every team invents its own ID format.`,
    results: `Defect reproduction time dropped dramatically — on the order of seventy-five percent — in the workflows we measured, because engineers spent less time reconstructing state by hand. The qualitative change was fewer circular threads in chat: you could post a trace link and a hypothesis in one message.

The test suite also made refactors and dependency upgrades less frightening: you could run the suite and trust that core contracts still held. Junior engineers could onboard faster because failures were localized and tests doubled as documentation of expected behavior — when they were written to read like specs, not like puzzles.`,
    decisions: `I prioritized tests that encoded invariants and contracts over tests that only mirrored implementation details — so refactors did not mean rewriting every test. When a test broke only because an internal helper moved, that was a signal to rewrite the test around behavior.

For observability, I focused on consistent identifiers and log context across systems so cross-service debugging did not require tribal knowledge. I avoided logging secrets or giant payloads — enough to debug, not enough to create new incident classes.`,
  },
  {
    slug: "axway-2023",
    title: "Axway",
    subtitle: "APIs + gateway at scale",
    period: "Jun 2023 – Jul 2023",
    role: "Software Engineer Intern",
    tags: ["Java", "REST", "OAuth", "Gateway"],
    heroMetric: { label: "Platform users", value: "500K+", unit: "" },
    metrics: [
      { label: "Traffic", value: "10K+", unit: "req/s (gateway)" },
      { label: "Auth", value: "OAuth 2", unit: "/ JWT" },
    ],
    problem: `Enterprise API platforms have to serve many clients with strict security and predictable behavior under load. Customers integrate through REST APIs; internal teams need gateways that can throttle abusive patterns and route traffic without melting upstream services. My internship focused on backend components that sat in that path: authentication flows, token handling, and participation in a distributed gateway architecture.

Partners do not care about your internal heroics — they care that tokens refresh predictably, errors are actionable (401 vs 403 vs 429), and versioning does not break them silently. My work sat at that boundary: correctness under load and clarity under failure.`,
    architecture: `I implemented and extended REST endpoints used behind a high-traffic product surface, including industry-standard token flows so partner integrations could authenticate safely. That meant reading specs carefully, matching behavior to documented contracts, and testing negative paths — expired tokens, clock skew, malformed headers — not only the golden path.

On the gateway side, I contributed to pieces that handled heavy request rates — on the order of ten thousand requests per second in aggregate — with rate limiting and load-aware behavior so spikes did not cascade into failures. I spent time understanding how the gateway decided what to shed under pressure and how clients should interpret back-pressure signals instead of blindly retrying.

That meant understanding failure modes: timeouts, partial outages, and how retries interact with downstream capacity — retry storms were not theoretical; they showed up when a dependency wobbled and every client doubled their attempts. I learned to think in terms of budgets: latency budgets, error budgets, and how to log enough to distinguish overload from bugs.

Code review culture was strict: security-relevant changes got extra eyes, and “it works on my machine” was never enough for auth.`,
    results: `Features shipped in a codebase where correctness and security were non-negotiable; I got concrete experience with OAuth-style patterns and with how large orgs document and version APIs for external consumers. I also learned the operational side indirectly — on-call handoffs, release notes partners read, and why deprecation timelines matter.

It was my first deep exposure to gateway-style thinking — not just “write a handler,” but “what happens when this tier is slow?” That lens stuck: every API I build now, I ask about timeouts, idempotency, and what the client should do when things go wrong.`,
    decisions: `I learned to treat auth and routing code as part of the product’s reliability surface: logging, clear error contracts, and defensive defaults matter as much as the happy path. I avoided leaking stack traces to clients while still returning stable error codes partners could script against.

That mindset carried directly into later work on observability and microservices — the gateway summer was where I started treating distributed systems as something you operate, not only something you compile.`,
  },
  {
    slug: "document-qa-rag",
    title: "Document Q&A (RAG)",
    subtitle: "Retrieval + evaluation over large corpora",
    period: "2025",
    role: "Personal / research project",
    tags: ["Python", "LangChain", "FAISS", "PostgreSQL", "OpenAI"],
    heroMetric: { label: "Design → deploy", value: "End-to-end", hint: "owned pipeline" },
    metrics: [
      { label: "Retrieval", value: "FAISS", unit: "vector index" },
      { label: "Quality metrics", value: "P / MRR", unit: "tracked" },
      { label: "Safety", value: "HITL", unit: "low-confidence" },
    ],
    problem: `Search boxes fail when questions are phrased in natural language or when the answer depends on meaning spread across many sections. I wanted a system that could answer from a document corpus with citations users could click — not a model that free-associated from parametric knowledge. The hard part is not calling an API; it is making retrieval reliable enough that generation has something truthful to stand on, and measuring when that chain breaks.`,
    architecture: `Documents are chunked and embedded with OpenAI; vectors live in FAISS for fast similarity search, with PostgreSQL holding metadata, chunk IDs, and provenance so every answer can point back to source text. At query time: embed the question, retrieve top-k, optionally rerank, then generate with a tight context window so the model is constrained by what was retrieved. I instrumented precision and mean reciprocal rank so tuning chunk size or embedding strategy showed up in numbers, not vibes. A human-in-the-loop path routes low-confidence generations to review instead of silently showing them as fact.`,
    results: `The pipeline returned source-backed snippets that were checkable — and when retrieval regressed (bad chunking, stale index), metrics moved before users had to report it. Owning the loop end-to-end meant I also felt the operational side: rebuilds, eval sets, and when to stop tweaking embeddings and fix the data instead.`,
    decisions: `FAISS was the right tradeoff for iteration speed and local demos; Postgres for anything that had to survive restarts. Measuring ranking quality (MRR) separately from generation quality was a deliberate choice — bad retrieval cannot be fixed by a smarter prompt alone.`,
  },
  {
    slug: "medease",
    title: "MedEase",
    subtitle: "Multilingual healthcare access",
    period: "Aug 2023 – May 2024",
    role: "Team lead / full-stack",
    tags: ["React", "TypeScript", "Python", "GCP", "Firebase", "ML"],
    heroMetric: { label: "Languages", value: "100+", unit: "supported" },
    metrics: [
      { label: "Translation eval", value: "~92%", unit: "accuracy" },
      { label: "Stack", value: "End-to-end", unit: "web + ML" },
    ],
    problem: `Basic health information should be understandable across languages, but bolting machine translation onto an English-only UX creates misleading or unsafe wording. The team needed one coherent product: a React/TypeScript front end, Python services, real-time data, and ML components for language and intent — not a demo that only worked for a single locale.`,
    architecture: `We used Firebase for real-time pieces where responsiveness mattered, GCP for training and serving ML components, and strict evaluation for translation quality so “multilingual” was measured, not assumed. Intent classification and anomaly detection helped route ambiguous or risky inputs to safer defaults. Through the year we kept code review, automated tests, and CI/CD as part of the rhythm so multiple contributors could ship without stepping on each other.`,
    results: `Users could interact in many languages with translation quality we could report in evaluation (~ninety-two percent in our tests — always with the caveat that evaluation harnesses have limits). The stack was genuinely end-to-end: not just a model in a notebook, but routing, UX, and failure handling in production-shaped code.`,
    decisions: `Firebase traded some purity for speed of iteration on collaborative UX; separate translation evals meant we could argue honestly about quality instead of hand-waving. When ML and product disagreed, we resolved it with metrics and user flows, not slides.`,
  },
  {
    slug: "fitform",
    title: "FitForm",
    subtitle: "Real-time posture feedback (ML + API)",
    period: "Nov – Dec 2024",
    role: "ML + API",
    tags: ["PyTorch", "Computer vision", "REST", "NumPy"],
    heroMetric: { label: "Inference speed", value: "−40%", hint: "after compression" },
    metrics: [
      { label: "Accuracy", value: "~88%", unit: "held-out" },
      { label: "Pose samples", value: "100K+", unit: "processed" },
    ],
    problem: `Workout feedback only helps if it arrives while the user is still in the movement — a model that is accurate offline but too slow on a laptop camera feels like a broken product. FitForm was scoped as a posture and exercise-form project: classify form across several movement types, run on realistic hardware, and expose results through an API that other clients could trust.

The challenge was the full stack: data, model, latency, and validation, not only a leaderboard score.`,
    architecture: `I trained a neural network in PyTorch for multi-class posture across multiple exercise types, with careful train/validation splits and attention to messy real-world frames (lighting, angle, partial occlusion). Cosine similarity and geometry features complemented raw pixels so the model was not brittle to a single representation.

After initial accuracy goals (~eighty-eight percent on held-out data), I invested in compression techniques that cut inference latency roughly forty percent so the loop felt responsive. A small REST API served predictions with explicit validation: comparing model outputs to human judgment on edge cases before treating them as reliable.`,
    results: `The project delivered both accuracy and usability: strong classification numbers without inference that lagged behind the user.

Processing over a hundred thousand joint-related samples taught me to respect data hygiene and leakage — the same lesson that shows up in larger ML systems, just at coursework scale.`,
    decisions: `I traded a small amount of accuracy for latency when the product constraint was real-time feedback — a trade I’d defend in interview. I also documented failure cases: where the camera lost the body or two poses looked similar, so “accuracy” was not a single headline number without context.`,
  },
  {
    slug: "sproutcards",
    title: "SproutCards",
    subtitle: "Turn messy notes into tiny study decks — in the browser",
    period: "2025",
    role: "Side project (personal)",
    tags: ["TypeScript", "React", "Heuristics", "Education"],
    heroMetric: { label: "Runs offline", value: "100%", hint: "no API keys" },
    metrics: [
      { label: "Privacy", value: "Local", unit: "only" },
      { label: "Cards", value: "Auto", unit: "from paste" },
    ],
    problem: `Studying from long notes often means re-reading everything instead of testing recall. I wanted something I could use the night before an exam: paste raw text, get a handful of cards, no account and no cloud — because trust and friction matter for tools you reach for when stressed.`,
    architecture: `Everything runs in the browser: split text into sentences, strip stopwords, score salient terms with simple frequency heuristics, and generate one recall prompt per sentence. No embeddings server — transparency over sophistication. The “AI” is explainable: you can see why a keyword was picked, which matches how I think about teaching (15-121) and about safety in real ML systems: opaque magic is harder to trust.`,
    results: `It will not replace Anki or a full spaced-repetition stack, but it produces usable cards in seconds and never leaks data off the machine. For a side project, reliability and clarity beat chasing SOTA on a portfolio page.`,
    decisions: `Heuristic-first was intentional: if the behavior is guessable, users (and I) trust it more than a black-box summarizer. When I want neural quality, I reach for the RAG stack or production models elsewhere; here I wanted charm, speed, and zero backend cost.`,
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
