'use client'

import { Post } from '@/lib/posts'
import Link from 'next/link'
import Image from 'next/image'
import styles from './PostsSection.module.css'

interface PostsSectionProps {
  posts: Post[]
  featured?: boolean
}

export default function PostsSection({ posts, featured = false }: PostsSectionProps) {
  if (posts.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (featured) {
    return (
      <section className={styles.postsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Latest Articles & News</h2>
            {posts.length > 3 && (
              <Link href="/posts" className={styles.viewAllLink}>
                View All Articles →
              </Link>
            )}
          </div>
          <div className={styles.featuredGrid}>
            {posts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`} className={styles.postCardLink}>
                <article className={styles.postCard}>
                  {post.image && (
                    <div className={styles.postImage}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className={styles.postContent}>
                    {post.category && (
                      <span className={styles.category}>{post.category}</span>
                    )}
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    {post.excerpt && (
                      <p className={styles.postExcerpt}>{post.excerpt}</p>
                    )}
                    <div className={styles.postMeta}>
                      {post.author && (
                        <span className={styles.author}>By {post.author}</span>
                      )}
                      <span className={styles.date}>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.postsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Articles & News</h2>
        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className={styles.postCardLink}>
              <article className={styles.postCard}>
                {post.image && (
                  <div className={styles.postImage}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className={styles.postContent}>
                  {post.category && (
                    <span className={styles.category}>{post.category}</span>
                  )}
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  {post.excerpt && (
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                  )}
                  <div className={styles.postMeta}>
                    {post.author && (
                      <span className={styles.author}>By {post.author}</span>
                    )}
                    <span className={styles.date}>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
