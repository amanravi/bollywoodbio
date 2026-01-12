import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const POSTS_FILE = join(process.cwd(), 'data', 'posts.json')

export async function GET() {
  try {
    const fileContents = await readFile(POSTS_FILE, 'utf8')
    const data = JSON.parse(fileContents)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read posts data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const post = await request.json()
    const fileContents = await readFile(POSTS_FILE, 'utf8')
    const data = JSON.parse(fileContents)

    // Generate ID if not provided
    if (!post.id) {
      post.id = `post_${Date.now()}`
    }

    // Set published date if not provided
    if (!post.publishedAt) {
      post.publishedAt = new Date().toISOString()
    }

    // Add new post
    data.posts.push(post)

    await writeFile(POSTS_FILE, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true, post })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add post' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const post = await request.json()
    const fileContents = await readFile(POSTS_FILE, 'utf8')
    const data = JSON.parse(fileContents)

    // Update post in array
    const index = data.posts.findIndex((p: any) => p.id === post.id)
    if (index !== -1) {
      data.posts[index] = post
    } else {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    await writeFile(POSTS_FILE, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true, post })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const fileContents = await readFile(POSTS_FILE, 'utf8')
    const data = JSON.parse(fileContents)

    // Remove post from array
    data.posts = data.posts.filter((p: any) => p.id !== id)

    await writeFile(POSTS_FILE, JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
