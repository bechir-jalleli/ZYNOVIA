'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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

export default function ProgrammesContent() {
  return (
    <main className='bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* HERO SECTION – PROGRAMME ANNUEL */}
      <section className='relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-secondary/60 via-secondary/30 to-transparent dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950'>
        {/* Decorative background glow */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_center,_rgba(0,195,217,0.25),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,_rgba(0,195,217,0.35),transparent_60%)]'
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

        <div className='container relative z-20 pt-20 lg:pt-24 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full'>
          <div className='relative z-20'>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10 mb-6'
            >
              <span className='h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] animate-pulse' />
              Programme Annuel
            </motion.div>

            {/* Header */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className='max-w-4xl'
            >
              <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white mb-6'>
                Programme Annuel — Intégration IA dans le cursus scolaire
              </h1>
              <motion.p
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                className='text-lg sm:text-xl lg:text-2xl font-semibold text-primary dark:text-cyan-300 mb-6'>
                Un programme innovant intégré directement dans l&apos;année scolaire pour moderniser
                l&apos;apprentissage, renforcer les matières STEM et préparer les élèves aux compétences
                technologiques du futur.
              </motion.p>
              <motion.p
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                className='text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl'>
                INOTEQIA Academy prépare les jeunes aux compétences essentielles du futur : IA, pensée
                algorithmique, robotique, créativité et culture numérique.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section - INOTEQIA ACADEMY EN CHIFFRES */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className='mb-16'
          >
            <div className='text-center mb-6'>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white mb-12'>
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
                    <AnimatedNumber value={6} duration={1500} />
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
                    <AnimatedNumber value='+2000' duration={2000} />
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
                    <AnimatedNumber value={70} duration={1500} />
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
                    <AnimatedNumber value={281} duration={1800} />
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
                    <AnimatedNumber value={1960} duration={2200} />
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
                    <AnimatedNumber value='+50' duration={1500} />
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
          </motion.div>
        </div>
      </section>

      {/* Partners Logos / Preuve sociale Section */}
      <PartnersBanner />

      {/* FULL-SCREEN SECTION 1 – OBJECTIFS PÉDAGOGIQUES */}
      <section className='min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-24 lg:py-32'>
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
                <div className='flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-lg shadow-[#0091E6]/40'>
                  <Brain className='h-8 w-8 sm:h-10 sm:w-10' />
                </div>
              </div>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white mb-4'>
                Objectifs pédagogiques
              </h2>
              <p className='text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
                Des objectifs clairs pour une formation complète et structurée
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
                'Développer la pensée algorithmique et la logique mathématique.',
                'Travailler sur des mini-projets liés au programme scolaire.',
                'Présenter un projet final devant un jury.',
                'Améliorer la communication et la collaboration.',
                'Renforcer les résultats STEM grâce à l\'apprentissage par projet.',
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
                    <div className='flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40'>
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
      <section className='min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-transparent via-secondary/5 to-secondary/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-24 lg:py-32'>
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
                <div className='flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 text-white shadow-lg shadow-emerald-500/40'>
                  <Sparkles className='h-8 w-8 sm:h-10 sm:w-10' />
                </div>
              </div>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white mb-4'>
                Ce qui rend ce programme unique
              </h2>
              <p className='text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
                Des avantages exclusifs qui font la différence
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
                  text: 'Programme clé en main pour les établissements.',
                },
                {
                  icon: CircuitBoard,
                  text: 'Encadrement par experts IA + pédagogues.',
                },
                {
                  icon: BarChart3,
                  text: 'Suivi mensuel et rapports d\'évolution.',
                },
                {
                  icon: CheckCircle2,
                  text: 'Intégration fluide dans l\'emploi du temps.',
                },
                {
                  icon: Bot,
                  text: 'Certification officielle INOTEQIA Academy.',
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
                  <Link
                    href='/contact?type=etablissement#contact-form'
                    className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
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
                  <Link
                    href='/contact?type=parent'
                    className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
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


