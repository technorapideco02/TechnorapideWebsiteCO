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
        
        <div className={styles.blogHeroContent} style={{ textAlign: 'left', marginLeft: '5%', maxWidth: '600px' }}>
          <p style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Customer Success Story</p>
          <h1 className={styles.blogHeroTitle} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>{story.name}</h1>
          <p className={styles.blogHeroDate} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}>
            {story.role}
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={styles.scrollContent} style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Main Content Section */}
        <section style={{ backgroundColor: '#000', color: '#fff', padding: '100px 5%' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '40px', color: '#fff' }}>The Challenge & Solution</h2>
            <div style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
              {story.message}
            </div>
            
            <div style={{ marginTop: '80px', padding: '40px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
              <p style={{ fontSize: '1.5rem', fontStyle: 'italic', color: '#fff', marginBottom: '20px' }}>
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
