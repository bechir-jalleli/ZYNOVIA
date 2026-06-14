'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, cardVariant } from './programmesAnimations'

export default function ProgrammesObjectives() {
  return (
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
  )
}
