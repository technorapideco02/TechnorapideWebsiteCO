import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

async function getHeroData() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/image-assets/type/hero', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data[0] || null;
    }
    return null;
  } catch (e) {
    return null;
  }
}

const Hero = async () => {
  const heroData = await getHeroData();
  const assetUrl = heroData?.imageLinks?.[0] || null;
  const isVideo = assetUrl?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <section className={styles.hero}>
      <div 
        className={styles.heroBackground} 
        style={!isVideo && assetUrl ? { backgroundImage: `url(${assetUrl})` } : {}}
      >
        {isVideo && (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className={styles.heroVideo}
          >
            <source src={assetUrl} type={`video/${isVideo[1]}`} />
          </video>
        )}
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          {heroData?.heading || 'Innovating Your Digital Future'}
        </h1>
        <p className={styles.subtitle}>
          {heroData?.title || 'Empowering startups and enterprises with cutting-edge technology and human-centric design.'}
        </p>
        <div className={styles.ctaContainer}>
          <Link href="/request-services" className={styles.primaryBtn}>Get Started</Link>
          <Link href="/insights" className={styles.secondaryBtn}>Learn More</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
