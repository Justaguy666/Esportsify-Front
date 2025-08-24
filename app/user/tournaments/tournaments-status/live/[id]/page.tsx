"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Twitter, Instagram, X, Heart } from 'lucide-react'
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { getTournamentById } from "@/data/tournaments"
import { tournamentDataService } from '@/data/tournament-data-service'
import { useFavorites } from '@/hooks/use-favorites'
import { useTournamentBackNavigation } from '@/hooks/use-tournament-back-navigation'
import { useAuthContext } from "@/contexts/auth-context"

export default function TournamentLivePage() {
  const router = useRouter()
  const params = useParams()
  const tournamentId = (params?.id as string) || ''
  const tournament = getTournamentById(tournamentId)
  const tournamentDetails = tournamentDataService.getTournamentDetails(tournamentId)
  const [isFollowing, setIsFollowing] = useState(false) // Default to not following
  const { toggleFavorite, isFavorite } = useFavorites()
  const { isAuthenticated } = useAuthContext()

  // Handle browser back button to redirect to tournaments page
  useTournamentBackNavigation(tournamentId)

  // Check if tournament is already followed on component mount
  useEffect(() => {
    if (tournament?.id) {
      const isAlreadyFollowed = isFavorite(tournament.id, "tournament")
      setIsFollowing(isAlreadyFollowed)
    }
  }, [tournament?.id, isFavorite])

  const handleToggleFollow = () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    if (tournament) {
      toggleFavorite({
        id: tournament.id,
        type: "tournament",
        name: tournament.name
      })
      setIsFollowing(!isFollowing)
    }
  }

  // Get game name from tournament ID
  const getGameNameFromTournamentId = (tournamentId: string): string => {
    if (tournamentId.includes('league-of-legends')) return 'League of Legends'
    if (tournamentId.includes('counter-strike-2')) return 'Counter-Strike 2'
    if (tournamentId.includes('valorant')) return 'Valorant'
    if (tournamentId.includes('dota-2')) return 'Dota 2'
    if (tournamentId.includes('overwatch-2')) return 'Overwatch 2'
    if (tournamentId.includes('starcraft-ii')) return 'StarCraft II'
    return 'League of Legends' // default fallback
  }

  return (
    <GlobalLayout 
      tournamentSelected={true}
      tournamentId={tournamentId}
      gameName={tournamentDetails?.game || tournament?.game}
    >
      <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] p-6">
        <div className="flex-1 py-12">
        

        {/* Hero Section - Tournament Image with Overlay */}
        <div className="w-full px-8 mb-12">
          <div className="relative w-full h-[600px] rounded-[27px] border border-[#EF4444] overflow-hidden" 
               style={{ filter: 'drop-shadow(0px 10.57px 42.3px rgba(239, 68, 68, 0.2))' }}>
            
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(/placeholder.svg?height=461&width=1346&text=Tournament+Background)'
              }}
            />
            
            {/* Dark Overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)',
              }}
            />
            
            {/* LIVE Status Badge */}
            <div className="absolute top-8 right-8 animate-pulse bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-xl shadow-lg px-6 py-2">
              <span className="text-white font-semibold text-lg">
                LIVE
              </span>
            </div>
            
            {/* Title */}
            <h1 className="absolute bottom-24 left-8 text-white font-bold text-6xl max-w-4xl leading-tight">
              {tournamentDetails?.name || tournament?.name || 'World Championship 2024'}
            </h1>
            
            {/* Subtitle */}
            <p className="absolute bottom-8 left-8 text-[#A5B4FC] font-medium text-3xl">
              {tournamentDetails?.game || tournament?.game || 'League of Legends'}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full px-8 my-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tournament Information Card */}
            <Card className="bg-gradient-to-r from-[#2A2A4A] to-[#1E1E3F] border-[#EF4444] shadow-[0px_9.18px_36.7px_rgba(239,68,68,0.2)]">
              <CardContent className="p-8 h-full flex flex-col">
                <h2 className="text-white font-bold text-4xl mb-8">
                  Tournament Information
                </h2>
                
                <div className="flex-1">
                  {/* Prize Pool */}
                  <div className="mb-6">
                    <p className="text-[#A5B4FC] text-base mb-1">Prize Pool</p>
                    <p className="text-white font-semibold text-2xl">
                      {tournamentDetails?.prizePool || tournament?.prizePool || '$2,000,000'}
                    </p>
                  </div>
                  
                  {/* Participants */}
                  <div className="mb-6">
                    <p className="text-[#A5B4FC] text-base mb-1">Participants</p>
                    <p className="text-white font-semibold text-2xl">
                      {tournamentDetails?.participants || tournament?.participants || '16'}
                    </p>
                  </div>
                  
                  {/* Format */}
                  <div className="mb-6">
                    <p className="text-[#A5B4FC] text-base mb-1">Format</p>
                    <p className="text-white font-semibold text-2xl">
                      {tournamentDetails?.format || tournament?.format || 'Double Elimination'}
                    </p>
                  </div>
                </div>
                
                {/* Duration - Positioned at bottom */}
                <div className="mt-auto">
                  <p className="text-[#A5B4FC] text-base mb-1">Duration</p>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-2xl">
                      {tournamentDetails?.startDate || tournament?.startDate || 'Dec 15, 2024'}
                    </span>
                    <span className="text-white font-semibold text-2xl">-</span>
                    <span className="text-white font-semibold text-2xl">
                      {tournamentDetails?.endDate || tournament?.endDate || 'Dec 22, 2024'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Tournament Card */}
            <Card className="bg-gradient-to-r from-[#2A2A4A] to-[#1E1E3F] border-[#EF4444] shadow-[0px_9.18px_36.7px_rgba(239,68,68,0.2)]">
              <CardContent className="p-8 h-full flex flex-col">
                <h2 className="text-white font-bold text-4xl mb-8">
                  About Tournament
                </h2>
                
                {/* Description */}
                <p className="text-[#A5B4FC] text-xl leading-8 mb-8 flex-1">
                  {tournamentDetails?.description || tournament?.description || "The most prestigious League of Legends tournament of the year, featuring the best teams from around the world competing for the ultimate championship title and the largest prize pool in esports history."}
                </p>
                
                {/* Organizer */}
                <div className="mb-8">
                  <p className="text-[#A5B4FC] text-base mb-1">Organizer</p>
                  <p className="text-white font-semibold text-xl">
                    {tournamentDetails?.organizer || tournament?.organizer || 'Tournament Organizer'}
                  </p>
                </div>
                
                {/* Buttons - Positioned at bottom to align with Duration section */}
                <div className="flex gap-4 mt-auto">
                  <Button 
                    className="bg-gradient-to-r from-[#5B46E5] to-[#8F5CF6] text-white font-medium px-8 py-4 rounded-xl text-lg shadow-[0px_4.59px_18.35px_rgba(91,70,229,0.3)] transition-all duration-300"
                  >
                    Watch Live
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className={`font-medium px-8 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 ${
                      isFollowing 
                        ? "border-2 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white bg-transparent hover:shadow-lg hover:shadow-[#EF4444]/40 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        : "border-2 border-[#5B6EF1] text-[#5B6EF1] hover:bg-[#3D5AF1] hover:text-white hover:border-[#7C83F1] bg-transparent hover:shadow-lg hover:shadow-[#5B6EF1]/40 shadow-[0_0_20px_rgba(91,110,241,0.3)]"
                    }`}
                    disabled={!isAuthenticated}
                    title={!isAuthenticated ? 'Login required to follow tournaments' : undefined}
                    onClick={handleToggleFollow}
                  >
                    {isFollowing ? (
                      <>
                        <X className="w-5 h-5 mr-2" />
                        Unfollow Tournament
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-2" />
                        Follow Tournament
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

          </div>
        </div>
        <GlobalFooter />
    </GlobalLayout>
  )
}
