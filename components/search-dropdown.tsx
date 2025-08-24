"use client"

import { useRouter } from "next/navigation"
import { Search, Gamepad2, Trophy } from "lucide-react"
import { SearchResult } from "@/hooks/use-global-search"

interface SearchDropdownProps {
  searchResults: SearchResult[]
  isOpen: boolean
  onClose: () => void
  onSelect: (result: SearchResult) => void
}

export function SearchDropdown({ searchResults, isOpen, onClose, onSelect }: SearchDropdownProps) {
  const router = useRouter()

  if (!isOpen || searchResults.length === 0) {
    return null
  }

  const handleSelect = (result: SearchResult) => {
    onSelect(result)
    router.push(result.path)
    onClose()
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A2E] border border-[#3D5AF1]/50 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        {searchResults.map((result) => (
          <div
            key={result.id}
            className="relative flex items-center gap-3 p-3 rounded-lg hover:bg-[#2A2A4A]/50 cursor-pointer transition-all duration-200 ease-in-out group"
            onClick={() => handleSelect(result)}
            title={result.name}
          >
            <div className="flex-shrink-0">
              {result.type === 'game' ? (
                <div className="w-10 h-10 bg-gradient-to-r from-[#3D5AF1] to-[#7C3AED] rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-[#00E0FF] to-[#3D5AF1] rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-white font-medium text-sm truncate group-hover:text-[#00E0FF] transition-colors">
                  {result.name}
                </h4>
                <span className="text-xs px-2 py-1 rounded-full bg-[#3D5AF1]/20 text-[#A5B4FC] capitalize">
                  {result.type}
                </span>
              </div>
              
              {result.type === 'tournament' && result.game && (
                <p className="text-[#A5B4FC] text-xs mt-1">
                  {result.game}
                </p>
              )}
            </div>

            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Search className="w-4 h-4 text-[#A5B4FC]" />
            </div>

          </div>
        ))}
      </div>
      
      {searchResults.length === 0 && (
        <div className="p-4 text-center text-[#A5B4FC]/70">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No results found</p>
        </div>
      )}
    </div>
  )
}
