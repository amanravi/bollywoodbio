import { getPreviousMovies } from '@/lib/movies'
import Header from '@/components/Header'
import PreviousMoviesGrid from '@/components/PreviousMoviesGrid'
import styles from './page.module.css'

// Force dynamic rendering to pick up admin changes on Hostinger
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PreviousDistributionsPage() {
  const movies = await getPreviousMovies()

  return (
    <main>
      <Header />
      <section className={styles.previousSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Previous Distributions</h1>
          <p className={styles.subtitle}>
            Explore our past film distributions and relive the cinematic experiences we've brought to audiences.
          </p>
          <PreviousMoviesGrid movies={movies} />
        </div>
      </section>
    </main>
  )
}
