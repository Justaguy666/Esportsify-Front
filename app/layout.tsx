import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import { AppProviders } from "@/providers/app-providers"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Esportsify",
  description:
    "The ultimate platform for managing esports tournaments, teams, and players across multiple gaming titles.",
  generator: 'v0.dev',
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{colorScheme: "dark"}}>
      <body className="antialiased bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] overflow-x-hidden w-full transition-opacity duration-300 ease-in-out"
            style={{
              '--font-inter': inter.style.fontFamily,
              '--font-orbitron': orbitron.style.fontFamily,
            } as React.CSSProperties}>
        <AppProviders>
          <ErrorBoundary>
            <div className="min-h-screen transition-all duration-300 ease-in-out">
              {children}
            </div>
          </ErrorBoundary>
        </AppProviders>
      </body>
    </html>
  )
}
