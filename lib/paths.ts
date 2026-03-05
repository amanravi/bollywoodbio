import { join, resolve } from 'path'
import { existsSync } from 'fs'
import { mkdir, copyFile, readdir } from 'fs/promises'

/**
 * Persistent storage paths.
 * 
 * In production (Hostinger), set DATA_DIR env var to a folder OUTSIDE the git root.
 * e.g., DATA_DIR=../persistent-data
 * 
 * This ensures data files and uploaded images survive Git deployments.
 * 
 * Locally (dev), it defaults to the project's own `data/` and `public/images/` folders.
 */

export function getDataDir(): string {
  if (process.env.DATA_DIR) {
    return resolve(process.cwd(), process.env.DATA_DIR, 'data')
  }
  return join(process.cwd(), 'data')
}

export function getUploadsDir(): string {
  if (process.env.DATA_DIR) {
    return resolve(process.cwd(), process.env.DATA_DIR, 'uploads')
  }
  return join(process.cwd(), 'public', 'images')
}

/**
 * Returns the URL path for an uploaded image.
 * - If using persistent storage (DATA_DIR set): serves via /api/uploads/filename
 * - If local dev (no DATA_DIR): serves via /images/filename (static)
 */
export function getUploadUrl(filename: string): string {
  if (process.env.DATA_DIR) {
    return `/api/uploads/${filename}`
  }
  return `/images/${filename}`
}

/**
 * Checks if we're using persistent (external) storage.
 */
export function isUsingPersistentStorage(): boolean {
  return !!process.env.DATA_DIR
}

/**
 * Ensures the persistent data directory exists and has seed data if empty.
 * Called once on app startup or first request.
 */
export async function ensurePersistentStorage(): Promise<void> {
  const dataDir = getDataDir()
  const uploadsDir = getUploadsDir()

  // Create directories if they don't exist
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true })
  }

  // Seed data files if they don't exist in the persistent directory
  const seedDir = join(process.cwd(), 'data')
  const seedFiles = ['movies.json', 'posts.json', 'events.json', 'contacts.json']

  for (const file of seedFiles) {
    const destPath = join(dataDir, file)
    const seedPath = join(seedDir, file)
    if (!existsSync(destPath) && existsSync(seedPath)) {
      await copyFile(seedPath, destPath)
      console.log(`[Persistent Storage] Seeded ${file}`)
    }
  }
}
