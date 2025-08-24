// Centralized news data for tournaments

export interface NewsItem {
  id: number
  title: string
  description: string
  date: string
  category: string
  gradient: string
  tournamentId?: string
  author?: string
  content?: string
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "T1 Advances to World Championship Finals",
    description: "T1 secured their spot in the finals with a dominant 3-1 victory over JDG in the semifinals, showcasing exceptional teamwork and strategic gameplay.",
    date: "August 18, 2025",
    category: "Match Results",
    gradient: "from-blue-500 to-purple-600",
    tournamentId: "league-of-legends-world-championship-2024",
    author: "Esports Analyst Team"
  },
  {
    id: 2,
    title: "New Anti-Cheat System Deployed Across All Tournaments",
    description: "Advanced AI-powered anti-cheat technology has been implemented to ensure fair play in all competitive matches, featuring real-time detection and automated response systems.",
    date: "August 17, 2025",
    category: "Anti-Cheat",
    gradient: "from-purple-500 to-indigo-600",
    author: "Tournament Officials"
  },
  {
    id: 3,
    title: "Prize Pool Increases by 40% for Major Championships",
    description: "Tournament organizers announce significant prize pool increases to attract top-tier talent and enhance competition, with the World Championship now featuring a $3.1M prize pool.",
    date: "August 16, 2025",
    category: "Prize Pool",
    gradient: "from-green-500 to-emerald-600",
    author: "Tournament Committee"
  },
  {
    id: 4,
    title: "Player Transfer Window Opens September 2025",
    description: "Teams can now begin negotiations for the upcoming transfer season with new regulations in place to ensure fair player movement and contract transparency.",
    date: "August 15, 2025",
    category: "Transfer Window",
    gradient: "from-red-500 to-pink-600",
    author: "League Officials"
  },
  {
    id: 5,
    title: "Coaching Staff Changes Shake Up Professional Scene",
    description: "Several top-tier teams announce major coaching staff restructuring ahead of the new competitive season, with veteran coaches moving to new organizations.",
    date: "August 14, 2025",
    category: "Coaching Changes",
    gradient: "from-orange-500 to-yellow-600",
    author: "Industry Reporter"
  },
  {
    id: 6,
    title: "New Tournament Format Revealed for 2026 Season",
    description: "Revolutionary double-elimination bracket system will be implemented across all major tournaments next year, providing more opportunities for teams to showcase their skills.",
    date: "August 13, 2025",
    category: "New Format",
    gradient: "from-teal-500 to-cyan-600",
    author: "Format Committee"
  },
  {
    id: 7,
    title: "Regional Qualifier Results Announced",
    description: "Teams from across all regions have secured their spots for the upcoming international tournament, with surprising upsets and dominant performances throughout the qualifiers.",
    date: "August 12, 2025",
    category: "Qualifiers",
    gradient: "from-violet-500 to-purple-600",
    author: "Regional Coordinators"
  },
  {
    id: 8,
    title: "New Streaming Partnership Enhances Viewer Experience",
    description: "Major streaming platform partnership will bring enhanced viewing experience to tournament broadcasts, featuring 4K streams, multi-angle cameras, and interactive features.",
    date: "August 11, 2025",
    category: "Streaming",
    gradient: "from-indigo-500 to-blue-600",
    author: "Broadcast Team"
  },
  {
    id: 9,
    title: "Counter-Strike 2 Major Championship Begins",
    description: "The most anticipated CS2 tournament of the year kicks off with 24 teams competing for the $1.25M prize pool and the prestigious Major title.",
    date: "August 10, 2025",
    category: "Tournament Start",
    gradient: "from-amber-500 to-orange-600",
    tournamentId: "counter-strike-2-major-championship-2024",
    author: "CS2 Coverage Team"
  },
  {
    id: 10,
    title: "Valorant Champions 2024 Bracket Revealed",
    description: "The tournament bracket has been unveiled, featuring exciting first-round matchups and potential storylines as 16 teams battle for the championship.",
    date: "August 9, 2025",
    category: "Bracket Release",
    gradient: "from-pink-500 to-rose-600",
    tournamentId: "valorant-champions-2024",
    author: "Valorant Esports"
  }
]

// Memoization cache
const newsCache = new Map<string, NewsItem[]>()
const newsByIdCache = new Map<number, NewsItem | undefined>()
const searchCache = new Map<string, NewsItem[]>()

export function getNewsByTournamentId(tournamentId: string): NewsItem[] {
  const cacheKey = `tournament-${tournamentId}`
  if (newsCache.has(cacheKey)) {
    return newsCache.get(cacheKey)!
  }
  
  const result = newsItems.filter(item => item.tournamentId === tournamentId || !item.tournamentId)
  newsCache.set(cacheKey, result)
  return result
}

export function getNewsById(id: number): NewsItem | undefined {
  if (newsByIdCache.has(id)) {
    return newsByIdCache.get(id)
  }
  
  const result = newsItems.find(item => item.id === id)
  newsByIdCache.set(id, result)
  return result
}

export function searchNews(query: string): NewsItem[] {
  const searchTerm = query.toLowerCase()
  if (searchCache.has(searchTerm)) {
    return searchCache.get(searchTerm)!
  }
  
  const result = newsItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm)
  )
  searchCache.set(searchTerm, result)
  return result
}

// Utility function to clear cache if needed
export function clearNewsCache() {
  newsCache.clear()
  newsByIdCache.clear()
  searchCache.clear()
}
