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
  const module = { exports: {} }
  const context = {
    module,
    exports: module.exports,
    require(name) {
      if (name === '../lib/posts') return { posts }
      if (['react/jsx-runtime', '../components/layout', '../components/writing/WritingIndex', '../writing.css'].includes(name)) return {}
      throw new Error(`Unexpected index import: ${name}`)
    },
  }
  vm.runInNewContext(outputText, context, { filename: 'writing/page.tsx' })
  return module.exports.metadata
}

const fixtures = [
  { name: 'empty writing stays out of search', posts: [], index: false },
  { name: 'design samples stay out of search', posts: [{ sample: true }, { sample: true }], index: false },
  { name: 'a published post makes a mixed writing index discoverable', posts: [{ sample: true }, { sample: false }], index: true },
  { name: 'published writing is discoverable', posts: [{ sample: false }], index: true },
]

for (const fixture of fixtures) {
  test(fixture.name, () => {
    const metadata = loadMetadata(fixture.posts)
    assert.equal(metadata.robots.index, fixture.index, 'general crawler indexing policy')
    assert.equal(metadata.robots.googleBot.index, fixture.index, 'Google indexing policy')
    assert.equal(metadata.robots.follow, true)
    assert.equal(metadata.robots.googleBot.follow, true)
    assert.equal(metadata.alternates.canonical, '/writing')
  })
}
