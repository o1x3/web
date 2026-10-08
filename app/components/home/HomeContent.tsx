'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

type Category = 'agents' | 'infra' | 'tools'
type Project = { name: string; description: string; url: string }

const projects: Record<Category, Project[]> = {
  agents: [
    { name: 'juno', description: 'terminal coding agent · plan / exec · wip', url: 'https://github.com/o1x3/juno' },
    { name: 'ergo', description: 'local-first ai code reviewer · ts', url: 'https://github.com/o1x3/ergo' },
  ],
  infra: [
    { name: 'podspawn', description: 'one-command dev envs, local or over ssh · go', url: 'https://podspawn.dev' },
    { name: 'dcon', description: 'docker on apple container · go', url: 'https://github.com/o1x3/dcon' },
  ],
  tools: [
    { name: 'furl', description: 'http client · rust', url: 'https://github.com/o1x3/furl' },
    { name: 'hn', description: 'hacker news client · next.js', url: 'https://github.com/o1x3/hn-web' },
    { name: 'tenso', description: 'api client · tauri 2 + solidjs', url: 'https://github.com/PatchPerson/Tenso' },
    { name: 'ruff#23537', description: 'rule d420, docstring order', url: 'https://github.com/astral-sh/ruff/pull/23537' },
    { name: 'xh#450', description: 'pretty-print xml', url: 'https://github.com/ducaale/xh/pull/450' },
    { name: 'coreutils#10974', description: 'rm: permission denied', url: 'https://github.com/uutils/coreutils/pull/10974' },
  ],
}

const omniWork = [
  'mcp server + client, protocol 5 weeks old',
  'dag multi-agent orchestrator, 8 agent types',
  '8 ambient agents on their own scheduler',
  'knowledge graph + rag on a nats pipeline',
  'fine-tuned gguf for constraint extraction',
  'model routing by task complexity',
  'semantic memory on postgres + pgvector',
  'otel tracing, per-agent cost attribution',
  'first enterprise client, pre-launch',
  '3–5 repos end to end, primary on-call',
]

