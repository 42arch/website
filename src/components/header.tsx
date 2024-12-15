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

export default async function Header() {
  const t = await getTranslations('nav')

  return (
    <header className='sticky top-0 z-20 flex h-[57px] w-full items-center border-b border-dashed'>
      <div className='relative mx-3 flex w-full border-l border-r border-dashed border-blue-200 dark:border-blue-300/15 md:mx-12'>
        <NavigationMenu className='relative z-[2] flex w-full justify-between gap-4 px-4 py-3 md:px-6 lg:gap-0'>
          <NavigationMenuList className=''>
            <Link href='/' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t('home')}
              </NavigationMenuLink>
            </Link>
            {/* <Link href='/messagebook' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                MessageBook
              </NavigationMenuLink>
            </Link>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                  <li className='row-span-3'>
                    <NavigationMenuLink asChild>
                      <a
                        className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                        href='/'
                      >
                        <div className='mb-2 mt-4 text-lg font-medium'>
                          shadcn/ui
                        </div>
                        <p className='text-sm leading-tight text-muted-foreground'>
                          Beautifully designed components built with Radix UI
                          and Tailwind CSS.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
          </NavigationMenuList>

          <div className='flex gap-4'>
            {/* <LocaleSelect /> */}
            <ThemeSelect />
          </div>
        </NavigationMenu>
      </div>
    </header>
  )
}
