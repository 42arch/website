# Starllow.OS 个人数字工作台设计方案

更新日期：2026-10-15  
状态：设计方案已确认；以 `docs/posthog.html` 为蓝本，在 Next.js 16 + React 19 + Tailwind CSS v4 + Zustand + Fumadocs 架构下进行完整复刻。

---

## 1. 定位与愿景

将个人网站整体重塑为一套融合 **macOS 桌面操作系统交互** 与 **PostHog 温暖、硬核、磨砂质感** 的个人数字工作台（Starllow.OS）。

访客进入网站时，就像登录进了一台正在运行的开发者工作机：通过全矢量卡通插画壁纸建立独特的空间氛围，通过多窗口协同浏览项目、技术思考与设计哲学，在克制的工程美学与微交互中体会站点主人的审美、创造力与全栈工程能力。

### 核心设计原则

1. **精密工程秩序感（Craft & Decluttering）**：告别玩具式的大圆角与大白块，执行严格的 8px / 6px / 4px 微圆角梯队与单色石墨层级，恢复仪表仪器般的秩序感。
2. **暖石与磨砂质感（Warm Stone & Frosted Matte）**：以温暖的暖石底色配合 22px 亚克力微磨砂、内高光与 SVG 噪点细微颗粒感，界面温润耐看，久看不累。
3. **响应式外壳架构（Responsive Shell Architecture）**：
   - 统一采用 **Shell（外壳层）** 架构设计：桌面端自适应呈现为多窗口协同工作台（层级堆叠、拖拽边界限制、最小化到 Dock、全屏缩放、台前调度平铺）；移动端自适应呈现为全屏应用阅读视图与移动导航。
   - 顶栏 MenuBar、悬浮 Dock、Spotlight 全局命令面板（⌘K）、Web Audio 原生触觉微音效与实时遥测事件流。
4. **全矢量生动场景（Vector Illustration & Mascot）**：内置刺猬工程师 Max、太空柴犬与极客黑猫 3 套纯 SVG 矢量壁纸及右下角互动对话气泡。
5. **现代前端架构支撑**：
   - 基于 **Next.js 16 (App Router)** 与 **React 19**。
   - 使用 **Zustand** 管理 Shell 外壳全局状态（窗口栈、拖拽坐标、壁纸偏好、系统配置与遥测流）。
   - 使用 **Fumadocs** 进行结构化内容与工程手册管理（源文件位于 `content/`）。
   - 遵循 **Tailwind CSS v4** CSS-first 规范，在 `src/app/globals.css` 中统一维护 `@theme` 变量。

---

## 2. 视觉系统与设计规范 (对齐 posthog.html)

### 2.1 视觉降噪核心三法则

1. **几何收敛（严格微圆角梯队）**：
   - 窗口外框：`8px`（原 16px+）
   - 内容 Bento 卡片：`6px`
   - 按钮、输入框与标签 Chip：`4px~5px`
2. **色彩降噪（单色基底 + 品牌橙点缀）**：
   - 告别彩虹混色与高饱和彩色图标，桌面与 Dock 图标统一收敛为**深石墨灰（#374151）**。
   - 仅在激活、悬停、关键状态和主要 CTA 动作使用 **PostHog 品牌橙（#F54E00）**。
   - 状态点严格限定语义：`#28C840`（在线/遥测 Live）、`#FEBC2E`（提示/警告）、`#FF5F57`（红绿灯关闭）。
3. **空间留白与左右呼吸**：
   - 移除背景杂乱贴纸与多余天空悬浮物，左侧留出清晰的窗口操作区，右侧留出插画角色与风景的透气区域。

### 2.2 色阶与材质系统 (Design Tokens)

