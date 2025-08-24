// Centralized notifications data

export interface NotificationMatch {
  id: string
  tournamentId: string
  team1: string
  team2: string
  score: string
  status: 'completed' | 'live' | 'upcoming'
  startTime: Date
}

export const notificationMatches: NotificationMatch[] = [
  {
    id: 'match-1',
    tournamentId: 'league-of-legends-world-championship-2024',
    team1: 'T1',
    team2: 'Gen.G',
    score: '3-1',
    status: 'completed',
    startTime: new Date(Date.now() + 25 * 60 * 1000), // 25 minutes from now
  },
  {
    id: 'match-2',
    tournamentId: 'league-of-legends-world-championship-2024',
    team1: 'JDG',
    team2: 'BLG',
    score: '2-3',
    status: 'live',
    startTime: new Date(Date.now() + 28 * 60 * 1000), // 28 minutes from now
  },
  {
    id: 'match-3',
    tournamentId: 'league-of-legends-lcs-spring-2024',
    team1: 'Cloud9',
    team2: 'TSM',
    score: '0-0',
    status: 'upcoming',
    startTime: new Date(Date.now() + 32 * 60 * 1000), // 32 minutes from now
  },
  {
    id: 'match-4',
    tournamentId: 'counter-strike-2-major-championship-2024',
    team1: 'NAVI',
    team2: 'FaZe',
    score: '16-14',
    status: 'completed',
    startTime: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: 'match-5',
    tournamentId: 'valorant-champions-2024',
    team1: 'Sentinels',
    team2: 'LOUD',
    score: '2-1',
    status: 'completed',
    startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  }
]

export function getNotificationMatchesByTournament(tournamentId: string): NotificationMatch[] {
  return notificationMatches.filter(match => match.tournamentId === tournamentId)
}