export function HomeContent() {
  const [active, setActive] = useState<Category | null>(null)
  const [mobile, setMobile] = useState(false)
  const [omniOpen, setOmniOpen] = useState(false)
  const [omniPinned, setOmniPinned] = useState(false)
  const [panelPosition, setPanelPosition] = useState({ top: 0, left: 0 })
  const triggers = useRef<Partial<Record<Category, HTMLButtonElement | null>>>({})
  const panel = useRef<HTMLDivElement>(null)
  const omni = useRef<HTMLButtonElement>(null)
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const swipeStart = useRef<number | null>(null)
  const activeCategory = useRef<Category | null>(null)
  const suppressFocus = useRef(false)
  activeCategory.current = active

  const keepPanel = useCallback(() => clearTimeout(dismissTimer.current), [])
  const closePanel = useCallback((restore = false) => {
    keepPanel()
    const previous = activeCategory.current
    setActive(null)
    if (restore && previous) {
      suppressFocus.current = true
      triggers.current[previous]?.focus({ preventScroll: true })
      suppressFocus.current = false
    }
  }, [keepPanel])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 700px)')
    const update = () => { setMobile(media.matches); setActive(null) }
    setMobile(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const page = document.querySelector('.home-page')
    page?.classList.toggle('home-omni-expanded', omniOpen)
    return () => page?.classList.remove('home-omni-expanded')
  }, [omniOpen])

  useEffect(() => {
    if (!active) return
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closePanel(true) }
      if (mobile && event.key === 'Tab') {
        const elements = panel.current?.querySelectorAll<HTMLElement>('a,button')
        if (!elements?.length) return
        const first = elements[0], last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    const outside = (event: PointerEvent) => {
      const target = event.target as Node
      if (!panel.current?.contains(target) && !Object.values(triggers.current).some(trigger => trigger?.contains(target))) closePanel(mobile)
    }
    const focusOutside = (event: FocusEvent) => {
      if (mobile) return
      const target = event.target as Node
      if (!panel.current?.contains(target) && !Object.values(triggers.current).some(trigger => trigger?.contains(target))) closePanel()
    }
    document.addEventListener('keydown', keydown)
    document.addEventListener('pointerdown', outside)
    document.addEventListener('focusin', focusOutside)
    if (mobile) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      panel.current?.querySelector<HTMLElement>('button')?.focus()
      return () => {
        document.body.style.overflow = previousOverflow
        document.removeEventListener('keydown', keydown)
        document.removeEventListener('pointerdown', outside)
        document.removeEventListener('focusin', focusOutside)
      }
    }
    return () => {
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('focusin', focusOutside)
    }
  }, [active, mobile, closePanel])

  useEffect(() => () => clearTimeout(dismissTimer.current), [])

  useLayoutEffect(() => {
    if (!active || mobile) return
    const position = () => {
      const trigger = triggers.current[active]?.getBoundingClientRect()
      const page = document.querySelector('.home-page')?.getBoundingClientRect()
      if (trigger && page) setPanelPosition({ top: trigger.bottom - page.top + 12 + ['agents', 'infra', 'tools'].indexOf(active), left: Math.min(trigger.left - page.left, page.width - (active === 'tools' ? 620 : 500) - 56) })
    }
    position()
    window.addEventListener('resize', position)
    return () => window.removeEventListener('resize', position)
  }, [active, mobile])

  const open = (category: Category) => { keepPanel(); setActive(category) }
  const enterPanel = (category: Category) => {
    open(category)
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('a')?.focus())
  }
  const leave = () => {
    keepPanel()
    if (!mobile) dismissTimer.current = setTimeout(() => {
      const focused = document.activeElement
      const category = activeCategory.current
      if (!panel.current?.contains(focused) && !(category && triggers.current[category]?.contains(focused))) closePanel()
    }, 180)
  }
  const expandOmni = () => {
    closePanel()
    setOmniOpen(true)
    setOmniPinned(true)
    requestAnimationFrame(() => omni.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
  }

  const word = (text: string, weight: number, category?: Category) => {
    const label = category === 'tools' ? '6 things' : '2 things'
    const className = `hero-word${category ? ' hero-word-interactive' : ''}${category && active === category ? ' hero-word-active' : ''}`
    const content = <><span className="hero-word-text" style={{ fontWeight: category && active === category ? 800 : weight }}>{text}</span><span className="hero-word-caption">{category && active === category ? category === 'tools' ? '800 · already there' : `${weight} → 800` : `${weight}${category ? ` · ${label} ↗` : ''}`}</span></>
    return category ? <button type="button" className={className} key={text} ref={element => { triggers.current[category] = element }} aria-expanded={active === category} aria-controls="home-project-panel" aria-haspopup="dialog" onPointerEnter={event => { if (!mobile && event.pointerType !== 'touch') open(category) }} onPointerLeave={leave} onFocus={() => { if (!mobile && !suppressFocus.current) open(category) }} onKeyDown={event => { if (!mobile && ['ArrowDown', 'Enter', ' '].includes(event.key)) { event.preventDefault(); enterPanel(category) } }} onClick={() => active === category && mobile ? closePanel() : open(category)}>{content}</button> : <span className={className} key={text}>{content}</span>
  }

  const title = active === 'agents' ? 'agents · 2' : active === 'infra' ? 'infra · 2' : 'dev tools · 3 built · 3 upstream'
  const projectLink = (project: Project, column = false) => <a key={project.name} href={project.url} target="_blank" rel="noopener noreferrer" className={column ? 'project-column-link' : 'project-row'}><span className="project-info"><span className="project-name">{project.name}{column && ' ↗'}</span><span className="project-description">{mobile && project.name === 'juno' ? 'terminal coding agent · wip' : project.description}</span></span>{!column && <span className="project-arrow" aria-hidden="true">↗</span>}</a>

  return <div className={`home-content${active ? ` home-project-active home-project-active-${active}` : ''}${omniOpen ? ' home-omni-active' : ''}`}>
    <h1 className="home-hero" aria-label="i build agents, infra & dev tools.">
      <span className="hero-first-line"><span className="hero-intro">{word('i', 100)}{word('build', 200)}</span>{word('agents,', 300, 'agents')}</span>
      <span className="hero-line">{word('infra', 400, 'infra')}{word('&', 500)}</span>
      <span className="hero-line hero-tools-line">{word('dev tools.', 800, 'tools')}</span>
    </h1>
    <section className="home-experience" aria-label="Experience">
      <article className="home-job home-job-current"><h2 className="job-title"><a href="https://clueso.io" target="_blank" rel="noopener noreferrer">clueso</a></h2><p className="job-caption">800 · applied ai engineer · yc w23</p><p className="job-description">ai that turns screen recordings into product videos and step-by-step docs.</p></article>
      <article className={`home-job home-job-omni${omniOpen ? ' home-job-expanded' : ''}`} onPointerEnter={event => { if (!mobile && event.pointerType !== 'touch') { setOmniOpen(true); closePanel() } }} onPointerLeave={() => { if (!mobile && !omniPinned && !omni.current?.contains(document.activeElement)) setOmniOpen(false) }}>
        <h2 className="job-title"><button type="button" ref={omni} aria-expanded={omniOpen} aria-controls="omni-work" onClick={() => { setOmniOpen(!omniOpen); setOmniPinned(!omniOpen) }} onFocus={() => { if (!mobile) setOmniOpen(true) }} onBlur={event => { if (!mobile && !omniPinned && !event.currentTarget.parentElement?.parentElement?.contains(event.relatedTarget)) setOmniOpen(false) }} onKeyDown={event => { if (event.key === 'Escape') { setOmniOpen(false); setOmniPinned(false) } }}>omni rpa</button></h2>
        <p className="job-caption">{omniOpen ? '500 → 800' : '500'} · founding ai engineer · &apos;24–&apos;26</p>
        {omniOpen ? <div className="job-description omni-work" id="omni-work"><ul>{omniWork.map(item => <li key={item}>— {item}</li>)}</ul><p className="omni-companies">omni rpa inc ↳ agentic solutions</p></div> : <p className="job-description" id="omni-work">mcp server + client from scratch, a dag multi-agent orchestrator, knowledge graph + rag, semantic memory on pgvector.</p>}
        <button type="button" className="omni-mobile-toggle" aria-expanded={omniOpen} aria-controls="omni-work" onClick={() => { setOmniOpen(!omniOpen); setOmniPinned(!omniOpen) }}>{omniOpen ? 'tap to fold ↑' : 'tap for all 10 ↓'}</button>
      </article>
      <article className="home-job home-job-old"><h2 className="job-title">duk kerala</h2><p className="job-caption">200 · research intern · &apos;23</p><p className="job-description">real-time crop ripeness detection, yolov8 fine-tuned on an agricultural dataset.</p></article>
    </section>
    {active && <><div className="project-sheet-dismiss" onClick={() => closePanel(true)} aria-hidden="true" /><div ref={panel} id="home-project-panel" role="dialog" aria-modal={mobile ? true : undefined} aria-label={title} style={mobile ? undefined : panelPosition} className={`home-project-panel home-project-panel-${active}`} onPointerEnter={keepPanel} onPointerLeave={leave} onTouchStart={event => { swipeStart.current = event.touches[0].clientY }} onTouchEnd={event => { if (swipeStart.current !== null && event.changedTouches[0].clientY - swipeStart.current > 60) closePanel(true); swipeStart.current = null }}>
      <div className="project-panel-heading"><span>{title}</span><button type="button" onClick={() => closePanel(true)} className="project-panel-close"><span className="desktop-panel-close">esc to close</span><span className="mobile-panel-close">swipe down ↓</span></button></div>
      {active === 'tools' ? <div className="project-columns">{['built', 'upstream'].map((label, index) => <div className="project-column" key={label}><span className="project-column-label">{label}</span>{projects.tools.slice(index * 3, index * 3 + 3).map(project => projectLink(project, true))}</div>)}</div> : <>{projects[active].map(project => projectLink(project))}<button type="button" className="project-panel-note" onClick={expandOmni}>{active === 'agents' ? '+ the agent work at omni rpa ↓' : '+ mcp, knowledge graphs at omni rpa ↓'}</button></>}
    </div></>}
  </div>
}
