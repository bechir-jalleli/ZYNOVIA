import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

import { NavLinkType } from '@/app/types/navlink'
import { ProjectType } from '@/app/types/project'
import { RecordType } from '@/app/types/record'
import { ReviewType } from '@/app/types/review'
import { SpecializeType } from '@/app/types/specialize'
import { PlanType } from '@/app/types/plan'
import { CategoryType } from '@/app/types/category'
import { FooterLinkType } from '@/app/types/footerlinks'
import { HeroType } from '@/app/types/hero'
import { FormationType } from '@/app/types/formation'

const HeroData: HeroType[] = [
  {
    imgSrc: '/images/banner/blogforgeCover.webp',
  },
  {
    imgSrc: '/images/banner/gleamerCover.webp',
  },
  {
    imgSrc: '/images/banner/learnaxisCover.webp',
  },
  {
    imgSrc: '/images/banner/studiovaCover.webp',
  },
]

const NavLinkData: NavLinkType[] = [
  {
    label: 'Accueil',
    href: '/',
  },
  {
    label: 'Vision',
    href: '/vision',
  },
  {
    label: 'Programmes',
    href: '/programmes',
  },

  {
    label: 'Formateurs',
    href: '/nos-formateurs',
  },

  // {
  //   label: 'Parents',
  //   href: '/parents',
  // },
  // {
  //   label: 'Partenariats',
  //   href: '/partenariats',
  // },
  // {
  //   label: 'Ressources',
  //   href: '/ressources',
  // },
  {
    label: 'Infrastructures',
    href: '/nos-infrastructures',
  },
  {
    label: 'Contact',
    href: '/contact',
  },

]

const ProjectData: ProjectType[] = [
  {
    coverImg: '/images/project/blogforge.webp',
    name: 'Blog Forge',
  },
  {
    coverImg: '/images/project/gleamer.webp',
    name: 'Gleamer',
  },
  {
    coverImg: '/images/project/learnaxis.webp',
    name: 'Learnaxis',
  },
  {
    coverImg: '/images/project/studiova.webp',
    name: 'Studiova',
  },
  {
    coverImg: '/images/project/homely.webp',
    name: 'Homely',
  },
  {
    coverImg: '/images/project/awake.webp',
    name: 'Awake',
  },
  {
    coverImg: '/images/project/endeavor.webp',
    name: 'Endeavor',
  },
]

const RecordData: RecordType[] = [
  {
    imgSrc: '/images/records/user.svg',
    digit: '90%',
    desc: "Des jeunes estiment que maîtriser le numérique et l’IA est essentiel pour réussir demain",
  },
  {
    imgSrc: '/images/records/cart.svg',
    digit: '97M',
    desc: "De nouveaux emplois pourraient être créés grâce à l’intelligence artificielle d’ici 2030",
  },
  {
    imgSrc: '/images/records/star.svg',
    digit: '70%',
    desc: "Des entreprises dans le monde investiront dans l’IA d’ici 2030",
  },
];


const ReviewData: ReviewType[] = [
  {
    imgSrc: '/images/review/daniel.webp',
    name: 'Maman de Sami, 4e',
    rating: 4.9,
    desc: '« Avant ZYNOVIA, mon fils passait beaucoup de temps en ligne sans objectif clair. Aujourd’hui, il utilise l’IA pour créer des projets et a retrouvé confiance en lui à l’école. »',
  },
  {
    imgSrc: '/images/review/sophia.webp',
    name: 'Papa de Lina, Terminale',
    rating: 5,
    desc: '« Ma fille en terminale a découvert des métiers qu’elle ne connaissait pas et a pu présenter un projet d’IA lors d’un oral. Cela l’a beaucoup aidée pour son orientation. »',
  },
  {
    imgSrc: '/images/review/marcus.webp',
    name: 'Responsable pédagogique partenaire',
    rating: 4.8,
    desc: '« ZYNOVIA Academy complète parfaitement nos enseignements. Les élèves développent des projets concrets en IA et gagnent en autonomie comme en motivation. »',
  },
]

const SpecializeData: SpecializeType[] = [
  {
    imgSrc: '/images/specialization/webdesign.svg',
    title: 'Développement Web',
    desc: 'Apprenez à créer des sites web modernes et responsives qui engagent les utilisateurs et génèrent des résultats.',
  },
  {
    imgSrc: '/images/specialization/logodesign.svg',
    title: 'Design de Logo',
    desc: 'Maîtrisez la création de logos distinctifs et mémorables pour définir et valoriser une marque.',
  },
  {
    imgSrc: '/images/specialization/mobileapp.svg',
    title: 'Développement d\'Applications Mobiles',
    desc: 'Créez des applications iOS et Android personnalisées avec des flux fluides et des fonctionnalités avancées.',
  },
  {
    imgSrc: '/images/specialization/contentwrite.svg',
    title: 'Rédaction de Contenu',
    desc: 'Apprenez à rédiger du contenu optimisé SEO pour éduquer, engager et améliorer la visibilité.',
  },
  {
    imgSrc: '/images/specialization/seooptimize.svg',
    title: 'Optimisation SEO',
    desc: 'Maîtrisez les stratégies SEO éprouvées pour améliorer le classement, le trafic et la portée de la marque.',
  },
  {
    imgSrc: '/images/specialization/digitalmarketing.svg',
    title: 'Marketing Digital',
    desc: 'Développez des campagnes digitales ciblées pour accroître la notoriété et développer votre audience.',
  },
]