| Token 名称 | 浅色暖石模式 | 深色暗夜模式 | 用途说明 |
| :--- | :--- | :--- | :--- |
| `--bg-desktop` (Warm Stone) | `#EAE6DA` | `#12151E` | 桌面底层背景底色 |
| `--bg-window` (Paper Surface) | `rgba(244, 242, 235, 0.78)` | `rgba(26, 29, 40, 0.76)` | 毛玻璃窗口底色，配合 22px blur |
| `--bg-window-body` | `rgba(248, 246, 240, 0.65)` | `rgba(22, 25, 34, 0.68)` | 窗口内部工作区底色 |
| `--bg-sidebar` | `rgba(233, 230, 220, 0.55)` | `rgba(18, 21, 30, 0.55)` | 窗口内 Finder 风格侧边栏 |
| `--bg-header` | `rgba(238, 235, 226, 0.72)` | `rgba(30, 34, 46, 0.75)` | 窗口标题栏与顶栏底色 |
| `--text-main` (Graphite Ink) | `#1D1F27` | `#F3F4F6` | 主标题、强调文字、高对比图标 |
| `--text-secondary` | `#5A5E6B` | `#9CA3AF` | 正文说明、辅助元信息 |
| `--accent` (PostHog Orange) | `#F54E00` | `#FF641A` | 品牌唯一主强调色、选中指示光标 |
| `--border-glass` | `rgba(29, 31, 39, 0.08)` | `rgba(255, 255, 255, 0.08)` | 亚克力外边框与卡片发丝线 |
| `--border-subtle` | `rgba(29, 31, 39, 0.06)` | `rgba(255, 255, 255, 0.06)` | 内部次级卡片与列表分割线 |

### 2.3 材质、阴影与纹理

- **噪点层（Matte Grain）**：全屏注入基于 SVG `feTurbulence` 的微质感颗粒层（透明度 2.5%），消除数字色块的平庸感。
- **微透光亚克力**：
  - MenuBar：`backdrop-filter: blur(16px) saturate(140%)`
  - Window：`backdrop-filter: blur(22px) saturate(145%)`
- **窗口阴影阶梯**：
  - 非活动窗口：`0 12px 32px -8px rgba(24, 24, 20, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)`
  - 活动窗口（Active）：`0 18px 42px -10px rgba(24, 24, 20, 0.12), inset 0 1px 0 rgba(255,255,255,0.75)`

### 2.4 图标与控件微交互

- **零 Emoji 依赖**：全站使用 100% 精致的矢量 SVG 图标，杜绝字体 Emoji 在不同系统上的渲染不一致。
- **macOS 红绿灯**：三色圆点直径 11px，带有微细发丝边框；整个群组悬停（Hover）时优雅显现内部符号（关闭 `×`、最小化 `−`、全屏 `+`）。
- **微磨砂圆角图标（Frosted Squircle）**：桌面图标与 Dock 采用浅灰磨砂底托盘（8px 圆角），带有内高光与悬停上浮动效。

---

## 3. 信息架构与 8 大应用矩阵

桌面组织 7 个精简专业应用窗口，覆盖个人履历、项目矩阵、视觉画册、终端、技术思考、联系与系统设置：

```
                    ┌──────────────────────────────────────────────┐
                    │  [Apple] Starllow.OS  文件 窗口  [📶 🔋] ⌘K 中 12:00 │
                    └──────────────────────────────────────────────┘
           ┌────────────────── Responsive Shell Workspace ──────────────────┐
           │                                                                 │
           │  ┌───────────────┐ ┌───────────────┐ ┌───────────────────────┐  │
           │  │  README.mdx   │ │ Projects.app  │ │      Gallery.app      │  │
           │  │ 个人履历与矩阵 │ │ 作品与代码仓库 │ │ 视觉画册与色彩实验   │  │
           │  └───────────────┘ └───────────────┘ └───────────────────────┘  │
           │                                                                 │
           │  ┌───────────────┐ ┌───────────────┐ ┌───────────────────────┐  │
           │  │  Terminal.sh  │ │ Handbook.wiki │ │       Mail.msg        │  │
           │  │ 交互命令行工具 │ │ 工程原则与笔记 │ │    联系与访客留言     │  │
           │  └───────────────┘ └───────────────┘ └───────────────────────┘  │
           │                                                                 │
           │                    ┌───────────────┐   [ Mascot Dialogue:    │  │
           │                    │ Settings.app  │     Max the Hedgehog ]  │  │
           │                    │ 壁纸/外观/语言 │     (Interactive Bubble)│  │
           │                    └───────────────┘                            │
           └─────────────────────────────────────────────────────────────────┘
                    └───────────────── Floating Dock ────────────────┘
```

### 3.1 `README.mdx`（关于我与个人工作台）
- **左侧 Finder 侧边栏**：Outline 大纲导航（关于我、技术栈矩阵、履历里程碑）、工作区快速链接、暖石卡片标牌。
- **右侧工作区**：
  - **Hero 简介**：头像标志徽章、Product Engineer & Indie Maker 职业标签、一句话愿景。
  - **Bento 数据行**：设计哲学说明卡片、GitHub Stars（14.2k+ / 6 Open Source Kits）。
  - **核心技术栈矩阵**：3 列卡片分类（Frontend & Craft、Backend & Data、AI & Agents），带有单色胶囊标签。
  - **履历里程碑（Career Changelog）**：版本号格式呈现的经历变更日志（如 `v3.0 Staff Product Engineer`）。

