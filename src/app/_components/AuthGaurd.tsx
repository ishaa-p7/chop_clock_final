'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/') // Redirect logged-in users to home
        }
    }, [session, status, router])

    if (status === 'loading') return null // Prevent flashing

    return <>{children}</>
}

export default AuthGuard
