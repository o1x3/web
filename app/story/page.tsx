import type { Metadata } from 'next'
import { AppChrome } from '../components/layout/AppChrome'
import { NotesRail } from '../components/sections/HomeSections'
import { PERSONAL_INFO, PUBLICATION, EDUCATION } from '../data'

export const metadata: Metadata = {
  title: 'story | karthik vinayan',
  description:
    'who i am now and how i got here, from a college robot to ai at clueso.',
  alternates: { canonical: '/story' },
}

export default function StoryPage() {
  return (
    <AppChrome rail={<NotesRail />}>
      <header className="page-header">
        <h1 className="page-title">story</h1>
      </header>

      <section className="prose-section" aria-label="Now">
        <h2 className="prose-heading">now</h2>
        <div className="prose">
          <p>
            i&apos;m an applied ai engineer at{' '}
            <a href="https://clueso.io" target="_blank" rel="noopener noreferrer">
              clueso
            </a>{' '}
            (yc w23) in bengaluru. we make product videos and docs with ai,
            increasingly end to end: agents that study your product, script
            it, record it in a real browser, and re-render when the code
            changes.
          </p>
          <p>
            most of what i know comes from shipping agents to production and
            building the infra underneath them. the rest comes from small
            tools nobody asked for.
          </p>
        </div>
      </section>

      <section className="prose-section" aria-label="The deep end">
        <h2 className="prose-heading">the deep end</h2>
        <div className="prose">
          <p>
            straight out of college i joined omni rpa as the founding ai
            engineer and got handed the fun kind of problem: build the entire
            ai backend for a cloud automation platform, from nothing.
          </p>
          <p>
            that turned into a multi-agent dag orchestrator with eight agent
            types, an mcp server built while the protocol was five weeks old,
            a knowledge-graph and rag stack that did most of its entity
            extraction locally, semantic memory on pgvector, a fine-tuned
            model for constraint extraction, and the otel plumbing to know
            what all of it cost. i was also primary on-call, which is a very
            effective way to learn which of your ideas were bad.
          </p>
        </div>
      </section>

      <section className="prose-section" aria-label="How it started">
        <h2 className="prose-heading">how it started</h2>
        <div className="prose">
          <p>
            b.tech at {EDUCATION[0].institutionShort.toLowerCase()}, ai &amp; ml
            specialization. the part that actually mattered: leading a team
            that built an autonomous medicine-delivery robot for hospitals.
            raspberry pi, obstacle detection, path following, rfid room
            identification. it ended up published in{' '}
            <a href={PUBLICATION.doiUrl} target="_blank" rel="noopener noreferrer">
              springer lnns
            </a>
            . somewhere in between i spent a research winter fine-tuning yolov8
            to tell ripe crops from unripe ones, and it shipped to production
            at digital university kerala.
          </p>
        </div>
      </section>

      <section className="prose-section" aria-label="Off the clock">
        <h2 className="prose-heading">off the clock</h2>
        <div className="prose">
          <p>
            i ship small tools compulsively. a docker clone for macos started
            as an overnight bet and ended up on homebrew. most of what i make
            lives in the terminal, because that&apos;s where i live too.
          </p>
          <p>
            when i&apos;m not doing that: sending indie devs unreasonably
            detailed product feedback on{' '}
            <a href={PERSONAL_INFO.x.url} target="_blank" rel="noopener noreferrer">
              x
            </a>
            , and watching football. lamine yamal will win everything, you
            heard it here.
          </p>
        </div>
      </section>
    </AppChrome>
  )
}
