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


export async function getUpcomingMovies(): Promise<Movie[]> {
  // Get movies with release dates in the future, sorted by release date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const upcoming = moviesData.movies
    .filter(movie => {
      if (movie.isPreviousDistribution) return false
      const releaseDate = new Date(movie.releaseDate)
      releaseDate.setHours(0, 0, 0, 0)
      return releaseDate > today
    })
    .sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime()
      const dateB = new Date(b.releaseDate).getTime()
      return dateA - dateB
    })
  
  return upcoming
}
