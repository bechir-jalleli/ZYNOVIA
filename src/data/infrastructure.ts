export type InfrastructureSection = {
  title: string
  description: string
  highlights?: string[]
}

export type EquipmentCategory = {
  title: string
  details: string
  items: string[]
}

export type Accessibility = {
  location: string
  access: string[]
  services: string[]
  contact: string
}

export type GalleryItem = {
  title: string
  description: string
  image: string
}

export type SpaceCategory = {
  title: string
  description: string
  images: string[]
}

export const infrastructureIntro = {
  title: 'Nos Infrastructures',
  subtitle: 'Un espace conçu pour apprendre dans un environnement professionnel',
  description:
    "INOTEQIA Academy offre un espace de travail partagé professionnel où les étudiants apprennent dans un environnement similaire aux vraies entreprises. Nous proposons des espaces partagés en open space, des salles confort avec canapés, de petites salles pour le mentorat, une salle de réunion professionnelle, une cuisine et des salles équipées pour la formation avec tableaux d'écriture et vidéo projecteurs.",
}

export const spaceSections: InfrastructureSection[] = [
  {
    title: 'Espaces partagés',
    description:
      'Un open space professionnel où les étudiants apprennent dans un environnement de travail réel, favorisant la collaboration et l\'échange avec les professionnels du coworking.',
    highlights: [
      'Espace de travail partagé avec postes équipés',
      'Ambiance professionnelle similaire aux entreprises',
      'Interaction naturelle avec les professionnels du coworking',
    ],
  },
  {
    title: 'Salles de formation modulables',
    description:
      'Des salles équipées pour l\'apprentissage pratique avec tableaux d\'écriture et vidéo projecteurs, adaptables selon les besoins pédagogiques.',
    highlights: [
      'Salles modulables selon le nombre de participants',
      'Équipées de tableaux d\'écriture et vidéo projecteurs',
      'Conçues pour les formations pratiques et interactives',
    ],
  },
  {
    title: 'Salles confort et petites salles',
    description:
      'Des espaces variés pour tous les besoins : salles confort avec canapés pour les échanges informels et petites salles pour le mentorat individuel ou en petit groupe.',
    highlights: [
      'Salles confort avec canapés pour les moments de détente',
      'Petites salles (1-2 places) pour le mentorat personnalisé',
      'Environnement propice aux échanges et à la concentration',
    ],
  },
]

export const equipmentCategories: EquipmentCategory[] = [
  {
    title: 'Équipements de formation',
    details:
      'Des équipements professionnels pour un apprentissage efficace et interactif.',
    items: [
      'Vidéo projecteurs pour les présentations et formations',
      'Tableaux d\'écriture pour les explications et le travail collaboratif',
      'Salles équipées pour accueillir les formations pratiques',
    ],
  },
  {
    title: 'Infrastructure numérique',
    details:
      'Une infrastructure moderne pour le travail et l\'apprentissage en ligne.',
    items: [
      'Wi-Fi haut débit sécurisé dans tout l\'espace',
      'Postes partagés équipés pour le travail collaboratif',
      'Open space avec connexion internet performante',
    ],
  },
  {
    title: 'Espaces de travail',
    details:
      'Des espaces variés adaptés à différents modes d\'apprentissage et de collaboration.',
    items: [
      'Open space pour le travail en groupe et l\'échange',
      'Postes de travail partagés avec équipements professionnels',
      'Environnement de coworking propice à l\'apprentissage',
    ],
  },
]

export const accessibility: Accessibility = {
  location: 'INOTEQIA Academy – Tunis',
  access: [
    'Transports en commun et parking à proximité',
    'Accueil et orientation dès l\'entrée de l\'académie',
    'Horaires étendus pour les sessions du soir et du week‑end',
  ],
  services: [
    'Accès PMR, ascenseur et sanitaires adaptés',
    'Espace détente et cuisine équipée',
    'Wi‑Fi haut débit sécurisé dans tout l\'espace',
  ],
  contact: 'academy@inoteqia.com',
}

export const spaceCategories: SpaceCategory[] = [
  {
    title: 'Espaces partagés (open space)',
    description: 'Un espace de travail partagé professionnel où les étudiants apprennent dans un environnement similaire aux vraies entreprises.',
    images: [
      '/images/infrastructures/Coworkingspace/file-1-20240115154556.jpg',
      '/images/infrastructures/Coworkingspace/file-2-20240115154556.jpg',
      '/images/infrastructures/Coworkingspace/image.png',
    ],
  },
  {
    title: 'Salles de formation modulables',
    description: 'Salles équipées avec tableaux d\'écriture et vidéo projecteurs pour les formations pratiques et interactives.',
    images: [
      '/images/infrastructures/SalleReunion/file-0-20240115143823.jpg',
      '/images/infrastructures/SalleReunion/file-2-20240115143823.jpg',
      '/images/infrastructures/SalleReunion/file-3-20240115143823 (1).jpg',
      '/images/infrastructures/SalleReunion/file-3-20240115143823.jpg',
    ],
  },
  {
    title: 'Salle de réunion professionnelle',
    description: 'Espace de réunion équipé pour les présentations, les réunions d\'équipe et les sessions de formation.',
    images: [
      '/images/infrastructures/SalleReunion2/file-0-20240115144742.jpg',
      '/images/infrastructures/SalleReunion2/file-1-20240115144742.jpg',
      '/images/infrastructures/SalleReunion2/file-2-20240115144742.jpg',
    ],
  },
  {
    title: 'Cuisine & espace détente',
    description: 'Espace convivial pour les pauses, les échanges informels et les moments de détente entre les sessions.',
    images: [
      '/images/infrastructures/reception/file-10-20240115142736.jpg',
    ],
  },
]

export const galleryItems: GalleryItem[] = [
  {
    title: 'Open space',
    description: 'Espace de travail partagé professionnel pour apprendre dans un environnement réel.',
    image: '/images/infrastructures/gallery/gallery-00.jpg',
  },
  {
    title: 'Salle de formation',
    description: 'Salle équipée avec vidéo projecteur et tableau d\'écriture pour les formations pratiques.',
    image: '/images/infrastructures/gallery/gallery-01.jpg',
  },
  {
    title: 'Salle confort',
    description: 'Espace avec canapés pour les échanges informels et les moments de détente.',
    image: '/images/infrastructures/gallery/gallery-02.jpg',
  },
  {
    title: 'Salle de réunion',
    description: 'Salle de réunion professionnelle équipée pour les présentations et réunions.',
    image: '/images/infrastructures/gallery/gallery-03.jpg',
  },
  {
    title: 'Cuisine & détente',
    description: 'Espace cuisine et détente pour les pauses et les échanges entre les sessions.',
    image: '/images/infrastructures/gallery/gallery-04.jpg',
  },
  {
    title: 'Espace professionnel',
    description: 'Vue d\'ensemble de notre espace de coworking professionnel.',
    image: '/images/infrastructures/gallery/gallery-05.jpg',
  },
]

// Collect all room images from space categories for the gallery
export const getAllRoomImages = (): string[] => {
  return spaceCategories.flatMap((category) => category.images)
}

