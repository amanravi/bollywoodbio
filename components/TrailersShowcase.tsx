import { Movie } from '@/lib/movies'
import styles from './TrailersShowcase.module.css'

interface TrailersShowcaseProps {
  movies: Movie[]
}

function getYouTubeVideoId(url: string): string | null {
  if (!url) return null

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

export default function TrailersShowcase({ movies }: TrailersShowcaseProps) {
  const items = movies
    .map((movie) => {
      const videoId = movie.trailerLink ? getYouTubeVideoId(movie.trailerLink) : null
      if (!videoId) return null
      return {
        movie,
        videoId,
        thumb: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      }
    })
    .filter(Boolean) as { movie: Movie; videoId: string; thumb: string }[]

  if (items.length === 0) {
    return null
  }

  const showcase = items.slice(0, 2)

  return (
    <section className={styles.showcaseSection}>
      <div className={styles.container}>
        <div className={styles.showcaseCard}>
          <h3 className={styles.title}>Trailers</h3>
          <div className={styles.grid}>
            {showcase.map(({ movie, thumb }) => (
              <a
                key={movie.id}
                href={movie.trailerLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tile}
              >
                <img src={thumb} alt={movie.title} />
                <span className={styles.playButton}>▶</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
