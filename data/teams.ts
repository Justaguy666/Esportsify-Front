// Comprehensive team data for realistic tournament representation

import { getPlayersByTeam } from './players'
import type { PlayerData } from './players'

export interface TeamData {
  id: string
  name: string
  tag: string
  game: string
  region: string
  founded: string
  coach?: string
  venue?: string
  website?: string
  socialMedia?: {
    twitter?: string
    instagram?: string
    youtube?: string
  }
  tournamentHistory?: Array<{
    tournament: string
    year: string
    placement: string
  }>
  achievements: string[]
  ranking?: number
  members?: string[]
}

// Comprehensive team data for all major esports tournaments
export const teams: TeamData[] = [
  // League of Legends - LCK Teams
  {
    id: "t1",
    name: "T1",
    tag: "T1",
    game: "League of Legends",
    region: "LCK",
    founded: "2012",
    coach: "Kim \"kkOma\" Jeong-gyun",
    venue: "T1 Esports Academy, Seoul",
    website: "https://t1.gg",
    socialMedia: {
      twitter: "@T1",
      instagram: "@t1",
      youtube: "T1 Esports"
    },
    tournamentHistory: [
      { tournament: "World Championship", year: "2013", placement: "Champion" },
      { tournament: "World Championship", year: "2015", placement: "Champion" },
      { tournament: "World Championship", year: "2016", placement: "Champion" },
      { tournament: "World Championship", year: "2022", placement: "Runner-up" },
      { tournament: "World Championship", year: "2023", placement: "Runner-up" },
      { tournament: "MSI", year: "2016", placement: "Champion" },
      { tournament: "MSI", year: "2017", placement: "Champion" },
      { tournament: "MSI", year: "2023", placement: "Champion" },
      { tournament: "LCK Spring", year: "2015", placement: "Champion" },
      { tournament: "LCK Spring", year: "2016", placement: "Champion" },
      { tournament: "LCK Spring", year: "2017", placement: "Champion" },
      { tournament: "LCK Spring", year: "2022", placement: "Champion" },
      { tournament: "LCK Spring", year: "2023", placement: "Champion" },
      { tournament: "LCK Summer", year: "2022", placement: "Champion" }
    ],
    members: [
      "faker",
      "gumayusi", 
      "keria",
      "oner",
      "zeus"
    ],
    achievements: [
      "World Champion 2013, 2015, 2016, 2023",
      "MSI Champion 2016, 2017, 2023",
      "LCK Champion 2015 Spring, 2016 Spring, 2017 Spring, 2022 Spring, 2022 Summer, 2023 Spring",
      "KeSPA Cup Champion 2015, 2016",
      "IEM World Champion 2016"
    ],
    ranking: 1
  },
  {
    id: "gen-g",
    name: "Gen.G",
    tag: "GEN",
    game: "League of Legends",
    region: "LCK",
    founded: "2018",
    coach: "Kim \"KIM\" Jeong-soo",
    venue: "Gen.G Esports Arena, Seoul",
    website: "https://geng.gg",
    socialMedia: {
      twitter: "@GenG",
      instagram: "@gengesports",
      youtube: "Gen.G Esports"
    },
    tournamentHistory: [
      { tournament: "World Championship", year: "2024", placement: "Semifinalist" },
      { tournament: "World Championship", year: "2023", placement: "Quarterfinalist" },
      { tournament: "World Championship", year: "2022", placement: "Quarterfinalist" },
      { tournament: "MSI", year: "2024", placement: "Champion" },
      { tournament: "MSI", year: "2022", placement: "Runner-up" },
      { tournament: "LCK Spring", year: "2024", placement: "Champion" },
      { tournament: "LCK Summer", year: "2023", placement: "Champion" },
      { tournament: "LCK Spring", year: "2023", placement: "Runner-up" },
      { tournament: "LCK Summer", year: "2022", placement: "Champion" }
    ],
    members: [
      "ruler",
      "lehends",
      "kiin",
      "cuzz",
      "bdd"
    ],
    achievements: [
      "MSI 2024 Champion",
      "LCK 2024 Spring Champion",
      "LCK 2023 Summer Champion",
      "LCK 2022 Summer Champion",
      "Worlds 2024 Semifinalist",
      "Worlds 2023 Quarterfinalist",
      "Worlds 2022 Quarterfinalist"
    ],
    ranking: 2
  },
  
  // League of Legends - LPL Teams
  {
    id: "blg",
    name: "Bilibili Gaming",
    tag: "BLG",
    game: "League of Legends",
    region: "LPL",
    founded: "2017",
    members: [
      "bin",
      "xun",
      "knight",
      "elk",
      "on"
    ],
    achievements: ["LPL 2024 Spring Champion", "MSI 2024 Finalist", "Worlds 2024 Finalist"],
    ranking: 3
  },
  {
    id: "tes",
    name: "Top Esports",
    tag: "TES",
    game: "League of Legends",
    region: "LPL",
    founded: "2017",
    members: [
      "369",
      "tian",
      "creme",
      "jackeylove",
      "meiko"
    ],
    achievements: ["LPL 2024 Summer Champion", "Worlds 2024 Semifinalist"],
    ranking: 4
  },

  // Counter-Strike 2 Teams
  {
    id: "navi",
    name: "Natus Vincere",
    tag: "NAVI",
    game: "Counter-Strike 2",
    region: "EU",
    founded: "2009",
    members: [
      "aleksib",
      "im",
      "b1t",
      "jl",
      "w0nderful"
    ],
    achievements: ["PGL Major Copenhagen 2024 Champion", "IEM Katowice 2024 Champion"],
    ranking: 1
  },
  {
    id: "g2",
    name: "G2 Esports",
    tag: "G2",
    game: "Counter-Strike 2",
    region: "EU",
    founded: "2015",
    members: [
      "snax",
      "niko",
      "hunter",
      "m0nesy",
      "malbsmd"
    ],
    achievements: ["IEM Cologne 2024 Champion", "BLAST Premier: World Final 2024 Champion"],
    ranking: 2
  },

  // Valorant Teams
  {
    id: "sentinels",
    name: "Sentinels",
    tag: "SEN",
    game: "Valorant",
    region: "NA",
    founded: "2018",
    members: [
      "johnqt",
      "zellsis",
      "zekken",
      "sacy",
      "tenz"
    ],
    achievements: ["VCT 2024 Champions", "VCT 2024 Masters Madrid"],
    ranking: 1
  },
  {
    id: "fnatic",
    name: "Fnatic",
    tag: "FNC",
    game: "Valorant",
    region: "EMEA",
    founded: "2004",
    members: [
      "boaster",
      "chronicle",
      "derke",
      "alfajer",
      "leo"
    ],
    achievements: ["VCT 2024 Masters Tokyo", "VCT 2023 Champions"],
    ranking: 2
  }
]

