'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

const Counter = ({ end, suffix = '', label, duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div ref={countRef} style={{ marginBottom: '25px' }}>
      <div style={{ 
        fontSize: '3.2rem', 
        fontWeight: 800, 
        color: '#fff', 
        lineHeight: '1', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '2px',
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: '-1px'
      }}>
        <span>{count}</span>
        <span style={{ color: 'var(--primary)' }}>{suffix}</span>
      </div>
      <div style={{ 
        fontSize: '0.95rem', 
        color: 'rgba(255, 255, 255, 0.5)', 
        marginTop: '8px', 
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        {label}
      </div>
    </div>
  );
};

export default Counter;
