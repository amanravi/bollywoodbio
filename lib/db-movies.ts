import { getDatabase, rowToMovie, movieToValues, saveDb } from './db'

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
  try {
    const db = await getDatabase()
    
    // Get featured movie
    const featuredStmt = db.prepare('SELECT * FROM movies WHERE isFeatured = 1 AND isActive = 1 LIMIT 1')
    featuredStmt.step()
    const featuredRow = featuredStmt.getAsObject({})
    const featured = Object.keys(featuredRow).length > 0 ? rowToMovie(Object.values(featuredRow)) : null
    featuredStmt.free()

    // Get active movies (not previous distributions)
    const activeStmt = db.prepare('SELECT * FROM movies WHERE isActive = 1 AND isPreviousDistribution = 0 ORDER BY releaseDate DESC')
    const activeMovies: Movie[] = []
    while (activeStmt.step()) {
      const row = activeStmt.getAsObject({})
      activeMovies.push(rowToMovie(Object.values(row)))
    }
    activeStmt.free()

    return {
      featured: featured || activeMovies[0] || null,
      movies: activeMovies,
    }
  } catch (error) {
    console.error('Error loading movies from database:', error)
    // Return empty data if database fails
    return {
      featured: null,
      movies: [],
    }
  }
}

export async function getPreviousMovies(): Promise<Movie[]> {
  const db = await getDatabase()
  
  const stmt = db.prepare('SELECT * FROM movies WHERE isPreviousDistribution = 1 ORDER BY releaseDate DESC')
  const movies: Movie[] = []
  while (stmt.step()) {
    const row = stmt.getAsObject({})
    movies.push(rowToMovie(Object.values(row)))
  }
  stmt.free()

  return movies
}

export async function getAllMovies(): Promise<Movie[]> {
  const db = await getDatabase()
  
  const stmt = db.prepare('SELECT * FROM movies ORDER BY releaseDate DESC')
  const movies: Movie[] = []
  while (stmt.step()) {
    const row = stmt.getAsObject({})
    movies.push(rowToMovie(Object.values(row)))
  }
  stmt.free()

  return movies
}

export async function getFeaturedMovie(): Promise<Movie | null> {
  const db = await getDatabase()
  
  const stmt = db.prepare('SELECT * FROM movies WHERE isFeatured = 1 AND isActive = 1 LIMIT 1')
  stmt.step()
  const row = stmt.getAsObject({})
  const movie = Object.keys(row).length > 0 ? rowToMovie(Object.values(row)) : null
  stmt.free()
  
  return movie
}

export async function createMovie(movie: Movie): Promise<Movie> {
  const db = await getDatabase()
  
  // If this is featured, unset all other featured movies
  if (movie.isFeatured) {
    db.run('UPDATE movies SET isFeatured = 0')
  }

  const values = movieToValues(movie)
  db.run(`
    INSERT INTO movies (
      id, title, description, image, bookingUrl, releaseDate,
      isActive, synopsis, trailerLink, cast, director, genre,
      duration, rating, language, isFeatured, isPreviousDistribution
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, values)
  
  saveDb()
  return movie
}

export async function updateMovie(movie: Movie): Promise<Movie> {
  const db = await getDatabase()
  
  // If this is featured, unset all other featured movies
  if (movie.isFeatured) {
    db.run('UPDATE movies SET isFeatured = 0 WHERE id != ?', [movie.id])
  }

  const values = movieToValues(movie)
  values.push(new Date().toISOString()) // updatedAt
  values.push(movie.id) // for WHERE clause
  
  db.run(`
    UPDATE movies SET
      title = ?,
      description = ?,
      image = ?,
      bookingUrl = ?,
      releaseDate = ?,
      isActive = ?,
      synopsis = ?,
      trailerLink = ?,
      cast = ?,
      director = ?,
      genre = ?,
      duration = ?,
      rating = ?,
      language = ?,
      isFeatured = ?,
      isPreviousDistribution = ?,
      updatedAt = ?
    WHERE id = ?
  `, [
    movie.title,
    movie.description,
    movie.image,
    movie.bookingUrl,
    movie.releaseDate,
    movie.isActive ? 1 : 0,
    movie.synopsis || null,
    movie.trailerLink || null,
    movie.cast ? JSON.stringify(movie.cast) : null,
    movie.director || null,
    movie.genre ? JSON.stringify(movie.genre) : null,
    movie.duration || null,
    movie.rating || null,
    movie.language || null,
    movie.isFeatured ? 1 : 0,
    movie.isPreviousDistribution ? 1 : 0,
    new Date().toISOString(),
    movie.id,
  ])
  
  saveDb()
  return movie
}

export async function deleteMovie(id: string): Promise<void> {
  const db = await getDatabase()
  
  db.run('DELETE FROM movies WHERE id = ?', [id])
  saveDb()
}

export async function getMovieById(id: string): Promise<Movie | null> {
  const db = await getDatabase()
  
  const stmt = db.prepare('SELECT * FROM movies WHERE id = ?')
  stmt.bind([id])
  stmt.step()
  const row = stmt.getAsObject({})
  const movie = Object.keys(row).length > 0 ? rowToMovie(Object.values(row)) : null
  stmt.free()
  
  return movie
}
