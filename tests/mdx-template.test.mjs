import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { evaluate } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import * as runtime from 'react/jsx-runtime'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useMDXComponents as articleComponents } from '../mdx-components'

const source = readFileSync(new URL('../app/writing/content/template.mdx', import.meta.url), 'utf8')
const { default: Template } = await evaluate(source, { ...runtime, remarkPlugins: [remarkGfm] })
const html = renderToStaticMarkup(createElement(Template, { components: articleComponents({}) }))
for (const pattern of [/<h2/, /<table/, /<aside class="article-callout/, /<blockquote class="pull-quote/, /<details/, /Copy code/, /id="user-content-fn-source"/, /example\(\):/]) assert.match(html, pattern)
assert.match(html, /href="https:\/\/github.com\/o1x3"/)
console.log('MDX template compiles with real components, GFM tables, code, and footnotes.')
