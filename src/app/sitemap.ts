import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://workout-timer.app', lastModified: new Date(), priority: 1 },
    { url: 'https://workout-timer.app/getting-started', lastModified: new Date(), priority: 0.8 },
    { url: 'https://workout-timer.app/privacy', lastModified: new Date(), priority: 0.3 },
    { url: 'https://workout-timer.app/terms', lastModified: new Date(), priority: 0.3 },
  ];
}
