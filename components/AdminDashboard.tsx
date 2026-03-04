'use client'

import { useState, useEffect } from 'react'
import { Movie } from '@/lib/movies'
import { Post } from '@/lib/posts'
import { Event } from '@/lib/event-types'
import MovieForm from './MovieForm'
import PostForm from './PostForm'
import EventForm from './EventForm'
import styles from './AdminDashboard.module.css'

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'movies' | 'posts' | 'events'>('movies')
  const [movies, setMovies] = useState<Movie[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [featured, setFeatured] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [showMovieForm, setShowMovieForm] = useState(false)
  const [showPostForm, setShowPostForm] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)

  useEffect(() => {
    loadMovies()
    loadPosts()
    loadEvents()
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

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Failed to load posts:', error)
    }
  }

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      setEvents(data.events || [])
    } catch (error) {
      console.error('Failed to load events:', error)
    }
  }

  // Helper function to revalidate cache after data changes
  const revalidateCache = async () => {
    try {
      // Use the admin password to revalidate cache
      const password = 'Prash@1986'
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
    } catch (error) {
      console.error('Failed to revalidate cache:', error)
      // Don't show error to user, as it's not critical - the data is saved, cache will update eventually
    }
  }

  const handleAddMovie = () => {
    setEditingMovie(null)
    setShowMovieForm(true)
  }

  const handleAddPost = () => {
    setEditingPost(null)
    setShowPostForm(true)
  }

  const handleAddEvent = () => {
    setEditingEvent(null)
    setShowEventForm(true)
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setShowEventForm(true)
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return
    }

    try {
      const response = await fetch('/api/events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        await loadEvents()
        await revalidateCache()
      } else {
        alert('Failed to delete event')
      }
    } catch (error) {
      alert('Error deleting event')
    }
  }

  const handleToggleEventActive = async (event: Event) => {
    const updated = { ...event, isActive: !event.isActive }
    try {
      const response = await fetch('/api/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })

      if (response.ok) {
        await loadEvents()
        await revalidateCache()
      }
    } catch (error) {
      alert('Error updating event')
    }
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setShowPostForm(true)
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        await loadPosts()
        await revalidateCache()
      } else {
        alert('Failed to delete post')
      }
    } catch (error) {
      alert('Error deleting post')
    }
  }

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie)
    setShowMovieForm(true)
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
        await revalidateCache()
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
        await revalidateCache()
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
      await revalidateCache()
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
        await revalidateCache()
      }
    } catch (error) {
      alert('Error updating movie')
    }
  }

  const handleToggleShowTrailer = async (movie: Movie) => {
    const updated = { 
      ...movie, 
      showTrailer: !movie.showTrailer
    }
    try {
      const response = await fetch('/api/movies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })

      if (response.ok) {
        await loadMovies()
        await revalidateCache()
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
        <div className={styles.tabs}>
          <button
            className={activeTab === 'movies' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('movies')}
          >
            Movies
          </button>
          <button
            className={activeTab === 'posts' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('posts')}
          >
            Posts & Articles
          </button>
          <button
            className={activeTab === 'events' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
        </div>

        <div className={styles.actions}>
          {activeTab === 'movies' && (
            <button onClick={handleAddMovie} className={styles.addButton}>
              + Add New Movie
            </button>
          )}
          {activeTab === 'posts' && (
            <button onClick={handleAddPost} className={styles.addButton}>
              + Add New Post
            </button>
          )}
          {activeTab === 'events' && (
            <button onClick={handleAddEvent} className={styles.addButton}>
              + Create New Event
            </button>
          )}
          <a href="/admin/contacts" className={styles.contactsButton}>
            View Contact Submissions
          </a>
        </div>

        {showMovieForm && (
          <MovieForm
            movie={editingMovie}
            onSave={async () => {
              await loadMovies()
              await revalidateCache()
              setShowMovieForm(false)
              setEditingMovie(null)
            }}
            onCancel={() => {
              setShowMovieForm(false)
              setEditingMovie(null)
            }}
          />
        )}

        {showPostForm && (
          <PostForm
            post={editingPost}
            onSave={async () => {
              await loadPosts()
              await revalidateCache()
              setShowPostForm(false)
              setEditingPost(null)
            }}
            onCancel={() => {
              setShowPostForm(false)
              setEditingPost(null)
            }}
          />
        )}

        {showEventForm && (
          <EventForm
            event={editingEvent}
            onSave={async () => {
              await loadEvents()
              await revalidateCache()
              setShowEventForm(false)
              setEditingEvent(null)
            }}
            onCancel={() => {
              setShowEventForm(false)
              setEditingEvent(null)
            }}
          />
        )}

        {activeTab === 'movies' && (
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
                    <div className={styles.infoRow}>
                      <label>Show Trailer:</label>
                      <input
                        type="checkbox"
                        checked={movie.showTrailer || false}
                        onChange={() => handleToggleShowTrailer(movie)}
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
        )}

        {activeTab === 'posts' && (
          <div className={styles.postsList}>
            <h2>Posts & Articles ({posts.length})</h2>
            <div className={styles.postsGrid}>
              {posts.map((post) => (
                <div key={post.id} className={styles.postCard}>
                  <div className={styles.postHeader}>
                    <h3>{post.title}</h3>
                    <div className={styles.postBadges}>
                      {post.featured && (
                        <span className={styles.featuredBadge}>FEATURED</span>
                      )}
                      {post.isPublished ? (
                        <span className={styles.publishedBadge}>PUBLISHED</span>
                      ) : (
                        <span className={styles.draftBadge}>DRAFT</span>
                      )}
                    </div>
                  </div>
                  {post.image && (
                    <div className={styles.postImage}>
                      <img src={post.image} alt={post.title} />
                    </div>
                  )}
                  <div className={styles.postInfo}>
                    <div className={styles.postMeta}>
                      {post.category && <span className={styles.category}>{post.category}</span>}
                      {post.author && <span className={styles.author}>By {post.author}</span>}
                    </div>
                    {post.excerpt && (
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                    )}
                    <div className={styles.postActions}>
                      <button
                        onClick={() => handleEditPost(post)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
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
        )}

        {activeTab === 'events' && (
          <div className={styles.eventsList}>
            <h2>Events ({events.length})</h2>
            <div className={styles.eventsGrid}>
              {events.map((event) => {
                const eventDate = new Date(event.date)
                const isPast = eventDate < new Date()
                const displayType = event.eventType === 'Other' && event.customEventType
                  ? event.customEventType
                  : event.eventType

                return (
                  <div key={event.id} className={`${styles.eventCard} ${isPast ? styles.pastEvent : ''}`}>
                    <div className={styles.eventHeader}>
                      <h3>{event.title}</h3>
                      <div className={styles.postBadges}>
                        <span className={styles.eventTypeBadge}>{displayType}</span>
                        {event.isActive ? (
                          <span className={styles.publishedBadge}>ACTIVE</span>
                        ) : (
                          <span className={styles.draftBadge}>INACTIVE</span>
                        )}
                        {isPast && (
                          <span className={styles.draftBadge}>PAST</span>
                        )}
                      </div>
                    </div>
                    {event.image && (
                      <div className={styles.postImage}>
                        <img src={event.image} alt={event.title} />
                      </div>
                    )}
                    <div className={styles.eventInfo}>
                      <div className={styles.eventMeta}>
                        <span>📅 {eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        {event.time && <span>🕐 {event.time}</span>}
                      </div>
                      <div className={styles.eventMeta}>
                        <span>📍 {event.venue}, {event.location}</span>
                      </div>
                      <p className={styles.postExcerpt}>{event.description}</p>
                      <div className={styles.infoRow}>
                        <label>Active:</label>
                        <input
                          type="checkbox"
                          checked={event.isActive}
                          onChange={() => handleToggleEventActive(event)}
                        />
                      </div>
                      <div className={styles.postActions}>
                        <button
                          onClick={() => handleEditEvent(event)}
                          className={styles.editButton}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
