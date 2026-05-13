'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import NProgress from 'nprogress';
import styles from '../CareerOptions.module.css';
import { extractId, createSlug } from '../../utils/slug';

interface Career {
  _id: string;
  title: string;
  herolink: string;
  body: string[];
}

export default function CareerDetailPage() {
  const { id } = useParams(); // 'id' will be the slug
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    NProgress.start();
    // Fetch all careers to find the one matching the slug
    fetch(`https://apifinal.technorapide.com/api/careers`)
      .then(r => r.json())
      .then(data => {
        const matched = data.find((c: Career) => createSlug(c.title) === id);
        if (matched) {
          setCareer(matched);
        } else {
          // Fallback: try fetching by ID directly if no slug match
          const cleanId = extractId(id as string);
          return fetch(`https://apifinal.technorapide.com/api/careers/${cleanId}`).then(r => r.json());
        }
      })
      .then(fallbackData => {
        if (fallbackData && !career) {
          setCareer(fallbackData);
        }
        setLoading(false);
        NProgress.done();
      })
      .catch(err => {
        console.error('Failed to fetch career details:', err);
        setLoading(false);
        NProgress.done();
      });
  }, [id, career]);

  if (loading && !career) {
    return <div className={styles.container} />; 
  }

  if (!career) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyContent}>
          <h2>Career Not Found</h2>
          <p>The opportunity you are looking for may have been filled.</p>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div 
          className={styles.heroBackground} 
          style={{ backgroundImage: `url(${career.herolink})` }}
        >
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{career.title}</h1>
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
      </section>

      {/* HTML Content Body */}
      <section className={styles.contentSection}>
        <div className={styles.contentWrapper}>
          <iframe 
            srcDoc={career.body[0]}
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
