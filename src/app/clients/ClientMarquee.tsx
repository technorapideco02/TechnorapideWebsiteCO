'use client';

import React, { useEffect, useRef } from 'react';
import styles from './ClientMarquee.module.css';

interface Client {
  _id: string;
  imageLink: string;
  websiteLink: string;
  title: string;
  description: string;
}

interface ClientMarqueeProps {
  clients: Client[];
}

const ClientMarquee: React.FC<ClientMarqueeProps> = ({ clients }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // We double the clients array to create a seamless loop
  const doubledClients = [...clients, ...clients];

  return (
    <div className={styles.marqueeSection}>
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack} ref={scrollRef}>
          {doubledClients.map((client, index) => (
            <div key={`${client._id}-${index}`} className={styles.clientSlide}>
              
              <div className={styles.imageSide}>
                <div className={styles.circularCrop}>
                  <img src={client.imageLink} alt={client.title} className={styles.logo} />
                </div>
              </div>

              <div className={styles.textSide}>
                <h3 className={styles.title}>{client.title}</h3>
                <p className={styles.description}>{client.description}</p>
                <a 
                  href={client.websiteLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.visitBtn}
                >
                  Explore Site <span>→</span>
                </a>
              </div>

              {/* Decorative Divider between slides */}
              <div className={styles.divider}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientMarquee;
