import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { existsSync } from 'fs'

const EVENTS_FILE = join(process.cwd(), 'data', 'events.json')
const DEFAULT_DATA = JSON.stringify({ events: [] }, null, 2)

async function ensureEventsFile() {
  if (!existsSync(EVENTS_FILE)) {
    await mkdir(dirname(EVENTS_FILE), { recursive: true })
    await writeFile(EVENTS_FILE, DEFAULT_DATA, 'utf8')
  }
}

async function readEventsFile() {
  await ensureEventsFile()
  const fileContents = await readFile(EVENTS_FILE, 'utf8')
  return JSON.parse(fileContents)
}

export async function GET() {
  try {
    const data = await readEventsFile()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read events data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const event = await request.json()
    const data = await readEventsFile()

    // Generate ID if not provided
    if (!event.id) {
      event.id = `event_${Date.now()}`
    }

    // Set created date
    if (!event.createdAt) {
      event.createdAt = new Date().toISOString()
    }

    // Add new event
    data.events.push(event)

    await writeFile(EVENTS_FILE, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true, event })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add event' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const event = await request.json()
    const data = await readEventsFile()

    // Update event in array
    const index = data.events.findIndex((e: any) => e.id === event.id)
    if (index !== -1) {
      data.events[index] = event
    } else {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    await writeFile(EVENTS_FILE, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true, event })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const data = await readEventsFile()

    // Remove event from array
    data.events = data.events.filter((e: any) => e.id !== id)

    await writeFile(EVENTS_FILE, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
