import type { MDXComponents } from 'mdx/types'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import CodeDisplay from './code-display'
import GithubCodeBlock from './github-code-block'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),

    Tab,
    Tabs,
    Step,
    Steps,
    GithubCodeBlock,
    CodeDisplay,
    ...components,
  }
}

export const useMDXComponents = getMDXComponents
