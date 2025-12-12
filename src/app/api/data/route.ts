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
    title: 'Web Design',
    desc: 'Modern, responsive websites built to engage users and convert leads.',
  },
  {
    imgSrc: '/images/specialization/logodesign.svg',
    title: 'Logo Design',
    desc: 'Distinct, memorable logos crafted to define and elevate your brand.',
  },
  {
    imgSrc: '/images/specialization/mobileapp.svg',
    title: 'Mobile App Development',
    desc: 'Custom iOS and Android apps with seamless flow and functionality.',
  },
  {
    imgSrc: '/images/specialization/contentwrite.svg',
    title: 'Content Writing',
    desc: 'SEO-driven content designed to educate, engage, and boost visibility.',
  },
  {
    imgSrc: '/images/specialization/seooptimize.svg',
    title: 'SEO Optimization',
    desc: 'Proven SEO strategies that increase rankings, traffic, and brand reach.',
  },
  {
    imgSrc: '/images/specialization/digitalmarketing.svg',
    title: 'Digital Marketing',
    desc: 'Targeted digital campaigns to build awareness and grow your audience.',
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
    imgSrc: '/images/category/webdev.webp',
    title: 'Web Design',
  },
  {
    imgSrc: '/images/category/logods.webp',
    title: 'Logo Design',
  },
  {
    imgSrc: '/images/category/mobileapp.webp',
    title: 'Mobile App Development',
  },
  {
    imgSrc: '/images/category/contentwrite.webp',
    title: 'Content Writing',
  },
  {
    imgSrc: '/images/category/digitalmarket.webp',
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
