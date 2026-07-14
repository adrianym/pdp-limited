import type { CSSProperties, ImgHTMLAttributes } from 'react'

type OptimizedImageProps = {
  src: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: ImgHTMLAttributes<HTMLImageElement>['fetchPriority']
  style?: CSSProperties
}

export function OptimizedImage({
  src,
  alt,
  className,
  loading = 'lazy',
  fetchPriority,
  style,
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      draggable={false}
    />
  )
}
