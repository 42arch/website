import { Mdx } from '@/components/mdx'
import { allAbouts } from 'contentlayer/generated'
import React from 'react'

const AboutPage = () => {
  const about = allAbouts[0]
  return (
    <div className="py-4">
      {/* <div
        className="pt-4 prose"
        dangerouslySetInnerHTML={{ __html: about.body.html }}
      /> */}
      <Mdx code={about.body.code} />
    </div>
  )
}

export default AboutPage
