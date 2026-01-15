'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>
            <img 
              src="/images/logo1.png" 
              alt="BollywoodBio" 
              className={styles.logoImage}
            />
          </Link>
        </div>
        
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}>
            <span className={isMenuOpen ? styles.hamburgerOpen : ''}></span>
            <span className={isMenuOpen ? styles.hamburgerOpen : ''}></span>
            <span className={isMenuOpen ? styles.hamburgerOpen : ''}></span>
          </span>
        </button>
        
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/previous" onClick={closeMenu}>Previous</Link>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
          <Link href="/admin" className={styles.adminLink} onClick={closeMenu}>Admin</Link>
        </nav>
      </div>
    </header>
  )
}
