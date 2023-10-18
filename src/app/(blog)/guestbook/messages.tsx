import { db } from '@/lib/kysely'
import { seed } from '@/lib/seed'

export default async function Messages() {
  let messages
  let startTime = Date.now()

  try {
    messages = await db.selectFrom('guestbook').selectAll().execute()
  } catch (error: any) {
    if (error.message === `relation "users" does not exist`) {
      console.log(
        'Table does not exist, creating and seeding it with dummy data now...'
      )
      // Table is not created yet
      await seed()
      startTime = Date.now()
      messages = await db.selectFrom('guestbook').selectAll().execute()
    } else {
      throw error
    }
  }

  const duration = Date.now() - startTime

  return (
    <div className="flex flex-col gap-2">
      <span>duration: {duration}</span>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.name}</p>
          <p>{message.body}</p>
        </div>
      ))}
    </div>
  )
}
