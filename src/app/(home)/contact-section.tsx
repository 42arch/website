import { SiBilibili, SiGithub, SiGmail, SiStackblitz, SiX } from 'react-icons/si'

const SocialLinks = [
  {
    name: 'Email',
    href: 'mailto:rend42@163.com',
    icon: <SiGmail />,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/42arch',
    icon: <SiGithub />,
  },
  {
    name: 'StackBlitz',
    href: 'https://stackblitz.com/@42arch',
    icon: <SiStackblitz />,
  },
  {
    name: 'X',
    href: 'https://x.com/42arch',
    icon: <SiX />,
  },
  {
    name: 'BiliBili',
    href: 'https://space.bilibili.com/22589532',
    icon: <SiBilibili />,
  },
]

function ContactSection() {
  return (
    <section className="w-full grid grid-cols-3 sm:grid-cols-6 border-b border-main">
      {
        SocialLinks.map(link => (
          <div key={link.name} className="p-6 border-r hover:bg-accent/40 transition-opacity [&:nth-child(-n+3)]:border-b sm:[&:nth-child(-n+6)]:border-b-0 border-main">
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center" title={link.name}>
              {link.icon}
            </a>
          </div>

        ))
      }
    </section>
  )
}

export default ContactSection
