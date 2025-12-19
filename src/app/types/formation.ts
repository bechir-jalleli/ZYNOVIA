export type FormationType = {
  id: string
  title: string
  type: 'formation' | 'bootcamp'
  description: string
  duration: string
  level: string
  image: string
  startDate?: string
  endDate?: string
  price?: number
  badge?: string
  features: string[]
  href: string
}

