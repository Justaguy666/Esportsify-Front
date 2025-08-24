import { useState, useRef, useEffect } from "react"

// Image optimization utility
export function getOptimizedImageUrl(
  src: string,
  width?: number,
  height?: number,
  quality: number = 75
): string {
  if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
    return src
  }
  
  // For local images, return as-is
  if (src.startsWith('/')) {
    return src
  }
  
  // For external images, could implement CDN optimization here
  return src
}

// Lazy loading hook
export function useLazyImage(src: string, rootMargin: string = '50px') {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const current = imgRef.current
    if (!current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image()
          img.onload = () => setLoaded(true)
          img.onerror = () => setError(true)
          img.src = src
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(current)

    return () => {
      observer.disconnect()
    }
  }, [src, rootMargin])

  return { ref: imgRef, loaded, error }
}

// Preload images utility
export function preloadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = reject
    img.src = src
  })
}

export function preloadImages(sources: string[]): Promise<string[]> {
  return Promise.all(sources.map(preloadImage))
}

// Image fallback utility
export function getImageWithFallback(src: string, fallback: string): string {
  if (!src) return fallback
  return src
}

// Generate placeholder for images
export function generateImagePlaceholder(
  width: number = 400,
  height: number = 300,
  backgroundColor: string = '#f3f4f6',
  textColor: string = '#9ca3af'
): string {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}"/>
      <text x="50%" y="50%" font-family="system-ui" font-size="14" fill="${textColor}" text-anchor="middle" dy="0.3em">
        ${width} × ${height}
      </text>
    </svg>
  `)}`
}

// Image loading states
export type ImageLoadingState = 'loading' | 'loaded' | 'error'

export function useImageLoadingState(src: string): ImageLoadingState {
  const [state, setState] = useState<ImageLoadingState>('loading')

  useEffect(() => {
    if (!src) {
      setState('error')
      return
    }

    setState('loading')
    
    const img = new Image()
    img.onload = () => setState('loaded')
    img.onerror = () => setState('error')
    img.src = src

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return state
}
