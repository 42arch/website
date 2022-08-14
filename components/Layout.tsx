import Head from "next/head"
import TheFooter from "./TheFooter"
import TheHeader from "./TheHeader"

const siteTitle = 'Next.js Blog'

export default function Layout({ children }: any) {
  return (
    <div className="font-common w-full h-screen min-h-full mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl xl:px-0">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Dan's Personal Site."
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <TheHeader></TheHeader>
      <main className="py-10">
        { children }
      </main>
      <TheFooter></TheFooter>
    </div>
  )
}
