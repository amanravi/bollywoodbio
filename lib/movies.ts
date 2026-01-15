import { readFile } from 'fs/promises'
import { join } from 'path'

const MOVIES_FILE = join(process.cwd(), 'data', 'movies.json')

async function getMoviesDataFromFile() {
  try {
    // Log the file path for debugging (only in development or if DEBUG env is set)
    if (process.env.NODE_ENV !== 'production' || process.env.DEBUG) {
      console.log('Reading movies from:', MOVIES_FILE)
      console.log('Current working directory:', process.cwd())
    }
    
    const fileContents = await readFile(MOVIES_FILE, 'utf8')
    const data = JSON.parse(fileContents)
    
    // Log when file was last read for debugging
    if (process.env.NODE_ENV !== 'production' || process.env.DEBUG) {
      console.log('Movies file read successfully at:', new Date().toISOString())
      console.log('Total movies:', data.movies?.length || 0)
    }
    
    return data
  } catch (error) {
    console.error('Error reading movies file:', error)
    console.error('Attempted path:', MOVIES_FILE)
    // Fallback to import if file read fails (for build time)
    const moviesData = await import('@/data/movies.json')
    return moviesData.default
  }
}

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
  featured: Movie | null
  movies: Movie[]
}

export async function getMoviesData(): Promise<MoviesData> {
  // Read from file system to get latest data (not cached at build time)
  const moviesData = await getMoviesDataFromFile()
  
  // Filter out inactive movies and previous distributions
  const activeMovies = (moviesData.movies as Movie[]).filter(
    (movie: Movie) => movie.isActive && !movie.isPreviousDistribution
  )
  
  return {
    featured: moviesData.featured || null,
    movies: activeMovies,
  }
}

export async function getPreviousMovies(): Promise<Movie[]> {
  // Read from file system to get latest data
  const moviesData = await getMoviesDataFromFile()
  
  // Get only previous distribution movies
  return (moviesData.movies as Movie[]).filter((movie: Movie) => movie.isPreviousDistribution === true)
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  // Read from file system to get latest data
  const moviesData = await getMoviesDataFromFile()
  
  // Get movies with release dates in the future, sorted by release date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const upcoming = (moviesData.movies as Movie[])
    .filter((movie: Movie) => {
      if (movie.isPreviousDistribution) return false
      const releaseDate = new Date(movie.releaseDate)
      releaseDate.setHours(0, 0, 0, 0)
      return releaseDate > today
    })
    .sort((a: Movie, b: Movie) => {
      const dateA = new Date(a.releaseDate).getTime()
      const dateB = new Date(b.releaseDate).getTime()
      return dateA - dateB
    })
  
  return upcoming
}
