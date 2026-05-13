'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';
import { createSlug } from '../utils/slug';

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
  const [currentIndex, setCurrentIndex] = useState(1);

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

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth) + 1;
      if (index !== currentIndex && index > 0 && index <= blogs.length) {
        setCurrentIndex(index);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const isMobile = window.innerWidth <= 1024;
      const scrollAmount = isMobile ? current.offsetWidth : (current.offsetWidth / 3); 
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="news" className={styles.blogSection}>
      <div className={styles.blogHeader}>
        <div className={styles.blogTitleContainer}>
          <h2 className={styles.blogMainTitle}>{greeting}. Here's what's new</h2>
          <div className={styles.blogPagination}>
            {currentIndex.toString().padStart(2, '0')} — {blogs.length.toString().padStart(2, '0')}
          </div>
        </div>
        
        <div className={styles.blogNav}>
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
      
      <div className={styles.blogGrid} ref={scrollRef} onScroll={handleScroll}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 1024px) {
            .blog-card-custom {
              flex: 0 0 calc(33.333% - 20px) !important;
              margin-right: 30px !important;
              flex-shrink: 0 !important;
            }
            .blog-grid-custom {
              justify-content: ${blogs.length <= 3 ? 'center' : 'flex-start'} !important;
            }
          }
          @media (max-width: 1023px) {
            .blog-card-custom {
              flex: 0 0 85vw !important;
              margin-right: 15px !important;
              flex-shrink: 0 !important;
            }
          }
        `}} />
        {blogs.map((blog) => (
            <div key={blog._id} className={`${styles.blogCard} blog-card-custom`}>
              <Link href={`/news/${createSlug(blog.title)}`} className={styles.blogImageWrapper}>
                <img src={blog.image} alt={blog.title} className={styles.blogImage} />
              </Link>
              <div className={styles.blogCardContent}>
                <h3 className={styles.blogCardTitle}>{blog.title}</h3>
                <p className={styles.blogCardDesc}>{blog.description}</p>
                <Link href={`/news/${createSlug(blog.title)}`} className={styles.blogReadMore}>
                  Read More
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default NewsSection;
