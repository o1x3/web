'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

const source = `# escalate only what the span model isn't sure about
def extract(chunk: str) -> list[Entity]:
    spans = gliner.predict(chunk)
    sure = [s for s in spans if s.score >= 0.65]
    if len(sure) < len(spans):
        return sure + llm.extract(chunk, hint="entities")
    return sure`

function highlight(line: string): ReactNode {
  if (line.startsWith('#')) return <span className="code-comment">{line}</span>
  return line.split(/(\b(?:def|for|in|if|return)\b|"[^"]*"|\b0\.65\b)/g).map((part, index) => /^(def|for|in|if|return)$/.test(part) ? <b key={index}>{part}</b> : part.startsWith('"') ? <span key={index} className="code-string">{part}</span> : part === '0.65' ? <strong key={index}>{part}</strong> : part)
}

export function CodeBlock({ code = source, filename = 'extract.py', language = 'python', highlightLine = 6 }: { code?: string; filename?: string; language?: string; highlightLine?: number }) {
  const [status, setStatus] = useState('copy')
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setStatus('copied') }
    catch { setStatus('select to copy') }
    window.setTimeout(() => setStatus('copy'), 2000)
  }
  return <figure className="code-block"><figcaption><span>{filename}</span><span className="code-actions"><span>{language}</span><button type="button" onClick={copy} aria-label="Copy code" aria-live="polite">{status}</button></span></figcaption><pre><code>{code.split('\n').map((line, index) => <span key={index} className={`code-line${index + 1 === highlightLine ? ' code-line-highlight' : ''}`}><span className="code-number" aria-hidden="true">{index + 1}</span><span>{language === 'python' ? highlight(line) : line}</span>{'\n'}</span>)}</code></pre></figure>
}
