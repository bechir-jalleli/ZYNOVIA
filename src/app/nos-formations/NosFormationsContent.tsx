'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import FormationsBootcamps from '@/app/components/Home/FormationsBootcamps'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

const cardsData = [
  {
    title: 'Certification incluse',
    icon: 'solar:verified-check-bold',
    gradient: 'from-[#00C3D9]/10 to-[#0091E6]/10',
    iconColor: 'text-[#3FA9DF]',
  },
  {
    title: 'Aucun prérequis',
    icon: 'solar:magic-stick-bold',
    gradient: 'from-[#2E5391]/10 to-[#27397F]/10',
    iconColor: 'text-[#2E5391] dark:text-[#3FA9DF]',
  },
  {
    title: 'Encadré par des ingénieurs IA',
    icon: 'solar:user-bold-duotone',
    gradient: 'from-[#4490C7]/10 to-[#3FA9DF]/10',
    iconColor: 'text-[#27397F] dark:text-[#3FA9DF]',
  },
  {
    title: 'Ateliers pratiques',
    icon: 'solar:programming-bold',
    gradient: 'from-[#0091E6]/10 to-[#0067E0]/10',
    iconColor: 'text-[#4490C7]',
  },
]

export default function NosFormationsContent() {
  return (
    <main className='bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden'>
      {/* HERO SECTION */}
      <section className='relative min-h-screen flex items-center pt-24 pb-12 lg:py-32'>
        {/* Background Decorative Elements */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
        >
          <div className='absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#3FA9DF]/20 via-[#27397F]/10 to-transparent blur-3xl opacity-70 dark:opacity-40' />
          <div className='absolute bottom-0 left-[-200px] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#3FA9DF]/10 to-transparent blur-3xl opacity-50 dark:opacity-30' />
        </div>

        <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
          <div className='grid lg:grid-cols-12 gap-12 lg:gap-16 items-center'>
            
            {/* Text & Badges Content Column */}
            <div className='lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-8'>
              
              <div className='space-y-4'>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A004B] dark:text-white leading-tight tracking-tight'>
                  Inscrivez votre enfant <br />
                  à une formation IA avec <br />
                  <span className='text-gradient'>Zynovia Academy</span>
                </h1>
                
                <p className='text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-medium mt-6'>
                  Offrez à votre enfant l&apos;opportunité de découvrir l&apos;Intelligence Artificielle, de créer avec les outils du futur et de développer des compétences utiles pour demain.
                </p>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2'>
                <Link href='/contact?profil=Parent' className='w-full sm:w-auto'>
                  <button className='w-full px-8 py-4 text-base font-semibold text-white bg-gradient-brand hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] duration-300 rounded-[12px] flex items-center justify-center gap-2 group'>
                    S&apos;inscrire maintenant
                    <Icon icon='solar:alt-arrow-right-bold' className='w-5 h-5 transition-transform duration-300 group-hover:translate-x-1' />
                  </button>
                </Link>
                <Link href='#programmes-section' className='w-full sm:w-auto'>
                  <button className='w-full px-8 py-4 text-base font-semibold text-slate-700 dark:text-white bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-lg rounded-[12px] duration-300 flex items-center justify-center gap-2'>
                    Voir les programmes
                  </button>
                </Link>
              </div>

              {/* Highlight Badges Inline flex line */}
              <div className='flex flex-wrap gap-3.5 w-full mt-6 items-center justify-center lg:justify-start'>
                {cardsData.map((card, idx) => (
                  <motion.div
                    key={idx}
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className='flex items-center gap-2.5 px-4.5 py-3 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 backdrop-blur-md hover:shadow-md transition-shadow duration-300'
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${card.gradient} ${card.iconColor} flex-shrink-0`}>
                      <Icon icon={card.icon} className='w-4.5 h-4.5' />
                    </div>
                    <span className='font-bold text-slate-800 dark:text-white text-xs sm:text-sm whitespace-nowrap'>
                      {card.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image Column */}
            <div className='lg:col-span-5 flex justify-center'>
              <motion.div
                {...scaleIn}
                className='relative w-full max-w-[450px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_24px_50px_rgba(39,57,127,0.25)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.4)] border border-white/40 dark:border-white/10'
              >
                <div className='absolute inset-0 bg-gradient-to-t from-[#0A004B]/60 via-transparent to-transparent z-10' />
                <Image
                  src='/images/parent/image.png'
                  alt='Inscrivez votre enfant à une formation IA avec Zynovia Academy'
                  fill
                  sizes='(max-width: 1024px) 100vw, 450px'
                  className='object-cover'
                  priority
                />
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* DETAILED FORMATIONS LIST */}
      <div id='programmes-section'>
        <FormationsBootcamps />
      </div>
    </main>
  )
}
