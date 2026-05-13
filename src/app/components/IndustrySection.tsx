'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';
import { createSlug } from '../utils/slug';

interface Industry {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const IndustrySection = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://apifinal.technorapide.com/api/industries')
      .then(res => res.json())
      .then(data => setIndustries(data))
      .catch(err => console.error("Error fetching industries:", err));
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const isMobile = window.innerWidth <= 1024;
      const scrollAmount = isMobile ? current.offsetWidth : (current.offsetWidth / 3); 
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (industries.length === 0) return null;

  return (
    <section className={styles.industrySectionMain}>
      <div className={styles.sectionContainer}>
        <div className={styles.insightsHeader}>
          <div className={styles.insightsTitleArea}>
            <p className={styles.capLabel} style={{ color: 'var(--primary)' }}>OUR REACH</p>
            <h2 className={styles.insightsHeading} style={{ color: '#000' }}>Industries We Serve</h2>
          </div>
          <div className={styles.insightsNav}>
            <button 
              className={styles.navBtn} 
              onClick={() => scroll('left')}
              aria-label="Previous industries"
              style={{ borderColor: '#ddd', color: '#000' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scroll('right')}
              aria-label="Next industries"
              style={{ borderColor: '#ddd', color: '#000' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.insightsGrid} ref={scrollRef}>
          <style dangerouslySetInnerHTML={{ __html: `
            @media (min-width: 1024px) {
              .industry-card-custom {
                flex: 0 0 calc(33.333% - 20px) !important;
                margin-right: 30px !important;
                flex-shrink: 0 !important;
              }
              .industry-grid-custom {
                justify-content: ${industries.length <= 3 ? 'center' : 'flex-start'} !important;
              }
            }
            @media (max-width: 1023px) {
              .industry-card-custom {
                flex: 0 0 85vw !important;
                margin-right: 15px !important;
                flex-shrink: 0 !important;
              }
            }
          `}} />
          {industries.map((industry) => (
            <Link 
              href={`/industries/${createSlug(industry.name)}`} 
              key={industry._id} 
              className={`${styles.insightCardWhite} industry-card-custom`}
              aria-label={`Learn more about our ${industry.name} industry solutions`}
            >
              <div className={styles.insightImageWrapper}>
                <img 
                  src={industry.image} 
                  alt={`${industry.name} solutions by Technorapide`} 
                  className={styles.insightImage} 
                />
              </div>
              <div className={styles.insightContent}>
                <div className={styles.insightTag} style={{ backgroundColor: 'var(--primary)', color: '#fff' }}>INDUSTRY</div>
                <h3 className={styles.insightTitleResponsive}>{industry.name}</h3>
                <p className={styles.insightDescResponsive}>
                  {industry.description}
                </p>
                <div className={styles.readMoreResponsive}>
                  Explore Solutions →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
