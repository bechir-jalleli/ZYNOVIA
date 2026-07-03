'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fadeInUp } from './animations'
import { brochures } from './data'

export default function BrochureSection() {
  return (
    <section className='py-16 lg:py-24 bg-[#F6F8FB] dark:bg-slate-900/50'>
      <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        <motion.div {...fadeInUp} className='text-center mb-14'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
            Consultez les brochures avant de vous inscrire
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8'>
          {brochures.map((brochure, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              className='flex items-start gap-5 rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 hover:shadow-xl transition-shadow duration-300'
            >
              {/* PDF Icon */}
              <div className='flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20'>
                <Icon icon='solar:document-bold' className='w-8 h-8 text-red-500' />
                <span className='sr-only'>PDF</span>
              </div>

              <div className='flex-1'>
                <h3 className='text-base font-bold text-[#0A004B] dark:text-white mb-1.5 whitespace-pre-line leading-snug'>
                  {brochure.title}
                </h3>
                <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3'>
                  {brochure.description}
                </p>
                <button className='inline-flex items-center gap-2 text-sm font-semibold text-[#27397F] dark:text-[#3FA9DF] hover:underline transition-colors'>
                  <Icon icon='solar:download-bold' className='w-4 h-4' />
                  Télécharger la brochure
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
