import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                username: { label: 'Username', type: 'text' },
            },

            async authorize(credentials: any) {
                const { email, password, username } = credentials

                // Check if user is signing up (via `username` presence)
                if (username) {
                    const existingUser = await prisma.user.findUnique({
                        where: { email },
                    })
                    if (existingUser) {
                        throw new Error('User already exists')
                    }

                    const hashedPassword = await bcrypt.hash(password, 10)

                    // Create the user with default role 'USER'
                    const newUser = await prisma.user.create({
                        data: {
                            username,
                            email,
                            password: hashedPassword,
                          //  role: 'USER', // Set default role
                        },
                    })

                    return newUser
                }

                // Login flow: Check user credentials
                const user = await prisma.user.findUnique({
                    where: { email },
                })

                if (!user) {
                    throw new Error('User not found')
                }

                const isValidPassword = await bcrypt.compare(
                    password,
                    user.password,
                )
                if (!isValidPassword) {
                    throw new Error('Invalid credentials')
                }

                return user
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.username = user.username
                token.role = user.role // ✅ Include role in JWT
            }
            return token
        },
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.username = token.username
                session.user.role = token.role // ✅ Include role in session
            }
            return session
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
