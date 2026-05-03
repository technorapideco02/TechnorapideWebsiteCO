import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import styles from '../../page.module.css';

async function getInsight(id: string | undefined) {
  if (!id) return null;
  const cleanId = id.trim();
  try {
    const res = await fetch(`https://apifinal.technorapide.com/api/insights/${cleanId}`, { cache: 'no-store' });
    if (res.ok) {
      return res.json();
    }
    
    // Fallback: fetch all and find
    const allRes = await fetch('https://apifinal.technorapide.com/api/insights', { cache: 'no-store' });
    if (!allRes.ok) return null;
    const allInsights = await allRes.json();
    return allInsights.find((i: any) => i._id === cleanId) || null;
  } catch (e) {
    console.error(`Error fetching insight ${cleanId}:`, e);
    return null;
  }
}

async function getAllInsights() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/insights', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const insight = await getInsight(id);
  if (!insight) return { title: 'Insight Not Found' };

  return {
    title: insight.seoTags?.title || insight.title,
    description: insight.seoTags?.description || insight.description,
    keywords: insight.seoTags?.keywords,
    alternates: {
      canonical: insight.seoTags?.canonical,
    },
  };
}

export default async function InsightDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const insight = await getInsight(id);
  const allInsights = await getAllInsights();

  if (!insight) {
    return (
      <div className={styles.main}>
        <Navbar />
        <div className={styles.container} style={{ padding: '200px 20px', textAlign: 'center' }}>
          <h1 style={{ color: '#fff' }}>Insight not found</h1>
          <Link href="/" className={styles.homeLink} style={{ color: '#0070ad', marginTop: '20px', display: 'inline-block' }}>Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main} style={{ backgroundColor: '#000' }}>
      <Navbar />
      
      {/* Insight Hero: Fixed Background */}
      <div className={styles.blogHero}>
        <div 
          className={styles.blogHeroBackground} 
          style={{ backgroundImage: `url(${insight.image})` }}
        >
          <div className={styles.blogHeroOverlay}></div>
        </div>
        
        <div className={styles.blogHeroContent}>
          <p className={styles.blogLabel}>Company Insights</p>
          <h1 className={styles.blogHeroTitle}>{insight.title}</h1>
          <p className={styles.blogHeroDate}>
            Published on {new Date(insight.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={styles.blogScrollContent}>
        
        {/* Black Section: Main Description & Extra Content */}
        <section className={styles.blogBlackSection}>
          <div className={styles.blogDetailsContainer}>
            {/* Main Long Description */}
            <div 
              className={styles.blogContentArea}
              dangerouslySetInnerHTML={{ __html: insight.longDescription }}
            />

            {/* Dynamic Content List */}
            {insight.contentList && insight.contentList.length > 0 && (
              <div className={styles.blogExtraContent}>
                {insight.contentList.map((item: any, index: number) => (
                  <div key={item._id || index} className={styles.contentItem}>
                    {item.imageLink && (
                      <div className={styles.contentItemImageWrapper}>
                        <img src={item.imageLink} alt={item.title} className={styles.contentItemImage} />
                      </div>
                    )}
                    <h2 className={styles.contentItemTitle}>{item.title}</h2>
                    <p className={styles.contentItemDesc}>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Unified Bottom Section: More Insights (Matches Blogs Detail Page Style) */}
        <section className={styles.blogWhiteSection} style={{ backgroundColor: '#fff' }}>
          <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 className={styles.allBlogsTitle} style={{ margin: 0 }}>Latest Company Insights</h2>
              <Link href="/#insights" className={styles.readMoreLink} style={{ color: '#0070ad' }}>
                View All Insights →
              </Link>
            </div>
            
            <div className={styles.compactBlogGrid}>
              {allInsights.filter((i: any) => i._id !== insight._id).slice(0, 3).map((i: any) => (
                <div key={i._id} className={styles.compactBlogCard}>
                  <Link href={`/insights/${i._id}`} className={styles.compactImageWrapper}>
                    <img src={i.image} alt={i.title} className={styles.compactImage} />
                  </Link>
                  <div className={styles.compactContent}>
                    <p className={styles.blogLabel} style={{ color: '#0070ad', fontSize: '0.7rem', marginBottom: '10px' }}>Insights</p>
                    <h3 className={styles.compactTitle} style={{ color: '#000' }}>{i.title}</h3>
                    <Link href={`/insights/${i._id}`} className={styles.compactLink}>
                      Read Detail →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className={styles.footer} style={{ backgroundColor: '#fff', color: '#000', borderTop: '1px solid #eee' }}>
          <div className={styles.footerContent}>
            <p>&copy; 2026 Technorapide. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
