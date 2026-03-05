import { getMovieById, getAllMovieIds } from '@/lib/movies'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import styles from './page.module.css'
import MovieShareButtons from '@/components/MovieShareButtons'
import AdSense from '@/components/AdSense'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const movie = await getMovieById(params.id)

  if (!movie) {
    return { title: 'Movie Not Found - BollywoodBio' }
  }

  const description = movie.synopsis || movie.description
  const imageUrl = movie.bannerImages?.[0] || movie.bannerImage || movie.image

  return {
    title: `${movie.title} - BollywoodBio`,
    description: description.substring(0, 160),
    openGraph: {
      title: movie.title,
      description: description.substring(0, 160),
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
      type: 'video.movie',
    },
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      description: description.substring(0, 160),
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieById(params.id)

  if (!movie) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const isUpcoming = new Date(movie.releaseDate) > new Date()

  return (
    <main>
      <div className="goldStars" aria-hidden="true" />
      <Header />
      <AdSense adSlot="6726421643" adFormat="auto" />
      <article className={styles.moviePage}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>

          {/* Hero Banner */}
          <div className={styles.heroBanner}>
            <div
              className={styles.heroImage}
              style={{
                backgroundImage: `url(${movie.bannerImages?.[0] || movie.bannerImage || movie.image})`,
              }}
            >
              <div className={styles.heroOverlay}>
                <h1 className={`${styles.movieTitle} goldTitle`}>{movie.title}</h1>
                <div className={styles.movieMeta}>
                  {movie.duration && <span className={styles.metaTag}>{movie.duration}</span>}
                  {movie.rating && <span className={styles.metaTag}>{movie.rating}</span>}
                  {movie.language && <span className={styles.metaTag}>{movie.language}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className={styles.movieContent}>
            <div className={styles.mainContent}>
              {/* Genre Tags */}
              {movie.genre && movie.genre.length > 0 && (
                <div className={styles.genreTags}>
                  {movie.genre.map((g, i) => (
                    <span key={i} className={styles.genreTag}>{g}</span>
                  ))}
                </div>
              )}

              {/* Synopsis */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Synopsis</h2>
                <p className={styles.synopsis}>
                  {movie.synopsis || movie.description}
                </p>
              </div>

              {/* Details */}
              <div className={styles.detailsGrid}>
                {movie.director && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Director</span>
                    <span className={styles.detailValue}>{movie.director}</span>
                  </div>
                )}
                {movie.cast && movie.cast.length > 0 && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Cast</span>
                    <span className={styles.detailValue}>{movie.cast.join(', ')}</span>
                  </div>
                )}
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Release Date</span>
                  <span className={styles.detailValue}>{formatDate(movie.releaseDate)}</span>
                </div>
                {movie.duration && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Duration</span>
                    <span className={styles.detailValue}>{movie.duration}</span>
                  </div>
                )}
              </div>

              {/* Trailer */}
              {movie.trailerLink && (
                <div className={styles.trailerSection}>
                  <h2 className={styles.sectionTitle}>Trailer</h2>
                  <div className={styles.trailerWrapper}>
                    <iframe
                      src={movie.trailerLink.replace('watch?v=', 'embed/')}
                      title={`${movie.title} Trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={styles.trailerIframe}
                    />
                  </div>
                </div>
              )}

              {/* Banner Images Gallery */}
              {movie.bannerImages && movie.bannerImages.length > 1 && (
                <div className={styles.gallerySection}>
                  <h2 className={styles.sectionTitle}>Gallery</h2>
                  <div className={styles.galleryGrid}>
                    {movie.bannerImages.map((img, i) => (
                      <div key={i} className={styles.galleryItem}>
                        <img src={img} alt={`${movie.title} - Image ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.posterCard}>
                <img src={movie.image} alt={movie.title} className={styles.posterImage} />
              </div>

              {/* Action Buttons */}
              <div className={styles.actionButtons}>
                {!movie.isPreviousDistribution && movie.bookingUrl && (
                  <a
                    href={movie.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bookButton}
                  >
                    {isUpcoming ? 'Pre-Book Now' : 'Book Now'}
                  </a>
                )}
                {movie.trailerLink && (
                  <a
                    href={movie.trailerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.trailerButton}
                  >
                    ▶ Watch Trailer
                  </a>
                )}
              </div>

              {/* Share Buttons */}
              <MovieShareButtons movie={movie} />
            </aside>
          </div>
        </div>
      </article>
      <AdSense adSlot="1860961982" adFormat="auto" />
      <Footer />
    </main>
  )
}
