"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react"

interface SidebarContextType {
  isOpen: boolean
  toggleSidebar: () => void
  openSidebar: () => void
  closeSidebar: () => void
  setSidebarState: (open: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps {
  children: ReactNode
  defaultOpen?: boolean
}

export function SidebarProvider({ children, defaultOpen = true }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const openSidebar = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeSidebar = useCallback(() => {
    setIsOpen(false)
  }, [])

  const setSidebarState = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  const value: SidebarContextType = {
    isOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setSidebarState,
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarContext() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }
  return context
}
