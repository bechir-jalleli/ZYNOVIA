'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Cpu, CircuitBoard, Clock, GraduationCap, Bot } from 'lucide-react'
import { fadeInUp, staggerContainer, cardVariant } from './programmesAnimations'

const bootcampsSchedule = [
  {
    label: 'Bootcamp 1',
    dates: 'Du 22/12/2025 au 26/12/2025',
    title: 'Du problème réel à la solution IA',
    theme: 'Déclic & créativité',
    bullets: [
      'Identification de problèmes concrets du quotidien ou de la vie scolaire.',
      "Brainstorming guidé pour imaginer des solutions innovantes appuyées par l'IA.",
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
      "Manipulation d'images et création de premiers prototypes visuels.",
      "Mise en pratique sur des cas d'usage proches de leur quotidien.",
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

export default function ProgrammesBootcamps() {
  return (
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
                    Collégiens &amp; lycéens
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
                <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40'>
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
                  "Identifier un problème réel qui les touche ou les inspire.",
                  'Imaginer et concevoir une solution originale en petit groupe.',
                  'Construire un premier prototype fonctionnel, même simple.',
                  "Intégrer de l'IA ou de l'automatisation dans leur projet.",
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
                      S'inscrire au prochain bootcamp
                    </p>
                  </div>
                </div>
                <Link
                  href='/contact?profil=Parent'
                  className='inline-flex items-center justify-center rounded-xl btn-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                >
                  S&apos;inscrire au prochain bootcamp
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
                    "Mini-chatbot avec LLM.",
                    "Jeu vidéo amélioré par IA.",
                    "Robot de tri intelligent.",
                    "Assistant IA pour les devoirs.",
                    "Système de détection d'objets.",
                    "Application IA anti-cyberharcèlement.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className='flex items-start gap-3 rounded-2xl bg-slate-50/90 px-3 py-3 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/15 dark:bg-slate-900/80 dark:ring-slate-700/70'
                    >
                      <div className='mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-brand'>
                        {index % 2 === 0 ? (
                          <Cpu className='h-4 w-4' style={{ stroke: '#ffffff', color: '#ffffff' }} />
                        ) : (
                          <CircuitBoard className='h-4 w-4' style={{ stroke: '#ffffff', color: '#ffffff' }} />
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
  )
}
