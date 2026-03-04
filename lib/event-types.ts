// Shared Event types and constants — safe for both client and server components

export const EVENT_TYPES = [
  'Film Screening',
  'Premiere',
  'Fan Meetup',
  'Press Conference',
  'Award Ceremony',
  'Music Launch',
  'Film Festival',
  'Workshop',
  'Panel Discussion',
  'Charity Event',
  'Other',
] as const

export interface Event {
  id: string
  title: string
  description: string
  eventType: string
  customEventType?: string
  date: string
  time?: string
  endDate?: string
  venue: string
  location: string
  image?: string
  ticketUrl?: string
  isActive: boolean
  isFeatured?: boolean
  createdAt: string
}

export interface EventsData {
  events: Event[]
}
