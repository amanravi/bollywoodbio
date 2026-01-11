'use client'

import { useState } from 'react'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => {
          setSubmitted(false)
        }, 5000)
      } else {
        alert(data.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      alert('Error sending message. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Send us a Message</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="subject">Subject *</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        >
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="distribution">Distribution Services</option>
          <option value="partnership">Partnership Opportunities</option>
          <option value="support">Customer Support</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>

      {submitted && (
        <div className={styles.successMessage}>
          Thank you! Your message has been sent.
        </div>
      )}

      <button type="submit" className={styles.submitButton}>
        Send Message
      </button>
    </form>
  )
}
