'use client'

import { useState, useEffect } from 'react'
import { Movie } from '@/lib/movies'
import MovieForm from './MovieForm'
import styles from './AdminDashboard.module.css'

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [featured, setFeatured] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    loadMovies()
  }, [])

  const loadMovies = async () => {
    try {
      const response = await fetch('/api/movies')
      const data = await response.json()
      setMovies(data.movies || [])
      setFeatured(data.featured || null)
    } catch (error) {
      console.error('Failed to load movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddMovie = () => {
    setEditingMovie(null)
    setShowForm(true)
  }

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie)
    setShowForm(true)
  }

  const handleDeleteMovie = async (id: string) => {
    if (!confirm('Are you sure you want to delete this movie?')) {
      return
    }

    try {
      const response = await fetch('/api/movies', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        await loadMovies()
      } else {
        alert('Failed to delete movie')
      }
    } catch (error) {
      alert('Error deleting movie')
    }
  }

  const handleToggleActive = async (movie: Movie) => {
    const updated = { ...movie, isActive: !movie.isActive }
    try {
      const response = await fetch('/api/movies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })

      if (response.ok) {
        await loadMovies()
      }
    } catch (error) {
      alert('Error updating movie')
    }
  }

  const handleSetFeatured = async (movie: Movie) => {
    // First, unset all other featured movies
    const updatedMovies = movies.map(m => ({
      ...m,
      isFeatured: m.id === movie.id ? true : false
    }))

    // Update the selected movie as featured
    const featuredMovie = { ...movie, isFeatured: true }

    try {
      // Update all movies
      for (const m of updatedMovies) {
        await fetch('/api/movies', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(m),
        })
      }

      await loadMovies()
    } catch (error) {
      alert('Error setting featured movie')
    }
  }

  const handleTogglePreviousDistribution = async (movie: Movie) => {
    const updated = { 
      ...movie, 
      isPreviousDistribution: !movie.isPreviousDistribution,
      // If marking as previous distribution, also set inactive
      isActive: movie.isPreviousDistribution ? movie.isActive : false
    }
    try {
      const response = await fetch('/api/movies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })

      if (response.ok) {
        await loadMovies()
      }
    } catch (error) {
      alert('Error updating movie')
    }
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>BollywoodBio Admin Dashboard</h1>
        <button onClick={onLogout} className={styles.logoutButton}>
          Logout
        </button>
      </header>

      <div className={styles.content}>
        <div className={styles.actions}>
          <button onClick={handleAddMovie} className={styles.addButton}>
            + Add New Movie
          </button>
          <a href="/admin/contacts" className={styles.contactsButton}>
            View Contact Submissions
          </a>
        </div>

        {showForm && (
          <MovieForm
            movie={editingMovie}
            onSave={async () => {
              await loadMovies()
              setShowForm(false)
              setEditingMovie(null)
            }}
            onCancel={() => {
              setShowForm(false)
              setEditingMovie(null)
            }}
          />
        )}

        <div className={styles.moviesList}>
          <h2>Movies ({movies.length})</h2>
          <div className={styles.moviesGrid}>
            {movies.map((movie) => (
              <div key={movie.id} className={styles.movieCard}>
                <div className={styles.movieHeader}>
                  <h3>{movie.title}</h3>
                  {featured?.id === movie.id && (
                    <span className={styles.featuredBadge}>FEATURED</span>
                  )}
                </div>
                <div className={styles.movieImage}>
                  {movie.image && (
                    <img src={movie.image} alt={movie.title} />
                  )}
                </div>
                <div className={styles.movieInfo}>
                  <div className={styles.infoRow}>
                    <label>Active:</label>
                    <input
                      type="checkbox"
                      checked={movie.isActive}
                      onChange={() => handleToggleActive(movie)}
                    />
                  </div>
                  <div className={styles.infoRow}>
                    <label>Featured:</label>
                    <input
                      type="checkbox"
                      checked={featured?.id === movie.id}
                      onChange={() => handleSetFeatured(movie)}
                    />
                  </div>
                  <div className={styles.infoRow}>
                    <label>Previous Distribution:</label>
                    <input
                      type="checkbox"
                      checked={movie.isPreviousDistribution || false}
                      onChange={() => handleTogglePreviousDistribution(movie)}
                    />
                  </div>
                  <div className={styles.movieActions}>
                    <button
                      onClick={() => handleEditMovie(movie)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
