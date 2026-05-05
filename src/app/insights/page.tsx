import React from 'react';
import { Metadata } from 'next';
import styles from '../page.module.css';
import heroStyles from '../components/Hero.module.css';
import Link from 'next/link';
import { createSlug } from '../utils/slug';

export const metadata: Metadata = {
  title: 'Company Insights & Strategic Thinking | Technorapide',
  description: 'Explore deep-dives into digital strategy, technical innovation, and company perspectives from the Technorapide team.',
};

async function getInsights() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/insights', { cache: 'no-store' });
    if (res.ok) return res.json();
    return [];
  } catch (e) {
    return [];
  }
}

export default async function InsightsListingPage() {
  const insights = await getInsights();
  const heroInsight = insights[0];
  const remainingInsights = insights.slice(1);

  return (
    <div className={styles.main} style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      
      {/* FIXED FEATURED HERO */}
      {heroInsight && (
        <section 
          className={heroStyles.hero} 
          style={{ 
            backgroundImage: `url(${heroInsight.image})`,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 1
          }}
        >
          <div className={heroStyles.overlay}></div>
          <div className={heroStyles.content}>
            <p className={styles.capLabel} style={{ color: 'var(--primary)', letterSpacing: '4px', marginBottom: '20px' }}>
              FEATURED PERSPECTIVE
            </p>
            <h1 className={heroStyles.title} style={{ fontSize: '5rem', lineHeight: '1', letterSpacing: '-3px' }}>
              {heroInsight.title}
            </h1>
            <Link href={`/insights/${createSlug(heroInsight.title)}`} style={{ marginTop: '40px', display: 'inline-block', padding: '15px 40px', border: '1px solid #fff', color: '#fff', textDecoration: 'none', fontWeight: 700, letterSpacing: '2px' }}>
              READ FEATURED PERSPECTIVE
            </Link>
          </div>
        </section>
      )}

      {/* ARCHIVE GRID SLIDING OVER HERO */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        marginTop: '100vh', 
        backgroundColor: '#000', 
        padding: '100px 20px',
        boxShadow: '0 -40px 100px rgba(0,0,0,0.8)'
      }}>
        <div style={{ marginBottom: '80px' }}>
          <p className={styles.capLabel} style={{ letterSpacing: '4px', color: 'var(--primary)' }}>DEEP DIVES</p>
          <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', letterSpacing: '-2px', marginTop: '10px' }}>
            Insights Archive
          </h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '20px',
          width: '100%'
        }}>
          {remainingInsights.map((insight: any) => (
            <Link key={insight._id} href={`/insights/${createSlug(insight.title)}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ 
                backgroundColor: '#0a0a0a', 
                border: '1px solid rgba(255,255,255,0.1)', 
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ height: '250px', overflow: 'hidden' }}>
                  <img src={insight.image} alt={insight.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                </div>
                <div style={{ padding: '30px' }}>
                  <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 800, marginBottom: '15px', letterSpacing: '2px' }}>
                    {new Date(insight.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}
                  </p>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '20px', lineHeight: '1.2' }}>{insight.title}</h2>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', textAlign: 'justify', margin: 0 }}>
                    {insight.description}
                  </p>
                  <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontWeight: 700 }}>
                    EXPLORE INSIGHT <span>&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
