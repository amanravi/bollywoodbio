import { NextRequest, NextResponse } from 'next/server'

// Simple password check - in production, use proper authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Prash@1986'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}
