import initSqlJs from 'sql.js'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

async function migrate() {
  console.log('Starting migration from JSON to SQLite...')
  
  // Initialize SQL.js
  const SQL = await initSqlJs({
    locateFile: (file: string) => {
      if (file.endsWith('.wasm')) {
        return require.resolve('sql.js/dist/sql-wasm.wasm')
      }
      return `https://sql.js.org/dist/${file}`
    }
  })
  
  const db = new SQL.Database()
  
  // Check if database already exists
  const dbPath = join(process.cwd(), 'data', 'bollywoodbio.db')
  if (existsSync(dbPath)) {
    console.log('Database already exists. Skipping migration.')
    return
  }

  // Create schema
  db.run(`
    CREATE TABLE IF NOT EXISTS movies (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      bookingUrl TEXT NOT NULL,
      releaseDate TEXT NOT NULL,
      isActive INTEGER DEFAULT 1,
      synopsis TEXT,
      trailerLink TEXT,
      cast TEXT,
      director TEXT,
      genre TEXT,
      duration TEXT,
      rating TEXT,
      language TEXT,
      isFeatured INTEGER DEFAULT 0,
      isPreviousDistribution INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now'))
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp TEXT DEFAULT (datetime('now')),
      read INTEGER DEFAULT 0
    )
  `)

  // Migrate movies
  console.log('Migrating movies...')
  const moviesFile = join(process.cwd(), 'data', 'movies.json')
  const moviesData = JSON.parse(await readFile(moviesFile, 'utf8'))

  const insertMovie = db.prepare(`
    INSERT INTO movies (
      id, title, description, image, bookingUrl, releaseDate,
      isActive, synopsis, trailerLink, cast, director, genre,
      duration, rating, language, isFeatured, isPreviousDistribution
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  // Migrate all movies
  for (const movie of moviesData.movies) {
    insertMovie.run([
      movie.id,
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
    ])
  }

  // Migrate featured movie if it exists and is not already in movies array
  if (moviesData.featured) {
    const featuredExists = moviesData.movies.some((m: any) => m.id === moviesData.featured.id)
    if (!featuredExists) {
      insertMovie.run([
        moviesData.featured.id,
        moviesData.featured.title,
        moviesData.featured.description,
        moviesData.featured.image,
        moviesData.featured.bookingUrl,
        moviesData.featured.releaseDate,
        moviesData.featured.isActive ? 1 : 0,
        moviesData.featured.synopsis || null,
        moviesData.featured.trailerLink || null,
        moviesData.featured.cast ? JSON.stringify(moviesData.featured.cast) : null,
        moviesData.featured.director || null,
        moviesData.featured.genre ? JSON.stringify(moviesData.featured.genre) : null,
        moviesData.featured.duration || null,
        moviesData.featured.rating || null,
        moviesData.featured.language || null,
        moviesData.featured.isFeatured ? 1 : 0,
        moviesData.featured.isPreviousDistribution ? 1 : 0,
      ])
    }
  }

  insertMovie.free()
  console.log(`Migrated ${moviesData.movies.length} movies to database.`)

  // Try to migrate contacts if file exists
  try {
    const contactsFile = join(process.cwd(), 'data', 'contacts.json')
    if (existsSync(contactsFile)) {
      const contactsData = JSON.parse(await readFile(contactsFile, 'utf8'))
      
      const insertContact = db.prepare(`
        INSERT INTO contacts (id, name, email, subject, message, timestamp, read)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)

      for (const contact of contactsData) {
        insertContact.run([
          contact.id,
          contact.name,
          contact.email,
          contact.subject,
          contact.message,
          contact.timestamp,
          contact.read ? 1 : 0,
        ])
      }
      insertContact.free()
      console.log(`Migrated ${contactsData.length} contacts to database.`)
    }
  } catch (error) {
    console.log('No contacts.json found or error reading it. Skipping contacts migration.')
  }

  // Save database
  const data = db.export()
  const buffer = Buffer.from(data)
  await writeFile(dbPath, buffer)
  
  db.close()
  console.log('Migration completed successfully!')
}

// Run migration if called directly
if (require.main === module) {
  migrate().catch(console.error)
}

export default migrate
