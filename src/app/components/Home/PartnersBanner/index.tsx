'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedNumber from '../../AnimatedNumber'

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
    <section className='relative py-16 sm:py-20 bg-secondary/30 dark:bg-darklight/50 overflow-hidden'>
      {/* Subtle background glow */}
      <div className='pointer-events-none absolute inset-0 opacity-40 dark:opacity-60'>
        <div className='absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#3FA9DF]/20 blur-3xl' />
      </div>

      <div className='container relative mx-auto max-w-7xl px-4 sm:px-6'>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 sm:mb-16'>
          <p className='text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-gradient mb-3'>
            Preuve sociale
          </p>
          <h3 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-darkblue dark:text-white mb-4'>
            Établissements qui nous font confiance
          </h3>
          <div className='mt-6 mb-8 flex flex-col items-center gap-4'>
            <p className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient'>
              <AnimatedNumber value='+2000' className='mr-2 inline-block font-black' />
              élèves formés
            </p>
            <Link
              href='/Parents#appointment-form'
              className='inline-flex items-center justify-center rounded-xl btn-primary btn-hover px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#27397F]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
            >
              Réserver une session découverte
            </Link>
          </div>
        </motion.div>

        {/* Logos Marquee (horizontal, auto-scrolling, no hover animation) */}
        <div className='relative mt-2 overflow-hidden'>
          <motion.div
            className='flex gap-6 sm:gap-10 lg:gap-12'
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 24,
                ease: 'linear',
              },
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className='flex min-w-[160px] max-w-[220px] flex-1 items-center justify-center rounded-xl sm:rounded-2xl border border-slate-100/80 bg-white/90 p-4 text-center shadow-sm backdrop-blur-sm dark:border-slate-700/70 dark:bg-lightdarkblue/90'
              >
                <div className='relative flex h-16 w-full items-center justify-center sm:h-20 lg:h-24'>
                  <Image
                    src={partner.image}
                    alt={`Logo ${partner.name}`}
                    width={160}
                    height={80}
                    className='h-full w-full object-contain opacity-80'
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      filter: 'grayscale(40%)',
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='mt-12 sm:mt-16 max-w-3xl mx-auto text-center'
        >
          <div className='relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/90 sm:p-8'>
            <div className='pointer-events-none absolute -top-10 left-10 h-24 w-24 rounded-full bg-[#3FA9DF]/10 blur-2xl' />
            <div className='pointer-events-none absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-[#27397F]/10 blur-2xl' />

            <div className='mb-3 flex items-center justify-center gap-3'>
              <span className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-soft text-2xl text-[#27397F] dark:text-[#3FA9DF]'>
                “
              </span>
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-gradient'>
                Témoignage partenaire
              </p>
            </div>

            <p className='text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed italic mb-4'>
              &quot;ZYNOVIA Academy a transformé notre approche de l&apos;enseignement de l&apos;IA. Nos élèves sont
              maintenant mieux préparés aux défis de demain.&quot;
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

