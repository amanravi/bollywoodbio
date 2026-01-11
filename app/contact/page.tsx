import Header from '@/components/Header'
import ContactForm from '@/components/ContactForm'
import styles from './page.module.css'

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Contact Us</h1>
          
          <div className={styles.content}>
            <div className={styles.info}>
              <h2>Get in Touch</h2>
              <p>
                Have questions about our films or distribution services? We'd love to hear from you.
              </p>
              
              <div className={styles.contactDetails}>
                <div className={styles.detailItem}>
                  <h3>Email</h3>
                  <p>info@bollywoodbio.com</p>
                </div>
                
                <div className={styles.detailItem}>
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
                
                <div className={styles.detailItem}>
                  <h3>Office Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <div className={styles.formContainer}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
