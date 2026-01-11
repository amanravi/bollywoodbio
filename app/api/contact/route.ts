import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const CONTACTS_FILE = join(process.cwd(), 'data', 'contacts.json')

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  read: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), 'data')
    try {
      await mkdir(dataDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Read existing contacts or create new array
    let contacts: ContactSubmission[] = []
    try {
      const fileContents = await readFile(CONTACTS_FILE, 'utf8')
      contacts = JSON.parse(fileContents)
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }

    // Create new contact submission
    const newContact: ContactSubmission = {
      id: `contact_${Date.now()}`,
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    }

    // Add to array
    contacts.push(newContact)

    // Save to file
    await writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf8')

    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been received. We will get back to you soon!' 
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const fileContents = await readFile(CONTACTS_FILE, 'utf8')
    const contacts = JSON.parse(fileContents)
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json([])
  }
}
