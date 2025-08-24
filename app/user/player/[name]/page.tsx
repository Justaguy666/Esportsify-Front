"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { User, Trophy, Calendar, MapPin, Globe, Mail, Gamepad2, Star } from "lucide-react"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { teams } from '@/data/teams'
import { players, getPlayerByName } from '@/data/players'

interface PlayerData {
  name: string
  nickname?: string
  country?: string
  role?: string
  team?: {
    name: string
    tag: string
  }
  joinDate?: string
  achievements?: string[]
  stats?: {
    kda?: string
    winRate?: string
    avgKills?: number
    avgDeaths?: number
    avgAssists?: number
  }
}

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

export default function PlayerProfilePage() {
  const params = useParams()
  const router = useRouter()
  const playerName = decodeURIComponent(params?.name as string) || ''
  
  const [player, setPlayer] = useState<PlayerData | null>(null)
  const [playerTeam, setPlayerTeam] = useState<{ name: string; tag: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'titles'>('overview')

  useEffect(() => {
    const foundPlayer = getPlayerByName(playerName)
    
    if (foundPlayer) {
      // Find the team this player belongs to
      const allTeams = teams
      const foundTeam = allTeams.find(team => 
        team.members?.includes(foundPlayer.id)
      )
      
      setPlayer(foundPlayer)
      setPlayerTeam(foundTeam ? {
        name: foundTeam.name,
        tag: foundTeam.tag
      } : null)
    } else {
      setPlayer(null)
      setPlayerTeam(null)
    }
  }, [playerName])

  if (!player) {
    return (
      <GlobalLayout>
        <div className="flex items-center justify-center min-h-screen bg-[#16213E]">
          <div className="text-white text-xl">Player not found</div>
        </div>
      </GlobalLayout>
    )
  }

  return (
    <GlobalLayout>
      <div className="min-h-screen bg-[#16213E] relative overflow-hidden">
        
        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto p-8">
          
          {/* Parent Border Container */}
          <div className="bg-gradient-to-r from-[#2A2A4A] to-[#1E1E3F] border border-[#3D5AF1] rounded-3xl p-8">
          
            {/* Player Header Card */}
            <div 
              className="relative bg-gradient-to-br from-[#3A3A5A] to-[#2E2E4F] border border-[#4D6BF1] rounded-3xl mb-8"
              style={{
                height: '250px'
              }}
            >
            
            {/* Player Avatar */}
            <div 
              className="absolute bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] border-2 border-[#8B5CF6] rounded-2xl flex items-center justify-center"
              style={{
                width: '120px',
                height: '120px',
                left: '40px',
                top: '40px'
              }}
            >
              <span className="text-white font-bold text-4xl">
                PLAYER
              </span>
            </div>

            {/* Player Name */}
            <div 
              className="absolute text-white font-bold"
              style={{
                left: '190px',
                top: '40px',
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '42px',
                lineHeight: '50px'
              }}
            >
              {player.nickname || player.name}
            </div>

            {/* Player Real Name */}
            <div 
              className="absolute text-[#A5B4FC] font-semibold"
              style={{
                left: '190px',
                top: '90px',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '30px'
              }}
            >
              {player.name}
            </div>

            {/* Team Label */}
            <div 
              className="absolute text-[#A5B4FC]"
              style={{
                left: '190px',
                top: '120px',
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '21px'
              }}
            >
              Team
            </div>

            {/* Team Tag */}
            <div 
              className="absolute text-[#A5B4FC] font-semibold"
              style={{
                left: '190px',
                top: '141px',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '18px',
                lineHeight: '27px'
              }}
            >
              {playerTeam ? `${playerTeam.name} (${playerTeam.tag})` : 'Free Agent'}
            </div>

            {/* Game Label */}
            <div 
              className="absolute text-[#A5B4FC]"
              style={{
                left: '500px',
                top: '120px',
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '21px'
              }}
            >
              Game
            </div>

            {/* Game Name */}
            <div 
              className="absolute text-white font-semibold"
              style={{
                left: '500px',
                top: '141px',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '18px',
                lineHeight: '27px'
              }}
            >
              League of Legends
            </div>

          </div>

          {/* Tab Navigation */}
          <div className="flex justify-start mb-6">
            
            {/* Overview Tab */}
            <div 
              className={`cursor-pointer px-6 py-3 mr-6 rounded-lg ${activeTab === 'overview' ? 'bg-[#3D5AF1] text-white' : 'text-[#A5B4FC]'}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="font-semibold text-lg">Overview</span>
            </div>

            {/* History Tab */}
            <div 
              className={`cursor-pointer px-6 py-3 mr-6 rounded-lg ${activeTab === 'history' ? 'bg-[#3D5AF1] text-white' : 'text-[#A5B4FC]'}`}
              onClick={() => setActiveTab('history')}
            >
              <span className="font-semibold text-lg">History</span>
            </div>

            {/* Titles Tab */}
            <div 
              className={`cursor-pointer px-6 py-3 rounded-lg ${activeTab === 'titles' ? 'bg-[#3D5AF1] text-white' : 'text-[#A5B4FC]'}`}
              onClick={() => setActiveTab('titles')}
            >
              <span className="font-semibold text-lg">Titles</span>
            </div>
          </div>

          {/* Content Section */}
          <div>
            
            {/* Overview Section */}
            {activeTab === 'overview' && (
              <div>
                <div 
                  className="text-white font-bold mb-6"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '28px',
                    lineHeight: '42px'
                  }}
                >
                  Current Team
                </div>

                {/* Current Team Card */}
                <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center mb-8">
                  <div 
                    className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg flex items-center justify-center mr-4"
                    style={{
                      width: '64px',
                      height: '64px'
                    }}
                  >
                    <span className="text-white font-bold text-lg">
                      TF
                    </span>
                  </div>
                  <div>
                    <div 
                      className="text-white font-bold"
                      style={{
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '30px'
                      }}
                    >
                      {playerTeam ? playerTeam.name : 'Free Agent'}
                    </div>
                    <div 
                      className="text-[#A5B4FC]"
                      style={{
                        fontFamily: 'Inter',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '24px'
                      }}
                    >
                      Joined: {player.joinDate}
                    </div>
                  </div>
                </div>

                {/* Titles with Team Section */}
                <div 
                  className="text-white font-bold mb-6"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '28px',
                    lineHeight: '42px'
                  }}
                >
                  Titles with team
                </div>

                {/* Current Team Title Cards */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">🏆</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">VCS Spring 2023 Champion</div>
                      <div className="text-[#A5B4FC] text-lg">GAM Esport • 25/03/2023</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">🥈</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">MSI 2023 Semifinalist</div>
                      <div className="text-[#A5B4FC] text-lg">GAM Esport • 15/05/2023</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Content */}
            {activeTab === 'history' && (
              <div>
                <div 
                  className="text-white font-bold mb-6"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '28px',
                    lineHeight: '42px'
                  }}
                >
                  History
                </div>
                
                {/* Career History Cards */}
                <div className="space-y-4">
                  
                  {/* Current Team - GAM Esport */}
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">TF</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xl">GAM Esport</div>
                        <div className="text-[#A5B4FC] text-lg">15/01/2023 - now</div>
                      </div>
                    </div>
                    <div className="bg-[#10B981] text-white px-3 py-1 rounded-md text-sm font-semibold">
                      CURRENT
                    </div>
                  </div>

                  {/* Previous Team - Saigon Phantom */}
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">SG</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xl">Saigon Phantom</div>
                        <div className="text-[#A5B4FC] text-lg">10/03/2021 - 30/12/2022</div>
                      </div>
                    </div>
                  </div>

                  {/* Previous Team - Vietnam Esports */}
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">VE</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xl">Vietnam Esports</div>
                        <div className="text-[#A5B4FC] text-lg">05/06/2019 - 28/02/2021</div>
                      </div>
                    </div>
                  </div>

                  {/* Previous Team - Young Generation */}
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">YG</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xl">Young Generation</div>
                        <div className="text-[#A5B4FC] text-lg">12/01/2017 - 20/05/2019</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Titles Content */}
            {activeTab === 'titles' && (
              <div>
                <div 
                  className="text-white font-bold mb-6"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 700,
                    fontSize: '28px',
                    lineHeight: '42px'
                  }}
                >
                  All Titles
                </div>
                
                {/* All Title Cards */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">🏆</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">VCS Spring 2023 Champion</div>
                      <div className="text-[#A5B4FC] text-lg">Team Flash • 25/03/2023</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">🥈</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">MSI 2023 Semifinalist</div>
                      <div className="text-[#A5B4FC] text-lg">Team Flash • 15/05/2023</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">⭐</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">Worlds 2023 Quarterfinalist</div>
                      <div className="text-[#A5B4FC] text-lg">Team Flash • 22/10/2023</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">🥈</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">VCS Summer 2022 Runner-up</div>
                      <div className="text-[#A5B4FC] text-lg">Saigon Phantom • 28/08/2022</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">🏆</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">GPL 2019 Champion</div>
                      <div className="text-[#A5B4FC] text-lg">Young Generation • 15/12/2019</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          </div>
        </div>
      </div>
      <GlobalFooter />
    </GlobalLayout>
  )
}
