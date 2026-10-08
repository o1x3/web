import type { MDXComponents } from 'mdx/types'
import { isValidElement, type ComponentPropsWithoutRef } from 'react'
import { Callout, PullQuote, Disclosure, ArticleDivider } from './app/components/writing/ArticleElements'
import { CodeBlock } from './app/components/writing/CodeBlock'

const Heading2 = ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => <h2 {...props}><span className="heading-marker" aria-hidden="true">##</span>{children}</h2>
const Heading3 = ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => <h3 {...props}><span className="heading-marker" aria-hidden="true">###</span>{children}</h3>
const Heading4 = ({ children, ...props }: ComponentPropsWithoutRef<'h4'>) => <h4 {...props}><span className="heading-marker" aria-hidden="true">####</span>{children}</h4>
const FencedCode = ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
  if (isValidElement<{ children?: unknown; className?: string }>(children) && typeof children.props.children === 'string') {
    const language = children.props.className?.replace(/^language-/, '') || 'text'
    return <CodeBlock code={children.props.children.replace(/\n$/, '')} language={language} filename={`${language} snippet`} highlightLine={0} />
  }
  return <pre {...props}>{children}</pre>
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { h2: Heading2, h3: Heading3, h4: Heading4, pre: FencedCode, Callout, PullQuote, Disclosure, ArticleDivider, CodeBlock, ...components }
}
