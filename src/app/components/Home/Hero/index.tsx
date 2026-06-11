'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const Hero = () => {
  return (
    <section className='relative min-h-screen flex items-center'>
      <div className='w-full overflow-hidden'>
        <div className='container relative z-20 pt-20 lg:pt-24'>
          <div className='relative z-20 grid lg:grid-cols-12 grid-cols-1 lg:items-start items-center lg:justify-items-normal justify-items-center gap-10 lg:gap-20 pb-10'>
            <div className='lg:col-span-7 col-span-1'>
              <div className='flex flex-col lg:items-start items-center gap-8 lg:gap-12'>
                <h1 className='lg:text-start text-center w-full max-w-2xl text-3xl sm:text-4xl lg:text-5xl'>
                  L'Académie de l'Intelligence Artificielle et des Technologies du Futur
                </h1>

                <motion.p
                  {...fadeInUp}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                  className='lg:text-start text-center text-lg sm:text-xl lg:text-2xl font-bold text-gradient'>
                  Former une génération prête à affronter l&apos;avenir avec l&apos;IA
                </motion.p>

                <motion.p
                  {...fadeInUp}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
                  className='lg:text-start text-center max-w-2xl -mt-10 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed'>
                  ZYNOVIA Academy prépare les jeunes aux compétences essentielles du futur : IA, pensée
                  algorithmique, robotique, créativité et culture numérique.
                </motion.p>

                <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full max-w-2xl'>
                  <Link href={'/parents'}>
                    <button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm sm:text-base btn-primary btn-hover rounded-[10px] shadow-md whitespace-nowrap'>
                      👨‍👩‍👧 parent
                    </button>
                  </Link>
                  <Link href={'/programmes'}>
                    <button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm sm:text-base btn-outline btn-hover rounded-[10px] font-semibold shadow-sm whitespace-nowrap'>
                      🏫 établissement scolaire
                    </button>
                  </Link>
                  <Link href={'/entreprise'}>
                    <button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm sm:text-base btn-outline btn-hover rounded-[10px] font-semibold shadow-sm whitespace-nowrap'>
                      🏢 entreprise
                    </button>
                  </Link>
                </div>
              </div>
            </div>

           {/* Hero Image */}
<div className='lg:col-span-5 col-span-1 lg:w-full sm:w-[80%] w-full mt-6 lg:mt-0'>
  <Image
    src='/images/home/hero.jpeg'
    alt='ZYNOVIA Academy - IA et Technologies du Futur'
    width={600}
    height={620}
className='rounded-lg w-full h-[380px] sm:h-[450px] lg:h-[520px] object-cover'    priority
  />
</div>
          </div>

          {/* Floating patterns */}
          <div className='hidden lg:block absolute top-16 -left-10 dark:opacity-10'>
            <Image src='/images/banner/pattern1.svg' alt='pattern 1' width={141} height={141} />
          </div>
          <div className='hidden lg:block absolute bottom-0 left-[53%] dark:opacity-10 z-10'>
            <Image src='/images/banner/pattern2.svg' alt='pattern 2' width={141} height={141} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero