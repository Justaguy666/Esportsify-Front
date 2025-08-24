import { useState, useEffect } from "react"
import { TournamentInfo, tournaments } from "@/data/tournaments"

interface UseTournamentsOptions {
  game?: string
  limit?: number
}

interface UseTournamentsReturn {
  tournaments: TournamentInfo[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useTournaments(options: UseTournamentsOptions = {}): UseTournamentsReturn {
  const [tournamentsData, setTournamentsData] = useState<TournamentInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTournaments = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate async data fetching
      await new Promise(resolve => setTimeout(resolve, 100))
      
      let data = [...tournaments]
      
      // Apply filters
      if (options.game) {
        data = data.filter(tournament => 
          tournament.game.toLowerCase().includes(options.game!.toLowerCase())
        )
      }
      
      // Apply limit
      if (options.limit && options.limit > 0) {
        data = data.slice(0, options.limit)
      }
      
      setTournamentsData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tournaments")
      setTournamentsData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTournaments()
  }, [options.game, options.limit])

  return {
    tournaments: tournamentsData,
    loading,
    error,
    refetch: fetchTournaments
  }
}

// Hook for featured tournaments (based on prize pool)
export function useFeaturedTournaments(limit: number = 6) {
  const { tournaments: allTournaments, loading, error, refetch } = useTournaments()
  
  const featuredTournaments = allTournaments
    .sort((a, b) => {
      // Sort by prize pool (extract number from string)
      const prizeA = parseInt(a.prizePool.replace(/[^\d]/g, ''))
      const prizeB = parseInt(b.prizePool.replace(/[^\d]/g, ''))
      return prizeB - prizeA
    })
    .slice(0, limit)
  
  return {
    tournaments: featuredTournaments,
    loading,
    error,
    refetch
  }
}

// Hook for tournaments by game
export function useTournamentsByGame(game: string, limit?: number) {
  return useTournaments({ game, limit })
}
