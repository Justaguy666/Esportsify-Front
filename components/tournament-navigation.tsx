"use client"

import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, Info, Newspaper, Plus, Zap, Users, FileText } from "lucide-react"
import { getTournamentById } from '@/data/tournaments'
import { ROUTES } from "@/lib/constants"

interface TournamentNavigationProps {
  tournamentId?: string
  gameName?: string
  currentPage?: string
  onBack?: () => void
}

export function TournamentNavigation({ tournamentId, gameName, currentPage, onBack }: TournamentNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Get tournament data to check status
  const tournament = tournamentId ? getTournamentById(tournamentId) : null
  const isRegistrationTournament = tournament?.status === 'REGISTRATION'
  
  // Debug logging
  console.log('Tournament Navigation Debug:', {
    tournamentId,
    tournament,
    isRegistrationTournament,
    tournamentStatus: tournament?.status
  })

  // Function to extract game slug from tournament ID
  const getGameSlugFromTournamentId = (tournamentId: string): string => {
    if (tournamentId.includes('league-of-legends')) return 'league-of-legends'
    if (tournamentId.includes('counter-strike-2')) return 'counter-strike-2'
    if (tournamentId.includes('valorant')) return 'valorant'
    if (tournamentId.includes('dota-2')) return 'dota-2'
    if (tournamentId.includes('overwatch-2')) return 'overwatch-2'
    if (tournamentId.includes('starcraft-ii')) return 'starcraft-ii'
    return 'league-of-legends' // default fallback
  }

  // Get current tournament ID if on tournament detail page
  const getCurrentTournamentId = (): string => {
    const pathSegments = pathname.split('/')
    return pathSegments[pathSegments.length - 1] || ''
  }

  // Any tournaments status page under /user/tournaments/tournaments-status/*
  const isOnTournamentDetailPage = pathname.includes('/user/tournaments/tournaments-status/')

  // Handle back navigation
  const handleBackClick = () => {
    if (onBack) {
      onBack()
    } else if (tournamentId) {
      // Extract game slug from tournament ID
      const gameSlug = getGameSlugFromTournamentId(tournamentId)
      router.push(`${ROUTES.TOURNAMENTS}/${gameSlug}`)
    } else if (pathname.includes('/user/tournaments/tournaments-status/')) {
      // For tournament detail pages, extract game from tournament ID in URL
      const pathSegments = pathname.split('/')
      const tournamentIdFromPath = pathSegments[pathSegments.length - 1] || ''
      if (tournamentIdFromPath) {
        const gameSlug = getGameSlugFromTournamentId(tournamentIdFromPath)
        router.push(`${ROUTES.TOURNAMENTS}/${gameSlug}`)
      } else {
        router.push(ROUTES.HOME)
      }
    } else if (pathname.includes('/user/tournaments/')) {
      // For other tournament pages, try to extract game slug from path
      const segments = pathname.split('/')
      const tournamentsIndex = segments.indexOf('tournaments')
      const gameSlug = tournamentsIndex >= 0 ? segments[tournamentsIndex + 1] : ''
      if (gameSlug && !['tournaments', 'tournaments-status'].includes(gameSlug)) {
        router.push(`${ROUTES.TOURNAMENTS}/${gameSlug}`)
      } else {
        router.push(ROUTES.HOME)
      }
    } else {
      router.push(ROUTES.HOME)
    }
  }

  const navigationItems = [
    {
      id: 'back',
      label: 'Back to Tournaments',
      icon: ArrowLeft,
      onClick: handleBackClick,
      isBack: true
    },
    {
      id: 'about',
      label: 'About Tournament',
      icon: Info,
      onClick: () => {
        if (isOnTournamentDetailPage && tournamentId) {
          router.push(`/user/about-tournament?tournament=${tournamentId}`)
        } else {
          router.push('/user/about-tournament')
        }
      },
      isActive: pathname.includes('/about-tournament') || isOnTournamentDetailPage
    },
    {
      id: 'news',
      label: 'News',
      icon: Newspaper,
      onClick: () => {
        const currentTournamentId = tournamentId || getCurrentTournamentId()
        if (currentTournamentId) {
          router.push(`/user/tournaments/tournaments-status/news/${currentTournamentId}`)
        }
      },
      isActive: pathname.includes('/news')
    },
    {
      id: 'matches',
      label: 'Matches & Results',
      icon: Zap,
      onClick: () => {
        if (!isRegistrationTournament) {
          const currentTournamentId = tournamentId || getCurrentTournamentId()
          if (currentTournamentId) {
            router.push(`/user/tournaments/tournaments-status/matches/${currentTournamentId}`)
          }
        }
      },
      isActive: pathname.includes('/matches'),
      disabled: isRegistrationTournament
    },
    {
      id: 'highlights',
      label: 'Highlights',
      icon: Plus,
      onClick: () => {
        if (!isRegistrationTournament) {
          const currentTournamentId = tournamentId || getCurrentTournamentId()
          if (currentTournamentId) {
            router.push(`/user/tournaments/tournaments-status/highlights/${currentTournamentId}`)
          }
        }
      },
      isActive: pathname.includes('/highlights'),
      disabled: isRegistrationTournament
    },
    {
      id: 'rules',
      label: 'Rules',
      icon: FileText,
      onClick: () => {
        const currentTournamentId = tournamentId || getCurrentTournamentId()
        if (currentTournamentId) {
          router.push(`/user/tournaments/tournaments-status/rules/${currentTournamentId}`)
        }
      },
      isActive: pathname.includes('/rules')
    },
    {
      id: 'participants',
      label: 'Participants',
      icon: Users,
      onClick: () => {
        // Only navigate if not already on participants page and not registration tournament
        if (!pathname.includes('/participants') && !isRegistrationTournament) {
          const currentTournamentId = tournamentId || getCurrentTournamentId()
          if (currentTournamentId) {
            // Navigate directly to team-participants to avoid redirector
            router.push(`/user/tournaments/tournaments-status/participants/${currentTournamentId}/team-participants`)
          }
        }
      },
      isActive: pathname.includes('/participants'),
      disabled: isRegistrationTournament
    }
  ]

  // Separate back button from other navigation items
  const backButton = navigationItems.find(item => item.isBack)
  const featureItems = navigationItems.filter(item => !item.isBack)

  // Tournament navigation component with feature buttons
  return (
    <div className="w-full px-8 mb-8">
      <div className="bg-gradient-to-r from-[#1A1A2E]/80 to-[#16213E]/80 backdrop-blur-sm border border-[#3D5AF1]/30 rounded-2xl px-6 py-4">
        {/* Back Button */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-[#A5B4FC] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Tournaments</span>
          </button>
        </div>
        
        {/* Feature Navigation Buttons */}
        <div className="flex flex-wrap gap-3">
          {featureItems.map((item) => {
            const IconComponent = item.icon
            return (
              <button
                key={item.id}
                onClick={!item.disabled ? item.onClick : undefined}
                disabled={item.isActive || item.disabled}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.isActive
                    ? 'bg-[#3D5AF1] text-white shadow-lg shadow-[#3D5AF1]/30 cursor-default'
                    : item.disabled
                    ? 'bg-[#2A2A4A]/30 text-[#A5B4FC]/50 cursor-not-allowed opacity-50 pointer-events-none'
                    : 'bg-[#2A2A4A]/50 text-[#A5B4FC] hover:bg-[#3D5AF1]/20 hover:text-white cursor-pointer'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
        
        {currentPage && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#3D5AF1]/20">
            <span className="text-[#A5B4FC] text-sm">Current:</span>
            <span className="text-white font-medium capitalize">{currentPage}</span>
          </div>
        )}
      </div>
    </div>
  )
}