const PlanData: PlanType[] = [
  {
    type: 'Programme une heure par semaine',
    price: {
      monthly: 9,
      yearly: 95,
    },
    option: [
      'Consultation with strategy session',
      'Basic design and development',
      'One revision per project',
      'Responsive on all devices',
      'Email support included only',
    ],
  },
  {
    type: 'Bootcamp AI',
    price: {
      monthly: 19,
      yearly: 185,
    },
    option: [
      'Consultation with strategy session',
      'Basic design and development',
      'One revision per project',
      'Responsive on all devices',
      'Email support included only',
    ],
  },
]
const CategoryData: CategoryType[] = [
  {
    imgSrc: '/images/infrastructures/gallery/gallery-05.jpg',
    title: 'Espace de Travail Moderne',
  },
  {
    imgSrc: '/images/infrastructures/SalleReunion/file-0-20240115143823.jpg',
    title: 'Salle de Réunion Professionnelle',
  },
  {
    imgSrc: '/images/infrastructures/Coworkingspace/file-2-20240115154556.jpg',
    title: 'salle Privé (1 à 2 personnes)',
  },
  {
    imgSrc: '/images/infrastructures/Coworkingspace/image.png',
    title: 'Espace de Détente',
  },
  {
    imgSrc: '/images/infrastructures/gallery/gallery-03.jpg',
    title: 'Cuisine Équipée',
  }
];


const FooterLinkData: FooterLinkType[] = [
  {
    section: 'Programmes',
    links: [
      {
        label: 'Tous les programmes',
        href: '/programmes',
      },
      {
        label: 'Collégiens & lycéens',
        href: '/programmes',
      },
      {
        label: 'Stages & ateliers',
        href: '/programmes',
      },
    ],
  },
  {
    section: 'Vision & pédagogie',
    links: [
      {
        label: 'Notre vision',
        href: '/vision',
      },
      {
        label: 'Parents & orientation',
        href: '/parents',
      },
      {
        label: 'Ressources',
        href: '/ressources',
      },
    ],
  },
  {
    section: 'Partenariats',
    links: [
      {
        label: 'Écoles & établissements',
        href: '/partenariats',
      },
      {
        label: 'Entreprises',
        href: '/partenariats',
      },
    ],
  },
  {
    section: 'Contact',
    links: [
      {
        label: 'Nous contacter',
        href: '/contact',
      },
      {
        label: 'Prendre rendez-vous',
        href: '/rendez-vous',
      },
    ],
  },
]

