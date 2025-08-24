"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, User, Info, Newspaper, Plus, Zap, Users, FileText, ArrowLeft } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useGlobalSearch } from "@/hooks/use-global-search"
import { useNotifications } from "@/hooks/use-notifications"
import { SearchDropdown } from "@/components/search-dropdown"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { useEffect, useRef } from "react"
import { getTournamentById } from '@/data/tournaments'
import { useAuthContext } from "@/contexts/auth-context"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getAvatarInitials } from "@/data/users"

interface GlobalHeaderProps {
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
  tournamentId?: string | undefined
  gameName?: string | undefined
}

export function GlobalHeader({ onToggleSidebar, sidebarOpen = true, tournamentId, gameName }: GlobalHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const { user, isAuthenticated } = useAuthContext()
  
  // Get tournament data to check status
  const tournament = tournamentId ? getTournamentById(tournamentId) : null
  const isRegistrationTournament = tournament?.status === 'REGISTRATION'
  
  // Debug logging
  console.log('Global Header Debug:', {
    tournamentId,
    tournament,
    isRegistrationTournament,
    tournamentStatus: tournament?.status
  })
  
  // Search functionality
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    isOpen: isSearchOpen,
    setIsOpen: setIsSearchOpen,
    clearSearch
  } = useGlobalSearch()
  
  // Notification functionality
  const {
    notifications,
    unreadCount,
    isOpen: isNotificationOpen,
    setIsOpen: setIsNotificationOpen,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications
  } = useNotifications()

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

  const isOnTournamentDetailPage = pathname.includes('/tournaments/tournaments-status/live/') || 
    pathname.includes('/tournaments/tournaments-status/active/') || 
    pathname.includes('/tournaments/tournaments-status/upcoming/') || 
    pathname.includes('/tournaments/tournaments-status/registration/') || 
    pathname.includes('/tournaments/tournaments-status/completed/') ||
    pathname.includes('/tournaments/tournaments-status/news/') ||
    pathname.includes('/tournaments/tournaments-status/matches/') ||
    pathname.includes('/tournaments/tournaments-status/highlights/') ||
    pathname.includes('/tournaments/tournaments-status/rules/') ||
    pathname.includes('/tournaments/tournaments-status/participants/')

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsSearchOpen, setIsNotificationOpen])

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value.length >= 2) {
      setIsSearchOpen(true)
    } else {
      setIsSearchOpen(false)
    }
  }

  const handleSearchSelect = (result: any) => {
    clearSearch()
  }

  // Handle back navigation
  const handleBackClick = () => {
    if (tournamentId) {
      const gameSlug = getGameSlugFromTournamentId(tournamentId)
      router.push(`/tournaments/${gameSlug}`)
    } else if (pathname.includes('/tournaments/tournaments-status/')) {
      const pathSegments = pathname.split('/')
      const tournamentIdFromPath = pathSegments[pathSegments.length - 1] || ''
      if (tournamentIdFromPath) {
        const gameSlug = getGameSlugFromTournamentId(tournamentIdFromPath)
        router.push(`/tournaments/${gameSlug}`)
      } else {
        router.push('/home')
      }
    } else {
      router.push('/home')
    }
  }

  // Get current tournament ID from URL if not provided
  const getCurrentTournamentId = (): string => {
    const pathSegments = pathname.split('/')
    return pathSegments[pathSegments.length - 1] || ''
  }

  const tournamentNavigationItems = [
    {
      id: 'about',
      label: 'About',
      icon: Info,
      onClick: () => {
        const currentTournamentId = tournamentId || getCurrentTournamentId()
        if (currentTournamentId) {
          // Determine tournament status from URL or find the appropriate status page
          if (pathname.includes('/tournaments/tournaments-status/news/') || 
              pathname.includes('/tournaments/tournaments-status/matches/') ||
              pathname.includes('/tournaments/tournaments-status/highlights/') ||
              pathname.includes('/tournaments/tournaments-status/rules/') ||
              pathname.includes('/tournaments/tournaments-status/participants/')) {
            // If on a feature page, determine status from tournament ID or default to live
            if (currentTournamentId.includes('live') || pathname.includes('/live/')) {
              router.push(`/tournaments/tournaments-status/live/${currentTournamentId}`)
            } else if (currentTournamentId.includes('active') || pathname.includes('/active/')) {
              router.push(`/tournaments/tournaments-status/active/${currentTournamentId}`)
            } else if (currentTournamentId.includes('upcoming') || pathname.includes('/upcoming/')) {
              router.push(`/tournaments/tournaments-status/upcoming/${currentTournamentId}`)
            } else if (currentTournamentId.includes('registration') || pathname.includes('/registration/')) {
              router.push(`/tournaments/tournaments-status/registration/${currentTournamentId}`)
            } else if (currentTournamentId.includes('completed') || pathname.includes('/completed/')) {
              router.push(`/tournaments/tournaments-status/completed/${currentTournamentId}`)
            } else {
              // Default to live for most tournaments
              router.push(`/tournaments/tournaments-status/live/${currentTournamentId}`)
            }
          } else if (pathname.includes('/live/')) {
            router.push(`/tournaments/tournaments-status/live/${currentTournamentId}`)
          } else if (pathname.includes('/active/')) {
            router.push(`/tournaments/tournaments-status/active/${currentTournamentId}`)
          } else if (pathname.includes('/upcoming/')) {
            router.push(`/tournaments/tournaments-status/upcoming/${currentTournamentId}`)
          } else if (pathname.includes('/registration/')) {
            router.push(`/tournaments/tournaments-status/registration/${currentTournamentId}`)
          } else if (pathname.includes('/completed/')) {
            router.push(`/tournaments/tournaments-status/completed/${currentTournamentId}`)
          } else {
            // Default to live status page
            router.push(`/tournaments/tournaments-status/live/${currentTournamentId}`)
          }
        }
      },
      isActive: pathname.includes('/tournaments/tournaments-status/live/') || pathname.includes('/tournaments/tournaments-status/active/') || pathname.includes('/tournaments/tournaments-status/upcoming/') || pathname.includes('/tournaments/tournaments-status/registration/') || pathname.includes('/tournaments/tournaments-status/completed/')
    },
    {
      id: 'news',
      label: 'News',
      icon: Newspaper,
      onClick: () => {
        const currentTournamentId = tournamentId || getCurrentTournamentId()
        if (currentTournamentId) {
          router.push(`/tournaments/tournaments-status/news/${currentTournamentId}`)
        }
      },
      isActive: pathname.includes('/news')
    },
    {
      id: 'matches',
      label: 'Matches',
      icon: Plus,
      onClick: () => {
        if (!isRegistrationTournament) {
          const currentTournamentId = tournamentId || getCurrentTournamentId()
          if (currentTournamentId) {
            router.push(`/tournaments/tournaments-status/matches/${currentTournamentId}`)
          }
        } else {
          console.log('Navigation blocked: Tournament is in REGISTRATION status')
        }
      },
      isActive: pathname.includes('/matches'),
      disabled: isRegistrationTournament
    },
    {
      id: 'highlights',
      label: 'Highlights',
      icon: Zap,
      onClick: () => {
        if (!isRegistrationTournament) {
          const currentTournamentId = tournamentId || getCurrentTournamentId()
          if (currentTournamentId) {
            router.push(`/tournaments/tournaments-status/highlights/${currentTournamentId}`)
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
          router.push(`/tournaments/tournaments-status/rules/${currentTournamentId}`)
        }
      },
      isActive: pathname.includes('/rules')
    },
    {
      id: 'participants',
      label: 'Participants',
      icon: Users,
      onClick: () => {
        if (!isRegistrationTournament) {
          const currentTournamentId = tournamentId || getCurrentTournamentId()
          if (currentTournamentId) {
            router.push(`/tournaments/tournaments-status/participants/${currentTournamentId}`)
          }
        }
      },
      isActive: pathname.includes('/participants'),
      disabled: isRegistrationTournament
    }
  ]

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1A1A2E] to-[#16213E] px-6 py-4 border-b border-[#3D5AF1]/30 backdrop-blur-sm transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarOpen ? '280px' : '0px' }}
      >
        <div className="flex items-center w-full">
          <div className="flex items-center gap-4">
            {/* Purple Sidebar Toggle Button */}
            <Button 
              className="w-12 h-12 bg-gradient-to-r from-[#3D5AF1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#8B5CF6] rounded-xl p-3 text-white transition-all duration-300 ease-in-out shadow-lg"
              onClick={onToggleSidebar}
            >
              <div className="w-full h-full flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-white rounded"></div>
                <div className="w-full h-0.5 bg-white rounded"></div>
                <div className="w-full h-0.5 bg-white rounded"></div>
              </div>
            </Button>

            {/* Logo */}
            <div
              className="flex items-center bg-[#5B46E5]/20 rounded-2xl px-6 py-3 border border-[#5B46E5]/30 cursor-pointer hover:bg-[#5B46E5]/30 transition-all duration-300 ease-in-out"
              onClick={() => router.push("/home")}
            >
              <img src="/assets/logo.png" alt="ESPORTSIFY Logo" className="w-6 h-5 mr-3" />
              <span className="text-[#5B46E5] font-bold text-xl">E</span>
              <span className="text-white font-bold text-xl">SPORT</span>
              <span className="text-[#5B46E5] font-bold text-xl">SIFY</span>
            </div>
          </div>

          {/* Tournament Navigation - Centered */}
          {(isOnTournamentDetailPage || tournamentId) && (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-3">
                {tournamentNavigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = item.isActive

                  return (
                    <Button
                      key={item.id}
                      disabled={item.disabled}
                      className={`flex items-center gap-4 px-10 py-5 rounded-xl text-xl font-bold transition-all duration-300 ease-in-out ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#5B46E5] to-[#00E0FF] text-white shadow-lg' 
                          : item.disabled
                          ? 'bg-white/5 text-[#A5B4FC]/50 cursor-not-allowed opacity-50 pointer-events-none'
                          : 'bg-white/10 text-[#A5B4FC] hover:bg-white/20 hover:text-white'
                      }`}
                      onClick={!item.disabled ? item.onClick : undefined}
                    >
                      <Icon className="w-7 h-7" />
                      <span>{item.label}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Right side - only show when NOT on tournament page */}
          {!(isOnTournamentDetailPage || tournamentId) && (
            <div className="flex-1"></div>
          )}

          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div ref={searchRef} className="relative">
              <div className="flex items-center bg-[#2A2A4A]/50 border border-[#3D5AF1]/50 rounded-xl px-4 py-3 min-w-[300px]">
                <Input
                  type="text"
                  placeholder="Search games or tournaments..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => searchTerm.length >= 2 && setIsSearchOpen(true)}
                  className="bg-transparent border-none text-[#A5B4FC] placeholder:text-[#A5B4FC]/70 focus:ring-0 flex-1 text-base"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#A5B4FC] hover:text-white hover:bg-[#5B46E5]/20 rounded-lg transition-all duration-300 ease-in-out"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              
              <SearchDropdown
                searchResults={searchResults}
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onSelect={handleSearchSelect}
              />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {isAuthenticated && (
                <div ref={notificationRef} className="relative">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-[#5B46E5]/20 rounded-lg transition-all duration-300 ease-in-out relative"
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </Button>
                  
                  <NotificationDropdown
                    notifications={notifications}
                    isOpen={isNotificationOpen}
                    unreadCount={unreadCount}
                    onClose={() => setIsNotificationOpen(false)}
                    onMarkAsRead={markAsRead}
                    onMarkAllAsRead={markAllAsRead}
                    onRemove={removeNotification}
                    onClearAll={clearAllNotifications}
                  />
                </div>
              )}

              {isAuthenticated ? (
                // User Avatar when authenticated (no dropdown)
                <Avatar className="w-12 h-12 rounded-full cursor-default">
                  <AvatarImage src={user?.avatar || '/assets/user.png'} alt={user?.username || 'User'} />
                  <AvatarFallback className="bg-gradient-to-r from-[#3D5AF1] to-[#7C3AED] text-white font-bold">
                    {user?.username ? getAvatarInitials(user.username) : 'U'}
                  </AvatarFallback>
                </Avatar>
              ) : (
                // Login button for guests
                <Button
                  className="px-6 py-3 bg-gradient-to-r from-[#3D5AF1] to-[#7C3AED] hover:from-[#4F46E5] hover:to-[#8B5CF6] text-white rounded-xl font-semibold shadow-lg transition-all duration-300 ease-in-out"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
