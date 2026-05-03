'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ContactWidget.module.css';

const OPTIONS = [
  {
    id: 'services',
    label: 'Request For Services',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h10M7 12h6"/>
      </svg>
    ),
  },
  {
    id: 'demo',
    label: 'Request For A Demo',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 'career',
    label: 'Career Forum',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOption = (id: string) => {
    setOpen(false);
    if (id === 'services') router.push('/request-services');
    if (id === 'career') router.push('/careers');
    if (id === 'demo') {
      const msg = encodeURIComponent('Hi, Technorapide.');
      window.open(`https://wa.me/918918693332?text=${msg}`, '_blank');
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <div className={styles.widgetContainer} onClick={() => setOpen(true)}>
        <div className={styles.widget}>
          <div className={styles.iconBox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M8 7h8"/>
              <path d="M8 11h8"/>
            </svg>
          </div>
          <span className={styles.labelText}>Contact</span>
        </div>
      </div>

      {open && (
        <div className={styles.overlay}>
          <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className={styles.inner}>
            <div className={styles.headerRow}>
              <h2 className={styles.heading}>What's on your mind?</h2>
              <p className={styles.subheading}>We're here to help! Tell us what you're looking for.</p>
            </div>
            <div className={styles.cards}>
              {OPTIONS.map((opt, i) => (
                <button key={opt.id} className={styles.card} onClick={() => handleOption(opt.id)} style={{ animationDelay: `${i * 0.1 + 0.15}s` }}>
                  <div className={styles.cardIcon}>{opt.icon}</div>
                  <span className={styles.cardLabel}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
