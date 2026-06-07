'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { accessibility, equipmentCategories, galleryItems, getAllRoomImages, infrastructureIntro, spaceCategories, spaceSections } from '@/data/infrastructure'
import { Building2, Cpu, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import RoomGallery from '@/app/components/Infrastructure/RoomGallery'
import ImageLightbox from '@/app/components/Infrastructure/ImageLightbox'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariant = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
}

const sectionIcons = [Building2, Cpu, MapPin]

export default function NosInfrastructuresContent() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)


  // Collect all images from different sections
  const allImages = useMemo(() => {
    const images: string[] = []

    // Add RoomGallery images
    images.push(...getAllRoomImages())

    // Add equipment section image
    images.push('/images/infrastructures/gallery/gallery-04.jpg')

    // Add space category images
    spaceCategories.forEach((category) => {
      images.push(...category.images)
    })

    // Add gallery items images
    galleryItems.forEach((item) => {
      images.push(item.image)
    })

    return images
  }, [])

  const openLightbox = (index: number) => {
    if (index >= 0 && index < allImages.length) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  // Helper function to find image index in allImages array
  const findImageIndex = (imagePath: string): number => {
    const index = allImages.findIndex((img) => img === imagePath)
    return index >= 0 ? index : 0 // Default to 0 if not found
  }

  return (
    <main className='bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* HERO */}
      <section className='relative overflow-hidden pt-32 pb-10 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-24'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-60 sm:h-80'
          style={{ background: 'radial-gradient(circle at top, rgba(68,144,199,0.25), transparent 55%)' }}
        />
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative'>
          <div className='grid items-center gap-10 sm:gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className='flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 sm:space-y-5 lg:space-y-6 min-w-0 w-full'>
              <div
                className='inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 sm:bg-white/80 sm:px-4 sm:py-1 text-[11px] sm:text-[11px] font-bold sm:font-semibold uppercase tracking-[0.25em] shadow-sm ring-1 ring-slate-200/50 sm:ring-white/80 backdrop-blur dark:bg-slate-900/90 dark:ring-white/10 max-w-full overflow-hidden'
                style={{ color: '#27397F' }}>
                <span className='h-2 w-2 rounded-full animate-pulse flex-shrink-0' style={{ background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)' }} />
                <span className='truncate'>{infrastructureIntro.title}</span>
              </div>
              <h1 className='text-[2rem] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold sm:font-bold text-[#0A004B] dark:text-white'>
                {infrastructureIntro.title}
              </h1>
              <p className='text-lg leading-snug sm:text-lg sm:leading-inherit font-bold sm:font-semibold' style={{ background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {infrastructureIntro.subtitle}
              </p>
              <p className='max-w-3xl text-[15px] leading-relaxed sm:text-base lg:text-lg text-slate-700 dark:text-slate-200'>
                {infrastructureIntro.description}
              </p>
              <div className='grid grid-cols-1 w-full gap-2.5 sm:flex sm:flex-wrap sm:w-auto sm:items-center sm:justify-center lg:justify-start sm:gap-3'>
                <span className='flex items-center justify-center gap-2.5 rounded-xl bg-white/90 px-4 py-3.5 sm:rounded-full sm:bg-white/80 sm:px-4 sm:py-2 text-[13px] sm:text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/90 dark:text-slate-100 dark:ring-white/10'>
                  <ShieldCheck className='h-4 w-4 text-emerald-500 flex-shrink-0' />
                  <span className='truncate'>Cadre sécurisé et encadré</span>
                </span>
                <span className='flex items-center justify-center gap-2.5 rounded-xl bg-white/90 px-4 py-3.5 sm:rounded-full sm:bg-white/80 sm:px-4 sm:py-2 text-[13px] sm:text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/90 dark:text-slate-100 dark:ring-white/10'>
                  <Sparkles className='h-4 w-4 flex-shrink-0' style={{ color: '#4490C7' }} />
                  <span className='truncate'>Expérience apprenante immersive</span>
                </span>
              </div>
              <div className='flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 w-full pt-2 sm:pt-0'>
                <Link
                  href='/contact'
                  className='inline-flex h-12 sm:h-auto items-center justify-center rounded-xl px-5 py-2.5 sm:px-6 text-[15px] sm:text-sm font-bold sm:font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 w-full sm:w-auto overflow-hidden'
                  style={{ background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)', boxShadow: '0 8px 24px -6px rgba(46,83,145,0.40)' }}>
                  <span className='truncate'>Visiter l&apos;académie</span>
                </Link>
                <Link
                  href='/programmes'
                  className='inline-flex h-12 sm:h-auto items-center justify-center gap-2 rounded-xl border bg-white sm:bg-white/80 px-5 py-2.5 text-[15px] sm:text-sm font-bold sm:font-semibold text-[#0A004B] shadow-sm backdrop-blur dark:bg-slate-900/70 dark:text-white dark:border-slate-800 w-full sm:w-auto overflow-hidden'
                  style={{ borderColor: 'rgba(39,57,127,0.25)' }}>
                  <span className='truncate'>Découvrir les programmes</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
              className='relative mt-2 sm:mt-6 lg:mt-0 min-w-0 w-full'>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -left-5 -top-8 sm:-left-10 sm:-top-12 h-32 w-32 sm:h-48 sm:w-48 rounded-full blur-3xl'
                style={{ background: 'linear-gradient(to bottom right, rgba(68,144,199,0.45), rgba(46,83,145,0.30), rgba(39,57,127,0.30))' }}
              />
              <RoomGallery images={getAllRoomImages()} title="Espace professionnel d&apos;ZYNOVIA Academy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* NOTRE ESPACE / EQUIPEMENTS / ACCESSIBILITÉ */}
      <section className='py-12 sm:py-16 lg:py-20 xl:py-28'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center'>
            <p className='text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em]' style={{ background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Espace & équipements
            </p>
            <h2 className='mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Un espace dans un environnement professionnel
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.22 }}
            className='mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {spaceSections.map((section, index) => {
              const Icon = sectionIcons[index] ?? Sparkles
              return (
                <motion.div
                  key={section.title}
                  variants={cardVariant}
                  className='relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/90 p-4 sm:p-5 lg:p-6 shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'>
                  <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-x-4 sm:inset-x-6 -top-10 sm:-top-14 h-20 sm:h-24 rounded-full blur-2xl'
                    style={{ background: 'linear-gradient(to right, rgba(39,57,127,0.25), rgba(68,144,199,0.30), rgba(63,169,223,0.25))' }}
                  />
                  <div className='relative space-y-3 sm:space-y-4'>
                    <div className='flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl text-white shadow-md' style={{ background: 'linear-gradient(to bottom right, #27397F, #2E5391, #4490C7, #3FA9DF)', boxShadow: '0 4px 12px rgba(46,83,145,0.40)' }}>
                      <Icon className='h-5 w-5 sm:h-6 sm:w-6' />
                    </div>
                    <div className='space-y-1.5 sm:space-y-2'>
                      <h3 className='text-lg sm:text-xl font-semibold text-[#0A004B] dark:text-white'>
                        {section.title}
                      </h3>
                      <p className='text-xs sm:text-sm text-slate-700 dark:text-slate-200'>{section.description}</p>
                    </div>
                    {section.highlights && (
                      <ul className='space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-200'>
                        {section.highlights.map((item) => (
                          <li key={item} className='flex items-start gap-2'>
                            <span className='mt-1 inline-block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full flex-shrink-0' style={{ background: '#4490C7' }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* EQUIPEMENTS */}
      <section className='py-12 sm:py-16 lg:py-20 xl:py-24'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center'>
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='space-y-3 sm:space-y-4'>
              <p className='text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em]' style={{ background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Nos équipements
              </p>
              <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-[#0A004B] dark:text-white'>
                Des équipements professionnels pour un apprentissage efficace
              </h2>
              <p className='text-sm sm:text-base text-slate-700 dark:text-slate-200'>
                Notre espace de coworking est équipé pour favoriser la pratique, la collaboration et
                l&apos;apprentissage dans un environnement professionnel. Les étudiants travaillent dans les mêmes
                conditions que les professionnels.
              </p>
              <div className='grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2'>
                {equipmentCategories.map((category) => (
                  <motion.div
                    key={category.title}
                    {...fadeInUp}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className='rounded-xl sm:rounded-2xl bg-white/90 p-3 sm:p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/85 dark:ring-slate-700/70'>
                    <h3 className='text-base sm:text-lg font-semibold text-[#0A004B] dark:text-white'>
                      {category.title}
                    </h3>
                    <p className='mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300'>{category.details}</p>
                    <ul className='mt-2 sm:mt-3 space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-200'>
                      {category.items.map((item) => (
                        <li key={item} className='flex items-start gap-2'>
                          <span className='mt-1 inline-block h-1.5 w-1.5 rounded-full flex-shrink-0' style={{ background: '#4490C7' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.12 }}
              className='relative mt-6 lg:mt-0'>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-5 -top-6 sm:-right-10 sm:-top-8 h-32 w-32 sm:h-40 sm:w-40 rounded-full blur-3xl'
                style={{ background: 'linear-gradient(to bottom right, rgba(68,144,199,0.35), rgba(46,83,145,0.30), rgba(39,57,127,0.25))' }}
              />
              <div
                className='relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/85 dark:ring-white/10 cursor-pointer group'
                onClick={() => openLightbox(findImageIndex('/images/infrastructures/gallery/gallery-04.jpg'))}>
                <Image
                  src='/images/infrastructures/gallery/gallery-04.jpg'
                  alt='Salle de formation équipée'
                  width={1100}
                  height={820}
                  className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ESPACES PAR CATÉGORIE */}
      <section className='py-12 sm:py-16 lg:py-20 xl:py-24'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center'>
            <p className='text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em]' style={{ background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Nos espaces
            </p>
            <h2 className='mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Des espaces variés pour tous les besoins
            </h2>
            <p className='mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300'>
              Découvrez nos différents espaces conçus pour l&apos;apprentissage dans un environnement professionnel de coworking.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.2 }}
            className='mt-8 sm:mt-10 lg:mt-12 space-y-10 sm:space-y-12 lg:space-y-16'>
            {spaceCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={cardVariant}
                className='space-y-4 sm:space-y-5 lg:space-y-6'>
                <div className='space-y-1.5 sm:space-y-2'>
                  <h3 className='text-xl sm:text-2xl font-bold text-[#0A004B] dark:text-white'>
                    {category.title}
                  </h3>
                  <p className='text-sm sm:text-base text-slate-700 dark:text-slate-200'>
                    {category.description}
                  </p>
                </div>
                <div
                  className={`grid gap-3 sm:gap-4 ${category.images.length === 1
                    ? 'grid-cols-1 max-w-2xl'
                    : category.images.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : category.images.length === 3
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                    }`}>
                  {category.images.map((image, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariant}
                      className='group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/80 shadow-[0_14px_36px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/85 dark:ring-slate-700/70 cursor-pointer'
                      onClick={() => openLightbox(findImageIndex(image))}>
                      <div className='relative aspect-[4/3] w-full overflow-hidden'>
                        <Image
                          src={image}
                          alt={`${category.title} - Image ${index + 1}`}
                          fill
                          sizes='(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'
                          className='object-cover transition duration-500 group-hover:scale-105'
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ACCESSIBILITÉ */}
      <section className='py-12 sm:py-16 lg:py-20 xl:py-24'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='rounded-2xl sm:rounded-3xl bg-white/90 p-5 sm:p-6 lg:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'>
            <div className='grid gap-6 sm:gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center'>
              <div className='space-y-2 sm:space-y-3'>
                <p className='text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em]' style={{ background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Accessibilité
                </p>
                <h2 className='text-xl sm:text-2xl font-bold text-[#0A004B] dark:text-white'>
                  {accessibility.location}
                </h2>
                <p className='text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                  Un espace professionnel ouvert et accessible, pensé pour accueillir tous les apprenants dans les
                  meilleures conditions de confort et de sécurité.
                </p>
              </div>
              <div className='grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3'>
                <div className='rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800/80 dark:ring-slate-700/70'>
                  <h3 className='text-xs sm:text-sm font-semibold text-[#0A004B] dark:text-white'>Accès</h3>
                  <ul className='mt-1.5 sm:mt-2 space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-slate-600 dark:text-slate-300'>
                    {accessibility.access.map((item) => (
                      <li key={item} className='flex items-start gap-1.5 sm:gap-2'>
                        <MapPin className='mt-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0' style={{ color: '#4490C7' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800/80 dark:ring-slate-700/70'>
                  <h3 className='text-xs sm:text-sm font-semibold text-[#0A004B] dark:text-white'>Services</h3>
                  <ul className='mt-1.5 sm:mt-2 space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-slate-600 dark:text-slate-300'>
                    {accessibility.services.map((item) => (
                      <li key={item} className='flex items-start gap-1.5 sm:gap-2'>
                        <ShieldCheck className='mt-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500 flex-shrink-0' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800/80 dark:ring-slate-700/70'>
                  <h3 className='text-xs sm:text-sm font-semibold text-[#0A004B] dark:text-white'>Contact</h3>
                  <p className='mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-slate-600 dark:text-slate-300'>
                    Une question ? Contactez-nous :{' '}
                    <Link href={`mailto:${accessibility.contact}`} className='underline break-all' style={{ color: '#4490C7' }}>
                      {accessibility.contact}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* UN ESPACE QUI RAPPROCHE L'ÉCOLE DU MONDE PROFESSIONNEL */}
      <section className='py-12 sm:py-16 lg:py-20 xl:py-24'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='mx-auto max-w-4xl'>
            <div className='rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/90 via-white/80 to-secondary/20 p-5 sm:p-6 lg:p-8 xl:p-12 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70 backdrop-blur dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950 dark:ring-slate-700/70'>
              <div className='space-y-4 sm:space-y-5 lg:space-y-6'>
                <div className='text-center'>
                  <p className='text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em]' style={{ color: '#27397F' }}>
                    Notre approche
                  </p>
                  <h2 className='mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
                    Un espace qui rapproche l&apos;école du monde professionnel
                  </h2>
                </div>
                <div className='space-y-3 sm:space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200 lg:text-lg'>
                  <p>
                    ZYNOVIA Academy n&apos;est pas un campus traditionnel. Nous sommes une académie située au cœur
                    d&apos;un environnement de coworking professionnel. Cette configuration unique permet aux étudiants
                    d&apos;apprendre dans un espace de travail réel, similaire à celui des entreprises.
                  </p>
                  <p>
                    Nos formateurs se déplacent également dans les écoles pour dispenser les cours, créant ainsi
                    un pont entre l&apos;éducation formelle et le monde professionnel. Les étudiants peuvent également
                    venir à l&apos;académie pour découvrir un véritable espace de travail et effectuer des stages de
                    courte durée.
                  </p>
                  <p>
                    Cette approche permet aux apprenants de vivre une expérience authentique du monde professionnel
                    tout en bénéficiant d&apos;un encadrement pédagogique adapté. Ils côtoient des professionnels,
                    découvrent les réalités du travail en entreprise et développent leurs compétences dans un
                    environnement stimulant et professionnel.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALERIE */}
      <section className='pb-12 sm:pb-16 lg:pb-20 xl:pb-24'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center'>
            <p className='text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em]' style={{ color: '#27397F' }}>En images</p>
            <h2 className='mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl font-bold text-[#0A004B] dark:text-white'>
              Découvrez nos espaces en action
            </h2>
            <p className='mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300'>
              Des espaces partagés aux salles de formation, en passant par les salles confort et les espaces de détente.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.2 }}
            className='mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {galleryItems.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariant}
                className='group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/80 shadow-[0_14px_36px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/85 dark:ring-slate-700/70 cursor-pointer'
                onClick={() => openLightbox(findImageIndex(item.image))}>
                <div className='relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                    className='object-cover transition duration-500 group-hover:scale-105'
                  />
                </div>
                <div className='p-3 sm:p-4 space-y-1'>
                  <h3 className='text-sm sm:text-base font-semibold text-[#0A004B] dark:text-white'>
                    {item.title}
                  </h3>
                  <p className='text-[10px] sm:text-xs text-slate-600 dark:text-slate-300'>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        title="Galerie d'infrastructures ZYNOVIA Academy"
      />
    </main>
  )
}

