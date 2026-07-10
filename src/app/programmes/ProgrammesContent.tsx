'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Cpu,
  Brain,
  CircuitBoard,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Bot,
  Building2,
  Users,
  Clock,
  Calendar,
  GraduationCap,
  FolderKanban,
} from 'lucide-react'
import AnimatedNumber from '@/app/components/AnimatedNumber'
import PartnersBanner from '@/app/components/Home/PartnersBanner'

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
}

const planningPhases = [
  {
    icon: Brain,
    title: "Compréhension des concepts fondamentaux de l'intelligence artificielle",
    bullets: [
      "Introduction à l'IA : histoire, définitions et impact.",
      "Domaines d'application de l'IA dans la vie quotidienne et à l'école.",
    ],
    weeksLabel: 'Semaine 1–4',
    weeksSummary: "Découverte des bases de l'IA et de son impact dans notre quotidien.",
  },
  {
    icon: Cpu,
    title: "Apprentissage des algorithmes & cas d'utilisation",
    bullets: [
      'Concepts de base : Machine Learning, Deep Learning.',
      'Algorithmes de base et mise en pratique sur des cas concrets.',
      'Études de cas : analyse de projets réels utilisant ces algorithmes.',
      'Introduction à des outils et frameworks (Python, TensorFlow, PyTorch).',
    ],
    weeksLabel: 'Semaine 5–8',
    weeksSummary: "Plongée dans les algorithmes d'IA et premiers pas en programmation.",
  },
  {
    icon: BarChart3,
    title: 'Préparation des données & techniques de traitement',
    bullets: [
      'Collecte et nettoyage des données : sources, formats, qualité.',
      'Manipulation et structuration des données.',
      'Normalisation, réduction ou augmentation de dimensions, etc.',
    ],
    weeksLabel: 'Semaine 9–12',
    weeksSummary: 'Maîtrise des techniques essentielles pour préparer et traiter les données.',
  },
  {
    icon: Users,
    title: 'Application des connaissances apprises',
    bullets: [
      "Travaux dirigés et mini-projets tout au long de l'année.",
      'Travail en équipe : collaboration sur des projets de groupe.',
      'Conception et développement de projets réels.',
      'Présentation des projets et feedback personnalisé.',
    ],
    weeksLabel: 'Semaine 13–15',
    weeksSummary: 'Mise en pratique concrète à travers des projets collaboratifs et des présentations.',
  },
  {
    icon: Sparkles,
    title: 'Ateliers spécialisés',
    bullets: [
      "Sessions thématiques autour de l'IA et des STEM.",
      "Découverte approfondie de cas d'usage par secteur.",
      "Développement de projets d'approfondissement pour les plus motivés.",
    ],
    weeksLabel: 'Semaine 16–30',
    weeksSummary: "Approfondissement thématique et développement de projets personnalisés pour aller plus loin.",
  },
]

const bootcampsSchedule = [
  {
    label: 'Bootcamp 1',
    dates: 'Du 22/12/2025 au 26/12/2025',
    title: 'Du problème réel à la solution IA',
    theme: 'Déclic & créativité',
    bullets: [
      'Identification de problèmes concrets du quotidien ou de la vie scolaire.',
      'Brainstorming guidé pour imaginer des solutions innovantes appuyées par l’IA.',
      'Orientation vers les modèles et techniques de traitement adaptés aux idées des élèves.',
    ],
  },
  {
    label: 'Bootcamp 2',
    dates: 'Du 29/12/2025 au 02/01/2026',
    title: 'Découverte de la programmation & introduction aux LLMs',
    theme: 'Premiers pas en code',
    bullets: [
      'Découverte des bases de la programmation, adaptée aux collégiens et lycéens.',
      'Exercices ludiques pour développer la logique et la pensée algorithmique.',
      'Introduction aux LLMs et à leurs principales applications dans la vie réelle.',
    ],
  },
  {
    label: 'Bootcamps 3 & 4',
    dates: 'Du 02/02/2026 au 06/02/2026',
    title: 'Vision par ordinateur & projets visuels',
    theme: 'IA & images',
    bullets: [
      "Introduction à la vision par ordinateur (ex. reconnaissance d'objets).",
      'Manipulation d’images et création de premiers prototypes visuels.',
      'Mise en pratique sur des cas d’usage proches de leur quotidien.',
    ],
  },
  {
    label: 'Bootcamp 5',
    dates: 'Du 23/03/2026 au 27/03/2026',
    title: 'Restitution & valorisation des projets',
    theme: 'Pitch & confiance en soi',
    bullets: [
      'Présentation des projets devant un jury (Parents, enseignants, encadrants).',
      'Remise de certificats et trophées pour valoriser les réalisations des élèves.',
      'Mise en avant des compétences acquises pour la suite de leur parcours.',
    ],
  },
] as const

