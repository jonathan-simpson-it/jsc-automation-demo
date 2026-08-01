import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
    ],
    sitemap: [
      'https://automation.jonathansimpson.co/sitemap.xml',
      'https://automation.jonathansimpson.co/llms.txt',
      'https://automation.jonathansimpson.co/okf/index.md',
    ],
  }
}
