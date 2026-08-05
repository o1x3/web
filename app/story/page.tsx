import type { Metadata } from 'next'
import { AppChrome } from '../components/layout/AppChrome'
import { PERSONAL_INFO, PUBLICATION, EDUCATION } from '../data'

export const metadata: Metadata = {
  title: 'story | Karthik Vinayan',
  description:
    'Who I am now and how I got here, from a college robot to AI at Clueso.',
  alternates: { canonical: '/story' },
}

export default function StoryPage() {
  return (
    <AppChrome>
      <header className="page-header">
        <h1 className="page-title">story</h1>
      </header>

      <section className="prose-section" aria-label="Now">
        <h2 className="prose-heading">now</h2>
        <div className="prose">
          <p>
            I&apos;m an applied AI engineer at{' '}
            <a href="https://clueso.io" target="_blank" rel="noopener noreferrer">
              Clueso
            </a>{' '}
            (YC W23) in Bengaluru. We make product videos and docs with AI,
            increasingly end to end: agents that study your product, script
            it, record it in a real browser, and re-render when the code
            changes.
          </p>
          <p>
            Most of what I know comes from shipping agents to production and
            building the infra underneath them. The rest comes from small
            tools nobody asked for.
          </p>
        </div>
      </section>

      <section className="prose-section" aria-label="The deep end">
        <h2 className="prose-heading">the deep end</h2>
        <div className="prose">
          <p>
            Straight out of college I joined Omni RPA as the founding AI
            engineer and got handed the fun kind of problem: build the entire
            AI backend for a cloud automation platform, from nothing.
          </p>
          <p>
            That turned into a multi-agent DAG orchestrator with eight agent
            types, an MCP server built while the protocol was five weeks old,
            a knowledge-graph and RAG stack that did most of its entity
            extraction locally, semantic memory on pgvector, a fine-tuned
            model for constraint extraction, and the OTel plumbing to know
            what all of it cost. I was also primary on-call, which is a very
            effective way to learn which of your ideas were bad.
          </p>
        </div>
      </section>

      <section className="prose-section" aria-label="How it started">
        <h2 className="prose-heading">how it started</h2>
        <div className="prose">
          <p>
            B.Tech at {EDUCATION[0].institutionShort}, AI &amp; ML
            specialization. The part that actually mattered: leading a team
            that built an autonomous medicine-delivery robot for hospitals.
            Raspberry Pi, obstacle detection, path following, RFID room
            identification. It ended up published in{' '}
            <a href={PUBLICATION.doiUrl} target="_blank" rel="noopener noreferrer">
              Springer LNNS
            </a>
            . Somewhere in between I spent a research winter fine-tuning YOLOv8
            to tell ripe crops from unripe ones, and it shipped to production
            at Digital University Kerala.
          </p>
        </div>
      </section>

      <section className="prose-section" aria-label="Off the clock">
        <h2 className="prose-heading">off the clock</h2>
        <div className="prose">
          <p>
            I ship small tools compulsively. A docker clone for macOS started
            as an overnight bet and ended up on Homebrew. Most of what I make
            lives in the terminal, because that&apos;s where I live too.
          </p>
          <p>
            When I&apos;m not doing that: sending indie devs unreasonably
            detailed product feedback on{' '}
            <a href={PERSONAL_INFO.x.url} target="_blank" rel="noopener noreferrer">
              X
            </a>
            , and watching football. Lamine Yamal will win everything, you
            heard it here.
          </p>
        </div>
      </section>
    </AppChrome>
  )
}
