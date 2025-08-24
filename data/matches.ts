// Centralized tournament matches data and helpers

export type MatchStatus = 'completed' | 'live' | 'upcoming'

export interface MatchSchedule {
  date: string // ISO-8601 with timezone offset, e.g., 2025-08-20T18:00:00+07:00
  left: string // team full name, e.g., 'Team Alpha'
  right: string // team full name, e.g., 'Team Beta'
  score?: string // e.g., '2 - 1' or '0 - 0' (0-0 means unplayed)
}

export interface TeamsDirectoryEntry {
  abbr: string
  color: string // tailwind bg-* class
}

export interface TournamentMatches {
  teams: Record<string, TeamsDirectoryEntry>
  schedule: MatchSchedule[]
}

// Teams used in the sample tournament data
const defaultTeams: Record<string, TeamsDirectoryEntry> = {
  'Team Alpha':   { color: 'bg-indigo-500',  abbr: 'TA' },
  'Team Beta':    { color: 'bg-red-500',     abbr: 'TB' },
  'Team Gamma':   { color: 'bg-green-500',   abbr: 'GA' },
  'Team Delta':   { color: 'bg-amber-500',   abbr: 'TD' },
  'Team Echo':    { color: 'bg-purple-500',  abbr: 'TE' },
  'Team Foxtrot': { color: 'bg-pink-500',    abbr: 'TF' },
  'Team Golf':    { color: 'bg-blue-500',    abbr: 'TG' },
  'Team Hotel':   { color: 'bg-emerald-500', abbr: 'TH' },
}

// Professional teams for different games
const lolTeams: Record<string, TeamsDirectoryEntry> = {
  'T1':           { color: 'bg-red-600',      abbr: 'T1' },
  'Gen.G':        { color: 'bg-yellow-500',   abbr: 'GEN' },
  'JDG':          { color: 'bg-blue-600',     abbr: 'JDG' },
  'BLG':          { color: 'bg-purple-600',   abbr: 'BLG' },
  'DRX':          { color: 'bg-green-600',    abbr: 'DRX' },
  'KT Rolster':   { color: 'bg-orange-600',   abbr: 'KT' },
  'Hanwha Life':  { color: 'bg-pink-600',     abbr: 'HLE' },
  'Cloud9':       { color: 'bg-cyan-600',     abbr: 'C9' },
}

const cs2Teams: Record<string, TeamsDirectoryEntry> = {
  'NAVI':         { color: 'bg-yellow-500',   abbr: 'NAV' },
  'FaZe':         { color: 'bg-red-600',      abbr: 'FZ' },
  'Astralis':     { color: 'bg-blue-600',     abbr: 'AST' },
  'G2':           { color: 'bg-purple-600',   abbr: 'G2' },
  'Vitality':     { color: 'bg-orange-600',   abbr: 'VIT' },
  'MOUZ':         { color: 'bg-green-600',    abbr: 'MZ' },
  'Liquid':       { color: 'bg-cyan-600',     abbr: 'TL' },
  'NIP':          { color: 'bg-pink-600',     abbr: 'NIP' },
}

const valorantTeams: Record<string, TeamsDirectoryEntry> = {
  'Sentinels':    { color: 'bg-red-600',      abbr: 'SEN' },
  'LOUD':         { color: 'bg-green-600',    abbr: 'LOU' },
  'OpTic':        { color: 'bg-emerald-600',  abbr: 'OPT' },
  'FPX':          { color: 'bg-blue-600',     abbr: 'FPX' },
  'Paper Rex':    { color: 'bg-orange-600',   abbr: 'PRX' },
  'FNATIC':       { color: 'bg-yellow-500',   abbr: 'FNC' },
  'DRX':          { color: 'bg-purple-600',   abbr: 'DRX' },
  'XSET':         { color: 'bg-pink-600',     abbr: 'XST' },
}

