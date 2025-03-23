import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function GET() {
    try {
        const shop = await prisma.shop.findFirst({
            include: { services: true, reviews: true },
        })

        if (!shop) {
            return new NextResponse(
                JSON.stringify({ error: 'No shop found' }),
                {
                    status: 404,
                    headers: corsHeaders,
                },
            )
        }

        return new NextResponse(JSON.stringify(shop), {
            status: 200,
            headers: corsHeaders,
        })
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'Error fetching shop' }),
            {
                status: 500,
                headers: corsHeaders,
            },
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Delete any existing shops (enforce single shop)
        await prisma.shop.deleteMany()

        // Create new shop
        const newShop = await prisma.shop.create({
            data: {
                name: body.name,
                tagline: body.tagline,
                location: body.location,
                description: body.description,
                phone: body.phone,
                hours: body.hours,
                rating: body.rating,
                reviewCount: body.reviewCount,
                services: {
                    create: body.services || [],
                },
                reviews: {
                    create: body.reviews || [],
                },
            },
            include: {
                services: true,
                reviews: true,
            },
        })

        return new NextResponse(JSON.stringify(newShop), {
            status: 201,
            headers: corsHeaders,
        })
    } catch (error) {
        console.error('Error creating shop:', error)
        return new NextResponse(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: corsHeaders,
            },
        )
    }
}

// Add OPTIONS handler for CORS
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    })
}
