import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { getDataDir } from '@/lib/paths'

function getPostsFile() {
  return join(getDataDir(), 'posts.json')
}

async function readPostsFile() {
  const filePath = getPostsFile()
  if (!existsSync(filePath)) {
    const dir = getDataDir()
    await mkdir(dir, { recursive: true })
    await writeFile(filePath, JSON.stringify({ posts: [] }, null, 2), 'utf8')
  }
  const fileContents = await readFile(filePath, 'utf8')
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

    await writeFile(getPostsFile(), JSON.stringify(data, null, 2), 'utf8')
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

    await writeFile(getPostsFile(), JSON.stringify(data, null, 2), 'utf8')
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

    await writeFile(getPostsFile(), JSON.stringify(data, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
