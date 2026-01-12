import { readFile } from 'fs/promises'
import { join } from 'path'

const POSTS_FILE = join(process.cwd(), 'data', 'posts.json')

async function getPostsDataFromFile() {
  try {
    const fileContents = await readFile(POSTS_FILE, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    // Fallback to import if file read fails (for build time)
    const postsData = await import('@/data/posts.json')
    return postsData.default
  }
}

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
  // Read from file system to get latest data
  const postsData = await getPostsDataFromFile()
  
  // Filter only published posts, sorted by date (newest first)
  const publishedPosts = (postsData.posts as Post[])
    .filter((post: Post) => post.isPublished)
    .sort((a: Post, b: Post) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  
  return {
    posts: publishedPosts,
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  // Read from file system to get latest data
  const postsData = await getPostsDataFromFile()
  
  const publishedPosts = (postsData.posts as Post[])
    .filter((post: Post) => post.isPublished && post.featured)
    .sort((a: Post, b: Post) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3) // Get top 3 featured posts
  
  return publishedPosts
}

// Functions for admin panel
import { writeFile } from 'fs/promises'

export async function getAllPosts(): Promise<Post[]> {
  const postsData = await getPostsDataFromFile()
  return postsData.posts as Post[]
}

export async function getPostById(id: string): Promise<Post | null> {
  const postsData = await getPostsDataFromFile()
  return postsData.posts.find((p: Post) => p.id === id) || null
}

export async function createPost(post: Post): Promise<Post> {
  const postsData = await getPostsDataFromFile()

  if (!post.id) {
    post.id = `post_${Date.now()}`
  }

  if (!post.publishedAt) {
    post.publishedAt = new Date().toISOString()
  }

  postsData.posts.push(post)
  await writeFile(POSTS_FILE, JSON.stringify(postsData, null, 2), 'utf8')
  return post
}

export async function updatePost(post: Post): Promise<Post> {
  const postsData = await getPostsDataFromFile()

  const index = postsData.posts.findIndex((p: Post) => p.id === post.id)
  if (index !== -1) {
    postsData.posts[index] = post
  }

  await writeFile(POSTS_FILE, JSON.stringify(postsData, null, 2), 'utf8')
  return post
}

export async function deletePost(id: string): Promise<void> {
  const postsData = await getPostsDataFromFile()

  postsData.posts = postsData.posts.filter((p: Post) => p.id !== id)
  await writeFile(POSTS_FILE, JSON.stringify(postsData, null, 2), 'utf8')
}
