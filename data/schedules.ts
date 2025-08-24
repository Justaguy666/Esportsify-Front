// Comprehensive match schedules for all tournaments

export interface MatchSchedule {
  id: string
  tournamentId: string
  game: string
  team1: string
  team2: string
  matchDate: string
  matchTime: string
  format: string
  stage: string
  status: 'scheduled' | 'live' | 'completed'
  score?: {
    team1: number
    team2: number
  }
  bestOf: number
  streamLink?: string
  venue?: string
}

// League of Legends - LCK 2024 Spring Split
const lckSpring2024: MatchSchedule[] = [
  {
    id: "lck-spring-2024-001",
    tournamentId: "lck-spring-2024",
    game: "League of Legends",
    team1: "t1",
    team2: "gen-g",
    matchDate: "2024-01-17",
    matchTime: "17:00",
    format: "BO3",
    stage: "Regular Season",
    status: "completed",
    score: { team1: 2, team2: 1 },
    bestOf: 3,
    venue: "LoL Park, Seoul",
    streamLink: "https://twitch.tv/lck"
  },
  {
    id: "lck-spring-2024-002",
    tournamentId: "lck-spring-2024",
    game: "League of Legends",
    team1: "gen-g",
    team2: "t1",
    matchDate: "2024-02-25",
    matchTime: "15:00",
    format: "BO5",
    stage: "Playoffs Finals",
    status: "completed",
    score: { team1: 3, team2: 2 },
    bestOf: 5,
    venue: "LoL Park, Seoul",
    streamLink: "https://twitch.tv/lck"
  },
  {
    id: "lck-spring-2024-003",
    tournamentId: "lck-spring-2024",
    game: "League of Legends",
    team1: "t1",
    team2: "hle",
    matchDate: "2024-03-10",
    matchTime: "17:00",
    format: "BO3",
    stage: "Regular Season",
    status: "scheduled",
    bestOf: 3,
    venue: "LoL Park, Seoul",
    streamLink: "https://twitch.tv/lck"
  }
]

// League of Legends - LPL 2024 Spring Split
const lplSpring2024: MatchSchedule[] = [
  {
    id: "lpl-spring-2024-001",
    tournamentId: "lpl-spring-2024",
    game: "League of Legends",
    team1: "blg",
    team2: "tes",
    matchDate: "2024-01-22",
    matchTime: "19:00",
    format: "BO3",
    stage: "Regular Season",
    status: "completed",
    score: { team1: 2, team2: 0 },
    bestOf: 3,
    venue: "Shanghai Oriental Sports Center",
    streamLink: "https://twitch.tv/lpl"
  },
  {
    id: "lpl-spring-2024-002",
    tournamentId: "lpl-spring-2024",
    game: "League of Legends",
    team1: "tes",
    team2: "jdg",
    matchDate: "2024-02-18",
    matchTime: "17:00",
    format: "BO5",
    stage: "Playoffs Semifinals",
    status: "completed",
    score: { team1: 3, team2: 1 },
    bestOf: 5,
    venue: "Suzhou Olympic Sports Center",
    streamLink: "https://twitch.tv/lpl"
  }
]

// Counter-Strike 2 - IEM Katowice 2024
const iemKatowice2024: MatchSchedule[] = [
  {
    id: "iem-katowice-2024-001",
    tournamentId: "iem-katowice-2024",
    game: "Counter-Strike 2",
    team1: "navi",
    team2: "g2",
    matchDate: "2024-02-11",
    matchTime: "16:00",
    format: "BO3",
    stage: "Semifinals",
    status: "completed",
    score: { team1: 2, team2: 0 },
    bestOf: 3,
    venue: "Spodek Arena, Katowice",
    streamLink: "https://twitch.tv/esl_csgo"
  },
  {
    id: "iem-katowice-2024-002",
    tournamentId: "iem-katowice-2024",
    game: "Counter-Strike 2",
    team1: "navi",
    team2: "faze",
    matchDate: "2024-02-11",
    matchTime: "20:00",
    format: "BO5",
    stage: "Grand Final",
    status: "completed",
    score: { team1: 3, team2: 1 },
    bestOf: 5,
    venue: "Spodek Arena, Katowice",
    streamLink: "https://twitch.tv/esl_csgo"
  }
]

