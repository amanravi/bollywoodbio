'use client'

import { Movie } from '@/lib/movies'
import styles from './MovieCard.module.css'

interface MovieCardProps {
  movie: Movie
  onLearnMore?: () => void
  showBookButton?: boolean
}

export default function MovieCard({ movie, onLearnMore, showBookButton = true }: MovieCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.getFullYear()
    return { day, month, year }
  }

  const dateInfo = formatDate(movie.releaseDate)

  return (
    <div className={styles.movieCard}>
      <div className={styles.movieImageContainer}>
        <div
          className={styles.movieImage}
          style={{
            backgroundImage: `url(${movie.image})`,
          }}
        ></div>
        <div className={styles.titleBadge}>{movie.title}</div>
        {/* Release Date Badge - Tile over Tile */}
        <div className={styles.releaseDateBadge}>
          <span className={styles.dateLabel}>{dateInfo.month}</span>
          <span className={styles.dateValue}>{dateInfo.day}</span>
        </div>
        <div className={styles.movieOverlay}>
          <div className={styles.overlayButtons}>
            {onLearnMore && (
              <button
                onClick={onLearnMore}
                className={styles.learnMoreButton}
              >
                Learn More
              </button>
            )}
            {showBookButton && (
              <a
                href={movie.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookButton}
              >
                Book Now
              </a>
            )}
          </div>
        </div>
      </div>
      <div className={styles.movieInfo}>
        <p className={styles.movieDescription}>{movie.description}</p>
        <div className={styles.movieFooter}>
          <span className={styles.releaseDate}>
            {new Date(movie.releaseDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
