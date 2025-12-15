import { NextResponse } from 'next/server'

import { NavLinkType } from '@/app/types/navlink'
import { ProjectType } from '@/app/types/project'
import { RecordType } from '@/app/types/record'
import { ReviewType } from '@/app/types/review'
import { SpecializeType } from '@/app/types/specialize'
import { PlanType } from '@/app/types/plan'
import { CategoryType } from '@/app/types/category'
import { FooterLinkType } from '@/app/types/footerlinks'
import { HeroType } from '@/app/types/hero'

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
    name: 'Daniel Reid',
    rating: 4.2,
    desc: 'Pixelize nailed our website redesign. Clean layout, fast loading, and mobile-friendly. Highly recommended!',
  },
  {
    imgSrc: '/images/review/sophia.webp',
    name: 'Sophia Turner',
    rating: 4.5,
    desc: 'The UI/UX improvements boosted our user engagement and conversions. Truly a professional team!',
  },
  {
    imgSrc: '/images/review/marcus.webp',
    name: 'Marcus Lee',
    rating: 4.8,
    desc: 'They understood our brand vision perfectly and delivered a logo that stands out in our industry.',
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
    imgSrc: '/images/infrastructures/SalleReunion/file-2-20240115143823.jpg',
    title: 'Un espace conçu pour apprendre dans un environnement professionnel',
  },
  {
    imgSrc: '/images/infrastructures/gallery/gallery-01.jpg',
    title: 'Logo Design',
  },
  {
    imgSrc: '/images/infrastructures/gallery/gallery-02.jpg',
    title: 'Mobile App Development',
  },
  {
    imgSrc: '/images/infrastructures/Coworkingspace/file-1-20240115154556.jpg',
    title: 'Content Writing',
  },
  {
    imgSrc: '/images/infrastructures/SalleReunion2/file-0-20240115144742.jpg',
    title: 'Digital Marketing',
  },
]

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
        label: 'Prendre rendez-vous',
        href: '/contact',
      },
    ],
  },
]

export const GET = () => {
  return NextResponse.json({
    HeroData,
    NavLinkData,
    ProjectData,
    RecordData,
    ReviewData,
    SpecializeData,
    PlanData,
    CategoryData,
    FooterLinkData,
  })
}
