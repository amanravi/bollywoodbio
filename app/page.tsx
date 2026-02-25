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
  const { featured, movies } = await getMoviesData()
  const upcomingMovies = await getUpcomingMovies()
  const featuredPosts = await getFeaturedPosts()
  const moviesWithTrailers = await getMoviesWithTrailers()

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
