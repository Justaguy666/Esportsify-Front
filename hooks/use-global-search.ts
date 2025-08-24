"use client"

import { useState, useMemo, useCallback } from "react"
import { tournaments } from "@/data/tournaments"
import { SUPPORTED_GAMES } from "@/lib/constants"

export interface SearchResult {
  id: string
  name: string
  type: 'game' | 'tournament'
  path: string
  game?: string
  description?: string
}

export function useGlobalSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const searchResults = useMemo(() => {
    if (!searchTerm || searchTerm.length < 2) {
      return []
    }

    const term = searchTerm.toLowerCase()
    const results: SearchResult[] = []

    // Search games
    SUPPORTED_GAMES.forEach(game => {
      if (game.name.toLowerCase().includes(term)) {
        results.push({
          id: game.id,
          name: game.name,
          type: 'game',
          path: game.path,
          description: `${game.players} players • ${game.tournaments} tournaments`
        })
      }
    })

    // Search tournaments - use Set to avoid duplicates
    const seenTournamentIds = new Set<string>()
    tournaments.forEach(tournament => {
      if (
        tournament.name.toLowerCase().includes(term) ||
        tournament.game.toLowerCase().includes(term) ||
        tournament.description.toLowerCase().includes(term)
      ) {
        // Skip if we've already seen this tournament ID
        if (seenTournamentIds.has(tournament.id)) {
          return
        }
        seenTournamentIds.add(tournament.id)

        // Determine tournament path based on status
        let tournamentPath = ''
        if (tournament.status === 'LIVE') {
          tournamentPath = `/tournaments/tournaments-status/live/${tournament.id}`
        } else if (tournament.status === 'ACTIVE') {
          tournamentPath = `/tournaments/tournaments-status/active/${tournament.id}`
        } else if (tournament.status === 'UPCOMING') {
          tournamentPath = `/tournaments/tournaments-status/upcoming/${tournament.id}`
        } else if (tournament.status === 'REGISTRATION') {
          tournamentPath = `/tournaments/tournaments-status/registration/${tournament.id}`
        } else if (tournament.status === 'COMPLETED') {
          tournamentPath = `/tournaments/tournaments-status/completed/${tournament.id}`
        }

        results.push({
          id: tournament.id, // Use original tournament ID for navigation
          name: tournament.name,
          type: 'tournament',
          path: tournamentPath,
          game: tournament.game,
          description: `${tournament.prizePool} • ${tournament.participants} teams • ${tournament.status}`
        })
      }
    })

    // Sort results: games first, then tournaments, both alphabetically
    return results.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'game' ? -1 : 1
      }
      return a.name.localeCompare(b.name)
    }).slice(0, 8) // Limit to 8 results
  }, [searchTerm])

  const clearSearch = useCallback(() => {
    setSearchTerm("")
    setIsOpen(false)
  }, [])

  const setSearchTermStable = useCallback((term: string) => {
    setSearchTerm(term)
  }, [])

  const setIsOpenStable = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  return {
    searchTerm,
    setSearchTerm: setSearchTermStable,
    searchResults,
    isOpen,
    setIsOpen: setIsOpenStable,
    clearSearch,
    hasResults: searchResults.length > 0
  }
}
