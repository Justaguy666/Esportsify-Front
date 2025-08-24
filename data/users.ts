// User data management for Esportsify

import { getMatchesByTournament } from './schedules'
import type { MatchSchedule } from './schedules'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: string
  notifications: {
    matchReminders: boolean
    tournamentUpdates: boolean
    teamNews: boolean
    playerTransfers: boolean
  }
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private'
    showActivity: boolean
    allowMessages: boolean
  }
}

export interface UserProfile {
  id: string
  username: string
  email: string
  displayName: string
  avatar?: string
  bio?: string
  country?: string
  timezone?: string
  joinDate: Date
  lastActive: Date
  preferences: UserPreferences
  favoriteTeams: string[] // team IDs
  favoritePlayers: string[] // player IDs
  favoriteGames: string[] // game names
  followedTournaments: string[] // tournament IDs
  bookmarks: {
    matches: string[] // match IDs
    articles: string[] // article IDs
    videos: string[] // video IDs
  }
  achievements: {
    id: string
    title: string
    description: string
    icon: string
    unlockedDate: Date
  }[]
  stats: {
    predictions: {
      total: number
      correct: number
      accuracy: number
    }
    votes: number
    comments: number
    likes: number
  }
}

export interface UserActivity {
  id: string
  userId: string
  type: 'tournament_follow' 
  targetId: string
  targetType: string
  timestamp: Date
  metadata?: Record<string, any>
}

// Mock user data
export const mockUser: UserProfile = {
  id: 'user-001',
  username: 'esportsfan2024',
  email: 'fan@esportsify.com',
  displayName: 'Esports Enthusiast',
  avatar: '/assets/avatars/default-avatar.png',
  bio: 'Passionate esports fan following League of Legends and Valorant tournaments',
  country: 'US',
  timezone: 'America/New_York',
  joinDate: new Date('2024-01-15'),
  lastActive: new Date(),
  preferences: {
    theme: 'dark',
    language: 'en',
    notifications: {
      matchReminders: true,
      tournamentUpdates: true,
      teamNews: true,
      playerTransfers: false
    },
    privacy: {
      profileVisibility: 'public',
      showActivity: true,
      allowMessages: true
    }
  },
  favoriteTeams: ['t1', 'g2', 'sentinels'],
  favoritePlayers: ['faker', 'tenz', 'caps'],
  favoriteGames: ['League of Legends', 'Valorant', 'Counter-Strike 2'],
  followedTournaments: [
    'lck-spring-2024',
    'lpl-spring-2024',
    'vct-champions-2024',
    'iem-katowice-2024'
  ],
  bookmarks: {
    matches: ['match-1', 'match-2'],
    articles: ['article-001', 'article-002'],
    videos: ['video-001', 'video-002']
  },
  achievements: [
    {
      id: 'first-prediction',
      title: 'First Prediction',
      description: 'Made your first match prediction',
      icon: '🎯',
      unlockedDate: new Date('2024-01-20')
    },
    {
      id: 'tournament-follower',
      title: 'Tournament Follower',
      description: 'Following 5+ tournaments',
      icon: '🏆',
      unlockedDate: new Date('2024-02-15')
    }
  ],
  stats: {
    predictions: {
      total: 45,
      correct: 28,
      accuracy: 62.2
    },
    votes: 156,
    comments: 89,
    likes: 234
  }
}

// User activity log
export const mockUserActivity: UserActivity[] = [
  {
    id: 'activity-001',
    userId: 'user-001',
    type: 'tournament_follow',
    targetId: 'league-of-legends-world-championship-2024',
    targetType: 'tournament',
    timestamp: new Date('2024-03-15T10:30:00Z')
  }
]

// Helper functions
export const getUserById = (id: string): UserProfile | undefined => {
  // In real app, this would fetch from API/database
  return id === 'user-001' ? mockUser : undefined
}

export const getCurrentUser = (): UserProfile => {
  // In real app, this would get from auth context
  return mockUser
}

export const updateUserPreferences = (
  userId: string, 
  preferences: Partial<UserPreferences>
): UserProfile | undefined => {
  // In real app, this would update in database
  const user = getUserById(userId)
  if (user) {
    user.preferences = { ...user.preferences, ...preferences }
    user.lastActive = new Date()
  }
  return user
}

