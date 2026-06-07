'use client'

import { motion } from 'framer-motion'

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

const Specialize = () => {
  const valeurAjoutee = [
    'Culture IA dès le collège & lycée',
    'Projets pratiques & engageants',
    'Orientation vers les métiers du futur',
    'Stages & compétitions',
  ]

  return (
    <section id='expertise' className='scroll-mt-12 py-24 lg:py-32 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
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
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A004B] dark:text-white mb-4'>
              Notre Valeur Ajoutée
            </h2>
          </motion.div>

          {/* Value Items Grid */}
          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.25 }}
            className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8'
          >
            {valeurAjoutee.map((item, index) => (
              <motion.div
                key={item}
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-8 sm:p-10 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)] hover:-translate-y-1'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#27397F]/30 to-[#3FA9DF]/30 blur-3xl opacity-70 dark:opacity-80'
                />
                <div className='relative flex flex-col items-center gap-6 text-center'>
                  <div className='flex h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-md shadow-[#27397F]/40'>
                    <span className='text-3xl sm:text-4xl font-bold'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className='text-lg sm:text-xl lg:text-2xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed tracking-tight'>
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

export default Specialize
