'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { fadeInUp, scaleIn } from './animations'
import { cardsData } from './data'

export default function HeroSection() {
  return (
    <section className='relative min-h-[85vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-8 overflow-hidden'>
      {/* Background Decorative Elements */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#3FA9DF]/20 via-[#27397F]/10 to-transparent blur-3xl opacity-70 dark:opacity-40' />
        <div className='absolute bottom-0 left-[-200px] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#3FA9DF]/10 to-transparent blur-3xl opacity-50 dark:opacity-30' />
      </div>

      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='grid lg:grid-cols-12 gap-8 lg:gap-6 items-center'>

          {/* Text & Badges Content Column */}
          <div className='lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6'>

            <div className='space-y-4'>
              <h1 className='text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-normal text-[#0A004B] dark:text-white leading-snug tracking-tight'>
                Inscrivez votre enfant{' '}
                à une formation IA avec{' '}
                <span className='text-gradient font-semibold'>Zynovia Academy</span>
              </h1>

              <p className='text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mt-4'>
                Offrez à votre enfant l&apos;opportunité de découvrir l&apos;Intelligence Artificielle, de créer avec les outils du futur et de développer des compétences utiles pour demain.
              </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mt-1'>
              <Link href='#inscription-form' className='w-full sm:w-auto'>
                <button className='w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-brand hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] duration-300 rounded-[10px] flex items-center justify-center gap-2 group'>
                  S&apos;inscrire maintenant
                  <Icon icon='solar:alt-arrow-right-bold' className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' />
                </button>
              </Link>
              <Link href='#programmes-section' className='w-full sm:w-auto'>
                <button className='w-full px-6 py-3 text-sm font-semibold text-slate-700 dark:text-white bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-lg rounded-[10px] duration-300 flex items-center justify-center gap-2'>
                  Voir les programmes
                </button>
              </Link>
              <Link href='/' className='w-full sm:w-auto'>
                <button className='w-full px-6 py-3 text-sm font-semibold text-slate-700 dark:text-white bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-lg rounded-[10px] duration-300 flex items-center justify-center gap-2'>
                  Accueil
                </button>
              </Link>
            </div>

            {/* Highlight Badges */}
            <div className='flex flex-wrap gap-5 w-full mt-4 items-center justify-center lg:justify-start'>
              {cardsData.map((card, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className='flex items-center gap-2'
                >
                  <Icon icon={card.icon} className={`w-5 h-5 ${card.iconColor}`} />
                  <span className='font-medium text-slate-700 dark:text-slate-300 text-xs sm:text-sm whitespace-nowrap'>
                    {card.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className='lg:col-span-6 flex justify-center lg:justify-end'>
            <motion.div
              {...scaleIn}
              className='relative w-full max-w-[650px] aspect-[16/10]'
            >
              <Image
                src='/images/nos-formation/image.png'
                alt='Inscrivez votre enfant à une formation IA avec Zynovia Academy'
                fill
                sizes='(max-width: 1024px) 100vw, 650px'
                className='object-contain object-right'
                priority
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
