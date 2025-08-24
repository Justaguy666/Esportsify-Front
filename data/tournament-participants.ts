// Tournament participants mapping with realistic team assignments
import { teams } from './teams'
import { allSchedules } from './schedules'

export interface TournamentParticipant {
  tournamentId: string
  teamId: string
  seed: number
  region: string
  qualification: string
  status: 'qualified' | 'eliminated' | 'active'
}

// Realistic tournament participants mapping
export const tournamentParticipants: Record<string, TournamentParticipant[]> = {
  // League of Legends - Worlds 2024
  'league-of-legends-world-championship-2024': [
    { tournamentId: 'league-of-legends-world-championship-2024', teamId: 't1', seed: 1, region: 'LCK', qualification: 'LCK Summer Champion', status: 'qualified' },
    { tournamentId: 'league-of-legends-world-championship-2024', teamId: 'gen-g', seed: 2, region: 'LCK', qualification: 'LCK Championship Points', status: 'qualified' },
    { tournamentId: 'league-of-legends-world-championship-2024', teamId: 'blg', seed: 1, region: 'LPL', qualification: 'LPL Summer Champion', status: 'qualified' },
    { tournamentId: 'league-of-legends-world-championship-2024', teamId: 'tes', seed: 2, region: 'LPL', qualification: 'LPL Championship Points', status: 'qualified' },
  ],

  // League of Legends - LCK Spring 2024
  'league-of-legends-lcs-spring-2024': [
    { tournamentId: 'league-of-legends-lcs-spring-2024', teamId: 't1', seed: 1, region: 'LCK', qualification: 'Direct Invite', status: 'active' },
    { tournamentId: 'league-of-legends-lcs-spring-2024', teamId: 'gen-g', seed: 2, region: 'LCK', qualification: 'Direct Invite', status: 'active' },
  ],

  // Counter-Strike 2 - Major 2024
  'counter-strike-2-major-championship-2024': [
    { tournamentId: 'counter-strike-2-major-championship-2024', teamId: 'navi', seed: 1, region: 'EU', qualification: 'EU RMR Champion', status: 'qualified' },
    { tournamentId: 'counter-strike-2-major-championship-2024', teamId: 'g2', seed: 2, region: 'EU', qualification: 'EU RMR Runner-up', status: 'qualified' },
  ],

  // Counter-Strike 2 - IEM Katowice 2024
  'counter-strike-2-iem-katowice-2024': [
    { tournamentId: 'counter-strike-2-iem-katowice-2024', teamId: 'navi', seed: 1, region: 'EU', qualification: 'Direct Invite', status: 'qualified' },
    { tournamentId: 'counter-strike-2-iem-katowice-2024', teamId: 'g2', seed: 3, region: 'EU', qualification: 'Direct Invite', status: 'qualified' },
  ],

  // Valorant - Champions 2024
  'valorant-champions-2024': [
    { tournamentId: 'valorant-champions-2024', teamId: 'sentinels', seed: 1, region: 'NA', qualification: 'NA Champion', status: 'qualified' },
    { tournamentId: 'valorant-champions-2024', teamId: 'fnatic', seed: 2, region: 'EMEA', qualification: 'EMEA Champion', status: 'qualified' },
  ],

  // Valorant - Masters Madrid 2024
  'valorant-vct-masters-madrid-2024': [
    { tournamentId: 'valorant-vct-masters-madrid-2024', teamId: 'sentinels', seed: 1, region: 'NA', qualification: 'NA Champion', status: 'qualified' },
    { tournamentId: 'valorant-vct-masters-madrid-2024', teamId: 'fnatic', seed: 2, region: 'EMEA', qualification: 'EMEA Runner-up', status: 'qualified' },
  ],

  // Dota 2 - The International 2024
  'the-international-2024': [
    { tournamentId: 'the-international-2024', teamId: 'team-spirit', seed: 1, region: 'Eastern Europe', qualification: 'TI Qualifier', status: 'qualified' },
    { tournamentId: 'the-international-2024', teamId: 'g2-igi', seed: 2, region: 'Western Europe', qualification: 'TI Qualifier', status: 'qualified' },
  ],

  // Overwatch 2 - OWCS Championship 2024
  'overwatch-2-owcs-championship-2024': [
    { tournamentId: 'overwatch-2-owcs-championship-2024', teamId: 'shanghai-dragons', seed: 1, region: 'APAC', qualification: 'Regional Champion', status: 'qualified' },
    { tournamentId: 'overwatch-2-owcs-championship-2024', teamId: 'seoul-dynasty', seed: 2, region: 'APAC', qualification: 'Regional Runner-up', status: 'qualified' },
  ],

  // StarCraft II - WCS Global Finals 2024
  'starcraft-ii-wcs-global-finals-2024': [
    { tournamentId: 'starcraft-ii-wcs-global-finals-2024', teamId: 'serral', seed: 1, region: 'EU', qualification: 'Circuit Champion', status: 'qualified' },
    { tournamentId: 'starcraft-ii-wcs-global-finals-2024', teamId: 'clem', seed: 2, region: 'EU', qualification: 'Circuit Points', status: 'qualified' },
  ],
}

// Helper functions for tournament data integration
export const getTournamentTeams = (tournamentId: string) => {
  return tournamentParticipants[tournamentId] || []
}

export const getTeamTournaments = (teamId: string) => {
  return Object.entries(tournamentParticipants)
    .flatMap(([tournamentId, participants]) => 
      participants.filter(p => p.teamId === teamId)
    )
}

export const getTournamentSchedule = (tournamentId: string) => {
  return allSchedules.filter(match => match.tournamentId === tournamentId)
}

export const getTeamTournamentPerformance = (teamId: string, tournamentId: string) => {
  const matches = allSchedules.filter(
    match => match.tournamentId === tournamentId && 
    (match.team1 === teamId || match.team2 === teamId)
  )
  
  const wins = matches.filter(match => 
    (match.team1 === teamId && match.score && match.score.team1 > match.score.team2) ||
    (match.team2 === teamId && match.score && match.score.team2 > match.score.team1)
  ).length
  
  const losses = matches.filter(match => 
    (match.team1 === teamId && match.score && match.score.team1 < match.score.team2) ||
    (match.team2 === teamId && match.score && match.score.team2 < match.score.team1)
  ).length
  
  return { matches, wins, losses, winRate: matches.length > 0 ? (wins / matches.length * 100).toFixed(1) : '0.0' }
}

export const getTournamentStandings = (tournamentId: string) => {
  const participants = tournamentParticipants[tournamentId] || []
  const matches = allSchedules.filter(match => match.tournamentId === tournamentId)
  
  return participants.map(participant => {
    const performance = getTeamTournamentPerformance(participant.teamId, tournamentId)
    return {
      ...participant,
      ...performance,
      points: performance.wins * 3 + performance.losses * 0 // Simple point system
    }
  }).sort((a, b) => b.points - a.points)
}