export default function ProgrammesContent() {
  return (
    <main className='bg-gradient-to-b from-secondary/10 via-secondary/5 to-transParent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* HERO SECTION – PROGRAMME ANNUEL */}

      <section className='relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-secondary/60 via-secondary/30 to-transParent dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950'>
        {/* Decorative background glow */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_center,_rgba(0,195,217,0.25),transParent_60%)] dark:bg-[radial-gradient(circle_at_center,_rgba(0,195,217,0.35),transParent_60%)]'
        />

        {/* Animated curved shapes */}
        <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className='absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] blur-3xl'
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
            className='absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-[#0067E0] via-[#0091E6] to-[#00C3D9] blur-3xl'
          />
        </div>

        <div className='w-full overflow-hidden'>
          <div className='container relative z-20 pt-20 lg:pt-24 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
            <div className='relative z-20 grid lg:grid-cols-12 grid-cols-1 lg:items-start items-center lg:justify-items-normal justify-items-center gap-10 lg:gap-20 pb-10'>
              {/* Colonne texte – même logique que le Hero de l'accueil */}
              <div className='lg:col-span-7 col-span-1'>
                <div className='flex flex-col lg:items-start items-center gap-6 lg:gap-8'>

                  <div className='flex flex-col lg:items-start items-center gap-4 lg:gap-5'>
                    <h1 className='lg:text-start text-center w-full max-w-3xl text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white'>
                      Programme Annuel{' '}
                      <span className='text-gradient'>IA</span>
                    </h1>
                    <p className='lg:text-start text-center text-sm sm:text-base font-semibold text-primary/80 dark:text-cyan-200'>
                      Un programme intégré au cœur du cursus scolaire
                    </p>

                    <motion.p
                      {...fadeInUp}
                      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                      className='lg:text-start text-center text-lg sm:text-xl lg:text-2xl font-semibold text-primary dark:text-cyan-300'
                    >

                    </motion.p>

                    <motion.p
                      {...fadeInUp}
                      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                      className='lg:text-start text-center max-w-3xl text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed'
                    >
                      ZYNOVIA Academy propose un programme innovant, conçu en collaboration avec les équipes pédagogiques, pour moderniser l&apos;apprentissage, renforcer les matières STEM et préparer les élèves aux compétences technologiques de demain.
                    </motion.p>
                  </div>

                  {/* CTA buttons – calquées sur celles de l'accueil */}
                  <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full max-w-2xl'>
                    <Link href='/inscription?role=Parent'>
                      <button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-white border rounded-[10px] border-transParent bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:cursor-pointer duration-300 shadow-md whitespace-nowrap'>                        👨‍👩‍👧 Parent
                      </button>
                    </Link>
                    <Link href='/inscription?role=etablissement'>
                      <button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-primary border rounded-[10px] border-primary bg-white dark:bg-transParent hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:cursor-pointer duration-300 shadow-sm whitespace-nowrap'>
                        🏫 Établissement scolaire
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Colonne image – même place que le slider de la home, avec ton visuel de programme annuel */}
              <div className='lg:col-span-5 col-span-1 lg:w-full sm:w-[80%] w-full mt-6 lg:mt-0'>
                <motion.div
                  {...fadeInUp}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
                >
                  <div className='relative'>
                    <div className='absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#00C3D9]/25 via-[#0091E6]/20 to-[#0067E0]/25 blur-2xl' />
                    <div className='relative overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.35)] ring-1 ring-white/60 dark:ring-slate-700/80'>
                      <Image
                        src='/images/programe/programe.jpg'
                        alt="Élève découvrant l'intelligence artificielle avec ZYNOVIA Academy"
                        width={600}
                        height={420}
                        className='w-full object-cover'
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section - ZYNOVIA ACADEMY EN CHIFFRES */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className='mb-16'
          >
            <div className='text-center mb-6'>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                ZYNOVIA ACADEMY EN CHIFFRES
              </h2>
              <p className='text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto'>
                Des résultats concrets qui témoignent de l&apos;impact du programme auprès des établissements,
                des élèves et de leurs familles. Les compteurs ci-dessous sont animés et démarrent à 0 au
                chargement de la page pour rendre ces chiffres encore plus parlants.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.25 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            >
              {/* 6 établissements partenaires */}
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                />
                <div className='relative flex flex-col items-center text-center'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] text-white shadow-md shadow-[#27397F]/40 mb-4'>                    <Building2 className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    <AnimatedNumber value={6} duration={1500} />
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    établissements partenaires
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400'>
                    engagés sur l&apos;année scolaire 2025/2026
                  </p>
                </div>
              </motion.div>

              {/* +20000 collégiens et lycéens formés */}
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                />
                <div className='relative flex flex-col items-center text-center'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] text-white shadow-md shadow-[#27397F]/40 mb-4'>
                    <Users className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    <AnimatedNumber value='+20000' duration={2000} />
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    collégiens et lycéens déjà formés
                  </p>
                </div>
              </motion.div>

              {/* 70 heures chaque semaine */}
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                />
                <div className='relative flex flex-col items-center text-center'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] text-white shadow-md shadow-[#27397F]/40 mb-4'>
                    <Clock className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    <AnimatedNumber value={70} duration={1500} />
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    heures d&apos;enseignement animées chaque semaine
                  </p>
                </div>
              </motion.div>

              {/* 281 heures assurées par mois */}
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                />
                <div className='relative flex flex-col items-center text-center'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] text-white shadow-md shadow-[#27397F]/40 mb-4'>
                    <Calendar className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    <AnimatedNumber value={281} duration={1800} />
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    heures d&apos;accompagnement assurées par mois
                  </p>
                </div>
              </motion.div>

              {/* 1960 heures enseignées pour l'année scolaire */}
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                />
                <div className='relative flex flex-col items-center text-center'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] text-white shadow-md shadow-[#27397F]/40 mb-4'>
                    <GraduationCap className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    <AnimatedNumber value={1960} duration={2200} />
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    heures d&apos;enseignement dispensées
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400'>
                    sur l&apos;année scolaire 2025/2026
                  </p>
                </div>
              </motion.div>

              {/* +50 mini-projets réalisés */}
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                />
                <div className='relative flex flex-col items-center text-center'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] text-white shadow-md shadow-[#27397F]/40 mb-4'>
                    <FolderKanban className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    <AnimatedNumber value='+50' duration={1500} />
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    mini-projets réalisés
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400'>
                    conçus et présentés par les élèves
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PLANNING – PROGRAMME IA (1H / SEMAINE) */}
      <section className='py-24 lg:py-28 bg-gradient-to-b from-secondary/5 via-white to-secondary/5 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mb-12 lg:mb-16 text-center'
          >
            <p className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10'>
              <span className='h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
              ZYNOVIA • NOTRE OFFRE
            </p>
            <h2 className='mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A004B] dark:text-white'>
              Notre offre : cursus scolaire &amp; clubs IA
            </h2>
            <p className='mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl mx-auto'>
              Un programme IA de <span className='font-semibold'>1 heure par semaine</span>, intégré dans l&apos;année scolaire
              ou en club périscolaire, structuré en cycles clairs et progressifs pour accompagner les élèves
              du premier déclic jusqu&apos;à la réalisation de projets concrets.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.25 }}
            className='grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] lg:items-start'
          >
            {/* Colonne gauche : grands blocs de contenu */}
            <motion.div
              variants={staggerContainer}
              className='space-y-6'
            >
              {planningPhases.map(({ icon: Icon, title, bullets }) => (
                <motion.div
                  key={title}
                  variants={cardVariant}
                  className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70'
                >
                  <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                  />
                  <div className='relative flex items-start gap-3'>
                    <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-md shadow-[#27397F]/40 mb-4'>                      <Icon className='h-5 w-5' />
                    </div>
                    <div>
                      <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                        {title}
                      </h3>
                      <ul className='mt-3 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                        {bullets.map((bullet: string) => (
                          <li key={bullet} className='flex gap-2'>
                            <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Colonne droite : timeline des semaines (light & dark mode) */}
            <motion.div
              variants={cardVariant}
              className='relative rounded-3xl bg-white/95 text-slate-900 p-6 sm:p-7 shadow-[0_22px_55px_rgba(15,23,42,0.20)] ring-1 ring-slate-200/80 overflow-hidden dark:bg-slate-950 dark:text-white dark:shadow-[0_22px_55px_rgba(15,23,42,0.45)] dark:ring-slate-800/80'
            >
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-[linear-gradient(to_right,_rgba(39,57,127,0.25),_rgba(46,83,145,0.30),_rgba(68,144,199,0.30),_rgba(63,169,223,0.25))] blur-2xl opacity-90'
              />
              <div className='relative'>
                <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-[#27397F] dark:text-[#3FA9DF]'>
                  Déroulé du programme par semaines
                </p>
                <p className='mt-2 text-sm font-semibold text-slate-900 dark:text-white'>
                  Une progression continue, pensée pour garder les élèves motivés toute l&apos;année.
                </p>

                <div className='mt-6 relative'>
                  <div className='pointer-events-none absolute left-[10px] top-0 bottom-0 w-px bg-gradient-to-b from-[#27397F] via-[#4490C7] to-transParent' />
                  <div className='space-y-4'>
                    {planningPhases.map(({ weeksLabel, title, weeksSummary }, index) => (
                      <div
                        key={weeksLabel}
                        className='relative flex gap-4'
                      >
                        <div className='mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white ring-2 ring-[#2E5391]/70 shadow-md shadow-[#27397F]/30 dark:bg-slate-900 dark:ring-[#4490C7]/80 dark:shadow-[#3FA9DF]/40'>
                          <span className='h-2.5 w-2.5 rounded-full bg-gradient-brand' />
                        </div>
                        <div className='flex-1'>
                          <div className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-[#27397F] ring-1 ring-[#4490C7]/20 dark:bg-slate-900/80 dark:text-[#3FA9DF] dark:ring-[#4490C7]/40'>
                            <span>{weeksLabel}</span>
                            <span className='hidden sm:inline text-slate-400 dark:text-slate-400'>•</span>
                            <span className='hidden sm:inline text-slate-600 dark:text-slate-100/80'>
                              Étape {index + 1}
                            </span>
                          </div>
                          <p className='mt-2 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white'>
                            {title}
                          </p>
                          <p className='mt-1 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300'>
                            {weeksSummary}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='mt-6 flex flex-wrap items-center gap-2 text-[11px] text-slate-600 dark:text-slate-200/90'>
                  <div className='inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 font-semibold shadow-lg shadow-slate-900/40 dark:bg-white dark:text-slate-900'>
                    <Clock className='h-3.5 w-3.5' />
                    <span>Programme IA — 1 heure par semaine</span>
                  </div>
                  <span className='text-slate-500 dark:text-slate-400'>
                    Intégrable dans l&apos;emploi du temps ou en clubs périscolaires.
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partners Logos / Preuve sociale Section */}
      <PartnersBanner />

      {/* FULL-SCREEN SECTION 1 – OBJECTIFS PÉDAGOGIQUES */}
      <section className='min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-secondary/10 via-secondary/5 to-transParent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full'>
          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.25 }}
            className='w-full'
          >
            {/* Header */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-center mb-12 lg:mb-16'
            >
              <div className='inline-flex items-center justify-center mb-6'>

              </div>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white mb-4'>
                Objectifs pédagogiques
              </h2>
              <p className='text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
                Une feuille de route pédagogique claire pour développer à la fois les compétences techniques
                et les soft skills indispensables dans le monde de demain.
              </p>
            </motion.div>

            {/* Objectives Grid */}
            <motion.div
              variants={staggerContainer}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.25 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
            >
              {[
                'Comprendre les concepts fondamentaux de l\'IA et du machine learning.',
                'Développer une vraie pensée algorithmique et une logique mathématique appliquée.',
                'Apprendre en réalisant des mini-projets connectés aux notions vues en classe.',
                'Concevoir et présenter un projet final devant un jury bienveillant.',
                'Gagner en aisance à l\'oral, en communication et en travail d\'équipe.',
                'Ancrer les connaissances STEM grâce à l\'apprentissage par projet et par l\'expérience.',
              ].map((item, index) => (
                <motion.div
                  key={item}
                  variants={cardVariant}
                  className='relative overflow-hidden rounded-3xl bg-white/95 p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)] hover:-translate-y-1'
                >
                  <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                  />
                  <div className='relative flex items-start gap-4'>
                    <div className='flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] text-white shadow-md shadow-[#0091E6]/40'>
                      <span className='text-lg sm:text-xl font-bold'>{index + 1}</span>
                    </div>
                    <p className='text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-200 leading-relaxed pt-1'>
                      {item}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FULL-SCREEN SECTION 2 – CE QUI REND CE PROGRAMME UNIQUE */}
      <section className='min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-transParent via-secondary/5 to-secondary/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full'>
          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.25 }}
            className='w-full'
          >
            {/* Header */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='text-center mb-12 lg:mb-16'
            >
              <div className='inline-flex items-center justify-center mb-6'>

              </div>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white mb-4'>
                Ce qui rend ce programme unique
              </h2>
              <p className='text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
                Un dispositif structuré, clé en main, qui facilite la mise en place pour les établissements
                tout en offrant une expérience d&apos;apprentissage mémorable aux élèves.
              </p>
            </motion.div>

            {/* Unique Features Grid */}
            <motion.div
              variants={staggerContainer}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.25 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
            >
              {[
                {
                  icon: Cpu,
                  text: 'Programme clé en main, sans charge supplémentaire pour les équipes pédagogiques.',
                },
                {
                  icon: CircuitBoard,
                  text: 'Encadrement par des experts IA formés à la pédagogie jeunesse.',
                },
                {
                  icon: BarChart3,
                  text: 'Suivi mensuel et rapports d\'évolution partagés avec l\'établissement.',
                },
                {
                  icon: CheckCircle2,
                  text: 'Intégration fluide dans l\'emploi du temps ou en clubs existants.',
                },
                {
                  icon: Bot,
                  text: 'Certification officielle ZYNOVIA Academy pour valoriser le parcours des élèves.',
                },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={cardVariant}
                  className='relative overflow-hidden rounded-3xl bg-white/95 p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-primary/10 backdrop-blur dark:bg-slate-950/95 dark:ring-cyan-400/30 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.20)] hover:-translate-y-1'
                >
                  <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-t from-[#00C3D9]/15 via-[#0091E6]/20 to-[#0067E0]/15 blur-2xl'
                  />
                  <div className='relative flex flex-col items-start gap-4'>
                    <div className='flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9]/15 via-[#0091E6]/20 to-[#0067E0]/15 text-primary dark:text-cyan-300 ring-1 ring-primary/20 dark:ring-cyan-400/30'>
                      <Icon className='h-6 w-6 sm:h-7 sm:w-7' />
                    </div>
                    <p className='text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-200 leading-relaxed'>
                      {text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 1 CONTINUATION – Content grid */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl sm:px-6 lg:px-8'>
          {/* Content grid */}
          <div className='grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-start'>
            {/* Feature groups */}
            <motion.div
              variants={staggerContainer}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.25 }}
              className='space-y-8'
            >
              {/* Objectifs pédagogiques */}
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                />
                <div className='relative flex items-center gap-3'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40'>
                    <Brain className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                      Compétences développées chez les élèves
                    </h3>
                  </div>
                </div>
                <ul className='relative mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                  {[
                    'Décoder le fonctionnement des IA et des modèles de machine learning.',
                    'Structurer une démarche de résolution de problème de façon logique et rigoureuse.',
                    'Mobiliser les notions vues en mathématiques, sciences et technologies dans des projets concrets.',
                    'S\'entraîner à présenter, argumenter et défendre un projet devant un public.',
                    'Développer coopération, leadership et esprit critique.',
                    'Renforcer les résultats scolaires grâce à une approche active et motivante des STEM.',
                  ].map((item, index) => (
                    <li
                      key={item}
                      className='flex items-start gap-2 rounded-2xl bg-slate-50/80 px-3 py-2 ring-1 ring-slate-100/80 shadow-sm shadow-slate-900/5 dark:bg-slate-900/70 dark:ring-slate-700/70'
                    >
                      <span className='mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00C3D9] to-[#0067E0] text-[10px] text-white shadow-sm shadow-[#0091E6]/50'>
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Ce qui rend ce programme unique */}
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-primary/10 backdrop-blur dark:bg-slate-950/95 dark:ring-cyan-400/30'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-t from-[#00C3D9]/15 via-[#0091E6]/20 to-[#0067E0]/15 blur-2xl'
                />
                <div className='relative flex items-center gap-3'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] text-white shadow-md shadow-emerald-500/40'>
                    <Sparkles className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                      Pourquoi les établissements nous choisissent
                    </h3>
                  </div>
                </div>
                <div className='relative mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                  {[
                    {
                      icon: Cpu,
                      text: 'Une solution prête à l\'emploi, alignée avec les attentes des directions et des équipes pédagogiques.',
                    },
                    {
                      icon: CircuitBoard,
                      text: 'Des intervenants spécialisés, capables de vulgariser des notions complexes pour les collégiens et lycéens.',
                    },
                    {
                      icon: BarChart3,
                      text: 'Des indicateurs de progression clairs, partagés avec l\'établissement et les familles.',
                    },
                    {
                      icon: CheckCircle2,
                      text: 'Une organisation souple, compatible avec différents formats (cursus, options, clubs).',
                    },
                    {
                      icon: Bot,
                      text: 'Une certification ZYNOVIA Academy qui valorise le parcours des élèves et l\'image de l\'établissement.',
                    },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className='flex items-start gap-3 rounded-2xl bg-slate-50/90 px-3 py-3 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/15 dark:bg-slate-900/80 dark:ring-slate-700/70'
                    >
                      <div className='mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9]/15 via-[#0091E6]/20 to-[#0067E0]/15 text-primary dark:text-cyan-300'>
                        <Icon className='h-4 w-4' />
                      </div>
                      <p className='text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Example projects + CTA */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className='space-y-6'
            >
              <div className='relative overflow-hidden rounded-3xl bg-white/95 p-6 text-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.16)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-100 dark:ring-slate-700/80'>
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-[#00C3D9]/40 via-[#0091E6]/30 to-[#0067E0]/30 blur-2xl'
                />
                <div className='relative'>
                  <h3 className='text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                    Exemples de projets réalisés par les élèves
                  </h3>
                  <ul className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs sm:text-sm'>
                    {[
                      'Assistant intelligent pour réviser les cours et mieux retenir les notions clés.',
                      'Mini-système de classification d’images pour reconnaître des objets ou des personnages.',
                      'Chatbot dédié à l’établissement pour répondre aux questions fréquentes.',
                      'Application de prévention et de signalement contre le harcèlement scolaire.',
                      'Outils interactifs pour rendre les matières STEM plus ludiques et accessibles.',
                    ].map((item) => (
                      <li
                        key={item}
                        className='flex items-start gap-2 rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-100/90 dark:bg-slate-900/75 dark:ring-slate-700/70'
                      >
                        <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full icon-gradient' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.div
                {...fadeInUp}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                className='rounded-3xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] p-[1px] shadow-[0_18px_40px_rgba(0,145,230,0.45)]'
              >
                <div className='flex flex-col items-start gap-4 rounded-[22px] bg-white/95 px-5 py-5 text-left sm:flex-row sm:items-center sm:justify-between dark:bg-slate-950/95'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                      Pour les établissements scolaires
                    </p>
                    <p className='mt-1 text-sm font-semibold text-[#0A004B] dark:text-white'>
                      Devenir établissement partenaire de ZYNOVIA
                    </p>
                  </div>
                  <Link
                    href='/contact?type=etablissement#contact-form'
                    className='inline-flex items-center justify-center rounded-xl btn-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                  >
                    Devenir établissement partenaire
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 – BOOTCAMPS IA (VACANCES) */}
      <section>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10'>
              <span className='h-2 w-2 rounded-full icon-gradient' />
              Bootcamps IA
            </p>
            <h2 className='mt-4 text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
              Bootcamps IA — Vacances scolaires
            </h2>
            <p className='mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300'>
              Des immersions courtes, dynamiques et transformantes pour les élèves curieux,
              passionnés ou simplement désireux de mieux comprendre l&apos;IA et les technologies
              qui les entourent au quotidien.
            </p>
          </motion.div>

          {/* Planning détaillé des bootcamps */}
          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'
          >
            {bootcampsSchedule.map(({ label, dates, title, theme, bullets }, index) => (
              <motion.div
                key={label}
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-5 shadow-[0_20px_45px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.32)]'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-24 rounded-full bg-gradient-to-r from-[#00C3D9]/25 via-[#0091E6]/30 to-[#0067E0]/25 blur-3xl opacity-80 dark:from-[#00C3D9]/30 dark:via-[#0091E6]/35 dark:to-[#0067E0]/30'
                />
                <div className='relative flex flex-col gap-3'>
                  {/* En-tête du bootcamp */}
                  <div className='flex items-start justify-between gap-2'>
                    <div className='flex flex-col gap-1'>
                      <span className='inline-flex items-center gap-1 rounded-full bg-slate-100 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-900 px-3 py-1 shadow-sm shadow-slate-200/80 dark:bg-slate-900 dark:text-white dark:shadow-slate-900/40'>
                        <span className='h-1.5 w-1.5 rounded-full icon-gradient' />
                        {label}
                      </span>
                      <p className='text-[11px] font-medium text-slate-600 dark:text-slate-300 mt-1'>
                        {dates}
                      </p>
                    </div>
                    <div
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold ring-1 ${index === 0
                        ? 'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-500/40'
                        : index === 1
                          ? 'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-500/40'
                          : index === 2
                            ? 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200 dark:bg-fuchsia-500/10 dark:text-fuchsia-200 dark:ring-fuchsia-500/40'
                            : 'bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-200 dark:ring-sky-500/40'
                        }`}
                    >
                      {theme}
                    </div>
                  </div>

                  {/* Titre & résumé */}
                  <p className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                    {title}
                  </p>

                  {/* Contenu détaillé */}
                  <ul className='mt-1 space-y-1.5 text-[11px] sm:text-xs text-slate-700 dark:text-slate-200'>
                    {bullets.map((bullet: string) => (
                      <li
                        key={bullet}
                        className='flex gap-2'
                      >
                        <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full icon-gradient' />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer infos pratiques */}
                  <div className='mt-3 flex flex-wrap items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400'>
                    <span className='inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 ring-1 ring-slate-200 dark:bg-slate-900/70 dark:ring-slate-700'>
                      <Clock className='h-3 w-3' />
                      5 jours intensifs
                    </span>
                    <span className='inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 ring-1 ring-slate-200 dark:bg-slate-900/70 dark:ring-slate-700'>
                      <GraduationCap className='h-3 w-3' />
                      Collégiens & lycéens
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className='mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.2fr)] lg:items-start'>
            {/* Objectifs éducatifs */}
            <motion.div
              variants={staggerContainer}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.3 }}
              className='space-y-8'
            >
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-16 h-32 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/30 to-[#0067E0]/30 blur-3xl opacity-80'
                />
                <div className='relative flex items-center gap-3'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] text-white shadow-md shadow-[#0091E6]/40'>
                    <Cpu className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                      Objectifs éducatifs des bootcamps
                    </h3>
                  </div>
                </div>
                <ul className='relative mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                  {[
                    'Identifier un problème réel qui les touche ou les inspire.',
                    'Imaginer et concevoir une solution originale en petit groupe.',
                    'Construire un premier prototype fonctionnel, même simple.',
                    'Intégrer de l’IA ou de l’automatisation dans leur projet.',
                    'Transformer une idée en mini-produit technologique concret.',
                    'Pitcher leur projet devant un jury dans un cadre bienveillant.',
                  ].map((item) => (
                    <li
                      key={item}
                      className='flex items-start gap-2 rounded-2xl bg-slate-50/80 px-3 py-2 ring-1 ring-slate-100/80 shadow-sm shadow-slate-900/5 dark:bg-slate-900/70 dark:ring-slate-700/70'
                    >
                      <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full icon-gradient' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={cardVariant}
                className='rounded-3xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] p-[1px] shadow-[0_18px_40px_rgba(0,145,230,0.45)]'
              >
                <div className='flex flex-col gap-4 rounded-[22px] bg-white/95 px-5 py-5 text-left sm:flex-row sm:items-center sm:justify-between dark:bg-slate-950/95'>
                  <div className='flex items-start gap-3'>
                    <div className='mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9]/15 via-[#0091E6]/20 to-[#0067E0]/15 text-primary dark:text-cyan-300'>
                      <Bot className='h-4 w-4' />
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                        S’Inscrire au prochain bootcamp
                      </p>
                    </div>
                  </div>
                  <Link
                    href='/inscription?role=Parent'
                    className='inline-flex items-center justify-center rounded-xl btn-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                  >
                    S&apos;Inscrire au prochain bootcamp
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Example projects grid */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className='space-y-6'
            >
              <div className='relative overflow-hidden rounded-3xl bg-white/95 p-6 text-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.16)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-100 dark:ring-slate-700/80'>
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-[#00C3D9]/40 via-[#0091E6]/30 to-[#0067E0]/30 blur-2xl'
                />
                <div className='relative'>
                  <h3 className='text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                    Exemples de projets développés en bootcamps
                  </h3>

                  <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    {[
                      'Mini-chatbot avec LLM.',
                      'Jeu vidéo amélioré par IA.',
                      'Robot de tri intelligent.',
                      'Assistant IA pour les devoirs.',
                      'Système de détection d’objets.',
                      'Application IA anti-cyberharcèlement.',
                    ].map((item, index) => (
                      <div
                        key={item}
                        className='flex items-start gap-3 rounded-2xl bg-slate-50/90 px-3 py-3 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/15 dark:bg-slate-900/80 dark:ring-slate-700/70'
                      >
                        <div className='mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9]/15 via-[#0091E6]/20 to-[#0067E0]/15 text-primary dark:text-cyan-300'>
                          {index % 2 === 0 ? (
                            <Cpu className='h-4 w-4' />
                          ) : (
                            <CircuitBoard className='h-4 w-4' />
                          )}
                        </div>
                        <p className='text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}


