import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { createUserSchema } from '@/app/types'

const prisma = new PrismaClient()

export async function GET() {
  const users = await prisma.user.findMany()

  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const parsedData = createUserSchema.parse(data)

    const newUser = await prisma.user.create({
      data: parsedData
    })
    return NextResponse.json(newUser)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
  }
}
