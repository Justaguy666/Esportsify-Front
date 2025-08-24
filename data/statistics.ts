// Centralized statistics data for home page and other components

export interface PlatformStats {
  number: string
  label: string
  color: string
}

export interface GameDisplayNames {
  [key: string]: string
}

export const platformStats: PlatformStats[] = [
  { number: "750K+", label: "Active Players", color: "border-[#3D5AF1]" },
  { number: "15K+", label: "Tournaments", color: "border-[#F59E0B]" },
  { number: "50+", label: "Supported Games", color: "border-[#10B981]" },
]

export const gameDisplayNames: GameDisplayNames = {
  "league-of-legends": "League of Legends",
  "counter-strike-2": "Counter-Strike 2",
  valorant: "Valorant",
  "dota-2": "Dota 2",
  "overwatch-2": "Overwatch 2",
  "starcraft-ii": "StarCraft II",
}

export const tournamentFilters = [
  "All Tournaments", 
  "Live Now", 
  "Upcoming", 
  "Active", 
  "Registration", 
  "Completed", 
  "My Schedule"
]

export function getGameDisplayName(gameSlug: string): string {
  return gameDisplayNames[gameSlug] || "Unknown Game"
}
