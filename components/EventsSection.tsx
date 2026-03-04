'use client'

import Link from 'next/link'
import { Event } from '@/lib/event-types'
import styles from './EventsSection.module.css'

interface EventsSectionProps {
  events: Event[]
}

export default function EventsSection({ events }: EventsSectionProps) {
  if (events.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.toLocaleDateString('en-US', { day: 'numeric' }),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      full: date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'long', 
        day: 'numeric',
        year: 'numeric',
      }),
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const h = parseInt(hours)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return `${h12}:${minutes} ${ampm}`
  }

  return (
    <section className={styles.eventsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <Link href="/events" className={styles.viewAllLink}>
            View All Events →
          </Link>
        </div>
        <div className={styles.eventsGrid}>
          {events.slice(0, 3).map((event) => {
            const date = formatDate(event.date)
            const displayType = event.eventType === 'Other' && event.customEventType
              ? event.customEventType
              : event.eventType

            return (
              <Link key={event.id} href="/events" className={styles.eventCardLink}>
                <article className={styles.eventCard}>
                  <div className={styles.dateBlock}>
                    <span className={styles.dateDay}>{date.day}</span>
                    <span className={styles.dateMonth}>{date.month}</span>
                  </div>
                  <div className={styles.eventContent}>
                    <span className={styles.eventType}>{displayType}</span>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <div className={styles.eventMeta}>
                      {event.time && (
                        <span className={styles.metaItem}>🕐 {formatTime(event.time)}</span>
                      )}
                      <span className={styles.metaItem}>📍 {event.venue}</span>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
