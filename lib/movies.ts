import { readFile } from 'fs/promises'
import { join } from 'path'
import { getDataDir } from './paths'

async function getMoviesDataFromFile() {
  const moviesFile = join(getDataDir(), 'movies.json')
  try {
    const fileContents = await readFile(moviesFile, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading movies file:', error)
    return { featured: null, movies: [] }
  }
}

export interface Movie {
  id: string
  title: string
  description: string
  image: string
  bannerImage?: string
  bannerImages?: string[]
  bannerType?: 'trailer' | 'poster'
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
  showTrailer?: boolean
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

export async function getMovieById(id: string): Promise<Movie | null> {
  const moviesData = await getMoviesDataFromFile()
  const movie = (moviesData.movies as Movie[]).find((m: Movie) => m.id === id)
  return movie || null
}

export async function getAllMovieIds(): Promise<string[]> {
  const moviesData = await getMoviesDataFromFile()
  return (moviesData.movies as Movie[]).map((m: Movie) => m.id)
}

export async function getMoviesWithTrailers(): Promise<Movie[]> {
  // Read from file system to get latest data
  const moviesData = await getMoviesDataFromFile()
  
  // Get movies that have showTrailer enabled, have a trailer link, are active, and not previous distributions
  return (moviesData.movies as Movie[])
    .filter((movie: Movie) => 
      movie.showTrailer === true && 
      movie.trailerLink && 
      movie.isActive && 
      !movie.isPreviousDistribution
    )
    .sort((a: Movie, b: Movie) => {
      const dateA = new Date(a.releaseDate).getTime()
      const dateB = new Date(b.releaseDate).getTime()
      return dateB - dateA // Most recent first
    })
}
