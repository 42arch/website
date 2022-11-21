import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from './Header'
import BackLayer from './BackLayer'

const SiteUrl = 'https://mainissues.cc'

type Props = {
  children: JSX.Element
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter()
  const meta = {
    title: 'mainissues',
    description: "Dan's personal website.",
    image: '',
    type: 'website'
  }
  return (
    <div className="bg-th-bg text-th-text relative font-rubik">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index"></meta>
        <meta content={meta.description} name="description"></meta>
        <meta property="og:url" content={`${SiteUrl}${router.asPath}`}></meta>
        <link rel="canonical" href={`${SiteUrl}${router.asPath}`}></link>
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Dan" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
      </Head>
      <main className="px-2 md:px-16 relative min-h-screen h-full">
        <Header />
        <BackLayer />
        <section className="max-w-[1000px] relative m-auto px-4">
          {children}
        </section>
      </main>
    </div>
  )
}

export default Layout
