'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Handshake,
  Building2,
  School,
  ShieldCheck,
  BarChart3,
  Layers,
  Network,
  Users,
} from 'lucide-react'
import Link from 'next/link'

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
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
}

type FaqItem = {
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    question: 'Quels types de partenariats proposez-vous ?',
    answer:
      'INOTEQIA Academy propose des partenariats avec les établissements scolaires, les entreprises et les institutions autour de programmes annuels, d’ateliers, de bootcamps, d’événements et de projets co-construits.',
  },
  {
    question: 'Comment intégrer INOTEQIA dans un établissement ?',
    answer:
      'Nous analysons d’abord le contexte de votre établissement, puis nous proposons un dispositif adapté (programme annuel, ateliers, classe IA, événements ponctuels) avec un calendrier et un suivi précis.',
  },
  {
    question: 'Quel niveau d’implication pour une entreprise ?',
    answer:
      'Les entreprises peuvent accueillir des ateliers pour les enfants de leurs salariés, sponsoriser des programmes éducatifs, participer à des jurys de projets ou partager des problématiques métiers pour des projets IA.',
  },
  {
    question: 'Peut-on co-créer un programme ?',
    answer:
      'Oui, nous co-construisons des parcours sur mesure avec les équipes pédagogiques ou les responsables RSE afin d’aligner les objectifs éducatifs, techniques et d’impact.',
  },
]

