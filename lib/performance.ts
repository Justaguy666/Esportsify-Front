import { useCallback, useRef, useEffect, useState } from "react"

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  
  return function (this: any, ...args: Parameters<T>) {
    const now = new Date().getTime()
    
    if (now - lastCall < delay) {
      return
    }
    
    lastCall = now
    return func.apply(this, args)
  }
}

// React hooks for debounced and throttled functions
export function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  const funcRef = useRef(func)
  
  useEffect(() => {
    funcRef.current = func
  }, [func])
  
  return useCallback(
    debounce((...args: Parameters<T>) => {
      funcRef.current(...args)
    }, delay),
    [delay]
  )
}

export function useThrottle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  const funcRef = useRef(func)
  
  useEffect(() => {
    funcRef.current = func
  }, [func])
  
  return useCallback(
    throttle((...args: Parameters<T>) => {
      funcRef.current(...args)
    }, delay),
    [delay]
  )
}

// Hook for debounced values
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  
  return debouncedValue
}

// Performance monitoring utilities
export function measurePerformance<T>(
  name: string,
  func: () => T
): T {
  const start = performance.now()
  const result = func()
  const end = performance.now()
  
  console.log(`[Performance] ${name}: ${end - start}ms`)
  return result
}

export async function measureAsyncPerformance<T>(
  name: string,
  func: () => Promise<T>
): Promise<T> {
  const start = performance.now()
  const result = await func()
  const end = performance.now()
  
  console.log(`[Performance] ${name}: ${end - start}ms`)
  return result
}
