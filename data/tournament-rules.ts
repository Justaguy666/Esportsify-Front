// Tournament rules and regulations data

export interface TournamentRule {
  id: string
  tournamentId: string
  section: string
  title: string
  content: string
  priority: 'high' | 'medium' | 'low'
  lastUpdated: string
}

export interface TournamentRuleset {
  tournamentId: string
  tournamentName: string
  game: string
  rules: TournamentRule[]
  format: string
  prizeDistribution: {
    position: number
    prize: string
    percentage: number
  }[]
}

export const tournamentRules: Record<string, TournamentRuleset> = {
  // League of Legends - World Championship 2024
  'league-of-legends-world-championship-2024': {
    tournamentId: 'league-of-legends-world-championship-2024',
    tournamentName: 'League of Legends World Championship 2024',
    game: 'League of Legends',
    format: 'Double Elimination Bracket',
    rules: [
      {
        id: 'lol-wc-rule-001',
        tournamentId: 'league-of-legends-world-championship-2024',
        section: 'Format',
        title: 'Tournament Structure',
        content: '16 teams compete in a double elimination bracket. All matches are best-of-5 except for the finals which are best-of-7.',
        priority: 'high',
        lastUpdated: '2025-08-01'
      },
      {
        id: 'lol-wc-rule-002',
        tournamentId: 'league-of-legends-world-championship-2024',
        section: 'Game Settings',
        title: 'Patch Version',
        content: 'All matches will be played on patch 14.16 with all champions enabled except for newly released champions within 2 weeks of the tournament.',
        priority: 'high',
        lastUpdated: '2025-08-15'
      },
      {
        id: 'lol-wc-rule-003',
        tournamentId: 'league-of-legends-world-championship-2024',
        section: 'Draft Rules',
        title: 'Champion Draft',
        content: 'Standard LCS draft format with 5 bans per team. Teams cannot pick champions they have already played in the same series.',
        priority: 'high',
        lastUpdated: '2025-08-01'
      },
      {
        id: 'lol-wc-rule-004',
        tournamentId: 'league-of-legends-world-championship-2024',
        section: 'Player Conduct',
        title: 'Code of Conduct',
        content: 'Players must maintain professional behavior. Any form of toxicity, cheating, or unsportsmanlike conduct will result in immediate disqualification.',
        priority: 'high',
        lastUpdated: '2025-08-01'
      },
      {
        id: 'lol-wc-rule-005',
        tournamentId: 'league-of-legends-world-championship-2024',
        section: 'Technical',
        title: 'Pause Rules',
        content: 'Each team is allowed 3 tactical pauses per series, maximum 5 minutes each. Technical pauses are unlimited but must be verified by officials.',
        priority: 'medium',
        lastUpdated: '2025-08-01'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$1,000,000', percentage: 45 },
      { position: 2, prize: '$500,000', percentage: 22.5 },
      { position: 3, prize: '$300,000', percentage: 13.5 },
      { position: 4, prize: '$200,000', percentage: 9 },
      { position: 5, prize: '$100,000', percentage: 4.5 },
      { position: 6, prize: '$75,000', percentage: 3.4 },
      { position: 7, prize: '$50,000', percentage: 2.2 }
    ]
  },

  // League of Legends - LCS Spring 2024
  'league-of-legends-lcs-spring-2024': {
    tournamentId: 'league-of-legends-lcs-spring-2024',
    tournamentName: 'League of Legends LCS Spring 2024',
    game: 'League of Legends',
    format: 'Round Robin + Double Elimination Playoffs',
    rules: [
      {
        id: 'lol-lcs-rule-001',
        tournamentId: 'league-of-legends-lcs-spring-2024',
        section: 'Format',
        title: 'Regular Season',
        content: '10 teams play double round robin. Top 6 advance to playoffs. All matches are best-of-1 during regular season.',
        priority: 'high',
        lastUpdated: '2024-01-15'
      },
      {
        id: 'lol-lcs-rule-002',
        tournamentId: 'league-of-legends-lcs-spring-2024',
        section: 'Playoffs',
        title: 'Playoff Format',
        content: 'Double elimination bracket. Top 2 teams get byes to semifinals. All playoff matches are best-of-5.',
        priority: 'high',
        lastUpdated: '2024-01-15'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$150,000', percentage: 50 },
      { position: 2, prize: '$75,000', percentage: 25 },
      { position: 3, prize: '$45,000', percentage: 15 },
      { position: 4, prize: '$30,000', percentage: 10 }
    ]
  },

  // Counter-Strike 2 - Major 2024
  'counter-strike-2-major-championship-2024': {
    tournamentId: 'counter-strike-2-major-championship-2024',
    tournamentName: 'Counter-Strike 2 Major Championship 2024',
    game: 'Counter-Strike 2',
    format: 'Swiss System + Single Elimination',
    rules: [
      {
        id: 'cs2-major-rule-001',
        tournamentId: 'counter-strike-2-major-championship-2024',
        section: 'Format',
        title: 'Tournament Phases',
        content: '24 teams divided into: Challengers Stage (16 teams, Swiss format), Legends Stage (16 teams, Swiss format), Champions Stage (8 teams, single elimination).',
        priority: 'high',
        lastUpdated: '2024-12-01'
      },
      {
        id: 'cs2-major-rule-002',
        tournamentId: 'counter-strike-2-major-championship-2024',
        section: 'Map Pool',
        title: 'Active Map Pool',
        content: 'Maps: Ancient, Anubis, Inferno, Mirage, Nuke, Overpass, Vertigo. Each team gets 3 bans in BO1, 4 bans in BO3.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      },
      {
        id: 'cs2-major-rule-003',
        tournamentId: 'counter-strike-2-major-championship-2024',
        section: 'Match Settings',
        title: 'Match Configuration',
        content: 'MR15 for regulation, MR3 overtime. 1 minute 55 second round time, 40 second bomb timer. 6 overtime rounds maximum.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$500,000', percentage: 50 },
      { position: 2, prize: '$170,000', percentage: 17 },
      { position: 3, prize: '$80,000', percentage: 8 },
      { position: 4, prize: '$80,000', percentage: 8 },
      { position: 5, prize: '$45,000', percentage: 4.5 },
      { position: 6, prize: '$45,000', percentage: 4.5 },
      { position: 7, prize: '$35,000', percentage: 3.5 },
      { position: 8, prize: '$35,000', percentage: 3.5 }
    ]
  },

  // Counter-Strike 2 - BLAST Premier
  'counter-strike-2-blast-premier-2024': {
    tournamentId: 'counter-strike-2-blast-premier-2024',
    tournamentName: 'BLAST Premier Spring 2024',
    game: 'Counter-Strike 2',
    format: 'Group Stage + Playoffs',
    rules: [
      {
        id: 'cs2-blast-rule-001',
        tournamentId: 'counter-strike-2-blast-premier-2024',
        section: 'Format',
        title: 'Tournament Structure',
        content: '12 teams divided into 3 groups of 4. Group winners advance directly to semifinals. 2nd and 3rd place teams play in quarterfinals.',
        priority: 'high',
        lastUpdated: '2024-03-01'
      },
      {
        id: 'cs2-blast-rule-002',
        tournamentId: 'counter-strike-2-blast-premier-2024',
        section: 'Group Stage',
        title: 'Group Stage Rules',
        content: 'Double elimination groups. All matches are best-of-3. Top 2 from each group advance to playoffs.',
        priority: 'high',
        lastUpdated: '2024-03-01'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$200,000', percentage: 47 },
      { position: 2, prize: '$85,000', percentage: 20 },
      { position: 3, prize: '$40,000', percentage: 9.4 },
      { position: 4, prize: '$25,000', percentage: 5.9 },
      { position: 5, prize: '$15,000', percentage: 3.5 }
    ]
  },

  // Valorant - Champions 2024
  'valorant-champions-2024': {
    tournamentId: 'valorant-champions-2024',
    tournamentName: 'Valorant Champions 2024',
    game: 'Valorant',
    format: 'Double Elimination',
    rules: [
      {
        id: 'val-champions-rule-001',
        tournamentId: 'valorant-champions-2024',
        section: 'Format',
        title: 'Tournament Structure',
        content: '16 teams in double elimination bracket. All matches best-of-3 except finals which are best-of-5.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      },
      {
        id: 'val-champions-rule-002',
        tournamentId: 'valorant-champions-2024',
        section: 'Map Pool',
        title: 'Active Maps',
        content: 'Maps: Ascent, Bind, Breeze, Fracture, Haven, Icebox, Lotus, Pearl, Split, Sunset. Each team gets 2 bans in BO3, 3 bans in BO5.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      },
      {
        id: 'val-champions-rule-003',
        tournamentId: 'valorant-champions-2024',
        section: 'Agent Rules',
        title: 'Agent Restrictions',
        content: 'All agents are available. No duplicate agents on the same team. Agent picks are locked for the entire match.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$400,000', percentage: 40 },
      { position: 2, prize: '$200,000', percentage: 20 },
      { position: 3, prize: '$120,000', percentage: 12 },
      { position: 4, prize: '$80,000', percentage: 8 },
      { position: 5, prize: '$60,000', percentage: 6 },
      { position: 6, prize: '$40,000', percentage: 4 },
      { position: 7, prize: '$25,000', percentage: 2.5 },
      { position: 8, prize: '$25,000', percentage: 2.5 }
    ]
  },

  // Valorant - Masters Madrid
  'valorant-vct-masters-madrid-2024': {
    tournamentId: 'valorant-vct-masters-madrid-2024',
    tournamentName: 'VCT Masters Madrid 2024',
    game: 'Valorant',
    format: 'Single Elimination',
    rules: [
      {
        id: 'val-madrid-rule-001',
        tournamentId: 'valorant-vct-masters-madrid-2024',
        section: 'Format',
        title: 'Tournament Structure',
        content: '8 teams in single elimination bracket. All matches best-of-3 except semifinals and finals which are best-of-5.',
        priority: 'high',
        lastUpdated: '2024-03-01'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$200,000', percentage: 40 },
      { position: 2, prize: '$100,000', percentage: 20 },
      { position: 3, prize: '$60,000', percentage: 12 },
      { position: 4, prize: '$40,000', percentage: 8 }
    ]
  },

  // Dota 2 - The International 2024
  'the-international-2024': {
    tournamentId: 'the-international-2024',
    tournamentName: 'The International 2024',
    game: 'Dota 2',
    format: 'Swiss System + Double Elimination',
    rules: [
      {
        id: 'dota-ti-rule-001',
        tournamentId: 'the-international-2024',
        section: 'Format',
        title: 'Tournament Structure',
        content: '18 teams: 2 groups of 9 teams in round robin, top 4 from each group advance to upper bracket, 5th-6th to lower bracket, double elimination playoffs.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      },
      {
        id: 'dota-ti-rule-002',
        tournamentId: 'the-international-2024',
        section: 'Draft Rules',
        title: 'Captain\'s Mode',
        content: 'Standard Captain\'s Mode with 7 bans per team. No hero can be picked more than once per series.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      },
      {
        id: 'dota-ti-rule-003',
        tournamentId: 'the-international-2024',
        section: 'Game Settings',
        title: 'Patch and Settings',
        content: 'All matches played on patch 7.36c. Tournament mode enabled with standard competitive settings.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$6,000,000', percentage: 40 },
      { position: 2, prize: '$3,000,000', percentage: 20 },
      { position: 3, prize: '$1,800,000', percentage: 12 },
      { position: 4, prize: '$1,200,000', percentage: 8 },
      { position: 5, prize: '$900,000', percentage: 6 },
      { position: 6, prize: '$600,000', percentage: 4 },
      { position: 7, prize: '$375,000', percentage: 2.5 },
      { position: 8, prize: '$375,000', percentage: 2.5 }
    ]
  },

  // Dota 2 - DreamLeague
  'dota-2-dreamleague-season-23': {
    tournamentId: 'dota-2-dreamleague-season-23',
    tournamentName: 'DreamLeague Season 23',
    game: 'Dota 2',
    format: 'Group Stage + Double Elimination',
    rules: [
      {
        id: 'dota-dl-rule-001',
        tournamentId: 'dota-2-dreamleague-season-23',
        section: 'Format',
        title: 'Tournament Structure',
        content: '16 teams divided into 2 groups of 8. Double elimination playoffs with all matches best-of-3 except finals which are best-of-5.',
        priority: 'high',
        lastUpdated: '2024-02-01'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$200,000', percentage: 50 },
      { position: 2, prize: '$100,000', percentage: 25 },
      { position: 3, prize: '$50,000', percentage: 12.5 },
      { position: 4, prize: '$30,000', percentage: 7.5 },
      { position: 5, prize: '$20,000', percentage: 5 }
    ]
  },

  // Overwatch 2 - OWCS Championship
  'overwatch-2-owcs-championship-2024': {
    tournamentId: 'overwatch-2-owcs-championship-2024',
    tournamentName: 'Overwatch Champions Series 2024',
    game: 'Overwatch 2',
    format: 'Regional Qualifiers + Global Finals',
    rules: [
      {
        id: 'ow2-owcs-rule-001',
        tournamentId: 'overwatch-2-owcs-championship-2024',
        section: 'Format',
        title: 'Tournament Structure',
        content: '16 teams from regional qualifiers. Double elimination bracket with all matches best-of-5.',
        priority: 'high',
        lastUpdated: '2024-06-01'
      },
      {
        id: 'ow2-owcs-rule-002',
        tournamentId: 'overwatch-2-owcs-championship-2024',
        section: 'Map Pool',
        title: 'Competitive Map Pool',
        content: 'Control: Antarctic Peninsula, Busan, Ilios, Lijiang Tower, Nepal, Oasis. Escort: Circuit Royal, Dorado, Havana, Junkertown, Rialto, Route 66. Hybrid: Blizzard World, Eichenwalde, Hollywood, King\'s Row, Midtown, Numbani. Push: Colosseo, Esperança, New Queen Street.',
        priority: 'high',
        lastUpdated: '2024-06-01'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$150,000', percentage: 50 },
      { position: 2, prize: '$75,000', percentage: 25 },
      { position: 3, prize: '$45,000', percentage: 15 },
      { position: 4, prize: '$30,000', percentage: 10 }
    ]
  },

  // Overwatch 2 - League Championship
  'overwatch-league-championship-2024': {
    tournamentId: 'overwatch-league-championship-2024',
    tournamentName: 'Overwatch League Championship 2024',
    game: 'Overwatch 2',
    format: 'Single Elimination',
    rules: [
      {
        id: 'ow2-league-rule-001',
        tournamentId: 'overwatch-league-championship-2024',
        section: 'Format',
        title: 'Tournament Structure',
        content: '12 teams in single elimination bracket. All matches best-of-5.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$600,000', percentage: 40 },
      { position: 2, prize: '$300,000', percentage: 20 },
      { position: 3, prize: '$180,000', percentage: 12 },
      { position: 4, prize: '$120,000', percentage: 8 }
    ]
  },

  // StarCraft II - WCS Global Finals
  'starcraft-ii-wcs-global-finals-2024': {
    tournamentId: 'starcraft-ii-wcs-global-finals-2024',
    tournamentName: 'WCS Global Finals 2024',
    game: 'StarCraft II',
    format: 'Group Stage + Playoffs',
    rules: [
      {
        id: 'sc2-wcs-rule-001',
        tournamentId: 'starcraft-ii-wcs-global-finals-2024',
        section: 'Format',
        title: 'Tournament Structure',
        content: '16 players divided into 4 groups of 4. Double elimination playoffs with all matches best-of-5 except finals which are best-of-7.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      },
      {
        id: 'sc2-wcs-rule-002',
        tournamentId: 'starcraft-ii-wcs-global-finals-2024',
        section: 'Map Pool',
        title: 'Competitive Map Pool',
        content: 'Maps: Acropolis, Berlingrad, Blackburn, Dragon Scales, Hardwire, Moondance, Royal Blood, Site Delta. Each player gets 3 vetoes.',
        priority: 'high',
        lastUpdated: '2024-12-01'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$280,000', percentage: 40 },
      { position: 2, prize: '$140,000', percentage: 20 },
      { position: 3, prize: '$84,000', percentage: 12 },
      { position: 4, prize: '$56,000', percentage: 8 }
    ]
  },

  // StarCraft II - GSL Code S
  'starcraft-ii-gsl-code-s-2024': {
    tournamentId: 'starcraft-ii-gsl-code-s-2024',
    tournamentName: 'GSL Code S Season 1 2024',
    game: 'StarCraft II',
    format: 'Group Stage + Playoffs',
    rules: [
      {
        id: 'sc2-gsl-rule-001',
        tournamentId: 'starcraft-ii-gsl-code-s-2024',
        section: 'Format',
        title: 'Tournament Structure',
        content: '32 players in double elimination bracket. All matches best-of-3 except semifinals and finals which are best-of-5.',
        priority: 'high',
        lastUpdated: '2024-01-15'
      }
    ],
    prizeDistribution: [
      { position: 1, prize: '$80,000', percentage: 40 },
      { position: 2, prize: '$40,000', percentage: 20 },
      { position: 3, prize: '$24,000', percentage: 12 },
      { position: 4, prize: '$16,000', percentage: 8 }
    ]
  }
}

// Helper functions
export const getTournamentRules = (tournamentId: string) => {
  return tournamentRules[tournamentId] || null
}

export const getTournamentRuleBySection = (tournamentId: string, section: string): TournamentRule[] => {
  const ruleset = tournamentRules[tournamentId]
  if (!ruleset) return []
  return ruleset.rules.filter(rule => rule.section === section)
}
