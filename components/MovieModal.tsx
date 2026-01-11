'use client'

import { Movie } from '@/lib/movies'
import styles from './MovieModal.module.css'

interface MovieModalProps {
  movie: Movie | null
  isOpen: boolean
  onClose: () => void
}

export default function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
  if (!isOpen || !movie) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <div className={styles.modalHeader}>
          <div 
            className={styles.modalImage}
            style={{ backgroundImage: `url(${movie.image})` }}
          ></div>
          <div className={styles.modalHeaderInfo}>
            <h2 className={styles.modalTitle}>{movie.title}</h2>
            <div className={styles.movieMeta}>
              {movie.duration && <span>{movie.duration}</span>}
              {movie.rating && <span>{movie.rating}</span>}
              {movie.language && <span>{movie.language}</span>}
            </div>
            {movie.genre && (
              <div className={styles.genreTags}>
                {movie.genre.map((g, i) => (
                  <span key={i} className={styles.genreTag}>{g}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.section}>
            <h3>Synopsis</h3>
            <p className={styles.synopsis}>
              {movie.synopsis || movie.description}
            </p>
          </div>

          <div className={styles.movieDetails}>
            {movie.director && (
              <div className={styles.detailItem}>
                <strong>Director:</strong> {movie.director}
              </div>
            )}
            {movie.cast && movie.cast.length > 0 && (
              <div className={styles.detailItem}>
                <strong>Cast:</strong> {movie.cast.join(', ')}
              </div>
            )}
            <div className={styles.detailItem}>
              <strong>Release Date:</strong>{' '}
              {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>

          {movie.trailerLink && (
            <div className={styles.trailerSection}>
              <a
                href={movie.trailerLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.trailerButton}
              >
                ▶ Watch Trailer
              </a>
            </div>
          )}

          {!movie.isPreviousDistribution && (
            <div className={styles.actionButtons}>
              <a
                href={movie.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookButton}
              >
                Book Now
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
