import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TournamentStatusBadge, TournamentStatus } from "@/components/ui/tournament-status-badge"
import { cn } from "@/lib/utils"
import { Calendar, DollarSign, Users, Trophy } from "lucide-react"

interface TournamentCardProps {
  title: string
  game: string
  gameLogo?: string
  status: TournamentStatus
  prizePool?: string
  startDate?: string
  endDate?: string
  participants?: number
  maxParticipants?: number
  description?: string
  className?: string
  compact?: boolean
  onClick?: () => void
}

export function TournamentCard({
  title,
  game,
  gameLogo,
  status,
  prizePool,
  startDate,
  endDate,
  participants,
  maxParticipants,
  description,
  className,
  compact = false,
  onClick
}: TournamentCardProps) {
  const isClickable = !!onClick
  
  return (
    <div 
      className={cn(
        "bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200",
        isClickable && "hover:shadow-lg hover:scale-[1.02] cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className={cn("p-4", compact && "p-3")}>
        <div className="flex items-start gap-3 mb-3">
          <Avatar className={cn("rounded-xl", compact ? "w-10 h-10" : "w-12 h-12")}>
            <AvatarImage src={gameLogo} alt={`${game} logo`} />
            <AvatarFallback className="rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold">
              {game.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-semibold text-gray-900 line-clamp-2",
              compact ? "text-sm" : "text-base"
            )}>
              {title}
            </h3>
            <Badge variant="outline" className={cn(
              "mt-1",
              compact ? "text-xs" : "text-sm"
            )}>
              {game}
            </Badge>
          </div>
          
          <TournamentStatusBadge 
            status={status} 
            size={compact ? "sm" : "md"}
            animate={status === "LIVE"}
          />
        </div>
        
        {description && !compact && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {description}
          </p>
        )}
      </div>
      
      {/* Stats */}
      <div className="px-4 pb-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {prizePool && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-xs text-gray-500", compact && "text-[10px]")}>
                  Prize Pool
                </p>
                <p className={cn("font-semibold text-gray-900 truncate", compact ? "text-xs" : "text-sm")}>
                  {prizePool}
                </p>
              </div>
            </div>
          )}
          
          {(participants !== undefined || maxParticipants !== undefined) && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-xs text-gray-500", compact && "text-[10px]")}>
                  Teams
                </p>
                <p className={cn("font-semibold text-gray-900", compact ? "text-xs" : "text-sm")}>
                  {participants !== undefined && maxParticipants !== undefined 
                    ? `${participants}/${maxParticipants}`
                    : participants !== undefined 
                    ? participants 
                    : maxParticipants
                  }
                </p>
              </div>
            </div>
          )}
        </div>
        
        {(startDate || endDate) && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn("text-xs text-gray-500", compact && "text-[10px]")}>
                Duration
              </p>
              <p className={cn("font-semibold text-gray-900 truncate", compact ? "text-xs" : "text-sm")}>
                {startDate && endDate 
                  ? `${startDate} - ${endDate}`
                  : startDate || endDate
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
