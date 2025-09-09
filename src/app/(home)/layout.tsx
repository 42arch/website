import PageLayout from "@/components/page-layout";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <PageLayout>
    <div className="home-children flex flex-1 flex-col divide-y divide-dashed divide-border/70 border-border/70 border-dashed sm:border-b dark:divide-border dark:border-border">
      {children}
    </div>
    </PageLayout>
}