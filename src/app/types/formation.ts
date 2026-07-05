export type FormationType = {
  id: string
  title: string
  type: 'formation' | 'bootcamp'
  /** PRÉSENTIEL | EN LIGNE | HYBRIDE */
  mode?: string
  /** ex: "27 juillet" */
  startDate?: string
  /** ex: "Du lundi au vendredi" */
  schedule?: string
  /** ex: "20 heures (5 jours)" */
  duration?: string
  /** ex: "12 à 18 ans" */
  ageRange?: string
  /** ex: "Lac 1 - Tunis" */
  location?: string
  /** Current price in DT */
  price?: number
  /** Crossed-out original price (promo) */
  originalPrice?: number
  /** "Au programme" curriculum bullet list */
  programme?: string[]
  /** Cloudinary image URL */
  image?: string
  imagePublicId?: string
  /** Local path to uploaded PDF: /uploads/programmes/xxx.pdf */
  programmePdfPath?: string
  /** Registration link */
  enrollmentLink?: string
  href?: string
}
