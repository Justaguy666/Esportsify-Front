import React, { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { 
  useLazyImage, 
  useImageLoadingState, 
  getOptimizedImageUrl, 
  generateImagePlaceholder,
  getImageWithFallback
} from "@/lib/image-utils"

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  quality?: number
  fallback?: string
  lazy?: boolean
  placeholder?: boolean
  rootMargin?: string
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ 
    src, 
    alt, 
    width, 
    height, 
    quality = 75,
    fallback,
    lazy = true,
    placeholder = true,
    rootMargin = "50px",
    className,
    ...props 
  }, ref) => {
    const optimizedSrc = getOptimizedImageUrl(src, width, height, quality)
    const finalSrc = getImageWithFallback(optimizedSrc, fallback || "")
    
    const { ref: lazyRef, loaded: lazyLoaded } = useLazyImage(
      lazy ? finalSrc : "", 
      rootMargin
    )
    const loadingState = useImageLoadingState(lazy ? (lazyLoaded ? finalSrc : "") : finalSrc)
    
    const showPlaceholder = placeholder && loadingState === 'loading'
    const showError = loadingState === 'error' && !fallback
    
    if (showError) {
      return (
        <div 
          className={cn(
            "bg-gray-100 flex items-center justify-center text-gray-400",
            className
          )}
          style={{ width, height }}
          {...(props as any)}
        >
          <span className="text-sm">Failed to load image</span>
        </div>
      )
    }
    
    return (
      <div className={cn("relative overflow-hidden", className)}>
        {showPlaceholder && (
          <img
            src={generateImagePlaceholder(width, height)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
        )}
        
        <img
          ref={lazy ? lazyRef : ref}
          src={lazy ? (lazyLoaded ? finalSrc : generateImagePlaceholder(width, height)) : finalSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "transition-opacity duration-300",
            loadingState === 'loaded' ? 'opacity-100' : 'opacity-0',
            showPlaceholder && 'absolute inset-0 w-full h-full object-cover'
          )}
          loading={lazy ? "lazy" : "eager"}
          {...props}
        />
      </div>
    )
  }
)

OptimizedImage.displayName = "OptimizedImage"
