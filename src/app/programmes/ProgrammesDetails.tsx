'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Brain,
  Cpu,
  CircuitBoard,
  BarChart3,
  CheckCircle2,
  Bot,
  Sparkles,
} from 'lucide-react'
import { fadeInUp, staggerContainer, cardVariant } from './programmesAnimations'

export default function ProgrammesDetails() {
  return (
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
                <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40'>
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
                <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 text-white shadow-md shadow-emerald-500/40'>
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
                    'Mini-système de classification d'images pour reconnaître des objets ou des personnages.',
                    'Chatbot dédié à l'établissement pour répondre aux questions fréquentes.',
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
                    Devenir établissement partenaire d&apos;ZYNOVIA
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
  )
}
