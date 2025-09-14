import Link from 'next/link'
import { GridBackground } from './grid-background'
import LastBuild from './last-build'

export default function Footer() {
  return (
    <footer className="relative border-t border-dashed border-border z-10 bg-background py-12 text-center text-xs text-muted-foreground">
      <GridBackground maxWidthClass="container" />
      <div className="mx-auto flex max-w-8xl flex-col px-4 md:flex-row md:justify-between md:px-12 lg:px-24 ">
        <div className="flex flex-col gap-1">
          <p className="flex flex-row justify-center gap-3 truncate">
            <a
              className="flex cursor-pointer items-center underline-offset-2 hover:text-primary hover:underline"
              href="https://dashboard.openpanel.dev/share/overview/a571gO"
              target="_blank"
              rel="noreferrer"
            >
              <span>Track</span>
            </a>
            <Link
              href="/sitemap.xml"
              className="flex cursor-pointer items-center underline-offset-2 hover:text-primary hover:underline"
            >
              <span>SiteMap</span>
            </Link>
            <Link
              href="/feed.xml"
              className="flex cursor-pointer items-center underline-offset-2 hover:text-primary hover:underline"
            >
              <span>RSS</span>
            </Link>
          </p>
          <LastBuild />
        </div>
        <div className="mt-2 md:mt-0">
          <p>
            <a
              className="text-xs hover:text-primary text-muted-foreground"
              href="https://icp.gov.moe/?keyword=20254242"
              target="_blank"
              rel="noreferrer"
            >
              萌ICP备20254242号
            </a>
          </p>
          <p className="mt-1">© 2025 Starllow Lab. All rights reserved.</p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">Built with ❤️ using Next.js and Fumadocs.</p>
      </div>
    </footer>
  )
}
