export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-primary mb-4">Starllow Lab</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              专注于创新技术研究与开发，致力于构建有意义的数字产品和解决方案。
            </p>
            <p className="text-sm text-muted-foreground">© 2024 Starllow Lab. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  项目
                </a>
              </li>
              <li>
                <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">
                  博客
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  联系
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">技术栈</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>React & Next.js</li>
              <li>TypeScript</li>
              <li>Node.js</li>
              <li>Python & AI/ML</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">Built with ❤️ using Next.js and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
