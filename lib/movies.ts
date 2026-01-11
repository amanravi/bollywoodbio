import moviesData from '@/data/movies.json'

export interface Movie {
  id: string
  title: string
  description: string
  image: string
  bookingUrl: string
  releaseDate: string
  isActive: boolean
  synopsis?: string
  trailerLink?: string
  cast?: string[]
  director?: string
  genre?: string[]
  duration?: string
  rating?: string
  language?: string
  isFeatured?: boolean
  isPreviousDistribution?: boolean
}

export interface MoviesData {
  featured: Movie
  movies: Movie[]
}

export async function getMoviesData(): Promise<MoviesData> {
  // Filter out inactive movies and previous distributions
  const activeMovies = moviesData.movies.filter(
    movie => movie.isActive && !movie.isPreviousDistribution
  )
  
  return {
    featured: moviesData.featured,
    movies: activeMovies,
  }
}

export async function getPreviousMovies(): Promise<Movie[]> {
  // Get only previous distribution movies
  return moviesData.movies.filter(movie => movie.isPreviousDistribution === true)
}
