'use client'

import { motion } from 'framer-motion'
import { Cpu, CircuitBoard, BarChart3, CheckCircle2, Bot } from 'lucide-react'
import { fadeInUp, staggerContainer, cardVariant } from './programmesAnimations'

export default function ProgrammesUnique() {
  return (
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
  )
}
