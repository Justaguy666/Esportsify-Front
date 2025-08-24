"use client"

import { Bell, Trophy, Clock, X, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Notification } from "@/hooks/use-notifications"

interface NotificationDropdownProps {
  notifications: Notification[]
  isOpen: boolean
  unreadCount: number
  onClose: () => void
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onRemove: (id: string) => void
  onClearAll: () => void
}

export function NotificationDropdown({ 
  notifications, 
  isOpen, 
  unreadCount,
  onClose, 
  onMarkAsRead, 
  onMarkAllAsRead,
  onRemove,
  onClearAll
}: NotificationDropdownProps) {
  if (!isOpen) {
    return null
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return timestamp.toLocaleDateString()
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'match_score':
        return <Trophy className="w-4 h-4" />
      case 'match_starting':
        return <Clock className="w-4 h-4" />
      case 'tournament_update':
        return <Bell className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'match_score':
        return 'from-[#00E0FF] to-[#3D5AF1]'
      case 'match_starting':
        return 'from-[#FF6B6B] to-[#FF8E53]'
      case 'tournament_update':
        return 'from-[#4ECDC4] to-[#44A08D]'
      default:
        return 'from-[#3D5AF1] to-[#7C3AED]'
    }
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-[#1A1A2E] border border-[#3D5AF1]/50 rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#3D5AF1]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#3D5AF1]" />
            <h3 className="text-white font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-[#FF6B6B] text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-[#A5B4FC] hover:text-white hover:bg-[#3D5AF1]/20 text-xs"
              >
                <CheckCheck className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-[#A5B4FC] hover:text-white hover:bg-[#3D5AF1]/20 w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center">
            <Bell className="w-12 h-12 mx-auto mb-3 text-[#A5B4FC]/50" />
            <p className="text-[#A5B4FC]/70 text-sm">No notifications yet</p>
            <p className="text-[#A5B4FC]/50 text-xs mt-1">
              Follow tournaments to get match updates
            </p>
          </div>
        ) : (
          <div className="p-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg mb-2 transition-all duration-200 hover:bg-[#2A2A4A]/50 group ${
                  !notification.isRead ? 'bg-[#3D5AF1]/10 border-l-2 border-[#3D5AF1]' : ''
                }`}
                onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${getNotificationColor(notification.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-sm ${!notification.isRead ? 'text-white' : 'text-[#A5B4FC]'}`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[#A5B4FC]/70">
                          {formatTime(notification.timestamp)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            onRemove(notification.id)
                          }}
                          className="opacity-0 group-hover:opacity-100 w-6 h-6 text-[#A5B4FC]/70 hover:text-white hover:bg-[#FF6B6B]/20"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className={`text-sm mt-1 ${!notification.isRead ? 'text-[#A5B4FC]' : 'text-[#A5B4FC]/70'}`}>
                      {notification.message}
                    </p>
                    
                    <p className="text-xs text-[#A5B4FC]/50 mt-1">
                      {notification.tournamentName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t border-[#3D5AF1]/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="w-full text-[#A5B4FC] hover:text-white hover:bg-[#3D5AF1]/20 text-xs"
          >
            Clear all notifications
          </Button>
        </div>
      )}
    </div>
  )
}
