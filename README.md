# Starllow

Dan 的个人桌面：以操作系统为灵感的个人网站，包含可拖动窗口、应用 Dock、作品集、文章节选与壁纸设置。

## 开发

```bash
pnpm install
pnpm dev
```

打开 http://localhost:3000。

```bash
pnpm build  # 生产构建
pnpm start  # 运行生产服务
pnpm lint   # 代码检查
```

基于 Next.js App Router、React、TypeScript、Tailwind CSS v4、Radix UI 和 Phosphor Icons。使用本地字体与原创 SVG，无需图片服务或 API 密钥。

## 修改内容

编辑 `src/lib/desktop-content.ts` 更新个人信息、项目和文章节选。查看 [DESIGN.md](./DESIGN.md) 了解视觉方向、交互约定与文件位置。

窗口状态保存在当前会话中；壁纸偏好存储在浏览器本地。没有后台服务或账号系统。项目与联系方式来自原仓库配置，文章为原站文章的整理节选。
