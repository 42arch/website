import PageLayout from '@/components/page-layout'

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <PageLayout>
      blog container
      {/* {children} */}
    </PageLayout>
  )
}
