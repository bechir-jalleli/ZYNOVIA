import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://inoteqia.com'
  const routes = [
    '',
    '/contact',
    '/nos-formateurs',
    '/programmes',
    '/rendez-vous',
    '/ressources',
    '/vision',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
