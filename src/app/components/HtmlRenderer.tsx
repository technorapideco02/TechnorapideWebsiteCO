'use client';

import React, { useEffect, useRef, useState } from 'react';

interface HtmlRendererProps {
  html: string;
  color?: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ html, color }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState('0px');

  const fullHtml = `
    <html>
      <head>
        <style>
          body { 
            margin: 0; 
            font-family: 'Inter', sans-serif; 
            color: ${color || 'inherit'};
            overflow: hidden; 
          }
          * { max-width: 100%; }
        </style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(fullHtml);
        doc.close();

        // Adjust height after content loads
        const updateHeight = () => {
          if (iframeRef.current && iframeRef.current.contentWindow) {
            const doc = iframeRef.current.contentWindow.document;
            const body = doc?.body;
            const htmlEl = doc?.documentElement;
            
            if (body && htmlEl) {
              const newHeight = Math.max(
                body.scrollHeight, body.offsetHeight,
                htmlEl.clientHeight, htmlEl.scrollHeight, htmlEl.offsetHeight
              );
              if (newHeight > 0) {
                setHeight(`${newHeight}px`);
              }
            }
          }
        };

        // Run immediately and also on load to capture images/styles
        updateHeight();
        iframeRef.current.onload = updateHeight;
        
        // Polling as a fallback for dynamic content
        const interval = setInterval(updateHeight, 500);
        return () => clearInterval(interval);
      }
    }
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: '100%',
        height: height,
        border: 'none',
        overflow: 'hidden',
        display: 'block'
      }}
      title="Service Description"
      scrolling="no"
    />
  );
};

export default HtmlRenderer;
