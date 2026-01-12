'use client'

import { useState } from 'react'
import { Movie } from '@/lib/movies'
import FeaturedBanner from './FeaturedBanner'
import MovieGrid from './MovieGrid'
import MovieModal from './MovieModal'

interface MoviePageContentProps {
  featured: Movie
  movies: Movie[]
}

export default function MoviePageContent({ featured, movies }: MoviePageContentProps) {
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

  return (
    <>
      <FeaturedBanner 
        movie={featured} 
        onLearnMore={() => handleLearnMore(featured)}
      />
      {movies.length > 0 && (
        <MovieGrid 
          movies={movies}
          onLearnMore={(movie) => handleLearnMore(movie)}
        />
      )}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
