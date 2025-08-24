"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { getTournamentById } from '@/data/tournaments'
import { useTournamentBackNavigation } from '@/hooks/use-tournament-back-navigation'

export default function TournamentRulesPage() {
  const router = useRouter()
  const params = useParams()
  const tournamentId = (params?.id as string) || ''
  const tournament = getTournamentById(tournamentId)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageInput, setPageInput] = useState('1')
  const totalPages = 3

  // Mock content for different pages
  const getPageContent = (page: number) => {
    const contents = {
      1: {
        sections: [
          {
            id: '1',
            title: '1. General Tournament Rules',
            content: 'All participants must adhere to the following general guidelines throughout the tournament duration. These rules ensure fair play and maintain the integrity of the competition.',
            borderColor: '#3D5AF1'
          },
          {
            id: '1.1',
            title: '1.1 Eligibility Requirements',
            content: [
              'Players must be 16 years or older',
              'Valid government-issued ID required',
              'No previous tournament bans',
              'Team registration completed before deadline'
            ],
            borderColor: '#10B981'
          },
          {
            id: '1.2',
            title: '1.2 Registration Process',
            content: 'Teams must complete registration through the official platform. All team members must verify their accounts and provide necessary documentation.',
            borderColor: '#7C3AED'
          },
          {
            id: '1.3',
            title: '1.3 Tournament Format',
            content: 'The tournament follows a double-elimination bracket format with best-of-three matches in group stages and best-of-five in finals.',
            borderColor: '#EF4444'
          }
        ]
      },
      2: {
        sections: [
          {
            id: '2',
            title: '2. Match Rules & Procedures',
            content: 'Detailed regulations governing match conduct, timing, and procedures that all participants must follow during competitive play.',
            borderColor: '#3D5AF1'
          },
          {
            id: '2.1',
            title: '2.1 Pre-Match Procedures',
            content: [
              'Teams must join lobby 15 minutes before match time',
              'Equipment check and setup verification required',
              'Communication with referees mandatory',
              'Screenshot of game settings must be submitted'
            ],
            borderColor: '#10B981'
          },
          {
            id: '2.2',
            title: '2.2 During Match Rules',
            content: 'Players must maintain professional conduct throughout the match. Pausing is only allowed for technical issues with referee approval.',
            borderColor: '#7C3AED'
          }
        ]
      },
      3: {
        sections: [
          {
            id: '3',
            title: '3. Technical Requirements',
            content: 'Comprehensive technical specifications and requirements for all tournament participants to ensure fair competition.',
            borderColor: '#3D5AF1'
          },
          {
            id: '3.1',
            title: '3.1 Hardware Requirements',
            content: [
              'Minimum 144Hz monitor with 1ms response time',
              'Stable internet connection (minimum 50 Mbps)',
              'Gaming mouse and keyboard (no macro functions)',
              'Noise-cancelling headset for team communication'
            ],
            borderColor: '#10B981'
          }
        ]
      }
    }
    
    return contents[page as keyof typeof contents] || contents[1]
  }

  // Handle page input change
  const handlePageInputChange = (value: string) => {
    setPageInput(value)
  }

  // Handle page input submit
  const handlePageInputSubmit = () => {
    const pageNum = parseInt(pageInput)
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum)
    } else {
      setPageInput(currentPage.toString())
    }
  }

  // Handle download
  const handleDownload = () => {
    // Create content for all pages without page separators
    let fullContent = `Tournament Rules & Regulations\n\nOfficial Documentation v2.1\n\n`
    
    for (let page = 1; page <= totalPages; page++) {
      const pageContent = getPageContent(page)
      fullContent += pageContent.sections.map(section => 
        `${section.title}\n${Array.isArray(section.content) ? section.content.join('\n') : section.content}\n\n`
      ).join('')
    }
    
    const blob = new Blob([fullContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tournament-rules-complete-document.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Update page input when current page changes
  useEffect(() => {
    setPageInput(currentPage.toString())
  }, [currentPage])

  // Handle browser back button to redirect to tournaments page
  useTournamentBackNavigation(tournamentId)

  return (
    <>
      <GlobalLayout 
        tournamentSelected={true}
        tournamentId={tournamentId}
        gameName={tournament?.game}
      >
        <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E]">
          <div className="relative w-full max-w-[1430px] mx-auto px-6 py-12">
            
            {/* Document Viewer */}
            <div className="relative">
              {/* Top Navigation Bar */}
              <div className="bg-[rgba(42,42,74,0.95)] border border-[#3D5AF1] shadow-[0px_20.96px_83.83px_rgba(61,90,241,0.2)] backdrop-blur-[4.57px] rounded-[13.7px] p-4 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`w-[46px] h-[42px] rounded-[9.13px] flex items-center justify-center ${
                      currentPage === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#3D5AF1] hover:bg-[#3D5AF1]/80'
                    }`}
                  >
                    <ChevronLeft className="w-[23px] h-[21px] text-white" />
                  </button>
                  
                  <span className="text-white text-[15.98px] leading-[24px]">Page</span>
                  
                  <div className="bg-[#1E1E3F] border border-[#3D5AF1] rounded-[6.85px] min-w-[69px]">
                    <input
                      type="text"
                      value={pageInput}
                      onChange={(e) => handlePageInputChange(e.target.value)}
                      onBlur={handlePageInputSubmit}
                      onKeyPress={(e) => e.key === 'Enter' && handlePageInputSubmit()}
                      className="bg-transparent text-white text-[15.98px] leading-[24px] text-center w-full px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#3D5AF1] rounded-[6.85px]"
                    />
                  </div>
                  
                  <span className="text-[#A5B4FC] text-[15.98px] leading-[24px]">of</span>
                  <span className="text-white text-[15.98px] leading-[24px]">{totalPages}</span>
                  
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`w-[46px] h-[42px] rounded-[9.13px] flex items-center justify-center ${
                      currentPage === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#3D5AF1] hover:bg-[#3D5AF1]/80'
                    }`}
                  >
                    <ChevronRight className="w-[22px] h-[21px] text-white" />
                  </button>
                </div>
                
                <Button 
                  onClick={handleDownload}
                  className="bg-[#10B981] hover:bg-[#10B981]/80 rounded-[9.13px] px-6 py-2 text-white font-medium text-[15.98px] leading-[24px]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>

              {/* Document Content */}
              <div className="bg-white border border-[#3D5AF1] shadow-[0px_20.96px_83.83px_rgba(61,90,241,0.2)] rounded-[13.7px] w-[680px] h-[886px] mx-auto relative">
                <div className="p-12">
                  {/* Title */}
                  <h1 className="text-[#0F0F23] font-bold text-[36.53px] leading-[55px] text-center mb-4">
                    Tournament Rules & Regulations
                  </h1>
                  
                  {/* Blue underline */}
                  <div className="w-[569px] h-[2px] bg-[#3D5AF1] mx-auto mb-6"></div>
                  
                  {/* Subtitle */}
                  <p className="text-[#6B7280] text-[18.27px] leading-[27px] text-center mb-12">
                    Official Documentation v2.1
                  </p>

                  {/* Dynamic Content Based on Current Page */}
                  {getPageContent(currentPage).sections.map((section, index) => (
                    <div key={section.id} className={`border-l-[4.57px] pl-6 mb-8`} style={{ borderColor: section.borderColor }}>
                      <h2 className={`text-[#0F0F23] mb-4 ${
                        section.id.includes('.') ? 'font-medium text-[18.27px] leading-[27px]' : 'font-semibold text-[22.83px] leading-[34px]'
                      }`}>
                        {section.title}
                      </h2>
                      {Array.isArray(section.content) ? (
                        <div className="space-y-2 text-[#6B7280] text-[13.7px] leading-[21px] ml-5">
                          {section.content.map((item, itemIndex) => (
                            <p key={itemIndex}>{item}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[#6B7280] text-[15.98px] leading-[26px]">
                          {section.content}
                        </p>
                      )}
                    </div>
                  ))}
                  
                  {/* Spacer for footer */}
                  <div className="mb-16"></div>

                  {/* Footer */}
                  <div className="absolute bottom-6 left-12 right-12 flex justify-between items-center">
                    <span className="text-[#6B7280] text-[13.7px] leading-[21px]">
                      © 2024 eSport Manager
                    </span>
                    <span className="text-[#6B7280] text-[13.7px] leading-[21px]">
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <GlobalFooter />
        </div>
      </GlobalLayout>
    </>
  )
}
