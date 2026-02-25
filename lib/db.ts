import { join } from 'path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'

const DB_DIR = join(process.cwd(), 'data')
const DB_PATH = join(DB_DIR, 'bollywoodbio.db')

// Ensure data directory exists
if (!existsSync(DB_DIR)) {
  mkdirSync(DB_DIR, { recursive: true })
}

// Database instance
let db: any = null
let sqlJs: any = null

type SqlJsDatabase = any

export async function getDatabase(): Promise<SqlJsDatabase> {
  // Only run on server-side
  if (typeof window !== 'undefined') {
    throw new Error('Database can only be accessed server-side')
  }

  if (!db) {
    try {
      // Initialize SQL.js
      if (!sqlJs) {
        // Dynamically import sql.js only on server
        // Use require instead of import to avoid webpack issues
        const sqlJsModule = require('sql.js')
        const initSqlJsFunc = sqlJsModule.default || sqlJsModule
        
        // For Node.js/server-side, use the bundled WASM file
        const wasmPath = require.resolve('sql.js/dist/sql-wasm.wasm')
        sqlJs = await initSqlJsFunc({
          locateFile: (file: string) => {
            // Always use local WASM file path
            if (file.endsWith('.wasm')) {
              return wasmPath
            }
            // For other files, use CDN as fallback
            return `https://sql.js.org/dist/${file}`
          }
        })
      }

      // Load existing database or create new one
      if (existsSync(DB_PATH)) {
        const buffer = readFileSync(DB_PATH)
        db = new sqlJs.Database(buffer)
      } else {
        db = new sqlJs.Database()
        initializeSchema(db)
        saveDatabase()
      }
    } catch (error) {
      console.error('Failed to initialize database:', error)
      throw error
    }
  }
  return db
}

function saveDatabase() {
  if (db) {
    const data = db.export()
    const buffer = Buffer.from(data)
    writeFileSync(DB_PATH, buffer)
  }
}

function initializeSchema(database: SqlJsDatabase) {
  // Movies table
  database.run(`
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

  // Contacts table
  database.run(`
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

  // Create indexes for better performance
  database.run(`
    CREATE INDEX IF NOT EXISTS idx_movies_active ON movies(isActive);
    CREATE INDEX IF NOT EXISTS idx_movies_featured ON movies(isFeatured);
    CREATE INDEX IF NOT EXISTS idx_movies_previous ON movies(isPreviousDistribution);
  `)
}

// Helper to convert database row to Movie object
export function rowToMovie(row: any[]): any {
  return {
    id: row[0],
    title: row[1],
    description: row[2],
    image: row[3],
    bookingUrl: row[4],
    releaseDate: row[5],
    isActive: Boolean(row[6]),
    synopsis: row[7] || undefined,
    trailerLink: row[8] || undefined,
    cast: row[9] ? JSON.parse(row[9]) : undefined,
    director: row[10] || undefined,
    genre: row[11] ? JSON.parse(row[11]) : undefined,
    duration: row[12] || undefined,
    rating: row[13] || undefined,
    language: row[14] || undefined,
    isFeatured: Boolean(row[15]),
    isPreviousDistribution: Boolean(row[16]),
  }
}

// Helper to convert Movie object to database values
export function movieToValues(movie: any): any[] {
  return [
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
  ]
}

// Helper to save database after operations
export function saveDb() {
  saveDatabase()
}
