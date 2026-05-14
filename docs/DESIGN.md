# 个人网站设计规范

## 项目愿景

构建一个受到 PostHog、现代开发者工具、复古桌面操作系统以及实验性交互界面启发的高度交互式个人网站。

这个网站不应该像：

- 传统作品集网站
- SaaS 营销落地页
- Apple 风极简网站
- 模板化博客

而应该像：

- 一个数字工作空间
- 一个开发者操作系统
- 一个实验性界面
- 一个软件工具
- 一个个人实验室

用户访问网站时，不是在“浏览页面”，而是在“探索一个真实的软件环境”。

---

# 核心设计理念

## 1. 工作空间，而不是页面

网站应表现得像一个 workspace。

避免：
- 传统线性滚动布局
- 巨大的 Hero Banner
- 营销型页面结构

优先：
- panel 面板
- window 窗口
- inspector 检查器
- dock 停靠栏
- sidebar 侧边栏
- tab 标签系统
- activity 区域

---

## 2. 工具化界面

所有 UI 元素都应具有“工具感”。

界面应类似：
- IDE
- 开发者工具
- 操作系统
- 地图编辑器
- 数据仪表盘
- 文件管理器

整个 UI 应具有可操作性与实体感。

---

## 3. 高信息密度，但结构清晰

整体信息密度应偏高。

避免：
- 过度留白
- 只有大标题的空洞页面
- 电影化滚动布局

内容应：
- 模块化
- 可检查
- 可导航
- 有结构感

---

## 4. 实验性，但保持可用性

网站应具有实验性和趣味性，但不能牺牲可用性。

整体体验应平衡：
- 工程感
- 交互深度
- 可读性
- 导航清晰度

---

# 视觉风格

## 整体风格方向

风格关键词：

- retro desktop UI（复古桌面 UI）
- neo brutalism（新粗野主义）
- developer workspace（开发者工作空间）
- operating system aesthetic（操作系统美学）
- industrial minimalism（工业极简主义）
- terminal-inspired UI（终端风界面）
- interactive dashboard（交互式仪表盘）
- modular interface（模块化界面）
- engineering software aesthetic（工程软件美学）

整体视觉应像：
- PostHog
- Raycast
- Linear
- Arc Browser
- VSCode
- 旧桌面操作系统

的融合体。

---

# 色彩系统

## 背景颜色

使用温暖、低饱和的颜色。

主色：
- warm gray（暖灰）
- cream（米白）
- graphite（石墨灰）
- charcoal（炭灰）
- muted olive（低饱和橄榄色）

避免：
- 纯白
- 纯黑
- 大面积渐变
- 过于未来感的霓虹配色

---

## 强调色

强调色应具有工业感与功能感。

推荐：
- amber（琥珀黄）
- orange（橙色）
- muted yellow（低饱和黄色）
- terminal green（终端绿）

强调色仅用于：
- active 状态
- hover 状态
- 指示器
- 按钮
- 高亮区域

---

# 字体系统

## 标题字体

使用：
- 高密度 grotesk 字体
- 紧凑型 sans-serif 字体
- 粗字重

标题应具有：
- 工程感
- 力量感
- 紧凑感
- 结构感

---

## 正文字体

正文应类似：
- 开发者文档
- 工程笔记
- 系统界面文本

可读性高，但不应过于松散。

---

## 等宽字体使用场景

等宽字体用于：
- metadata 元数据
- 时间戳
- 标签
- terminal 区块
- 系统消息
- activity logs

---

# 布局系统

## 主布局

网站整体结构应类似 IDE 或操作系统。

推荐布局：

┌────────────────────────────┐
│ Top Toolbar                │
├──────────┬─────────────────┤
│ Explorer │ Main Workspace  │
│ Sidebar  │                 │
│          │                 │
├──────────┴─────────────────┤
│ Bottom Activity Panel      │
└────────────────────────────┘

---

## 导航方式

导航应更像软件导航，而不是传统网页导航。

使用：
- explorer tree 文件树
- IDE-style dynamic tabs 动态标签页（支持多开文档/文章，支持原生物理拖拽排序）
- dock 导航
- command palette 命令面板
- collapsible sections 可折叠区域
- contextual sidebar 上下文侧边栏

