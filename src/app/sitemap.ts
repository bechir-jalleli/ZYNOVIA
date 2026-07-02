import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.zynovia-academy.com'

  const routes = [
    { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/a-propos', changeFrequency: 'monthly' as const, priority: 0.95 },
    { path: '/programmes', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/vision', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/nos-formateurs', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/rendez-vous', changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        'x-default': `${baseUrl}${route.path}`,
        'fr': `${baseUrl}${route.path}`,
      },
    },
  }))
}
