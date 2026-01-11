import { getMoviesData } from '@/lib/movies'
import Header from '@/components/Header'
import MoviePageContent from '@/components/MoviePageContent'

export default async function Home() {
  const { featured, movies } = await getMoviesData()

  return (
    <main>
      <Header />
      <MoviePageContent featured={featured} movies={movies} />
    </main>
  )
}
