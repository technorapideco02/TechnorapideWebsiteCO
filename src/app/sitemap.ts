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
  // 1. Static Routes (Home, Who We Are, What We Do, Legal, Contact)
  const staticRoutes = [
    '',               // Home
    '/services',      // What We Do / Services Index
    '/about-us',      // Who We Are
    '/team',          // Who We Are - Team
    '/clients',       // Who We Are - Clients
    '/terms',         // Terms
    '/privacy',       // Privacy
    '/contact-us',    // Contact Us
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Routes (Services and Careers)
  const [services, careers] = await Promise.all([
    getServices(),
    getCareers(),
  ]);

  const serviceRoutes = services.map((s: any) => ({
    url: `${BASE_URL}/services/${createSlug(s.name || s.title)}`,
    lastModified: new Date(s.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const careerRoutes = careers.map((c: any) => ({
    url: `${BASE_URL}/career-options/${createSlug(c.title)}`,
    lastModified: new Date(c.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...careerRoutes,
  ];
}
