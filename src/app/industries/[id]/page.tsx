import React from 'react';
import { Metadata } from 'next';
import Navbar from '../../components/Navbar';
import HtmlRenderer from '../../components/HtmlRenderer';
import styles from '../../page.module.css';
import heroStyles from '../../components/Hero.module.css';

async function getIndustry(id: string | undefined) {
  if (!id) return null;
  const actualId = id.split('--').pop() || id;
  const cleanId = actualId.trim();
  try {
    const res = await fetch(`https://apifinal.technorapide.com/api/industries/${cleanId}`, { cache: 'no-store' });
    if (res.ok) {
      return res.json();
    }
    return null;
  } catch (e) {
    console.error(`Error fetching industry ${id}:`, e);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const industry = await getIndustry(id);
  if (!industry) return { title: 'Industry Not Found' };

  return {
    title: industry.seoTags?.title || industry.name,
    description: industry.seoTags?.description || industry.description,
    keywords: industry.seoTags?.keywords,
    alternates: {
      canonical: industry.seoTags?.canonical,
    },
  };
}

export default async function IndustryDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const industry = await getIndustry(id);

  if (!industry) {
    return (
      <div className={styles.main}>
        <Navbar />
        <div className={styles.container} style={{ padding: '200px 20px', textAlign: 'center' }}>
          <h1 style={{ color: '#000' }}>Industry not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Navbar />
      
      {/* HERO SECTION */}
      <section className={heroStyles.hero} style={{ backgroundImage: `url(${industry.image})` }}>
        <div className={heroStyles.overlay}></div>
        <div className={heroStyles.content}>
          <p className={styles.capLabel} style={{ color: 'var(--primary)', letterSpacing: '4px', marginBottom: '20px' }}>
            INDUSTRY SOLUTIONS
          </p>
          <h1 className={heroStyles.title}>
            {industry.name}
          </h1>
          <p className={heroStyles.subtitle}>
            Empowering the future of {industry.name.toLowerCase()}
          </p>
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className={styles.scrollContent}>
        
        {/* DESCRIPTION (WHITE BG) */}
        <section style={{ padding: '100px 0 0 0', backgroundColor: '#fff', color: '#1b1b1b' }}>
          <div className={styles.container}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ 
                fontSize: '1.6rem', 
                fontWeight: 600,
                color: '#000', 
                lineHeight: '1.6', 
                marginBottom: '50px',
                textAlign: 'justify',
                textJustify: 'inter-word'
              }}>
                {industry.description}
              </div>
            </div>
          </div>
          
          {/* LONG DESCRIPTION (HTML RENDERER - FULL WIDTH 0 MARGIN) */}
          {industry.longDescription && (
            <div style={{ width: '100%', padding: '0', backgroundColor: '#fff' }}>
              <HtmlRenderer html={industry.longDescription} />
            </div>
          )}
        </section>

        {/* CONTENT LIST (CARDS SECTION - WHITE BG) */}
        {industry.contentList && industry.contentList.length > 0 && (
          <section style={{ padding: '100px 0', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee' }}>
            <div className={styles.container}>
              <div style={{ textAlign: 'center', marginBottom: '70px' }}>
                <p className={styles.capLabel} style={{ justifyContent: 'center' }}>KEY FEATURES</p>
                <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#000' }}>Domain Expertise</h2>
              </div>

              <div className={styles.insightsGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', display: 'grid', gap: '30px' }}>
                {industry.contentList.map((item: any) => (
                  <div key={item._id} className={styles.insightCard} style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '0' }}>
                    <div className={styles.insightImageWrapper} style={{ height: '250px' }}>
                      <img src={item.imageLink} alt={item.title} className={styles.insightImage} />
                    </div>
                    <div className={styles.insightContent} style={{ padding: '40px' }}>
                      <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#000', marginBottom: '15px' }}>{item.title}</h3>
                      <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.7', textAlign: 'justify' }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <footer className={styles.footer} style={{ backgroundColor: '#000', color: '#fff' }}>
          <div className={styles.footerContent}>
            <p>&copy; 2026 Technorapide. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
