import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import Link from 'next/link'
import PageLayout from '@/components/page-layout'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { blog } from '@/lib/source'

export default function BlogPage() {
  const posts = blog.getPages()

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-balance mb-6">
            Creative Programming
            {' '}
            <span className="text-primary">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Exploring the intersection of code, mathematics, and visual art through WebGL, shaders, and creative
            programming techniques.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <Link key={post.url} href={`/blog/${post.slugs}`} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <CalendarDays className="w-4 h-4" />
                      {/* <span>{new Date(post).toLocaleDateString()}</span> */}
                      <Clock className="w-4 h-4 ml-2" />
                      {/* <span>{post.readTime}</span> */}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{post.data.title}</CardTitle>
                    <CardDescription className="text-base">{post.data.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {/* {post.data.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))} */}
                    </div>
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      <span>Read more</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
