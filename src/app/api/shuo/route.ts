import { PrismaClient, Shuo } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const page = parseInt(searchParams.get('page') || '0')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const data = await prisma.shuo.findMany({
    skip: page * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: 'desc'
    }
  })
  const total = await prisma.shuo.count()
  const nextPage = (page + 1) * pageSize < total ? page + 1 : undefined
  return NextResponse.json({
    data,
    nextPage
  })
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as Shuo

    const res = await prisma.shuo.create({
      data: {
        content: data.content
      }
    })
    return NextResponse.json(res)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 })
  }
}
