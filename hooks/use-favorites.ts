import { useLocalStorage } from "./use-local-storage"

interface FavoriteItem {
  id: string
  type: "tournament" | "team" | "match"
  name: string
  addedAt: string
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>("esportsify-favorites", [])

  const addFavorite = (item: Omit<FavoriteItem, "addedAt">) => {
    setFavorites(prev => {
      // Check if already exists
      const exists = prev.some(fav => fav.id === item.id && fav.type === item.type)
      if (exists) return prev
      
      const newFavorite: FavoriteItem = {
        ...item,
        addedAt: new Date().toISOString()
      }
      
      return [...prev, newFavorite]
    })
  }

  const removeFavorite = (id: string, type: FavoriteItem["type"]) => {
    setFavorites(prev => prev.filter(fav => !(fav.id === id && fav.type === type)))
  }

  const isFavorite = (id: string, type: FavoriteItem["type"]) => {
    return favorites.some(fav => fav.id === id && fav.type === type)
  }

  const toggleFavorite = (item: Omit<FavoriteItem, "addedAt">) => {
    if (isFavorite(item.id, item.type)) {
      removeFavorite(item.id, item.type)
    } else {
      addFavorite(item)
    }
  }

  const getFavoritesByType = (type: FavoriteItem["type"]) => {
    return favorites.filter(fav => fav.type === type)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    getFavoritesByType,
    clearFavorites
  }
}
