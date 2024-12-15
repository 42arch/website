import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
})

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email')
})

export const usersSchema = z.array(userSchema)

export type User = z.infer<typeof userSchema>
export type Users = z.infer<typeof usersSchema>
