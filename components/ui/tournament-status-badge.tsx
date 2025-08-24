import { cn } from "@/lib/utils"

export type TournamentStatus = "LIVE" | "UPCOMING" | "ACTIVE" | "REGISTRATION" | "COMPLETED"

interface TournamentStatusBadgeProps {
  status: TournamentStatus
  className?: string
  size?: "sm" | "md" | "lg"
  animate?: boolean
}

const statusConfig: Record<TournamentStatus, { bg: string; text: string }> = {
  LIVE: { bg: "bg-gradient-to-r from-[#EF4444] to-[#DC2626]", text: "LIVE" },
  UPCOMING: { bg: "bg-gradient-to-r from-[#F59E0B] to-[#D97706]", text: "UPCOMING" },
  ACTIVE: { bg: "bg-gradient-to-r from-[#ED3A94] to-[#AF3DF1]", text: "ACTIVE" },
  REGISTRATION: { bg: "bg-gradient-to-r from-[#10B981] to-[#059669]", text: "REGISTRATION" },
  COMPLETED: { bg: "bg-gradient-to-r from-[#6B7280] to-[#4B5563]", text: "COMPLETED" },
}

const sizeConfig = {
  sm: "px-2 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
}

export function TournamentStatusBadge({ 
  status, 
  className, 
  size = "md",
  animate = false 
}: TournamentStatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <div 
      className={cn(
        config.bg,
        sizeConfig[size],
        "rounded-xl shadow-lg flex items-center justify-center",
        animate && status === "LIVE" && "animate-pulse",
        className
      )}
      style={{
        boxShadow: status === "LIVE" 
          ? "0px 6.49px 19.46px rgba(239, 68, 68, 0.4)"
          : status === "UPCOMING"
          ? "0px 6.49px 19.46px rgba(245, 158, 11, 0.4)"
          : undefined
      }}
    >
      <span className="text-white font-semibold text-center">
        {config.text}
      </span>
    </div>
  )
}
