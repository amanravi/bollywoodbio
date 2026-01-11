import Header from '@/components/Header'
import styles from './page.module.css'

export default function AboutPage() {
  return (
    <main>
      <Header />
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>About BollywoodBio</h1>
          
          <div className={styles.content}>
            <div className={styles.section}>
              <h2>Our Mission</h2>
              <p>
                BollywoodBio is a premier film distribution company dedicated to bringing 
                the best of Bollywood cinema to audiences worldwide. We specialize in 
                curating and distributing high-quality films that entertain, inspire, and 
                connect people through the magic of storytelling.
              </p>
            </div>

            <div className={styles.section}>
              <h2>What We Do</h2>
              <p>
                We work closely with filmmakers, studios, and theaters to ensure that 
                exceptional Bollywood films reach their intended audiences. Our distribution 
                network spans across multiple regions, bringing diverse cinematic experiences 
                to movie lovers everywhere.
              </p>
            </div>

            <div className={styles.section}>
              <h2>Our Commitment</h2>
              <p>
                At BollywoodBio, we are committed to excellence in film distribution. 
                We carefully select films that represent the best of Indian cinema, 
                ensuring quality entertainment for our audiences while supporting the 
                vibrant Bollywood film industry.
              </p>
            </div>

            <div className={styles.section}>
              <h2>Join Us</h2>
              <p>
                Experience the magic of Bollywood cinema with us. Book your tickets for 
                the latest releases and be part of an incredible cinematic journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