### 3.2 `Projects.app`（作品集展示）
- **标题栏内嵌分类过滤**：全部（All）、AI & Agent、开源工具（OSS）、独立 SaaS。
- **项目 Bento 卡片**：
  - 标题、项目类别专属指示圆点、Star / MRR 徽章。
  - 核心描述、技术栈标签、关键指标（如 `42k+ MAU`, `12M+ Traces`, `Latency < 8ms`）。
  - 交互动作：查看详情并自动派发遥测捕获事件。

### 3.3 `Gallery.app`（视觉画册与作品）
- **交互画册展台**：包含天体轨道（Orbit）、低多边形浮岛（Island）、城市网格（Urban Wander）与高架夜景（Highway Grid）4 幅纯矢量 SVG 艺术作。
- **调色板检查器（Color Palette）**：实时提取作品所使用的核心色阶与十六进制 HEX 码，支持点击一键复制色值并弹出 Toast 反馈。
- **元数据呈现**：展示作画时间、分类标签、设计说明与矢量比例规范。

### 3.5 `Terminal.sh`（交互式终端）
- **外观**：磨砂深黑窗口（80×24 风格），zsh 绿色命令提示符 `alex@MacBook-Pro ~ %`。
- **快捷指令工具栏**：支持一键运行 `help`、`neofetch`、`skills`、`clear`。
- **原生输入支持**：支持键盘输入回车执行，输出 ASCII 系统架构徽标或技术栈熟练度柱状图。

### 3.6 `Handbook.wiki`（个人工程手册）
- **内容架构**：基于 **Fumadocs** 渲染（源文件位于 `content/`），呈现 PostHog 风格团队与产品文化。
- **工程原则**：01 / SHIPPING（小步快跑，真实反馈优先）、02 / CRAFT（工程与审美合一）。

### 3.7 `Mail.msg`（联系与留言板）
- **邮件发送表单**：收件人固定、称呼、主题下拉选择、正文文本域。
- **访客留言板（Guestbook）**：发送信件后实时追加到下方留言墙，带有即时相对时间与高亮标签。

### 3.8 `Settings.app`（系统偏好设置）
- **左侧分类导航**：卡通角色壁纸、深浅色外观、声音与桌面组件。
- **配置面板**：
  - **壁纸切换器**：刺猬工程师 Max、太空柴犬、极客黑猫缩略卡片，选中有品牌橙环绕高光。
  - **外观切换**：浅色暖石模式（Light）与深色暗夜模式（Dark）。
  - **高级开关**：轻柔机械按键音效（Web Audio API 开关）、右下角角色对话气泡显隐、桌面左上角状态组件显隐。

---

## 4. 桌面交互与系统级功能

### 4.1 顶栏 MenuBar（28px 高度）
- **左侧**：
  - 系统品牌 Logo（点击弹出 StartMenu 菜单，包含快捷操作与 ⌘ 快捷键提示）。
  - 当前聚焦激活的应用标题（如 `README.mdx`）。
  - macOS 标准菜单：文件、窗口（台前调度整齐排列、显示所有窗口、最小化全部）、手册、规范、系统设置。
- **右侧**：
  - 实时遥测胶囊（Live Dot + 事件计数器，点击直达 Insights.db）。
  - Spotlight 全局搜索图标（支持 ⌘K 唤出）。
  - 本地化实时日期与时钟（`10月15日 周四 12:00`）。

### 4.2 全矢量卡通壁纸层与互动吉祥物
- **3 套高精度纯矢量 SVG 场景**：
  1. `Max the Hedgehog`：穿橙色连帽衫的刺猬工程师坐在户外木质工作台前，手冲咖啡冒热气，桌面有小黄鸭与多肉盆栽。
  2. `Astro Shiba Inu`：月球基地上的太空柴犬宇航员，头盔高光反光，背景有环状行星。
  3. `Lo-Fi Cat Coder`：戴着橙色耳机的黑猫，尾巴轻轻摆动，背景为暮色山谷。
