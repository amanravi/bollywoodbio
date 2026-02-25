import { getDatabase, saveDb } from './db'

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  read: boolean
}

export async function createContact(contact: Omit<ContactSubmission, 'id' | 'timestamp' | 'read'>): Promise<ContactSubmission> {
  const db = await getDatabase()
  
  const id = `contact_${Date.now()}`
  const timestamp = new Date().toISOString()
  
  db.run(`
    INSERT INTO contacts (id, name, email, subject, message, timestamp, read)
    VALUES (?, ?, ?, ?, ?, ?, 0)
  `, [id, contact.name, contact.email, contact.subject, contact.message, timestamp])
  
  saveDb()
  
  return {
    id,
    ...contact,
    timestamp,
    read: false,
  }
}

export async function getAllContacts(): Promise<ContactSubmission[]> {
  const db = await getDatabase()
  
  const stmt = db.prepare('SELECT * FROM contacts ORDER BY timestamp DESC')
  const contacts: ContactSubmission[] = []
  
  while (stmt.step()) {
    const row = stmt.getAsObject({})
    const values = Object.values(row)
    contacts.push({
      id: values[0] as string,
      name: values[1] as string,
      email: values[2] as string,
      subject: values[3] as string,
      message: values[4] as string,
      timestamp: values[5] as string,
      read: Boolean(values[6]),
    })
  }
  stmt.free()
  
  return contacts
}
