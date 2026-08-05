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
    teaser: 'The boring parts of multi-agent systems are the ones that matter.',
    body: [
      'Most agent demos skip the parts that keep a system alive in production: tool gating, cost attribution, rollback when a write fails, and a way to watch the DAG move without guessing.',
      'At Omni I spent more time on those than on prompts. Topological sort, cycle detection, parallel tiers, WebSocket streaming so the UI could show pending → running → completed. Ambient agents on a separate scheduler that push without being asked.',
      'The lesson that stuck: if you cannot explain what an agent did and what it cost, you do not have a product yet. You have a demo with a bill.',
    ],
  },
  {
    slug: 'mcp-five-weeks-in',
    title: 'building MCP five weeks in',
    date: '2026-06-02',
    teaser: 'Shipping a protocol while it is still wet cement.',
    body: [
      'We built an MCP server and client while the protocol was about five weeks old. Schema generation had to be dynamic. Tool calls needed a mandatory reason parameter so speculative use left an audit trail.',
      'Prerequisite chains and attribute matrix filtering kept the agent from calling things out of order. None of that was glamorous. All of it was load-bearing.',
      'Early protocols reward people who read the source and ship anyway. Waiting for the ecosystem to settle is how you end up with someone else\'s defaults.',
    ],
  },
  {
    slug: 'terminal-tools',
    title: 'why everything ends up in the terminal',
    date: '2026-05-12',
    teaser: 'CLIs are honest about what they cost you.',
    body: [
      'podspawn, dcon, ergo, furl, nx — half of these started as a joke and stayed because a one-binary install is still the best UX I know.',
      'A terminal tool has nowhere to hide. No onboarding carousel, no empty state illustration. If the flag names are wrong, you feel it on the first run.',
      'That constraint is why I keep coming back. Shipping a small CLI is the fastest way I know to find out whether an idea is sharp.',
    ],
  },
  {
    slug: 'local-extraction',
    title: 'extract locally when you can',
    date: '2026-04-20',
    teaser: '85–95% of entity extraction without an LLM round trip.',
    body: [
      'The knowledge-graph pipeline at Omni ran seven NATS stages. Most entity extraction happened locally through GLiNER ONNX — no API call, no token bill, no latency spike when the model provider had a bad day.',
      'Confidence gating at 0.65 sent the hard cases upstairs. Everything else stayed on the machine. Hybrid retrieval on Weaviate finished the loop.',
      'Cloud models are great. Paying them to do work a small local model already does well is not.',
    ],
  },
  {
    slug: 'year-in-dots',
    title: 'a year measured in dots',
    date: '2026-03-08',
    teaser: 'Contribution graphs are a poor biography. Still useful.',
    body: [
      'I keep two GitHub accounts and one merged calendar. The grid does not tell you what shipped, only that something did.',
      'Useful as a pulse check. Dangerous as a scoreboard. The weeks that look empty are sometimes the ones where the hard design work happened offline.',
      'If you stare at the dots long enough you start optimizing for green. That is when it is time to close the tab.',
    ],
  },
]

export function getNote(slug: string): Note | undefined {
  return NOTES.find((n) => n.slug === slug)
}

export function getAllNotes(): readonly Note[] {
  return [...NOTES].sort((a, b) => (a.date < b.date ? 1 : -1))
}
