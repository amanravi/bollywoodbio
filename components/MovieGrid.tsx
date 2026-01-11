'use client'

import { Movie } from '@/lib/movies'
import MovieCard from './MovieCard'
import styles from './MovieGrid.module.css'

interface MovieGridProps {
  movies: Movie[]
  onLearnMore?: (movie: Movie) => void
}

export default function MovieGrid({ movies, onLearnMore }: MovieGridProps) {
  const activeMovies = movies.filter(movie => movie.isActive)

  // Don't show the section at all if there are no active movies
  if (activeMovies.length === 0) {
    return null
  }

  return (
    <section className={styles.movieGridSection} id="movies">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Now Showing</h2>
        <div className={styles.movieGrid}>
          {activeMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie}
              onLearnMore={onLearnMore ? () => onLearnMore(movie) : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
