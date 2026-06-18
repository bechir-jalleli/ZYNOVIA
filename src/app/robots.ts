import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://inoteqia.com'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Disallow crawling admin and backend API endpoints
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
