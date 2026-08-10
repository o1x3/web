// Notes / writing. Homepage rail and /notes archive both read from this list.
// Plain paragraphs for now; swap for MDX later if needed.

export type Note = {
  slug: string
  title: string
  /** ISO date string, YYYY-MM-DD */
  date: string
  /** One-line teaser for the rail / index */
  teaser: string
  /** Plain paragraphs for the note body */
  body: readonly string[]
}

export const NOTES: readonly Note[] = [
  {
    slug: 'agents-that-ship',
    title: 'agents that ship',
    date: '2026-07-18',
    teaser: 'the boring parts of multi-agent systems are the ones that matter.',
    body: [
      'most agent demos skip the parts that keep a system alive in production: tool gating, cost attribution, rollback when a write fails, and a way to watch the dag move without guessing.',
      'at omni i spent more time on those than on prompts. topological sort, cycle detection, parallel tiers, websocket streaming so the ui could show pending → running → completed. ambient agents on a separate scheduler that push without being asked.',
      'the lesson that stuck: if you cannot explain what an agent did and what it cost, you do not have a product yet. you have a demo with a bill.',
    ],
  },
  {
    slug: 'mcp-five-weeks-in',
    title: 'building mcp five weeks in',
    date: '2026-06-02',
    teaser: 'shipping a protocol while it is still wet cement.',
    body: [
      'we built an mcp server and client while the protocol was about five weeks old. schema generation had to be dynamic. tool calls needed a mandatory reason parameter so speculative use left an audit trail.',
      'prerequisite chains and attribute matrix filtering kept the agent from calling things out of order. none of that was glamorous. all of it was load-bearing.',
      'early protocols reward people who read the source and ship anyway. waiting for the ecosystem to settle is how you end up with someone else\'s defaults.',
    ],
  },
  {
    slug: 'terminal-tools',
    title: 'why everything ends up in the terminal',
    date: '2026-05-12',
    teaser: 'clis are honest about what they cost you.',
    body: [
      'podspawn, dcon, ergo, furl, nx. half of these started as a joke and stayed because a one-binary install is still the best ux i know.',
      'a terminal tool has nowhere to hide. no onboarding carousel, no empty state illustration. if the flag names are wrong, you feel it on the first run.',
      'that constraint is why i keep coming back. shipping a small cli is the fastest way i know to find out whether an idea is sharp.',
    ],
  },
  {
    slug: 'local-extraction',
    title: 'extract locally when you can',
    date: '2026-04-20',
    teaser: '85-95% of entity extraction without an llm round trip.',
    body: [
      'the knowledge-graph pipeline at omni ran seven nats stages. most entity extraction happened locally through gliner onnx. no api call, no token bill, no latency spike when the model provider had a bad day.',
      'confidence gating at 0.65 sent the hard cases upstairs. everything else stayed on the machine. hybrid retrieval on weaviate finished the loop.',
      'cloud models are great. paying them to do work a small local model already does well is not.',
    ],
  },
  {
    slug: 'model-routing',
    title: 'not every task needs the expensive model',
    date: '2026-02-14',
    teaser: 'route by task complexity, not by habit.',
    body: [
      'title generation, context summaries, and graph manipulation do not need the same model as a constraint-heavy recommendation.',
      'routing by task complexity made the expensive path legible. the cheap path got faster, and the benchmark stopped being a single number nobody trusted.',
      'the best model is the one that clears the task, the latency budget, and the invoice at the same time.',
    ],
  },
  {
    slug: 'local-first-by-default',
    title: 'local first is a product decision',
    date: '2026-01-19',
    teaser: 'privacy, latency, and cost are all part of the interface.',
    body: [
      'a local model is not only a cost optimization. it changes what can be shipped, what can be debugged, and what happens when the network is having a bad day.',
      'the useful pattern is not local versus cloud. it is local for the common path, cloud for the hard cases, and a clear reason for every escalation.',
      'users do not care which model answered. they care that the answer arrived and their data stayed where they expected.',
    ],
  },
  {
    slug: 'debugging-the-dag',
    title: 'make the graph visible',
    date: '2025-12-08',
    teaser: 'observability is part of the agent experience.',
    body: [
      'when an orchestrator runs eight agents in parallel, a final answer is not enough to explain what happened.',
      'pending, running, completed, and failed are product states. streaming them to the ui turns a black box into something a user can reason about.',
      'the graph is not decoration. it is the shortest path from a surprising result to a useful bug report.',
    ],
  },
  {
    slug: 'small-tools',
    title: 'small tools are still serious work',
    date: '2025-10-26',
    teaser: 'a tiny surface area makes bad decisions obvious.',
    body: [
      'a one-binary cli has nowhere to hide. installation, defaults, error messages, and help text are the whole product.',
      'that constraint is useful. it forces the first run to teach the user what matters without a tour, a dashboard, or a second service.',
      'small does not mean casual. it means every decision is closer to the surface.',
    ],
  },
  {
    slug: 'year-in-dots',
    title: 'a year measured in dots',
    date: '2026-03-08',
    teaser: 'contribution graphs are a poor biography. still useful.',
    body: [
      'i keep two github accounts and one merged calendar. the grid does not tell you what shipped, only that something did.',
      'useful as a pulse check. dangerous as a scoreboard. the weeks that look empty are sometimes the ones where the hard design work happened offline.',
      'if you stare at the dots long enough you start optimizing for green. that is when it is time to close the tab.',
    ],
  },
]

export function getNote(slug: string): Note | undefined {
  return NOTES.find((n) => n.slug === slug)
}

export function getAllNotes(): readonly Note[] {
  return [...NOTES].sort((a, b) => (a.date < b.date ? 1 : -1))
}
