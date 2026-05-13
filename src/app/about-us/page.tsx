import React from 'react';
import Navbar from '../components/Navbar';
import pageStyles from '../page.module.css';
import styles from './AboutUs.module.css';
import { Metadata } from 'next';

async function getAboutData() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/about-us', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch (e) {
    console.error('Failed to fetch about us data:', e);
    return null;
  }
}

export const metadata: Metadata = {
  title: 'Who We Are | Technorapide',
  description: 'Learn about Technorapide, our mission, and how we shape the digital landscape.',
};

export const dynamic = 'force-dynamic';


export default async function AboutUsPage() {
  const data = await getAboutData();

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
          style={{ backgroundImage: `url(${data.imagelink})` }}
        >
          <div className={pageStyles.blogHeroOverlay}></div>
        </div>
        
        <div className={pageStyles.blogHeroContent}>
          <p className={pageStyles.blogLabel}>Who We Are</p>
          <h1 className={pageStyles.blogHeroTitle}>{data.title}</h1>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={styles.scrollContent}>
        
        {/* Main Description */}
        <section className={styles.descSection}>
          <div className={styles.descContainer}>
            <p className={styles.descText}>
              {data.description}
            </p>
          </div>
        </section>

        {/* Capgemini-Style Overlapping Content Blocks */}
        {data.content && data.content.length > 0 && (
          <section className={styles.blocksSection}>
            <div className={styles.blockContainer}>
              {data.content.map((item: any, index: number) => {
                const isOdd = index % 2 === 0; // 0 is first item, we'll call it Odd layout (image left)
                return (
                  <div key={item._id || index} className={styles.block}>
                    {/* Image Container */}
                    <div className={isOdd ? styles.imageOdd : styles.imageEven}>
                      <img 
                        src={item.imglink} 
                        alt={item.title} 
                        className={styles.blockImage} 
                        loading="lazy"
                      />
                    </div>

                    {/* Overlapping Card */}
                    <div className={isOdd ? styles.cardOdd : styles.cardEven}>
                      <div className={styles.contentLine}></div>
                      <h2 className={styles.cardTitle}>{item.title}</h2>
                      <p className={styles.cardDesc}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
