import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TournamentStatusBadge, TournamentStatus } from "@/components/ui/tournament-status-badge"
import { cn } from "@/lib/utils"
import { Clock, MapPin } from "lucide-react"

interface Team {
  name: string
  logo?: string
  score?: number
}

interface MatchCardProps {
  team1: Team
  team2: Team
  status: TournamentStatus
  tournament?: string
  time?: string
  venue?: string
  className?: string
  compact?: boolean
  showTournament?: boolean
  onClick?: () => void
}

export function MatchCard({
  team1,
  team2,
  status,
  tournament,
  time,
  venue,
  className,
  compact = false,
  showTournament = true,
  onClick
}: MatchCardProps) {
  const isClickable = !!onClick
  
  return (
    <div 
      className={cn(
        "bg-white rounded-2xl border border-gray-200 p-4 transition-all duration-200",
        isClickable && "hover:shadow-lg hover:scale-[1.02] cursor-pointer",
        compact && "p-3",
        className
      )}
      onClick={onClick}
    >
      {/* Tournament Info */}
      {showTournament && tournament && (
        <div className="flex items-center justify-between mb-3">
          <p className={cn(
            "font-medium text-gray-700 truncate",
            compact ? "text-xs" : "text-sm"
          )}>
            {tournament}
          </p>
          <TournamentStatusBadge 
            status={status} 
            size={compact ? "sm" : "md"}
            animate={status === "LIVE"}
          />
        </div>
      )}
      
      {/* Teams */}
      <div className="space-y-3">
        {/* Team 1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className={cn("rounded-xl", compact ? "w-8 h-8" : "w-10 h-10")}>
              <AvatarImage src={team1.logo} alt={`${team1.name} logo`} />
              <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 text-white font-bold">
                {team1.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className={cn(
              "font-medium text-gray-900 truncate",
              compact ? "text-sm" : "text-base"
            )}>
              {team1.name}
            </span>
          </div>
          {team1.score !== undefined && (
            <div className={cn(
              "font-bold text-gray-900 min-w-[2rem] text-center",
              compact ? "text-lg" : "text-xl"
            )}>
              {team1.score}
            </div>
          )}
        </div>
        
        {/* VS Separator */}
        <div className="flex items-center justify-center">
          <div className={cn(
            "bg-gray-100 text-gray-500 font-semibold px-3 py-1 rounded-full",
            compact ? "text-xs px-2" : "text-sm"
          )}>
            VS
          </div>
        </div>
        
        {/* Team 2 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className={cn("rounded-xl", compact ? "w-8 h-8" : "w-10 h-10")}>
              <AvatarImage src={team2.logo} alt={`${team2.name} logo`} />
              <AvatarFallback className="rounded-xl bg-gradient-to-br from-red-400 to-pink-400 text-white font-bold">
                {team2.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className={cn(
              "font-medium text-gray-900 truncate",
              compact ? "text-sm" : "text-base"
            )}>
              {team2.name}
            </span>
          </div>
          {team2.score !== undefined && (
            <div className={cn(
              "font-bold text-gray-900 min-w-[2rem] text-center",
              compact ? "text-lg" : "text-xl"
            )}>
              {team2.score}
            </div>
          )}
        </div>
      </div>
      
      {/* Match Details */}
      {(time || venue) && (
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
          {time && (
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className={cn("text-xs", compact && "text-[10px]")}>
                {time}
              </span>
            </div>
          )}
          {venue && (
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className={cn("text-xs truncate", compact && "text-[10px]")}>
                {venue}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
