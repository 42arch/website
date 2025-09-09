import { ArrowRight, Code2, Github, Mail, Palette, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance tracking-tight">
              <span className="text-foreground">Starllow Lab</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty font-light">
              探索 WebGL、Shader 艺术与创意编程的无限可能
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Code2 className="h-5 w-5" />
              <span className="font-medium">WebGL & Three.js</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Palette className="h-5 w-5" />
              <span className="font-medium">Shader Programming</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Interactive Art</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="group font-medium">
              探索作品
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="font-medium bg-transparent">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" size="lg" className="font-medium bg-transparent">
                <Mail className="mr-2 h-4 w-4" />
                联系我
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="relative w-full max-w-2xl mx-auto h-48 bg-muted/30 rounded-2xl border border-border/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Code2 className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">Ready to Create</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
