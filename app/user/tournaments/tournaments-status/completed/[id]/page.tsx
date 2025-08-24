"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Facebook, Twitter, Instagram, X, Heart, Trophy, Medal, Crown } from 'lucide-react'
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { getTournamentById } from "@/data/tournaments"
import { useFavorites } from '@/hooks/use-favorites'
import { useTournamentBackNavigation } from '@/hooks/use-tournament-back-navigation'

export default function TournamentCompletedPage() {
  const router = useRouter()
  const params = useParams()
  const tournamentId = (params?.id as string) || ''
  const tournament = getTournamentById(tournamentId)
  const [isFollowing, setIsFollowing] = useState(false) // Default to not following
  const { toggleFavorite, isFavorite } = useFavorites()

  // Handle browser back button to redirect to tournaments page
  useTournamentBackNavigation(tournamentId)

  useEffect(() => {
    if (tournament?.id) {
      const isAlreadyFollowed = isFavorite(tournament.id, "tournament")
      setIsFollowing(isAlreadyFollowed)
    }
  }, [tournament?.id, isFavorite])

  const handleToggleFollow = () => {
    if (tournament) {
      toggleFavorite({
        id: tournament.id,
        type: "tournament",
        name: tournament.name
      })
      setIsFollowing(!isFollowing)
    }
  }

  // Mock data for rankings
  const finalRankings = [
    { position: 1, team: 'T1', prize: '$400,000', color: '#FFD700' },
    { position: 2, team: 'Gen.G', prize: '$200,000', color: '#C0C0C0' },
    { position: 3, team: 'JDG', prize: '$100,000', color: '#CD7F32' },
    { position: 4, team: 'BLG', prize: '$50,000', color: '#4B5563' },
  ]

  return (
    <GlobalLayout 
      tournamentSelected={true}
      tournamentId={tournamentId}
      gameName={tournament?.game}
    >
      <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] p-6">
        <div className="flex-1 py-12">
        

        {/* Hero Section - Tournament Image with Overlay */}
        <div className="w-full px-8 mb-12">
          <div className="relative w-full h-[600px] rounded-[27px] border border-[#6B7280] overflow-hidden" 
               style={{ filter: 'drop-shadow(0px 10.57px 42.3px rgba(107, 114, 128, 0.2))' }}>
            
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
            
            {/* COMPLETED Status Badge */}
            <div className="absolute top-8 right-8 bg-gradient-to-r from-[#6B7280] to-[#4B5563] rounded-xl shadow-lg px-6 py-2">
              <span className="text-white font-semibold text-lg">
                COMPLETED
              </span>
            </div>
            
            {/* Title */}
            <h1 className="absolute bottom-24 left-8 text-white text-gaming-title text-6xl max-w-4xl leading-tight">
              {tournament?.name || 'World Championship 2024'}
            </h1>
            
            {/* Subtitle */}
            <p className="absolute bottom-8 left-8 text-[#A5B4FC] text-gaming-body text-3xl">
              {tournament?.game || 'League of Legends'}
            </p>
          </div>
        </div>

        {/* Tournament Champions Section - Full Width */}
        <div className="w-full px-8 my-16">
          <Card className="bg-gradient-to-r from-[#2A2A4A] to-[#1E1E3F] border-[#6B7280] shadow-[0px_9.18px_36.7px_rgba(107,114,128,0.2)]">
            <CardContent className="p-8 flex items-center">
              {/* Champion Avatar with Crown */}
              <div className="relative mr-6">
                <div className="w-[63px] h-[60px] bg-gradient-to-r from-[#3D5AF1] to-[#7C3AED] rounded-full border-[3px] border-[#FFD700] shadow-[0px_0px_15px_rgba(255,215,0,0.5)] flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                {/* Crown */}
                <div className="absolute -top-2 -right-2 w-[25px] h-[18px] bg-[#FFD700] rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-black" />
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <h2 className="text-white text-gaming-title text-4xl">
                  T1
                </h2>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics and Final Rankings Section */}
        <div className="w-full px-8 my-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tournament Statistics Card */}
            <Card className="bg-gradient-to-r from-[#2A2A4A] to-[#1E1E3F] border-[#6B7280] shadow-[0px_9.18px_36.7px_rgba(107,114,128,0.2)]">
              <CardContent className="p-8 h-full flex flex-col">
                <h2 className="text-white font-bold text-4xl mb-8">
                  Tournament Statistics
                </h2>
                
                <div className="flex-1 space-y-8">
                  {/* Total Matches Played */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#A5B4FC] text-base font-medium min-w-[180px]">Total Matches Played</span>
                    <span className="text-white font-semibold text-xl text-right">31</span>
                  </div>
                  
                  {/* Average Match Duration */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#A5B4FC] text-base font-medium min-w-[180px]">Average Match Duration</span>
                    <span className="text-white font-semibold text-xl text-right">32:45</span>
                  </div>
                  
                  {/* Total Prize Pool */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#A5B4FC] text-base font-medium min-w-[180px]">Total Prize Pool</span>
                    <span className="text-white font-semibold text-xl text-right">{tournament?.prizePool || '$2,225,000'}</span>
                  </div>
                  
                  {/* Peak Viewership */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#A5B4FC] text-base font-medium min-w-[180px]">Peak Viewership</span>
                    <span className="text-white font-semibold text-xl text-right">5.2M</span>
                  </div>
                  
                  {/* Tournament Duration */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#A5B4FC] text-base font-medium min-w-[180px]">Tournament Duration</span>
                    <span className="text-white font-semibold text-xl text-right">8 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Final Rankings Card */}
            <Card className="bg-gradient-to-r from-[#2A2A4A] to-[#1E1E3F] border-[#6B7280] shadow-[0px_9.18px_36.7px_rgba(107,114,128,0.2)]">
              <CardContent className="p-8 h-full flex flex-col">
                <h2 className="text-white font-bold text-4xl mb-8">
                  Final Rankings
                </h2>
                
                <div className="flex-1 space-y-4">
                  {finalRankings.map((rank) => (
                    <div 
                      key={rank.position}
                      className={`flex items-center p-4 rounded-xl ${
                        rank.position === 1 
                          ? 'border-2 border-[#FFD700] bg-gradient-to-r from-[#FFD700]/10 to-transparent' 
                          : 'bg-[#1A1A2E] border border-[#3D5AF1]/30'
                      }`}
                    >
                      {/* Position Circle */}
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-4"
                        style={{ backgroundColor: rank.color }}
                      >
                        <span className={`text-sm font-bold ${rank.position === 3 ? 'text-white' : 'text-black'}`}>
                          {rank.position}
                        </span>
                      </div>
                      
                      {/* Team Avatar */}
                      <div className="w-8 h-8 bg-gradient-to-r from-[#3D5AF1] to-[#7C3AED] rounded-full mr-4 flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                      
                      {/* Team Name */}
                      <span className="text-white text-base font-semibold flex-1">
                        {rank.team}
                      </span>
                      
                      {/* Prize Money */}
                      <span 
                        className={`text-base font-bold ${
                          rank.position === 1 ? 'text-[#FFD700]' : 'text-[#A5B4FC]'
                        }`}
                      >
                        {rank.prize}
                      </span>
                    </div>
                  ))}
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
