'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from '../page.module.css';

interface CustomerStory {
  _id: string;
  name: string;
  role: string;
  message: string;
  imageLink: string;
}

const CustomerStories = () => {
  const [stories, setStories] = useState<CustomerStory[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://apifinal.technorapide.com/api/customer-stories')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.error("Error fetching customer stories:", err));
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (stories.length === 0) return null;

  return (
    <section className={styles.customerStoriesSection} style={{ backgroundColor: '#000', padding: '100px 0', color: '#fff', overflow: 'hidden' }}>
      <div className={styles.fullWidthContainer}>
        <div className={styles.insightsHeader} style={{ marginBottom: '50px', padding: '0 20px' }}>
          <div className={styles.insightsTitleArea}>
            <h2 className={styles.sectionTitle} style={{ color: '#fff', margin: 0 }}>Customer Stories</h2>
          </div>
          <div className={styles.insightsNav}>
            <button 
              className={styles.navBtn} 
              onClick={() => scroll('left')}
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
            >
              ←
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scroll('right')}
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
            >
              →
            </button>
          </div>
        </div>

        <div 
          className={styles.insightsGrid} 
          ref={scrollRef}
          style={{ 
            gap: '30px', 
            overflowX: 'auto', 
            padding: '0 20px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {stories.map((story) => (
            <div 
              key={story._id} 
              className={styles.insightCard}
              style={{ 
                minWidth: 'min(450px, 85vw)', 
                height: '600px', 
                position: 'relative',
                borderRadius: '16px',
                border: 'none',
                overflow: 'hidden',
                scrollSnapAlign: 'start'
              }}
            >
              {/* Background Image */}
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 1 
              }}>
                <img 
                  src={story.imageLink} 
                  alt={story.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                {/* Gradient Overlay */}
                <div style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '70%', 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' 
                }}></div>
              </div>

              {/* Content Overlay */}
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                width: '100%', 
                padding: '30px', 
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                <h3 style={{ fontSize: 'clamp(1.2rem, 5vw, 1.8rem)', fontWeight: 700, margin: 0, color: '#fff', lineHeight: 1.2 }}>
                  {story.role.split(',')[1]?.trim() || story.name}
                </h3>
                <p style={{ 
                  fontSize: 'clamp(0.9rem, 4vw, 1.1rem)', 
                  color: 'rgba(255,255,255,0.8)', 
                  lineHeight: '1.5', 
                  margin: 0, 
                  textAlign: 'left' 
                }}>
                  {story.message}
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', marginTop: '5px' }}>
                   <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                     {story.name}
                   </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
