import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.zynovia-academy.com'

  const routes = [
    { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/programmes', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/vision', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/nos-formateurs', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/rendez-vous', changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  return routes.map((route) => {
    const url = `${baseUrl}${route.path}`
    return {
      url,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          'fr-TN': `${baseUrl}${route.path}`,
          'ar-TN': `${baseUrl}${route.path}${route.path ? '' : '/'}?lang=ar`,
          'en': `${baseUrl}${route.path}${route.path ? '' : '/'}?lang=en`,
          'x-default': `${baseUrl}${route.path}`,
        },
      },
    }
  })
}

