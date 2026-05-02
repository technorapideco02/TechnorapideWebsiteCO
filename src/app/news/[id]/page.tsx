import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import styles from '../../page.module.css';

async function getBlog(id: string | undefined) {
  if (!id) return null;
  const cleanId = id.trim();
  try {
    const res = await fetch(`https://apifinal.technorapide.com/api/blogs/${cleanId}`, { cache: 'no-store' });
    if (res.ok) {
      return res.json();
    }
    
    // Fallback: fetch all and find
    const allRes = await fetch('https://apifinal.technorapide.com/api/blogs', { cache: 'no-store' });
    if (!allRes.ok) return null;
    const allBlogs = await allRes.json();
    return allBlogs.find((b: any) => b._id === cleanId) || null;
  } catch (e) {
    console.error(`Error fetching blog ${cleanId}:`, e);
    return null;
  }
}

async function getAllBlogs() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/blogs', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: blog.seoTags?.title || blog.title,
    description: blog.seoTags?.description || blog.description,
    keywords: blog.seoTags?.keywords,
    alternates: {
      canonical: blog.seoTags?.canonical,
    },
  };
}

export default async function BlogDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);
  const allBlogs = await getAllBlogs();

  if (!blog) {
    return (
      <div className={styles.main}>
        <Navbar />
        <div className={styles.container} style={{ padding: '200px 20px', textAlign: 'center' }}>
          <h1>Blog not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Navbar />
      
      {/* Blog Hero: Fixed Background */}
      <div 
        className={styles.blogHero} 
        style={{ backgroundImage: `url(${blog.image})` }}
      >
        <div className={styles.blogHeroOverlay}></div>
        <div className={styles.blogHeroContent}>
          <h1 className={styles.blogHeroTitle}>{blog.title}</h1>
          <p className={styles.blogHeroDate}>
            Published on {new Date(blog.createdAt).toLocaleDateString()}
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
              dangerouslySetInnerHTML={{ __html: blog.longDescription }}
            />

            {/* Dynamic Content List */}
            {blog.contentList && blog.contentList.length > 0 && (
              <div className={styles.blogExtraContent}>
                {blog.contentList.map((item: any, index: number) => (
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

        {/* White Section: All Blogs Compact Grid */}
        <section className={styles.blogWhiteSection}>
          <div className={styles.container}>
            <h2 className={styles.allBlogsTitle}>More Insights From Technorapide</h2>
            <div className={styles.compactBlogGrid}>
              {allBlogs.map((b: any) => (
                <div key={b._id} className={styles.compactBlogCard}>
                  <div className={styles.compactImageWrapper}>
                    <img src={b.image} alt={b.title} className={styles.compactImage} />
                  </div>
                  <div className={styles.compactContent}>
                    <h3 className={styles.compactTitle}>{b.title}</h3>
                    <Link href={`/news/${b._id}`} className={styles.compactLink}>
                      Read Detail
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>&copy; 2026 Technorapide. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
