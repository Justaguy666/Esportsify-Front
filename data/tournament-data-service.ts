// Unified tournament data service integrating teams, schedules, and tournaments
import { tournaments, TournamentInfo } from './tournaments'
import { teams, TeamData } from './teams'
import { allSchedules, MatchSchedule } from './schedules'
import { tournamentParticipants, TournamentParticipant } from './tournament-participants'
import { tournamentNews, getTournamentNews } from './tournament-news'
import { tournamentHighlights, getTournamentHighlights } from './tournament-highlights'
import { tournamentRules, getTournamentRules } from './tournament-rules'

export interface TournamentDetails extends TournamentInfo {
  participatingTeams: TeamData[]
  schedule: MatchSchedule[]
  standings: TournamentStanding[]
  upcomingMatches: MatchSchedule[]
  completedMatches: MatchSchedule[]
  liveMatches: MatchSchedule[]
  news: any[]
  highlights: any[]
  rules: any
}

export interface TournamentStanding {
  team: TeamData
  position: number
  wins: number
  losses: number
  points: number
  qualification: string
  status: 'qualified' | 'eliminated' | 'active'
}

export interface TeamTournamentStats {
  tournament: TournamentInfo
  matches: MatchSchedule[]
  wins: number
  losses: number
  winRate: string
  currentStanding?: number
}

