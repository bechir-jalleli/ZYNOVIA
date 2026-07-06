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
  /** Short description shown on cards */
  description?: string
  /** Difficulty/audience level, e.g. "Collège & Lycée" */
  level?: string
  /** Highlighted label shown as a badge, e.g. "Populaire" or "Bootcamp 1" */
  badge?: string
  /** Feature/highlight bullet list shown on cards */
  features?: string[]
  /** Current price in DT */
  price?: number
  /** Crossed-out original price (promo) */
  originalPrice?: number
  /** "Au programme" curriculum bullet list */
  programme?: string[]
  /** Cloudinary image URL */
  image?: string
  imagePublicId?: string
  /** Cloudinary URL of the uploaded PDF programme */
  programmePdfPath?: string
  /** Registration link */
  enrollmentLink?: string
  href?: string
}
