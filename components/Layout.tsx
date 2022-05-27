import Head from "next/head"
import TheFooter from "./TheFooter"
import TheHeader from "./TheHeader"

const siteTitle = 'Next.js Blog'

export default function Layout({ children, home }: any) {
  return (
    <div className="font-sans w-full h-screen min-h-full">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Dan's Personal Site."
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <TheHeader></TheHeader>
      <main className="px-7 py-10">
        { children }
      </main>
      <TheFooter></TheFooter>
    </div>
  )
}
