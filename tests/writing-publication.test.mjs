import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const source = readFileSync(new URL('../app/writing/page.tsx', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
})

function loadMetadata(posts) {
  const pageModule = { exports: {} }
  const context = {
    module: pageModule,
    exports: pageModule.exports,
    require(name) {
      if (name === '../lib/posts') return { posts }
      if (['react/jsx-runtime', 'next/link', '../writing.css'].includes(name)) return {}
      throw new Error(`Unexpected index import: ${name}`)
    },
  }
  vm.runInNewContext(outputText, context, { filename: 'writing/page.tsx' })
  return pageModule.exports.metadata
}

function loadPage(posts) {
  const pageModule = { exports: {} }
  const jsx = (type, props) => ({ type, props: props ?? {} })
  const context = {
    module: pageModule,
    exports: pageModule.exports,
    require(name) {
      if (name === '../lib/posts') return { posts }
      if (name === 'next/link') return function Link(props) { return jsx('a', props) }
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' }
      if (name === '../writing.css') return {}
      throw new Error(`Unexpected index import: ${name}`)
    },
  }
  vm.runInNewContext(outputText, context, { filename: 'writing/page.tsx' })
  return pageModule.exports.default()
}

function textContent(node) {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  return textContent(node.props?.children)
}

const fixtures = [
  { name: 'empty writing stays out of search', posts: [], index: false },
  { name: 'published writing is discoverable', posts: [{ slug: 'real-post' }], index: true },
]

for (const fixture of fixtures) {
  test(fixture.name, () => {
    const metadata = loadMetadata(fixture.posts)
    assert.equal(metadata.robots.index, fixture.index, 'general crawler indexing policy')
    assert.equal(metadata.robots.googleBot?.index, fixture.index, 'Google indexing policy')
    assert.equal(metadata.robots.follow, true)
    assert.equal(metadata.alternates.canonical, '/writing')
  })
}

test('writing switches from soon to the published list', () => {
  const empty = loadPage([])
  assert.match(textContent(empty), /writingsoon/)

  const published = loadPage([{ slug: 'real-post', date: '2026-10-09', title: 'A real post' }])
  assert.doesNotMatch(textContent(published), /soon/)
  assert.match(textContent(published), /A real post/)
})