// Main service functions
export const tournamentDataService = {
  // Get complete tournament details with integrated data
  getTournamentDetails: (tournamentId: string): TournamentDetails | null => {
    const tournament = tournaments.find(t => t.id === tournamentId)
    if (!tournament) return null

    const participants = tournamentParticipants[tournamentId] || []
    const tournamentTeams = participants.map(p => 
      teams.find(team => team.id === p.teamId)
    ).filter(Boolean) as TeamData[]

    const schedule = allSchedules.filter(match => match.tournamentId === tournamentId)
    const standings = tournamentDataService.getTournamentStandings(tournamentId)
    
    const upcomingMatches = schedule.filter(match => match.status === 'scheduled')
    const completedMatches = schedule.filter(match => match.status === 'completed')
    const liveMatches = schedule.filter(match => match.status === 'live')

    return {
      ...tournament,
      participatingTeams: tournamentTeams,
      schedule,
      standings,
      upcomingMatches,
      completedMatches,
      liveMatches,
      news: getTournamentNews(tournamentId),
      highlights: getTournamentHighlights(tournamentId),
      rules: getTournamentRules(tournamentId)
    }
  },

  // Get tournament standings with team data
  getTournamentStandings: (tournamentId: string): TournamentStanding[] => {
    const participants = tournamentParticipants[tournamentId] || []
    const tournament = tournaments.find(t => t.id === tournamentId)
    if (!tournament) return []

    return participants.map((participant, index) => {
      const team = teams.find(t => t.id === participant.teamId)
      if (!team) return null

      const stats = tournamentDataService.getTeamTournamentStats(participant.teamId, tournamentId)
      
      return {
        team,
        position: index + 1,
        wins: stats.wins,
        losses: stats.losses,
        points: stats.wins * 3, // Simple 3 points per win system
        qualification: participant.qualification,
        status: participant.status
      }
    }).filter(Boolean) as TournamentStanding[]
  },

  // Get team statistics for a specific tournament
  getTeamTournamentStats: (teamId: string, tournamentId: string): TeamTournamentStats => {
    const tournament = tournaments.find(t => t.id === tournamentId)
    if (!tournament) {
      return {
        tournament: tournaments[0] || {
          id: 'default',
          name: 'Default Tournament',
          game: 'Unknown',
          prizePool: '$0',
          participants: '0',
          organizer: 'Unknown',
          description: 'Default tournament',
          startDate: '2024-01-01',
          endDate: '2024-01-01',
          format: 'Unknown',
          registrationType: 'team',
          status: 'UPCOMING'
        },
        matches: [],
        wins: 0,
        losses: 0,
        winRate: '0.0'
      }
    }

    const matches = allSchedules.filter(match => 
      match.tournamentId === tournamentId && 
      (match.team1 === teamId || match.team2 === teamId)
    )

    const wins = matches.filter(match => {
      if (!match.score) return false
      return (match.team1 === teamId && match.score.team1 > match.score.team2) ||
             (match.team2 === teamId && match.score.team2 > match.score.team1)
    }).length

    const losses = matches.filter(match => {
      if (!match.score) return false
      return (match.team1 === teamId && match.score.team1 < match.score.team2) ||
             (match.team2 === teamId && match.score.team2 < match.score.team1)
    }).length

    const winRate = matches.length > 0 ? ((wins / matches.length) * 100).toFixed(1) : '0.0'

    return {
      tournament,
      matches,
      wins,
      losses,
      winRate
    }
  },

  // Get all tournaments for a specific game
  getTournamentsByGame: (game: string): TournamentInfo[] => {
    return tournaments.filter(t => t.game === game)
  },

  // Get upcoming matches across all tournaments
  getUpcomingMatches: (limit: number = 10): MatchSchedule[] => {
    return allSchedules
      .filter(match => match.status === 'scheduled')
      .sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime())
      .slice(0, limit)
  },

  // Get live matches across all tournaments
  getLiveMatches: (): MatchSchedule[] => {
    return allSchedules.filter(match => match.status === 'live')
  },

  // Get recent completed matches
  getRecentCompletedMatches: (limit: number = 10): MatchSchedule[] => {
    return allSchedules
      .filter(match => match.status === 'completed')
      .sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime())
      .slice(0, limit)
  },

  // Get team data with tournament history
  getTeamWithTournamentHistory: (teamId: string) => {
    const team = teams.find(t => t.id === teamId)
    if (!team) return null

    const teamTournaments = tournamentDataService.getTeamTournaments(teamId)
    
    return {
      ...team,
      tournaments: teamTournaments
    }
  },

  // Get all tournaments a team is participating in
  getTeamTournaments: (teamId: string): TournamentInfo[] => {
    const participantEntries = Object.entries(tournamentParticipants)
      .filter(([_, participants]) => 
        participants.some(p => p.teamId === teamId)
      )
    
    return participantEntries
      .map(([tournamentId]) => tournaments.find(t => t.id === tournamentId))
      .filter(Boolean) as TournamentInfo[]
  },

  // Search tournaments by name or game
  searchTournaments: (query: string): TournamentInfo[] => {
    const lowerQuery = query.toLowerCase()
    return tournaments.filter(t => 
      t.name.toLowerCase().includes(lowerQuery) ||
      t.game.toLowerCase().includes(lowerQuery)
    )
  },

  // Get tournament overview for dashboard
  getTournamentOverview: () => {
    const liveTournaments = tournaments.filter(t => t.status === 'LIVE')
    const upcomingTournaments = tournaments.filter(t => t.status === 'UPCOMING')
    const activeTournaments = tournaments.filter(t => t.status === 'ACTIVE')
    
    return {
      liveTournaments,
      upcomingTournaments,
      activeTournaments,
      totalPrizePool: tournaments.reduce((sum, t) => {
        const prize = parseInt(t.prizePool.replace(/[$,]/g, ''))
        return sum + (isNaN(prize) ? 0 : prize)
      }, 0),
      totalTeams: teams.length,
      totalMatches: allSchedules.length,
      liveMatches: tournamentDataService.getLiveMatches(),
      upcomingMatches: tournamentDataService.getUpcomingMatches(5)
    }
  }
}

// Helper functions for specific use cases
export const getTournamentById = (id: string): TournamentDetails | null => {
  return tournamentDataService.getTournamentDetails(id)
}

export const getTournamentsForGame = (game: string): TournamentInfo[] => {
  return tournamentDataService.getTournamentsByGame(game)
}

export const getTeamProfile = (teamId: string) => {
  return tournamentDataService.getTeamWithTournamentHistory(teamId)
}

export const getLiveTournaments = () => {
  return tournaments.filter(t => t.status === 'LIVE')
}

export const getUpcomingTournaments = () => {
  return tournaments.filter(t => t.status === 'UPCOMING')
}

export const getActiveTournaments = () => {
  return tournaments.filter(t => t.status === 'ACTIVE')
}

// Export all data for direct access if needed
export { tournaments, teams, allSchedules, tournamentParticipants }
