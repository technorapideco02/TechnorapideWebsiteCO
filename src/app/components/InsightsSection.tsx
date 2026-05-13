'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';
import { createSlug } from '../utils/slug';

interface Insight {
  _id: string;
  title: string;
  description: string;
  image: string;
}

interface InsightsSectionProps {
  insights: Insight[];
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ insights }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState("Good Day");
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth) + 1;
      if (index !== currentIndex && index > 0 && index <= insights.length) {
        setCurrentIndex(index);
      }
    }
  };

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

  return (
    <section id="insights" className={styles.insightsSection}>
      <div className={styles.insightsHeader}>
        <div className={styles.blogTitleContainer}>
          <h2 className={styles.insightsMainTitle}>Cutting edge solutions to power up your business.</h2>
          <div className={styles.blogPagination}>
            {currentIndex.toString().padStart(2, '0')} — {insights.length.toString().padStart(2, '0')}
          </div>
        </div>
        <div className={styles.insightsNav}>
          <button onClick={() => scroll('left')} className={styles.navBtn} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <button onClick={() => scroll('right')} className={styles.navBtn} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.insightsGrid} ref={scrollRef} onScroll={handleScroll}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 1024px) {
            .insight-card-custom {
              flex: 0 0 calc(33.333% - 20px) !important;
              margin-right: 30px !important;
              flex-shrink: 0 !important;
            }
            .insight-grid-custom {
              justify-content: ${insights.length <= 3 ? 'center' : 'flex-start'} !important;
            }
          }
          @media (max-width: 1023px) {
            .insight-card-custom {
              flex: 0 0 85vw !important;
              margin-right: 15px !important;
              flex-shrink: 0 !important;
            }
          }
        `}} />
        {insights.map((insight) => (
            <div key={insight._id} className={`${styles.insightCard} insight-card-custom`}>
              <Link href={`/insights/${createSlug(insight.title)}`} className={styles.insightImageWrapper}>
                <img src={insight.image} alt={insight.title} className={styles.insightImage} />
              </Link>
              <div className={styles.insightContent}>
                <div className={styles.insightText}>
                  <h3 className={styles.insightTitle}>{insight.title}</h3>
                  <p className={styles.insightDescription}>{insight.description}</p>
                </div>
                <Link href={`/insights/${createSlug(insight.title)}`} className={styles.insightArrowBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default InsightsSection;
