'use client'

import { Movie } from '@/lib/movies'
import MovieCard from './MovieCard'
import styles from './UpcomingMovies.module.css'

interface UpcomingMoviesProps {
  movies: Movie[]
  onLearnMore?: (movie: Movie) => void
}

export default function UpcomingMovies({ movies, onLearnMore }: UpcomingMoviesProps) {
  if (movies.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <section className={styles.upcomingSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Upcoming Releases</h2>
        <div className={styles.moviesGrid}>
          {movies.map((movie) => (
            <div key={movie.id} className={styles.movieWrapper}>
              <MovieCard 
                movie={movie}
                onLearnMore={onLearnMore ? () => onLearnMore(movie) : undefined}
                showBookButton={false}
              />
              <div className={styles.releaseDate}>
                <span className={styles.releaseLabel}>Releasing:</span>
                <span className={styles.releaseValue}>{formatDate(movie.releaseDate)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
