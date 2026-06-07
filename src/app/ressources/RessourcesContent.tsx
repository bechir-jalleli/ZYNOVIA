'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Book,
  FileText,
  Brain,
  BarChart3,
  Video,
  Hammer,
  School,
  Building2,
  Globe2,
  Sparkles,
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
    question: 'Que trouve-t-on dans les ressources ZYNOVIA ?',
    answer:
      'Les ressources regroupent des guides pratiques, des fiches pédagogiques, des supports d’ateliers, des vidéos et des analyses pour les familles, les élèves, les enseignants et les partenaires.',
  },
  {
    question: 'Les ressources sont-elles adaptées à tous les niveaux ?',
    answer:
      'Oui, certaines ressources sont pensées pour les collégiens et lycéens débutants, d’autres pour des publics plus avancés ou pour les enseignants et partenaires.',
  },
  {
    question: 'Comment utiliser ces ressources en classe ou à la maison ?',
    answer:
      'Les guides et supports pédagogiques peuvent être utilisés en autonomie ou intégrés à des ateliers, des cours, des clubs IA ou des activités en famille.',
  },
  {
    question: 'Les ressources seront-elles mises à jour ?',
    answer:
      'Oui, les contenus sont régulièrement enrichis pour suivre l’évolution de l’IA, des métiers et des besoins des familles, des écoles et des entreprises.',
  },
]

const RessourcesContent = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  return (
    <main className='bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* HERO */}
      <section className='relative py-24 lg:py-32'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.24),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.4),transparent_55%)]'
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
                Ressources
              </p>
              <h1 className='text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
                Ressources ZYNOVIA
              </h1>
              <p className='text-lg font-medium text-primary/90 dark:text-cyan-300'>
                Comprendre l’IA, accompagner les élèves, anticiper les métiers de demain.
              </p>
              <p className='max-w-2xl text-sm sm:text-base text-slate-700 dark:text-slate-300'>
                ZYNOVIA met à disposition des ressources pédagogiques, guides pratiques et analyses
                pour aider familles, enseignants et partenaires.
              </p>
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
                  <Book className='h-5 w-5 text-primary dark:text-cyan-300' />
                  <p className='font-semibold text-[#0A004B] dark:text-white'>
                    Une bibliothèque pensée pour les familles, les écoles et les partenaires
                  </p>
                </div>
                <p>
                  Guides, fiches, études et vidéos sont organisés pour vous permettre de comprendre
                  les enjeux de l’IA, d’accompagner les élèves dans leurs projets et de préparer les
                  prochaines étapes de leur orientation.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Guides & documents essentiels */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Guides &amp; documents essentiels
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'
          >
            {[
              { title: 'Le guide des parents', icon: Book },
              { title: 'Le guide pour les élèves', icon: Brain },
              { title: 'Le guide enseignants', icon: School },
              { title: 'Le guide orientation : métiers de demain', icon: FileText },
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

      {/* SECTION – Études & analyses */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Études &amp; analyses
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'
          >
            {[
              { title: 'Chiffres clés de l’IA', icon: BarChart3 },
              { title: 'Pourquoi 85% des métiers n’existent pas encore', icon: Globe2 },
              { title: 'IA responsable & éthique', icon: Brain },
              { title: 'Tendances du marché', icon: Sparkles },
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

      {/* SECTION – Supports pédagogiques */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Supports pédagogiques
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='mt-8 rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
          >
            <ul className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
              {[
                'Exercices & mini-projets IA',
                'Ateliers clé en main',
                'Fiches compétences',
                'Slides & présentations',
              ].map((item, index) => (
                <li
                  key={item}
                  className='flex items-start gap-2 rounded-2xl bg-slate-50/90 px-3 py-3 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 dark:bg-slate-900/80 dark:ring-slate-700/70'
                >
                  <div className='mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9]/15 via-[#0091E6]/20 to-[#0067E0]/15 text-primary dark:text-cyan-300'>
                    {index % 2 === 0 ? (
                      <Brain className='h-4 w-4' />
                    ) : (
                      <Hammer className='h-4 w-4' />
                    )}
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Ressources pour les partenaires */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Ressources pour les partenaires
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-3'
          >
            {/* Établissements scolaires */}
            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
            >
              <div className='mb-1 flex items-center gap-2'>
                <School className='h-5 w-5 text-primary dark:text-cyan-300' />
                <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                  Établissements scolaires
                </h3>
              </div>
              <ul className='space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                <li>Guides d’intégration de l’IA dans le projet d’établissement</li>
                <li>Modèles de séquences pédagogiques</li>
                <li>Kits de communication pour les familles</li>
              </ul>
            </motion.div>

            {/* Entreprises */}
            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
            >
              <div className='mb-1 flex items-center gap-2'>
                <Building2 className='h-5 w-5 text-primary dark:text-cyan-300' />
                <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                  Entreprises
                </h3>
              </div>
              <ul className='space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                <li>Dossiers RSE et fiches programmes</li>
                <li>Formats d’ateliers pour enfants de salariés</li>
                <li>Ressources pour interventions et jurys</li>
              </ul>
            </motion.div>

            {/* Institutions & associations */}
            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
            >
              <div className='mb-1 flex items-center gap-2'>
                <Globe2 className='h-5 w-5 text-primary dark:text-cyan-300' />
                <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                  Institutions &amp; associations
                </h3>
              </div>
              <ul className='space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                <li>Ressources pour projets d’inclusion numérique</li>
                <li>Supports de sensibilisation grand public</li>
                <li>Fiches sur l’IA éthique et citoyenne</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Vidéos & contenus interactifs */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Vidéos &amp; contenus interactifs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'
          >
            {[
              { title: 'Vidéos pédagogiques', icon: Video },
              { title: 'Démos IA', icon: Sparkles },
              { title: 'Interviews experts', icon: Brain },
              { title: 'Webinaires', icon: Globe2 },
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

      {/* SECTION – Outils & recommandations */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Outils &amp; recommandations
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'
          >
            {[
              { title: 'Outils IA éducatifs', icon: Brain },
              { title: 'Conseils pratiques', icon: Hammer },
              { title: 'Simulateurs & exercices', icon: BarChart3 },
              { title: 'Bonnes pratiques numériques', icon: Sparkles },
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

      {/* SECTION – FAQ Ressources */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='space-y-2 text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              FAQ Ressources
            </p>
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
                  Accédez aux guides, documents et outils qui préparent l’avenir
                </h2>
              </div>
              <div className='flex flex-wrap gap-3'>
                <Link
                  href='/ressources'
                  className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                >
                  Voir toutes les ressources
                </Link>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center rounded-xl border border-primary/20 bg-white/90 px-5 py-2.5 text-sm font-semibold text-primary shadow-sm backdrop-blur hover:border-white hover:bg-primary hover:text-white dark:bg-slate-900/90 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950'
                >
                  Télécharger un guide
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
export default RessourcesContent


