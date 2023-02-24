import { Mdx } from '@/components/mdx'
import { allAbouts } from 'contentlayer/generated'
import React from 'react'

const AboutPage = () => {
  const about = allAbouts[0]
  return (
    <div className="py-4">
      <Mdx code={about.body.code} />
      {/* <section className="pb-4">
        <p>My name is Dan, I'm a Frontend Developer.</p>
      </section>
      <h2 className="text-xl font-bold my-4">Technology Stack</h2>
      <div>
        <span>Frontend</span>
      </div> */}
    </div>
  )
}

export default AboutPage
