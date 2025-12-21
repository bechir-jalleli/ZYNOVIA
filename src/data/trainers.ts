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
  quote: string
  student: string
  focus: string
}

export const trainers: Trainer[] = [
  {
    id: 'trainer-1',
    name: 'mohamed',
    title: 'Lead Formatrice IA & Data',
    bio: 'Ingénieure data avec 10 ans en machine learning appliqué, passionnée par la pédagogie project-based.',
    expertise: ['Python', 'Machine Learning', 'MLOps', 'DataViz'],
    photo: '/images/review/sophia.webp',
    linkedin: 'https://www.linkedin.com/company/inoteqia-academy/about/',
  },
  {
    id: 'trainer-2',
    name: 'mohamed',
    title: 'Senior Formateur Développement & Cloud',
    bio: 'Architecte cloud, expert en intégration CI/CD et en conception d\'API modernes.',
    expertise: ['Node.js', 'DevOps', 'CI/CD', 'Cloud'],
    photo: '/images/review/marcus.webp',
    linkedin: 'https://www.linkedin.com/company/inoteqia-academy/about/',
  },
  {
    id: 'trainer-3',
    name: 'mohamed',
    title: 'Coach Robotique & IoT',
    bio: 'Spécialiste robotique éducative, accompagne les jeunes sur le prototypage rapide.',
    expertise: ['Robotique', 'IoT', 'Prototypage', 'Design Thinking'],
    photo: '/images/review/daniel.webp',
    linkedin: 'https://www.linkedin.com/company/inoteqia-academy/about/',
  },
  {
    id: 'trainer-4',
    name: 'mohamed',
    title: 'Data Storytelling & Produit',
    bio: 'Consultant produit, aide les élèves à transformer leurs projets IA en solutions concrètes.',
    expertise: ['Product', 'Data Storytelling', 'UX', 'IA appliquée'],
    photo: '/images/project/studiova.webp',
  },
]

export const trainerTestimonials: TrainerTestimonial[] = [
  {
    quote:
      'Les ateliers IA m’ont permis de comprendre comment passer d’une idée à un prototype fonctionnel. Les formateurs sont exigeants mais bienveillants.',
    student: 'Amine, Lycéen – Parcours IA',
    focus: 'Prototype IA',
  },
  {
    quote:
      'Grâce aux sprints et aux retours réguliers, j’ai gagné en confiance pour présenter mes projets techniques devant un jury.',
    student: 'Sarra, Étudiante – Bootcamp Dev',
    focus: 'Pitch & Démo',
  },
]

