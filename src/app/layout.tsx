'use client'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'
import { SessionProvider } from 'next-auth/react'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider attribute="class" defaultTheme="system">
                    <SessionProvider>
                        <Navbar />
                        {children}
                        <Footer />
                    </SessionProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
