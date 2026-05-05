import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import styles from '../../page.module.css';
import { createSlug, extractId } from '../../utils/slug';

async function getInsight(slug: string | undefined) {
  if (!slug) return null;
  
  try {
    // 1. Try matching by slug from all insights
    const allRes = await fetch('https://apifinal.technorapide.com/api/insights', { cache: 'no-store' });
    if (allRes.ok) {
      const allInsights = await allRes.json();
      const matched = allInsights.find((i: any) => createSlug(i.title) === slug);
      if (matched) return matched;
    }

    // 2. Fallback: match by ID
    const cleanId = extractId(slug);
    const res = await fetch(`https://apifinal.technorapide.com/api/insights/${cleanId}`, { cache: 'no-store' });
    if (res.ok) {
      return res.json();
    }
    return null;
  } catch (e) {
    console.error(`Error fetching insight ${slug}:`, e);
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
        <div className={styles.container} style={{ padding: '200px 20px', textAlign: 'center' }}>
          <h1 style={{ color: '#fff' }}>Insight not found</h1>
          <Link href="/" className={styles.homeLink} style={{ color: '#0070ad', marginTop: '20px', display: 'inline-block' }}>Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main} style={{ backgroundColor: '#000' }}>
      
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
            {/* ─── NEW CAPGEMINI-STYLE CONTENT LIST ─── */}
            {insight.contentList && insight.contentList.length > 0 && (
              <div className={styles.capgeminiContainer} style={{ marginTop: '80px', width: '100%', padding: '0 20px' }}>
                {/* Block 1: Wide Image + Overlapping Text (Top) */}
                <div className={styles.capBlockOverlapTop}>
                  <div className={styles.capImageWrapperWide}>
                    <img 
                      src={insight.contentList[0]?.imageLink || insight.image} 
                      alt={insight.contentList[0]?.title} 
                      className={styles.capImage} 
                    />
                  </div>
                  <div className={styles.capTextBoxOverlap}>
                    <p className={styles.capLabel}>
                      <span className={styles.capLabelLine}></span>
                      {insight.title}
                    </p>
                    <h2 className={styles.capTitleLarge}>{insight.contentList[0]?.title}</h2>
                    <p className={styles.capDesc}>{insight.contentList[0]?.description}</p>
                    <p className={styles.capFooterLabel} style={{ marginTop: '40px' }}>Technorapide</p>
                  </div>
                </div>

                {/* Bottom Row: 3 blocks (Text, Text, Image) */}
                <div className={styles.capBlockOverlapBottom}>
                  {/* Mobile-Only Image for the first square block */}
                  <div className={styles.capImageWrapperMobile}>
                    <img 
                      src={insight.contentList[1]?.imageLink || insight.image} 
                      alt="Mobile View Visual" 
                      className={styles.capImage} 
                    />
                  </div>

                  {/* Block 2: Blue Square Block */}
                  <div className={styles.capBlockSquareText} style={{ backgroundColor: 'rgba(0, 112, 173, 0.9)' }}>
                    <div>
                      <p className={styles.capLabel}>
                        <span className={styles.capLabelLine}></span>
                        Insight Depth
                      </p>
                      <h3 className={styles.capTitleMedium}>{insight.contentList[1]?.title}</h3>
                      <p className={styles.capDesc} style={{ color: 'rgba(255,255,255,0.8)', marginTop: '20px' }}>
                        {insight.contentList[1]?.description}
                      </p>
                    </div>
                    <p className={styles.capFooterLabel}>Technorapide</p>
                  </div>

                  {/* Block 3: Dark Square Block */}
                  <div className={styles.capBlockSquareTextCenter}>
                    <div>
                      <p className={styles.capLabel}>
                        <span className={styles.capLabelLine}></span>
                        Strategic Outcome
                      </p>
                      <h3 className={styles.capTitleMedium}>{insight.contentList[2]?.title}</h3>
                      <p className={styles.capDesc} style={{ color: 'rgba(255,255,255,0.6)', marginTop: '20px' }}>
                        {insight.contentList[2]?.description}
                      </p>
                    </div>
                    <p className={styles.capFooterLabel}>Technorapide</p>
                  </div>

                  {/* Block 4: Overlapping Image behind Block 3 */}
                  <div className={styles.capImageWrapperOverlap}>
                    <img 
                      src={insight.contentList[2]?.imageLink || insight.image} 
                      alt="Strategic Visual" 
                      className={styles.capImage} 
                    />
                  </div>
                </div>

                {/* Remaining Items (if any) as standard cards below */}
                {insight.contentList.length > 3 && (
                  <div className={styles.blogExtraContent} style={{ marginTop: '100px' }}>
                    {insight.contentList.slice(3).map((item: any, index: number) => (
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
                  <Link href={`/insights/${createSlug(i.title)}`} className={styles.compactImageWrapper}>
                    <img src={i.image} alt={i.title} className={styles.compactImage} />
                  </Link>
                  <div className={styles.compactContent}>
                    <p className={styles.blogLabel} style={{ color: '#0070ad', fontSize: '0.7rem', marginBottom: '10px' }}>Insights</p>
                    <h3 className={styles.compactTitle} style={{ color: '#000' }}>{i.title}</h3>
                    <Link href={`/insights/${createSlug(i.title)}`} className={styles.compactLink}>
                      Read Detail →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
