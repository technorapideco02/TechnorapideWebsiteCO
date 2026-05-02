'use client';

import { useEffect } from 'react';

export default function ScrollObserver() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optionally unobserve after animating once
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Comprehensive Home Page & Global Selectors
    const selectors = [
      '.reveal',
      'section h1', 
      'section h2',
      'section h3',
      '.capMainSubtitle',
      '.capBlockWide',
      '.capBlockSquareText',
      '.capBlockSquareImage',
      '.insightCard',
      '.industryItem',
      '.newsGrid > a',
      '.insightsGrid > a',
      '.capStatItem',
      '.capDesc',
      '.capLabel',
      '.footer .col'
    ];

    const elements = document.querySelectorAll(selectors.join(','));
    elements.forEach((el, index) => {
      // Add the initial reveal class if not already present
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left')) {
        el.classList.add('reveal');
      }

      // Dynamic Staggering for Grid/List children
      const parent = el.parentElement;
      if (parent && (
        parent.classList.contains('newsGrid') || 
        parent.classList.contains('insightsGrid') || 
        parent.classList.contains('capStatsList') ||
        (parent as HTMLElement).style?.display === 'grid'
      )) {
        const childIndex = Array.from(parent.children).indexOf(el);
        if (childIndex > 0) {
          (el as HTMLElement).style.transitionDelay = `${childIndex * 0.1}s`;
        }
      }

      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
