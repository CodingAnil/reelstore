import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reelstore.vercel.app';

  return [
    {
      url: `${baseUrl}/homepage`,
      lastModified: new Date('2026-03-12'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date('2026-03-12'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: new Date('2026-03-12'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/admin-dashboard`,
      lastModified: new Date('2026-03-12'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}