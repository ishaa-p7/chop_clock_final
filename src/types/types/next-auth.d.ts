import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            username: string
            email: string
            role: string
        } & DefaultSession['user']
    }

    interface User extends DefaultUser {
        id: string
        username: string
        role: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        username: string
        role: string
    }
}
