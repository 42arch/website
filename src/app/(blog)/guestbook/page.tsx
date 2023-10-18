import { auth } from '@/lib/auth'
import Image from 'next/image'
import { SignIn, SignOut } from './buttons'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

type GithubUser = {
  name: string
  email: string
  sub: string
  picture: string
}

export default async function Page() {
  let session
  let user

  try {
    const [sessionRes] = await Promise.allSettled([auth()])

    if (sessionRes?.status === 'fulfilled') {
      session = sessionRes?.value
      user = session?.user as unknown as GithubUser
    } else {
      console.error(sessionRes)
    }
  } catch (error) {}

  console.log('session', session)

  return (
    <div className="flex flex-col mx-auto max-w-6xl py-6 px-0 md:px-8 lg:px-24">
      <h1 className="text-2xl font-semibold leading-9 mb-6 md:mb-8">
        guestbook
      </h1>
      {user ? (
        <div className="flex flex-col">
          <h2 className="text-xl mb-2">👋 Welcome! </h2>
          <div className="flex items-end gap-4 mb-2 px-1">
            <Image
              src={user.picture}
              alt={user.name}
              width={48}
              height={48}
              className="rounded-full ring-1 ring-zinc-900/5"
            />
            <div className="flex flex-col">
              <span className="text-zinc-700 dark:text-zinc-300">
                {user.name}
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {user.email}
              </span>
            </div>
          </div>
          <SignOut />
        </div>
      ) : (
        <SignIn />
      )}

      <p>Working In Progress...</p>
    </div>
  )
}
