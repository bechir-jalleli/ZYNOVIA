'use client'

import { motion } from 'framer-motion'
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
      staggerChildren: 0.1,
    },
  },
}

const cardVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
}

const PourQui = () => {
  const cibles = [
    {
      emoji: '👨‍👩‍👧',
      titre: 'Parents',
      description: 'Accompagner votre enfant vers les métiers de demain grâce à l\'IA',
      cta: 'Découvrir le parcours élève',
      href: '/parents',
    },
    {
      emoji: '🏫',
      titre: 'Établissements scolaires',
      description: 'Intégrer l\'IA dans le cursus scolaire avec un programme clé en main',
      cta: 'Devenir établissement partenaire',
      href: '/partenariats',
    },
    {
      emoji: '🏢',
      titre: 'Entreprises',
      description: 'Offrir un avenir meilleur aux enfants de vos employés grâce à l’IA',
      cta: 'Explorer les partenariats',
      href: '/partenariats',
    },
  ]

  return (
    <section className='py-24 lg:py-32 bg-gradient-to-b from-transparent via-secondary/5 to-secondary/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
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
            <p className='text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary/80 mb-3'>
              Pour qui ?
            </p>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A004B] dark:text-white mb-4'>
              INOTEQIA Academy s&apos;adresse à
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.25 }}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8'
          >
            {cibles.map((cible) => (
              <motion.div
                key={cible.titre}
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-8 sm:p-10 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)] hover:-translate-y-1 flex flex-col'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-70 dark:opacity-80'
                />
                <div className='relative flex flex-col items-center text-center gap-6 flex-grow'>
                  <div className='text-5xl sm:text-6xl mb-2'>
                    {cible.emoji}
                  </div>
                  <h3 className='text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100'>
                    {cible.titre}
                  </h3>
                  <p className='text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed flex-grow'>
                    {cible.description}
                  </p>
                  <Link
                    href={cible.href}
                    className='mt-auto w-full px-6 py-3 text-sm sm:text-base font-semibold tracking-wide text-white border rounded-[10px] border-transparent bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:cursor-pointer duration-300 shadow-md text-center'
                  >
                    {cible.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default PourQui


