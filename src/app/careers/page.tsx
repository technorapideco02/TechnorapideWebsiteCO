'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Careers.module.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  experience: string;
  previousOrganization: string;
  field: string;
  expertise: string;
  language: string;
  consent: boolean;
}

export default function CareersPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', number: '',
    experience: '', previousOrganization: '', field: '',
    expertise: '', language: '', consent: false
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm(prev => ({ ...prev, [name]: checked !== undefined ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;
    setStatus('sending');
    try {
      const res = await fetch('https://apifinal.technorapide.com/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          number: form.number,
          experience: form.experience,
          previousOrganization: form.previousOrganization,
          field: form.field,
          expertise: form.expertise,
          language: form.language,
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
          <p className={styles.eyebrow}>CAREER FORUM</p>
          <h1 className={styles.heading}>
            Join the mission. Let's build the future of technical innovation together.
          </h1>
        </div>

        {status === 'success' ? (
          <div className={styles.successBox}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <h2>Application Received</h2>
            <p>Our talent acquisition team will review your profile and get in touch.</p>
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
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@example.com" />
              </div>
              <div className={styles.field}>
                <label>Phone Number *</label>
                <input name="number" required value={form.number} onChange={handleChange} placeholder="+91 9876543210" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Years of Experience *</label>
                <input name="experience" required value={form.experience} onChange={handleChange} placeholder="e.g. 5 Years" />
              </div>
              <div className={styles.field}>
                <label>Previous Organization *</label>
                <input name="previousOrganization" required value={form.previousOrganization} onChange={handleChange} placeholder="e.g. Infosys" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Field of Interest *</label>
                <input name="field" required value={form.field} onChange={handleChange} placeholder="e.g. Web Development" />
              </div>
              <div className={styles.field}>
                <label>Expertise *</label>
                <input name="expertise" required value={form.expertise} onChange={handleChange} placeholder="e.g. React, Node.js" />
              </div>
            </div>

            <div className={styles.fieldFull}>
              <label>Languages Known *</label>
              <input name="language" required value={form.language} onChange={handleChange} placeholder="e.g. English, Hindi" />
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkLabel}>
                <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} />
                <span>I consent to Technorapide processing my application data. *</span>
              </label>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'sending' || !form.consent}
            >
              {status === 'sending' ? 'Sending…' : 'Submit Application'}
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
