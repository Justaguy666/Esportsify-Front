"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/constants"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Previously redirected guests to /login. For guest mode, always go to /home.
    // Authenticated users will see their personalized UI; guests will browse with limited features.
    router.replace(ROUTES.HOME)
  }, [router])

  // Show loading state during redirect
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">Loading...</div>
    </div>
  )
}
