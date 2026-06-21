export type Trainer = {
  id: string
  name: string
  title: string
  bio: string
  expertise: string[]
  photo: string
  linkedin?: string
}

export type TrainerTestimonial = {
  _id?: string
  quote: string
  student: string
  focus: string
}

export const trainers: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'Ghofran',
    title: 'Formatrice IA',
    bio: 'Ingénieure data avec 10 ans en machine learning appliqué, passionnée par la pédagogie project-based.',
    expertise: ['Python', 'Machine Learning', 'MLOps', 'DataViz'],
    photo: '/images/review/sophia.webp',
    linkedin: 'https://www.linkedin.com/company/zynovia-academy/about/',
  },
  {
    id: 'trainer-2',
    name: 'Aziz',
    title: 'Formateur AI',
    bio: "Architecte cloud, expert en intégration CI/CD et en conception d'API modernes.",
    expertise: ['Python', 'Machine Learning', 'MLOps', 'DataViz'],
    photo: '/images/review/marcus.webp',
    linkedin: 'https://www.linkedin.com/company/zynovia-academy/about/',
  },
  {
    id: 'trainer-3',
    name: 'Mohamed',
    title: 'Formateur Robotique',
    bio: 'Spécialiste robotique éducative, accompagne les jeunes sur le prototypage rapide.',
    expertise: ['Python', 'Machine Learning', 'MLOps', 'DataViz'],
    photo: '/images/review/daniel.webp',
    linkedin: 'https://www.linkedin.com/company/zynovia-academy/about/',
  },
]

export const trainerTestimonials: TrainerTestimonial[] = [
  {
    quote:
      "Les ateliers IA m'ont permis de comprendre comment passer d'une idée à un prototype fonctionnel. Les formateurs sont exigeants mais bienveillants.",
    student: 'Amine, Lycéen – Parcours IA',
    focus: 'Prototype IA',
  },
  {
    quote:
      "Grâce aux sprints et aux retours réguliers, j'ai gagné en confiance pour présenter mes projets techniques devant un jury.",
    student: 'Sarra, Étudiante – Bootcamp Dev',
    focus: 'Pitch & Démo',
  },
]