- **互动对话气泡（Mascot Bubble）**：
  - 悬浮于右下角，点击角色或气泡即可轮播趣味台词与工作台技巧，可在设置中随时显示或收起。

### 4.3 悬浮 Frosted Dock
- 居中悬浮磨砂托盘，内含 8 个核心应用图标与发丝分割线。
- 鼠标滑过呈现平滑的上浮与放大过渡（`scale(1.14)` 与 `-7px` 位移）。
- 每个图标配置黑色磨砂 Tooltip 气泡。
- 图标下方配备指示圆点：窗口打开时显示灰点，当前聚焦时升级为品牌橙放大圆点。

### 4.4 窗口管理器核心调度（Window Manager Engine）
- **层级管理（Z-Index Stack）**：点击任意窗口将其移至栈顶，同步 MenuBar 激活状态。
- **拖拽与边界碰撞**：采用原生 Pointer Events 实现顺畅拖拽，严格限制上边界不遮挡 MenuBar，底边界不越出屏幕。
- **台前调度平铺（`tileWindows()`）**：一键将所有打开的窗口以阶梯排布方式整齐排列在桌面中央。
- **一键最小化（`minimizeAllWindows()`）**：迅速收起全部窗口，供访客欣赏全景卡通壁纸。

### 4.5 全局 Spotlight 命令面板（⌘K）
- 随时通过键盘快捷键 `⌘K` 或 `Ctrl+K` 唤出。
- 支持按拼音、英文或 Tag 快速过滤应用、设置操作、系统动作（切换主题、平铺窗口、复制邮箱）。
- 支持键盘 `Enter` 执行与 `Esc` 退出。

### 4.6 触觉微音效系统（Web Audio API）
- **零静态音频资源依赖**：利用浏览器原生的 `AudioContext` 实时合成正弦微音频（频率 380Hz~680Hz，时长 15ms~20ms）。
- 在开窗、关窗、切换 Tab、点选壁纸时带来极具质感的轻柔机械按键反馈；支持在设置中一键静音。

---

## 5. 状态管理与数据架构

基于项目规范约束，系统状态与数据流划分如下：

### 5.1 全局外壳状态树（Zustand Store: `useShellStore`）
```typescript
interface ShellState {
  // 窗口与应用状态管理（双端自适应）
  windows: Record<AppId, WindowConfig>
  activeWindowId: AppId | null
  topZIndex: number
  focusWindow: (id: AppId) => void
  openWindow: (id: AppId) => void
  closeWindow: (id: AppId) => void
  minimizeWindow: (id: AppId) => void
  maximizeWindow: (id: AppId) => void
  tileWindows: () => void
  minimizeAll: () => void
  openAll: () => void

  // 偏好与外观
  wallpaperIndex: number
  setWallpaperIndex: (idx: number) => void
  themeMode: 'light' | 'dark'
  setThemeMode: (mode: 'light' | 'dark') => void
  soundEnabled: boolean
  toggleSound: () => void
  mascotBubbleVisible: boolean
  toggleMascotBubble: () => void
  widgetsVisible: boolean
  toggleWidgets: () => void

  // 遥测事件流
  sessionEventCount: number
  telemetryLogs: TelemetryEvent[]
  captureEvent: (name: string, props?: Record<string, any>) => void
}
```

### 5.2 内容驱动（Fumadocs）
- `content/` 目录下维护 Markdown / MDX 源文件（例如 `content/handbook/*.mdx`）。
- 结合 `fumadocs-core` 渲染清晰优美的工程规范与技术长文，保持内容与界面的解耦。

### 5.3 国际化（next-intl）
- 同步在 `messages/zh.json` 与 `messages/en.json` 中维护各应用标题、操作项、设置文案与系统提示。

---

## 6. 代码落地与文件职责映射