// Valorant - VCT 2024 Champions
const vctChampions2024: MatchSchedule[] = [
  {
    id: "vct-champions-2024-001",
    tournamentId: "vct-champions-2024",
    game: "Valorant",
    team1: "sentinels",
    team2: "fnatic",
    matchDate: "2024-08-25",
    matchTime: "18:00",
    format: "BO5",
    stage: "Grand Final",
    status: "completed",
    score: { team1: 3, team2: 2 },
    bestOf: 5,
    venue: "KIA Forum, Los Angeles",
    streamLink: "https://twitch.tv/valorant"
  },
  {
    id: "vct-champions-2024-002",
    tournamentId: "vct-champions-2024",
    game: "Valorant",
    team1: "sentinels",
    team2: "paper-rex",
    matchDate: "2024-08-24",
    matchTime: "16:00",
    format: "BO3",
    stage: "Semifinals",
    status: "completed",
    score: { team1: 2, team2: 0 },
    bestOf: 3,
    venue: "KIA Forum, Los Angeles",
    streamLink: "https://twitch.tv/valorant"
  }
]

// Dota 2 - The International 2024
const ti2024: MatchSchedule[] = [
  {
    id: "ti2024-001",
    tournamentId: "the-international-2024",
    game: "Dota 2",
    team1: "team-spirit",
    team2: "g2-igi",
    matchDate: "2024-09-15",
    matchTime: "15:00",
    format: "BO5",
    stage: "Grand Final",
    status: "completed",
    score: { team1: 3, team2: 2 },
    bestOf: 5,
    venue: "Royal Arena, Copenhagen",
    streamLink: "https://twitch.tv/dota2ti"
  }
]

// Upcoming Matches
const upcomingMatches: MatchSchedule[] = [
  {
    id: "upcoming-001",
    tournamentId: "lck-spring-2025",
    game: "League of Legends",
    team1: "t1",
    team2: "gen-g",
    matchDate: "2025-01-15",
    matchTime: "17:00",
    format: "BO3",
    stage: "Regular Season",
    status: "scheduled",
    bestOf: 3,
    venue: "LoL Park, Seoul",
    streamLink: "https://twitch.tv/lck"
  },
  {
    id: "upcoming-002",
    tournamentId: "iem-katowice-2025",
    game: "Counter-Strike 2",
    team1: "navi",
    team2: "g2",
    matchDate: "2025-02-01",
    matchTime: "18:00",
    format: "BO3",
    stage: "Group Stage",
    status: "scheduled",
    bestOf: 3,
    venue: "Spodek Arena, Katowice",
    streamLink: "https://twitch.tv/esl_csgo"
  }
]

// Combine all schedules
export const allSchedules: MatchSchedule[] = [
  ...lckSpring2024,
  ...lplSpring2024,
  ...iemKatowice2024,
  ...vctChampions2024,
  ...ti2024,
  ...upcomingMatches
]

// Helper functions
export const getMatchesByTournament = (tournamentId: string): MatchSchedule[] => {
  return allSchedules.filter(match => match.tournamentId === tournamentId)
}

export const getMatchesByGame = (game: string): MatchSchedule[] => {
  return allSchedules.filter(match => match.game.toLowerCase() === game.toLowerCase())
}

export const getUpcomingMatches = (): MatchSchedule[] => {
  const now = new Date()
  return allSchedules.filter(match => 
    match.status === 'scheduled' && 
    new Date(match.matchDate) > now
  ).sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime())
}

export const getLiveMatches = (): MatchSchedule[] => {
  return allSchedules.filter(match => match.status === 'live')
}

export const getCompletedMatches = (): MatchSchedule[] => {
  return allSchedules.filter(match => match.status === 'completed')
    .sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime())
}

export const getMatchesByTeam = (teamId: string): MatchSchedule[] => {
  return allSchedules.filter(match => 
    match.team1 === teamId || match.team2 === teamId
  ).sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime())
}

export const getMatchesByDate = (date: string): MatchSchedule[] => {
  return allSchedules.filter(match => match.matchDate === date)
}

export const getMatchById = (matchId: string): MatchSchedule | undefined => {
  return allSchedules.find(match => match.id === matchId)
}
