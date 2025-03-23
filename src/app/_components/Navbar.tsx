'use client'

// import { useTheme } from 'next-themes'
import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/theme-toggler'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    // const { resolvedTheme, setTheme } = useTheme()
    const { data: session, status } = useSession() // No need for `update`
    const router = useRouter() // For navigation

    console.log(session)

    // Debugging: Log session to see if role is present
    useEffect(() => {
        console.log('Session in Navbar:', session)
    }, [session])

    // Check if user is an admin
    const isAdmin = session?.user?.role === 'ADMIN' || false

    if (status === 'loading') return null // Prevent UI from rendering before session loads

    return (
        <nav className="flex items-center justify-between p-4 shadow-md">
            {/* Left: Logo + Search */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                        CC
                    </div>
                    <Link href="/" className="text-2xl font-bold">
                        ChopClock
                    </Link>
                </div>
                <Input placeholder="Search..." className="w-64" />
            </div>

            {/* Right: Theme Toggle + Auth Buttons */}
            <div className="flex items-center space-x-4">
                <ModeToggle />

                {isAdmin && (
                    <button
                        onClick={() => router.push('/admin')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
                    >
                        Admin
                    </button>
                )}

                {session ? (
                    <div className="flex items-center space-x-4">
                        {/* Avatar */}
                        <img
                            src={
                                session.user?.image ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISxBTQ88B9PvlreCwRY0_wqZK7y4XoG4zIQ&s'
                            }
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        {/* Username */}
                        <span className="font-medium">
                            {session.user?.email}
                        </span>
                        {/* Logout Button */}
                        <button
                            onClick={() => signOut()}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        href={'/login'}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar
