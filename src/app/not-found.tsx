import Link from 'next/link'
import Navbar from './components/Navbar'
import styles from './page.module.css'

export default function NotFound() {
  return (
    <div className={styles.main} style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 800, marginBottom: '20px', color: 'var(--primary)' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', fontWeight: 300 }}>The page you are looking for does not exist or has been moved.</h2>
        <Link 
          href="/" 
          style={{ 
            padding: '15px 40px', 
            backgroundColor: 'var(--primary)', 
            color: '#fff', 
            borderRadius: '4px', 
            textDecoration: 'none', 
            fontWeight: 600,
            transition: 'all 0.3s ease'
          }}
        >
          Return Home
        </Link>
        <p style={{ marginTop: '40px', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
          If you are seeing this on a mobile device after a reload, please verify your server configuration.
        </p>
      </div>
    </div>
  )
}
