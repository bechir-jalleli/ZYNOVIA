'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const partners = [
  { name: 'Charlemagne', image: '/images/partenaire/harlemagne.png' },
  { name: 'Louis Pasteur', image: '/images/partenaire/louisPasteur.png' },
  { name: 'Salim', image: '/images/partenaire/salim.png' },
  { name: 'Essor', image: '/images/partenaire/essor.png' },
  { name: 'Bouebdelli', image: '/images/partenaire/bouebdelli.png' },
  { name: 'École Canadienne de Tunis', image: '/images/partenaire/ECT.png' },
]

const PartnersBanner = () => {
  return (
    <section className='py-16 sm:py-20 bg-secondary/30 dark:bg-darklight/50 overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6'>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 sm:mb-16'>
          <p className='text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary dark:text-cyan-300 mb-3'>
            Preuve sociale
          </p>
          <h3 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-darkblue dark:text-white mb-4'>
            Établissements qui nous font confiance
          </h3>
          <div className='mt-6 mb-8'>
            <p className='text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent'>
              +200 élèves formés
            </p>
          </div>
        </motion.div>

        {/* Logos Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10'>
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='flex items-center justify-center p-4 sm:p-6 bg-white dark:bg-lightdarkblue rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group'>
              <div className='relative w-full h-16 sm:h-20 lg:h-24 flex items-center justify-center'>
                <Image
                  src={partner.image}
                  alt={`Logo ${partner.name}`}
                  width={160}
                  height={80}
                  className='object-contain w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-300'
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%',
                    filter: 'grayscale(20%)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='mt-12 sm:mt-16 max-w-3xl mx-auto text-center'
        >
          <div className='bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50'>
            <p className='text-base sm:text-lg text-slate-700 dark:text-slate-300 italic leading-relaxed mb-4'>
              &quot;INOTEQIA Academy a transformé notre approche de l&apos;enseignement de l&apos;IA. Nos élèves sont maintenant mieux préparés aux défis de demain.&quot;
            </p>
            <p className='text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200'>
              — Directeur d&apos;établissement partenaire
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PartnersBanner

