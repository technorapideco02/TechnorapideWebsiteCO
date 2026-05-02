'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';

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
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (industries.length === 0) return null;

  return (
    <section className={styles.insightsSection} style={{ backgroundColor: '#fff', borderTop: '1px solid #eee' }}>
      <div style={{ padding: '0 50px' }}>
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
              ←
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => scroll('right')}
              aria-label="Next industries"
              style={{ borderColor: '#ddd', color: '#000' }}
            >
              →
            </button>
          </div>
        </div>

        <div className={styles.insightsGrid} ref={scrollRef}>
          {industries.map((industry) => (
            <Link 
              href={`/industries/${industry._id}`} 
              key={industry._id} 
              className={styles.insightCard}
              style={{ minWidth: '400px', backgroundColor: '#fdfdfd', border: '1px solid #eee' }}
            >
              <div className={styles.insightImageWrapper}>
                <img 
                  src={industry.image} 
                  alt={industry.name} 
                  className={styles.insightImage} 
                />
              </div>
              <div className={styles.insightContent} style={{ padding: '40px' }}>
                <div className={styles.insightTag} style={{ backgroundColor: 'var(--primary)', color: '#fff' }}>INDUSTRY</div>
                <h3 className={styles.insightTitle} style={{ color: '#000', fontSize: '1.8rem' }}>{industry.name}</h3>
                <p className={styles.insightDesc} style={{ color: '#666', textAlign: 'justify' }}>
                  {industry.description}
                </p>
                <div className={styles.readMore} style={{ color: 'var(--primary)' }}>
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
