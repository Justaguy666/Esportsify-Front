"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Eye } from 'lucide-react'
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { getTournamentById } from '@/data/tournaments'

export default function NewsDetailPage() {
  const router = useRouter()
  const params = useParams()
  const tournamentId = (params?.id as string) || ''
  const newsId = (params?.newsId as string) || ''
  const tournament = getTournamentById(tournamentId)

  // Handle browser back button to redirect to news page
  useEffect(() => {
    const handlePopState = () => {
      router.push(`/tournaments/tournaments-status/news/${tournamentId}`)
    }

    // Push current state to history
    window.history.pushState(null, '', window.location.href)
    
    // Listen for back button
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [tournamentId, router])

  // Mock news data (same as in main news page)
  const allNewsItems = [
    {
      id: 1,
      title: "New Anti-Cheat System Deployed Across All Tournaments",
      description: "Advanced AI-powered anti-cheat technology has been implemented to ensure fair play in all competitive matches.",
      date: "December 7, 2024",
      category: "Anti-Cheat",
      gradient: "from-blue-500 to-purple-600",
      author: "Tournament Officials",
      readTime: "5 min read",
      views: "2.4K",
      content: `
        <p>In a groundbreaking move to ensure the integrity of competitive esports, tournament organizers have deployed an advanced AI-powered anti-cheat system across all major tournaments. This cutting-edge technology represents a significant leap forward in maintaining fair play standards.</p>
        
        <h2>Key Features of the New System</h2>
        <p>The new anti-cheat system incorporates several revolutionary features:</p>
        <ul>
          <li><strong>Real-time Behavioral Analysis:</strong> The AI continuously monitors player behavior patterns to detect anomalies that may indicate cheating.</li>
          <li><strong>Advanced Pattern Recognition:</strong> Machine learning algorithms can identify even the most sophisticated cheating methods.</li>
          <li><strong>Instant Detection:</strong> Suspicious activities are flagged within milliseconds, allowing for immediate intervention.</li>
          <li><strong>False Positive Reduction:</strong> The system has been trained on millions of gameplay hours to minimize incorrect flags.</li>
        </ul>
        
        <h2>Impact on Tournament Integrity</h2>
        <p>This implementation marks a new era in competitive esports integrity. Players can now compete with confidence, knowing that the playing field is truly level. The system has already been tested in several regional tournaments with remarkable success rates.</p>
        
        <blockquote>
          "This technology ensures that skill and strategy remain the only determining factors in competitive outcomes. We're committed to providing the fairest possible environment for all competitors." - Chief Tournament Director
        </blockquote>
        
        <h2>Player and Community Response</h2>
        <p>The esports community has responded overwhelmingly positively to this announcement. Professional players have praised the initiative, noting that it will help legitimize esports as a serious competitive discipline.</p>
        
        <p>The system will be continuously updated and improved based on tournament data and community feedback, ensuring it remains at the forefront of anti-cheat technology.</p>
      `
    },
    {
      id: 2,
      title: "Team Phoenix Dominates Regional Qualifiers",
      description: "Team Phoenix secured their spot in the World Championship with a flawless 3-0 victory in the regional finals.",
      date: "December 6, 2024",
      category: "Team Phoenix",
      gradient: "from-purple-500 to-indigo-600",
      author: "Sports Reporter",
      readTime: "4 min read",
      views: "3.1K",
      content: `
        <p>Team Phoenix has cemented their position as one of the most formidable teams in the competitive scene with their dominant 3-0 victory in the regional qualifiers. Their flawless performance has earned them a coveted spot in the upcoming World Championship.</p>
        
        <h2>Match Breakdown</h2>
        <p>The team's journey to victory was nothing short of spectacular:</p>
        
        <h3>Game 1: Strategic Masterclass</h3>
        <p>Phoenix opened with an aggressive early game strategy that caught their opponents off guard. Their coordinated team fights and objective control led to a decisive 25-minute victory.</p>
        
        <h3>Game 2: Defensive Excellence</h3>
        <p>Facing a more cautious opponent, Phoenix demonstrated their versatility by adopting a defensive stance and capitalizing on enemy mistakes. Their patience paid off with a methodical 32-minute win.</p>
        
        <h3>Game 3: Championship Clincher</h3>
        <p>The final game showcased Phoenix at their absolute best. Perfect execution of their signature team composition led to a commanding victory that sealed their World Championship berth.</p>
        
        <h2>Key Players</h2>
        <p>Several Phoenix members delivered standout performances:</p>
        <ul>
          <li><strong>Phoenix.Blaze (Mid):</strong> Consistent lane dominance and game-changing plays</li>
          <li><strong>Phoenix.Storm (ADC):</strong> Perfect positioning and team fight execution</li>
          <li><strong>Phoenix.Shield (Support):</strong> Exceptional vision control and shot-calling</li>
        </ul>
        
        <blockquote>
          "We've been preparing for this moment all season. Our hard work and dedication have finally paid off. We're ready to show the world what Phoenix is capable of." - Phoenix.Blaze
        </blockquote>
        
        <h2>Road to Worlds</h2>
        <p>With their qualification secured, Team Phoenix now sets their sights on the World Championship. Their recent form suggests they could be serious contenders for the ultimate prize.</p>
      `
    },
    {
      id: 3,
      title: "Player Transfer Window Opens January 2025",
      description: "Teams can now begin negotiations for the upcoming transfer season with new regulations in place.",
      date: "December 5, 2024",
      category: "Transfer Window",
      gradient: "from-red-500 to-pink-600",
      author: "League Officials",
      readTime: "6 min read",
      views: "1.8K",
      content: `
        <p>The highly anticipated player transfer window is set to open in January 2025, bringing with it a comprehensive set of new regulations designed to create a more balanced and fair transfer system for all teams and players.</p>
        
        <h2>New Regulations Overview</h2>
        <p>The updated transfer system introduces several key changes:</p>
        
        <h3>Salary Cap Implementation</h3>
        <p>For the first time, a salary cap will be implemented to prevent excessive spending and ensure competitive balance across all teams. The cap is set at $2.5 million per team for the 2025 season.</p>
        
        <h3>Contract Transparency</h3>
        <p>All player contracts must now be registered with the league office, providing greater transparency and protection for both players and organizations.</p>
        
        <h3>Transfer Fee Structure</h3>
        <p>A new tiered transfer fee system has been introduced based on player performance metrics and contract length:</p>
        <ul>
          <li>Tier 1 Players: Maximum transfer fee of $500,000</li>
          <li>Tier 2 Players: Maximum transfer fee of $250,000</li>
          <li>Tier 3 Players: Maximum transfer fee of $100,000</li>
        </ul>
        
        <h2>Timeline and Important Dates</h2>
        <p>The transfer window will operate on the following schedule:</p>
        <ul>
          <li><strong>January 1-15:</strong> Negotiation period (no official signings)</li>
          <li><strong>January 16-31:</strong> Active transfer period</li>
          <li><strong>February 1:</strong> Roster lock for Spring season</li>
        </ul>
        
        <h2>Impact on Teams and Players</h2>
        <p>These changes are expected to create a more sustainable ecosystem for professional esports. Smaller organizations will have better opportunities to compete for talent, while players will benefit from increased contract security.</p>
        
        <blockquote>
          "These regulations represent a major step forward in professionalizing our sport. We're creating an environment where talent and strategy matter more than just financial resources." - League Commissioner
        </blockquote>
        
        <p>Teams are already beginning to strategize for the upcoming window, with several high-profile players expected to be available for transfer.</p>
      `
    }
  ]

  // Find the current news item
  const currentNews = allNewsItems.find(item => item.id === parseInt(newsId))

  if (!currentNews) {
    return (
      <GlobalLayout 
        tournamentSelected={true}
        tournamentId={tournamentId}
        gameName={tournament?.game}
      >
        <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-2xl mb-4">News Article Not Found</h1>
            <Button 
              onClick={() => router.push(`/tournaments/tournaments-status/news/${tournamentId}`)}
              className="bg-[#3D5AF1] hover:bg-[#3D5AF1]/80"
            >
              Back to News
            </Button>
          </div>
        </div>
      </GlobalLayout>
    )
  }

  return (
    <>
      <GlobalLayout 
        tournamentSelected={true}
        tournamentId={tournamentId}
        gameName={tournament?.game}
      >
        <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E]">
          <div className="relative w-full max-w-[1200px] mx-auto px-6 py-12">
            
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[#A5B4FC] text-sm mb-4">
                <Eye className="w-4 h-4" />
                <span>{currentNews.views} views</span>
              </div>
              
              <h1 className="text-white font-bold text-[48px] leading-[56px] mb-6">
                {currentNews.title}
              </h1>
              
              <div className="flex items-center gap-2 text-[#A5B4FC] mb-8">
                <Calendar className="w-4 h-4" />
                <span>{currentNews.date}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className={`h-[400px] bg-gradient-to-r ${currentNews.gradient} rounded-[20px] mb-8 flex items-center justify-center`}>
              <span className="text-white font-bold text-3xl">{currentNews.category}</span>
            </div>

            {/* Article Content */}
            <Card className="bg-gradient-to-br from-[#1A1A2E] via-[#2A2A4A] to-[#1E1E3F] border border-[#3D5AF1]/30 rounded-[20px]">
              <CardContent className="p-8">
                <div 
                  className="prose prose-invert prose-lg max-w-none"
                  style={{
                    color: '#A5B4FC',
                    lineHeight: '1.8'
                  }}
                >
                  <style jsx>{`
                    .prose h2 {
                      color: white;
                      font-size: 1.75rem;
                      font-weight: 700;
                      margin-top: 2rem;
                      margin-bottom: 1rem;
                    }
                    .prose h3 {
                      color: white;
                      font-size: 1.5rem;
                      font-weight: 600;
                      margin-top: 1.5rem;
                      margin-bottom: 0.75rem;
                    }
                    .prose p {
                      margin-bottom: 1.5rem;
                      font-size: 1.125rem;
                    }
                    .prose ul {
                      margin: 1.5rem 0;
                      padding-left: 1.5rem;
                    }
                    .prose li {
                      margin-bottom: 0.5rem;
                    }
                    .prose strong {
                      color: #10B981;
                      font-weight: 600;
                    }
                    .prose blockquote {
                      border-left: 4px solid #3D5AF1;
                      padding-left: 1.5rem;
                      margin: 2rem 0;
                      font-style: italic;
                      background: rgba(61, 90, 241, 0.1);
                      padding: 1.5rem;
                      border-radius: 8px;
                    }
                  `}</style>
                  <div dangerouslySetInnerHTML={{ __html: currentNews.content }} />
                </div>
              </CardContent>
            </Card>


          </div>
          <GlobalFooter />
        </div>
      </GlobalLayout>
    </>
  )
}
