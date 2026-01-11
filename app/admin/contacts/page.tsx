'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  read: boolean
}

export default function ContactsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadContacts()
    } else {
      router.push('/admin')
    }
  }, [router])

  const loadContacts = async () => {
    try {
      const response = await fetch('/api/contact')
      const data = await response.json()
      // Sort by newest first
      const sorted = data.sort((a: ContactSubmission, b: ContactSubmission) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      setContacts(sorted)
    } catch (error) {
      console.error('Failed to load contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!isAuthenticated || loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  const unreadCount = contacts.filter(c => !c.read).length

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Contact Submissions</h1>
        <div className={styles.headerActions}>
          <span className={styles.unreadBadge}>
            {unreadCount} {unreadCount === 1 ? 'unread' : 'unread'}
          </span>
          <button onClick={() => router.push('/admin')} className={styles.backButton}>
            Back to Admin
          </button>
        </div>
      </header>

      <div className={styles.contactsList}>
        {contacts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No contact submissions yet.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div 
              key={contact.id} 
              className={`${styles.contactCard} ${!contact.read ? styles.unread : ''}`}
            >
              <div className={styles.contactHeader}>
                <div>
                  <h3>{contact.name}</h3>
                  <p className={styles.email}>{contact.email}</p>
                </div>
                <div className={styles.contactMeta}>
                  <span className={styles.subject}>{contact.subject}</span>
                  <span className={styles.date}>{formatDate(contact.timestamp)}</span>
                </div>
              </div>
              <div className={styles.contactMessage}>
                <p>{contact.message}</p>
              </div>
              <div className={styles.contactActions}>
                <a 
                  href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                  className={styles.replyButton}
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
