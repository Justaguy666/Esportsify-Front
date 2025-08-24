"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Clock, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useParams } from "next/navigation"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { getTournamentById } from '@/data/tournaments'
import { useTournamentBackNavigation } from '@/hooks/use-tournament-back-navigation'
import { getMatchesByTournamentId, computeStatuses } from '@/data/matches'

// Utility: format e.g., 2025-08-20T18:00:00+07:00 -> "August 20, 2025"
const formatLongDate = (iso?: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function TournamentHighlightsPage() {
  const router = useRouter()
  const params = useParams()
  const tournamentId = (params?.id as string) || ''
  const tournament = getTournamentById(tournamentId)

  // Build highlights from centralized completed matches
  const { schedule } = getMatchesByTournamentId(tournamentId)
  const scheduleWithStatus = computeStatuses(schedule)
  const highlightsData = scheduleWithStatus
    .filter(m => m.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((m, idx) => ({
      id: idx + 1,
      title: `${m.left} vs ${m.right} - Match Highlights`,
      duration: ['8:45','7:32','9:15','6:28','10:12','8:55'][idx % 6] || '8:45',
      date: formatLongDate(m.date),
      thumbnail: "/placeholder-2c07r.png",
    }))

  // Search and pagination logic
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchQuery, setSearchQuery] = React.useState("")
  
  // Filter videos based on search query
  const filteredVideos = highlightsData.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const videosPerPage = 6
  const totalVideos = filteredVideos.length
  const totalPages = Math.ceil(totalVideos / videosPerPage)
  const startIndex = (currentPage - 1) * videosPerPage
  const currentVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage)

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Handle browser back button to redirect to tournaments page
  useTournamentBackNavigation(tournamentId)

  return (
    <>
      <GlobalLayout 
        tournamentSelected={true}
        tournamentId={tournamentId}
        gameName={tournament?.game}
      >
        {/* Main Container */}
        <div className="relative w-full min-h-screen bg-gradient-to-r from-[#0F0F23] via-[#1A1A2E] to-[#16213E] p-6">
          {/* Content Container */}
          <div className="relative bg-[#0F0F23] border border-[#3D5AF1] rounded-[14px] p-8" style={{ minHeight: '872px' }}>
            
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative w-[364px] h-[52px] bg-[rgba(91,70,229,0.1)] border border-[#3D5AF1] rounded-[9px] flex items-center px-4">
                <Search className="w-[18px] h-[18px] text-[#A1A1AA] mr-3" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search match highlights..."
                  className="flex-1 bg-transparent border-none text-white placeholder:text-[#A1A1AA] text-[16px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>


            {/* No Results Message */}
            {filteredVideos.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-[#A1A1AA] text-xl">No highlights found matching "{searchQuery}"</p>
              </div>
            )}

            {/* Video Grid */}
            {currentVideos.length > 0 && (
              <div className="mb-8">
                <div className="grid grid-cols-3 gap-x-6 gap-y-12">
                  {currentVideos.map((highlight, index) => (
                    <div key={highlight.id} className="flex flex-col">
                      {/* Video Card */}
                      <div className="relative w-full aspect-video bg-[rgba(39,39,42,0.6)] border border-[rgba(63,63,70,0.3)] rounded-[14px] shadow-[0px_4.55px_13.66px_rgba(0,0,0,0.1)] overflow-hidden">
                        {/* Video Thumbnail */}
                        <img 
                          src={highlight.thumbnail}
                          alt={highlight.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(0,0,0,0.7)]"></div>
                        
                        {/* Duration Badge */}
                        <div className="absolute bottom-4 right-4 bg-[rgba(0,0,0,0.8)] rounded-[5px] px-2 py-1">
                          <span className="text-white text-[14px] font-medium">{highlight.duration}</span>
                        </div>
                        
                        {/* Play Button */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-[68px] h-[68px] bg-[rgba(255,255,255,0.9)] rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                            <Play className="w-[27px] h-[27px] text-black ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Video Info */}
                      <div className="mt-6">
                        <h3 className="text-white text-[18px] font-semibold leading-[27px] mb-4">
                          {highlight.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          {/* Duration */}
                          <div className="flex items-center">
                            <Clock className="w-[18px] h-[18px] text-[#8B8B8B] mr-2" />
                            <span className="text-[#A1A1AA] text-[15px]">{highlight.duration}</span>
                          </div>
                          
                          {/* Date */}
                          <div className="flex items-center">
                            <Calendar className="w-[18px] h-[18px] text-[#8B8B8B] mr-2" />
                            <span className="text-[#A1A1AA] text-[15px]">{highlight.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination - Only show if more than 6 videos */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 mb-8">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`w-[46px] h-[36px] rounded-[7px] flex items-center justify-center transition-colors ${
                    currentPage === 1 
                      ? 'bg-[rgba(39,39,42,0.5)] cursor-not-allowed' 
                      : 'bg-[rgba(39,39,42,0.8)] hover:bg-[rgba(39,39,42,1)] cursor-pointer'
                  }`}
                >
                  <ChevronLeft className={`w-[18px] h-[18px] ${
                    currentPage === 1 ? 'text-[rgba(161,161,170,0.5)]' : 'text-[#A1A1AA]'
                  }`} />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-[46px] h-[42px] rounded-[7px] text-[16px] font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-[#4318D1] text-white'
                        : 'bg-[rgba(39,39,42,0.8)] text-[#A1A1AA] hover:bg-[rgba(39,39,42,1)] hover:text-white cursor-pointer'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`w-[46px] h-[36px] rounded-[7px] flex items-center justify-center transition-colors ${
                    currentPage === totalPages 
                      ? 'bg-[rgba(39,39,42,0.5)] cursor-not-allowed' 
                      : 'bg-[rgba(39,39,42,0.8)] hover:bg-[rgba(39,39,42,1)] cursor-pointer'
                  }`}
                >
                  <ChevronRight className={`w-[18px] h-[18px] ${
                    currentPage === totalPages ? 'text-[rgba(161,161,170,0.5)]' : 'text-[#A1A1AA]'
                  }`} />
                </button>
              </div>
            )}
            
          </div>
        </div>
        <GlobalFooter />
      </GlobalLayout>
    </>
  )
}
