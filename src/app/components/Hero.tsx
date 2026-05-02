import React from 'react';
import styles from './Hero.module.css';

async function getHeroAsset() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/image-assets/type/hero', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data[0]?.imageLinks?.[0] || null;
    }
    return null;
  } catch (e) {
    return null;
  }
}

const Hero = async () => {
  const assetUrl = await getHeroAsset();
  const isVideo = assetUrl?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <section className={styles.hero} style={!isVideo && assetUrl ? { backgroundImage: `url(${assetUrl})` } : {}}>
      
      {isVideo && (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.heroVideo}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        >
          <source src={assetUrl} type={`video/${isVideo[1]}`} />
        </video>
      )}

      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Innovating Your Digital Future
        </h1>
        <p className={styles.subtitle}>
          Empowering startups and enterprises with cutting-edge technology and human-centric design.
        </p>
        <div className={styles.ctaContainer}>
          <button className={styles.primaryBtn}>Get Started</button>
          <button className={styles.secondaryBtn}>Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
