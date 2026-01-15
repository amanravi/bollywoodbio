import { getPostById, getPostsData } from '@/lib/posts'
import Header from '@/components/Header'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateStaticParams() {
  // This helps with pre-rendering, but won't be used since we're using dynamic
  return []
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id)

  if (!post || !post.isPublished) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <main>
      <Header />
      <article className={styles.postPage}>
        <div className={styles.container}>
          <Link href="/posts" className={styles.backLink}>
            ← Back to Articles
          </Link>

          {post.image && (
            <div className={styles.postImage}>
              <img src={post.image} alt={post.title} />
            </div>
          )}

          <header className={styles.postHeader}>
            {post.category && (
              <span className={styles.category}>{post.category}</span>
            )}
            <h1 className={styles.postTitle}>{post.title}</h1>
            <div className={styles.postMeta}>
              {post.author && (
                <span className={styles.author}>By {post.author}</span>
              )}
              <span className={styles.date}>{formatDate(post.publishedAt)}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className={styles.postContent}>
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className={styles.postFooter}>
            <Link href="/posts" className={styles.moreArticlesLink}>
              View More Articles →
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
