'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
}

const FinalCTA = () => {
  return (
    <section className='py-24 lg:py-32 bg-gradient-soft'>
      <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6 }}
          className='text-center'
        >
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A004B] dark:text-white mb-6'>
            Prêt à préparer l&apos;avenir avec l&apos;IA ?
          </h2>
          <p className='text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed'>
            Rejoignez ZYNOVIA Academy et offrez à votre enfant ou à vos élèves les compétences essentielles pour réussir dans un monde transformé par l&apos;intelligence artificielle.
          </p>
          
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6'>
            <Link
              href='/programmes'
              className='w-full sm:w-auto px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold tracking-wide btn-primary btn-hover rounded-[10px] shadow-md whitespace-nowrap text-center'
            >
              Découvrir nos programmes
            </Link>
            <Link
              href='/contact'
              className='w-full sm:w-auto px-8 sm:px-10 py-3.5 text-sm sm:text-base btn-outline btn-hover rounded-[10px] font-semibold shadow-sm whitespace-nowrap text-center'
            >
              Parler à un conseiller
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FinalCTA


