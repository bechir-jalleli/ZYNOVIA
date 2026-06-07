'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { fadeInUp } from './programmesAnimations'

export default function ProgrammesHero() {
  return (
    <section className='relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-secondary/60 via-secondary/30 to-transparent dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950'>
      {/* Decorative background glow */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_center,_rgba(0,195,217,0.25),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,_rgba(0,195,217,0.35),transparent_60%)]'
      />

      {/* Animated curved shapes */}
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className='absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] blur-3xl'
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
          className='absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-[#0067E0] via-[#0091E6] to-[#00C3D9] blur-3xl'
        />
      </div>

      <div className='w-full overflow-hidden'>
        <div className='container relative z-20 pt-20 lg:pt-24 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='relative z-20 grid lg:grid-cols-12 grid-cols-1 lg:items-start items-center lg:justify-items-normal justify-items-center gap-10 lg:gap-20 pb-10'>
            {/* Colonne texte – même logique que le Hero de l'accueil */}
            <div className='lg:col-span-7 col-span-1'>
              <div className='flex flex-col lg:items-start items-center gap-6 lg:gap-8'>

                <div className='flex flex-col lg:items-start items-center gap-4 lg:gap-5'>
                  <h1 className='lg:text-start text-center w-full max-w-3xl text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white'>
                    Programme Annuel IA
                  </h1>
                  <p className='lg:text-start text-center text-sm sm:text-base font-semibold text-primary/80 dark:text-cyan-200'>
                    Un programme intégré au cœur du cursus scolaire
                  </p>

                  <motion.p
                    {...fadeInUp}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    className='lg:text-start text-center text-lg sm:text-xl lg:text-2xl font-semibold text-primary dark:text-cyan-300'
                  >

                  </motion.p>

                  <motion.p
                    {...fadeInUp}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                    className='lg:text-start text-center max-w-3xl text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed'
                  >
                    ZYNOVIA Academy propose un programme innovant, conçu en collaboration avec les équipes pédagogiques, pour moderniser l&apos;apprentissage, renforcer les matières STEM et préparer les élèves aux compétences technologiques de demain.
                  </motion.p>
                </div>

                {/* CTA buttons – calquées sur celles de l'accueil */}
                <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full max-w-2xl'>
                  <Link href='/parents'>
<button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-white border rounded-[10px] border-transparent bg-[linear-gradient(to_right,_#27397F,_#2E5391,_#4490C7,_#3FA9DF)] hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:cursor-pointer duration-300 shadow-md whitespace-nowrap'>                       👨‍👩‍👧 Je suis parent
                    </button>
                  </Link>
                  <Link href='/contact?type=etablissement#contact-form'>
                    <button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-primary border rounded-[10px] border-primary bg-white dark:bg-transparent hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:cursor-pointer duration-300 shadow-sm whitespace-nowrap'>
                      🏫 Je représente un établissement scolaire
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Colonne image – même place que le slider de la home, avec ton visuel de programme annuel */}
            <div className='lg:col-span-5 col-span-1 lg:w-full sm:w-[80%] w-full mt-6 lg:mt-0'>
              <motion.div
                {...fadeInUp}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
              >
                <div className='relative'>
                  <div className='absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#00C3D9]/25 via-[#0091E6]/20 to-[#0067E0]/25 blur-2xl' />
                  <div className='relative overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.35)] ring-1 ring-white/60 dark:ring-slate-700/80'>
                    <Image
                      src='/images/image.png'
                      alt="Élève découvrant l'intelligence artificielle avec ZYNOVIA Academy"
                      width={600}
                      height={420}
                      className='w-full object-cover'
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
