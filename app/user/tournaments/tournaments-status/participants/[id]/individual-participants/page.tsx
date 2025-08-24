"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getTournamentById } from '@/data/tournaments'
import { getAllPlayers } from '@/data/teams'
import GlobalLayout from '@/components/global-layout'
import GlobalFooter from '@/components/global-footer'
import { useTournamentBackNavigation } from '@/hooks/use-tournament-back-navigation'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function IndividualParticipantsPage() {
  const params = useParams()
  const router = useRouter()
  const tournamentId = params?.id as string
  const tournament = getTournamentById(tournamentId)
  
  const [searchTerm, setSearchTerm] = useState("")

  useTournamentBackNavigation(tournamentId)

  const allPlayers = getAllPlayers()
  const filteredParticipants = allPlayers.filter(participant =>
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.nickname?.toLowerCase().includes(searchTerm.toLowerCase())
  )


  // Get avatar colors and initials
  const getAvatarInfo = (name: string, index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-blue-400',
      'bg-green-600',
      'bg-purple-400'
    ]
    
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase()
    return {
      initials,
      color: colors[index % colors.length] || 'bg-gray-500'
    }
  }

  return (
    <GlobalLayout
        tournamentId={tournamentId}
        gameName={tournament?.game}
      >
        <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E]">
          
          {/* Search Bar */}
          <div className="px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A5B4FC] w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-[#2A2A4A]/30 border-[#3D5AF1]/30 rounded-xl text-white placeholder:text-[#A5B4FC] focus:border-[#3D5AF1] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Players List */}
          <div className="px-8 pb-8">
            <div className="max-w-7xl mx-auto space-y-4">
              {filteredParticipants.map((participant, index) => {
                const avatarInfo = getAvatarInfo(participant.name, index)
                return (
                  <div 
                    key={participant.name}
                    className="bg-[#2A2A4A]/30 rounded-2xl border border-[#3D5AF1]/20 hover:border-[#3D5AF1]/40 transition-all duration-300 p-6"
                  >
                    <div className="flex items-center gap-6">
                      {/* Player Avatar - Clickable */}
                      <div 
                        className={`w-16 h-16 ${avatarInfo.color} rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200`}
                        onClick={() => router.push(`/player/${encodeURIComponent(participant.name)}`)}
                      >
                        <span className="text-white font-semibold text-sm">
                          {avatarInfo.initials}
                        </span>
                      </div>
                      
                      {/* Player Info */}
                      <div className="flex-1">
                        {participant.nickname && (
                          <h3 className="text-white font-bold text-[24px] leading-[36px] mb-1 font-inter">
                            {participant.nickname}
                          </h3>
                        )}
                        <p className="text-[#A5B4FC] font-normal text-[16px] leading-[24px] font-mono">
                          {participant.name}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      <GlobalFooter />
    </GlobalLayout>
  )
}
