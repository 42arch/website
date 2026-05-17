<div align="center">
  <img src="public/web-app-manifest-192x192.png" width="64" alt="Folio OS Logo" />
  <h1>Folio OS</h1>
  <p><strong>An experimental, high-fidelity developer workspace and portfolio, designed as a digital operating system.</strong></p>
  <img src="public/screenshot.png" width="800" alt="Folio OS Screenshot" />
</div>

<br />

Folio OS provides a unique, desktop-like interface in the browser to showcase engineering modules, technical writing, projects, and creative experiments. It's built with modern web standards, featuring a cohesive minimalist Linen/Sand aesthetic.

## Features

- **OS-like Interface**: A fully responsive workspace shell with resizable panels, a tab bar, command palette, and a status bar that mimics a real development environment.
- **Progressive Web App (PWA)**: Installable as a standalone app on desktop and mobile devices with a custom high-resolution Sand/Linen themed app icon.
- **Integrated Markdown/MDX**: Powered by [Fumadocs](https://fumadocs.vercel.app/) for seamless technical writing and developer notes.
- **Dynamic SEO & Sitemap**: Auto-generated `sitemap.xml` and `robots.txt` based on static routes and dynamic MDX content with fine-tuned priority and update frequencies.
- **System Status Widgets**: Device battery, network status, and live clock embedded directly in the OS top bar.
- **Premium Linen Aesthetic**: A quiet, elegant technical aesthetic featuring soft sand beige tones, ultra-thin charcoal lines, and Bauhaus-inspired geometric iconography.

## Tech Stack

- **Next.js 16 (App Router)**: Framework for SSR, SSG, and API routes.
- **TypeScript**: For robust, type-safe development.
- **Tailwind CSS 4**: Utility-first styling with a custom minimalist Linen theme configuration.
- **Fumadocs**: Specialized documentation and MDX rendering engine.
- **Phosphor Icons**: Consistent, high-quality iconography.
- **react-resizable-panels**: For the fluid, draggable OS layout.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the workspace.

## License

MIT
