"use client"

import { useState, useEffect } from "react"
import { tournaments } from "@/data/tournaments"
import { useFavorites } from "./use-favorites"
import { notificationMatches } from "@/data/notifications"

export interface Notification {
  id: string
  type: 'match_score' | 'match_starting' | 'tournament_update'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  tournamentId: string
  tournamentName: string
  matchId: string
}

// Use centralized notification matches data
const mockMatches = notificationMatches

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set())
  const [clearedNotifications, setClearedNotifications] = useState<Set<string>>(new Set())
  const { getFavoritesByType } = useFavorites()

  // Load read and cleared notifications from localStorage
  useEffect(() => {
    const savedReadNotifications = localStorage.getItem('readNotifications')
    if (savedReadNotifications) {
      setReadNotifications(new Set(JSON.parse(savedReadNotifications)))
    }
    
    const savedClearedNotifications = localStorage.getItem('clearedNotifications')
    if (savedClearedNotifications) {
      setClearedNotifications(new Set(JSON.parse(savedClearedNotifications)))
    }
  }, [])

  // Save read notifications to localStorage
  const saveReadNotifications = (readSet: Set<string>) => {
    localStorage.setItem('readNotifications', JSON.stringify(Array.from(readSet)))
  }

  // Save cleared notifications to localStorage
  const saveClearedNotifications = (clearedSet: Set<string>) => {
    localStorage.setItem('clearedNotifications', JSON.stringify(Array.from(clearedSet)))
  }

  // Initialize notifications based on followed tournaments
  useEffect(() => {
    const initializeNotifications = () => {
      const favorites = getFavoritesByType("tournament")
      
      if (favorites.length === 0) {
        setNotifications([])
        return
      }

      const realNotifications: Notification[] = []

      favorites.forEach((favorite: any) => {
        const tournament = tournaments.find(t => t.id === favorite.id)
        if (!tournament) return

        const now = new Date()
        const startDate = new Date(tournament.startDate)
        const endDate = new Date(tournament.endDate)

        // Tournament starting soon notification
        if (tournament.status === 'UPCOMING') {
          const timeDiff = startDate.getTime() - now.getTime()
          const daysUntilStart = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
          
          if (daysUntilStart <= 7 && daysUntilStart > 0) {
            const notificationId = `tournament-starting-${tournament.id}`
            if (!clearedNotifications.has(notificationId)) {
              realNotifications.push({
                id: notificationId,
                type: 'match_starting',
                title: 'Tournament Starting Soon',
                message: `${tournament.name} starts in ${daysUntilStart} day${daysUntilStart > 1 ? 's' : ''}`,
                timestamp: new Date(now.getTime() - 30 * 60 * 1000),
                isRead: readNotifications.has(notificationId),
                tournamentId: tournament.id,
                tournamentName: tournament.name,
                matchId: ''
              })
            }
          }
        }

        // Live tournament notification
        if (tournament.status === 'LIVE') {
          const notificationId = `tournament-live-${tournament.id}`
          if (!clearedNotifications.has(notificationId)) {
            realNotifications.push({
              id: notificationId,
              type: 'match_score',
              title: 'Tournament Live Now',
              message: `${tournament.name} is currently live!`,
              timestamp: new Date(now.getTime() - 60 * 60 * 1000),
              isRead: readNotifications.has(notificationId),
              tournamentId: tournament.id,
              tournamentName: tournament.name,
              matchId: ''
            })
          }
        }

        // Registration deadline notification
        if (tournament.status === 'REGISTRATION' && tournament.registrationDeadline) {
          const deadlineDate = new Date(tournament.registrationDeadline)
          const timeTillDeadline = deadlineDate.getTime() - now.getTime()
          const daysUntilDeadline = Math.ceil(timeTillDeadline / (1000 * 60 * 60 * 24))
          
          if (daysUntilDeadline <= 3 && daysUntilDeadline > 0) {
            const notificationId = `registration-deadline-${tournament.id}`
            if (!clearedNotifications.has(notificationId)) {
              realNotifications.push({
                id: notificationId,
                type: 'match_starting',
                title: 'Registration Deadline Soon',
                message: `Registration for ${tournament.name} ends in ${daysUntilDeadline} day${daysUntilDeadline > 1 ? 's' : ''}`,
                timestamp: new Date(now.getTime() - 45 * 60 * 1000),
                isRead: readNotifications.has(notificationId),
                tournamentId: tournament.id,
                tournamentName: tournament.name,
                matchId: ''
              })
            }
          }
        }
      })

      // Sort by timestamp and limit
      const sortedNotifications = realNotifications
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 5)

      setNotifications(sortedNotifications)
    }

    initializeNotifications()
  }, [readNotifications, clearedNotifications]) // Re-run when readNotifications or clearedNotifications changes

  const markAsRead = (notificationId: string) => {
    const newReadNotifications = new Set(readNotifications)
    newReadNotifications.add(notificationId)
    setReadNotifications(newReadNotifications)
    saveReadNotifications(newReadNotifications)
    
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    const allNotificationIds = notifications.map(n => n.id)
    const newReadNotifications = new Set([...readNotifications, ...allNotificationIds])
    setReadNotifications(newReadNotifications)
    saveReadNotifications(newReadNotifications)
    
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const removeNotification = (notificationId: string) => {
    const newClearedNotifications = new Set(clearedNotifications)
    newClearedNotifications.add(notificationId)
    setClearedNotifications(newClearedNotifications)
    saveClearedNotifications(newClearedNotifications)
    
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    )
  }

  const clearAllNotifications = () => {
    const allNotificationIds = notifications.map(n => n.id)
    const newClearedNotifications = new Set([...clearedNotifications, ...allNotificationIds])
    setClearedNotifications(newClearedNotifications)
    saveClearedNotifications(newClearedNotifications)
    
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return {
    notifications,
    unreadCount,
    isOpen,
    setIsOpen,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    hasNotifications: notifications.length > 0
  }
}
