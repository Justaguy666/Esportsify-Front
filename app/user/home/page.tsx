"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Twitter, Instagram } from "lucide-react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { SUPPORTED_GAMES } from "@/lib/constants"
import { getAllPlayers } from "@/data/players"
import { tournaments } from "@/data/tournaments"
import { getTournamentsForGame } from "@/data/tournament-data-service"

export default function EsportsifyHome() {
  const router = useRouter()

  const games = SUPPORTED_GAMES


  // Dynamic statistics
  const playerCount = getAllPlayers().length
  const tournamentCount = tournaments.length
  // Unique games from tournaments data
  const uniqueGames = Array.from(new Set(tournaments.map(t => t.game)))
  const gameCount = uniqueGames.length

  const stats = [
    { number: playerCount.toLocaleString(), label: "Active Players", color: "border-[#3D5AF1]" },
    { number: tournamentCount.toLocaleString(), label: "Tournaments", color: "border-[#F59E0B]" },
    { number: gameCount.toLocaleString(), label: "Supported Games", color: "border-[#10B981]" },
  ]

  // Compute dynamic tournament counts per game from data source
  const tournamentCounts = React.useMemo(() => {
    const map: Record<string, number> = {}
    games.forEach((g) => {
      try {
        map[g.id] = getTournamentsForGame(g.name).length
      } catch {
        map[g.id] = 0
      }
    })
    return map
  }, [games])

  const handleGameClick = (gamePath: string) => {
    // Navigate to tournament selection page for the selected game
    router.push(gamePath)
  }

  return (
    <GlobalLayout tournamentSelected={false}>
      <div className="flex flex-col min-h-full bg-gradient-to-br from-[#16213E] via-[#1A1A2E] to-[#0F0F23] custom-scrollbar overflow-x-hidden w-full">
        <div className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-16">
            <div className="w-full text-center">
              <div className="flex justify-center items-center gap-4 mb-4">
                <h1 className="text-6xl font-bold text-white">Choose Your</h1>
                <h1 className="text-6xl font-bold text-white">Battlefield</h1>
              </div>
              <p className="text-[#A5B4FC] text-2xl mb-16">Select from our supported esports to start the journey</p>

            {/* Game Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 px-6">
              {games.map((game, index) => (
                <Card
                  key={game.id}
                  className="bg-gradient-to-b from-[#2A2A4A] to-[#1E1E3F] border border-[#3D5AF1] rounded-3xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => handleGameClick(game.path)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={game.image || "/placeholder.svg"}
                        alt={game.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-8 bg-gradient-to-b from-[#16213E] via-[#1A1A2E] to-[#0F0F23]">
                      <h3 className="text-white text-3xl font-bold mb-4">{game.name}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[#A5B4FC] text-lg">Players</span>
                        <span className="text-[#A5B4FC] text-lg">Tournaments</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white text-xl font-bold">{game.players}</span>
                        <span className="text-white text-xl font-bold">{tournamentCounts[game.id] ?? 0}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-gradient-to-r from-[#1E1E3F] via-[#2A2A4A] to-[#1E1E3F] w-full py-24">
          <div className="w-full text-center px-6">
            <div className="flex justify-center items-center gap-2 mb-12">
              <h2 className="text-6xl font-bold text-white">About</h2>
              <h2 className="text-6xl font-bold text-white">Esportsify</h2>
            </div>

            <div className="w-24 h-1 bg-gradient-to-r from-[#7C3AED] to-[#3D5AF1] rounded-full mx-auto mb-16"></div>

            <div className="max-w-4xl mx-auto space-y-8 mb-16">
              <p className="text-[#A5B4FC] text-xl leading-relaxed">
                Esportsify is the ultimate platform for managing esports tournaments, teams, and players across multiple
                gaming titles. We provide comprehensive tools for tournament organization, player management, and
                competitive gaming experiences.
              </p>
              <p className="text-[#A5B4FC] text-xl leading-relaxed">
                Our platform supports major esports titles and offers real-time statistics, tournament brackets, team
                management, and player profiles. Join thousands of gamers and tournament organizers who trust Esportsify
                for their competitive gaming needs.
              </p>
              <p className="text-[#A5B4FC] text-xl leading-relaxed">
                Whether you're organizing local tournaments or managing professional esports teams, Esportsify provides
                the tools and infrastructure you need to succeed in the competitive gaming world.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className={`bg-gradient-to-b from-[#16213E] via-[#1A1A2E] to-[#0F0F23] border ${stat.color} rounded-2xl p-8 text-center hover:scale-105 transition-transform`}
                >
                  <CardContent className="p-0">
                    <div className="text-5xl font-bold text-white mb-4">{stat.number}</div>
                    <div className="text-[#A5B4FC] text-lg font-bold">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        </div>

        <GlobalFooter />
      </div>
    </GlobalLayout>
  )
}
