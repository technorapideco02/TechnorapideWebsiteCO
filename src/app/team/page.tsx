import React from 'react';
import styles from './team.module.css';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getTeamData() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/team', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
  } catch (e) {
    return null;
  }
}

export default async function TeamPage() {
  const teamData = await getTeamData();

  if (!teamData) {
    return <div className={styles.main}>Error loading team data.</div>;
  }

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div 
          className={styles.heroBackground} 
          style={{ backgroundImage: `url(${teamData.heroImage})` }}
        >
          <div className={styles.overlay}></div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{teamData.title}</h1>
        </div>
      </section>

      {/* Scrollable Content */}
      <div className={styles.scrollContent}>
        
        {/* Description Section (Dark) */}
        <section className={styles.descriptionSection}>
          <div className={styles.descriptionContainer}>
            <p className={styles.descriptionText}>{teamData.description}</p>
          </div>
        </section>

        {/* Members Section (White) */}
        <section className={styles.membersSection}>
          <div className={styles.membersContainer}>
            {teamData.members.map((member: any, index: number) => (
              <div 
                key={member._id} 
                className={`${styles.memberRow} ${index % 2 !== 0 ? styles.memberRowReverse : ''}`}
              >
                <div className={styles.memberImageWrapper}>
                  <img src={member.imageLink} alt={member.name} className={styles.memberImage} />
                </div>
                <div className={styles.memberInfo}>
                  <p className={styles.memberRole}>{member.role}</p>
                  <h2 className={styles.memberName}>{member.name}</h2>
                  <p className={styles.memberDesc}>{member.description}</p>
                  
                  <div className={styles.socialLinks}>
                    {member.socialLinks?.linkedin && member.socialLinks.linkedin !== "#" && (
                      <Link href={member.socialLinks.linkedin} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </Link>
                    )}
                    {member.socialLinks?.twitter && member.socialLinks.twitter !== "#" && (
                      <Link href={member.socialLinks.twitter} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
