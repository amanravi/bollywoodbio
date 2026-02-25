import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Bollywood Quote */}
        <div className={styles.quoteSection}>
          <blockquote className={styles.quote}>
            &ldquo;Picture abhi baaki hai mere dost&rdquo;
          </blockquote>
          <cite className={styles.quoteAuthor}>&mdash; Om Shanti Om</cite>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Footer Content */}
        <div className={styles.footerGrid}>
          {/* Brand */}
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.brandName}>
              BollywoodBio
            </Link>
            <p className={styles.brandTagline}>
              Your premier destination for Bollywood cinema. Discover the latest releases, 
              book tickets, and stay updated with the world of Indian entertainment.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <nav className={styles.footerNav}>
              <Link href="/">Home</Link>
              <Link href="/posts">Articles</Link>
              <Link href="/previous">Previous Movies</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>

          {/* Categories */}
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Explore</h4>
            <nav className={styles.footerNav}>
              <Link href="/">Now Showing</Link>
              <Link href="/">Upcoming Releases</Link>
              <Link href="/posts">Box Office News</Link>
              <Link href="/posts">Reviews</Link>
              <Link href="/">Trailers</Link>
            </nav>
          </div>

          {/* Connect */}
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Connect</h4>
            <nav className={styles.footerNav}>
              <Link href="/contact">Get In Touch</Link>
              <Link href="/about">Our Story</Link>
              <Link href="/admin">Admin Panel</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} BollywoodBio. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with ❤️ for Bollywood lovers
          </p>
        </div>
      </div>
    </footer>
  )
}
