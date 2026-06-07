'use client'

import { motion } from 'framer-motion'
import { Brain, Cpu, BarChart3, Users, Sparkles, Clock } from 'lucide-react'
import { fadeInUp, staggerContainer, cardVariant } from './programmesAnimations'

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

export default function ProgrammesPlanning() {
  return (
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
                <div className='pointer-events-none absolute left-[10px] top-0 bottom-0 w-px bg-gradient-to-b from-[#27397F] via-[#4490C7] to-transparent' />
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
  )
}
