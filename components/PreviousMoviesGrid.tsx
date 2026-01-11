'use client'

import { Movie } from '@/lib/movies'
import MovieCard from './MovieCard'
import MovieModal from './MovieModal'
import { useState } from 'react'
import styles from './MovieGrid.module.css'

interface PreviousMoviesGridProps {
  movies: Movie[]
}

export default function PreviousMoviesGrid({ movies }: PreviousMoviesGridProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLearnMore = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMovie(null)
  }

  if (movies.length === 0) {
    return (
      <section className={styles.movieGridSection}>
        <div className={styles.container}>
          <p className={styles.noMovies}>No previous distributions available.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className={styles.movieGridSection}>
        <div className={styles.container}>
          <div className={styles.movieGrid}>
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie}
                onLearnMore={() => handleLearnMore(movie)}
                showBookButton={false}
              />
            ))}
          </div>
        </div>
      </section>
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
