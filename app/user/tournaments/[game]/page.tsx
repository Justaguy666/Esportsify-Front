"use client"

import { getTournamentById } from '@/data/tournaments'
import { getTournamentsForGame, getMappedTournamentId, type TournamentSelection } from '@/data/tournament-selection'
import { getGameDisplayName, tournamentFilters } from '@/data/statistics'
import { tournamentDataService } from '@/data/tournament-data-service'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, MapPin, Users, Trophy, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useFavorites } from '@/hooks/use-favorites'
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"


export default function TournamentSelection() {
  const router = useRouter()
  const params = useParams()
  const gameSlug = (params?.game as string) || ''

  const gameName = getGameDisplayName(gameSlug)

  const [activeFilter, setActiveFilter] = useState("All Tournaments")
  const [currentPage, setCurrentPage] = useState(1)
  const tournamentsPerPage = 6


  const tournaments = getTournamentsForGame(gameSlug)

  const filters = tournamentFilters

  // Get user's followed tournaments from local storage
  const { getFavoritesByType } = useFavorites()
  const userFollowedTournaments = getFavoritesByType("tournament").map((fav: any) => fav.id)
  
  // Force re-render when favorites change
  const [, forceUpdate] = useState({})
  
  // Listen for localStorage changes to update the component
  useEffect(() => {
    const handleStorageChange = () => {
      forceUpdate({})
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])
  
  // Filter tournaments based on user preferences

  // Filter tournaments based on active filter
  const getFilteredTournaments = () => {
    switch (activeFilter) {
      case "Live Now":
        return tournaments.filter(tournament => tournament.status === "LIVE")
      case "Upcoming":
        return tournaments.filter(tournament => tournament.status === "UPCOMING")
      case "Active":
        return tournaments.filter(tournament => tournament.status === "ACTIVE")
      case "Registration":
        return tournaments.filter(tournament => tournament.status === "REGISTRATION")
      case "Completed":
        return tournaments.filter(tournament => tournament.status === "COMPLETED")
      case "My Schedule":
        console.log("=== MY SCHEDULE FILTERING ===")
        console.log("Tournament IDs being checked:", tournaments.map(t => t.id))
        console.log("User followed tournament IDs:", userFollowedTournaments)
        console.log("DETAILED FAVORITES:", getFavoritesByType("tournament").map(fav => ({ 
          id: fav.id, 
          name: fav.name,
          type: fav.type 
        })))
        
        // Check each tournament individually with ID mapping
        tournaments.forEach(tournament => {
          const fullTournamentId = `${gameSlug}-${tournament.id}`
          const isIncluded = userFollowedTournaments.includes(tournament.id) || userFollowedTournaments.includes(fullTournamentId)
          console.log(`Tournament "${tournament.name}" (${tournament.id}) | Full ID: ${fullTournamentId}: ${isIncluded ? 'INCLUDED' : 'EXCLUDED'}`)
        })
        
        // Filter with both short and full ID matching
        const filtered = tournaments.filter(tournament => {
          const fullTournamentId = `${gameSlug}-${tournament.id}`
          return userFollowedTournaments.includes(tournament.id) || userFollowedTournaments.includes(fullTournamentId)
        })
        console.log("Final filtered results count:", filtered.length)
        console.log("Final filtered results:", filtered.map(t => ({ id: t.id, name: t.name })))
        console.log("============================")
        return filtered
      default:
        return tournaments
    }
  }

  const filteredTournaments = getFilteredTournaments()
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredTournaments.length / tournamentsPerPage)
  const startIndex = (currentPage - 1) * tournamentsPerPage
  const endIndex = startIndex + tournamentsPerPage
  const currentTournaments = filteredTournaments.slice(startIndex, endIndex)
  
  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  const getStatusBadge = (status: TournamentSelection["status"]) => {
    const statusConfig = {
      LIVE: { bg: "bg-gradient-to-r from-[#EF4444] to-[#DC2626]", text: "LIVE" },
      UPCOMING: { bg: "bg-gradient-to-r from-[#F59E0B] to-[#D97706]", text: "UPCOMING" },
      ACTIVE: { bg: "bg-gradient-to-r from-[#ED3A94] to-[#AF3DF1]", text: "ACTIVE" },
      REGISTRATION: { bg: "bg-gradient-to-r from-[#10B981] to-[#059669]", text: "REGISTRATION" },
      COMPLETED: { bg: "bg-gradient-to-r from-[#6B7280] to-[#4B5563]", text: "COMPLETED" },
    }

    const config = statusConfig[status]
    return (
      <div className={`${config.bg} rounded-xl px-4 py-2 shadow-lg flex items-center justify-center`}>
        <span className="text-white text-sm font-bold text-center">{config.text}</span>
      </div>
    )
  }

  const handleTournamentClick = (tournament: TournamentSelection) => {
    const mappedId = getMappedTournamentId(tournament.id)
    const statusRoute = tournament.status?.toLowerCase() || 'active'
    
    if (!mappedId || mappedId === 'undefined') {
      console.error('Invalid tournament ID:', tournament)
      return
    }
    
    router.push(`/user/tournaments/tournaments-status/${statusRoute}/${mappedId}`)
  }

  return (
    <GlobalLayout tournamentSelected={true}>
      <div className="flex flex-col min-h-full bg-gradient-to-br from-[#16213E] via-[#1A1A2E] to-[#0F0F23] custom-scrollbar overflow-x-hidden w-full">
        <div className="flex-1">
          {/* Header */}
          <header className="w-full py-12 text-center">
            {/* Game Title */}
            <div className="my-12">
              <h1 className="text-white text-8xl text-gaming-title mb-12">{gameName}</h1>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3D5AF1] to-transparent"></div>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center my-12 px-4">
              <div className="bg-gradient-to-r from-[#2A2A4A] to-[#1E1E3F] border border-[#3D5AF1] rounded-2xl p-3 flex flex-wrap justify-center gap-2 max-w-6xl">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-3 rounded-xl font-bold text-base lg:text-lg transition-all whitespace-nowrap ${
                      activeFilter === filter
                        ? "bg-gradient-to-r from-[#7C3AED] to-[#3D5AF1] text-white shadow-lg"
                        : "text-[#A5B4FC] hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Tournament Grid */}
            <div className="w-full px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {currentTournaments.map((tournament) => (
                <Card
                  key={tournament.id}
                  className="bg-gradient-to-b from-[#2A2A4A] to-[#1E1E3F] border border-[#3D5AF1] rounded-3xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => handleTournamentClick(tournament)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={tournament.image || "/placeholder.svg"}
                        alt={tournament.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">{getStatusBadge(tournament.status)}</div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-white text-3xl text-gaming-subtitle mb-6">{tournament.name}</h3>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <p className="text-[#A5B4FC] text-lg mb-2">Prize Pool</p>
                          <p className="text-white text-xl font-bold">{tournament.prizePool}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[#A5B4FC] text-lg mb-2">Participants</p>
                          <p className="text-white text-xl font-bold">{tournament.participants}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[#A5B4FC] text-lg mb-2">Viewers</p>
                          <p className="text-white text-xl font-bold">{tournament.viewers}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              </div>
            </div>

            {/* Pagination - Only show if more than 6 tournaments */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#27272A]/50 text-white hover:bg-[#27272A] rounded-lg"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant="ghost"
                    className={`w-10 h-10 rounded-lg font-bold ${
                      currentPage === page
                        ? "bg-[#4318D1] text-white"
                        : "bg-[#27272A]/80 text-[#A1A1AA] hover:bg-[#27272A] hover:text-white"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#27272A]/50 text-white hover:bg-[#27272A] rounded-lg"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </header>
        </div>

        <GlobalFooter />
      </div>
    </GlobalLayout>
  )
}
