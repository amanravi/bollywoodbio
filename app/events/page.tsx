import { getEventsData } from '@/lib/events'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './events.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Events | BollywoodBio',
  description: 'Upcoming Bollywood events, premieres, screenings, and more.',
}

export default async function EventsPage() {
  let events: any[] = []

  try {
    const eventsData = await getEventsData()
    events = eventsData.events
  } catch (error) {
    console.error('[Events] Failed to load events:', error)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcomingEvents = events.filter(e => {
    const d = new Date(e.date)
    d.setHours(0, 0, 0, 0)
    return d >= today
  })

  const pastEvents = events.filter(e => {
    const d = new Date(e.date)
    d.setHours(0, 0, 0, 0)
    return d < today
  }).reverse()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const h = parseInt(hours)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return `${h12}:${minutes} ${ampm}`
  }

  return (
    <main className="homeLuxury">
      <div className="goldStars" aria-hidden="true" />
      <Header />
      <div className={styles.eventsPage}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Events</h1>
            <p className={styles.pageSubtitle}>
              Premieres, screenings, meetups, and more from the world of Bollywood
            </p>
          </div>

          {upcomingEvents.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Upcoming Events</h2>
              <div className={styles.eventsGrid}>
                {upcomingEvents.map((event) => {
                  const displayType = event.eventType === 'Other' && event.customEventType
                    ? event.customEventType
                    : event.eventType

                  return (
                    <article key={event.id} className={styles.eventCard}>
                      {event.image && (
                        <div className={styles.eventImage}>
                          <img src={event.image} alt={event.title} />
                        </div>
                      )}
                      <div className={styles.eventContent}>
                        <span className={styles.eventType}>{displayType}</span>
                        <h3 className={styles.eventTitle}>{event.title}</h3>
                        <p className={styles.eventDescription}>{event.description}</p>
                        <div className={styles.eventDetails}>
                          <div className={styles.detailItem}>
                            <span className={styles.detailIcon}>📅</span>
                            <span>{formatDate(event.date)}</span>
                            {event.endDate && event.endDate !== event.date && (
                              <span> — {formatDate(event.endDate)}</span>
                            )}
                          </div>
                          {event.time && (
                            <div className={styles.detailItem}>
                              <span className={styles.detailIcon}>🕐</span>
                              <span>{formatTime(event.time)}</span>
                            </div>
                          )}
                          <div className={styles.detailItem}>
                            <span className={styles.detailIcon}>📍</span>
                            <span>{event.venue}, {event.location}</span>
                          </div>
                        </div>
                        {event.ticketUrl && (
                          <a
                            href={event.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.ticketButton}
                          >
                            Get Tickets / RSVP
                          </a>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          )}

          {upcomingEvents.length === 0 && (
            <div className={styles.noEvents}>
              <p>No upcoming events at the moment. Check back soon!</p>
            </div>
          )}

          {pastEvents.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Past Events</h2>
              <div className={styles.eventsGrid}>
                {pastEvents.map((event) => {
                  const displayType = event.eventType === 'Other' && event.customEventType
                    ? event.customEventType
                    : event.eventType

                  return (
                    <article key={event.id} className={`${styles.eventCard} ${styles.pastEventCard}`}>
                      {event.image && (
                        <div className={styles.eventImage}>
                          <img src={event.image} alt={event.title} />
                        </div>
                      )}
                      <div className={styles.eventContent}>
                        <div className={styles.pastLabel}>Past Event</div>
                        <span className={styles.eventType}>{displayType}</span>
                        <h3 className={styles.eventTitle}>{event.title}</h3>
                        <p className={styles.eventDescription}>{event.description}</p>
                        <div className={styles.eventDetails}>
                          <div className={styles.detailItem}>
                            <span className={styles.detailIcon}>📅</span>
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className={styles.detailItem}>
                            <span className={styles.detailIcon}>📍</span>
                            <span>{event.venue}, {event.location}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
