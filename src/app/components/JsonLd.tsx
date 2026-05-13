import React from 'react';

const JsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Technorapide",
    "image": "https://technorapide.com/og-image.png",
    "@id": "https://technorapide.com",
    "url": "https://technorapide.com",
    "telephone": "+91 82405 60721",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Barasat",
      "addressLocality": "Kolkata",
      "addressRegion": "West Bengal",
      "postalCode": "700124",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.7231,
      "longitude": 88.4849
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/technorapide",
      "https://www.linkedin.com/company/technorapide",
      "https://twitter.com/technorapide"
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "120"
    },
    "description": "Technorapide is the Best Website Development Company in Barasat, Kolkata, and India. Expert in web development, software solutions, and IT apps."
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Technorapide",
    "alternateName": "Techno Rapide",
    "url": "https://technorapide.com",
    "logo": "https://technorapide.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 82405 60721",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "Hindi", "Bengali"]
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Website Development",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Technorapide"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Barasat"
      },
      {
        "@type": "City",
        "name": "Kolkata"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Best Website Development Company in Barasat"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Best Website Development Company in Kolkata"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Best Website Development Company in India"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
};

export default JsonLd;
