import PageLayout from '@/components/page-layout'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout>
      {children}
    </PageLayout>
  )
}
