"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, X, ChevronLeft, ChevronRight, Search, Trash2 } from "lucide-react"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { ROUTES } from "@/lib/constants"
import { useFavorites } from "@/hooks/use-favorites"
import { getMatchesByTournamentId, computeStatuses } from "@/data/matches"
import { getTournamentById } from "@/data/tournaments"
import { useAuthContext } from "@/contexts/auth-context"

interface Match {
  id: string
  team1: {
    name: string
    logo: string
  }
  team2: {
    name: string
    logo: string
  }
  date: string
  time: string
  isNotificationSet: boolean
  tournamentName?: string
  tournamentId?: string
}

interface Tournament {
  id: string
  name: string
  game: string
  matches: Match[]
}

export default function SchedulePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()
  const [activeFilter, setActiveFilter] = useState("All")
  const [currentTournamentPage, setCurrentTournamentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const { favorites, getFavoritesByType, removeFavorite } = useFavorites()
  const [followedTournaments, setFollowedTournaments] = useState<Tournament[]>([])

  // Formatters for date/time display
  const fmtDate = (iso: string) => {
    const d = new Date(iso)
    if (isNaN(d.getTime())) return ''
    const parts = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
    return parts.replace(/\./g, '')
  }
  const fmtTime = (iso: string) => {
    const d = new Date(iso)
    if (isNaN(d.getTime())) return ''
    const hh = d.getHours().toString().padStart(2, '0')
    const mm = d.getMinutes().toString().padStart(2, '0')
    return `${hh}:${mm}`
  }

  // Load followed tournaments from useFavorites hook and centralized matches
  const loadFollowedTournaments = (): Tournament[] => {
    const favTourneys = getFavoritesByType("tournament")
    console.log("Schedule page - loaded favorites:", favTourneys)

    return favTourneys.map((favorite: any) => {
      const tm = getMatchesByTournamentId(favorite.id)
      const info = getTournamentById(favorite.id)
      const withStatus = computeStatuses(tm.schedule)
      // Show upcoming and live matches only
      const upcoming = withStatus
        .filter(m => m.status !== 'completed')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 6)

      const matches: Match[] = upcoming.map((m, idx) => ({
        id: `${favorite.id}-${m.left}-${m.right}-${new Date(m.date).getTime()}-${idx}`,
        team1: { name: m.left, logo: "/assets/user.png" },
        team2: { name: m.right, logo: "/assets/user.png" },
        date: fmtDate(m.date),
        time: fmtTime(m.date),
        isNotificationSet: false,
        tournamentName: info?.name ?? favorite.name,
        tournamentId: String(favorite.id),
      }))

      const tournament: Tournament = {
        id: favorite.id,
        name: favorite.name,
        game: info?.game ?? 'Esports',
        matches,
      }
      return tournament
    })
  }

  // Initialize and react to favorites changes
  useEffect(() => {
    const tournaments = loadFollowedTournaments()
    setFollowedTournaments(tournaments)
    // keep current page in bounds
    if (currentTournamentPage > tournaments.length) {
      setCurrentTournamentPage(Math.max(1, tournaments.length || 1))
    }
  }, [favorites])

  // Filter tournaments based on search query
  const filteredTournaments = followedTournaments.filter(tournament =>
    tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tournament.game.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination for tournaments (one tournament per page)
  const totalTournamentPages = filteredTournaments.length
  const currentTournament = filteredTournaments[currentTournamentPage - 1]

  const filters = ["All", "Today", "This Week"]

  const removeMatch = (matchId: string) => {
    const updatedTournaments = followedTournaments.map(tournament => ({
      ...tournament,
      matches: tournament.matches.filter(match => match.id !== matchId)
    })).filter(tournament => tournament.matches.length > 0)
    
    setFollowedTournaments(updatedTournaments)
  }

  const unfollowTournament = (tournamentId: string) => {
    removeFavorite(tournamentId, 'tournament')
  }

  const navigateToTournament = (tournamentId: string) => {
    // Navigate to tournament page based on game
    const tournament = followedTournaments.find(t => t.id === tournamentId)
    if (tournament) {
      const gameSlug = tournament.game.toLowerCase().replace(/\s+/g, '-')
      router.push(`${ROUTES.TOURNAMENTS}/${gameSlug}`)
    }
  }

  // Gate for guests
  if (!isAuthenticated) {
    return (
      <GlobalLayout tournamentSelected={false}>
        <div className="bg-gradient-to-r from-[#16213E] via-[#1A1A2E] to-[#16213E] px-8 py-24">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-b from-[#16213E] to-[#1A1A2E] border border-[#3D5AF1] rounded-3xl">
              <CardContent className="p-12 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Login required</h1>
                <p className="text-[#A1A1AA] mb-8">Sign in to view and manage your followed tournaments and match schedule.</p>
                <div className="flex justify-center gap-4">
                  <Button className="bg-[#5B46E5] hover:bg-[#4F46E5]" onClick={() => router.push(ROUTES.LOGIN)}>Go to Login</Button>
                  <Button variant="ghost" className="border border-[#3D5AF1] text-white" onClick={() => router.push(ROUTES.HOME)}>Back to Home</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <GlobalFooter />
      </GlobalLayout>
    )
  }

  return (
    <GlobalLayout tournamentSelected={false}>
      <div className="bg-gradient-to-r from-[#16213E] via-[#1A1A2E] to-[#16213E] px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-b from-[#16213E] to-[#1A1A2E] border border-[#3D5AF1] rounded-3xl">
            <CardContent className="p-10">
              {/* Header with Search and Filters */}
              <div className="flex flex-col gap-6 mb-10">
                <div className="flex items-center justify-between">
                  <h1 className="text-4xl font-bold text-white">Followed Tournaments</h1>
                  <div className="flex gap-4">
                    {filters.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                          activeFilter === filter
                            ? "bg-gradient-to-r from-[#7C3AED] to-[#3D5AF1] text-white"
                            : "bg-gradient-to-b from-[#2A2A4A] to-[#1E1E3F] border border-[#3D5AF1] text-[#A1A1AA] hover:text-white"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A1A1AA] w-5 h-5" />
                  <Input
                    placeholder="Search tournaments or games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gradient-to-b from-[#2A2A4A] to-[#1E1E3F] border border-[#3D5AF1] text-white placeholder:text-[#A1A1AA] focus:border-[#5B46E5]"
                  />
                </div>
              </div>

              {/* Tournament Display */}
              {filteredTournaments.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-[#A1A1AA] text-xl mb-4">No tournaments found</div>
                  <div className="text-[#A1A1AA] text-base">Try adjusting your search or follow some tournaments</div>
                </div>
              ) : currentTournament ? (
                <div className="space-y-8">
                  {/* Tournament Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-8 bg-[#4318D1] rounded-full"></div>
                      <div className="cursor-pointer" onClick={() => navigateToTournament(currentTournament.id)}>
                        <h2 className="text-2xl font-bold text-white hover:text-[#5B46E5] transition-colors">
                          {currentTournament.name}
                        </h2>
                        <p className="text-[#A1A1AA] text-sm">{currentTournament.game}</p>
                      </div>
                      <span className="text-[#A1A1AA] text-lg">{currentTournament.matches.length} matches</span>
                    </div>
                    
                    {/* Unfollow Tournament Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] hover:bg-[#EF4444]/20"
                      onClick={() => unfollowTournament(currentTournament.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Unfollow Tournament
                    </Button>
                  </div>

                  {/* Match Cards */}
                  <div className="space-y-6">
                    {currentTournament.matches.map((match) => (
                      <Card
                        key={match.id}
                        className="bg-gradient-to-r from-[#16213E] to-[#1A1A2E] border border-[#3D5AF1] rounded-3xl hover:scale-[1.02] transition-transform"
                      >
                        <CardContent className="p-8">
                          <div className="flex items-center gap-8">
                            {/* Team 1 */}
                            <div className="flex items-center gap-5 min-w-[220px]">
                              <img
                                src={match.team1.logo || "/placeholder.svg"}
                                alt={match.team1.name}
                                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="text-white font-bold text-xl">{match.team1.name}</div>
                            </div>

                            {/* VS, Time and Date */}
                            <div className="flex flex-col items-center gap-2 mx-10 flex-shrink-0 min-w-[120px]">
                              <span className="text-[#A1A1AA] text-xl font-bold">VS</span>
                              <span className="text-white text-base font-medium">{match.time}</span>
                              <span className="text-[#A1A1AA] text-sm">{match.date}</span>
                            </div>

                            {/* Team 2 */}
                            <div className="flex items-center gap-5 min-w-[220px] flex-row-reverse">
                              <img
                                src={match.team2.logo || "/placeholder.svg"}
                                alt={match.team2.name}
                                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                              />
                              <div className="text-white font-bold text-xl text-right">{match.team2.name}</div>
                            </div>

                            {/* Spacer */}
                            <div className="flex-1"></div>

                            {/* Remove Match Button */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-14 h-14 rounded-lg border bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444] hover:bg-[#EF4444]/20 transition-colors flex-shrink-0"
                              onClick={() => removeMatch(match.id)}
                            >
                              <Trash2 className="w-6 h-6" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Tournament Pagination */}
              {totalTournamentPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-16 pt-10 border-t border-[#3D5AF1]/30">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-[#27272A]/50 text-white hover:bg-[#27272A] rounded-lg"
                    onClick={() => setCurrentTournamentPage(Math.max(1, currentTournamentPage - 1))}
                    disabled={currentTournamentPage === 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  {Array.from({ length: Math.min(5, totalTournamentPages) }, (_, i) => {
                    let pageNumber
                    if (totalTournamentPages <= 5) {
                      pageNumber = i + 1
                    } else if (currentTournamentPage <= 3) {
                      pageNumber = i + 1
                    } else if (currentTournamentPage >= totalTournamentPages - 2) {
                      pageNumber = totalTournamentPages - 4 + i
                    } else {
                      pageNumber = currentTournamentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNumber}
                        variant="ghost"
                        className={`w-12 h-12 rounded-lg font-bold ${
                          currentTournamentPage === pageNumber
                            ? "bg-[#4318D1] text-white"
                            : "bg-[#27272A]/80 text-[#A1A1AA] hover:bg-[#27272A] hover:text-white"
                        }`}
                        onClick={() => setCurrentTournamentPage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    )
                  })}

                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-[#27272A]/50 text-white hover:bg-[#27272A] rounded-lg"
                    onClick={() => setCurrentTournamentPage(Math.min(totalTournamentPages, currentTournamentPage + 1))}
                    disabled={currentTournamentPage === totalTournamentPages}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>

                  <div className="ml-6 text-[#A1A1AA] text-base">
                    Tournament {currentTournamentPage} of {totalTournamentPages}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <GlobalFooter />
    </GlobalLayout>
  )
}
