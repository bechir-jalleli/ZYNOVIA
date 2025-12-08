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
            Nos partenaires
          </p>
          <h3 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-darkblue dark:text-white'>
            Établissements qui nous font confiance
          </h3>
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
      </div>
    </section>
  )
}

export default PartnersBanner

