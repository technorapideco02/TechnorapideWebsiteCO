'use client';

import React, { useState, useEffect } from 'react';
import NProgress from 'nprogress';
import styles from './CareerOptions.module.css';

interface Career {
  _id: string;
  title: string;
  herolink: string;
  body: string[];
}

export default function CareerOptionsPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    NProgress.start();
    fetch('https://apifinal.technorapide.com/api/careers')
      .then(r => r.json())
      .then(data => {
        setCareers(data);
        setLoading(false);
        NProgress.done();
      })
      .catch(err => {
        console.error('Failed to fetch careers:', err);
        setLoading(false);
        NProgress.done();
      });
  }, []);

  const nextCareer = () => {
    setCurrentIndex((prev) => (prev + 1) % careers.length);
  };

  const prevCareer = () => {
    setCurrentIndex((prev) => (prev - 1 + careers.length) % careers.length);
  };

  if (loading && careers.length === 0) {
    return <div className={styles.container} />; // Show empty while nprogress runs
  }

  if (careers.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyContent}>
          <h2>No Careers Available</h2>
          <p>Check back later for new opportunities.</p>
        </div>
      </div>
    );
  }

  const currentCareer = careers[currentIndex];

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section 
        className={styles.hero} 
        style={{ backgroundImage: `url(${currentCareer.herolink})` }}
      >
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{currentCareer.title}</h1>
          <p className={styles.heroSubtitle}>Explore the role and join our global team of innovators.</p>
          
          <button 
            className={styles.scrollBtn}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            View Details
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </button>
        </div>

        {/* Carousel Controls */}
        {careers.length > 1 && (
          <>
            <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevCareer}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className={`${styles.navBtn} ${styles.next}`} onClick={nextCareer}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </>
        )}
      </section>

      {/* HTML Content Body */}
      <section className={styles.contentSection}>
        <div className={styles.contentWrapper}>
          <iframe 
            srcDoc={currentCareer.body[0]}
            className={styles.htmlFrame}
            title="Career Details"
            onLoad={(e) => {
              const frame = e.target as HTMLIFrameElement;
              if (frame.contentWindow) {
                const updateHeight = () => {
                  const body = frame.contentWindow?.document.body;
                  const html = frame.contentWindow?.document.documentElement;
                  if (body && html) {
                    const newHeight = Math.max(
                      body.scrollHeight, body.offsetHeight,
                      html.clientHeight, html.scrollHeight, html.offsetHeight
                    );
                    frame.style.height = `${newHeight}px`;
                  }
                };
                updateHeight();
                const interval = setInterval(updateHeight, 1000);
                return () => clearInterval(interval);
              }
            }}
          />
        </div>
      </section>
    </main>
  );
}
