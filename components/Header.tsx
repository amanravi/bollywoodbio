import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <img 
              src="/images/logo1.png" 
              alt="BollywoodBio" 
              className={styles.logoImage}
            />
            <h1>BollywoodBio</h1>
          </Link>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/previous">Previous</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin" className={styles.adminLink}>Admin</Link>
        </nav>
      </div>
    </header>
  )
}
