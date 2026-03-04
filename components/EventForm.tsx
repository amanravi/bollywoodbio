'use client'

import { useState, useEffect } from 'react'
import { Event, EVENT_TYPES } from '@/lib/event-types'
import styles from './EventForm.module.css'

interface EventFormProps {
  event: Event | null
  onSave: () => void
  onCancel: () => void
}

export default function EventForm({ event, onSave, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    eventType: 'Film Screening',
    customEventType: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    endDate: '',
    venue: '',
    location: '',
    image: '',
    ticketUrl: '',
    isActive: true,
    isFeatured: false,
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        date: event.date ? event.date.split('T')[0] : '',
        endDate: event.endDate ? event.endDate.split('T')[0] : '',
      })
    }
  }, [event])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const uploadData = new FormData()
    uploadData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, image: data.url }))
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      alert('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const eventData: Event = {
      id: event?.id || `event_${Date.now()}`,
      title: formData.title!,
      description: formData.description!,
      eventType: formData.eventType!,
      customEventType: formData.eventType === 'Other' ? formData.customEventType : undefined,
      date: formData.date!,
      time: formData.time || undefined,
      endDate: formData.endDate || undefined,
      venue: formData.venue!,
      location: formData.location!,
      image: formData.image || undefined,
      ticketUrl: formData.ticketUrl || undefined,
      isActive: formData.isActive ?? true,
      isFeatured: formData.isFeatured ?? false,
      createdAt: event?.createdAt || new Date().toISOString(),
    }

    try {
      const url = '/api/events'
      const method = event ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      })

      if (response.ok) {
        onSave()
      } else {
        alert('Failed to save event')
      }
    } catch (error) {
      alert('Error saving event')
    }
  }

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{event ? 'Edit Event' : 'Create New Event'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Event Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              placeholder="e.g., Pushpa 2 Grand Premiere"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Event Type *</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value }))}
                className={styles.selectInput}
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {formData.eventType === 'Other' && (
              <div className={styles.formGroup}>
                <label>Custom Event Type *</label>
                <input
                  type="text"
                  value={formData.customEventType}
                  onChange={(e) => setFormData(prev => ({ ...prev, customEventType: e.target.value }))}
                  required
                  placeholder="Specify event type"
                />
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
              placeholder="Describe the event..."
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Event Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>End Date (optional)</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Time (optional)</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Venue *</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                required
                placeholder="e.g., PVR INOX, Juhu"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Location / City *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              required
              placeholder="e.g., Mumbai, Maharashtra"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Ticket / RSVP URL (optional)</label>
            <input
              type="url"
              value={formData.ticketUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, ticketUrl: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Event Image</label>
            <div className={styles.uploadSection}>
              <label className={styles.uploadButton}>
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            {formData.image && (
              <img src={formData.image} alt="Preview" className={styles.imagePreview} />
            )}
          </div>

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={formData.isActive || false}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              />
              Active (visible on website)
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.isFeatured || false}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
              />
              Featured (show on homepage)
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>
              {event ? 'Update Event' : 'Create Event'}
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
