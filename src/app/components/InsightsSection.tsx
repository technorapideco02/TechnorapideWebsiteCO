'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.offsetWidth / 3 * 2;
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
        <h2 className={styles.insightsMainTitle}>Cutting edge solutions to power up your business</h2>
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
      
      <div className={styles.insightsGrid} ref={scrollRef}>
        {insights.map((insight) => (
          <div key={insight._id} className={styles.insightCard}>
            <Link href={`/insights/${insight._id}`} className={styles.insightImageWrapper}>
              <img src={insight.image} alt={insight.title} className={styles.insightImage} />
            </Link>
            <div className={styles.insightContent}>
              <div className={styles.insightTag}>INSIGHT</div>
              <div className={styles.insightText}>
                <h3 className={styles.insightTitle}>{insight.title}</h3>
                <p className={styles.insightDescription}>{insight.description}</p>
              </div>
              <Link href={`/insights/${insight._id}`} className={styles.insightArrowBtn}>
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
