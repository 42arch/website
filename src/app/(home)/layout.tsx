import PageLayout from '@/components/page-layout'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout>
      <div className="home-children flex flex-1 flex-col">
        {children}
      </div>
    </PageLayout>
  )
}
