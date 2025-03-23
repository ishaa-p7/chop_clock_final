'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AdminGaurd = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status !== 'authenticated' || session?.user.role != 'ADMIN') {
            router.push('/') // Redirect logged-in users to home
        }
    }, [session, status, router])

    if (status === 'loading') return null // Prevent flashing

    return <>{children}</>
}

export default AdminGaurd
