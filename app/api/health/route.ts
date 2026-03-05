import { NextResponse } from 'next/server'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { getDataDir, getUploadsDir, isUsingPersistentStorage } from '@/lib/paths'

export async function GET() {
  const cwd = process.cwd()
  const dataDir = getDataDir()
  const moviesPath = join(dataDir, 'movies.json')
  const postsPath = join(dataDir, 'posts.json')
  
  let moviesExist = false
  let postsExist = false
  let moviesCount = 0
  let postsCount = 0

  try {
    moviesExist = existsSync(moviesPath)
    if (moviesExist) {
      const data = JSON.parse(await readFile(moviesPath, 'utf8'))
      moviesCount = data.movies?.length || 0
    }
  } catch (e: any) {
    moviesExist = false
  }

  try {
    postsExist = existsSync(postsPath)
    if (postsExist) {
      const data = JSON.parse(await readFile(postsPath, 'utf8'))
      postsCount = data.posts?.length || 0
    }
  } catch (e: any) {
    postsExist = false
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    node: process.version,
    env: process.env.NODE_ENV,
    cwd,
    persistentStorage: isUsingPersistentStorage(),
    dataDir,
    uploadsDir: getUploadsDir(),
    files: {
      moviesJson: { exists: moviesExist, count: moviesCount, path: moviesPath },
      postsJson: { exists: postsExist, count: postsCount, path: postsPath },
    },
  })
}
