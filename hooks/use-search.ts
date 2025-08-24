import { useState, useMemo } from "react"
import { useDebouncedValue } from "@/lib/performance"

interface UseSearchOptions<T> {
  searchFields: (keyof T)[]
  debounceMs?: number
  caseSensitive?: boolean
  minSearchLength?: number
}

export function useSearch<T>(
  data: T[],
  options: UseSearchOptions<T>
) {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebouncedValue(searchTerm, options.debounceMs || 300)
  
  const filteredData = useMemo(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < (options.minSearchLength || 1)) {
      return data
    }
    
    const term = options.caseSensitive 
      ? debouncedSearchTerm 
      : debouncedSearchTerm.toLowerCase()
    
    return data.filter(item => {
      return options.searchFields.some(field => {
        const fieldValue = item[field]
        if (typeof fieldValue !== 'string') return false
        
        const value = options.caseSensitive 
          ? fieldValue 
          : fieldValue.toLowerCase()
          
        return value.includes(term)
      })
    })
  }, [data, debouncedSearchTerm, options.searchFields, options.caseSensitive, options.minSearchLength])
  
  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    isSearching: searchTerm !== debouncedSearchTerm,
    hasResults: filteredData.length > 0,
    resultCount: filteredData.length
  }
}

// Specialized search hooks
export function useTournamentSearch<T extends { name: string; game: string; description: string }>(
  tournaments: T[]
) {
  return useSearch(tournaments, {
    searchFields: ['name', 'game', 'description'],
    debounceMs: 300,
    caseSensitive: false,
    minSearchLength: 2
  })
}

export function useTeamSearch<T extends { name: string }>(teams: T[]) {
  return useSearch(teams, {
    searchFields: ['name'],
    debounceMs: 300,
    caseSensitive: false,
    minSearchLength: 1
  })
}

// Multi-filter hook
interface UseMultiFilterOptions<T> {
  filters: {
    [K in keyof T]?: (value: T[K]) => boolean
  }
  searchOptions?: UseSearchOptions<T>
}

export function useMultiFilter<T>(
  data: T[],
  options: UseMultiFilterOptions<T>
) {
  const [filters, setFilters] = useState<{ [K in keyof T]?: any }>({})
  
  const searchResult = options.searchOptions 
    ? useSearch(data, options.searchOptions)
    : { filteredData: data, searchTerm: "", setSearchTerm: () => {}, isSearching: false, hasResults: true, resultCount: data.length }
  
  const filteredData = useMemo(() => {
    return searchResult.filteredData.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === null || value === "") return true
        
        const filterFn = options.filters[key as keyof T]
        if (filterFn) {
          return filterFn(item[key as keyof T])
        }
        
        return item[key as keyof T] === value
      })
    })
  }, [searchResult.filteredData, filters, options.filters])
  
  const setFilter = <K extends keyof T>(key: K, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }
  
  const clearFilter = <K extends keyof T>(key: K) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      delete newFilters[key]
      return newFilters
    })
  }
  
  const clearAllFilters = () => {
    setFilters({})
  }
  
  return {
    ...searchResult,
    filteredData,
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters: Object.keys(filters).length > 0
  }
}
