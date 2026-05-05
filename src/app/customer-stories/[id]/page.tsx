import React from 'react';
import CustomerStories from '../../components/CustomerStories';
import styles from '../../page.module.css';
import { extractId, createSlug } from '../../utils/slug';

async function getStory(slug: string) {
  try {
    // 1. Try matching by slug from all stories
    const res = await fetch('https://apifinal.technorapide.com/api/customer-stories', { cache: 'no-store' });
    if (res.ok) {
      const stories = await res.json();
      const matched = stories.find((s: any) => createSlug(s.name) === slug);
      if (matched) return matched;
    }

    // 2. Fallback: match by ID
    const cleanId = extractId(slug);
    const storiesRes = await fetch('https://apifinal.technorapide.com/api/customer-stories', { cache: 'no-store' });
    if (storiesRes.ok) {
      const stories = await storiesRes.json();
      return stories.find((s: any) => s._id === cleanId) || null;
    }
    return null;
  } catch (e) {
    return null;
  }
}

export default async function CustomerStoryDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = await getStory(id);

  if (!story) {
    return (
      <div className={styles.main}>
        <div className={styles.container} style={{ padding: '200px 20px', textAlign: 'center' }}>
          <h1>Story not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      
      {/* Customer Success Hero: Left Dark Fade */}
      <div className={styles.blogHero}>
        <div 
          className={styles.blogHeroBackground} 
          style={{ backgroundImage: `url(${story.imageLink})`, backgroundPosition: 'center 20%' }}
        >
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
            zIndex: 2
          }}></div>
        </div>
        
        <div className={`${styles.blogHeroContent} ${styles.customerStoryHeroContent}`}>
          <p style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Customer Success Story</p>
          <h1 className={styles.blogHeroTitle}>{story.name}</h1>
          <p className={styles.blogHeroDate} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}>
            {story.role}
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={styles.scrollContent} style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Main Content Section */}
        <section className={styles.customerStoryMainSection}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontWeight: 600, color: '#fff' }}>The Challenge & Solution</h2>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>
              {story.message}
            </div>
            
            <div className={styles.customerStoryQuote}>
              <p style={{ fontStyle: 'italic', color: '#fff', marginBottom: '20px' }}>
                "The impact on our business has been phenomenal. Technorapide didn't just build a tool; they transformed how we operate."
              </p>
              <p style={{ fontWeight: 700, color: 'var(--primary)' }}>— {story.name}</p>
            </div>
          </div>
        </section>

        {/* Other Stories Section */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <CustomerStories />
        </div>


      </div>
    </div>
  );
}
