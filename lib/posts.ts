import postsData from '@/data/posts.json'

export interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  image?: string
  author?: string
  publishedAt: string
  category?: string
  tags?: string[]
  isPublished: boolean
  featured?: boolean
}

export interface PostsData {
  posts: Post[]
}

export async function getPostsData(): Promise<PostsData> {
  // Filter only published posts, sorted by date (newest first)
  const publishedPosts = postsData.posts
    .filter(post => post.isPublished)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  
  return {
    posts: publishedPosts,
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const publishedPosts = postsData.posts
    .filter(post => post.isPublished && post.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3) // Get top 3 featured posts
  
  return publishedPosts
}

// Functions for admin panel
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const POSTS_FILE = join(process.cwd(), 'data', 'posts.json')

export async function getAllPosts(): Promise<Post[]> {
  const fileContents = await readFile(POSTS_FILE, 'utf8')
  const data = JSON.parse(fileContents)
  return data.posts
}

export async function getPostById(id: string): Promise<Post | null> {
  const fileContents = await readFile(POSTS_FILE, 'utf8')
  const data = JSON.parse(fileContents)
  return data.posts.find((p: Post) => p.id === id) || null
}

export async function createPost(post: Post): Promise<Post> {
  const fileContents = await readFile(POSTS_FILE, 'utf8')
  const data = JSON.parse(fileContents)

  if (!post.id) {
    post.id = `post_${Date.now()}`
  }

  if (!post.publishedAt) {
    post.publishedAt = new Date().toISOString()
  }

  data.posts.push(post)
  await writeFile(POSTS_FILE, JSON.stringify(data, null, 2), 'utf8')
  return post
}

export async function updatePost(post: Post): Promise<Post> {
  const fileContents = await readFile(POSTS_FILE, 'utf8')
  const data = JSON.parse(fileContents)

  const index = data.posts.findIndex((p: Post) => p.id === post.id)
  if (index !== -1) {
    data.posts[index] = post
  }

  await writeFile(POSTS_FILE, JSON.stringify(data, null, 2), 'utf8')
  return post
}

export async function deletePost(id: string): Promise<void> {
  const fileContents = await readFile(POSTS_FILE, 'utf8')
  const data = JSON.parse(fileContents)

  data.posts = data.posts.filter((p: Post) => p.id !== id)
  await writeFile(POSTS_FILE, JSON.stringify(data, null, 2), 'utf8')
}
