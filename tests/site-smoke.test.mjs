import { test } from 'node:test'
import assert from 'node:assert/strict'

const origin = process.env.TEST_ORIGIN || 'http://localhost:3000'

async function html(path) {
  const response = await fetch(`${origin}${path}`)
  return { response, body: await response.text() }
}

test('CSP gives every executable script the response nonce', async () => {
  for (const path of ['/', '/writing']) {
    const { response, body } = await html(path)
    assert.equal(response.status, 200)
    const nonce = response.headers.get('content-security-policy')?.match(/'nonce-([^']+)'/)?.[1]
    assert.ok(nonce)
    const scripts = [...body.matchAll(/<script\b([^>]*)>/g)].map(match => match[1]).filter(attributes => !/type="application\/ld\+json"/.test(attributes))
    assert.ok(scripts.length > 1)
    for (const attributes of scripts) assert.ok(attributes.includes(`nonce="${nonce}"`), `${path}: executable script missing CSP nonce: ${attributes}`)
  }
})

test('empty writing renders only its title and remains out of search', async () => {
  const { response, body } = await html('/writing')
  assert.equal(response.status, 200)
  assert.match(body, /<h1>writing<\/h1>/)
  assert.match(body, /name="robots" content="noindex/)
  assert.match(body, /name="googlebot" content="noindex/)
  assert.match(body, /rel="canonical" href="https:\/\/o1x3.com\/writing"/)
  const markup = body.split(/<body\b[^>]*>/)[1].split('</body>')[0]
  assert.doesNotMatch(markup, /<header\b|<footer\b|<nav\b|<ul\b|writing-filters|writing-row|no posts yet/)
})

test('RSS, CV, and brand artwork are available', async () => {
  const expected = [['/writing/rss.xml', 'application/rss+xml'], ['/cv.pdf', 'application/pdf'], ['/brand/favicon-light.svg', 'image/svg+xml'], ['/brand/favicon-dark.svg', 'image/svg+xml'], ['/opengraph-image.png', 'image/png']]
  await Promise.all(expected.map(async ([path, type]) => {
    const response = await fetch(`${origin}${path}`)
    assert.equal(response.status, 200, path)
    assert.ok(response.headers.get('content-type')?.includes(type), path)
  }))
  const { body } = await html('/writing/rss.xml')
  assert.match(body, /<rss version="2.0"/)
  assert.match(body, /<channel><title>Karthik Vinayan · writing<\/title>/)
  assert.match(body, /<atom:link href="https:\/\/o1x3.com\/writing\/rss.xml" rel="self"/)
  assert.equal([...body.matchAll(/<item>/g)].length, 0)
  assert.doesNotMatch(body, /sample|placeholder|five weeks into mcp/i)
})

test('social metadata points to the real share cards', async () => {
  const { body } = await html('/')
  assert.match(body, /name="twitter:card" content="summary_large_image"/)
  const imageOrigin = process.env.SOCIAL_IMAGE_ORIGIN || 'https://o1x3.com'
  for (const key of ['og:image', 'twitter:image']) {
    const value = body.match(new RegExp(`(?:property|name)="${key}" content="([^"]+)"`))?.[1]
    assert.ok(value, `${key} is present`)
    const image = new URL(value)
    assert.equal(image.origin, imageOrigin, `${key} uses the current deployment`)
    assert.equal(image.pathname, '/opengraph-image.png')
  }
  for (const path of ['/opengraph-image.png']) {
    const response = await fetch(`${origin}${path}`)
    const png = Buffer.from(await response.arrayBuffer())
    assert.equal(png.toString('ascii', 1, 4), 'PNG')
    assert.equal(png.readUInt32BE(16), 1200)
    assert.equal(png.readUInt32BE(20), 630)
  }
})

test('unknown posts and unknown routes return the designed 404', async () => {
  for (const path of ['/writing/this-post-does-not-exist', '/this-page-does-not-exist', '/writing/five-weeks-into-mcp', '/writing/entity-extraction-without-an-llm-call', '/writing/everything-this-page-can-render', '/story', '/stuff']) {
    const { response, body } = await html(path)
    assert.equal(response.status, 404)
    assert.match(body, /404 — page not found/)
    assert.match(body, /back to the sentence/)
  }
})
