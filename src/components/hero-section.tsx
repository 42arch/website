import Link from "next/link";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="w-full grid-magicpattern">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">Starllow Lab</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;

              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Welcome to rjv.im - This is where I document my work on open
              source projects, company and articulate thoughts and ideas.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href="https://x.com/rjv_im" target="_blank">
              <Button size="lg" className="gap-4 cursor-grab" variant="outline">
                Let's Connect <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="blog" target="_blank">
              <Button size="lg" className="gap-4">
                View Posts <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>


        </div>
      </div>
    </div>
  )
}