const FormationData: FormationType[] = [
  {
    id: '1',
    title: 'Programme IA — Formation Annuelle',
    type: 'formation',
    description:
      "Programme complet d'intégration de l'IA dans le cursus scolaire avec 1h par semaine",
    duration: 'Année scolaire',
    level: 'Collège & Lycée',
    image: '/images/banner/image.png',
    startDate: 'Septembre 2024',
    price: 95,
    badge: 'Populaire',
    features: [
      '1h de formation IA par semaine',
      'Contenus adaptés collège & lycée',
      "Bases de l'IA et pensée algorithmique",
      'Mini-projets pratiques trimestriels',
      'Encadrement par formateurs ZYNOVIA',
    ],
    href: '/programmes',
  },
  // Formations classiques conservées
  {
    id: '2',
    title: 'Formation Robotique & IA',
    type: 'formation',
    description:
      'Découvrez la robotique intelligente et apprenez à programmer des robots avec IA',
    duration: '3 mois',
    level: 'Lycée',
    image: '/images/banner/img4.jpg',
    startDate: 'Octobre 2024',
    price: 150,
    features: [
      'Programmation de robots intelligents',
      'Intégration de capteurs et IA',
      'Projets pratiques et compétitions',
      'Matériel fourni',
      'Encadrement expert',
    ],
    href: '/programmes',
  },
  {
    id: '3',
    title: 'Formation Machine Learning pour Débutants',
    type: 'formation',
    description:
      'Initiation au machine learning avec des projets pratiques et accessibles',
    duration: '2 mois',
    level: 'Lycée',
    image: '/images/banner/image.png',
    startDate: 'Novembre 2024',
    price: 120,
    features: [
      'Bases du machine learning',
      'Projets avec TensorFlow',
      "Reconnaissance d'images",
      'Traitement du langage naturel',
      'Projet final certifiant',
    ],
    href: '/programmes',
  },
  // Nouveaux bootcamps alignés sur le planning
  {
    id: '4',
    title: 'Bootcamp 1 — IA & Problèmes réels',
    type: 'bootcamp',
    description:
      'Identification de problèmes réels et conception de solutions en s’appuyant sur les bases de l’IA.',
    duration: '1 semaine',
    level: 'Collège & Lycée',
    image: '/images/banner/img3.jpg',
    startDate: '22/12/2025 – 26/12/2025',
    price: 185,
    badge: 'Bootcamp 1',
    features: [
      'Identification de problèmes et de leurs solutions',
      'Orientation vers les modèles à utiliser',
      'Découverte des techniques de traitement',
    ],
    href: '/programmes',
  },
  {
    id: '5',
    title: 'Bootcamp 2 — Programmation & LLMs',
    type: 'bootcamp',
    description:
      'Découverte des bases de la programmation, logique algorithmique et introduction aux LLMs.',
    duration: '1 semaine',
    level: 'Collège & Lycée',
    image: '/images/banner/img3.jpg',
    startDate: '29/12/2025 – 02/01/2026',
    price: 185,
    badge: 'Bootcamp 2',
    features: [
      'Bases de la programmation adaptées aux collégiens/lycéens',
      'Exercices ludiques pour développer la logique et la pensée algorithmique',
      'Introduction aux LLMs et à leurs principales applications',
    ],
    href: '/programmes',
  },
  {
    id: '6',
    title: 'Bootcamp 3 & 4 — Vision par Ordinateur',
    type: 'bootcamp',
    description:
      "Initiation à la vision par ordinateur et aux techniques de reconnaissance d'objets.",
    duration: '1 semaine',
    level: 'Collège & Lycée',
    image: '/images/banner/img3.jpg',
    startDate: '02/02/2026 – 06/02/2026',
    price: 185,
    badge: 'Bootcamps 3 & 4',
    features: [
      "Introduction à la vision par ordinateur",
      "Découverte de cas d’usage (ex. reconnaissance d'objets)",
      'Mise en pratique sur des projets simples',
    ],
    href: '/programmes',
  },
  {
    id: '7',
    title: 'Bootcamp 5 — Restitution & Projets IA',
    type: 'bootcamp',
    description:
      'Semaine de restitution avec présentations de projets, jury et valorisation des réalisations.',
    duration: '1 semaine',
    level: 'Collège & Lycée',
    image: '/images/banner/img3.jpg',
    startDate: '23/03/2026 – 27/03/2026',
    price: 185,
    badge: 'Bootcamp 5',
    features: [
      'Présentation des projets devant un jury (parents, enseignants, encadrants)',
      'Remise de certificats et trophées',
      'Valorisation des réalisations des élèves',
    ],
    href: '/programmes',
  },
]

import connectToDatabase from '@/lib/mongodb'
import StudentProject from '@/models/Project'
import Review from '@/models/Review'
import Formation from '@/models/Formation'
import Trainer from '@/models/Trainer'
import { trainers as TrainerStaticData } from '@/data/trainers'

export const GET = async () => {
  try {
    await connectToDatabase();

    const projects = await StudentProject.find();
    let reviews = await Review.find();
    const formations = await Formation.find();
    let dbTrainers = await Trainer.find();

    // Auto-populate reviews if empty (save old comments)
    if (reviews.length === 0 && ReviewData.length > 0) {
      await Review.insertMany(ReviewData);
      reviews = await Review.find();
    }

    // Auto-populate trainers if empty
    if (dbTrainers.length === 0 && TrainerStaticData.length > 0) {
      // Remove id field from static data to let Mongo generate _id if needed, or map it
      const trainersToInsert = TrainerStaticData.map(({ id, ...rest }) => rest);
      await Trainer.insertMany(trainersToInsert);
      dbTrainers = await Trainer.find();
    }

    // Use DB data if available, otherwise fallback to static (initial)
    return NextResponse.json({
      HeroData,
      NavLinkData,
      ProjectData: projects.length > 0 ? projects : ProjectData,
      RecordData,
      ReviewData: reviews.length > 0 ? reviews : ReviewData,
      SpecializeData,
      PlanData,
      CategoryData,
      FooterLinkData,
      FormationData: formations.length > 0 ? formations : FormationData,
      TrainerData: dbTrainers.length > 0 ? dbTrainers : TrainerStaticData,
    })
  } catch (error) {
    console.error('API Data fetch error', error);
    return NextResponse.json({
      HeroData, NavLinkData, ProjectData, RecordData, ReviewData, SpecializeData, PlanData, CategoryData, FooterLinkData, FormationData, TrainerData: TrainerStaticData
    });
  }
}
