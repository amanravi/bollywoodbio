import { getMoviesData, getUpcomingMovies, getMoviesWithTrailers } from '@/lib/movies'
import { getFeaturedPosts } from '@/lib/posts'
import { getActiveEventsForHomepage } from '@/lib/events'
import Header from '@/components/Header'
import MoviePageContent from '@/components/MoviePageContent'
import PostsSection from '@/components/PostsSection'
import EventsSection from '@/components/EventsSection'
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
  let activeEvents: any[] = []

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

  try {
    activeEvents = await getActiveEventsForHomepage()
  } catch (error) {
    console.error('[Homepage] Failed to load events:', error)
  }

  return (
    <main className="homeLuxury">
      <div className="goldStars" aria-hidden="true" />
      <Header />
      <MoviePageContent
        featured={featured}
        movies={movies}
        upcomingMovies={upcomingMovies}
        bannerOverlay={
          moviesWithTrailers.length > 0 ? (
            <TrailersShowcase movies={moviesWithTrailers} />
          ) : null
        }
      />
      {activeEvents.length > 0 && (
        <EventsSection events={activeEvents} />
      )}
      {featuredPosts.length > 0 && (
        <PostsSection posts={featuredPosts} featured={true} />
      )}
      <Footer />
    </main>
  )
}
