import React from 'react';
import { Metadata } from 'next';
import PricingSection from '../../components/PricingSection';
import HtmlRenderer from '../../components/HtmlRenderer';
import styles from '../../page.module.css';
import heroStyles from '../../components/Hero.module.css';
import { extractId, createSlug } from '../../utils/slug';

async function getService(slug: string | undefined) {
  if (!slug) return null;
  
  try {
    // 1. Try fetching all and matching by slug (preferred for clean URLs)
    const allRes = await fetch('https://apifinal.technorapide.com/api/services', { cache: 'no-store' });
    if (allRes.ok) {
      const allServices = await allRes.json();
      const matched = allServices.find((s: any) => createSlug(s.name) === slug);
      if (matched) return matched;
    }

    // 2. Fallback: handle old slug--ID or direct ID links
    const cleanId = extractId(slug);
    const res = await fetch(`https://apifinal.technorapide.com/api/services/${cleanId}`, { cache: 'no-store' });
    if (res.ok) {
      return res.json();
    }
    return null;
  } catch (e) {
    console.error(`Error fetching service ${slug}:`, e);
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
        <div className={styles.container} style={{ padding: '200px 20px', textAlign: 'center' }}>
          <h1 style={{ color: '#000' }}>Service not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      
      {/* 1. FIXED HERO (RE-DESIGNED) */}
      <section className={heroStyles.hero}>
        <div 
          className={heroStyles.heroBackground} 
          style={{ 
            backgroundImage: `url(${service.imageLinks && service.imageLinks[0]})`,
            backgroundPosition: 'center 20%'
          }}
        >
          {/* Left-focused gradient for readability */}
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
            zIndex: 2
          }}></div>
        </div>
        <div className={heroStyles.content} style={{ textAlign: 'left', alignItems: 'flex-start', marginLeft: '5%', maxWidth: '1000px', width: '90%' }}>
          <p className={styles.capLabel} style={{ color: 'var(--primary)', letterSpacing: '4px', marginBottom: '20px', textAlign: 'left', justifyContent: 'flex-start' }}>
            <span className={styles.capLabelLine}></span>
            {service.categoryId?.name || 'OFFERING'}
          </p>
          <h1 className={heroStyles.title} style={{ textAlign: 'left', marginBottom: '24px', fontSize: 'clamp(3rem, 8vw, 5rem)', width: '100%' }}>
            {service.title}
          </h1>
          <p className={heroStyles.subtitle} style={{ textAlign: 'left', maxWidth: '800px', fontSize: '1.5rem', color: 'rgba(255,255,255,0.9)', fontWeight: 400, lineHeight: '1.6' }}>
            {service.description}
          </p>
        </div>
      </section>

      {/* 2. SCROLLABLE CONTENT */}
      <div className={styles.scrollContent}>
        


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


      </div>
    </div>
  );
}
