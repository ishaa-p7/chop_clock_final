import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'

export async function GET() {
  try {
    // Get shop with its services
    const shop = await prisma.shop.findFirst({
      include: { services: true },
    })

    if (!shop) {
      return NextResponse.json({ services: [] }, { status: 400 })
    }

    return NextResponse.json(shop.services)
  } catch (error) {
    console.error('[SERVICES_GET_ERROR]', error)
    return NextResponse.json(
      { error: 'Failed to load services' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const shop = await prisma.shop.findFirst()
    if (!shop) {
      return NextResponse.json(
        { error: 'Shop must be created first' },
        { status: 400 },
      )
    }

    const { name, description, price, duration } = await req.json()

    const service = await prisma.service.create({
      data: {
        name,
        description,
        price: Number(price),
        duration: Number(duration),
        shopId: shop.id,
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('[SERVICE_CREATE_ERROR]', error)
    return NextResponse.json(
      { error: 'Error creating service' },
      { status: 500 },
    )
  }
}