export const tournamentMatches: Record<string, TournamentMatches> = {
  'league-of-legends-world-championship-2024': {
    teams: lolTeams,
    schedule: [
      { date: '2025-08-10T18:00:00+07:00', left: 'T1',          right: 'Gen.G',       score: '3 - 1' },
      { date: '2025-08-12T18:00:00+07:00', left: 'JDG',         right: 'BLG',         score: '2 - 3' },
      { date: '2025-08-14T18:00:00+07:00', left: 'DRX',         right: 'KT Rolster',  score: '3 - 0' },
      { date: '2025-08-16T18:00:00+07:00', left: 'Hanwha Life', right: 'Cloud9',      score: '1 - 3' },
      { date: '2025-08-18T18:00:00+07:00', left: 'T1',          right: 'BLG',         score: '3 - 2' },
      { date: '2025-08-20T18:00:00+07:00', left: 'DRX',         right: 'Cloud9',      score: '2 - 3' },
      { date: '2025-08-22T18:00:00+07:00', left: 'T1',          right: 'Cloud9',      score: '0 - 0' },
    ],
  },
  'counter-strike-2-major-championship-2024': {
    teams: cs2Teams,
    schedule: [
      { date: '2025-08-11T16:00:00+07:00', left: 'NAVI',        right: 'FaZe',        score: '16 - 14' },
      { date: '2025-08-13T16:00:00+07:00', left: 'Astralis',    right: 'G2',          score: '13 - 16' },
      { date: '2025-08-15T16:00:00+07:00', left: 'Vitality',    right: 'MOUZ',        score: '16 - 12' },
      { date: '2025-08-17T16:00:00+07:00', left: 'Liquid',      right: 'NIP',         score: '14 - 16' },
      { date: '2025-08-19T16:00:00+07:00', left: 'NAVI',        right: 'G2',          score: '16 - 11' },
      { date: '2025-08-21T16:00:00+07:00', left: 'Vitality',    right: 'NIP',         score: '15 - 13' },
      { date: '2025-08-23T16:00:00+07:00', left: 'NAVI',        right: 'Vitality',    score: '0 - 0' },
    ],
  },
  'valorant-champions-2024': {
    teams: valorantTeams,
    schedule: [
      { date: '2025-08-12T19:00:00+07:00', left: 'Sentinels',   right: 'LOUD',        score: '2 - 1' },
      { date: '2025-08-14T19:00:00+07:00', left: 'OpTic',        right: 'FPX',         score: '1 - 2' },
      { date: '2025-08-16T19:00:00+07:00', left: 'Paper Rex',    right: 'FNATIC',      score: '2 - 0' },
      { date: '2025-08-18T19:00:00+07:00', left: 'DRX',          right: 'XSET',        score: '0 - 2' },
      { date: '2025-08-20T19:00:00+07:00', left: 'Sentinels',    right: 'FPX',         score: '2 - 1' },
      { date: '2025-08-22T19:00:00+07:00', left: 'Paper Rex',    right: 'XSET',        score: '1 - 2' },
      { date: '2025-08-24T19:00:00+07:00', left: 'Sentinels',    right: 'XSET',        score: '0 - 0' },
    ],
  },
}

export function getMatchesByTournamentId(id: string): TournamentMatches {
  return tournamentMatches[id] ?? { teams: {}, schedule: [] }
}

// Compute match status from date relative to now
// IMPORTANT: If a score exists and at least one side is non-zero, force 'completed'.
// A score of '0 - 0' is treated as not started (upcoming according to time).
export function computeStatuses(schedule: MatchSchedule[], now: number = Date.now()): Array<MatchSchedule & { status: MatchStatus }> {
  const liveWindowMs = 2 * 60 * 60 * 1000 // 2 hours window as example
  return schedule.map((m) => {
    const mm = /(?<a>\d+)\s*-\s*(?<b>\d+)/.exec(m.score ?? '')
    const sA = mm?.groups?.a ? parseInt(mm.groups.a, 10) : 0
    const sB = mm?.groups?.b ? parseInt(mm.groups.b, 10) : 0
    const hasNonZeroScore = Number.isFinite(sA) && Number.isFinite(sB) && (sA > 0 || sB > 0)
    const t = new Date(m.date).getTime()
    if (hasNonZeroScore) return { ...m, status: 'completed' }
    if (isNaN(t)) return { ...m, status: 'completed' }
    const status: MatchStatus = now < t ? 'upcoming' : (now - t <= liveWindowMs ? 'live' : 'completed')
    return { ...m, status }
  })
}
