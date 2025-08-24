"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { useParams } from "next/navigation"
import GlobalLayout from "@/components/global-layout"
import GlobalFooter from "@/components/global-footer"
import { getTournamentById } from '@/data/tournaments'
import { useTournamentBackNavigation } from '@/hooks/use-tournament-back-navigation'
import { MatchCard } from './components'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getMatchesByTournamentId, computeStatuses, MatchSchedule, MatchStatus } from '@/data/matches'


export default function TournamentMatchesPage() {
  const params = useParams()
  const tournamentId = (params?.id as string) || ''

  // Handle browser back button to redirect to tournaments page
  useTournamentBackNavigation(tournamentId)

  const tournament = getTournamentById(tournamentId)
  const [activeTab, setActiveTab] = useState<'groups' | 'playoffs'>('playoffs')

  // Teams and base schedule loaded from centralized data
  const { teams, schedule: baseSchedule } = useMemo(() => getMatchesByTournamentId(tournamentId), [tournamentId])

  // Base schedule is provided by centralized data

  // Compute match status from date relative to now
  // IMPORTANT: If a score exists and at least one side is non-zero, force 'completed'.
  // A score of '0 - 0' is treated as not started (upcoming according to time).
  const scheduleWithStatus: Array<MatchSchedule & { status: MatchStatus }> = useMemo(() => {
    return computeStatuses(baseSchedule)
  }, [baseSchedule])

  // Helper to map status for bracket pairs (bracket uses short names, schedule uses "Team <Name>")
  const norm = (s: string) => s.toLowerCase().replace(/^team\s+/, '').replace(/\s+/g, '').trim()
  const statusByPair = useMemo(() => {
    const map = new Map<string, MatchStatus>()
    for (const m of scheduleWithStatus) {
      const k1 = `${norm(m.left)}|${norm(m.right)}`
      const k2 = `${norm(m.right)}|${norm(m.left)}`
      map.set(k1, (m.status ?? 'completed'))
      map.set(k2, (m.status ?? 'completed'))
    }
    return map
  }, [scheduleWithStatus])
  const getStatusFor = (shortA: string, shortB: string): MatchStatus | undefined => {
    return statusByPair.get(`${norm(shortA)}|${norm(shortB)}`)
  }

  // Derive Final participants and state from Semifinals
  const toShort = (full: string) => full.replace(/^Team\s+/i, '').trim()
  const getMatch = (a: string, b: string) =>
    scheduleWithStatus.find(
      (m) =>
        (norm(toShort(m.left)) === norm(a) && norm(toShort(m.right)) === norm(b)) ||
        (norm(toShort(m.left)) === norm(b) && norm(toShort(m.right)) === norm(a))
    )
  const parseScore = (score?: string) => {
    const mm = /(\d+)\s*-\s*(\d+)/.exec(score ?? '')
    const a = mm && mm[1] ? parseInt(mm[1], 10) : NaN
    const b = mm && mm[2] ? parseInt(mm[2], 10) : NaN
    return { a, b }
  }

  const semifinal1 = getMatch('Alpha', 'Echo')
  const semifinal2 = getMatch('Beta', 'Foxtrot')
  const s1 = semifinal1 ? parseScore(semifinal1.score) : { a: NaN, b: NaN }
  const s2 = semifinal2 ? parseScore(semifinal2.score) : { a: NaN, b: NaN }
  const s1Left = semifinal1 ? toShort(semifinal1.left) : undefined
  const s1Right = semifinal1 ? toShort(semifinal1.right) : undefined
  const s2Left = semifinal2 ? toShort(semifinal2.left) : undefined
  const s2Right = semifinal2 ? toShort(semifinal2.right) : undefined
  const s1Completed = semifinal1?.status === 'completed' && Number.isFinite(s1.a) && Number.isFinite(s1.b)
  const s2Completed = semifinal2?.status === 'completed' && Number.isFinite(s2.a) && Number.isFinite(s2.b)
  const s1Winner = s1Completed ? (s1.a > s1.b ? s1Left : s1.b > s1.a ? s1Right : undefined) : undefined
  const s2Winner = s2Completed ? (s2.a > s2.b ? s2Left : s2.b > s2.a ? s2Right : undefined) : undefined

  const finalLeftShort = s1Winner ?? 'TBD'
  const finalRightShort = s2Winner ?? 'TBD'
  const finalStatus: MatchStatus = s1Winner && s2Winner ? (getStatusFor(finalLeftShort, finalRightShort) ?? 'upcoming') : 'upcoming'
  const finalMatch = s1Winner && s2Winner ? getMatch(finalLeftShort, finalRightShort) : undefined
  const finalScore = finalMatch && finalMatch.status === 'completed' ? parseScore(finalMatch.score) : { a: 0, b: 0 }
  const finalChampion = finalMatch?.status === 'completed'
  const finalLeftTeam = teams[`Team ${finalLeftShort}`] ?? { color: 'bg-zinc-700', abbr: '??' }
  const finalRightTeam = teams[`Team ${finalRightShort}`] ?? { color: 'bg-zinc-700', abbr: '??' }

  // Dynamic connector calculations for bracket
  const containerRef = useRef<HTMLDivElement | null>(null)
  type ConnSpec = { from: string; to: string; color: string; width: number; opacity?: number }
  // If any playoff match has 0-0, show uniform connectors (same color/width/opacity)
  const anyZeroZero = useMemo(() => {
    for (const m of scheduleWithStatus) {
      const mm = /\b(\d+)\s*-\s*(\d+)\b/.exec(m.score ?? '')
      const a = parseInt(mm?.[1] ?? '0', 10)
      const b = parseInt(mm?.[2] ?? '0', 10)
      if (a === 0 && b === 0) return true
    }
    return false
  }, [scheduleWithStatus])

  const connectorSpecs = useMemo<ConnSpec[]>(() => {
    if (anyZeroZero) {
      // Uniform styling when unplayed matches exist
      return [
        { from: 'qf1', to: 'sf1', color: '#4318D1', width: 2, opacity: 1 },
        { from: 'qf2', to: 'sf1', color: '#4318D1', width: 2, opacity: 1 },
        { from: 'qf3', to: 'sf2', color: '#4318D1', width: 2, opacity: 1 },
        { from: 'qf4', to: 'sf2', color: '#4318D1', width: 2, opacity: 1 },
        { from: 'sf1', to: 'final', color: '#4318D1', width: 2, opacity: 1 },
        { from: 'sf2', to: 'final', color: '#4318D1', width: 2, opacity: 1 },
      ]
    }
    // Default: emphasize champion path
    return [
      { from: 'qf1', to: 'sf1', color: '#4318D1', width: 2, opacity: 0.5 },
      { from: 'qf2', to: 'sf1', color: '#4318D1', width: 3, opacity: 1 },
      { from: 'qf3', to: 'sf2', color: '#4318D1', width: 2, opacity: 0.5 },
      { from: 'qf4', to: 'sf2', color: '#4318D1', width: 2, opacity: 0.5 },
      { from: 'sf1', to: 'final', color: '#4318D1', width: 3, opacity: 1 },
      { from: 'sf2', to: 'final', color: '#4318D1', width: 3, opacity: 0.5 },
    ]
  }, [anyZeroZero])
  const [paths, setPaths] = useState<{ d: string; color: string; width: number; opacity: number }[]>([])

  useEffect(() => {
    const compute = () => {
      const container = containerRef.current
      if (!container) return
      const cRect = container.getBoundingClientRect()

      const getPoint = (el: HTMLElement, side: 'left' | 'right') => {
        const r = el.getBoundingClientRect()
        const x = side === 'right' ? r.right - cRect.left : r.left - cRect.left
        const y = r.top - cRect.top + r.height / 2
        return { x, y }
      }

      const computed: { d: string; color: string; width: number; opacity: number }[] = []
      for (const s of connectorSpecs) {
        const fromEl = container.querySelector(`#${s.from}`) as HTMLElement | null
        const toEl = container.querySelector(`#${s.to}`) as HTMLElement | null
        if (!fromEl || !toEl) continue
        const start = getPoint(fromEl, 'right')
        const end = getPoint(toEl, 'left')
        const elbowX = start.x + Math.min(80, Math.max(40, (end.x - start.x) / 2))
        const d = `M ${start.x} ${start.y} L ${elbowX} ${start.y} L ${elbowX} ${end.y} L ${end.x} ${end.y}`
        computed.push({ d, color: s.color, width: s.width, opacity: s.opacity ?? 1 })
      }
      setPaths(computed)
    }

    compute()
    const onResize = () => compute()
    window.addEventListener('resize', onResize)
    const ro = new ResizeObserver(() => compute())
    if (containerRef.current) ro.observe(containerRef.current)
    const t = setTimeout(compute, 0)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [connectorSpecs])

  // Calendar: dynamic bounded month navigation (constrained to tournament start/end)
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const monthNames = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ]

  const parseDate = (str?: string) => {
    if (!str) return undefined
    const d = new Date(str)
    return isNaN(d.getTime()) ? undefined : d
  }

  // Deterministic formatter: formats the local clock time encoded in the ISO string
  // Example: 2025-08-20T18:00:00+07:00 -> "Aug 20, 06:00 PM"
  const formatLocalFromISO = (iso?: string) => {
    if (!iso) return ''
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso)
    if (!m) return ''
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const mmRaw = m[2] ?? '01'
    const ddRaw = m[3] ?? '01'
    const hhRaw = m[4] ?? '00'
    const minRaw = m[5] ?? '00'
    const monthIdx = parseInt(mmRaw, 10) - 1
    const dayNum = parseInt(ddRaw, 10)
    const hh = parseInt(hhRaw, 10)
    const mm = parseInt(minRaw, 10)
    const hr12 = hh % 12 === 0 ? 12 : hh % 12
    const ampm = hh < 12 ? 'AM' : 'PM'
    const hrStr = String(hr12).padStart(2, '0')
    const minStr2 = String(mm).padStart(2, '0')
    return `${months[Math.max(0, Math.min(11, monthIdx))]} ${dayNum}, ${hrStr}:${minStr2} ${ampm}`
  }

  const isRegistration = tournament?.status === 'REGISTRATION'
  const start = !isRegistration ? parseDate(tournament?.startDate) : undefined
  const end = !isRegistration ? parseDate(tournament?.endDate) : undefined

  const initial = start ?? new Date()
  const [currentYear, setCurrentYear] = useState(initial.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(initial.getMonth()) // 0-based

  const ymIndex = (y: number, m: number) => y * 12 + m
  const minIndex = start ? ymIndex(start.getFullYear(), start.getMonth()) : ymIndex(currentYear, currentMonth)
  const maxIndex = end ? ymIndex(end.getFullYear(), end.getMonth()) : ymIndex(currentYear, currentMonth)
  const currIndex = ymIndex(currentYear, currentMonth)

  const canPrev = currIndex > minIndex
  const canNext = currIndex < maxIndex

  const handlePrevMonth = () => {
    if (!canPrev) return
    const idx = currIndex - 1
    const y = Math.floor(idx / 12)
    const m = idx % 12
    setCurrentYear(y)
    setCurrentMonth(m)
  }

  const handleNextMonth = () => {
    if (!canNext) return
    const idx = currIndex + 1
    const y = Math.floor(idx / 12)
    const m = idx % 12
    setCurrentYear(y)
    setCurrentMonth(m)
  }

  const handleGoToToday = () => {
    if (!todayWithinBounds || isCurrentViewMonth) return
    const idx = Math.max(minIndex, Math.min(maxIndex, todayIndex))
    const y = Math.floor(idx / 12)
    const m = idx % 12
    setCurrentYear(y)
    setCurrentMonth(m)
  }

  const grid: Array<{ day: number; isCurrentMonth: boolean }> = useMemo(() => {
    const totalCells = 42 // 6 rows x 7 columns
    const firstWeekdayIndex = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate()

    const cells: Array<{ day: number; isCurrentMonth: boolean }> = []
    // Leading from previous month
    for (let i = firstWeekdayIndex - 1; i >= 0; i--) {
      cells.push({ day: prevMonthDays - i, isCurrentMonth: false })
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, isCurrentMonth: true })
    }
    // Trailing next month days
    while (cells.length < totalCells) {
      const nextDay = cells.length - (firstWeekdayIndex + daysInMonth) + 1
      cells.push({ day: nextDay, isCurrentMonth: false })
    }
    return cells
  }, [currentYear, currentMonth])

  type Badge = { leftColor: string; rightColor: string; leftLabel: string; rightLabel: string; centerText: string; status: MatchStatus }
  // Build badges only for the currently displayed month/year
  const badgesByDay: Record<number, Badge[]> = useMemo(() => {
    const map: Record<number, Badge[]> = {}
    for (const m of scheduleWithStatus) {
      const d = new Date(m.date)
      if (isNaN(d.getTime())) continue
      if (d.getFullYear() !== currentYear || d.getMonth() !== currentMonth) continue
      const left = teams[m.left]
      const right = teams[m.right]
      if (!left || !right) continue
      const day = d.getDate()
      const s: MatchStatus = m.status ?? 'completed'
      const centerText = s === 'completed'
        ? (m.score ?? 'TBD')
        : (s === 'live' ? 'LIVE' : formatLocalFromISO(m.date))
      const badge: Badge = {
        leftColor: left.color,
        rightColor: right.color,
        leftLabel: left.abbr,
        rightLabel: right.abbr,
        centerText,
        status: s,
      }
      if (!map[day]) map[day] = []
      map[day].push(badge)
    }
    return map
  }, [scheduleWithStatus, currentYear, currentMonth, teams])

  // Derive recent and upcoming lists from schedule
  const recentResults = useMemo(() => {
    // Include completed and live (live should show here, not in upcoming)
    return scheduleWithStatus
      .filter(m => m.status !== 'upcoming')
      .sort((a, b) => {
        // Live first, then most recent by date
        const aLive = a.status === 'live'
        const bLive = b.status === 'live'
        if (aLive && !bLive) return -1
        if (!aLive && bLive) return 1
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  }, [scheduleWithStatus])

  const upcomingMatches = useMemo(() => {
    // Upcoming only (exclude live)
    return scheduleWithStatus
      .filter(m => m.status === 'upcoming')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [scheduleWithStatus])

  // Group standings mock
  const groupStandings = [
    { pos: 1, team: 'Team Alpha',   p: 6, w: 5, d: 1, l: 0, gd: 15, pts: 16 },
    { pos: 2, team: 'Team Foxtrot', p: 6, w: 4, d: 2, l: 0, gd: 9,  pts: 14 },
    { pos: 3, team: 'Team Echo',    p: 6, w: 4, d: 1, l: 1, gd: 8,  pts: 13 },
    { pos: 4, team: 'Team Beta',    p: 6, w: 3, d: 2, l: 1, gd: 5,  pts: 11 },
    { pos: 5, team: 'Team Hotel',   p: 6, w: 3, d: 1, l: 2, gd: 2,  pts: 10 },
    { pos: 6, team: 'Team Gamma',   p: 6, w: 2, d: 3, l: 1, gd: 1,  pts: 9  },
    { pos: 7, team: 'Team Golf',    p: 6, w: 2, d: 2, l: 2, gd: -2, pts: 8  },
    { pos: 8, team: 'Team Delta',   p: 6, w: 2, d: 1, l: 3, gd: -4, pts: 7  },
  ]

  // Runtime current date for highlight
  const now = new Date()
  const todayDate = now.getDate()
  const todayMonth = now.getMonth()
  const todayYear = now.getFullYear()
  const isCurrentViewMonth = (currentYear === todayYear && currentMonth === todayMonth)
  const todayIndex = ymIndex(todayYear, todayMonth)
  const todayWithinBounds = todayIndex >= minIndex && todayIndex <= maxIndex

  return (
    <GlobalLayout 
      tournamentSelected={true}
      tournamentId={tournamentId}
      gameName={tournament?.game}
    >
      <div className="flex flex-col min-h-full bg-gradient-to-br from-[#16213E] via-[#1A1A2E] to-[#0F0F23] custom-scrollbar overflow-x-hidden w-full">
        <div className="flex-1 px-4 lg:px-8 py-8 space-y-8">
          {/* Tournament Calendar */}
          <div className="w-full max-w-7xl mx-auto bg-[#0F0F23] border border-[#3D5AF1] rounded-[14px] p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-xl">Tournament Calendar</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 disabled:opacity-40"
                  onClick={handlePrevMonth}
                  disabled={!canPrev}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10 disabled:opacity-40 px-3 py-1 text-xs"
                  onClick={handleGoToToday}
                  disabled={!todayWithinBounds || isCurrentViewMonth}
                >
                  Today
                </Button>
                <span className="text-white/80 text-sm">{monthNames[currentMonth]} {currentYear}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 disabled:opacity-40"
                  onClick={handleNextMonth}
                  disabled={!canNext}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {/* Weekday header */}
            <div className="grid grid-cols-7 gap-3 mb-3">
              {weekdays.map((w) => (
                <div key={w} className="text-[#A5B4FC] text-xs font-medium px-2 py-1 text-center">{w}</div>
              ))}
            </div>
            {/* Month grid 6x7 */}
            <div className="grid grid-cols-7 gap-3">
              {grid.map((cell, idx) => {
                const d = cell.day
                const isCurrentMonth = cell.isCurrentMonth
                const isPast = isCurrentMonth && typeof d === 'number' && isCurrentViewMonth && d < todayDate
                const isToday = isCurrentMonth && typeof d === 'number' && isCurrentViewMonth && d === todayDate
                const badges = isCurrentMonth && typeof d === 'number' ? (badgesByDay[d] ?? []) : []

                return (
                  <div
                    key={idx}
                    className={`relative min-h-[120px] rounded-lg border transition-colors 
                      ${
                        isToday
                          ? 'bg-[#312E4A] border-transparent'
                          : isCurrentMonth 
                          ? `bg-[#27272A] border-transparent ${isPast ? 'opacity-60' : 'opacity-100'}`
                          : 'bg-zinc-900/30 border-zinc-800/40'
                      }
                    `}
                  >
                    <div className="p-3 text-white/80 text-xs">{d}</div>
                    {badges.length > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-1">
                          {badges.map((b, i) => (
                          <div key={i} className={`flex items-center gap-3 rounded-md px-3 py-1.5 bg-[rgba(39,39,42,0.6)] border ${b.status === 'live' ? 'border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.45)]' : 'border-[rgba(63,63,70,0.3)]'} shadow-sm`}>
                            <span className={`w-6 h-6 rounded-full ${b.leftColor} text-white text-[10px] font-semibold flex items-center justify-center`}>{b.leftLabel}</span>
                            <span className="text-zinc-300 text-[12px] font-medium tracking-wide">{b.centerText}</span>
                            <span className={`w-6 h-6 rounded-full ${b.rightColor} text-white text-[10px] font-semibold flex items-center justify-center`}>{b.rightLabel}</span>
                          </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tournament Phase */}
          <div className="w-full max-w-7xl mx-auto bg-[#0A0B28] border border-[#3D5AF1] rounded-[14px] p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-white font-bold text-2xl">Tournament Phase</div>
                <div className="text-white/60 text-sm mt-1">{activeTab === 'playoffs' ? 'Playoff Bracket' : 'Group Stage Rankings'}</div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTab('groups')}
                  className={`${activeTab === 'groups' 
                    ? 'px-4 py-2 bg-[#4A66FF] rounded-lg text-white font-medium text-sm shadow-[0_0_20px_rgba(74,102,255,0.5)]'
                    : 'px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-gray-400 font-medium text-sm hover:bg-white/10'}
                  `}
                >
                  Groups
                </button>
                <button
                  onClick={() => setActiveTab('playoffs')}
                  className={`${activeTab === 'playoffs' 
                    ? 'px-4 py-2 bg-[#4A66FF] rounded-lg text-white font-medium text-sm shadow-[0_0_20px_rgba(74,102,255,0.5)]'
                    : 'px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-gray-400 font-medium text-sm hover:bg-white/10'}
                  `}
                >
                  Playoffs
                </button>
              </div>
            </div>

            {/* Tabs Content */}
            {activeTab === 'playoffs' ? (
            <div className="relative" id="bracket-container" ref={containerRef}>
              {/* Stage Titles */}
              <div className="flex justify-between mb-6">
                <div className="w-[200px] text-center text-[#6C8CFF] font-medium text-sm uppercase tracking-wide">Quarterfinals</div>
                <div className="w-[200px] text-center text-[#6C8CFF] font-medium text-sm uppercase tracking-wide">Semifinals</div>
                <div className="w-[200px] text-center text-[#6C8CFF] font-medium text-sm uppercase tracking-wide">Final</div>
              </div>

              {/* Bracket Container */}
              <div className="relative flex items-center justify-between">
                {/* Quarterfinals Column */}
                <div className="flex flex-col gap-4">
                  <MatchCard 
                    id="qf1"
                    teamA={{ name: 'Alpha', abbr: 'TA', color: 'bg-indigo-500' }} 
                    teamB={{ name: 'Hotel', abbr: 'TH', color: 'bg-emerald-500' }} 
                    scoreA={2} 
                    scoreB={1} 
                    winner="Alpha"
                    status={getStatusFor('Alpha','Hotel') ?? 'completed'}
                  />
                  <MatchCard 
                    id="qf2"
                    teamA={{ name: 'Delta', abbr: 'TD', color: 'bg-amber-500' }} 
                    teamB={{ name: 'Echo', abbr: 'TE', color: 'bg-purple-500' }} 
                    scoreA={1} 
                    scoreB={2} 
                    winner="Echo"
                    status={getStatusFor('Delta','Echo') ?? 'completed'}
                  />
                  <MatchCard 
                    id="qf3"
                    teamA={{ name: 'Beta', abbr: 'TB', color: 'bg-red-500' }} 
                    teamB={{ name: 'Golf', abbr: 'TG', color: 'bg-blue-500' }} 
                    scoreA={2} 
                    scoreB={1} 
                    winner="Beta"
                    status={getStatusFor('Beta','Golf') ?? 'completed'}
                  />
                  <MatchCard 
                    id="qf4"
                    teamA={{ name: 'Gamma', abbr: 'GA', color: 'bg-green-500' }} 
                    teamB={{ name: 'Foxtrot', abbr: 'TF', color: 'bg-pink-500' }} 
                    scoreA={1} 
                    scoreB={2} 
                    winner="Foxtrot"
                    status={getStatusFor('Gamma','Foxtrot') ?? 'completed'}
                  />
                </div>

                {/* Semifinals Column */}
                <div className="flex flex-col gap-16 items-center">
                  <MatchCard 
                    id="sf1"
                    teamA={{ name: 'Alpha', abbr: 'TA', color: 'bg-indigo-500' }} 
                    teamB={{ name: 'Echo', abbr: 'TE', color: 'bg-purple-500' }} 
                    scoreA={1} 
                    scoreB={3} 
                    winner="Echo"
                    status={getStatusFor('Alpha','Echo') ?? 'completed'}
                  />
                  <MatchCard 
                    id="sf2"
                    teamA={{ name: 'Beta', abbr: 'TB', color: 'bg-red-500' }} 
                    teamB={{ name: 'Foxtrot', abbr: 'TF', color: 'bg-pink-500' }} 
                    scoreA={1} 
                    scoreB={3} 
                    winner="Foxtrot"
                    status={getStatusFor('Beta','Foxtrot') ?? 'completed'}
                  />
                </div>

                {/* Final Column */}
                <div className="flex justify-center">
                  <MatchCard 
                    champion={finalChampion}
                    id="final"
                    teamA={{ name: finalLeftShort, abbr: finalLeftTeam.abbr, color: finalLeftTeam.color }} 
                    teamB={{ name: finalRightShort, abbr: finalRightTeam.abbr, color: finalRightTeam.color }} 
                    scoreA={Number.isFinite(finalScore.a) ? finalScore.a : 0} 
                    scoreB={Number.isFinite(finalScore.b) ? finalScore.b : 0} 
                    status={finalStatus}
                    {...(finalChampion ? { winner: finalScore.a > finalScore.b ? finalLeftShort : finalRightShort } : {})}
                  />
                </div>
              </div>

              {/* SVG Connector Lines (computed) */}
              <svg className="absolute inset-0 pointer-events-none w-full h-full" style={{ zIndex: 1 }}>
                <defs>
                  <filter id="bracketGlow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {paths.map((p, i) => (
                  <path key={i} d={p.d} stroke={p.color} strokeWidth={p.width} strokeOpacity={p.opacity} fill="none" filter="url(#bracketGlow)" />
                ))}
              </svg>
            </div>
            ) : (
            <div className="space-y-4">
              <div className="text-white/80 font-medium mb-2">Group Stage Rankings</div>
              <div className="bg-[#0F0F23] border border-[#3D5AF1]/60 rounded-[14px] overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-6 w-full gap-x-4 items-center px-4 py-3 text-xs text-white/50" style={{ gridTemplateColumns: '70px minmax(0, 2fr) 1fr 1fr 1fr 1fr' }}>
                  <div>Pos</div>
                  <div>Team</div>
                  <div className="text-center">P</div>
                  <div className="text-center">W</div>
                  <div className="text-center">L</div>
                  <div className="text-center">GD</div>
                </div>
                {/* Rows */}
                <div>
                  {groupStandings.map((row) => {
                    const team = teams[row.team]
                    const status = row.pos <= 3 ? 'qualified' : row.pos === 8 ? 'eliminated' : 'contention'
                    const statusColor = status === 'qualified' ? 'bg-emerald-500' : status === 'eliminated' ? 'bg-rose-500' : 'bg-amber-500'
                    const gdColor = row.gd > 0 ? 'text-emerald-400' : row.gd < 0 ? 'text-rose-400' : 'text-white/70'
                    const textMuted = status === 'eliminated' ? 'text-white/40' : 'text-white'
                    return (
                      <div key={row.pos} className="relative grid grid-cols-6 w-full gap-x-4 items-center px-4 py-3 border-t border-white/5" style={{ gridTemplateColumns: '70px minmax(0, 2fr) 1fr 1fr 1fr 1fr' }}>
                        <span className={`absolute left-0 top-0 h-full w-px ${statusColor}`}></span>
                        <div className="text-white/80 text-sm">{row.pos}</div>
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full ${team?.color ?? 'bg-zinc-700'} text-white text-[10px] font-bold flex items-center justify-center`}>
                            {team?.abbr ?? '??'}
                          </span>
                          <span className={`text-sm ${textMuted}`}>{row.team}</span>
                        </div>
                        <div className="text-center text-white/80">{row.p}</div>
                        <div className="text-center text-emerald-400">{row.w}</div>
                        <div className="text-center text-rose-400">{row.l}</div>
                        <div className={`text-center ${gdColor}`}>{row.gd > 0 ? `+${row.gd}` : row.gd}</div>
                      </div>
                    )
                  })}
                </div>
                {/* Legend */}
                <div className="flex items-center gap-6 px-4 py-3 text-xs text-white/60">
                  <div className="flex items-center gap-2"><span className="w-[6px] h-[6px] rounded-full bg-emerald-500"></span> Qualified</div>
                  <div className="flex items-center gap-2"><span className="w-[6px] h-[6px] rounded-full bg-amber-500"></span> Still in Contention</div>
                  <div className="flex items-center gap-2"><span className="w-[6px] h-[6px] rounded-full bg-rose-500"></span> Eliminated</div>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Recent Results & Upcoming Matches */}
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Results */}
            <div className="bg-[#0F0F23] border border-[#3D5AF1] rounded-[14px] p-6">
              <div className="text-white font-semibold text-xl mb-6">Recent Results</div>
              <div className="space-y-3 h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                {recentResults.map((match, index) => {
                  const leftTeam = teams[match.left]
                  const rightTeam = teams[match.right]
                  if (!leftTeam || !rightTeam) return null
                  const m = /(\d+)\s*-\s*(\d+)/.exec(match.score ?? '')
                  const a = m && m[1] ? parseInt(m[1], 10) : NaN
                  const b = m && m[2] ? parseInt(m[2], 10) : NaN
                  const winner = Number.isFinite(a) && Number.isFinite(b)
                    ? (a > b ? match.left : (b > a ? match.right : undefined))
                    : undefined

                  return (
                    <div key={index} className={`w-full bg-[rgba(39,39,42,0.6)] border rounded-[8px] px-4 py-3 flex items-center justify-between ${match.status === 'live' ? 'border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.45)]' : 'border-[rgba(63,63,70,0.3)]'}`}>
                      {/* Left Team */}
                      <div className="flex-1 flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full ${leftTeam.color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{leftTeam.abbr}</span>
                        <div className={`font-medium text-[14px] truncate ${winner === match.left ? 'text-white' : 'text-white/50'}`}>{match.left}</div>
                      </div>
                      {/* Score */}
                      <div className="font-bold text-[16px] text-white px-4">{match.score ?? 'TBD'}</div>
                      {/* Right Team */}
                      <div className="flex-1 flex items-center justify-end gap-3">
                        <div className={`font-medium text-[14px] truncate text-right ${winner === match.right ? 'text-white' : 'text-white/50'}`}>{match.right}</div>
                        <span className={`w-8 h-8 rounded-full ${rightTeam.color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{rightTeam.abbr}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Upcoming Matches */}
            <div className="bg-[#0F0F23] border border-[#3D5AF1] rounded-[14px] p-6">
              <div className="text-white font-semibold text-xl mb-6">Upcoming Matches</div>
              <div className="space-y-3 h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                {upcomingMatches.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-white/40 text-sm">No upcoming matches.</p>
                  </div>
                ) : (
                  upcomingMatches.map((match, index) => {
                    const leftTeam = teams[match.left]
                    const rightTeam = teams[match.right]
                    if (!leftTeam || !rightTeam) return null
                    const when = formatLocalFromISO(match.date)
                    const status = match.status ?? 'upcoming'

                    return (
                      <div
                        key={index}
                        className={`w-full bg-[rgba(39,39,42,0.6)] border rounded-[8px] px-4 py-3 flex items-center justify-between ${status === 'live' ? 'border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.45)]' : 'border-[rgba(63,63,70,0.3)]'}`}
                      >
                        <div className="flex-1 flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full ${leftTeam.color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{leftTeam.abbr}</span>
                          <div className="font-medium text-[14px] truncate text-white/90">{match.left}</div>
                        </div>
                        <div className="flex items-center gap-2 px-4">
                          <Clock className="w-4 h-4 text-white/60" />
                          <span className="text-white/70 text-xs">{when || 'TBD'}</span>
                          {status === 'live' && <span className="ml-2 px-2 py-0.5 rounded bg-rose-600/30 text-rose-300 text-[10px] font-semibold uppercase tracking-wide">Live</span>}
                          {status === 'upcoming' && <span className="ml-2 px-2 py-0.5 rounded bg-rose-600/20 text-rose-200 text-[10px] font-semibold uppercase tracking-wide">Upcoming</span>}
                        </div>
                        <div className="flex-1 flex items-center justify-end gap-3">
                          <div className="font-medium text-[14px] truncate text-right text-white/90">{match.right}</div>
                          <span className={`w-8 h-8 rounded-full ${rightTeam.color} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}>{rightTeam.abbr}</span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        <GlobalFooter />
      </div>
    </GlobalLayout>
  )
}
