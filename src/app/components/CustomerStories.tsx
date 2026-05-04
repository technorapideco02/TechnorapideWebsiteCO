'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
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
  const [currentIndex, setCurrentIndex] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://apifinal.technorapide.com/api/customer-stories')
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.error("Error fetching customer stories:", err));
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth) + 1;
      if (index !== currentIndex && index > 0 && index <= stories.length) {
        setCurrentIndex(index);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.offsetWidth; 
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (stories.length === 0) return null;

  return (
    <section className={styles.customerStoriesSection} style={{ backgroundColor: '#000', padding: '80px 0 100px 0', color: '#fff', overflow: 'hidden' }}>
      <div className={styles.fullWidthContainer}>
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0 5%', marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 500, color: '#fff', margin: '0 0 10px 0', fontFamily: "'Outfit', sans-serif" }}>Customer Stories</h2>
            {/* Pagination: Hidden on Desktop */}
            <div className={styles.mobileOnly} style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333', letterSpacing: '2px', fontFamily: "'Figtree', sans-serif" }}>
              <span style={{ color: '#0070ad' }}>{currentIndex.toString().padStart(2, '0')}</span> — {stories.length.toString().padStart(2, '0')}
            </div>
          </div>
          
          {stories.length > 3 && (
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <button onClick={() => scroll('left')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.5rem' }} aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button onClick={() => scroll('right')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.5rem' }} aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Stories Grid */}
        <div 
          className={styles.insightsGrid} 
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ 
            gap: '30px', 
            overflowX: 'auto', 
            padding: '0 5% 50px 5%',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            display: 'flex',
            justifyContent: stories.length <= 2 ? 'center' : 'flex-start'
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @media (min-width: 1024px) {
              .desktop-card {
                flex: 0 0 calc(33.333% - 20px) !important;
                height: 600px !important;
              }
              .${styles.mobileOnly} {
                display: none !important;
              }
            }
            @media (max-width: 1023px) {
              .desktop-card {
                flex: 0 0 calc(100% - 40px) !important;
                height: 550px !important;
              }
            }
          `}} />

          {stories.map((story) => (
            <div 
              key={story._id} 
              className="desktop-card"
              style={{ 
                position: 'relative',
                borderRadius: '8px',
                border: 'none',
                overflow: 'hidden',
                scrollSnapAlign: 'center',
                backgroundColor: '#1a1a1a',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Background Image */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <img 
                  src={story.imageLink} 
                  alt={story.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                {/* Gradient Overlay */}
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)' 
                }}></div>
              </div>

              {/* Content Overlay */}
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                width: '100%', 
                padding: '40px 30px', 
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 600, margin: 0, color: '#fff', lineHeight: 1.2 }}>
                  {story.role.split(',')[1]?.trim() || story.name}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: 'rgba(255,255,255,0.9)', 
                  lineHeight: '1.6', 
                  margin: 0,
                  maxWidth: '95%'
                }}>
                  {story.message}
                </p>
                <Link 
                  href={`/customer-stories/${story._id}`} 
                  style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>READ MORE</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;
