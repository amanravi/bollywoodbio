'use client'

import { useState, useEffect } from 'react'
import { Movie } from '@/lib/movies'
import styles from './MovieForm.module.css'

interface MovieFormProps {
  movie: Movie | null
  onSave: () => void
  onCancel: () => void
}

export default function MovieForm({ movie, onSave, onCancel }: MovieFormProps) {
  const [formData, setFormData] = useState<Partial<Movie>>({
    title: '',
    description: '',
    image: '',
    bannerImage: '',
    bannerType: 'trailer',
    bookingUrl: '',
    releaseDate: new Date().toISOString().split('T')[0],
    isActive: true,
    synopsis: '',
    trailerLink: '',
    cast: [],
    director: '',
    genre: [],
    duration: '',
    rating: '',
    language: '',
    isFeatured: false,
    isPreviousDistribution: false,
    showTrailer: false,
  })
  const [uploading, setUploading] = useState(false)
  const [bannerUploading, setBannerUploading] = useState(false)
  const [castInput, setCastInput] = useState('')
  const [genreInput, setGenreInput] = useState('')

  useEffect(() => {
    if (movie) {
      setFormData(movie)
      setCastInput(movie.cast?.join(', ') || '')
      setGenreInput(movie.genre?.join(', ') || '')
    }
  }, [movie])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.url }))
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      alert('Error uploading file')
    } finally {
      setUploading(false)
    }
  }

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setBannerUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.success) {
        setFormData(prev => ({ ...prev, bannerImage: data.url }))
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      alert('Error uploading file')
    } finally {
      setBannerUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Parse cast and genre arrays
    const cast = castInput.split(',').map(s => s.trim()).filter(s => s)
    const genre = genreInput.split(',').map(s => s.trim()).filter(s => s)

    const movieData = {
      ...formData,
      cast: cast.length > 0 ? cast : undefined,
      genre: genre.length > 0 ? genre : undefined,
    }

    try {
      const url = '/api/movies'
      const method = movie ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      })

      if (response.ok) {
        onSave()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to save movie')
      }
    } catch (error) {
      alert('Error saving movie')
    }
  }

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{movie ? 'Edit Movie' : 'Add New Movie'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Release Date *</label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Short Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={2}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Full Synopsis</label>
            <textarea
              name="synopsis"
              value={formData.synopsis}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Director</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Duration (e.g., 2h 30m)</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Rating (e.g., PG-13, A)</label>
              <input
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Cast (comma-separated)</label>
            <input
              type="text"
              value={castInput}
              onChange={(e) => setCastInput(e.target.value)}
              placeholder="Actor 1, Actor 2, Actor 3"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Genre (comma-separated)</label>
            <input
              type="text"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
              placeholder="Action, Drama, Comedy"
            />
          </div>

          <div className={styles.formGroup}>
            <label>YouTube Trailer Link</label>
            <input
              type="url"
              name="trailerLink"
              value={formData.trailerLink}
              onChange={handleInputChange}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Banner Type (Featured Banner)</label>
            <select
              name="bannerType"
              value={formData.bannerType || 'trailer'}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  bannerType: e.target.value as 'trailer' | 'poster',
                }))
              }
            >
              <option value="trailer">Trailer (YouTube)</option>
              <option value="poster">Poster (Landscape)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Booking URL *</label>
            <input
              type="url"
              name="bookingUrl"
              value={formData.bookingUrl}
              onChange={handleInputChange}
              required
              placeholder="https://booking-site.com/book/movie"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Poster Image</label>
            <div className={styles.uploadSection}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              {uploading && <span>Uploading...</span>}
              {formData.image && (
                <div className={styles.imagePreview}>
                  <img src={formData.image} alt="Preview" />
                  <span>{formData.image}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Banner Image (Landscape)</label>
            <div className={styles.uploadSection}>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                disabled={bannerUploading}
              />
              {bannerUploading && <span>Uploading...</span>}
              {formData.bannerImage && (
                <div className={styles.imagePreview}>
                  <img src={formData.bannerImage} alt="Banner Preview" />
                  <span>{formData.bannerImage}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.checkboxes}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              Active (visible on website)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
              />
              Featured (main banner movie)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isPreviousDistribution"
                checked={formData.isPreviousDistribution}
                onChange={handleInputChange}
              />
              Previous Distribution (moves to past films page)
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="showTrailer"
                checked={formData.showTrailer}
                onChange={handleInputChange}
              />
              Show Trailer on Homepage
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>
              {movie ? 'Update Movie' : 'Add Movie'}
            </button>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
