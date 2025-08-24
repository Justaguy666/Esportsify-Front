"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect } from "react"
import { getTournamentById } from '@/data/tournaments'
import { useTournamentBackNavigation } from '@/hooks/use-tournament-back-navigation'

export default function TournamentParticipantsPage() {
  const router = useRouter()
  const params = useParams()
  const tournamentId = (params?.id as string) || ''
  const tournament = getTournamentById(tournamentId)

  // Handle browser back button to redirect to tournaments page
  useTournamentBackNavigation(tournamentId)

  // Redirect based on tournament registration type
  useEffect(() => {
    if (tournament) {
      if (tournament.registrationType === 'individual') {
        router.replace(`/tournaments/tournaments-status/participants/${tournamentId}/individual-participants`)
      } else if (tournament.registrationType === 'team') {
        router.replace(`/tournaments/tournaments-status/participants/${tournamentId}/team-participants`)
      }
    }
  }, [tournament, tournamentId, router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] flex items-center justify-center">
      <div className="text-white text-xl">Loading participants...</div>
    </div>
  )
}
