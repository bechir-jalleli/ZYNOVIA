'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: 'easeOut' },
}

const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-secondary/60 via-secondary/30 to-transParent dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950'>
      {/* Decorative background glow */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_center,_rgba(63,169,223,0.15),transParent_60%)] dark:bg-[radial-gradient(circle_at_center,_rgba(63,169,223,0.25),transParent_60%)]'
      />

      {/* Animated curved shapes */}
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className='absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-brand blur-3xl'
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut', delay: 0.3 }}
          className='absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-brand blur-3xl'
        />
      </div>

      <div className='container relative z-20 pt-20 lg:pt-24'>
        <div className='relative z-20 grid lg:grid-cols-12 grid-cols-1 lg:items-center items-center gap-10 lg:gap-16 pb-10'>
          {/* Left: Text & CTAs */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='lg:col-span-7 col-span-1'>
            <div className='flex flex-col lg:items-start items-center gap-6 lg:gap-8'>
              {/* Badge */}


              {/* Title */}
              <motion.h1
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                className='lg:text-start text-center w-full text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white'>

                Préparer les leaders de l&apos;ère de{' '}
                <span className='text-gradient'>
                  l&apos;Intelligence Artificielle
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                className='lg:text-start text-center text-lg sm:text-xl lg:text-2xl font-semibold text-gradient max-w-3xl'>
                L&apos;Académie  qui transforme la curiosité des jeunes en
                compétences d&apos;avenir.
              </motion.p>

              {/* Description */}
              <motion.p
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                className='lg:text-start text-center max-w-2xl text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed'>
                Chez ZYNOVIA Academy, nous accompagnons les collégiens et lycéens dans la
                maîtrise de l&apos;intelligence artificielle, de l&apos;innovation et des
                technologies émergentes afin qu&apos;ils développent les compétences, la
                confiance et la vision nécessaires pour réussir dans un monde en constante
                transformation.
              </motion.p>

              {/* Stats */}
              <motion.div
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
                className='flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-10'>
                <div>
                  <div className='text-2xl font-bold text-[#27397F] dark:text-white'>
                    +200
                  </div>
                  <div className='text-sm text-slate-600 dark:text-slate-400'>
                    Élèves accompagnés
                  </div>
                </div>

                <div>
                  <div className='text-2xl font-bold text-[#27397F] dark:text-white'>
                    95%
                  </div>
                  <div className='text-sm text-slate-600 dark:text-slate-400'>
                    Satisfaction des familles
                  </div>
                </div>

                <div>
                  <div className='text-2xl font-bold text-[#27397F] dark:text-white'>
                    IA
                  </div>
                  <div className='text-sm text-slate-600 dark:text-slate-400'>
                    Compétences du futur
                  </div>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
                className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full max-w-md lg:max-w-none'>
                <Link href={'/#project'} className='w-full sm:w-auto'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full sm:w-auto px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold tracking-wide btn-primary btn-hover rounded-full shadow-md whitespace-nowrap'>
                    <span>Découvrir les parcours</span>
                  </motion.button>
                </Link>

                <Link href={'/#contact'} className='w-full sm:w-auto'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full sm:w-auto px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold tracking-wide btn-outline btn-hover rounded-full shadow-sm whitespace-nowrap'>
                    <span>Réserver une session découverte</span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Illustration/Pattern */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className='lg:col-span-5 col-span-1 lg:w-full sm:w-[80%] w-full mt-6 lg:mt-0 relative'>
            <div className='relative'>
              {/* Main illustration container with glow */}
              <div className='relative rounded-3xl bg-white/80 p-2 lg:p-0  shadow-[0_20px_60px_rgba(15,23,42,0.15)] ring-1 ring-white/80 backdrop-blur-2xl dark:bg-slate-900/80 dark:ring-white/10 overflow-hidden'>
                {/* Animated gradient overlay */}
                <motion.div
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 30%, rgba(0,195,217,0.15), transParent 50%)',
                      'radial-gradient(circle at 70% 70%, rgba(0,145,230,0.15), transParent 50%)',
                      'radial-gradient(circle at 30% 30%, rgba(0,195,217,0.15), transParent 50%)',
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className='absolute inset-0 pointer-events-none'
                />

                <div className='relative z-10 flex items-center justify-center'>
                  <Image
                    src='/images/vision/vision.jpg'
                    alt='Vision IA'
                    width={1200}
                    height={1200}
                    priority
                    className='w-full max-w-4xl h-auto object-contain'
                  />
                </div>

                {/* Floating decorative elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className='absolute top-4 right-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#27397F]/30 to-[#3FA9DF]/30 blur-xl'
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className='absolute bottom-4 left-4 h-20 w-20 rounded-full bg-gradient-to-tr from-[#27397F]/30 to-[#3FA9DF]/30 blur-xl'
                />
              </div>

              {/* Floating pattern images */}
              <div className='hidden lg:block absolute -top-10 -left-10 dark:opacity-10 z-0'>
                <Image
                  src={'/images/banner/pattern1.svg'}
                  alt='pattern'
                  width={141}
                  height={141}
                  className='animate-pulse'
                />
              </div>
              <div className='hidden lg:block absolute -bottom-10 -right-10 dark:opacity-10 z-0'>
                <Image
                  src={'/images/banner/pattern2.svg'}
                  alt='pattern'
                  width={141}
                  height={141}
                  className='animate-pulse'
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

