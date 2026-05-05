import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { createSlug } from '../utils/slug';

async function getData(url: string) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) return res.json();
    return [];
  } catch (e) {
    return [];
  }
}

export default async function Footer() {
  const [categories, services, industries, socialContacts] = await Promise.all([
    getData('https://apifinal.technorapide.com/api/service-categories'),
    getData('https://apifinal.technorapide.com/api/services'),
    getData('https://apifinal.technorapide.com/api/industries'),
    getData('https://apifinal.technorapide.com/api/social-contacts')
  ]);

  const socialMedia = socialContacts.filter((item: any) => item.type === 'social');
  const contactInfo = socialContacts.find((item: any) => item.type === 'contact');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* COLUMN 1: BRANDING */}
          <div className={styles.col}>
            <div className={styles.logo}>Technorapide</div>
            <p className={styles.description}>
              Technorapide is a global technical powerhouse delivering high-density digital solutions. We specialize in adaptive enterprise architectures, custom technical blueprints, and immersive digital transformations that scale with absolute precision.
            </p>
            <div className={styles.socials}>
              {socialMedia.map((social: any) => (
                <a key={social._id} href={social.link} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  <img src={social.iconLink} alt={social.name} />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: CATEGORIES */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>We do provide service</h4>
            <ul className={styles.list}>
              {categories.map((cat: any) => (
                <li key={cat._id}>
                  <Link href={`/services?category=${cat._id}`}>{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SERVICES */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Our Technical Services</h4>
            <ul className={styles.list}>
              {services.slice(0, 8).map((ser: any) => (
                <li key={ser._id}>
                  <Link href={`/services/${createSlug(ser.name)}`}>{ser.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: INDUSTRIES & CONTACT */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Industries We Serve</h4>
            <ul className={styles.list}>
              {industries.slice(0, 6).map((ind: any) => (
                <li key={ind._id}>
                  <Link href={`/industries/${createSlug(ind.name)}`}>{ind.name}</Link>
                </li>
              ))}
            </ul>

            {contactInfo && (
              <div className={styles.contactBox}>
                <p className={styles.contactLabel}>DIRECT ARCHITECTURE LINE</p>
                <a href={`tel:${contactInfo.link.replace(/\s+/g, '')}`} className={styles.contactNumber}>
                  {contactInfo.link}
                </a>
              </div>
            )}
          </div>

        </div>

        <div className={styles.bottom}>
          <p>&copy; 2026 Technorapide. All rights reserved. Transforming sectors through technical mastery.</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
