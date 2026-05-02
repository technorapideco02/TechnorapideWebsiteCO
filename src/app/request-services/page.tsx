'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './RequestServices.module.css';

const REGIONS = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Singapore', 'UAE', 'Japan', 'South Korea',
  'Brazil', 'South Africa', 'Netherlands', 'Sweden', 'Other'
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  region: string;
  industry: string;
  message: string;
  consent: boolean;
}

export default function RequestServicesPage() {
  const router = useRouter();
  const [industries, setIndustries] = useState<string[]>([]);
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', organization: '',
    region: '', industry: '', message: '', consent: false
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    fetch('https://apifinal.technorapide.com/api/industries')
      .then(r => r.json())
      .then(data => setIndustries(data.map((i: any) => i.name)))
      .catch(() => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm(prev => ({ ...prev, [name]: checked !== undefined ? checked : value }));
    if (name === 'message') setCharCount(value.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setStatus('sending');
    try {
      const res = await fetch('https://apifinal.technorapide.com/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          organization: form.organization,
          region: form.region,
          industry: form.industry,
          message: form.message,
        }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgContainer}>
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.formPanel}>
        <button onClick={() => router.back()} className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>

        <div className={styles.formHeader}>
          <p className={styles.eyebrow}>REQUEST FOR SERVICES</p>
          <h1 className={styles.heading}>
            We've driven growth across every industry — tell us about your mission.
          </h1>
        </div>

        {status === 'success' ? (
          <div className={styles.successBox}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <h2>Submission Received</h2>
            <p>Our technical architects will reach out to you shortly.</p>
            <Link href="/" className={styles.homeBtn}>Return to Homepage</Link>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>First name *</label>
                <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="John" />
              </div>
              <div className={styles.field}>
                <label>Last name *</label>
                <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Doe" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Email *</label>
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@company.com" />
              </div>
              <div className={styles.field}>
                <label>Organization *</label>
                <input name="organization" required value={form.organization} onChange={handleChange} placeholder="Acme Corp" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Region *</label>
                <select name="region" required value={form.region} onChange={handleChange}>
                  <option value="">Select region</option>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label>Industry *</label>
                <select name="industry" required value={form.industry} onChange={handleChange}>
                  <option value="">Select industry</option>
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.fieldFull}>
              <label>How can we help you? *</label>
              <textarea name="message" required rows={5} maxLength={1500} value={form.message} onChange={handleChange} placeholder="Describe your project, goals, or challenges..." />
              <span className={styles.charCount}>{charCount}/1500</span>
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkLabel}>
                <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} />
                <span>I consent to Technorapide processing my personal data to contact me. *</span>
              </label>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'sending' || !form.consent}
            >
              {status === 'sending' ? 'Sending…' : 'Submit Request'}
            </button>

            {status === 'error' && (
              <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
