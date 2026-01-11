'use client'

import { useState, useEffect } from 'react'
import { Movie } from '@/lib/movies'
import styles from './FeaturedBanner.module.css'

interface FeaturedBannerProps {
  movie: Movie
  onLearnMore?: () => void
}

// Extract YouTube video ID from various URL formats
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

export default function FeaturedBanner({ movie, onLearnMore }: FeaturedBannerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  
  if (!movie || !movie.isActive) {
    return null
  }

  const videoId = movie.trailerLink ? getYouTubeVideoId(movie.trailerLink) : null
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : movie.image

  // Auto-play video after component mounts if there's a trailer
  useEffect(() => {
    if (videoId) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsPlaying(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [videoId])

  const handlePlayClick = () => {
    setIsPlaying(true)
  }

  return (
    <section className={styles.featuredBanner}>
      <div className={styles.bannerContent}>
        {isPlaying && videoId ? (
          <div className={styles.videoContainer}>
            <iframe
              className={styles.youtubeVideo}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&playsinline=1&enablejsapi=1`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                minWidth: '100%',
                minHeight: '100%',
              }}
            />
          </div>
        ) : (
          <>
            <div 
              className={styles.bannerBackground}
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
            />
            {videoId && (
              <button 
                className={styles.playButton}
                onClick={handlePlayClick}
                aria-label="Play trailer"
              >
                <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            )}
          </>
        )}
        <div className={styles.bannerOverlay}></div>
        <div className={styles.bannerText}>
          <h2 className={styles.bannerTitle}>{movie.title}</h2>
          <p className={styles.bannerDescription}>{movie.description}</p>
          <div className={styles.bannerButtons}>
            {onLearnMore && (
              <button
                onClick={onLearnMore}
                className={styles.learnMoreButton}
              >
                Learn More
              </button>
            )}
            <a
              href={movie.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookNowButton}
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
