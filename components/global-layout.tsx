"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AppSidebar } from "./app-sidebar"
import { GlobalHeader } from "./global-header"
import { EditProfileModal } from "./edit-profile-modal"

interface GlobalLayoutProps {
  children: React.ReactNode
  tournamentSelected?: boolean
  tournamentId?: string | undefined
  gameName?: string | undefined
}

export default function GlobalLayout({ children, tournamentSelected = false, tournamentId, gameName }: GlobalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    // Add a small delay to prevent flash
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] flex w-full overflow-x-hidden">
        {/* Loading Sidebar Skeleton */}
        <div className="fixed inset-y-0 left-0 z-10 w-[280px] bg-gradient-to-r from-[#1A1A2E] to-[#16213E] transform -translate-x-full transition-transform duration-300 ease-in-out opacity-0" />
        
        <div className="flex-1 flex flex-col w-full overflow-x-hidden transition-all duration-300 ease-in-out">
          {/* Loading Header */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1A1A2E] to-[#16213E] h-[88px] transition-all duration-300 ease-in-out" />
          
          {/* Loading Content with Fade */}
          <main className="flex-1 custom-scrollbar overflow-auto w-full overflow-x-hidden mt-[88px] transition-opacity duration-300 ease-in-out opacity-0 min-h-[calc(100vh-88px)]">
            <div className="animate-pulse flex flex-col min-h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] flex w-full overflow-x-hidden">
      <AppSidebar 
        tournamentSelected={tournamentSelected} 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onEditProfile={() => setIsEditModalOpen(true)}
      />

      <div 
        className="flex-1 flex flex-col w-full overflow-x-hidden transition-all duration-300 ease-in-out" 
        style={{ marginLeft: sidebarOpen ? '280px' : '0px' }}
      >
        <GlobalHeader 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          sidebarOpen={sidebarOpen}
          tournamentId={tournamentId}
          gameName={gameName}
        />

        {/* Main Content with proper spacing for fixed header and fade-in animation */}
        <main className="flex-1 custom-scrollbar overflow-auto w-full overflow-x-hidden mt-[88px] transition-opacity duration-300 ease-in-out opacity-100 animate-fadeIn min-h-[calc(100vh-88px)]">
          <div className="flex flex-col min-h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Edit Profile Modal - Rendered at body level */}
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  )
}
