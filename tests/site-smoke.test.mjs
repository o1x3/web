import { test } from 'node:test'
import assert from 'node:assert/strict'

const origin = process.env.TEST_ORIGIN || 'http://localhost:3000'

async function html(path) {
  const response = await fetch(`${origin}${path}`)
  return { response, body: await response.text() }
}

test('CSP gives every executable script the response nonce', async () => {
  for (const path of ['/', '/writing', '/writing/everything-this-page-can-render']) {
    const { response, body } = await html(path)
    assert.equal(response.status, 200)
    const nonce = response.headers.get('content-security-policy')?.match(/'nonce-([^']+)'/)?.[1]
    assert.ok(nonce)
    const scripts = [...body.matchAll(/<script\b([^>]*)>/g)].map(match => match[1]).filter(attributes => !/type="application\/ld\+json"/.test(attributes))
    assert.ok(scripts.length > 1)
    for (const attributes of scripts) assert.ok(attributes.includes(`nonce="${nonce}"`), `${path}: executable script missing CSP nonce: ${attributes}`)
  }
})

test('MDX compiles semantic article content and review metadata', async () => {
  const { response, body } = await html('/writing/everything-this-page-can-render')
  assert.equal(response.status, 200)
  for (const pattern of [/<table/, /<blockquote/, /type="checkbox"/, /<details/, /<svg/, /id="note-1"/, /id="note-2"/, /name="robots" content="noindex/]) assert.match(body, pattern)
  assert.match(body, /rel="canonical" href="https:\/\/o1x3.com\/writing\/everything-this-page-can-render"/)
})

test('RSS, CV, and brand artwork are available', async () => {
  const expected = [['/writing/rss.xml', 'application/rss+xml'], ['/cv.pdf', 'application/pdf'], ['/brand/favicon-light.svg', 'image/svg+xml'], ['/brand/favicon-dark.svg', 'image/svg+xml'], ['/opengraph-image.png', 'image/png']]
  await Promise.all(expected.map(async ([path, type]) => {
    const response = await fetch(`${origin}${path}`)
    assert.equal(response.status, 200, path)
    assert.ok(response.headers.get('content-type')?.includes(type), path)
  }))
  const { body } = await html('/writing/rss.xml')
  assert.equal([...body.matchAll(/<item>/g)].length, 6)
})

test('unknown posts and unknown routes return the designed 404', async () => {
  for (const path of ['/writing/this-post-does-not-exist', '/this-page-does-not-exist']) {
    const { response, body } = await html(path)
    assert.equal(response.status, 404)
    assert.match(body, /404 — page not found/)
    assert.match(body, /back to the sentence/)
  }
})
