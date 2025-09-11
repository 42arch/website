import { transformerMetaHighlight } from '@shikijs/transformers'
import { highlight } from 'fumadocs-core/highlight'
import * as Base from 'fumadocs-ui/components/codeblock'

// Types
export interface CodeBlockProps {
  code: string
  wrapper?: Base.CodeBlockProps
  lang: string
  highlightLines?: string
}

interface GithubCodeBlockProps {
  url: string
  extractLines?: boolean
  highlightLines?: string
  wrapper?: Base.CodeBlockProps
}

interface GitHubReference {
  rawUrl: string
  fromLine?: number
  toLine?: number
  highlightLines?: string
}

// Helper functions
function formatHighlightLines(highlightLines?: string): string | undefined {
  if (!highlightLines)
    return undefined
  return highlightLines.startsWith('{') && highlightLines.endsWith('}')
    ? highlightLines
    : `{${highlightLines}}`
}

function getLanguageFromUrl(url: string): string {
  try {
    return url.split('.').pop()?.toLowerCase() || ''
  }
  catch {
    return ''
  }
}

function parseGitHubUrl(url: string): GitHubReference {
  try {
    // Split the URL to separate the line reference part
    const [githubUrl, loc] = url.split('#')

    if (!githubUrl) {
      throw new Error('Invalid GitHub URL')
    }

    // Initialize line reference variables
    let fromLine: number | undefined
    let toLine: number | undefined
    let highlightLines: string | undefined

    // Parse line references if present
    if (loc) {
      const lineParts = loc.split('-')

      if (lineParts[0]?.startsWith('L')) {
        fromLine = Number.parseInt(lineParts[0].slice(1), 10) - 1

        if (lineParts[1]?.startsWith('L')) {
          toLine = Number.parseInt(lineParts[1].slice(1), 10) - 1
        }
        else {
          toLine = fromLine
        }

        // Always generate highlight lines from location
        // These will be used if no explicit highlightLines prop is provided
        if (fromLine !== undefined && toLine !== undefined) {
          const startLine = fromLine + 1
          const endLine = toLine + 1
          highlightLines
            = startLine === endLine
              ? `{${startLine}}`
              : `{${startLine}-${endLine}}`
        }
      }
    }

    // Parse GitHub URL to create raw URL
    const urlObj = new URL(githubUrl)
    const pathParts = urlObj.pathname.split('/').slice(1)

    if (pathParts.length < 5) {
      throw new Error('Invalid GitHub repository path')
    }

    const [org, repo, _, branch, ...pathSeg] = pathParts

    if (!org || !repo || !branch || pathSeg.length === 0) {
      throw new Error('Missing required GitHub path components')
    }

    // Create reference object with raw URL and line info
    return {
      rawUrl: `https://raw.githubusercontent.com/${org}/${repo}/${branch}/${pathSeg.join('/')}`,
      fromLine,
      toLine,
      highlightLines,
    }
  }
  catch (error) {
    console.error('Error parsing GitHub URL:', error)
    throw new Error(
      `Invalid GitHub URL: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

async function fetchCode(url: string, fromLine?: number, toLine?: number) {
  try {
    const response = await fetch(url, { cache: 'force-cache' })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch code: ${response.status} ${response.statusText}`,
      )
    }

    const content = await response.text()

    // Return full content if no line numbers are specified
    if (fromLine === undefined || toLine === undefined) {
      return content
    }

    // Extract specific lines
    const lines = content.split('\n')
    const selectedLines = lines.slice(fromLine, toLine + 1)

    if (selectedLines.length === 0) {
      return content
    }

    // Calculate common indentation to remove
    const commonIndent = selectedLines.reduce(
      (indent: number, line: string) => {
        if (line.length === 0)
          return indent
        const spaces = line.match(/^\s+/)
        return spaces ? Math.min(indent, spaces[0].length) : 0
      },
      Infinity,
    )

    // Remove common indentation and join lines
    return selectedLines
      .map((line) => {
        if (line.length === 0)
          return line
        return line.slice(commonIndent < Infinity ? commonIndent : 0)
      })
      .join('\n')
  }
  catch (error) {
    console.error('Error fetching code:', error)
    return `// Error fetching code: ${error instanceof Error ? error.message : String(error)}`
  }
}

// Components
export async function CodeBlock({
  code,
  lang,
  wrapper,
  highlightLines,
}: CodeBlockProps) {
  const rendered = await highlight(code, {
    lang,
    meta: highlightLines ? { __raw: highlightLines } : undefined,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    components: {
      pre: Base.Pre,
    },
    transformers: [transformerMetaHighlight()],
  })

  return <Base.CodeBlock {...wrapper}>{rendered}</Base.CodeBlock>
}

export default async function GithubCodeBlock({
  url,
  extractLines = false,
  highlightLines,
  wrapper,
}: GithubCodeBlockProps) {
  try {
    // Validate GitHub URL
    if (!url.includes('github.com')) {
      throw new Error('This component only supports GitHub URLs')
    }

    // Parse GitHub URL to get raw URL and line info
    const reference = parseGitHubUrl(url)

    // Format highlight lines for Shiki
    // Priority: explicitly provided highlightLines prop > lines from URL loc
    const formattedHighlightLines = formatHighlightLines(
      highlightLines || reference.highlightLines,
    )

    // Fetch the code content, extracting specific lines if needed
    const code = await fetchCode(
      reference.rawUrl,
      extractLines ? reference.fromLine : undefined,
      extractLines ? reference.toLine : undefined,
    )

    const lang = getLanguageFromUrl(reference.rawUrl)

    return (
      <CodeBlock
        lang={lang}
        code={code}
        highlightLines={formattedHighlightLines}
        wrapper={wrapper}
      />
    )
  }
  catch (error) {
    console.error('Error in GithubCodeBlock:', error)
    return (
      <CodeBlock
        lang="text"
        code={`// Error: ${error instanceof Error ? error.message : String(error)}`}
        wrapper={wrapper}
      />
    )
  }
}
