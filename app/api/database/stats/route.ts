import { NextResponse } from 'next/server'
import { getAllMovies } from '@/lib/db-movies'
import { getAllContacts } from '@/lib/db-contacts'

export async function GET() {
  try {
    const movies = await getAllMovies()
    const contacts = await getAllContacts()

    const stats = {
      totalMovies: movies.length,
      activeMovies: movies.filter(m => m.isActive && !m.isPreviousDistribution).length,
      featuredMovies: movies.filter(m => m.isFeatured).length,
      previousDistributions: movies.filter(m => m.isPreviousDistribution).length,
      totalContacts: contacts.length,
      unreadContacts: contacts.filter(c => !c.read).length,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to get database stats:', error)
    return NextResponse.json(
      { error: 'Failed to get database stats' },
      { status: 500 }
    )
  }
}