避免：
- 居中 navbar
- 通用 landing page 导航结构

---

# 交互哲学

## 动效设计

动画应具有：
- 快速响应
- 实体反馈
- 软件感
- 操作感

参考：
- VSCode
- Figma
- Raycast
- 桌面操作系统

避免：
- 电影化滚动动画
- 漂浮式视差
- 过慢 easing
- 过量动效

---

## 交互行为

支持如下交互：
- draggable windows 可拖拽窗口
- draggable & reorderable tabs 标签页拖拽与重排 (利用物理引擎动效)
- dynamic tab opening 动态文档多开 (像在 IDE 中打开独立文件)
- expandable panels 可展开面板
- hover depth 悬浮层次
- resize handles 缩放边缘
- tab switching 标签切换
- contextual inspectors 上下文检查器
- keyboard shortcuts 快捷键
- command palette 命令面板

整个 UI 应具有“活着”的感觉。

---

# 信息架构

## 主结构

Workspace
├── Overview
├── Projects
├── Experiments
├── Writing
├── Gallery
├── Notes
├── Activity
└── Contact

---

# 页面设计方向

## Overview

Overview 应像系统首页。

包含：
- 状态组件
- 最近活动
- 当前重点内容
- 快速入口
- 精选项目

---

## Projects

Projects 应更像：
- 软件模块
- 实验记录
- 研究条目

每个项目可包含：
- metadata
- timeline
- tags
- screenshots
- expandable details
- technical notes

避免普通作品集卡片。

---

## Writing

Writing 区域应像：
- 知识库
- 文档系统
- 技术笔记平台

支持：
- tags
- nested categories
- search
- filters
- reading progress
- independent detail panels (每篇文章在独立的面板视图中打开)
- SEO-friendly dynamic routing (基于 Next.js App Router 的动态路由支持，每篇文章具有独立的 URL 和 Metadata)

---

## Activity

Activity 应类似：
- git logs
- changelog
- system activity
- development history

用于增强“真实工作空间”的氛围。

---

# 组件系统

## 核心组件

导航类：
- Explorer Tree
- Dock
- Tabs (支持动态生成与物理拖拽排序)
- Breadcrumbs
- Command Palette

内容类：
- Window Panels
- Inspectors
- Project Modules
- Terminal Blocks
- Activity Feeds
- Metadata Rows

系统类：
- Status Indicators
- Toasts
- Context Menus
- Floating Toolbars
- Resizable Panels

---

# 内容语气

整体语气应：
- 冷静
- 技术化
- 观察式
- 实验性
- 文档风格

避免：
- Startup 营销文案
- 励志口号
- 企业化语气
- 夸张叙事

好的例子：

“当前正在探索实验性交互系统与可视化工具。”

不好的例子：

“以激情与创新构建未来。”

---

# 技术方向

推荐技术栈：

前端：
- Next.js (App Router, 支持动态路由与服务端渲染以确保 SEO)
- React
- TypeScript

样式：
- Tailwind CSS
- 自定义组件系统

动画：
- Motion

图形：
- Three.js 或 OGL（可选）

状态管理：
- Zustand

---

# 可选高级功能

可选功能：
- 可拖拽桌面窗口
- 模拟终端
- 文件系统浏览器
- 快捷键支持
- Command Palette
- 交互式地图
- 实时活动流
- 模拟系统状态
- Easter Eggs
- 隐藏路由
- 实时时钟

---

# 重要限制

不要：
- 做成 SaaS 模板风
- 过度使用玻璃拟态
- 使用巨大空白区域
- 滥用渐变
- 添加无意义动画
- 只有视觉没有结构
- 创造无意义复杂度

网站应该像：
- 一个真实工具
- 一个个人操作系统
- 一个数字工作空间
- 一个实验性环境

而不是一个营销网站。

---

# 最终氛围关键词

developer workspace
retro operating system
neo brutalism
tool interface
interactive panels
terminal aesthetic
digital laboratory
workspace UI
developer tools
system dashboard
experimental interface
modular layout
dense information
engineering aesthetic
exploration-first
interactive software UI
