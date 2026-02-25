import { getMoviesData, getUpcomingMovies, getMoviesWithTrailers } from '@/lib/movies'
import { getFeaturedPosts } from '@/lib/posts'
import Header from '@/components/Header'
import MoviePageContent from '@/components/MoviePageContent'
import UpcomingMovies from '@/components/UpcomingMovies'
import PostsSection from '@/components/PostsSection'
import TrailersShowcase from '@/components/TrailersShowcase'
import Footer from '@/components/Footer'

// Force dynamic rendering to pick up admin changes on Hostinger
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  let featured = null
  let movies: any[] = []
  let upcomingMovies: any[] = []
  let featuredPosts: any[] = []
  let moviesWithTrailers: any[] = []

  try {
    const moviesData = await getMoviesData()
    featured = moviesData.featured
    movies = moviesData.movies
  } catch (error) {
    console.error('[Homepage] Failed to load movies:', error)
  }

  try {
    upcomingMovies = await getUpcomingMovies()
  } catch (error) {
    console.error('[Homepage] Failed to load upcoming movies:', error)
  }

  try {
    featuredPosts = await getFeaturedPosts()
  } catch (error) {
    console.error('[Homepage] Failed to load featured posts:', error)
  }

  try {
    moviesWithTrailers = await getMoviesWithTrailers()
  } catch (error) {
    console.error('[Homepage] Failed to load trailers:', error)
  }

  return (
    <main className="homeLuxury">
      <div className="goldStars" aria-hidden="true" />
      <Header />
      <MoviePageContent
        featured={featured}
        movies={movies}
        bannerOverlay={
          moviesWithTrailers.length > 0 ? (
            <TrailersShowcase movies={moviesWithTrailers} />
          ) : null
        }
      />
      {upcomingMovies.length > 0 && (
        <UpcomingMovies movies={upcomingMovies} />
      )}
      {featuredPosts.length > 0 && (
        <PostsSection posts={featuredPosts} featured={true} />
      )}
      <Footer />
    </main>
  )
}
