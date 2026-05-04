'use client';

import React, { useRef } from 'react';
import styles from '../page.module.css';

interface PricingTier {
  _id: string;
  name: string;
  amount: number;
  discountedPrice: number;
  discount: number;
  imageLink: string;
}

interface PricingSectionProps {
  priceChart: PricingTier[];
}

const PricingSection: React.FC<PricingSectionProps> = ({ priceChart }) => {
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
    <section id="pricing" className={styles.newsSectionWhite} style={{ backgroundColor: '#fff', padding: '60px 0 100px' }}>
      <div className={styles.fullWidthContainer}>
        <div className={styles.insightsHeader}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p className={styles.capLabel} style={{ color: 'var(--primary)', marginBottom: 0 }}>INVESTMENT MODELS</p>
            <h2 className={styles.insightsMainTitle} style={{ color: '#1a1a1a' }}>Select Your Engagement Tier</h2>
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
        
        <div className={styles.insightsGrid} ref={scrollRef}>
          {priceChart.map((tier) => (
            <div 
              key={tier._id} 
              className={styles.insightCard} 
              style={{ 
                flex: '0 0 calc(100% - 40px)', 
                minWidth: '280px',
                backgroundColor: '#0b0e14', 
                border: '1px solid rgba(255,255,255,0.1)',
                scrollSnapAlign: 'center'
              }}
            >
              <div className={styles.insightImageWrapper} style={{ borderRadius: 0 }}>
                <img src={tier.imageLink} alt={tier.name} className={styles.insightImage} style={{ borderRadius: 0 }} />
              </div>
              <div className={styles.insightContent}>
                <div className={styles.insightText}>
                  <h3 className={styles.insightTitle} style={{ color: '#fff' }}>{tier.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginTop: '10px' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>₹{tier.discountedPrice}</span>
                    <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.3)', fontSize: '1rem', marginBottom: '4px' }}>₹{tier.amount}</span>
                  </div>
                  <p style={{ marginTop: '12px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px' }}>
                    {tier.discount}% STRATEGIC SAVINGS
                  </p>
                </div>
                <div className={styles.newsReadMoreContainer} style={{ marginTop: '30px' }}>
                  <button className={styles.newsReadMoreBtn} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#fff' }}>
                    Select Tier
                    <span className={styles.newsReadMoreArrow} style={{ color: '#fff' }}>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
