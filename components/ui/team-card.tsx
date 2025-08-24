import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TeamMember {
  name: string
  role: string
  avatar?: string
}

interface TeamCardProps {
  name: string
  logo?: string
  region?: string
  rank?: number
  members?: TeamMember[]
  className?: string
  compact?: boolean
  showMembers?: boolean
}

export function TeamCard({ 
  name, 
  logo, 
  region, 
  rank, 
  members = [],
  className,
  compact = false,
  showMembers = false
}: TeamCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200",
      compact && "p-3",
      className
    )}>
      <div className="flex items-center gap-3 mb-3">
        <Avatar className={cn("rounded-xl", compact ? "w-8 h-8" : "w-12 h-12")}>
          <AvatarImage src={logo} alt={`${name} logo`} />
          <AvatarFallback className="rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-semibold text-gray-900 truncate",
            compact ? "text-sm" : "text-base"
          )}>
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {region && (
              <Badge variant="outline" className={cn(
                "text-xs",
                compact && "text-[10px] px-1"
              )}>
                {region}
              </Badge>
            )}
            {rank && (
              <Badge className={cn(
                "bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs",
                compact && "text-[10px] px-1"
              )}>
                #{rank}
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      {showMembers && members.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Members</h4>
          <div className="grid gap-2">
            {members.map((member, index) => (
              <div key={index} className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
