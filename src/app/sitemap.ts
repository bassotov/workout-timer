import type { MetadataRoute } from 'next';

const AI_PLATFORMS = ['chatgpt', 'claude', 'gemini', 'grok', 'perplexity'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const aiInstructionPages: MetadataRoute.Sitemap = AI_PLATFORMS.map((platform) => ({
    url: `https://workout-timer.app/getting-started/instructions/${platform}`,
    lastModified: '2026-03-01',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://workout-timer.app',
      lastModified: '2026-03-01',
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://workout-timer.app/timer',
      lastModified: '2026-03-01',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://workout-timer.app/getting-started',
      lastModified: '2026-03-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...aiInstructionPages,
    {
      url: 'https://workout-timer.app/getting-started/troubleshooting',
      lastModified: '2026-03-01',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://workout-timer.app/restore',
      lastModified: '2026-03-01',
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: 'https://workout-timer.app/privacy',
      lastModified: '2026-01-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://workout-timer.app/terms',
      lastModified: '2026-01-01',
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
