import Head from "next/head"
import Back from "./Back"
import TheHeader from "./TheHeader"


const name = 'RenDan'
const siteTitle = 'Next.js Blog Starter'

export default function Layout({ children, home }: any) {
  return (
    <div className="w-full h-screen min-h-full">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Track Spacex Missions"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <TheHeader></TheHeader>
      <main className="px-7 py-10">
        { children }
        {/* {
          !home && (
            <Back />
          )
        } */}
      </main>
    </div>
  )
}
