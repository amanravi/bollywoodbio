import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <a href="/">
            <img src="/images/logo1.png" alt="BollywoodBio" className={styles.logoImage} />
            <h1>BollywoodBio</h1>
          </a>
        </div>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/previous">Previous Films</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/admin" className={styles.adminLink}>Admin</a>
        </nav>
      </div>
    </header>
  )
}
