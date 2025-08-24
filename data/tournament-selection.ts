// Centralized tournament selection data for game pages

export interface TournamentSelection {
  id: string
  name: string
  status: "LIVE" | "UPCOMING" | "ACTIVE" | "REGISTRATION" | "COMPLETED"
  prizePool: string
  participants: string
  viewers: string
  image: string
  game: string
}

export const tournamentSelections: Record<string, TournamentSelection[]> = {
  "league-of-legends": [
    {
      id: "world-championship-2024",
      name: "World Championship 2024",
      status: "LIVE",
      prizePool: "$3,100,000",
      participants: "22",
      viewers: "4.2M",
      image: "/assets/games/lol.jpg",
      game: "league-of-legends"
    },
    {
      id: "msi-2024",
      name: "Mid-Season Invitational 2024",
      status: "UPCOMING",
      prizePool: "$850,000",
      participants: "12",
      viewers: "2.3M",
      image: "/assets/games/lol.jpg",
      game: "league-of-legends"
    },
    {
      id: "lcs-spring-2024",
      name: "LCS Spring 2024",
      status: "ACTIVE",
      prizePool: "$400,000",
      participants: "10",
      viewers: "1.2M",
      image: "/assets/games/lol.jpg",
      game: "league-of-legends"
    },
    {
      id: "all-star-2024",
      name: "All-Star 2024",
      status: "REGISTRATION",
      prizePool: "$600,000",
      participants: "20",
      viewers: "1.9M",
      image: "/assets/games/lol.jpg",
      game: "league-of-legends"
    },
    {
      id: "worlds-2023",
      name: "Worlds 2023",
      status: "COMPLETED",
      prizePool: "$2,225,000",
      participants: "22",
      viewers: "5.1M",
      image: "/assets/games/lol.jpg",
      game: "league-of-legends"
    }
  ],
  "counter-strike-2": [
    {
      id: "major-championship-2024",
      name: "CS2 Major Championship 2024",
      status: "LIVE",
      prizePool: "$1,400,000",
      participants: "24",
      viewers: "2.8M",
      image: "/assets/games/cs2.jpg",
      game: "counter-strike-2"
    },
    {
      id: "blast-premier-2024",
      name: "BLAST Premier Spring 2024",
      status: "UPCOMING",
      prizePool: "$525,000",
      participants: "8",
      viewers: "1.3M",
      image: "/assets/games/cs2.jpg",
      game: "counter-strike-2"
    },
    {
      id: "esl-pro-league-2024",
      name: "ESL Pro League S18",
      status: "ACTIVE",
      prizePool: "$935,000",
      participants: "24",
      viewers: "1.1M",
      image: "/assets/games/cs2.jpg",
      game: "counter-strike-2"
    },
    {
      id: "cs2-iem-katowice-2024",
      name: "IEM Katowice 2024",
      status: "REGISTRATION",
      prizePool: "$1,200,000",
      participants: "24",
      viewers: "2.1M",
      image: "/assets/games/cs2.jpg",
      game: "counter-strike-2"
    },
    {
      id: "cologne-2023",
      name: "IEM Cologne 2023",
      status: "COMPLETED",
      prizePool: "$1,000,000",
      participants: "24",
      viewers: "2.5M",
      image: "/assets/games/cs2.jpg",
      game: "counter-strike-2"
    }
  ],
  "valorant": [
    {
      id: "champions-2024",
      name: "VCT Champions 2024",
      status: "LIVE",
      prizePool: "$1,200,000",
      participants: "16",
      viewers: "2.1M",
      image: "/assets/games/val.jpg",
      game: "valorant"
    },
    {
      id: "masters-tokyo-2024",
      name: "Masters Tokyo 2024",
      status: "UPCOMING",
      prizePool: "$750,000",
      participants: "12",
      viewers: "1.6M",
      image: "/assets/games/val.jpg",
      game: "valorant"
    },
    {
      id: "vct-americas-2024",
      name: "VCT Americas 2024",
      status: "ACTIVE",
      prizePool: "$400,000",
      participants: "11",
      viewers: "950K",
      image: "/assets/games/val.jpg",
      game: "valorant"
    },
    {
      id: "vct-emea-2024",
      name: "VCT EMEA 2024",
      status: "REGISTRATION",
      prizePool: "$400,000",
      participants: "12",
      viewers: "850K",
      image: "/assets/games/val.jpg",
      game: "valorant"
    },
    {
      id: "vct-pacific-2024",
      name: "VCT Pacific 2024",
      status: "COMPLETED",
      prizePool: "$350,000",
      participants: "10",
      viewers: "750K",
      image: "/assets/games/val.jpg",
      game: "valorant"
    }
  ],
  "dota-2": [
    {
      id: "the-international-2024",
      name: "The International 2024",
      status: "LIVE",
      prizePool: "$18,500,000",
      participants: "20",
      viewers: "3.2M",
      image: "/assets/games/d2.jpg",
      game: "dota-2"
    },
    {
      id: "esl-one-birmingham-2024",
      name: "ESL One Birmingham 2024",
      status: "UPCOMING",
      prizePool: "$500,000",
      participants: "12",
      viewers: "1.1M",
      image: "/assets/games/d2.jpg",
      game: "dota-2"
    },
    {
      id: "dreamleague-season-22",
      name: "DreamLeague Season 22",
      status: "ACTIVE",
      prizePool: "$400,000",
      participants: "16",
      viewers: "750K",
      image: "/assets/games/d2.jpg",
      game: "dota-2"
    },
    {
      id: "bali-major-2024",
      name: "Bali Major 2024",
      status: "REGISTRATION",
      prizePool: "$650,000",
      participants: "18",
      viewers: "900K",
      image: "/assets/games/d2.jpg",
      game: "dota-2"
    },
    {
      id: "oga-dota-pit-2024",
      name: "OGA Dota PIT 2024",
      status: "COMPLETED",
      prizePool: "$300,000",
      participants: "8",
      viewers: "550K",
      image: "/assets/games/d2.jpg",
      game: "dota-2"
    }
  ],
  "overwatch-2": [
    {
      id: "overwatch-league-grand-finals-2024",
      name: "Overwatch League Grand Finals 2024",
      status: "LIVE",
      prizePool: "$1,800,000",
      participants: "12",
      viewers: "1.4M",
      image: "/assets/games/ow2.png",
      game: "overwatch-2"
    },
    {
      id: "owcs-championship-2024",
      name: "OWCS Championship 2024",
      status: "UPCOMING",
      prizePool: "$950,000",
      participants: "16",
      viewers: "1.1M",
      image: "/assets/games/ow2.png",
      game: "overwatch-2"
    },
    {
      id: "calling-all-heroes-2024",
      name: "Calling All Heroes 2024",
      status: "ACTIVE",
      prizePool: "$350,000",
      participants: "24",
      viewers: "650K",
      image: "/assets/games/ow2.png",
      game: "overwatch-2"
    },
    {
      id: "summer-showdown-2024",
      name: "Summer Showdown 2024",
      status: "REGISTRATION",
      prizePool: "$300,000",
      participants: "16",
      viewers: "500K",
      image: "/assets/games/ow2.png",
      game: "overwatch-2"
    },
    {
      id: "midseason-madness-2024",
      name: "Midseason Madness 2024",
      status: "COMPLETED",
      prizePool: "$400,000",
      participants: "12",
      viewers: "750K",
      image: "/assets/games/ow2.png",
      game: "overwatch-2"
    }
  ],
  "starcraft-ii": [
    {
      id: "wcs-global-finals-2024",
      name: "WCS Global Finals 2024",
      status: "LIVE",
      prizePool: "$850,000",
      participants: "16",
      viewers: "1.4M",
      image: "/assets/games/sc.jpg",
      game: "starcraft-ii"
    },
    {
      id: "sc2-iem-katowice-2024",
      name: "IEM Katowice 2024",
      status: "UPCOMING",
      prizePool: "$500,000",
      participants: "24",
      viewers: "1.1M",
      image: "/assets/games/sc.jpg",
      game: "starcraft-ii"
    },
    {
      id: "gsl-season-3-2024",
      name: "GSL Season 3 2024",
      status: "ACTIVE",
      prizePool: "$150,000",
      participants: "32",
      viewers: "650K",
      image: "/assets/games/sc.jpg",
      game: "starcraft-ii"
    },
    {
      id: "wcs-spring-2024",
      name: "WCS Spring 2024",
      status: "REGISTRATION",
      prizePool: "$120,000",
      participants: "64",
      viewers: "400K",
      image: "/assets/games/sc.jpg",
      game: "starcraft-ii"
    },
    {
      id: "wcs-winter-2024",
      name: "WCS Winter 2024",
      status: "COMPLETED",
      prizePool: "$100,000",
      participants: "32",
      viewers: "350K",
      image: "/assets/games/sc.jpg",
      game: "starcraft-ii"
    }
  ]
}

