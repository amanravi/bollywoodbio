import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import styles from './page.module.css'

export default function ContactPage() {
  return (
    <main>
      <div className="goldStars" aria-hidden="true" />
      <Header />
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h1 className={`${styles.title} goldTitle`}>Contact Us</h1>
          
          <div className={styles.content}>
            <div className={styles.info}>
              <h2>Get in Touch</h2>
              <p>
                Have questions about our films or distribution services? We'd love to hear from you.
              </p>
              
              <div className={styles.contactDetails}>
                <div className={styles.detailItem}>
                  <h3>Email</h3>
                  <p>prashant@jains.se</p>
                </div>
                
                <div className={styles.detailItem}>
                  <h3>Phone</h3>
                  <p>+91-7654000006</p>
                </div>
                
                <div className={styles.detailItem}>
                  <h3>Website</h3>
                  <p>www.bollywoodbio.se</p>
                </div>
                
                <div className={styles.detailItem}>
                  <h3>Founder & CEO</h3>
                  <p>Prashantt Jain</p>
                </div>
              </div>
            </div>

            <div className={styles.formContainer}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
