import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const {
            name,
            email,
            phone,
            date,
            timeSlot,
            selectedServices,
            totalCost,
            totalDuration,
        } = body

        // Validation
        if (
            !name ||
            !email ||
            !phone ||
            !date ||
            !timeSlot ||
            !selectedServices?.length
        ) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 },
            )
        }

        // Verify services exist
        const services = await prisma.service.findMany({
            where: { id: { in: selectedServices } },
        })

        if (services.length !== selectedServices.length) {
            return NextResponse.json(
                { error: 'One or more services not found' },
                { status: 400 },
            )
        }

        // Create appointment
        const appointment = await prisma.appointment.create({
            data: {
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                date: new Date(date),
                time: timeSlot,
                totalPrice: totalCost,
                totalDuration: totalDuration,
                status: 'pending',
                userId: session.user.id,
                serviceIds: selectedServices,
            },
        })

        // Update services with appointment ID
        await prisma.service.updateMany({
            where: { id: { in: selectedServices } },
            data: {
                appointmentIds: {
                    push: appointment.id,
                },
            },
        })

        return NextResponse.json(appointment, { status: 201 })
    } catch (error) {
        console.error('[APPOINTMENT_POST]', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        )
    }
}
