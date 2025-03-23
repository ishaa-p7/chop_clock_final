import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/config/authOptions'

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await context.params // Await params in case it's a Promise
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await prisma.service.delete({
            where: { id: id },
        })

        return NextResponse.json({ message: 'Service deleted successfully' })
    } catch (error) {
        console.error('[SERVICE_DELETE_ERROR]', error)
        return NextResponse.json(
            { error: 'Error deleting service' },
            { status: 500 },
        )
    }
}
