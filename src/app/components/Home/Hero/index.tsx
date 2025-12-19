'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Link from 'next/link'
import { motion } from 'framer-motion'
const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' },
}


const Hero = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    cssEase: 'linear',
  }

  const slides = [
    {
      src: '/images/banner/image.png',
      alt: 'Enfants utilisant un ordinateur avec un robot IA',
    },


    {
      src: '/images/banner/katja-anokhina-_7ceGXTAtyQ-unsplash.jpg',
      alt: 'Classe avec enseignante et élèves',
    },

    {
      src: '/images/banner/img3.jpg',
      alt: 'Enfant utilisant un ordinateur',
    },
    {
      src: '/images/banner/img4.jpg',
      alt: 'Enfants apprenant sur des ordinateurs portables',
    },
  ]

  return (
    <section className='relative min-h-screen flex items-center'>
      <div className='w-full overflow-hidden'>
        <div className='container relative z-20 pt-20 lg:pt-24'>
        <div className='relative z-20 grid lg:grid-cols-12 grid-cols-1 lg:items-start items-center lg:justify-items-normal justify-items-center gap-10 lg:gap-20 pb-10'>
            <div className='lg:col-span-7 col-span-1'>
              <div className='flex flex-col lg:items-start items-center gap-8 lg:gap-12'>
                <h1 className='lg:text-start text-center w-full max-w-2xl text-3xl sm:text-4xl lg:text-5xl'>
                  L’Académie Tunisienne de l’Intelligence Artificielle et des Technologies du
                  Futur
                </h1>


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
                className='lg:text-start text-center max-w-2xl -mt-10 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed'>
                INOTEQIA Academy prépare les jeunes aux compétences essentielles du futur : IA, pensée
                algorithmique, robotique, créativité et culture numérique.
              </motion.p>

                <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full max-w-2xl'>
                  <Link href={'/parents'}>
                    <button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-white border rounded-[10px] border-transparent bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:cursor-pointer duration-300 shadow-md whitespace-nowrap'>
                      👨‍👩‍👧 Je suis parent
                    </button>
                  </Link>
                  <Link href={'/programmes'}>
                    <button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-primary border rounded-[10px] border-primary bg-white dark:bg-transparent hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:cursor-pointer duration-300 shadow-sm whitespace-nowrap'>
                      🏫 Je suis un établissement scolaire
                    </button>
                  </Link>
                  <Link href={'/entreprise'}>
                    <button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-primary border rounded-[10px] border-primary bg-white dark:bg-transparent hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:cursor-pointer duration-300 shadow-sm whitespace-nowrap'>
                      🏢 Je suis une entreprise
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* slider */}
            <div className='lg:col-span-5 col-span-1 lg:w-full sm:w-[80%] w-full mt-6 lg:mt-0'>
              <div>
                <Slider {...settings}>
                  {slides.map((item, i) => (
                    <div key={i}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={600}
                        height={420}
                        className='rounded-lg w-full object-cover'
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          {/* floting images */}
          <div className='hidden lg:block absolute top-16 -left-10  dark:opacity-10'>
            <Image
              src={'/images/banner/pattern1.svg'}
              alt='ptrn1'
              width={141}
              height={141}
            />
          </div>
          <div className='hidden lg:block absolute bottom-0 left-[53%] dark:opacity-10 z-10'>
            <Image
              src={'/images/banner/pattern2.svg'}
              alt='ptrn1'
              width={141}
              height={141}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero