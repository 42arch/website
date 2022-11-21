import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { SiNextdotjs, SiVercel } from 'react-icons/si'
import GlitchText from '../components/GlitchText'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <article className="pt-12 flex flex-col item-center">
        <GlitchText text="Yet Another Cyber Territory" />
        <section className="text-lg">
          <p>
            What is the most important thing you could be working on in the
            world right now? ...And if you're not working on that, why aren't
            you?
          </p>
          <br />
          <p>
            Be curious, Read widely, Try new things. I think a lots of what
            people call intelligence boils down to curiosity.
          </p>
          <br />
          <p className="text-right text-base">-- Aaron Swartz</p>
        </section>
        <section className="pt-12">
          <Link href="/about" className="">
            <p className="flex items-center">
              See More
              <motion.span
                animate={{ x: [5, 30, 5] }}
                transition={{
                  type: 'spring',
                  repeat: Infinity,
                  duration: 1.2
                }}>
                <FiArrowRight />
              </motion.span>
            </p>
          </Link>
        </section>

        <section className="py-12 text-sm">
          <p className="flex items-center">
            This site is bulit with{' '}
            <SiNextdotjs className="mx-2 cursor-pointer" title="next.js" />,
            deployed on
            <SiVercel className="mx-2 cursor-pointer" title="vercel" />.
          </p>
        </section>
      </article>
    </Layout>
  )
}
