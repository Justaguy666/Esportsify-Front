"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Custom hook for managing sidebar navigation logic
 * Centralizes all sidebar state management and navigation checks
 */
export function useSidebarLogic(tournamentSelected: boolean = false) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Navigation state calculations - simplified for new structure
  const isOnTournamentContext = pathname.includes('/user/tournaments/')
  
  // Tournament navigation should show when tournament is selected and we're in tournament context
  const shouldShowTournamentNav = tournamentSelected && isOnTournamentContext

  // Highlight logic for menu items
  const getMenuItemStyle = (isActive: boolean, isDisabled: boolean = false) => ({
    background: isActive 
      ? 'linear-gradient(135deg, rgba(91, 70, 229, 0.8) 0%, rgba(61, 90, 241, 0.8) 100%)' 
      : 'transparent',
    color: isDisabled ? '#6B7280' : (isActive ? '#FFFFFF' : '#A5B4FC'),
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
  })

  const getIconColor = (isActive: boolean, isDisabled: boolean = false) => 
    isDisabled ? '#6B7280' : (isActive ? '#FFFFFF' : '#A5B4FC')

  return {
    mounted,
    pathname,
    isOnTournamentContext,
    shouldShowTournamentNav,
    getMenuItemStyle,
    getIconColor,
  }
}
