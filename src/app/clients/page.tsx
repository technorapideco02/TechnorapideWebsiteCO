import React from 'react';
import Navbar from '../components/Navbar';
import pageStyles from '../page.module.css';
import styles from './Clients.module.css';
import { Metadata } from 'next';
import ClientSlider from './ClientSlider';
import ClientMarquee from './ClientMarquee';

async function getClientData() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/clients', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch (e) {
    console.error('Failed to fetch clients data:', e);
    return null;
  }
}

export const metadata: Metadata = {
  title: 'Our Clients | Technorapide',
  description: 'Trusted by innovation leaders worldwide. Explore the ecosystem of partners and enterprises we empower.',
};

export default async function ClientsPage() {
  const data = await getClientData();

  if (!data) {
    return (
      <div className={styles.main}>
        <Navbar />
        <div style={{ padding: '200px 20px', textAlign: 'center', color: '#fff' }}>
          <h1>Information not available at this moment.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Navbar />

      {/* Hero Section (Parallax) */}
      <div className={pageStyles.blogHero}>
        <div 
          className={pageStyles.blogHeroBackground} 
          style={{ backgroundImage: `url(${data.heroImage})` }}
        >
          <div className={pageStyles.blogHeroOverlay}></div>
        </div>
        
        <div className={pageStyles.blogHeroContent}>
          <p className={pageStyles.blogLabel}>Global Partnerships</p>
          <h1 className={pageStyles.blogHeroTitle}>{data.title}</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={styles.scrollContent}>
        
        {/* Intro Description */}
        <section className={styles.introSection}>
          <div className={styles.introContainer}>
            <p className={styles.introText}>
              {data.description}
            </p>
          </div>
        </section>

        {/* Cinematic Client Grid (Vertical Scroll) */}
        <section className={styles.clientsSection}>
          <div className={styles.grid}>
            {data.clients && data.clients.map((client: any) => (
              <a 
                key={client._id} 
                href={client.websiteLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.clientCard}
              >
                <div className={styles.imageContainer}>
                  <img 
                    src={client.imageLink} 
                    alt={client.title} 
                    className={styles.clientLogo}
                    loading="lazy"
                  />
                </div>
                
                <div className={styles.textBox}>
                  <h3 className={styles.clientTitle}>{client.title}</h3>
                  <p className={styles.clientDesc}>{client.description}</p>
                  <div className={styles.visitBtn}>
                    Explore Site <span>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
