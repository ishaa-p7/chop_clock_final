'use client'

import AdminGaurd from "../_components/AdminGaurd";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <AdminGaurd>
            <main>
                {children}
            </main>
        </AdminGaurd>
    )
}
