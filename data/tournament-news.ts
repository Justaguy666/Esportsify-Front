// Comprehensive news data for all tournaments across all games

export interface TournamentNewsItem {
  id: string
  title: string
  description: string
  date: string
  category: string
  tournamentId: string
  author: string
  content?: string
  tags: string[]
  imageUrl?: string
}

export const tournamentNews: Record<string, TournamentNewsItem[]> = {
  // League of Legends - World Championship 2024
  'league-of-legends-world-championship-2024': [
    {
      id: 'lol-wc-001',
      title: 'T1 Advances to World Championship Finals',
      description: 'T1 secured their spot in the finals with a dominant 3-1 victory over JDG in the semifinals.',
      date: 'August 18, 2025',
      category: 'Match Results',
      tournamentId: 'league-of-legends-world-championship-2024',
      author: 'LoL Esports Team',
      content: 'T1 showcased exceptional macro play and individual skill throughout the series, with Faker leading the charge. The team demonstrated why they are considered favorites for the championship title.',
      tags: ['T1', 'Finals', 'World Championship', 'Faker'],
      imageUrl: '/assets/news/t1-finals.jpg'
    },
    {
      id: 'lol-wc-002',
      title: 'Gen.G Upsets Top Seed in Quarterfinals',
      description: 'Gen.G eliminated the tournament favorites with a stunning 3-0 sweep in the quarterfinals.',
      date: 'August 16, 2025',
      category: 'Upsets',
      tournamentId: 'league-of-legends-world-championship-2024',
      author: 'Tournament Reporter',
      content: 'In one of the biggest upsets in World Championship history, Gen.G completely dominated the series with superior drafting and execution.',
      tags: ['Gen.G', 'Upset', 'Quarterfinals'],
      imageUrl: '/assets/news/geng-upset.jpg'
    },
    {
      id: 'lol-wc-003',
      title: 'New Meta Champions Emerge in Group Stage',
      description: 'Unexpected champion picks have shaken up the competitive meta during the group stage.',
      date: 'August 14, 2025',
      category: 'Meta Analysis',
      tournamentId: 'league-of-legends-world-championship-2024',
      author: 'Meta Expert',
      content: 'Teams have been experimenting with off-meta picks, leading to exciting games and new strategic approaches to the game.',
      tags: ['Meta', 'Champions', 'Strategy'],
      imageUrl: '/assets/news/meta-shift.jpg'
    }
  ],

  // League of Legends - LCS Spring 2024
  'league-of-legends-lcs-spring-2024': [
    {
      id: 'lol-lcs-001',
      title: 'Spring Split Finals Set for This Weekend',
      description: 'The LCS Spring Split finals will feature T1 vs Gen.G in a highly anticipated matchup.',
      date: 'April 12, 2024',
      category: 'Finals Preview',
      tournamentId: 'league-of-legends-lcs-spring-2024',
      author: 'LCS Reporter',
      content: 'Both teams have shown exceptional form throughout the split, making this finals matchup one for the ages.',
      tags: ['LCS', 'Finals', 'T1', 'Gen.G'],
      imageUrl: '/assets/news/lcs-finals.jpg'
    },
    {
      id: 'lol-lcs-002',
      title: 'Rookie Player Makes LCS Debut Impact',
      description: 'A new rookie mid laner has taken the LCS by storm with incredible performances.',
      date: 'April 10, 2024',
      category: 'Player Spotlight',
      tournamentId: 'league-of-legends-lcs-spring-2024',
      author: 'Player Analyst',
      content: 'The young talent has already drawn comparisons to legendary players with their aggressive playstyle and clutch performances.',
      tags: ['Rookie', 'Player Spotlight', 'LCS'],
      imageUrl: '/assets/news/rookie-debut.jpg'
    }
  ],

  // Counter-Strike 2 - Major 2024
  'counter-strike-2-major-championship-2024': [
    {
      id: 'cs2-major-001',
      title: 'NAVI Reaches Major Finals',
      description: 'NAVI secured their spot in the Major finals with a dominant performance.',
      date: 'December 16, 2024',
      category: 'Major Finals',
      tournamentId: 'counter-strike-2-major-championship-2024',
      author: 'CS2 Reporter',
      content: 's1mple led NAVI to victory with incredible AWP plays and clutch moments throughout the playoffs.',
      tags: ['NAVI', 'Major', 's1mple', 'Finals'],
      imageUrl: '/assets/news/navi-major.jpg'
    },
    {
      id: 'cs2-major-002',
      title: 'G2 Eliminated in Semifinals',
      description: 'G2 fell short in the semifinals despite a strong tournament performance.',
      date: 'December 15, 2024',
      category: 'Semifinals',
      tournamentId: 'counter-strike-2-major-championship-2024',
      author: 'CS2 Analyst',
      content: 'G2 showed great promise but ultimately fell to the eventual champions in a close 2-1 series.',
      tags: ['G2', 'Semifinals', 'Elimination'],
      imageUrl: '/assets/news/g2-eliminated.jpg'
    }
  ],

  // Counter-Strike 2 - BLAST Premier
  'counter-strike-2-blast-premier-2024': [
    {
      id: 'cs2-blast-001',
      title: 'BLAST Premier Spring Finals Preview',
      description: 'The BLAST Premier Spring Finals feature the top 8 teams competing for $425,000.',
      date: 'March 22, 2024',
      category: 'Tournament Preview',
      tournamentId: 'counter-strike-2-blast-premier-2024',
      author: 'BLAST Reporter',
      content: 'The tournament promises exciting matchups with the world\'s best CS2 teams.',
      tags: ['BLAST', 'Spring Finals', 'Preview'],
      imageUrl: '/assets/news/blast-preview.jpg'
    }
  ],

  // Valorant - Champions 2024
  'valorant-champions-2024': [
    {
      id: 'val-champions-001',
      title: 'Sentinels Win Champions 2024',
      description: 'Sentinels claimed the Champions 2024 title with a dominant performance.',
      date: 'December 18, 2024',
      category: 'Champions Winner',
      tournamentId: 'valorant-champions-2024',
      author: 'Valorant Reporter',
      content: 'TenZ led Sentinels to victory with incredible individual plays and team coordination.',
      tags: ['Sentinels', 'Champions', 'TenZ', 'Winner'],
      imageUrl: '/assets/news/sentinels-champions.jpg'
    },
    {
      id: 'val-champions-002',
      title: 'New Agent Meta Emerges at Champions',
      description: 'Unexpected agent picks have dominated the Champions meta.',
      date: 'December 17, 2024',
      category: 'Meta Analysis',
      tournamentId: 'valorant-champions-2024',
      author: 'Meta Expert',
      content: 'Teams have found success with off-meta agent compositions, changing the competitive landscape.',
      tags: ['Meta', 'Agents', 'Champions'],
      imageUrl: '/assets/news/valorant-meta.jpg'
    }
  ],

  // Valorant - Masters Madrid
  'valorant-vct-masters-madrid-2024': [
    {
      id: 'val-madrid-001',
      title: 'Masters Madrid Finals Set',
      description: 'The Masters Madrid finals will feature Sentinels vs Fnatic.',
      date: 'March 22, 2024',
      category: 'Madrid Finals',
      tournamentId: 'valorant-vct-masters-madrid-2024',
      author: 'VCT Reporter',
      content: 'Two of the best teams in the world will face off for the Masters Madrid title.',
      tags: ['Madrid', 'Masters', 'Sentinels', 'Fnatic'],
      imageUrl: '/assets/news/madrid-finals.jpg'
    }
  ],

  // Dota 2 - The International 2024
  'the-international-2024': [
    {
      id: 'dota-ti-001',
      title: 'Team Spirit Wins The International 2024',
      description: 'Team Spirit claimed their second TI title with an incredible lower bracket run.',
      date: 'December 14, 2024',
      category: 'TI Champion',
      tournamentId: 'the-international-2024',
      author: 'Dota 2 Reporter',
      content: 'Yatoro led Team Spirit through an unforgettable lower bracket journey to claim the Aegis.',
      tags: ['Team Spirit', 'TI', 'Champion', 'Yatoro'],
      imageUrl: '/assets/news/team-spirit-ti.jpg'
    },
    {
      id: 'dota-ti-002',
      title: 'Record-Breaking Prize Pool at TI 2024',
      description: 'The International 2024 featured the largest prize pool in esports history.',
      date: 'December 13, 2024',
      category: 'Prize Pool',
      tournamentId: 'the-international-2024',
      author: 'Dota 2 Analyst',
      content: 'The $15M+ prize pool shattered previous records, showcasing Dota 2\'s continued growth.',
      tags: ['TI', 'Prize Pool', 'Record'],
      imageUrl: '/assets/news/ti-prize-pool.jpg'
    }
  ],

  // Dota 2 - DreamLeague
  'dota-2-dreamleague-season-23': [
    {
      id: 'dota-dl-001',
      title: 'DreamLeague Season 23 Finals Preview',
      description: 'The DreamLeague finals feature the top 8 teams competing for $400,000.',
      date: 'February 28, 2024',
      category: 'DreamLeague Finals',
      tournamentId: 'dota-2-dreamleague-season-23',
      author: 'DreamLeague Reporter',
      content: 'Western European teams look to dominate the DreamLeague finals.',
      tags: ['DreamLeague', 'Finals', 'Preview'],
      imageUrl: '/assets/news/dreamleague-preview.jpg'
    }
  ],

  // Overwatch 2 - OWCS Championship
  'overwatch-2-owcs-championship-2024': [
    {
      id: 'ow2-champ-001',
      title: 'Shanghai Dragons Win OWCS Championship',
      description: 'Shanghai Dragons claimed the OWCS Championship title with dominant play.',
      date: 'September 20, 2024',
      category: 'OWCS Champion',
      tournamentId: 'overwatch-2-owcs-championship-2024',
      author: 'OW Reporter',
      content: 'The Dragons showcased exceptional coordination and individual skill throughout the tournament.',
      tags: ['Shanghai Dragons', 'OWCS', 'Champion'],
      imageUrl: '/assets/news/dragons-champion.jpg'
    }
  ],

  // Overwatch 2 - League Championship
  'overwatch-league-championship-2024': [
    {
      id: 'ow2-league-001',
      title: 'Overwatch League Championship Preview',
      description: 'The OWL Championship features the top 12 teams competing for $1.5M.',
      date: 'December 19, 2024',
      category: 'OWL Championship',
      tournamentId: 'overwatch-league-championship-2024',
      author: 'OWL Reporter',
      content: 'The championship promises to be the most competitive Overwatch tournament of the year.',
      tags: ['OWL', 'Championship', 'Preview'],
      imageUrl: '/assets/news/owl-championship.jpg'
    }
  ],

  // StarCraft II - WCS Global Finals
  'starcraft-ii-wcs-global-finals-2024': [
    {
      id: 'sc2-wcs-001',
      title: 'Serral Wins WCS Global Finals',
      description: 'Serral claimed his third WCS Global Finals title with dominant Zerg play.',
      date: 'December 21, 2024',
      category: 'WCS Champion',
      tournamentId: 'starcraft-ii-wcs-global-finals-2024',
      author: 'SC2 Reporter',
      content: 'The Finnish Zerg player showcased why he is considered the greatest SC2 player of all time.',
      tags: ['Serral', 'WCS', 'Champion', 'Zerg'],
      imageUrl: '/assets/news/serral-wcs.jpg'
    }
  ],

  // StarCraft II - GSL Code S
  'starcraft-ii-gsl-code-s-2024': [
    {
      id: 'sc2-gsl-001',
      title: 'GSL Code S Season 1 Finals Preview',
      description: 'The GSL Code S finals will feature the best Korean SC2 players.',
      date: 'April 18, 2024',
      category: 'GSL Finals',
      tournamentId: 'starcraft-ii-gsl-code-s-2024',
      author: 'GSL Reporter',
      content: 'Korean StarCraft at its finest with the world\'s best players competing.',
      tags: ['GSL', 'Code S', 'Finals', 'Korea'],
      imageUrl: '/assets/news/gsl-finals.jpg'
    }
  ]
}

// Helper functions
export const getTournamentNews = (tournamentId: string): TournamentNewsItem[] => {
  return tournamentNews[tournamentId] || []
}

export const getLatestTournamentNews = (tournamentId: string, limit: number = 3): TournamentNewsItem[] => {
  const news = getTournamentNews(tournamentId)
  return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit)
}
