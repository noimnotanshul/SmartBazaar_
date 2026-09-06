import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"

export const metadata: Metadata = {
  title: "SmartBazaar - The Art of Smart Shopping",
  description: "Indian e-commerce with AI bargaining",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
