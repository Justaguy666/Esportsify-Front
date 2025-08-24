import { useState, useEffect } from "react"

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options?: {
    serialize?: (value: T) => string
    deserialize?: (value: string) => T
  }
) {
  const serialize = options?.serialize || JSON.stringify
  const deserialize = options?.deserialize || JSON.parse

  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? deserialize(item) : defaultValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return defaultValue
    }
  })

  const setStoredValue = (newValue: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue
      setValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serialize(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  const removeValue = () => {
    try {
      setValue(defaultValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }

  // Listen for changes from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key) return

      try {
        if (e.newValue === null) {
          setValue(defaultValue)
        } else {
          setValue(deserialize(e.newValue))
        }
      } catch (error) {
        console.warn(`Error handling storage change for key "${key}":`, error)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, defaultValue, deserialize])

  return [value, setStoredValue, removeValue] as const
}

// Specialized hooks for common data types
export function useLocalStorageString(key: string, defaultValue: string = '') {
  return useLocalStorage(key, defaultValue, {
    serialize: (value) => value,
    deserialize: (value) => value
  })
}

export function useLocalStorageBoolean(key: string, defaultValue: boolean = false) {
  return useLocalStorage(key, defaultValue, {
    serialize: (value) => value.toString(),
    deserialize: (value) => value === 'true'
  })
}

export function useLocalStorageNumber(key: string, defaultValue: number = 0) {
  return useLocalStorage(key, defaultValue, {
    serialize: (value) => value.toString(),
    deserialize: (value) => {
      const parsed = parseFloat(value)
      return isNaN(parsed) ? defaultValue : parsed
    }
  })
}
