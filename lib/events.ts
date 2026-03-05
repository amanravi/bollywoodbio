import { readFile } from 'fs/promises'
import { join } from 'path'
import { getDataDir } from './paths'

// Re-export types and constants from the shared file
export { EVENT_TYPES } from './event-types'
export type { Event, EventsData } from './event-types'

import type { Event } from './event-types'

async function getEventsDataFromFile() {
  const eventsFile = join(getDataDir(), 'events.json')
  try {
    const fileContents = await readFile(eventsFile, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    return { events: [] }
  }
}

export async function getEventsData() {
  const eventsData = await getEventsDataFromFile()

  // Return all active events, sorted by date (upcoming first)
  const activeEvents = (eventsData.events as Event[])
    .filter((event: Event) => event.isActive)
    .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return {
    events: activeEvents,
  }
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const eventsData = await getEventsDataFromFile()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (eventsData.events as Event[])
    .filter((event: Event) => {
      if (!event.isActive) return false
      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate >= today
    })
    .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const upcoming = await getUpcomingEvents()
  return upcoming.filter((event: Event) => event.isFeatured).slice(0, 3)
}

export async function getActiveEventsForHomepage(): Promise<Event[]> {
  const upcoming = await getUpcomingEvents()
  // Show up to 3 upcoming events on homepage
  return upcoming.slice(0, 3)
}

export async function getAllEvents(): Promise<Event[]> {
  const eventsData = await getEventsDataFromFile()
  return eventsData.events as Event[]
}

export async function getEventById(id: string): Promise<Event | null> {
  const eventsData = await getEventsDataFromFile()
  return eventsData.events.find((e: Event) => e.id === id) || null
}
