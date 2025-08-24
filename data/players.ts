// Comprehensive player data with team history

export interface PlayerCareerHistory {
  team: string
  teamId: string
  joinDate: string
  leaveDate?: string
  role: string
  game: string
}

export interface PlayerStats {
  kda?: string
  winRate?: string
  avgKills?: number
  avgDeaths?: number
  avgAssists?: number
  csPerMin?: number
  goldPerMin?: number
}

export interface PlayerData {
  id: string
  name: string
  nickname: string
  birthDate?: string
  country: string
  currentTeam?: string
  currentTeamId?: string
  role: string
  game: string
  joinDate: string
  stats?: PlayerStats
  achievements: string[]
  careerHistory: PlayerCareerHistory[]
  socialMedia?: {
    twitter?: string
    instagram?: string
    twitch?: string
  }
}

// Comprehensive player database
export const players: PlayerData[] = [
  // T1 Players
  {
    id: "faker",
    name: "Lee Sang-hyeok",
    nickname: "Faker",
    birthDate: "1996-05-07",
    country: "KR",
    currentTeam: "T1",
    currentTeamId: "t1",
    role: "Mid",
    game: "League of Legends",
    joinDate: "2013-02-01",
    stats: {
      kda: "3.2/1.8/5.1",
      winRate: "68%",
      avgKills: 3.2,
      avgDeaths: 1.8,
      avgAssists: 5.1,
      csPerMin: 9.8,
      goldPerMin: 420
    },
    achievements: [
      "World Champion 2013, 2015, 2016, 2023",
      "MSI Champion 2016, 2017, 2023",
      "LCK Champion 2015-2023",
      "KeSPA Cup Champion 2015, 2016",
      "IEM World Champion 2016"
    ],
    careerHistory: [
      { team: "T1", teamId: "t1", joinDate: "2013-02-01", role: "Mid", game: "League of Legends" }
    ],
    socialMedia: {
      twitter: "@faker",
      instagram: "@faker_t1"
    }
  },
  {
    id: "gumayusi",
    name: "Lee Min-hyeong",
    nickname: "Gumayusi",
    birthDate: "2002-02-06",
    country: "KR",
    currentTeam: "T1",
    currentTeamId: "t1",
    role: "ADC",
    game: "League of Legends",
    joinDate: "2020-11-01",
    stats: {
      kda: "4.1/1.5/4.8",
      winRate: "72%",
      avgKills: 4.1,
      avgDeaths: 1.5,
      avgAssists: 4.8,
      csPerMin: 10.2,
      goldPerMin: 445
    },
    achievements: [
      "World Champion 2023",
      "MSI Champion 2023",
      "LCK Champion 2022 Spring, 2022 Summer, 2023 Spring"
    ],
    careerHistory: [
      { team: "T1", teamId: "t1", joinDate: "2020-11-01", role: "ADC", game: "League of Legends" }
    ]
  },
  {
    id: "keria",
    name: "Ryu Min-seok",
    nickname: "Keria",
    birthDate: "2002-10-14",
    country: "KR",
    currentTeam: "T1",
    currentTeamId: "t1",
    role: "Support",
    game: "League of Legends",
    joinDate: "2020-11-01",
    stats: {
      kda: "1.2/2.1/11.3",
      winRate: "72%",
      avgKills: 1.2,
      avgDeaths: 2.1,
      avgAssists: 11.3,
      csPerMin: 1.8,
      goldPerMin: 285
    },
    achievements: [
      "World Champion 2023",
      "MSI Champion 2023",
      "LCK Champion 2022-2023"
    ],
    careerHistory: [
      { team: "DRX", teamId: "drx", joinDate: "2019-11-01", leaveDate: "2020-11-01", role: "Support", game: "League of Legends" },
      { team: "T1", teamId: "t1", joinDate: "2020-11-01", role: "Support", game: "League of Legends" }
    ]
  },
  {
    id: "oner",
    name: "Moon Hyeon-jun",
    nickname: "Oner",
    birthDate: "2002-12-24",
    country: "KR",
    currentTeam: "T1",
    currentTeamId: "t1",
    role: "Jungle",
    game: "League of Legends",
    joinDate: "2021-07-01",
    stats: {
      kda: "3.8/2.1/7.2",
      winRate: "70%",
      avgKills: 3.8,
      avgDeaths: 2.1,
      avgAssists: 7.2,
      csPerMin: 5.8,
      goldPerMin: 385
    },
    achievements: [
      "World Champion 2023",
      "MSI Champion 2023",
      "LCK Champion 2022-2023"
    ],
    careerHistory: [
      { team: "T1", teamId: "t1", joinDate: "2021-07-01", role: "Jungle", game: "League of Legends" }
    ]
  },
  {
    id: "zeus",
    name: "Choi Woo-je",
    nickname: "Zeus",
    birthDate: "2004-01-31",
    country: "KR",
    currentTeam: "T1",
    currentTeamId: "t1",
    role: "Top",
    game: "League of Legends",
    joinDate: "2021-07-01",
    stats: {
      kda: "3.5/2.3/5.8",
      winRate: "70%",
      avgKills: 3.5,
      avgDeaths: 2.3,
      avgAssists: 5.8,
      csPerMin: 8.9,
      goldPerMin: 395
    },
    achievements: [
      "World Champion 2023",
      "MSI Champion 2023",
      "LCK Champion 2022-2023"
    ],
    careerHistory: [
      { team: "T1", teamId: "t1", joinDate: "2021-07-01", role: "Top", game: "League of Legends" }
    ]
  },

  // Gen.G Players
  {
    id: "chovy",
    name: "Jeong Ji-hoon",
    nickname: "Chovy",
    birthDate: "2001-03-03",
    country: "KR",
    currentTeam: "Gen.G",
    currentTeamId: "gen-g",
    role: "Mid",
    game: "League of Legends",
    joinDate: "2021-11-23",
    stats: {
      kda: "4.2/1.4/5.1",
      winRate: "75%",
      avgKills: 4.2,
      avgDeaths: 1.4,
      avgAssists: 5.1,
      csPerMin: 10.5,
      goldPerMin: 460
    },
    achievements: [
      "MSI 2024 Champion",
      "LCK 2024 Spring Champion",
      "LCK 2023 Summer Champion",
      "LCK 2022 Summer Champion"
    ],
    careerHistory: [
      { team: "Griffin", teamId: "grf", joinDate: "2018-11-01", leaveDate: "2019-11-01", role: "Mid", game: "League of Legends" },
      { team: "DRX", teamId: "drx", joinDate: "2019-11-01", leaveDate: "2020-11-01", role: "Mid", game: "League of Legends" },
      { team: "Hanwha Life", teamId: "hle", joinDate: "2020-11-01", leaveDate: "2021-11-23", role: "Mid", game: "League of Legends" },
      { team: "Gen.G", teamId: "gen-g", joinDate: "2021-11-23", role: "Mid", game: "League of Legends" }
    ]
  },
  {
    id: "peyz",
    name: "Kim Su-hwan",
    nickname: "Peyz",
    birthDate: "2005-12-29",
    country: "KR",
    currentTeam: "Gen.G",
    currentTeamId: "gen-g",
    role: "ADC",
    game: "League of Legends",
    joinDate: "2022-11-22",
    stats: {
      kda: "4.5/1.2/4.9",
      winRate: "78%",
      avgKills: 4.5,
      avgDeaths: 1.2,
      avgAssists: 4.9,
      csPerMin: 10.8,
      goldPerMin: 480
    },
    achievements: [
      "MSI 2024 Champion",
      "LCK 2024 Spring Champion",
      "LCK 2023 Summer Champion",
      "LCK 2022 Summer Champion"
    ],
    careerHistory: [
      { team: "Gen.G", teamId: "gen-g", joinDate: "2022-11-22", role: "ADC", game: "League of Legends" }
    ]
  },

  // BLG Players
  {
    id: "bin",
    name: "Chen Zebin",
    nickname: "Bin",
    birthDate: "2002-09-28",
    country: "CN",
    currentTeam: "Bilibili Gaming",
    currentTeamId: "blg",
    role: "Top",
    game: "League of Legends",
    joinDate: "2022-12-14",
    stats: {
      kda: "3.8/2.1/4.2",
      winRate: "73%",
      avgKills: 3.8,
      avgDeaths: 2.1,
      avgAssists: 4.2,
      csPerMin: 9.2,
      goldPerMin: 415
    },
    achievements: [
      "LPL 2024 Spring Champion",
      "MSI 2024 Finalist",
      "Worlds 2024 Finalist"
    ],
    careerHistory: [
      { team: "Suning", teamId: "sn", joinDate: "2019-12-01", leaveDate: "2020-11-01", role: "Top", game: "League of Legends" },
      { team: "Royal Never Give Up", teamId: "rng", joinDate: "2020-11-01", leaveDate: "2022-12-14", role: "Top", game: "League of Legends" },
      { team: "Bilibili Gaming", teamId: "blg", joinDate: "2022-12-14", role: "Top", game: "League of Legends" }
    ]
  },

  // Add more players for other teams...
  // Counter-Strike 2 players
  {
    id: "s1mple",
    name: "Oleksandr Kostyliev",
    nickname: "s1mple",
    birthDate: "1997-10-02",
    country: "UA",
    currentTeam: "Natus Vincere",
    currentTeamId: "navi",
    role: "AWPer",
    game: "Counter-Strike 2",
    joinDate: "2016-08-04",
    stats: {
      kda: "1.34",
      winRate: "65%"
    },
    achievements: [
      "Major Champion 2021",
      "HLTV #1 2018, 2021",
      "IEM Grand Slam Winner"
    ],
    careerHistory: [
      { team: "HellRaisers", teamId: "hr", joinDate: "2014-12-01", leaveDate: "2015-03-01", role: "AWPer", game: "Counter-Strike" },
      { team: "FlipSid3", teamId: "f3", joinDate: "2015-03-01", leaveDate: "2016-01-01", role: "AWPer", game: "Counter-Strike" },
      { team: "Team Liquid", teamId: "tl", joinDate: "2016-01-01", leaveDate: "2016-08-04", role: "AWPer", game: "Counter-Strike" },
      { team: "Natus Vincere", teamId: "navi", joinDate: "2016-08-04", role: "AWPer", game: "Counter-Strike 2" }
    ]
  }
]

// Helper functions
export const getPlayerById = (id: string): PlayerData | undefined => {
  return players.find(player => player.id === id)
}

export const getPlayerByName = (name: string): PlayerData | undefined => {
  return players.find(player => 
    player.name.toLowerCase() === name.toLowerCase() || 
    player.nickname.toLowerCase() === name.toLowerCase()
  )
}

export const getPlayersByTeam = (teamId: string): PlayerData[] => {
  return players.filter(player => player.currentTeamId === teamId)
}

export const getPlayersByGame = (game: string): PlayerData[] => {
  return players.filter(player => player.game === game)
}

export const getAllPlayers = (): PlayerData[] => {
  return players
}
