import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from './ui/navigation-menu'
import LocaleSelect from './locale-select'
import ThemeSelect from './theme-select'
import { getTranslations } from 'next-intl/server'
import { MenuIcon } from 'lucide-react'
import { Button } from './ui/button'

export default async function Header() {
  const t = await getTranslations('nav')

  return (
    <header className='sticky top-0 z-20 flex h-[57px] w-full items-center bg-background'>
      <div className='relative mx-4 flex w-full justify-center md:mx-12 lg:mx-24'>
        <NavigationMenu className='relative z-[2] flex w-full max-w-3xl justify-between gap-4 px-4 py-3 md:px-12 lg:gap-0 lg:px-24'>
          <NavigationMenuList className=''>
            <Link href='/' legacyBehavior passHref>
              <NavigationMenuLink className='mr-3'>🌟</NavigationMenuLink>
            </Link>
            <Link href='/' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t('home')}
              </NavigationMenuLink>
            </Link>
            <Link href='/blog' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t('blog')}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuList>

          <div className='hidden gap-2 md:flex'>
            <ThemeSelect />
            <LocaleSelect />
          </div>
          <div className='flex md:hidden'>
            <Button variant='ghost' size='icon'>
              <MenuIcon />
            </Button>
          </div>
        </NavigationMenu>
      </div>
    </header>
  )
}
