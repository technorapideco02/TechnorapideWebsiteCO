'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './GoogleTranslate.module.css';

const LANGUAGES = [
  { code: 'en',    label: 'English'    },
  { code: 'hi',    label: 'Hindi'      },
  { code: 'bn',    label: 'Bengali'    },
  { code: 'ar',    label: 'Arabic'     },
  { code: 'fr',    label: 'French'     },
  { code: 'de',    label: 'German'     },
  { code: 'es',    label: 'Spanish'    },
  { code: 'pt',    label: 'Portuguese' },
  { code: 'ru',    label: 'Russian'    },
  { code: 'zh-CN', label: 'Chinese'    },
  { code: 'ja',    label: 'Japanese'   },
  { code: 'ko',    label: 'Korean'     },
  { code: 'it',    label: 'Italian'    },
  { code: 'tr',    label: 'Turkish'    },
  { code: 'nl',    label: 'Dutch'      },
  { code: 'pl',    label: 'Polish'     },
  { code: 'vi',    label: 'Vietnamese' },
  { code: 'th',    label: 'Thai'       },
  { code: 'id',    label: 'Indonesian' },
  { code: 'ms',    label: 'Malay'      },
];

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export default function GoogleTranslate({ 
  id = 'google_translate_element', 
  iconOnly = false 
}: { 
  id?: string, 
  iconOnly?: boolean 
}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(LANGUAGES[0]);
  const dropRef = useRef<HTMLDivElement>(null);

  // Inject Google Translate script once
  useEffect(() => {
    if (document.getElementById('google-translate-script')) {
      // If script exists, we still need to initialize the new element if it's not done
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          id
        );
      }
      return;
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        id
      );
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectLanguage = (lang: typeof LANGUAGES[0]) => {
    setCurrent(lang);
    setOpen(false);

    // Use the hidden Google Translate select element
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <div className={styles.wrapper} ref={dropRef}>
      {/* Hidden Google Translate mount point */}
      <div id={id} style={{ display: 'none' }} />

      {/* Trigger Button */}
      <button
        className={styles.trigger}
        onClick={() => setOpen(v => !v)}
        aria-label="Change language"
        title="Select Language"
      >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {!iconOnly && (
          <>
            <span className={styles.currentLabel}>{current.label}</span>
            <svg className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className={styles.dropdown}>
          <p className={styles.dropTitle}>SELECT LANGUAGE</p>
          <div className={styles.grid}>
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                className={`${styles.langItem} ${current.code === lang.code ? styles.active : ''}`}
                onClick={() => selectLanguage(lang)}
              >
                <span className={styles.label}>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
