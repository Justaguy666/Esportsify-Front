// Tournament highlights and memorable moments data

export interface Highlight {
  id: string
  title: string
  description: string
  timestamp: string
  duration: string
  videoUrl?: string
  thumbnailUrl?: string
  tournamentId: string
  teams: string[]
  players: string[]
  category: 'clutch' | 'ace' | 'comeback' | 'upset' | 'championship' | 'record'
  views: number
}

export const tournamentHighlights: Record<string, Highlight[]> = {
  // League of Legends - World Championship 2024
  'league-of-legends-world-championship-2024': [
    {
      id: 'lol-wc-hl-001',
      title: 'Faker\'s Pentakill in Finals',
      description: 'Faker secures a crucial pentakill in game 3 of the finals to turn the tide.',
      timestamp: '15:42',
      duration: '0:45',
      videoUrl: '/highlights/faker-penta-finals.mp4',
      thumbnailUrl: '/highlights/thumbnails/faker-penta.jpg',
      tournamentId: 'league-of-legends-world-championship-2024',
      teams: ['T1', 'Gen.G'],
      players: ['Faker'],
      category: 'ace',
      views: 2500000
    },
    {
      id: 'lol-wc-hl-002',
      title: 'T1\'s Base Defense Miracle',
      description: 'T1 defends their base with only 50 HP remaining on the Nexus.',
      timestamp: '42:18',
      duration: '1:20',
      videoUrl: '/highlights/t1-base-defense.mp4',
      thumbnailUrl: '/highlights/thumbnails/t1-defense.jpg',
      tournamentId: 'league-of-legends-world-championship-2024',
      teams: ['T1', 'JDG'],
      players: ['Gumayusi', 'Keria'],
      category: 'clutch',
      views: 1800000
    },
    {
      id: 'lol-wc-hl-003',
      title: 'Upset of the Tournament',
      description: 'Underdog team eliminates tournament favorites in stunning upset.',
      timestamp: '28:30',
      duration: '2:15',
      videoUrl: '/highlights/worlds-upset.mp4',
      thumbnailUrl: '/highlights/thumbnails/worlds-upset.jpg',
      tournamentId: 'league-of-legends-world-championship-2024',
      teams: ['Team A', 'Team B'],
      players: ['Player1', 'Player2'],
      category: 'upset',
      views: 1200000
    }
  ],

  // League of Legends - LCS Spring 2024
  'league-of-legends-lcs-spring-2024': [
    {
      id: 'lol-lcs-hl-001',
      title: 'Rookie Mid Laner\'s Debut Ace',
      description: 'Rookie mid laner gets pentakill in his first LCS finals appearance.',
      timestamp: '22:45',
      duration: '0:35',
      videoUrl: '/highlights/rookie-ace-lcs.mp4',
      thumbnailUrl: '/highlights/thumbnails/rookie-ace.jpg',
      tournamentId: 'league-of-legends-lcs-spring-2024',
      teams: ['T1', 'Gen.G'],
      players: ['RookieMid'],
      category: 'ace',
      views: 850000
    }
  ],

  // Counter-Strike 2 - Major 2024
  'counter-strike-2-major-championship-2024': [
    {
      id: 'cs2-major-hl-001',
      title: 's1mple\'s 1v5 Clutch on Mirage',
      description: 's1mple pulls off an impossible 1v5 clutch with the AWP in overtime.',
      timestamp: 'Round 28',
      duration: '1:30',
      videoUrl: '/highlights/s1mple-1v5-clutch.mp4',
      thumbnailUrl: '/highlights/thumbnails/s1mple-clutch.jpg',
      tournamentId: 'counter-strike-2-major-championship-2024',
      teams: ['NAVI', 'G2'],
      players: ['s1mple'],
      category: 'clutch',
      views: 3200000
    },
    {
      id: 'cs2-major-hl-002',
      title: 'NAVI\'s Championship Winning Round',
      description: 'The final round that secured NAVI\'s Major championship victory.',
      timestamp: 'Round 30',
      duration: '2:45',
      videoUrl: '/highlights/navi-championship-round.mp4',
      thumbnailUrl: '/highlights/thumbnails/navi-champion.jpg',
      tournamentId: 'counter-strike-2-major-championship-2024',
      teams: ['NAVI', 'FaZe'],
      players: ['s1mple', 'electronic'],
      category: 'championship',
      views: 2100000
    }
  ],

  // Counter-Strike 2 - BLAST Premier
  'counter-strike-2-blast-premier-2024': [
    {
      id: 'cs2-blast-hl-001',
      title: 'BLAST Finals Ace by NiKo',
      description: 'NiKo gets an incredible ace with the AK-47 on Dust2.',
      timestamp: 'Round 15',
      duration: '0:25',
      videoUrl: '/highlights/niko-blast-ace.mp4',
      thumbnailUrl: '/highlights/thumbnails/niko-ace.jpg',
      tournamentId: 'counter-strike-2-blast-premier-2024',
      teams: ['G2', 'NAVI'],
      players: ['NiKo'],
      category: 'ace',
      views: 1500000
    }
  ],

  // Valorant - Champions 2024
  'valorant-champions-2024': [
    {
      id: 'val-champions-hl-001',
      title: 'TenZ\'s Insane 1v4 Clutch',
      description: 'TenZ pulls off an incredible 1v4 clutch with the Operator on Haven.',
      timestamp: 'Round 22',
      duration: '1:15',
      videoUrl: '/highlights/tenz-1v4-clutch.mp4',
      thumbnailUrl: '/highlights/thumbnails/tenz-clutch.jpg',
      tournamentId: 'valorant-champions-2024',
      teams: ['Sentinels', 'Fnatic'],
      players: ['TenZ'],
      category: 'clutch',
      views: 2800000
    },
    {
      id: 'val-champions-hl-002',
      title: 'Sentinels\' Championship Point',
      description: 'The final round that secured Sentinels\' Champions 2024 victory.',
      timestamp: 'Round 24',
      duration: '3:20',
      videoUrl: '/highlights/sentinels-championship-point.mp4',
      thumbnailUrl: '/highlights/thumbnails/sentinels-champion.jpg',
      tournamentId: 'valorant-champions-2024',
      teams: ['Sentinels', 'LOUD'],
      players: ['TenZ', 'ShahZaM'],
      category: 'championship',
      views: 1900000
    }
  ],

  // Valorant - Masters Madrid
  'valorant-vct-masters-madrid-2024': [
    {
      id: 'val-madrid-hl-001',
      title: 'Derke\'s Ace on Ascent',
      description: 'Derke gets a stunning ace with the Phantom on Ascent.',
      timestamp: 'Round 18',
      duration: '0:30',
      videoUrl: '/highlights/derke-ace-madrid.mp4',
      thumbnailUrl: '/highlights/thumbnails/derke-ace.jpg',
      tournamentId: 'valorant-vct-masters-madrid-2024',
      teams: ['Fnatic', 'Sentinels'],
      players: ['Derke'],
      category: 'ace',
      views: 1200000
    }
  ],

  // Dota 2 - The International 2024
  'the-international-2024': [
    {
      id: 'dota-ti-hl-001',
      title: 'Yatoro\'s Rampage in Finals',
      description: 'Yatoro gets a crucial rampage in game 5 of the TI finals.',
      timestamp: '42:30',
      duration: '1:45',
      videoUrl: '/highlights/yatoro-ti-rampage.mp4',
      thumbnailUrl: '/highlights/thumbnails/yatoro-rampage.jpg',
      tournamentId: 'the-international-2024',
      teams: ['Team Spirit', 'G2.IG'],
      players: ['Yatoro'],
      category: 'ace',
      views: 3500000
    },
    {
      id: 'dota-ti-hl-002',
      title: 'Team Spirit\'s Base Race Victory',
      description: 'Team Spirit wins TI with an incredible base race in game 5.',
      timestamp: '58:20',
      duration: '3:30',
      videoUrl: '/highlights/ti-base-race.mp4',
      thumbnailUrl: '/highlights/thumbnails/ti-baserace.jpg',
      tournamentId: 'the-international-2024',
      teams: ['Team Spirit', 'G2.IG'],
      players: ['Yatoro', 'Collapse'],
      category: 'championship',
      views: 4200000
    }
  ],

  // Dota 2 - DreamLeague
  'dota-2-dreamleague-season-23': [
    {
      id: 'dota-dl-hl-001',
      title: 'Miracle- Ultra Kill on Invoker',
      description: 'Miracle- gets an ultra kill with a perfectly executed Invoker combo.',
      timestamp: '28:15',
      duration: '1:10',
      videoUrl: '/highlights/miracle-ultra-kill.mp4',
      thumbnailUrl: '/highlights/thumbnails/miracle-ultra.jpg',
      tournamentId: 'dota-2-dreamleague-season-23',
      teams: ['Nigma', 'OG'],
      players: ['Miracle-'],
      category: 'ace',
      views: 1800000
    }
  ],

  // Overwatch 2 - OWCS Championship
  'overwatch-2-owcs-championship-2024': [
    {
      id: 'ow2-champ-hl-001',
      title: 'Proper\'s 6K Dragonblade',
      description: 'Proper gets a 6-kill Dragonblade to secure the championship.',
      timestamp: 'Round 3',
      duration: '0:40',
      videoUrl: '/highlights/proper-dragonblade.mp4',
      thumbnailUrl: '/highlights/thumbnails/proper-blade.jpg',
      tournamentId: 'overwatch-2-owcs-championship-2024',
      teams: ['Shanghai Dragons', 'Seoul Dynasty'],
      players: ['Proper'],
      category: 'ace',
      views: 950000
    }
  ],

  // Overwatch 2 - League Championship
  'overwatch-league-championship-2024': [
    {
      id: 'ow2-league-hl-001',
      title: 'OWL Finals Clutch Moment',
      description: 'Last-second team fight decides the OWL Championship.',
      timestamp: 'Map 5',
      duration: '2:15',
      videoUrl: '/highlights/owl-clutch-moment.mp4',
      thumbnailUrl: '/highlights/thumbnails/owl-clutch.jpg',
      tournamentId: 'overwatch-league-championship-2024',
      teams: ['Team A', 'Team B'],
      players: ['Player1', 'Player2'],
      category: 'clutch',
      views: 750000
    }
  ],

  // StarCraft II - WCS Global Finals
  'starcraft-ii-wcs-global-finals-2024': [
    {
      id: 'sc2-wcs-hl-001',
      title: 'Serral\'s Perfect Defense',
      description: 'Serral holds off an all-in with perfect micro and game sense.',
      timestamp: '12:30',
      duration: '2:30',
      videoUrl: '/highlights/serral-defense.mp4',
      thumbnailUrl: '/highlights/thumbnails/serral-defense.jpg',
      tournamentId: 'starcraft-ii-wcs-global-finals-2024',
      teams: ['Serral', 'Reynor'],
      players: ['Serral'],
      category: 'clutch',
      views: 650000
    }
  ],

  // StarCraft II - GSL Code S
  'starcraft-ii-gsl-code-s-2024': [
    {
      id: 'sc2-gsl-hl-001',
      title: 'Maru\'s Proxy Rush Victory',
      description: 'Maru executes a perfect proxy rush to win the GSL finals.',
      timestamp: '8:45',
      duration: '1:20',
      videoUrl: '/highlights/maru-proxy.mp4',
      thumbnailUrl: '/highlights/thumbnails/maru-proxy.jpg',
      tournamentId: 'starcraft-ii-gsl-code-s-2024',
      teams: ['Maru', 'Cure'],
      players: ['Maru'],
      category: 'championship',
      views: 580000
    }
  ]
}

// Helper functions
export const getTournamentHighlights = (tournamentId: string): Highlight[] => {
  return tournamentHighlights[tournamentId] || []
}

export const getTopTournamentHighlights = (tournamentId: string, limit: number = 3): Highlight[] => {
  const highlights = getTournamentHighlights(tournamentId)
  return highlights.sort((a, b) => b.views - a.views).slice(0, limit)
}
