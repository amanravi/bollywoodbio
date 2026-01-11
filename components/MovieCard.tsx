'use client'

import { Movie } from '@/lib/movies'
import styles from './MovieCard.module.css'

interface MovieCardProps {
  movie: Movie
  onLearnMore?: () => void
  showBookButton?: boolean
}

export default function MovieCard({ movie, onLearnMore, showBookButton = true }: MovieCardProps) {
  return (
    <div className={styles.movieCard}>
      <div className={styles.movieImageContainer}>
        <div
          className={styles.movieImage}
          style={{
            backgroundImage: `url(${movie.image})`,
          }}
        ></div>
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
        <h3 className={styles.movieTitle}>{movie.title}</h3>
        <p className={styles.movieDescription}>{movie.description}</p>
        <div className={styles.movieFooter}>
          <span className={styles.releaseDate}>
            Release: {new Date(movie.releaseDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
