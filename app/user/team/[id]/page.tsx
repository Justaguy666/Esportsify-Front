"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { teams, getTeamById } from '@/data/teams'
import { getPlayersByTeam } from '@/data/players'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Trophy, Users, Globe, Twitter, Instagram, Youtube } from 'lucide-react'
import Image from 'next/image'

interface TeamData {
  id: string
  name: string
  tag: string
  game: string
  region: string
  founded: string
  coach?: string
  venue?: string
  website?: string
  socialMedia?: {
    twitter?: string
    instagram?: string
    youtube?: string
  }
  tournamentHistory?: Array<{
    tournament: string
    year: string
    placement: string
  }>
  achievements: string[]
  ranking?: number
}

export default function TeamProfilePage() {
  const params = useParams()
  const router = useRouter()
  const teamId = params?.id as string
  
  const [team, setTeam] = useState<TeamData | null>(null)
  const [members, setMembers] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'roster' | 'titles'>('roster')

  useEffect(() => {
    if (!teamId) return
    
    const teamData = getTeamById(teamId)
    if (!teamData) {
      notFound()
    }
    
    setTeam(teamData)
    setMembers(getPlayersByTeam(teamId) || [])
  }, [teamId])

  if (!team) {
    return (
      <GlobalLayout>
        <div className="flex items-center justify-center min-h-screen bg-[#16213E]">
          <div className="text-white text-xl">Team not found</div>
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
          
            {/* Team Header Card */}
            <div 
              className="relative bg-gradient-to-br from-[#3A3A5A] to-[#2E2E4F] border border-[#4D6BF1] rounded-3xl mb-8"
              style={{
                height: '250px'
              }}
            >
            
            {/* Team Logo */}
            <div 
              className="absolute bg-gradient-to-br from-[#3D5AF1] to-[#5B46E5] border-2 border-[#3D5AF1] rounded-2xl flex items-center justify-center"
              style={{
                width: '120px',
                height: '120px',
                left: '40px',
                top: '40px'
              }}
            >
              <span className="text-white font-bold text-4xl">
                {team.tag}
              </span>
            </div>

            {/* Team Name */}
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
              {team.name}
            </div>

            {/* Team Tag */}
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
              {team.tag}
            </div>

            {/* Game Label */}
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
              Game
            </div>

            {/* Game Name */}
            <div 
              className="absolute text-white font-semibold"
              style={{
                left: '190px',
                top: '141px',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '18px',
                lineHeight: '27px'
              }}
            >
              {team.game}
            </div>

          </div>

          {/* Tab Navigation */}
          <div className="flex justify-start mb-6">
            
            {/* Roster Tab */}
            <div 
              className={`cursor-pointer px-6 py-3 mr-6 rounded-lg ${activeTab === 'roster' ? 'bg-[#3D5AF1] text-white' : 'text-[#A5B4FC]'}`}
              onClick={() => setActiveTab('roster')}
            >
              <span className="font-semibold text-lg">Roster</span>
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
            
            {/* Players Section */}
            {activeTab === 'roster' && (
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
                  Players
                </div>

                {/* Player Cards */}
                <div className="space-y-4">
                  {members.map((member: any, index: number) => (
                    <div 
                      key={index}
                      className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-[#2A2A4A] hover:to-[#1E1E3F] transition-all p-4 flex items-center"
                      onClick={() => router.push(`/player/${encodeURIComponent(member.nickname || member.name)}`)}
                    >
                      
                      {/* Player Avatar */}
                      <div 
                        className="bg-gradient-to-br from-[#3D5AF1] to-[#5B46E5] rounded-lg flex items-center justify-center mr-4"
                        style={{
                          width: '64px',
                          height: '64px'
                        }}
                      >
                        <span className="text-white font-bold text-lg">
                          {(member.nickname || member.name).substring(0, 2).toUpperCase()}
                        </span>
                      </div>

                      {/* Player Info */}
                      <div>
                        {/* Player Name */}
                        <div 
                          className="text-white font-semibold"
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fontSize: '20px',
                            lineHeight: '30px'
                          }}
                        >
                          {member.nickname || member.name}
                        </div>

                        {/* Real Name */}
                        <div 
                          className="text-[#A5B4FC]"
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '24px'
                          }}
                        >
                          {member.name}
                        </div>

                        {/* Role and Join Date */}
                        <div 
                          className="text-[#A5B4FC]"
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '21px'
                          }}
                        >
                          {member.role} • Joined: {member.joinDate}
                        </div>
                      </div>
                    </div>
                  ))}
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
                  Titles
                </div>
                
                {/* Title Cards */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">🏆</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">VCS Spring 2023 Champion</div>
                      <div className="text-[#A5B4FC] text-lg">25/03/2023</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">🥈</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">MSI 2023 Semifinalist</div>
                      <div className="text-[#A5B4FC] text-lg">25/03/2023</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">⭐</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">Worlds 2023 Quarterfinalist</div>
                      <div className="text-[#A5B4FC] text-lg">25/03/2023</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">🥉</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">VCS Summer 2022 Runner-up</div>
                      <div className="text-[#A5B4FC] text-lg">25/03/2023</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#1E1E3F] to-[#2A2A4A] border border-[#3D5AF1] rounded-xl p-4 flex items-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">🏆</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xl">GPL 2019 Champion</div>
                      <div className="text-[#A5B4FC] text-lg">25/03/2023</div>
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