const PartenariatsContent = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  return (
    <main className='bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* HERO */}
      <section className='relative py-24 lg:py-32'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.26),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.4),transparent_55%)]'
        />
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-center'
          >
            <div className='space-y-5 text-center md:text-left'>
              <p className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10'>
                <span className='h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                Partenariats
              </p>
              <h1 className='text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
                Partenariats INOTEQIA
              </h1>
              <p className='text-lg font-medium text-primary/90 dark:text-cyan-300'>
                Construisons ensemble la future génération de talents IA en Tunisie
              </p>
              <p className='max-w-2xl text-sm sm:text-base text-slate-700 dark:text-slate-300'>
                INOTEQIA Academy collabore avec les établissements scolaires, les entreprises et les
                institutions pour développer des parcours innovants, certifiants et tournés vers les
                compétences du futur.
              </p>

              <div className='mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start'>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/30 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                >
                  Devenir partenaire officiel
                </Link>
                <Link
                  href='/contact'
                  className='inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#0A004B] shadow-sm backdrop-blur hover:border-primary hover:text-primary dark:bg-slate-900/70 dark:text-white'
                >
                  Recevoir la brochure complète
                </Link>
              </div>
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
              className='relative rounded-3xl bg-white/85 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur-2xl dark:bg-slate-900/90 dark:ring-white/10'
            >
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-[#00C3D9]/55 via-[#0091E6]/45 to-[#0067E0]/45 blur-2xl'
              />
              <div className='relative space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-200'>
                <div className='flex items-center gap-2'>
                  <Handshake className='h-5 w-5 text-primary dark:text-cyan-300' />
                  <p className='font-semibold text-[#0A004B] dark:text-white'>
                    Un pont entre école, entreprise et société
                  </p>
                </div>
                <p>
                  Les partenariats INOTEQIA créent des passerelles concrètes entre le monde éducatif,
                  les entreprises et les institutions, autour de projets IA à fort impact pédagogique
                  et social.
                </p>
                <div className='grid grid-cols-2 gap-3 pt-2'>
                  <div className='rounded-2xl bg-slate-50/90 p-3 ring-1 ring-slate-200/80 dark:bg-slate-900/80 dark:ring-slate-700/70'>
                    <div className='mb-1 flex items-center gap-2 text-slate-700 dark:text-slate-100'>
                      <School className='h-4 w-4 text-primary dark:text-cyan-300' />
                      <span className='text-xs font-semibold'>Établissements scolaires</span>
                    </div>
                    <p className='text-[11px] text-slate-500 dark:text-slate-300'>
                      Intégrer l’IA dans le projet d’établissement.
                    </p>
                  </div>
                  <div className='rounded-2xl bg-slate-50/90 p-3 ring-1 ring-slate-200/80 dark:bg-slate-900/80 dark:ring-slate-700/70'>
                    <div className='mb-1 flex items-center gap-2 text-slate-700 dark:text-slate-100'>
                      <Building2 className='h-4 w-4 text-primary dark:text-cyan-300' />
                      <span className='text-xs font-semibold'>Entreprises & institutions</span>
                    </div>
                    <p className='text-[11px] text-slate-500 dark:text-slate-300'>
                      Donner du sens à la RSE et à la marque employeur.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Pourquoi devenir partenaire ? */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Pourquoi devenir partenaire ?
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'
          >
            {[
              {
                title: 'Intégrer l’IA dans le parcours éducatif',
                icon: Layers,
              },
              {
                title: 'Valoriser votre établissement ou entreprise',
                icon: Building2,
              },
              {
                title: 'Un accompagnement pédagogique complet',
                icon: Users,
              },
              {
                title: 'Renforcer l’attractivité et la réussite des élèves',
                icon: BarChart3,
              },
              {
                title: 'Une démarche responsable et citoyenne',
                icon: ShieldCheck,
              },
            ].map(({ title, icon: Icon }, index) => (
              <motion.div
                key={title}
                variants={cardVariant}
                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.03 }}
                className='group flex flex-col gap-3 rounded-3xl bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'
              >
                <div className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40'>
                  <Icon className='h-5 w-5' />
                </div>
                <p className='text-sm font-semibold text-[#0A004B] dark:text-white'>{title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION – Pour les établissements scolaires */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Pour les établissements scolaires
            </p>
            <h2 className='mt-3 text-2xl font-semibold text-[#0A004B] sm:text-3xl dark:text-white'>
              Faire de l’IA un pilier de votre projet d’établissement
            </h2>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] lg:items-start'
          >
            <div className='space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
              <div className='rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'>
                <div className='mb-3 flex items-center gap-2'>
                  <School className='h-5 w-5 text-primary dark:text-cyan-300' />
                  <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                    Dispositifs possibles
                  </h3>
                </div>
                <ul className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                  {[
                    'Programmes annuels intégrés au cursus',
                    'Ateliers hebdomadaires / mensuels',
                    'Bootcamps vacances',
                    'Journées technologiques & conférences',
                    'Formation des enseignants',
                    'Mise en place de "Classe IA"',
                  ].map((item) => (
                    <li
                      key={item}
                      className='flex items-start gap-2 rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 dark:bg-slate-900/80 dark:ring-slate-700/70'
                    >
                      <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className='space-y-4 rounded-3xl bg-white/95 p-6 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-100 dark:ring-slate-700/80'
            >
              <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                Bénéfices pour votre établissement
              </h3>
              <p>
                Intégrer INOTEQIA, c’est offrir à vos élèves des parcours alignés sur les enjeux
                STEM, renforcer l’attractivité de votre établissement et proposer aux familles une
                réponse concrète aux questions liées à l’orientation et à l’avenir des métiers.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Pour les entreprises */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Pour les entreprises
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] lg:items-start'
          >
            <div className='rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'>
              <div className='mb-3 flex items-center gap-2'>
                <Building2 className='h-5 w-5 text-primary dark:text-cyan-300' />
                <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                  Dispositifs possibles
                </h3>
              </div>
              <ul className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                {[
                  'Ateliers enfants salariés',
                  'Sponsoring programmes éducatifs',
                  'Participation aux jurys ou projets',
                  'Contribution RSE',
                  'Mise à disposition de problématiques métiers',
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-start gap-2 rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 dark:bg-slate-900/80 dark:ring-slate-700/70'
                  >
                    <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className='space-y-3 rounded-3xl bg-white/95 p-6 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-100 dark:ring-slate-700/80'
            >
              <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                Bénéfices pour votre entreprise
              </h3>
              <p className='text-xs sm:text-sm'>
                Les partenariats avec INOTEQIA permettent de donner du sens à vos actions RSE, de
                renforcer votre marque employeur et de vous positionner comme acteur engagé dans le
                développement des compétences IA des jeunes générations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Pour les institutions & associations */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Pour les institutions & associations
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] lg:items-start'
          >
            <div className='rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'>
              <div className='mb-3 flex items-center gap-2'>
                <Network className='h-5 w-5 text-primary dark:text-cyan-300' />
                <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                  Axes possibles
                </h3>
              </div>
              <ul className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                {[
                  'Inclusion numérique',
                  'Accès équitable à la technologie',
                  'Programmes IA éthique',
                  'Sensibilisation grand public',
                ].map((item) => (
                  <li
                    key={item}
                    className='flex items-start gap-2 rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 dark:bg-slate-900/80 dark:ring-slate-700/70'
                  >
                    <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Engagements INOTEQIA */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Engagements INOTEQIA
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-3'
          >
            {[
              {
                title: 'Transparence',
                icon: ShieldCheck,
              },
              {
                title: 'Programmes certifiés & pédagogie',
                icon: Layers,
              },
              {
                title: 'Expertise IA & enseignants',
                icon: BarChart3,
              },
              {
                title: 'Suivi & reporting',
                icon: Network,
              },
              {
                title: 'Communication claire',
                icon: Users,
              },
            ].map(({ title, icon: Icon }) => (
              <motion.div
                key={title}
                variants={cardVariant}
                className='flex flex-col gap-3 rounded-3xl bg-white/95 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
              >
                <div className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9]/20 via-[#0091E6]/30 to-[#0067E0]/20 text-primary dark:text-cyan-300'>
                  <Icon className='h-5 w-5' />
                </div>
                <p className='text-sm font-semibold text-[#0A004B] dark:text-white'>{title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION – Résultats obtenus */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Résultats obtenus
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
          >
            {[
              '+200 élèves formés',
              '4.7/5 satisfaction',
              '+58% progression STEM',
              'Partenariats publics & privés',
            ].map((label) => (
              <motion.div
                key={label}
                variants={cardVariant}
                className='rounded-2xl bg-white/90 p-4 text-sm text-slate-700 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:text-slate-200 dark:ring-slate-700/80'
              >
                <div className='flex items-center gap-2'>
                  <BarChart3 className='h-4 w-4 text-primary dark:text-cyan-300' />
                  <p className='font-semibold'>{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION – FAQ */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='space-y-2 text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              FAQ
            </p>
            <h2 className='text-2xl font-semibold text-[#0A004B] sm:text-3xl dark:text-white'>
              Questions fréquentes sur les partenariats
            </h2>
          </motion.div>

          <div className='mt-6 space-y-3'>
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <motion.div
                  key={item.question}
                  {...fadeInUp}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
                  className='overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70'
                >
                  <button
                    type='button'
                    className='flex w-full items-center justify-between px-4 py-3 text-left sm:px-5 sm:py-4'
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                      {item.question}
                    </span>
                    <span className='text-primary dark:text-cyan-300'>
                      {isOpen ? '–' : '+'}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    {isOpen && (
                      <div className='px-4 pb-4 text-xs text-slate-600 sm:px-5 sm:text-sm dark:text-slate-200'>
                        {item.answer}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='rounded-3xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] p-[1px] shadow-[0_22px_55px_rgba(0,145,230,0.55)]'
          >
            <div className='flex flex-col items-start gap-5 rounded-[22px] bg-white/95 px-6 py-7 text-left sm:px-8 sm:py-8 md:flex-row md:items-center md:justify-between dark:bg-slate-950/95'>
              <div className='space-y-2'>
                <h2 className='text-lg font-semibold text-[#0A004B] sm:text-xl dark:text-white'>
                  Rejoignez les acteurs qui préparent l’avenir dès aujourd’hui
                </h2>
              </div>
              <div className='flex flex-wrap gap-3'>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                >
                  Devenir partenaire officiel
                </Link>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center rounded-xl border border-primary/20 bg-white/90 px-5 py-2.5 text-sm font-semibold text-primary shadow-sm backdrop-blur hover:border-white hover:bg-primary hover:text-white dark:bg-slate-900/90 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950'
                >
                  Recevoir la brochure complète
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default PartenariatsContent





