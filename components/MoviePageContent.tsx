'use client'

import { useState } from 'react'
import { Movie } from '@/lib/movies'
import FeaturedBanner from './FeaturedBanner'
import MovieGrid from './MovieGrid'
import MovieModal from './MovieModal'
import UpcomingMovies from './UpcomingMovies'

interface MoviePageContentProps {
  featured: Movie | null
  movies: Movie[]
  upcomingMovies?: Movie[]
  bannerOverlay?: React.ReactNode
  afterMoviesContent?: React.ReactNode
}

export default function MoviePageContent({ featured, movies, upcomingMovies, bannerOverlay, afterMoviesContent }: MoviePageContentProps) {
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
      {bannerOverlay}
      {movies.length > 0 && (
        <MovieGrid 
          movies={movies}
          onLearnMore={(movie) => handleLearnMore(movie)}
        />
      )}
      {upcomingMovies && upcomingMovies.length > 0 && (
        <UpcomingMovies 
          movies={upcomingMovies}
          onLearnMore={(movie) => handleLearnMore(movie)}
        />
      )}
      {afterMoviesContent}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  )
}
