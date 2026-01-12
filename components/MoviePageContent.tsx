'use client'

import { useState } from 'react'
import { Movie } from '@/lib/movies'
import FeaturedBanner from './FeaturedBanner'
import MovieGrid from './MovieGrid'
import MovieModal from './MovieModal'

interface MoviePageContentProps {
  featured: Movie | null
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
      {featured && (
        <FeaturedBanner 
          movie={featured} 
          onLearnMore={() => handleLearnMore(featured)}
        />
      )}
      <MovieGrid 
        movies={movies}
        onLearnMore={(movie) => handleLearnMore(movie)}
      />
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
