import React from 'react';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

import Navbar from '../../components/Navbar';
import PricingSection from '../../components/PricingSection';
import HtmlRenderer from '../../components/HtmlRenderer';
import styles from '../../page.module.css';
import heroStyles from '../../components/Hero.module.css';

async function getService(id: string | undefined) {
  if (!id) return null;
  // Handle SEO-friendly slug--ID pattern
  const actualId = id.split('--').pop() || id;
  const cleanId = actualId.trim();
  try {
    const res = await fetch(`https://apifinal.technorapide.com/api/services/${cleanId}`, { cache: 'no-store' });
    if (res.ok) {
      return res.json();
    }
    return null;
  } catch (e) {
    console.error(`Error fetching service ${cleanId}:`, e);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = await getService(id);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.seoTags?.title || service.title,
    description: service.seoTags?.description || service.description,
    keywords: service.seoTags?.keywords,
    alternates: {
      canonical: service.seoTags?.canonical,
    },
  };
}

export default async function ServiceDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    return (
      <div className={styles.main}>
        <Navbar />
        <div className={styles.container} style={{ padding: '200px 20px', textAlign: 'center' }}>
          <h1 style={{ color: '#000' }}>Service not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Navbar />
      
      {/* 1. FIXED HERO */}
      <section className={heroStyles.hero}>
        <div 
          className={heroStyles.heroBackground} 
          style={{ backgroundImage: `url(${service.imageLinks && service.imageLinks[0]})` }}
        >
          <div className={heroStyles.overlay}></div>
        </div>
        <div className={heroStyles.content}>
          <p className={styles.capLabel} style={{ color: 'var(--primary)', letterSpacing: '4px', marginBottom: '20px' }}>
            {service.categoryId?.name || 'OFFERING'}
          </p>
          <h1 className={heroStyles.title}>
            {service.title}
          </h1>
          <p className={heroStyles.subtitle}>
            {service.name}
          </p>
        </div>
      </section>

      {/* 2. SCROLLABLE CONTENT */}
      <div className={styles.scrollContent}>
        
        {/* SHORT DESCRIPTION (PURE BLACK BACKGROUND) */}
        <section style={{ padding: '100px 0', backgroundColor: '#000', color: '#fff' }}>
          <div className={styles.fullWidthContainer}>
            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
              <p className={styles.capLabel} style={{ color: 'var(--primary)', justifyContent: 'center' }}>OVERVIEW</p>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '30px', color: '#fff' }}>Strategic Intent</h2>
              <div style={{ 
                fontSize: '1.4rem', 
                color: '#ccc', 
                lineHeight: '1.8', 
                whiteSpace: 'pre-wrap',
                textAlign: 'justify',
                textJustify: 'inter-word'
              }}>
                {service.description}
              </div>
            </div>
          </div>
        </section>

        {/* LONG DESCRIPTION (HTML/CSS/JS RENDERING - FULL ISOLATION) */}
        <section style={{ padding: '0', backgroundColor: '#fff' }}>
          <div className={styles.fullWidthContainer} style={{ padding: 0 }}>
            {service.longDescription ? (
              <HtmlRenderer html={service.longDescription} />
            ) : (
              <div style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ fontSize: '1.4rem', color: '#444', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                  {service.description}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. HORIZONTAL PRICING SECTION (BLACK CARDS) */}
        {service.priceChart && service.priceChart.length > 0 && (
          <PricingSection priceChart={service.priceChart} />
        )}

        <footer className={styles.footer} style={{ backgroundColor: '#fff', color: '#000', borderTop: '1px solid #eee' }}>
          <div className={styles.footerContent}>
            <p>&copy; 2026 Technorapide. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
