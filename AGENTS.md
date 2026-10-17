# AI 协作规范

## 1. 核心技术栈与指令
- **核心框架**：使用 **Next.js v16**（App Router，默认 Server Component）与 React 19。
- **状态管理**：使用 **Zustand** 管理全局与跨组件状态。
- **内容管理**：使用 **Fumadocs**（`fumadocs-mdx` / `fumadocs-core`）管理文章与文档内容。
- **基础 UI**：使用 **shadcn/ui**，项目配置位于 `components.json`，已有组件位于 `src/components/ui/`。
- **样式方案**：使用 **Tailwind CSS v4**（CSS-first 配置，主题变量维护于 `src/app/globals.css` 中的 `@theme`，无 `tailwind.config.js`）。
- **包管理**：统一使用 `pnpm`，严禁使用 `npm` 或 `yarn`。
- **常用命令**：
  - 本地开发：`pnpm dev`
  - 语法与格式检查：`pnpm lint` / `pnpm lint:fix`
  - 生产构建验证：`pnpm build`

## 2. 代码风格与规范
- **代码规范**：本项目基于 `@antfu/eslint-config`，严格遵守无分号、单引号风格，以及由 `perfectionist/sort-imports` 维护的 import 排序。修改代码后应保证格式符合规则。
- **类型安全**：遵循 TypeScript 严格模式，避免使用 `any`。
- **组件边界**：仅在包含交互、DOM 操作或使用 React Hooks 的组件中添加 `'use client'`，静态内容优先保持为 Server Component。
- **UI 组件复用**：开发或调整界面时，优先检查并复用 `src/components/ui/` 中已有的 shadcn/ui 组件，尽可能通过组合、二次封装或修改现有组件来满足需求；已有组件可用时不要重复实现基础控件。

### 应用目录组织
- `src/components/apps/` 中的每个应用使用不带 `-app` 后缀的独立目录，例如 `music/index.tsx`。`index.tsx` 作为应用的对外入口，统一使用 `@/components/apps/music` 这类导入路径。
- 应用专属的子组件、类型、辅助函数和 Zustand store 放在该应用目录内，按职责拆分为 `components/`、`store.ts`、`utils.ts`、`types.ts` 等文件；不要继续放在 `src/components/apps/` 根目录、`src/lib/` 或 `src/stores/apps/`。小型应用可以省略不需要的文件和子目录。
- 只有被多个应用或 Shell 共用的代码才放在公共目录。`src/components/apps/app-windows.tsx`、`src/components/apps/index.ts` 等应用注册与聚合文件保留在应用目录根部；Shell 级状态继续放在 Shell 对应的公共 store 中。
- 迁移应用时同步更新所有导入与导出，并保持服务端代码与客户端代码的模块边界；不要为了共置状态或辅助函数而给纯服务端模块添加 `'use client'`。

## 3. 内容与国际化
- **文章与文档**：基于 **Fumadocs** 进行内容管理与渲染，源文件位于 `content/`。
- **多语言**：涉及文案新增或调整时，须同步维护 `messages/zh.json` 与 `messages/en.json`。

## 4. 执行限制
- 未经用户明确指令，不要打开浏览器自行调试。
- 未经用户明确说明，不要自行执行 `pnpm lint` 和 `pnpm build`。