| 文件 / 目录路径 | 职责与技术方案 |
| :--- | :--- |
| `src/app/globals.css` | Tailwind CSS v4 `@theme` 配置、暖石/羊皮纸色阶变量、亚克力磨砂、微圆角阶梯与噪点样式 |
| `src/stores/shell-store.ts` | **Zustand 全局外壳状态库**：管理窗口生命周期、Z-Index、壁纸偏好、系统设置与遥测事件 |
| `src/components/shell/shell.tsx` | 响应式外壳主容器：桌面端组装 MenuBar / Wallpaper / Windows / Dock；移动端自适应全屏 App 视图与 Sheet |
| `src/components/shell/menubar.tsx` | 顶栏 MenuBar：品牌 StartMenu、聚焦 App 标题、macOS 标准操作菜单、遥测计数胶囊与时钟 |
| `src/components/shell/dock.tsx` | 悬浮微磨砂 Dock：8 个应用图标、Tooltip 气泡、放大回弹微动效与开窗指示光点 |
| `src/components/shell/wallpaper.tsx` | 纯矢量 SVG 卡通壁纸层（Max 刺猬、太空柴犬、黑猫）与右下角互动对话气泡组件 |
| `src/components/shell/search.tsx` | Spotlight 全局命令面板（⌘K）：模糊搜索、快捷执行与键盘导航 |
| `src/components/shell/window.tsx` | 统一窗口外框：macOS 红绿灯控制组、拖拽碰撞检测、最大化还原、微磨砂亚克力玻璃体 |
| `src/components/apps/readme-app.tsx` | `README.mdx` 应用：Finder 侧栏、Hero、Bento 设计哲学、技术栈矩阵、履历 Changelog |
| `src/components/apps/design-app.tsx` | `Design_Spec.fig` 应用：视觉降噪规范、暖石色卡复制、架构映射 |
| `src/components/apps/projects-app.tsx` | `Projects.app` 应用：分类筛选、Bento 项目卡片、Star / 指标呈现 |
| `src/components/apps/analytics-app.tsx` | `Insights.db` 应用：关键产出指标卡片与实时 HogQL 事件流日志看板 |
| `src/components/apps/terminal-app.tsx` | `Terminal.sh` 应用：交互命令行、快捷指令栏、ASCII 架构图与技能输出 |
| `src/components/apps/handbook-app.tsx` | `Handbook.wiki` 应用：基于 Fumadocs 的工程原则与团队手册渲染 |
| `src/components/apps/contact-app.tsx` | `Mail.msg` 应用：邮件表单与前端实时访客留言墙（Guestbook） |
| `src/components/apps/settings-app.tsx` | `Settings.app` 应用：3 款矢量壁纸点选、深浅色模式切换、音效与组件开关 |
| `src/lib/sound.ts` | Web Audio API 轻柔机械按键微音效合成服务（免音频资源加载） |
| `src/lib/telemetry.ts` | 内存遥测事件分发器，驱动顶栏计数器与 Insights 实时日志 |
| `src/lib/shell-routes.ts` | URL 与应用映射支持（自适应双端路由同步） |
| `src/lib/shell-content.ts` | 静态数据源：个人信息、Bento 项目列表与配置项 |
| `content/` | Fumadocs 文章与文档源文件目录 |
| `messages/` | `zh.json` 与 `en.json` 多语言文案字典 |

---

## 7. 验收标准与验证清单

### 7.1 视觉与质感验收
- [ ] 彻底告别原有的刺眼大白块与 16px+ 臃肿圆角，窗口外框统一为 8px，卡片统一为 6px，按钮统一为 4px~5px。
- [ ] 浅色模式呈现温暖柔和的暖石/羊皮纸材质（#EAE6DA），配合细微颗粒噪点与 22px 亚克力磨砂。
- [ ] 深色暗夜模式背景深邃（#12151E），文字与发丝边框清晰无光晕污染。
- [ ] 全站 100% 采用纯矢量 SVG 图标，无系统 Emoji 混杂。
- [ ] 3 套卡通壁纸（刺猬 Max、太空柴犬、极客黑猫）在各种分辨率下均清晰无模糊。

### 7.2 窗口与交互验收
- [ ] 8 个应用窗口全部正常打开、关闭、最小化至 Dock、全屏缩放及聚焦置顶。
- [ ] 窗口拖拽时有平滑的跟手感，顶栏 MenuBar 与底栏 Dock 区域具备严格边界限制，窗口不会被拖出屏幕外丢失。
- [ ] 顶栏“窗口 -> 台前调度 / 整齐排列”可一键将已打开窗口阶梯平铺。
- [ ] 顶栏“窗口 -> 最小化全部”可一键收起窗口，纯净呈现卡通背景。
- [ ] 快捷键 `⌘K` / `Ctrl+K` 可随时呼出 Spotlight 命令面板并支持键盘快速导航。
- [ ] 移动端下自动切换为整屏阅读视图与底栏快速切换，无非预期横向溢出。

