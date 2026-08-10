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
