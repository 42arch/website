import type { MDXComponents } from 'mdx/types'
import { File, Files, Folder } from 'fumadocs-ui/components/files'
import defaultMdxComponents from 'fumadocs-ui/mdx'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    File,
    Files,
    Folder,
  }
}

export const useMDXComponents = getMDXComponents
