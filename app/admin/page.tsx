'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
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
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
    router.push('/')
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h1>BollywoodBio Admin</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <style jsx>{`
          .admin-login {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg-dark);
            padding: 2rem;
          }
          .login-container {
            background: var(--bg-card);
            padding: 3rem;
            border-radius: 12px;
            max-width: 400px;
            width: 100%;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          }
          .login-container h1 {
            color: var(--text-color);
            margin-bottom: 2rem;
            text-align: center;
            font-size: 2rem;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          .form-group label {
            display: block;
            color: var(--text-color);
            margin-bottom: 0.5rem;
            font-weight: 500;
          }
          .form-group input {
            width: 100%;
            padding: 0.8rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            color: var(--text-color);
            font-size: 1rem;
          }
          .form-group input:focus {
            outline: none;
            border-color: var(--primary-color);
          }
          .error-message {
            color: var(--primary-color);
            margin-bottom: 1rem;
            padding: 0.5rem;
            background: rgba(229, 9, 20, 0.1);
            border-radius: 4px;
            text-align: center;
          }
          .login-button {
            width: 100%;
            padding: 1rem;
            background: var(--primary-color);
            color: var(--text-color);
            border: none;
            border-radius: 4px;
            font-size: 1.1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .login-button:hover {
            background: #f40612;
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    )
  }

  return <AdminDashboard onLogout={handleLogout} />
}
