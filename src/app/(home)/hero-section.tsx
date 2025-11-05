import { MoveRight, SquareLibraryIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <div id="hero" className="w-full relative grid-pattern">
      <div className="container mx-auto top-0">
        <div className="flex gap-8 py-16 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50 font-bold">Starllow Lab</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Welcome to Starllow Lab - This is where we document our work on open
              source projects, and share our thoughts and ideas.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <a href="#projects">
              <Button size="lg" className="gap-4 cursor-grab" variant="outline">
                View Projects
                <SquareLibraryIcon className="w-4 h-4" />
              </Button>
            </a>
            <Link href="blog" target="_blank">
              <Button size="lg" className="gap-4">
                View Posts
                <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