// Tournament ID mapping for navigation
export const tournamentIdMap: Record<string, string> = {
  // League of Legends
  'world-championship-2024': 'league-of-legends-world-championship-2024',
  'lcs-spring-2024': 'league-of-legends-lcs-spring-2024',
  'lec-summer-2024': 'league-of-legends-lec-summer-2024',
  'lck-spring-2024': 'league-of-legends-lck-spring-2024',
  'msi-2024': 'league-of-legends-msi-2024',
  'all-star-2024': 'league-of-legends-all-star-2024',
  'worlds-2023': 'worlds-2023',
  
  // Counter-Strike 2
  'major-championship-2024': 'counter-strike-2-major-championship-2024',
  'blast-premier-2024': 'counter-strike-2-blast-premier-2024',
  'iem-cologne-2024': 'counter-strike-2-iem-cologne-2024',
  'esl-pro-league-2024': 'counter-strike-2-esl-pro-league-2024',
  'pgl-major-2024': 'counter-strike-2-pgl-major-2024',
  'cs2-iem-katowice-2024': 'counter-strike-2-iem-katowice-2024',
  'cologne-2023': 'cologne-2023',
  
  // Valorant
  'champions-2024': 'valorant-champions-2024',
  'masters-tokyo-2024': 'valorant-masters-tokyo-2024',
  'masters-madrid-2024': 'valorant-vct-masters-madrid-2024',
  'vct-americas-2024': 'valorant-vct-americas-2024',
  'vct-emea-2024': 'valorant-vct-emea-2024',
  'vct-pacific-2024': 'valorant-vct-pacific-2024',
  
  // Dota 2
  'the-international-2024': 'the-international-2024',
  'dreamleague-season-23': 'dota-2-dreamleague-season-23',
  'esl-one-birmingham-2024': 'dota-2-esl-one-birmingham-2024',
  'dreamleague-season-22': 'dota-2-dreamleague-season-22',
  'bali-major-2024': 'dota-2-bali-major-2024',
  'oga-dota-pit-2024': 'dota-2-oga-dota-pit-2024',
  
  // Overwatch 2
  'overwatch-league-grand-finals-2024': 'overwatch-2-overwatch-league-grand-finals-2024',
  'owcs-championship-2024': 'overwatch-2-owcs-championship-2024',
  'calling-all-heroes-2024': 'overwatch-2-calling-all-heroes-2024',
  'summer-showdown-2024': 'overwatch-2-summer-showdown-2024',
  'midseason-madness-2024': 'overwatch-2-midseason-madness-2024',
  
  // StarCraft II
  'wcs-global-finals-2024': 'starcraft-ii-wcs-global-finals-2024',
  'sc2-iem-katowice-2024': 'starcraft-ii-iem-katowice-2024',
  'gsl-season-3-2024': 'starcraft-ii-gsl-season-3-2024',
  'wcs-spring-2024': 'starcraft-ii-wcs-spring-2024',
  'wcs-winter-2024': 'starcraft-ii-wcs-winter-2024',
}

// Helper function to get tournaments for a specific game
export function getTournamentsForGame(gameSlug: string): TournamentSelection[] {
  return tournamentSelections[gameSlug] || []
}

// Helper function to get mapped tournament ID
export function getMappedTournamentId(tournamentId: string): string {
  return tournamentIdMap[tournamentId] || tournamentId
}

// Helper function to get tournament by ID
export function getTournamentById(gameSlug: string, tournamentId: string): TournamentSelection | undefined {
  const tournaments = getTournamentsForGame(gameSlug)
  return tournaments.find(t => t.id === tournamentId)
}

// Export tournament selection data type (using the existing interface)
