<div align="center">
  <img src="public/web-app-manifest-192x192.png" width="64" alt="Folio OS Logo" style="border-radius: 8px;" />
  <h1>Folio OS</h1>
  <p><strong>🖥️ A retro development environment packing your blog & knowledge base into an IDE</strong></p>

  <p>
    <a href="README-ZH.md">简体中文</a> | <b>English</b>
  </p>

  <img src="public/screenshot.png" width="800" alt="Folio OS Screenshot" style="border: 1px solid var(--os-border); border-radius: 4px; box-shadow: 0 8px 30px rgba(0,0,0,0.12);" />
</div>

<br />

## 💡 What is Folio OS?

**Folio OS** is inspired by VSCode and retro operating systems, providing a unique **immersive digital workspace**. It is suitable for personal blogs, portfolios, knowledge bases, and project showcases, allowing users to explore and operate the website like a real software environment.

---

## ⚡ Features

* **🖥️ IDE-Style Multi-Panel Operations**: Supports sidebar file tree, bottom terminal, and main workspace with fluid resizable layouts, along with a global command palette.
* **📚 Tech Document Rendering**: Deeply integrated with the Fumadocs documentation engine. Sidebars load MDX notes automatically in a file tree structure, supporting math formulas and code syntax highlighting.
* **🎨 Built-in Theme Switching**: 8 premium built-in high-quality color presets, including Graphite, Linen, Vesper, Tokyo Night, and more, supporting real-time theme switching.
* **🔍 SEO & PWA Support**: SEO optimization powered by Next.js dynamic routing, supporting independent pages for each article; supports offline access, in-app installation, etc.
* **🔋 Top Status Widgets**: Real-time monitoring of network status (ONLINE/OFFLINE), device battery level, and LiveClock directly on the toolbar.
* **⌨️ Built-in Terminal (`folio-sh`)**: A fully functional shell at the bottom, supporting boot sequence animations, command history (up/down arrow recall), and custom commands (`neofetch`/`theme`/`whoami`).
* **🐱 Terminal Pixel Pet `Pixel`**: A terminal-based virtual companion cat. Features decaying hunger, happiness, and energy stats, supporting interactive commands (`pet feed`/`play`/`sleep`) with dynamic ASCII mood art.

---

## 🛠️ Tech Stack

* **Core Framework**: Next.js 16 (App Router) + React 19 + TypeScript
* **Document Engine**: Fumadocs
* **Styling & Motion**: Tailwind CSS 4.0 + Motion (Framer Motion)
* **State Manager**: Zustand 5

---

## 🚀 Quick Start

### 1. Install Node.js and pnpm
```bash
npm install -g pnpm
```

### 2. Clone or Fork this repository
```bash
git clone https://github.com/42arch/folio-os
```

### 3. Install dependencies
```bash
pnpm install
```

### 4. Run the development server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the workspace.

### 5. Add your own documents (or modify the code to customize your site)
* **Where to add posts**:
  * **Technical Articles**: Drop your `.md` or `.mdx` files into `content/writing/`.
  * **Casual Notes**: Drop your `.md` or `.mdx` files into `content/notes/`.
* **Frontmatter template**:
  ```markdown
  ---
  title: My First Document
  description: Short description
  date: 2026-05-18
  tags: ["tag-one", "tag-two"]
  category: "category"
  ---
  ```

### 6. Production build
```bash
pnpm build
pnpm start
```

### 7. Deploy
* Fully compatible with modern hosting platforms like **Vercel**, **Netlify**, **Cloudflare Pages**, etc.
* **Vercel is recommended**: Simply import your forked repository, Vercel will automatically recognize the Next.js setup, configure the settings, and deploy it instantly!

---

## 📄 License

MIT
