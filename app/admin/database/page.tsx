'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

interface DatabaseStats {
  totalMovies: number
  activeMovies: number
  featuredMovies: number
  previousDistributions: number
  totalContacts: number
  unreadContacts: number
}

export default function DatabasePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [stats, setStats] = useState<DatabaseStats | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadStats()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        sessionStorage.setItem('admin_authenticated', 'true')
        setIsAuthenticated(true)
        loadStats()
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    }
  }

  const loadStats = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/database/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to load database stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push('/admin')
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h1>Database Access</h1>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="password">Admin Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
              />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Database Information</h1>
        <div className={styles.actions}>
          <button onClick={loadStats} className={styles.refreshButton}>
            Refresh
          </button>
          <button onClick={handleBack} className={styles.backButton}>
            Back to Admin
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading database stats...</div>
      ) : stats ? (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Movies</h3>
            <div className={styles.statValue}>{stats.totalMovies}</div>
            <div className={styles.statDetails}>
              <span>Active: {stats.activeMovies}</span>
              <span>Featured: {stats.featuredMovies}</span>
              <span>Previous: {stats.previousDistributions}</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <h3>Contacts</h3>
            <div className={styles.statValue}>{stats.totalContacts}</div>
            <div className={styles.statDetails}>
              <span>Unread: {stats.unreadContacts}</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3>Database Location</h3>
            <p className={styles.path}>data/bollywoodbio.db</p>
            <p className={styles.note}>
              The database file is stored on the server. Use SQLite browser tools to view/edit the database directly.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>How to View Database</h3>
            <div className={styles.instructions}>
              <h4>Option 1: SQLite Browser (Recommended)</h4>
              <ol>
                <li>Download <a href="https://sqlitebrowser.org/" target="_blank" rel="noopener noreferrer">DB Browser for SQLite</a></li>
                <li>Connect to your server via FTP/SFTP</li>
                <li>Download the file: <code>data/bollywoodbio.db</code></li>
                <li>Open it in DB Browser for SQLite</li>
              </ol>

              <h4>Option 2: Command Line (SSH)</h4>
              <pre className={styles.code}>
{`# Connect to your server via SSH
ssh your-username@your-server

# Navigate to your project
cd /path/to/bollywoodbio

# Open SQLite
sqlite3 data/bollywoodbio.db

# View tables
.tables

# View movies
SELECT * FROM movies;

# Exit
.quit`}
              </pre>

              <h4>Option 3: Admin Panel</h4>
              <p>Use the main admin panel to view and edit movies and contacts through the web interface.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.error}>Failed to load database stats</div>
      )}
    </div>
  )
}
