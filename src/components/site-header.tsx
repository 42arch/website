import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from './ui/navigation-menu'
import LocaleSelect from './locale-select'
import ThemeSelect from './theme-select'
import { getTranslations } from 'next-intl/server'
import MobileNav from './mobile-nav'

const navItems: { href: string; title: string }[] = [
  {
    href: '/',
    title: 'home'
  },
  {
    href: '/blog',
    title: 'blog'
  },
  {
    href: '/shuo',
    title: 'shuo'
  }
]

export default async function SiteHeader() {
  const t = await getTranslations('nav')

  return (
    <header className='sticky top-0 z-20 flex h-[57px] w-full items-center bg-background'>
      <div className='relative mx-4 flex w-full justify-center md:mx-12 lg:mx-24'>
        <NavigationMenu className='relative z-[2] flex w-full max-w-3xl justify-between gap-4 px-4 py-3 md:px-12 lg:gap-0 lg:px-24'>
          <NavigationMenuList className=''>
            <Link href='/' legacyBehavior passHref>
              <NavigationMenuLink className='mr-3 text-xl'>
                🌠
              </NavigationMenuLink>
            </Link>

            <div className='hidden sm:block'>
              {navItems.map((item) => (
                <Link href={item.href} key={item.title} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t(item.title)}
                  </NavigationMenuLink>
                </Link>
              ))}
            </div>

            {/* 
            <Link href='/blog' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t('blog')}
              </NavigationMenuLink>
            </Link> */}
          </NavigationMenuList>

          <div className='hidden gap-2 sm:flex'>
            <ThemeSelect />
            <LocaleSelect />
          </div>
          <div className='flex sm:hidden'>
            <MobileNav items={navItems} />
          </div>
        </NavigationMenu>
      </div>
    </header>
  )
}
