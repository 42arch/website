import { Generated, ColumnType } from 'kysely'
import { createKysely } from '@vercel/postgres-kysely'

interface GuestbookTable {
  id: Generated<number>
  name: string
  email: string
  image: string
  body: string
  createdAt: ColumnType<Date, string | undefined, never>
}

interface Database {
  guestbook: GuestbookTable
}

export const db = createKysely<Database>()
export { sql } from 'kysely'
