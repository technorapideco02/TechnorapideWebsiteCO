import { MetadataRoute } from 'next';
import { createSlug } from './utils/slug';

const BASE_URL = 'https://technorapide.com';

async function getServices() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/services', { cache: 'no-store' });
    return res.ok ? res.json() : [];
  } catch (e) {
    return [];
  }
}

async function getCareers() {
  try {
    const res = await fetch('https://apifinal.technorapide.com/api/careers', { cache: 'no-store' });
    return res.ok ? res.json() : [];
  } catch (e) {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data
  const [services, careers] = await Promise.all([
    getServices(),
    getCareers(),
  ]);

  // 1. Home
  const homeRoute = {
    url: `${BASE_URL}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  };

  // 2. Who We Are
  const whoWeAreRoutes = [
    '/about-us',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // 3. What We Do (Services Index)
  const whatWeDoRoute = {
    url: `${BASE_URL}/services`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  };

  // 4. Contact Us
  const contactRoute = {
    url: `${BASE_URL}/contact-us`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  };

  // 5. Individual Services
  const serviceRoutes = services.map((s: any) => ({
    url: `${BASE_URL}/services/${createSlug(s.name || s.title)}`,
    lastModified: new Date(s.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 6. Individual Careers
  const careerRoutes = careers.map((c: any) => ({
    url: `${BASE_URL}/career-options/${createSlug(c.title)}`,
    lastModified: new Date(c.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 7. Terms & Privacy
  const legalRoutes = [
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.3,
  }));

  // Return in the specific order requested
  return [
    homeRoute,
    ...whoWeAreRoutes,
    whatWeDoRoute,
    contactRoute,
    ...serviceRoutes,
    ...careerRoutes,
    ...legalRoutes,
  ];
}
