import { MetadataRoute } from 'next';

const BASE_URL = 'https://technorapide.com';

async function getServices() {
  const res = await fetch('https://apifinal.technorapide.com/api/services', { cache: 'no-store' });
  return res.ok ? res.json() : [];
}

async function getIndustries() {
  const res = await fetch('https://apifinal.technorapide.com/api/industries', { cache: 'no-store' });
  return res.ok ? res.json() : [];
}

async function getBlogs() {
  const res = await fetch('https://apifinal.technorapide.com/api/blogs', { cache: 'no-store' });
  return res.ok ? res.json() : [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes
  const staticRoutes = [
    '',
    '/news',
    '/insights',
    '/services',
    '/career-options',
    '/request-services',
    '/careers',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dynamic Routes
  const [services, industries, blogs] = await Promise.all([
    getServices(),
    getIndustries(),
    getBlogs(),
  ]);

  const serviceRoutes = services.map((s: any) => ({
    url: `${BASE_URL}/services/${s._id}`,
    lastModified: new Date(s.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const industryRoutes = industries.map((i: any) => ({
    url: `${BASE_URL}/industries/${i._id}`,
    lastModified: new Date(i.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const newsRoutes = blogs.map((b: any) => ({
    url: `${BASE_URL}/news/${b._id}`,
    lastModified: new Date(b.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const insightRoutes = blogs.map((b: any) => ({
    url: `${BASE_URL}/insights/${b._id}`,
    lastModified: new Date(b.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...newsRoutes,
    ...insightRoutes,
  ];
}
