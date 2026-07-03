/* ═══════════════════════════════════════════
   HERO BADGES DATA
═══════════════════════════════════════════ */
export const cardsData = [
  {
    title: 'Certification incluse',
    icon: 'solar:verified-check-bold',
    iconColor: 'text-[#3FA9DF]',
  },
  {
    title: 'Aucun prérequis',
    icon: 'solar:magic-stick-bold',
    iconColor: 'text-[#2E5391] dark:text-[#3FA9DF]',
  },
  {
    title: 'Encadré par des ingénieurs IA',
    icon: 'solar:user-bold-duotone',
    iconColor: 'text-[#27397F] dark:text-[#3FA9DF]',
  },
  {
    title: 'Ateliers pratiques',
    icon: 'solar:programming-bold',
    iconColor: 'text-[#4490C7]',
  },
]

/* ═══════════════════════════════════════════
   PROGRAMS DATA
═══════════════════════════════════════════ */
export const programs = [
  {
    id: 'bootcamp',
    badge: 'Programme intensif 20h',
    badgeColor: 'bg-[#27397F]',
    title: 'Bootcamp IA &\nMachine Learning',
    image: '/images/nos-formation/1.png',
    description:
      'Un bootcamp complet pour comprendre l\'IA, découvrir le Machine Learning, apprendre Python et créer un projet concret.',
    details: [
      { icon: 'solar:users-group-rounded-bold', label: 'Âge', value: '12 à 18 ans' },
      { icon: 'solar:clock-circle-bold', label: 'Durée', value: '20 heures' },
      { icon: 'solar:map-point-bold', label: 'Lieu', value: 'Lac 1' },
      { icon: 'solar:tag-price-bold', label: 'Tarif', value: '349 TND' },
    ],
    certification: true,
    ctaLabel: 'Choisir ce bootcamp',
    ctaColor: 'bg-gradient-brand',
    modules: [
      'Module 1 : Comprendre l\'IA',
      'Module 2 : Découvrir le Machine Learning',
      'Module 3 : Premiers pas en Python',
      'Module 4 : Utiliser les outils professionnels',
      'Module 5 : Créer un premier modèle d\'IA',
      'Module 6 : Projet IA final',
    ],
  },
  {
    id: 'generative',
    badge: 'Session pratique 9h',
    badgeColor: 'bg-[#3FA9DF]',
    title: 'IA Générative &\nOutils du Futur',
    image: '/images/nos-formation/2.png',
    description:
      'Une formation courte pour apprendre à utiliser les outils d\'IA générative, rédiger de bons prompts et créer du contenu avec l\'IA.',
    details: [
      { icon: 'solar:users-group-rounded-bold', label: 'Âge', value: '11 à 18 ans' },
      { icon: 'solar:clock-circle-bold', label: 'Durée', value: '9 heures' },
      { icon: 'solar:calendar-bold', label: 'Format', value: '3 jours × 3 heures' },
      { icon: 'solar:tag-price-bold', label: 'Tarif', value: '110 TND' },
    ],
    certification: true,
    ctaLabel: 'Choisir cette session',
    ctaColor: 'bg-[#3FA9DF]',
    modules: [
      'Module 1 : Comprendre l\'IA Générative',
      'Module 2 : Prompt Engineering',
      'Module 3 : Créer avec l\'IA',
      'Module 4 : Projet pratique & cas d\'usage réels',
    ],
  },
]

/* ═══════════════════════════════════════════
   COMPARISON TABLE DATA
═══════════════════════════════════════════ */
export const comparisonRows = [
  { criteria: 'Découvrir l\'IA rapidement', bootcamp: false, generative: true },
  { criteria: 'Apprendre Python et le Machine Learning', bootcamp: true, generative: false },
  { criteria: 'Formation courte', bootcamp: false, generative: true },
  { criteria: 'Projet plus complet', bootcamp: true, generative: false },
]

/* ═══════════════════════════════════════════
   FAQ DATA
═══════════════════════════════════════════ */
export const faqItems = [
  {
    question: 'Mon enfant doit-il avoir déjà étudié l\'IA ?',
    answer:
      'Non, aucun prérequis n\'est nécessaire. Nos formations sont conçues pour les débutants complets. Votre enfant sera accompagné pas à pas par nos formateurs ingénieurs en IA.',
  },
  {
    question: 'Est-ce qu\'il y a une certification ?',
    answer:
      'Oui, à l\'issue de chaque formation, votre enfant recevra une certification Zynovia Academy attestant de sa participation et des compétences acquises.',
  },
  {
    question: 'Faut-il apporter un ordinateur ?',
    answer:
      'Non, tous les équipements nécessaires sont fournis sur place. Si votre enfant préfère utiliser son propre ordinateur portable, il peut le faire.',
  },
  {
    question: 'Quelle formation choisir pour débuter ?',
    answer:
      'Si votre enfant souhaite une découverte rapide et pratique de l\'IA, la session "IA Générative & Outils du Futur" (9h) est idéale. Pour un apprentissage plus approfondi incluant Python et le Machine Learning, optez pour le "Bootcamp IA & Machine Learning" (20h).',
  },
]

/* ═══════════════════════════════════════════
   BROCHURES DATA
═══════════════════════════════════════════ */
export const brochures = [
  {
    title: 'Brochure Bootcamp IA &\nMachine Learning',
    description:
      'Découvrez le contenu détaillé, les objectifs et les bénéfices du programme.',
  },
  {
    title: 'Brochure IA Générative &\nOutils du Futur',
    description:
      'Découvrez le contenu détaillé, les objectifs et les bénéfices du programme.',
  },
]
