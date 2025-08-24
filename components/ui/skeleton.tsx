import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "rectangular"
  animation?: "pulse" | "wave" | "none"
}

function Skeleton({ 
  className,
  variant = "default",
  animation = "pulse",
  ...props 
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200",
        animation === "pulse" && "animate-pulse",
        animation === "wave" && "animate-pulse bg-[length:200%_100%]",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-md",
        variant === "default" && "rounded",
        className
      )}
      {...props}
    />
  )
}

// Specialized skeleton components
function CardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 space-y-4", className)} {...props}>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-20 w-full" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  )
}

function TournamentCardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-white rounded-2xl border border-gray-200 p-4 space-y-4", className)} {...props}>
      <div className="flex items-start gap-3">
        <Skeleton variant="rectangular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton variant="rectangular" className="h-6 w-20" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <Skeleton variant="rectangular" className="w-8 h-8" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-2 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton variant="rectangular" className="w-8 h-8" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-2 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton variant="rectangular" className="w-8 h-8" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-2 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}

function MatchCardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-white rounded-2xl border border-gray-200 p-4 space-y-3", className)} {...props}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton variant="rectangular" className="h-6 w-16" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" className="w-10 h-10" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-6" />
      </div>
      
      <div className="flex justify-center">
        <Skeleton variant="rectangular" className="h-6 w-12" />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" className="w-10 h-10" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-6" />
      </div>
      
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <Skeleton variant="circular" className="w-4 h-4" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton variant="circular" className="w-4 h-4" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  )
}

function TeamCardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-white rounded-2xl border border-gray-200 p-4 space-y-3", className)} {...props}>
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton variant="rectangular" className="h-4 w-12" />
            <Skeleton variant="rectangular" className="h-4 w-8" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ListSkeleton({ 
  count = 3, 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { count?: number }) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}

export { 
  Skeleton, 
  CardSkeleton, 
  TournamentCardSkeleton, 
  MatchCardSkeleton, 
  TeamCardSkeleton, 
  ListSkeleton 
}