// Comprehensive player data extracted from teams
export const players: PlayerData[] = [
  // T1 Players
  {
    id: "zeus",
    name: "Choi Woo-je",
    nickname: "Zeus",
    game: "League of Legends",
    role: "Top",
    country: "KR",
    joinDate: "2022-01-10",
    achievements: ["Worlds 2023 Champion", "LCK 2023 Spring Champion"],
    stats: { kda: "3.2", winRate: "68%", avgKills: 4.1, avgDeaths: 2.3, avgAssists: 5.8 },
    careerHistory: [
      { team: "T1", teamId: "t1", joinDate: "2022-01-10", role: "Top", game: "League of Legends" }
    ]
  },
  {
    id: "oner",
    name: "Moon Hyeon-jun",
    nickname: "Oner",
    game: "League of Legends",
    role: "Jungle",
    country: "KR",
    joinDate: "2021-01-15",
    achievements: ["Worlds 2023 Champion", "LCK 2023 Spring Champion"],
    stats: { kda: "4.1", winRate: "72%", avgKills: 3.8, avgDeaths: 1.9, avgAssists: 7.2 },
    careerHistory: [
      { team: "T1", teamId: "t1", joinDate: "2021-01-15", role: "Jungle", game: "League of Legends" }
    ]
  },
  {
    id: "faker",
    name: "Lee Sang-hyeok",
    nickname: "Faker",
    game: "League of Legends",
    role: "Mid",
    country: "KR",
    joinDate: "2013-02-01",
    achievements: ["Worlds 2023 Champion", "Worlds 2016 Champion", "Worlds 2015 Champion"],
    stats: { kda: "5.8", winRate: "75%", avgKills: 5.2, avgDeaths: 1.8, avgAssists: 8.9 },
    careerHistory: [
      { team: "T1", teamId: "t1", joinDate: "2013-02-01", role: "Mid", game: "League of Legends" }
    ]
  },
  // Gen.G Players
  {
    id: "kiin",
    name: "Kim Gi-in",
    nickname: "Kiin",
    game: "League of Legends",
    role: "Top",
    country: "KR",
    joinDate: "2023-11-20",
    achievements: ["LCK 2024 Spring Champion", "MSI 2024 Champion"],
    stats: { kda: "3.5", winRate: "71%", avgKills: 4.3, avgDeaths: 2.1, avgAssists: 5.9 },
    careerHistory: [
      { team: "Gen.G", teamId: "gen-g", joinDate: "2023-11-20", role: "Top", game: "League of Legends" }
    ]
  },
  // BLG Players
  {
    id: "bin",
    name: "Chen Zebin",
    nickname: "Bin",
    game: "League of Legends",
    role: "Top",
    country: "CN",
    joinDate: "2022-12-14",
    achievements: ["LPL 2024 Spring Champion", "Worlds 2024 Finalist"],
    stats: { kda: "3.8", winRate: "69%", avgKills: 4.7, avgDeaths: 2.4, avgAssists: 6.2 },
    careerHistory: [
      { team: "Bilibili Gaming", teamId: "blg", joinDate: "2022-12-14", role: "Top", game: "League of Legends" }
    ]
  },
  // NAVI CS2 Players
  {
    id: "aleksib",
    name: "Aleksi Virolainen",
    nickname: "Aleksib",
    game: "Counter-Strike 2",
    role: "IGL",
    country: "FI",
    joinDate: "2023-10-26",
    achievements: ["PGL Major Copenhagen 2024 Champion", "IEM Katowice 2024 Champion"],
    stats: { kda: "1.1", winRate: "65%", avgKills: 15.2, avgDeaths: 14.8, avgAssists: 0.8 },
    careerHistory: [
      { team: "Natus Vincere", teamId: "navi", joinDate: "2023-10-26", role: "IGL", game: "Counter-Strike 2" }
    ]
  },
  // Valorant Players
  {
    id: "tenz",
    name: "Tyson Ngo",
    nickname: "TenZ",
    game: "Valorant",
    role: "Duelist",
    country: "CA",
    joinDate: "2021-02-12",
    achievements: ["VCT 2024 Champions", "VCT 2024 Masters Madrid"],
    stats: { kda: "1.4", winRate: "68%", avgKills: 22.1, avgDeaths: 16.3, avgAssists: 0.5 },
    careerHistory: [
      { team: "Sentinels", teamId: "sentinels", joinDate: "2021-02-12", role: "Duelist", game: "Valorant" }
    ]
  }
]

// Helper functions
export const getTeamById = (id: string): TeamData | undefined => {
  return teams.find(team => team.id === id)
}

export const getPlayerByName = (name: string): PlayerData | undefined => {
  const decodedName = decodeURIComponent(name)
  return players.find(player => 
    player.name === decodedName || 
    player.nickname === decodedName ||
    player.name.toLowerCase() === decodedName.toLowerCase() ||
    player.nickname?.toLowerCase() === decodedName.toLowerCase()
  )
}

export const getTeamMembers = (teamId: string): string[] => {
  const team = getTeamById(teamId)
  return team?.members || []
}

export const getAllPlayers = (): PlayerData[] => {
  return players
}