// Update core profile fields (username, email, displayName, bio, etc.)
export const updateUserProfile = (
  userId: string,
  updates: Partial<Pick<UserProfile, 'username' | 'email' | 'displayName' | 'bio' | 'country' | 'timezone'>>
): UserProfile | undefined => {
  const user = getUserById(userId)
  if (user) {
    if (updates.username !== undefined) user.username = updates.username
    if (updates.email !== undefined) user.email = updates.email
    if (updates.displayName !== undefined) user.displayName = updates.displayName
    if (updates.bio !== undefined) user.bio = updates.bio
    if (updates.country !== undefined) user.country = updates.country
    if (updates.timezone !== undefined) user.timezone = updates.timezone
    user.lastActive = new Date()
  }
  return user
}

// Mock password change (no persistence beyond success flag)
export const updateUserPassword = (
  userId: string,
  _currentPassword: string,
  _newPassword: string
): boolean => {
  // In a real app this would verify current password and hash/store the new one
  const user = getUserById(userId)
  if (!user) return false
  user.lastActive = new Date()
  return true
}

export const getUserActivity = (userId: string): UserActivity[] => {
  // In real app, this would fetch from database
  return userId === 'user-001' ? mockUserActivity : []
}

export const createUserActivity = (
  userId: string,
  type: UserActivity['type'],
  targetId: string,
  targetType: string,
  metadata?: Record<string, any>
): UserActivity => {
  const activity = {
    id: `activity-${Date.now()}`,
    userId,
    type,
    targetId,
    targetType,
    timestamp: new Date(),
    ...(metadata !== undefined ? { metadata } : {})
  } as UserActivity
  
  // In real app, this would save to database
  mockUserActivity.unshift(activity)
  return activity
}

// Follow/Unfollow tournaments
export const followTournament = (userId: string, tournamentId: string): boolean => {
  const user = getUserById(userId)
  if (!user) return false
  if (!user.followedTournaments.includes(tournamentId)) {
    user.followedTournaments.push(tournamentId)
    createUserActivity(userId, 'tournament_follow', tournamentId, 'tournament')
    return true
  }
  return false
}

export const unfollowTournament = (userId: string, tournamentId: string): boolean => {
  const user = getUserById(userId)
  if (!user) return false
  const idx = user.followedTournaments.indexOf(tournamentId)
  if (idx > -1) {
    user.followedTournaments.splice(idx, 1)
    return true
  }
  return false
}

export const getUserFollowedTournaments = (userId: string): string[] => {
  const user = getUserById(userId)
  return user ? [...user.followedTournaments] : []
}

// Personalized schedules from followed tournaments
export const getUserSchedule = (userId: string): MatchSchedule[] => {
  const user = getUserById(userId)
  if (!user) return []
  const matches = user.followedTournaments.flatMap((tid) => getMatchesByTournament(tid))
  return matches.sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime())
}

export const getUserUpcomingMatches = (userId: string): MatchSchedule[] => {
  const now = new Date()
  return getUserSchedule(userId)
    .filter((m) => m.status === 'scheduled' && new Date(m.matchDate) >= now)
    .sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime())
}

// Avatar utilities
export const updateUserAvatar = (userId: string, avatarUrl: string): boolean => {
  const user = getUserById(userId)
  if (!user) return false
  user.avatar = avatarUrl
  user.lastActive = new Date()
  return true
}

export const getDisplayAvatar = (user: UserProfile): string => {
  // Use stored avatar or fallback to default asset available in public assets
  return user.avatar || '/assets/user.png'
}

export const getAvatarInitials = (displayName: string): string => {
  const safe = (displayName ?? '').trim()
  if (!safe) return 'U'
  const parts = safe.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'U'
  if (parts.length === 1) {
    const firstPart = parts[0] ?? ''
    return (firstPart.charAt(0) || 'U').toUpperCase()
  }
  const firstPart = parts[0] ?? ''
  const lastPart = parts[parts.length - 1] ?? ''
  const first = firstPart.charAt(0)
  const last = lastPart.charAt(0)
  const initials = `${first}${last}`.trim()
  return (initials || 'U').toUpperCase()
}
