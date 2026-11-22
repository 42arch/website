import type { Metadata } from 'next'

export const siteUrl = 'https://starllow.com'
export const siteName = 'Starllow.OS'
export const siteDescription = 'Starllow 的个人工作台。'

export function articleDate(value?: string | null) {
  if (!value)
    return undefined

  const match = /^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/.exec(value)
  if (!match)
    return undefined

  const iso = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`
  const date = new Date(`${iso}T00:00:00.000Z`)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    alternates: { canonical: path },
    description,
    openGraph: {
      description,
      title,
      url: path,
    },
    title,
  }
}

export const noIndexMetadata: Metadata = {
  robots: { follow: true, index: false },
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
