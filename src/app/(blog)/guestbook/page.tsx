import { auth } from '@/lib/auth'
import { SignIn, SignOut } from './buttons'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function Page() {
  let session

  try {
    const [sessionRes] = await Promise.allSettled([auth()])
    console.log('session', sessionRes)

    if (sessionRes?.status === 'fulfilled') {
      session = sessionRes?.value
    } else {
      console.error(sessionRes)
    }
  } catch (error) {}

  return (
    <div className="flex flex-col mx-auto max-w-6xl py-6 px-0 md:px-8 lg:px-24">
      <h1 className="text-2xl font-semibold leading-9 mb-6 md:mb-8">
        guestbook
      </h1>
      {session?.user ? (
        <>
          <p>{session?.user.name}</p>
          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  )
}
