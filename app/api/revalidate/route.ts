import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Check authentication - simple password check
    const { password } = await request.json()
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Prash@1986'
    
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Revalidate the homepage and other dynamic pages
    revalidatePath('/')
    revalidatePath('/previous')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Cache cleared and pages revalidated',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
