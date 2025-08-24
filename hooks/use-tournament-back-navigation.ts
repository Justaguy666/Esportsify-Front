import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useTournamentBackNavigation(tournamentId: string) {
  const router = useRouter()

  useEffect(() => {
    const getGameSlugFromTournamentId = (tournamentId: string): string => {
      if (tournamentId.includes('league-of-legends')) return 'league-of-legends'
      if (tournamentId.includes('counter-strike-2')) return 'counter-strike-2'
      if (tournamentId.includes('valorant')) return 'valorant'
      if (tournamentId.includes('dota-2')) return 'dota-2'
      if (tournamentId.includes('overwatch-2')) return 'overwatch-2'
      if (tournamentId.includes('starcraft-ii')) return 'starcraft-ii'
      return 'league-of-legends'
    }

    const gameSlug = getGameSlugFromTournamentId(tournamentId)
    const backUrl = `/tournaments/${gameSlug}`

    // Push a custom entry to history stack when component mounts
    window.history.pushState({ customBack: true, backUrl }, '', window.location.href)

    const handlePopState = (event: PopStateEvent) => {
      // If this is our custom back entry, navigate to tournaments page
      if (event.state?.customBack) {
        router.replace(backUrl)
        return
      }
      
      // For any other back navigation, also go to tournaments page
      router.replace(backUrl)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [router, tournamentId])
}
