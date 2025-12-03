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

      <div className='container relative z-20 pt-20 lg:pt-24'>
        <div className='relative z-20 grid lg:grid-cols-12 grid-cols-1 lg:items-center items-center gap-10 lg:gap-16 pb-10'>
          {/* Left: Text & CTAs */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='lg:col-span-7 col-span-1'>
            <div className='flex flex-col lg:items-start items-center gap-6 lg:gap-8'>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10'>
                <span className='h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] animate-pulse' />
                INOTEQIA Academy
              </motion.div>

              {/* Title */}
              <motion.h1
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                className='lg:text-start text-center w-full text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white'>
                L&apos;Académie Tunisienne de l&apos;Intelligence Artificielle et des Technologies du
                Futur
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                className='lg:text-start text-center text-lg sm:text-xl lg:text-2xl font-semibold text-primary dark:text-cyan-300'>
                Former une génération prête à affronter l&apos;avenir avec l&apos;IA
              </motion.p>

              {/* Description */}
              <motion.p
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                className='lg:text-start text-center max-w-2xl text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed'>
                INOTEQIA Academy prépare les jeunes aux compétences essentielles du futur : IA, pensée
                algorithmique, robotique, créativité et culture numérique.
              </motion.p>

              {/* Buttons */}
              <motion.div
                {...fadeInUp}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
                className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full max-w-md lg:max-w-none'>
                <Link href={'/#project'} className='w-full sm:w-auto'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full sm:w-auto px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-white border rounded-full border-primary bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] hover:shadow-lg hover:shadow-[#0091E6]/30 hover:cursor-pointer duration-300 transition-all relative overflow-hidden group'>
                    <span className='relative z-10'>Explorer</span>
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-r from-[#0067E0] via-[#0091E6] to-[#00C3D9] opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      initial={false}
                    />
                  </motion.button>
                </Link>
                <Link href={'/#contact'} className='w-full sm:w-auto'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full sm:w-auto px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-primary border rounded-full border-primary bg-white/70 dark:bg-slate-900/70 hover:bg-primary hover:text-white hover:cursor-pointer duration-300 shadow-sm backdrop-blur relative overflow-hidden group'>
                    <span className='relative z-10'>Prendre rendez-vous</span>
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                      initial={false}
                    />
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
              <div className='relative rounded-3xl bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.15)] ring-1 ring-white/80 backdrop-blur-2xl dark:bg-slate-900/80 dark:ring-white/10 overflow-hidden'>
                {/* Animated gradient overlay */}
                <motion.div
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 30%, rgba(0,195,217,0.15), transparent 50%)',
                      'radial-gradient(circle at 70% 70%, rgba(0,145,230,0.15), transparent 50%)',
                      'radial-gradient(circle at 30% 30%, rgba(0,195,217,0.15), transparent 50%)',
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className='absolute inset-0 pointer-events-none'
                />

                {/* Pixelize pattern illustration */}
                <div className='relative z-10 flex items-center justify-center h-full min-h-[400px]'>
                  <div className='grid grid-cols-4 gap-4 w-full max-w-sm'>
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.05,
                          ease: 'easeOut',
                        }}
                        className='aspect-square rounded-2xl bg-gradient-to-br from-[#00C3D9]/20 via-[#0091E6]/20 to-[#0067E0]/20 dark:from-[#00C3D9]/30 dark:via-[#0091E6]/30 dark:to-[#0067E0]/30 backdrop-blur-sm border border-primary/10 dark:border-cyan-400/20 relative overflow-hidden group'>
                        <motion.div
                          animate={{
                            background: [
                              'radial-gradient(circle, rgba(0,195,217,0.3), transparent)',
                              'radial-gradient(circle, rgba(0,145,230,0.3), transparent)',
                              'radial-gradient(circle, rgba(0,195,217,0.3), transparent)',
                            ],
                          }}
                          transition={{
                            duration: 3 + i * 0.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                        />
                        {/* Glow effect on hover */}
                        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300' />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating decorative elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className='absolute top-4 right-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#00C3D9]/30 to-[#0091E6]/30 blur-xl'
                />
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className='absolute bottom-4 left-4 h-20 w-20 rounded-full bg-gradient-to-tr from-[#0067E0]/30 to-[#0091E6]/30 blur-xl'
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

