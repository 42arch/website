import en from '../../../messages/en.json'
import zh from '../../../messages/zh.json'

const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;',
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => htmlEscapes[character] ?? character)
}

export function GET(request: Request) {
  const language = new URL(request.url).searchParams.get('lang') === 'en' ? 'en' : 'zh'
  const copy = language === 'en' ? en.pwa : zh.pwa

  const html = `<!doctype html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#eae6da">
  <title>Starllow.OS</title>
  <style>
    * { box-sizing: border-box; }
    body { min-height: 100vh; margin: 0; display: grid; place-items: center; padding: 24px; background: #eae6da; color: #1d1f27; font-family: system-ui, -apple-system, sans-serif; }
    main { width: min(100%, 420px); padding: 36px; text-align: center; border: 1px solid rgba(29, 31, 39, .08); border-radius: 12px; background: #f8f6f0; box-shadow: 0 18px 42px -12px rgba(24, 24, 20, .12); }
    img { width: 88px; height: 88px; }
    h1 { margin: 16px 0 8px; font-size: 24px; }
    p { margin: 0; color: #5a5e6b; line-height: 1.6; }
    a { display: inline-block; margin-top: 24px; padding: 10px 20px; border-radius: 6px; background: #f54e00; color: #fff; font-weight: 600; text-decoration: none; }
  </style>
</head>
<body>
  <main>
    <img src="/pwa/icon-192.png" alt="">
    <h1>${escapeHtml(copy.offlineTitle)}</h1>
    <p>${escapeHtml(copy.offlineDescription)}</p>
    <a href="/">${escapeHtml(copy.retry)}</a>
  </main>
</body>
</html>`

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
