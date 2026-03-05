import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { getDataDir } from '@/lib/paths'

export async function GET() {
  try {
    const dataDir = getDataDir()

    // Read movies from JSON
    let movies: any[] = []
    try {
      const moviesData = JSON.parse(await readFile(join(dataDir, 'movies.json'), 'utf8'))
      movies = moviesData.movies || []
    } catch { /* file may not exist */ }

    // Read contacts from JSON
    let contacts: any[] = []
    try {
      contacts = JSON.parse(await readFile(join(dataDir, 'contacts.json'), 'utf8'))
    } catch { /* file may not exist */ }

    const stats = {
      totalMovies: movies.length,
      activeMovies: movies.filter((m: any) => m.isActive && !m.isPreviousDistribution).length,
      featuredMovies: movies.filter((m: any) => m.isFeatured).length,
      previousDistributions: movies.filter((m: any) => m.isPreviousDistribution).length,
      totalContacts: contacts.length,
      unreadContacts: contacts.filter((c: any) => !c.read).length,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to get stats:', error)
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    )
  }
}
