'use client';

import React, { useState, useEffect } from 'react';
import styles from './ContactOverlay.module.css';

const OPTIONS = [
  {
    id: 'services',
    label: 'Request For Services',
    desc: 'Tell us about your project and we\'ll craft the perfect technical blueprint for your business.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
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
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
  },
  {
    id: 'career',
    label: 'Career Forum',
    desc: 'Join the Technorapide ecosystem. Explore open roles across engineering, design, and strategy.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function ContactOverlay() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* Trigger */}
      <button className={styles.trigger} onClick={() => setOpen(true)}>
        Contact Us
      </button>

      {/* Full-Page Overlay */}
      {open && (
        <div className={styles.overlay}>
          {/* Close */}
          <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div className={styles.inner}>
            <p className={styles.eyebrow}>GET IN TOUCH</p>
            <h2 className={styles.heading}>How can we help you?</h2>

            <div className={styles.options}>
              {OPTIONS.map((opt, i) => (
                <button
                  key={opt.id}
                  className={`${styles.option} ${hovered === opt.id ? styles.optionHovered : ''}`}
                  onMouseEnter={() => setHovered(opt.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    // In future wire to actual routes/modals
                    setOpen(false);
                  }}
                  style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
                >
                  <div className={styles.iconBox}>{opt.icon}</div>
                  <div className={styles.optText}>
                    <h3 className={styles.optTitle}>{opt.label}</h3>
                    <p className={styles.optDesc}>{opt.desc}</p>
                  </div>
                  <div className={styles.arrow}>→</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
