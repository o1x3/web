import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import ts from 'typescript'

// Run: node app/components/home/HomeContent.test.mjs
// Regression: click a category, leave it with the pointer, and keep its trigger
// focused. The panel must stay open; moving focus outside must dismiss it.
// ArrowDown must enter the projects and Escape must restore focus without reopening.
// This deterministic host exercises the real rendered controls without extra deps.
// Browser layout/accessibility are checked separately. Capture floating panels
// with viewport screenshots: full-page captures can resize across the mobile breakpoint.
const require = createRequire(import.meta.url)
const source = readFileSync(new URL('./HomeContent.tsx', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText
let cursor = 0, dirty = true, tree, now = 0
const hooks = [], effects = [], listeners = new Map(), timers = new Map(), nodes = new Map(), frames = []
let nextTimer = 0
const document = { activeElement: null, body: { style: {} }, querySelector: () => ({ classList: { toggle() {}, remove() {} }, getBoundingClientRect: () => ({ top: 0, left: 0, width: 1440 }) }), addEventListener: (type, fn) => { if (!listeners.has(type)) listeners.set(type, new Set()); listeners.get(type).add(fn) }, removeEventListener: (type, fn) => listeners.get(type)?.delete(fn) }
const emit = (type, event) => { for (const listener of [...(listeners.get(type) ?? [])]) listener(event) }
const effect = (fn, deps) => {
  const index = cursor++, previous = hooks[index]
  if (!previous || deps.some((value, i) => value !== previous.deps[i])) {
    hooks[index] = { deps, cleanup: previous?.cleanup }
    effects.push(() => { hooks[index].cleanup?.(); hooks[index].cleanup = fn() })
  }
}
const react = {
  useState(initial) { const index = cursor++; if (!(index in hooks)) hooks[index] = initial; return [hooks[index], next => { const value = typeof next === 'function' ? next(hooks[index]) : next; if (value !== hooks[index]) { hooks[index] = value; dirty = true } }] },
  useRef(initial) { const index = cursor++; return hooks[index] ??= { current: initial } },
  useCallback(fn) { cursor++; return fn }, useEffect: effect, useLayoutEffect: effect,
}
const jsx = (type, props, key) => ({ type, props: props ?? {}, key })
const componentModule = { exports: {} }
vm.runInNewContext(compiled, {
  module: componentModule, exports: componentModule.exports, require: name => name === 'react' ? react : name === 'react/jsx-runtime' ? { jsx, jsxs: jsx, Fragment: 'fragment' } : require(name),
  document, window: { matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }), addEventListener() {}, removeEventListener() {} },
  requestAnimationFrame: fn => frames.push(fn),
  setTimeout: (fn, delay) => { const id = ++nextTimer; timers.set(id, { fn, due: now + delay }); return id }, clearTimeout: id => timers.delete(id),
}, { filename: fileURLToPath(new URL('./HomeContent.tsx', import.meta.url)) })

function mount(element, parent = null) {
  if (Array.isArray(element)) return element.flatMap(child => mount(child, parent))
  if (!element || typeof element !== 'object') return []
  const id = element.props.id ?? `${element.type}:${element.key ?? element.props.href ?? element.props.className}`
  const node = nodes.get(id) ?? { contains(target) { while (target) { if (target === this) return true; target = target.parent } return false }, getBoundingClientRect: () => ({ bottom: 290, left: 539 }), focus() { document.activeElement = this; this.element.props.onFocus?.({}); emit('focusin', { target: this }) }, querySelector(selector) { return this.children.find(child => selector === 'button' ? child.element.type === 'button' : selector === 'a' ? child.element.type === 'a' : false) }, querySelectorAll() { return this.children.filter(child => ['a', 'button'].includes(child.element.type)) } }
  nodes.set(id, node)
  node.element = element; node.parent = parent
  if (typeof element.props.ref === 'function') element.props.ref(node)
  else if (element.props.ref) element.props.ref.current = node
  node.children = mount(element.props.children, node)
  return [node, ...node.children]
}
function flush() {
  let passes = 0
  while (dirty) {
    assert.ok(++passes < 20, 'render should settle')
    dirty = false; cursor = 0
    tree = componentModule.exports.HomeContent(); mount(tree)
    while (effects.length) effects.shift()()
  }
  while (frames.length) { frames.shift()(); if (dirty) flush() }
}
function advance(milliseconds) {
  now += milliseconds
  for (const [id, timer] of [...timers]) if (timer.due <= now) { timers.delete(id); timer.fn(); flush() }
}
function panelPresent() { return tree.props.children.flat(2).some(element => element?.props?.id === 'home-project-panel' || element?.props?.children?.some?.(child => child?.props?.id === 'home-project-panel')) }
flush()
const trigger = nodes.get('button:agents,')
trigger.focus(); trigger.element.props.onClick(); flush()
assert.equal(panelPresent(), true, 'click opens agents')
trigger.element.props.onPointerLeave(); advance(500)
assert.equal(panelPresent(), true, 'focused agents trigger keeps the panel open after pointer leave')
const unrelated = { parent: null }
document.activeElement = unrelated; emit('focusin', { target: unrelated }); flush(); advance(500)
assert.equal(panelPresent(), false, 'moving focus outside the trigger and panel dismisses it')
trigger.element.props.onKeyDown({ key: 'ArrowDown', preventDefault() {} }); flush()
assert.equal(document.activeElement.element.type, 'a', 'ArrowDown moves focus to the first project')
emit('keydown', { key: 'Escape', preventDefault() {} }); flush()
assert.equal(panelPresent(), false, 'Escape closes without focus reopening it')
assert.equal(document.activeElement, trigger, 'Escape restores the trigger')
console.log('Home panel click, focus, ArrowDown, and Escape regressions pass.')
