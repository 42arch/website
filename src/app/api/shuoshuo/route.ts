import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const shuoshuo = await prisma.shuoshuo.findMany()

  return NextResponse.json(shuoshuo)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 })
  }
}
