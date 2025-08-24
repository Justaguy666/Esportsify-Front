"use client"

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { getTournamentById } from '@/data/tournaments'
import { teams, TeamData } from '@/data/teams'
import { tournamentDataService } from '@/data/tournament-data-service'
import GlobalLayout from '@/components/global-layout'
import GlobalFooter from '@/components/global-footer'
import { useTournamentBackNavigation } from '@/hooks/use-tournament-back-navigation'
import { Input } from "@/components/ui/input"
import { Search, ChevronRight } from "lucide-react"

export default function TeamParticipantsPage() {
  const params = useParams()
  const router = useRouter()
  const tournamentId = params?.id as string
  const tournament = getTournamentById(tournamentId)
  const tournamentDetails = tournamentDataService.getTournamentDetails(tournamentId)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedTeams, setExpandedTeams] = useState<string[]>([])
  
  // Get participating teams for this tournament
  const participatingTeams = tournamentDetails?.participatingTeams || []

  useTournamentBackNavigation(tournamentId)

  // Filter participating teams based on search term
  const filteredTeams = participatingTeams.filter((team: any) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.members.some((member: any) => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Avatar color mapping function
  const getAvatarInfo = (name: string, index: number) => {
    const colors = [
      'bg-[#3D5AF1]', // Blue
      'bg-[#10B981]', // Green  
      'bg-[#8B5CF6]', // Purple
      'bg-[#06B6D4]', // Cyan
      'bg-[#F59E0B]', // Orange
      'bg-[#EF4444]'  // Red
    ]
    
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
    const color = colors[index % colors.length]
    
    return { initials, color }
  }

  const toggleTeamExpansion = (teamId: string) => {
    setExpandedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    )
  }

  return (
    <GlobalLayout tournamentId={tournamentId} gameName={tournamentDetails?.game || tournament?.game}>
      <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E]">
        
        {/* Search Bar */}
        <div className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A5B4FC] w-5 h-5" />
              <Input
                type="text"
                placeholder="Search teams or players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-[#2A2A4A]/30 border-[#3D5AF1]/30 rounded-xl text-white placeholder:text-[#A5B4FC] focus:border-[#3D5AF1] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Teams List */}
        <div className="px-8 pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {filteredTeams.map((team: any) => (
              <div key={team.id} className="bg-[#2A2A4A]/30 rounded-2xl border border-[#3D5AF1]/20 hover:border-[#3D5AF1]/40 transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      {/* Team Logo - Clickable */}
                      <div 
                        className="w-20 h-20 bg-gradient-to-br from-[#3D5AF1] to-[#5B46E5] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 border-2 border-[#3D5AF1]"
                        onClick={() => router.push(`/team/${team.id}`)}
                      >
                        <span className="text-white font-bold text-xl">
                          {team.tag}
                        </span>
                      </div>
                      
                      {/* Team Info */}
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-[32px] leading-[48px] mb-1 font-inter">
                          {team.name}
                        </h3>
                        <p className="text-[#A5B4FC] font-normal text-[21px] leading-[31px] font-mono">
                          {team.tag}
                        </p>
                      </div>
                    </div>
                    
                    {/* Expand Button */}
                    <button
                      onClick={() => toggleTeamExpansion(team.id)}
                      className="text-[#A5B4FC] hover:text-white transition-colors p-2"
                    >
                      <ChevronRight 
                        className={`w-6 h-6 transition-transform duration-200 ${
                          expandedTeams.includes(team.id) ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                  </div>
                  
                  {/* Team Members - Expandable */}
                  {expandedTeams.includes(team.id) && (
                    <div className="border-t border-[#3D5AF1]/20 pt-6">
                      <h4 className="text-white font-semibold text-xl mb-4">Team Members</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {team.members.map((member: any, memberIndex: number) => (
                          <div 
                            key={memberIndex} 
                            className="flex items-center gap-4 p-4 bg-[#1A1A2E]/50 rounded-xl border border-[#3D5AF1]/20 hover:border-[#3D5AF1]/40 transition-colors cursor-pointer"
                            onClick={() => router.push(`/player/${encodeURIComponent(member.name)}`)}
                          >
                            {/* Player Avatar */}
                            <div className={`w-12 h-12 ${getAvatarInfo(member.name, memberIndex).color} rounded-full flex items-center justify-center`}>
                              <span className="text-white font-semibold text-sm">
                                {getAvatarInfo(member.name, memberIndex).initials}
                              </span>
                            </div>
                            
                            {/* Player Info */}
                            <div className="flex-1">
                              <p className="text-white font-medium text-lg">{member.name}</p>
                              {member.nickname && (
                                <p className="text-[#A5B4FC] text-sm">{member.nickname}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <GlobalFooter />
    </GlobalLayout>
  )
}
