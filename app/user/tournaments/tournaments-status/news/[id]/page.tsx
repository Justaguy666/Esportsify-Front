"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { getTournamentById } from '@/data/tournaments'
import { useTournamentBackNavigation } from '@/hooks/use-tournament-back-navigation'
import { getNewsByTournamentId, type NewsItem } from '@/data/news'

export default function TournamentNewsPage() {
  const router = useRouter()
  const params = useParams()
  const tournamentId = (params?.id as string) || ''
  const tournament = getTournamentById(tournamentId)
  
  // State for search and pagination
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Handle browser back button to redirect to tournaments page
  useTournamentBackNavigation(tournamentId)

  // Get news items for this tournament or all tournaments
  const allNewsItems = getNewsByTournamentId(tournamentId)

  // Filter news items based on search query
  const filteredNews = allNewsItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage)

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  return (
    <>
      <GlobalLayout 
        tournamentSelected={true}
        tournamentId={tournamentId}
        gameName={tournament?.game}
      >
        <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E]">
          <div className="relative w-full max-w-[1400px] mx-auto px-6 py-12">
            
            {/* Header Section */}
            <div className="mb-12">
              <h1 className="text-white font-bold text-[60px] leading-[71px] mb-6">Tournament News</h1>
              <p className="text-[#A5B4FC] font-normal text-[36px] leading-[55px] max-w-[842px]">
                Stay updated with the latest tournament announcements, match results, and esports industry news
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-12 flex justify-end">
              <div className="relative w-[459px] h-[65px]">
                <input 
                  type="text" 
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full bg-[rgba(91,70,229,0.1)] border border-[#3D5AF1] rounded-[16px] px-6 pr-14 text-white placeholder-[#6B7280] text-[18px] focus:outline-none focus:ring-2 focus:ring-[#3D5AF1]"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-[23px] h-[23px] text-[#6B7280]" />
                </div>
              </div>
            </div>

            {/* News Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {currentNews.map((item) => (
                <div key={item.id} className="bg-gradient-to-r from-[#2A2A4A] to-[#1E1E3F] border border-[#3D5AF1] rounded-[30px] shadow-[0px_12px_48px_rgba(61,90,241,0.2)] overflow-hidden">
                  <div className={`h-[229px] bg-gradient-to-r ${item.gradient} flex items-center justify-center`}>
                    <span className="text-white font-bold text-xl">{item.category}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-semibold text-[23px] leading-[32px] mb-4">
                      {item.title}
                    </h3>
                    <p className="text-[#A5B4FC] text-[18px] leading-[28px] mb-6">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#A5B4FC] text-[16px]">{item.date}</span>
                      <span 
                        className="text-[#10B981] font-medium text-[16px] cursor-pointer hover:underline"
                        onClick={() => router.push(`/user/tournaments/tournaments-status/news/${tournamentId}/${item.id}`)}
                      >
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No results message */}
            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#A5B4FC] text-xl">No news found matching your search.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
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
                    className={`w-[46px] h-[42px] rounded-[7px] flex items-center justify-center font-medium text-[16px] transition-colors ${
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
          <GlobalFooter />
        </div>
      </GlobalLayout>
    </>
  )
}
