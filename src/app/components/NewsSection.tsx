'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
}

interface NewsSectionProps {
  blogs: Blog[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ blogs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState("Good Day");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

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
    <section id="news" className={styles.newsSectionWhite}>
      <div className={styles.insightsHeader}>
        <h2 className={styles.insightsMainTitle} style={{ color: '#1a1a1a' }}>{greeting}. Here's what's new</h2>
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
        {blogs.map((blog) => (
          <div key={blog._id} className={styles.insightCardWhite}>
            <Link href={`/news/${blog._id}`} className={styles.insightImageWrapper}>
              <img src={blog.image} alt={blog.title} className={styles.insightImage} />
            </Link>
            <div className={styles.insightContent}>
              <div className={styles.insightTag}>NEWS</div>
              <div className={styles.insightText}>
                <h3 className={styles.insightTitle}>{blog.title}</h3>
                <p className={styles.insightDescription}>{blog.description}</p>
              </div>
              {/* Removed blue circular button, added Read More link below text */}
              <div className={styles.newsReadMoreContainer}>
                <Link href={`/news/${blog._id}`} className={styles.newsReadMoreBtn}>
                  Read More
                  <span className={styles.newsReadMoreArrow}>→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
