import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { existsSync } from 'fs'

const POSTS_FILE = join(process.cwd(), 'data', 'posts.json')
const DEFAULT_DATA = JSON.stringify({ posts: [] }, null, 2)

async function ensurePostsFile() {
  if (!existsSync(POSTS_FILE)) {
    await mkdir(dirname(POSTS_FILE), { recursive: true })
    await writeFile(POSTS_FILE, DEFAULT_DATA, 'utf8')
  }
}

async function readPostsFile() {
  await ensurePostsFile()
  const fileContents = await readFile(POSTS_FILE, 'utf8')
  return JSON.parse(fileContents)
}

export async function GET() {
  try {
    const data = await readPostsFile()
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
    const data = await readPostsFile()

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
    const data = await readPostsFile()

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
    const data = await readPostsFile()

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
