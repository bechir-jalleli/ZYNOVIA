'use client'

import { motion } from 'framer-motion'
import {
  Building2,
  Users,
  Clock,
  Calendar,
  GraduationCap,
  FolderKanban,
} from 'lucide-react'
import AnimatedNumber from '@/app/components/AnimatedNumber'
import { fadeInUp, staggerContainer, cardVariant } from './programmesAnimations'

export default function ProgrammesStats() {
  return (
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
                <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] text-white shadow-md shadow-[#27397F]/40 mb-4'>                   <Building2 className='h-7 w-7' />
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
  )
}
