'use client'

import { motion } from 'framer-motion'
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

export default function ProgrammesContent() {
  return (
    <main className='bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* SECTION 1 – PROGRAMME ANNUEL */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl  sm:px-6 lg:px-8'>
          {/* Header */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A004B] dark:text-white'>
              Programme Annuel — Intégration IA dans le cursus scolaire
            </h1>
            <motion.p
              {...fadeInUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className='mt-6 text-lg sm:text-xl lg:text-2xl font-semibold text-primary dark:text-cyan-300'>
              Un programme innovant intégré directement dans l’année scolaire pour moderniser
              l’apprentissage, renforcer les matières STEM et préparer les élèves aux compétences
              technologiques du futur.
            </motion.p>
            <motion.p
              {...fadeInUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              className='mt-6 max-w-3xl text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed'>
              INOTEQIA Academy prépare les jeunes aux compétences essentielles du futur : IA, pensée
              algorithmique, robotique, créativité et culture numérique.
            </motion.p>
          </motion.div>

          {/* Statistics Section - INOTEQIA ACADEMY EN CHIFFRES */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className='mt-16 mb-12'
          >
            <div className='text-center mb-6'>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
                INOTEQIA ACADEMY EN CHIFFRES
              </h2>
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
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40 mb-4'>
                    <Building2 className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    6
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    établissements partenaires
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400'>
                    sur l&apos;année scolaire 2025/2026
                  </p>
                </div>
              </motion.div>

              {/* +2000 collégiens et lycéens formés */}
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                />
                <div className='relative flex flex-col items-center text-center'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40 mb-4'>
                    <Users className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    +2000
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    collégiens et lycéens formés
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
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40 mb-4'>
                    <Clock className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    70
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    heures chaque semaine
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
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40 mb-4'>
                    <Calendar className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    281
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    heures assurées par mois
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
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40 mb-4'>
                    <GraduationCap className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    1960
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    heures enseignées
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400'>
                    pour l&apos;année scolaire 2025/2026
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
                  <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40 mb-4'>
                    <FolderKanban className='h-7 w-7' />
                  </div>
                  <h3 className='text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-2'>
                    +50
                  </h3>
                  <p className='text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 mb-1'>
                    mini-projets réalisés
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400'>
                    par les enfants
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Additional info section */}
            <motion.div
              variants={staggerContainer}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.25 }}
              className='mt-12 grid gap-6 sm:grid-cols-2'
            >
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00C3D9]/10 via-[#0091E6]/10 to-[#0067E0]/10 p-6 ring-1 ring-primary/20 dark:ring-cyan-400/20'
              >
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white'>
                    <Sparkles className='h-5 w-5' />
                  </div>
                  <div>
                    <h4 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                      Une présence pédagogique forte
                    </h4>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-400/10 via-cyan-400/10 to-blue-500/10 p-6 ring-1 ring-emerald-400/20 dark:ring-cyan-400/20'
              >
                <div className='flex items-center gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 text-white'>
                    <BarChart3 className='h-5 w-5' />
                  </div>
                  <div>
                    <h4 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                      Un écosystème éducatif solide et en croissance
                    </h4>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Partners Logos Section */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            className='mt-16 mb-12'
          >
            <div className='text-center mb-8'>
              <h3 className='text-xl sm:text-2xl font-semibold text-[#0A004B] dark:text-white'>
                Nos établissements partenaires
              </h3>
              <p className='mt-2 text-sm text-slate-600 dark:text-slate-400'>
                Des établissements qui nous font confiance pour former leurs élèves
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.25 }}
              className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center'
            >
              {[
                { name: 'Charlemagne', image: '/images/partenaire/harlemagne.png' },
                { name: 'Louis Pasteur', image: '/images/partenaire/louisPasteur.png' },
                { name: 'Salim', image: '/images/partenaire/salim.png' },
                { name: 'Essor', image: '/images/partenaire/essor.png' },
                { name: 'Bouebdelli', image: '/images/partenaire/bouebdelli.png' },
                { name: 'École Canadienne de Tunis', image: '/images/partenaire/ECT.png' },
              ].map((partner) => (
                <motion.div
                  key={partner.name}
                  variants={cardVariant}
                  className='relative overflow-hidden rounded-2xl bg-white/90 p-4 sm:p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/50 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(15,23,42,0.12)] hover:-translate-y-1'
                >
                  <div className='relative flex items-center justify-center h-20 sm:h-24 w-full'>
                    <Image
                      src={partner.image}
                      alt={`Logo ${partner.name}`}
                      width={200}
                      height={80}
                      className='object-contain max-h-full w-auto filter grayscale hover:grayscale-0 transition-all duration-300'
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Content grid */}
          <div className='mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-start'>
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
                      Objectifs pédagogiques
                    </h3>
                  </div>
                </div>
                <ul className='relative mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                  {[
                    'Comprendre les concepts fondamentaux de l’IA et du machine learning.',
                    'Développer la pensée algorithmique et la logique mathématique.',
                    'Travailler sur des mini-projets liés au programme scolaire.',
                    'Présenter un projet final devant un jury.',
                    'Améliorer la communication et la collaboration.',
                    'Renforcer les résultats STEM grâce à l’apprentissage par projet.',
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
                      Ce qui rend ce programme unique
                    </h3>
                  </div>
                </div>
                <div className='relative mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
                  {[
                    {
                      icon: Cpu,
                      text: 'Programme clé en main pour les établissements.',
                    },
                    {
                      icon: CircuitBoard,
                      text: 'Encadrement par experts IA + pédagogues.',
                    },
                    {
                      icon: BarChart3,
                      text: 'Suivi mensuel et rapports d’évolution.',
                    },
                    {
                      icon: CheckCircle2,
                      text: 'Intégration fluide dans l’emploi du temps.',
                    },
                    {
                      icon: Bot,
                      text: 'Certification officielle INOTEQIA Academy.',
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
                    Exemples de projets réalisés
                  </h3>
                  <ul className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs sm:text-sm'>
                    {[
                      'Assistant intelligent pour réviser les cours.',
                      'Mini-système de classification d’images.',
                      'Chatbot pour l’établissement.',
                      'Application anti-harcèlement scolaire.',
                      'Outil interactif STEM.',
                    ].map((item) => (
                      <li
                        key={item}
                        className='flex items-start gap-2 rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-100/90 dark:bg-slate-900/75 dark:ring-slate-700/70'
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
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                className='rounded-3xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] p-[1px] shadow-[0_18px_40px_rgba(0,145,230,0.45)]'
              >
                <div className='flex flex-col items-start gap-4 rounded-[22px] bg-white/95 px-5 py-5 text-left sm:flex-row sm:items-center sm:justify-between dark:bg-slate-950/95'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                      Pour les établissements
                    </p>
                    <p className='mt-1 text-sm font-semibold text-[#0A004B] dark:text-white'>
                      Devenir établissement partenaire
                    </p>
                  </div>
                  <button
                    type='button'
                    className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                  >
                    Devenir établissement partenaire
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 – BOOTCAMPS IA (VACANCES) */}
      <section >
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10'>
              <span className='h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
              Bootcamps IA
            </p>
            <h2 className='mt-4 text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
              Bootcamps IA — Vacances scolaires
            </h2>
            <p className='mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300'>
              Des immersions courtes, dynamiques et transformantes pour les élèves curieux,
              passionnés ou motivés par la technologie.
            </p>
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
                      Objectifs éducatifs
                    </h3>
                  </div>
                </div>
                <ul className='relative mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                  {[
                    'Identifier un problème réel.',
                    'Concevoir une solution originale.',
                    'Construire un premier prototype.',
                    'Intégrer l’IA dans leur projet.',
                    'Créer un mini-produit technologique.',
                    'Pitcher devant un jury.',
                  ].map((item) => (
                    <li
                      key={item}
                      className='flex items-start gap-2 rounded-2xl bg-slate-50/80 px-3 py-2 ring-1 ring-slate-100/80 shadow-sm shadow-slate-900/5 dark:bg-slate-900/70 dark:ring-slate-700/70'
                    >
                      <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
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
                        S’inscrire au prochain bootcamp
                      </p>
                    </div>
                  </div>
                  <button
                    type='button'
                    className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                  >
                    S’inscrire au prochain bootcamp
                  </button>
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
                    Exemples de projets
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
                        <div className='mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9]/15 via-[#0091E6]/20 to-[#0067E0]/15 text-primary dark:text-cyan-300'>
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


