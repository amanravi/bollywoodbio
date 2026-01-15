'use client'

import { Movie } from '@/lib/movies'
import styles from './TrailersSection.module.css'

interface TrailersSectionProps {
  movies: Movie[]
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

export default function TrailersSection({ movies }: TrailersSectionProps) {
  if (movies.length === 0) {
    return null
  }

  return (
    <section className={styles.trailersSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Latest Trailers</h2>
        <div className={styles.trailersGrid}>
          {movies.map((movie) => {
            const videoId = movie.trailerLink ? getYouTubeVideoId(movie.trailerLink) : null
            
            if (!videoId) return null

            return (
              <div key={movie.id} className={styles.trailerCard}>
                <div className={styles.trailerVideo}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={movie.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.youtubeIframe}
                  />
                </div>
                <div className={styles.trailerInfo}>
                  <h3 className={styles.trailerTitle}>{movie.title}</h3>
                  <p className={styles.trailerDescription}>{movie.description}</p>
                  {movie.releaseDate && (
                    <span className={styles.releaseDate}>
                      {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
