import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { getDataDir } from '@/lib/paths'

function getMoviesFile() {
  return join(getDataDir(), 'movies.json')
}

async function readMoviesFile() {
  const filePath = getMoviesFile()
  if (!existsSync(filePath)) {
    const dir = getDataDir()
    await mkdir(dir, { recursive: true })
    await writeFile(filePath, JSON.stringify({ featured: null, movies: [] }, null, 2), 'utf8')
  }
  const fileContents = await readFile(filePath, 'utf8')
  return JSON.parse(fileContents)
}

// Helper to check authentication
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  return authHeader === 'Bearer admin_authenticated'
}

export async function GET() {
  try {
    const data = await readMoviesFile()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read movies data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const movie = await request.json()
    const data = await readMoviesFile()

    // Generate ID if not provided
    if (!movie.id) {
      movie.id = `movie_${Date.now()}`
    }

    // Add new movie
    data.movies.push(movie)

    // If this is marked as featured, update featured and unset others
    if (movie.isFeatured) {
      // Unset all other featured movies
      data.movies.forEach((m: any) => {
        if (m.id !== movie.id) {
          m.isFeatured = false
        }
      })
      data.featured = { ...movie }
    }

    await writeFile(getMoviesFile(), JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true, movie })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add movie' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const movie = await request.json()
    const data = await readMoviesFile()

    // Update movie in array
    const index = data.movies.findIndex((m: any) => m.id === movie.id)
    if (index !== -1) {
      data.movies[index] = movie
    } else {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      )
    }

    // Update featured if this is the featured movie
    if (movie.isFeatured) {
      // Unset all other featured movies
      data.movies.forEach((m: any) => {
        if (m.id !== movie.id) {
          m.isFeatured = false
        }
      })
      data.featured = { ...movie }
    } else if (data.featured?.id === movie.id) {
      // If this was featured but no longer is, find another featured or clear
      const newFeatured = data.movies.find((m: any) => m.isFeatured && m.isActive)
      data.featured = newFeatured || null
    }

    await writeFile(getMoviesFile(), JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true, movie })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update movie' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const data = await readMoviesFile()

    // Remove movie from array
    data.movies = data.movies.filter((m: any) => m.id !== id)

    // If deleted movie was featured, update featured
    if (data.featured?.id === id) {
      const newFeatured = data.movies.find((m: any) => m.isFeatured && m.isActive)
      data.featured = newFeatured || null
    }

    await writeFile(getMoviesFile(), JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete movie' },
      { status: 500 }
    )
  }
}