### 7.3 应用功能与数据流验收
- [ ] `README.mdx` 中能完整浏览个人履历、设计哲学与 3 列技术栈矩阵。
- [ ] `Design_Spec.fig` 中的色卡点击可一键复制 HEX 颜色值并弹出 Toast。
- [ ] `Projects.app` 中的分类过滤器切换流畅，项目卡片指标与标签完整展示。
- [ ] `Insights.db` 中实时记录用户在桌面上的交互动作，HogQL 日志流实时追加。
- [ ] `Terminal.sh` 支持点击快捷按钮或键盘输入 `help`, `neofetch`, `skills`, `clear` 并正确打印输出。
- [ ] `Mail.msg` 提交留言后立即在下方 Guestbook 列表中高亮插入新留言。
- [ ] `Settings.app` 切换壁纸、明暗外观、音效开关时即时生效，右下角吉祥物气泡同步响应。
- [ ] 开启音效时，点击操作产生清脆轻柔的机械按键微音效；静音后保持无声。
- [ ] 路由直接访问（如 `/projects`）能与外壳开窗状态平滑同步。

---

## 8. 分步实施执行计划

1. **第一阶段：设计基座与全局状态（已完成）**
   - 更新 `src/app/globals.css`，配置 Tailwind v4 `@theme inline` 变量（暖石调色盘、微圆角、磨砂与噪点）。
   - 创建 `src/stores/shell-store.ts`，基于 Zustand 构建完整的响应式外壳状态管理。
   - 实现 `src/lib/sound.ts` 与 `src/lib/telemetry.ts` 全局微服务。
2. **第二阶段：外壳容器与壁纸层（已完成）**
   - 编写 `src/components/shell/wallpaper.tsx`（完整移植 3 套纯矢量 SVG 壁纸与吉祥物对话气泡）。
   - 实现 `src/components/shell/menubar.tsx`（StartMenu、遥测胶囊、时钟）。
   - 实现 `src/components/shell/dock.tsx`（暖石托盘、放大动效、指示圆点）。
   - 实现 `src/components/shell/search.tsx`（Spotlight ⌘K 面板）。
3. **第三阶段：通用窗口容器与 8 大应用落地（已完成）**
   - 重构 `src/components/shell/window.tsx`（微磨砂窗体、红绿灯控制组、PointerEvents 拖拽约束与移动端视口自适应）。
   - 逐一实现并落地 8 个专属 App 视图组件（位于平级目录 `src/components/apps/`）：
     - `ReadmeApp` (`README.mdx`）：Finder 侧栏、Hero、Bento 哲学、3 列技术栈、履历 Changelog。
     - `DesignApp` (`Design_Spec.fig`）：降噪指南、HEX 颜色复制、模块映射。
     - `ProjectsApp` (`Projects.app`）：分类过滤、6 大精选项目卡片、指标与标签。
     - `AnalyticsApp` (`Insights.db`）：核心产出指标看板、实时 HogQL 事件流日志。
     - `TerminalApp` (`Terminal.sh`）：交互命令行交互、ASCII 图案与快捷指令。
     - `HandbookApp` (`Handbook.wiki`）：PostHog 文化启发的 4 大工程协作原则。
     - `ContactApp` (`Mail.msg`）：邮件拷贝与前端实时留言墙（Guestbook）。
     - `SettingsApp` (`Settings.app`）：壁纸点选切换、深浅模式、音效开关、小组件显隐。
   - 实现 `src/components/apps/app-windows.tsx` 与 `src/components/apps/index.ts` 集中组装。
   - 全面接管路由：更新 `src/app/page.tsx`、`layout.tsx` 以及所有子路由渲染 `<Shell />` 并实现 URL 双向同步。
4. **第四阶段：国际化、响应式与交互打磨（已完成）**
   - 完善 `messages/zh.json` 与 `messages/en.json` 完整双语言词典（覆盖 MenuBar、Dock、Spotlight、8 大 App、系统设置与通用文案）。
   - 在 MenuBar 顶栏增加极简双语切换胶囊（`ZH / EN`），并在 `SettingsApp` 系统设置中提供双语偏好切换。
   - `HandbookApp` 增加 Fumadocs 内容管理体系联动，支持直观阅读 `content/notes/*.mdx` 技术笔记与代码实现。
   - 针对超小屏幕与移动端（<375px）完成微微圆角、自适应 Dock 缩放与全屏 Sheet 体验打磨。
