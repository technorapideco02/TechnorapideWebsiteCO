'use client';

import React, { useState } from 'react';
import styles from './ClientSlider.module.css';

interface Client {
  _id: string;
  imageLink: string;
  websiteLink: string;
  title: string;
  description: string;
}

interface ClientSliderProps {
  clients: Client[];
}

const ClientSlider: React.FC<ClientSliderProps> = ({ clients }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % clients.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  const currentClient = clients[currentIndex];

  if (!clients || clients.length === 0) return null;

  return (
    <div className={styles.sliderSection}>
      <div className={styles.container}>
        
        <div className={styles.sliderWrapper}>
          {/* Previous Button */}
          <button className={styles.navBtn} onClick={prevSlide} aria-label="Previous Client">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Main Content Area */}
          <div className={styles.contentArea}>
            <div className={styles.visualSide}>
              <div className={styles.circleContainer}>
                <div className={styles.outerGlow}></div>
                <div className={styles.circleImage}>
                  <img 
                    src={currentClient.imageLink} 
                    alt={currentClient.title} 
                    key={currentClient._id} // Key ensures re-animation on change
                    className={styles.logo}
                  />
                </div>
              </div>
            </div>

            <div className={styles.textSide}>
              <div className={styles.badge}>Strategic Partnership</div>
              <h2 className={styles.title} key={`title-${currentClient._id}`}>
                {currentClient.title}
              </h2>
              <p className={styles.description} key={`desc-${currentClient._id}`}>
                {currentClient.description}
              </p>
              <a 
                href={currentClient.websiteLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.visitBtn}
              >
                Visit Website <span>→</span>
              </a>
            </div>
          </div>

          {/* Next Button */}
          <button className={styles.navBtn} onClick={nextSlide} aria-label="Next Client">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Counter & Progress */}
        <div className={styles.footer}>
          <div className={styles.counter}>
            <span className={styles.current}>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className={styles.divider}>/</span>
            <span className={styles.total}>{String(clients.length).padStart(2, '0')}</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${((currentIndex + 1) / clients.length) * 100}%` }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientSlider;
