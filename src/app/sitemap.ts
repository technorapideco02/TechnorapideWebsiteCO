import { MetadataRoute } from 'next';
import { createSlug } from './utils/slug';

const BASE_URL = 'https://technorapide.com';

async function getServices() {
  const res = await fetch('https://apifinal.technorapide.com/api/services', { cache: 'no-store' });
  return res.ok ? res.json() : [];
}

async function getIndustries() {
  const res = await fetch('https://apifinal.technorapide.com/api/industries', { cache: 'no-store' });
  return res.ok ? res.json() : [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes (Cleaned to remove news, blogs, insights)
  const staticRoutes = [
    '',
    '/services',
    '/career-options',
    '/request-services',
    '/careers',
    '/team',
    '/contact-us',
    '/about-us',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Routes (Services and Industries only)
  const [services, industries] = await Promise.all([
    getServices(),
    getIndustries(),
  ]);

  const serviceRoutes = services.map((s: any) => ({
    url: `${BASE_URL}/services/${createSlug(s.name || s.title)}`,
    lastModified: new Date(s.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const industryRoutes = industries.map((i: any) => ({
    url: `${BASE_URL}/industries/${createSlug(i.name)}`,
    lastModified: new Date(i.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
  ];
}
