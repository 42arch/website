export interface ClientEnvironment {
  browser: string | null
  operatingSystem: string | null
  language: string
}

export function detectClientEnvironment(): ClientEnvironment {
  if (typeof window === 'undefined')
    return { browser: null, operatingSystem: null, language: 'unknown' }

  const { language, userAgent } = window.navigator
  let browser: string | null = null
  let operatingSystem: string | null = null

  if (/Edg\//.test(userAgent))
    browser = 'Microsoft Edge'
  else if (/OPR\//.test(userAgent))
    browser = 'Opera'
  else if (/Firefox\//.test(userAgent))
    browser = 'Mozilla Firefox'
  else if (/Chrome\//.test(userAgent))
    browser = 'Google Chrome'
  else if (/Safari\//.test(userAgent))
    browser = 'Safari'

  if (/Windows NT/.test(userAgent))
    operatingSystem = 'Windows'
  else if (/Android/.test(userAgent))
    operatingSystem = 'Android'
  else if (/iPhone|iPad|iPod/.test(userAgent))
    operatingSystem = 'iOS / iPadOS'
  else if (/Macintosh|Mac OS X/.test(userAgent))
    operatingSystem = 'macOS'
  else if (/Linux/.test(userAgent))
    operatingSystem = 'Linux'

  return { browser, operatingSystem, language }
}
