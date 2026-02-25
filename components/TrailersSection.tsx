'use client'

import { useMemo, useState } from 'react'
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
  const trailers = useMemo(
    () =>
      movies
        .map((movie) => {
          const videoId = movie.trailerLink ? getYouTubeVideoId(movie.trailerLink) : null
          return videoId ? { movie, videoId } : null
        })
        .filter(Boolean) as { movie: Movie; videoId: string }[],
    [movies]
  )

  const [activeId, setActiveId] = useState(trailers[0]?.movie.id)

  if (trailers.length === 0) {
    return null
  }

  const active = trailers.find((t) => t.movie.id === activeId) || trailers[0]

  return (
    <section className={styles.trailersSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Latest Trailers</h2>
        <div className={styles.trailersLayout}>
          <div className={styles.featuredTrailer}>
            <div className={styles.trailerVideo}>
              <iframe
                src={`https://www.youtube.com/embed/${active.videoId}`}
                title={active.movie.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.youtubeIframe}
              />
            </div>
            <div className={styles.trailerInfo}>
              <h3 className={styles.trailerTitle}>{active.movie.title}</h3>
              <p className={styles.trailerDescription}>{active.movie.description}</p>
              {active.movie.releaseDate && (
                <span className={styles.releaseDate}>
                  {new Date(active.movie.releaseDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
          </div>
          <div className={styles.trailerList}>
            {trailers.map(({ movie, videoId }) => {
              const isActive = movie.id === active.movie.id
              const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              return (
                <button
                  key={movie.id}
                  className={`${styles.trailerItem} ${isActive ? styles.activeItem : ''}`}
                  onClick={() => setActiveId(movie.id)}
                >
                  <div className={styles.thumb}>
                    <img src={thumb} alt={movie.title} />
                    <span className={styles.playBadge}>▶</span>
                  </div>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemTitle}>{movie.title}</span>
                    <span className={styles.itemDate}>
                      {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
