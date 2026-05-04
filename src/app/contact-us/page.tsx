import React from 'react';
import Link from 'next/link';
import styles from './contact.module.css';

const OPTIONS = [
  {
    id: 'services',
    label: 'Request For Services',
    desc: 'Tell us about your project and we\'ll craft the perfect technical blueprint for your business.',
    href: '/request-services',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h10M7 12h6"/>
      </svg>
    ),
  },
  {
    id: 'demo',
    label: 'Request For A Demo',
    desc: 'Experience our solutions first-hand. Book a live demonstration with our technical architects.',
    href: 'https://wa.me/918918693332?text=Hi%2C%20Technorapide.',
    isExternal: true,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 'career',
    label: 'Career Forum',
    desc: 'Join the Technorapide ecosystem. Explore open roles across engineering, design, and strategy.',
    href: '/careers',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <h1 className={styles.heading}>What's on your mind?</h1>
          <p className={styles.subheading}>
            We're here to help! Tell us what you're looking for and we'll get you connected to the right people.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {OPTIONS.map((opt) => (
            <Link 
              key={opt.id} 
              href={opt.href} 
              className={styles.card}
              target={opt.isExternal ? "_blank" : undefined}
              rel={opt.isExternal ? "noopener noreferrer" : undefined}
            >
              <div className={styles.cardIcon}>{opt.icon}</div>
              <h2 className={styles.cardLabel}>{opt.label}</h2>
              <p className={styles.cardDesc}>{opt.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
