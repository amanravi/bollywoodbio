import { getPostsData } from '@/lib/posts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostsSection from '@/components/PostsSection'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PostsPage() {
  const { posts } = await getPostsData()

  return (
    <main>
      <div className="goldStars" aria-hidden="true" />
      <Header />
      <section className={styles.postsPage}>
        <div className={styles.container}>
          <h1 className={`${styles.pageTitle} goldTitle`}>All Articles & News</h1>
          <p className={styles.pageDescription}>
            Stay updated with the latest Bollywood news, reviews, and industry insights.
          </p>
          <PostsSection posts={posts} featured={false} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
