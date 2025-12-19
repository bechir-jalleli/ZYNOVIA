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
      <section className='relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-24'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.25),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.35),transparent_55%)]'
        />
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'>
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className='space-y-6'>
              <div className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10'>
                <span className='h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] animate-pulse' />
                {infrastructureIntro.title}
              </div>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A004B] dark:text-white'>
                {infrastructureIntro.title}
              </h1>
              <p className='text-lg font-semibold text-primary dark:text-cyan-300'>
                {infrastructureIntro.subtitle}
              </p>
              <p className='max-w-3xl text-base sm:text-lg text-slate-700 dark:text-slate-200'>
                {infrastructureIntro.description}
              </p>
              <div className='flex flex-wrap gap-3'>
                <span className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-slate-100 dark:ring-white/10'>
                  <ShieldCheck className='h-4 w-4 text-emerald-500' />
                  Cadre sécurisé et encadré
                </span>
                <span className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-slate-100 dark:ring-white/10'>
                  <Sparkles className='h-4 w-4 text-primary' />
                  Expérience apprenante immersive
                </span>
              </div>
              <div className='flex flex-wrap gap-3'>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/30 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'>
                  Visiter l&apos;académie
                </Link>
                <Link
                  href='/programmes'
                  className='inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#0A004B] shadow-sm backdrop-blur hover:border-primary hover:text-primary dark:bg-slate-900/70 dark:text-white'>
                  Découvrir les programmes
                </Link>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
              className='relative'>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -left-10 -top-12 h-48 w-48 rounded-full bg-gradient-to-br from-[#00C3D9]/45 via-[#0091E6]/30 to-[#0067E0]/30 blur-3xl'
              />
              <RoomGallery images={getAllRoomImages()} title="Espace professionnel d&apos;INOTEQIA Academy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* NOTRE ESPACE / EQUIPEMENTS / ACCESSIBILITÉ */}
      <section className='py-20 lg:py-28'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Espace & équipements
            </p>
            <h2 className='mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Un espace dans un environnement professionnel
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.22 }}
            className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {spaceSections.map((section, index) => {
              const Icon = sectionIcons[index] ?? Sparkles
              return (
                <motion.div
                  key={section.title}
                  variants={cardVariant}
                  className='relative overflow-hidden rounded-3xl bg-white/90 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'>
                  <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-x-6 -top-14 h-24 rounded-full bg-gradient-to-r from-[#00C3D9]/25 via-[#0091E6]/30 to-[#0067E0]/25 blur-2xl'
                  />
                  <div className='relative space-y-4'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40'>
                      <Icon className='h-6 w-6' />
                    </div>
                    <div className='space-y-2'>
                      <h3 className='text-xl font-semibold text-[#0A004B] dark:text-white'>
                        {section.title}
                      </h3>
                      <p className='text-sm text-slate-700 dark:text-slate-200'>{section.description}</p>
                    </div>
                    {section.highlights && (
                      <ul className='space-y-2 text-sm text-slate-600 dark:text-slate-200'>
                        {section.highlights.map((item) => (
                          <li key={item} className='flex items-start gap-2'>
                            <span className='mt-1 inline-block h-2 w-2 rounded-full bg-primary' />
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
      <section className='py-20 lg:py-24'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center'>
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='space-y-4'>
              <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
                Nos équipements
              </p>
              <h2 className='text-2xl sm:text-3xl font-bold text-[#0A004B] dark:text-white'>
                Des équipements professionnels pour un apprentissage efficace
              </h2>
              <p className='text-base text-slate-700 dark:text-slate-200'>
                Notre espace de coworking est équipé pour favoriser la pratique, la collaboration et
                l&apos;apprentissage dans un environnement professionnel. Les étudiants travaillent dans les mêmes
                conditions que les professionnels.
              </p>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {equipmentCategories.map((category) => (
                  <motion.div
                    key={category.title}
                    {...fadeInUp}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className='rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/85 dark:ring-slate-700/70'>
                    <h3 className='text-lg font-semibold text-[#0A004B] dark:text-white'>
                      {category.title}
                    </h3>
                    <p className='mt-1 text-sm text-slate-600 dark:text-slate-300'>{category.details}</p>
                    <ul className='mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-200'>
                      {category.items.map((item) => (
                        <li key={item} className='flex items-start gap-2'>
                          <span className='mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary' />
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
              className='relative'>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-10 -top-8 h-40 w-40 rounded-full bg-gradient-to-br from-[#00C3D9]/35 via-[#0091E6]/30 to-[#0067E0]/25 blur-3xl'
              />
              <div 
                className='relative overflow-hidden rounded-3xl bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/85 dark:ring-white/10 cursor-pointer group'
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
      <section className='py-20 lg:py-24'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Nos espaces
            </p>
            <h2 className='mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Des espaces variés pour tous les besoins
            </h2>
            <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
              Découvrez nos différents espaces conçus pour l&apos;apprentissage dans un environnement professionnel de coworking.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.2 }}
            className='mt-12 space-y-16'>
            {spaceCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={cardVariant}
                className='space-y-6'>
                <div className='space-y-2'>
                  <h3 className='text-2xl font-bold text-[#0A004B] dark:text-white'>
                    {category.title}
                  </h3>
                  <p className='text-base text-slate-700 dark:text-slate-200'>
                    {category.description}
                  </p>
                </div>
                <div
                  className={`grid gap-4 ${
                    category.images.length === 1
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
                      className='group relative overflow-hidden rounded-2xl bg-white/80 shadow-[0_14px_36px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/85 dark:ring-slate-700/70 cursor-pointer'
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
      <section className='py-20 lg:py-24'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='rounded-3xl bg-white/90 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'>
            <div className='grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center'>
              <div className='space-y-3'>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
                  Accessibilité
                </p>
                <h2 className='text-2xl font-bold text-[#0A004B] dark:text-white'>
                  {accessibility.location}
                </h2>
                <p className='text-sm text-slate-700 dark:text-slate-200'>
                  Un espace professionnel ouvert et accessible, pensé pour accueillir tous les apprenants dans les
                  meilleures conditions de confort et de sécurité.
                </p>
              </div>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                <div className='rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800/80 dark:ring-slate-700/70'>
                  <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>Accès</h3>
                  <ul className='mt-2 space-y-2 text-xs text-slate-600 dark:text-slate-300'>
                    {accessibility.access.map((item) => (
                      <li key={item} className='flex items-start gap-2'>
                        <MapPin className='mt-0.5 h-3.5 w-3.5 text-primary' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800/80 dark:ring-slate-700/70'>
                  <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>Services</h3>
                  <ul className='mt-2 space-y-2 text-xs text-slate-600 dark:text-slate-300'>
                    {accessibility.services.map((item) => (
                      <li key={item} className='flex items-start gap-2'>
                        <ShieldCheck className='mt-0.5 h-3.5 w-3.5 text-emerald-500' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 dark:bg-slate-800/80 dark:ring-slate-700/70'>
                  <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>Contact</h3>
                  <p className='mt-2 text-xs text-slate-600 dark:text-slate-300'>
                    Une question ? Contactez-nous :{' '}
                    <Link href={`mailto:${accessibility.contact}`} className='text-primary underline'>
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
      <section className='py-20 lg:py-24'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='mx-auto max-w-4xl'>
            <div className='rounded-3xl bg-gradient-to-br from-white/90 via-white/80 to-secondary/20 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/70 backdrop-blur dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950 dark:ring-slate-700/70 lg:p-12'>
              <div className='space-y-6'>
                <div className='text-center'>
                  <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
                    Notre approche
                  </p>
                  <h2 className='mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
                    Un espace qui rapproche l&apos;école du monde professionnel
                  </h2>
                </div>
                <div className='space-y-4 text-base text-slate-700 dark:text-slate-200 lg:text-lg'>
                  <p>
                    INOTEQIA Academy n&apos;est pas un campus traditionnel. Nous sommes une académie située au cœur
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
      <section className='pb-24'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>En images</p>
            <h2 className='mt-3 text-2xl sm:text-3xl font-bold text-[#0A004B] dark:text-white'>
              Découvrez nos espaces en action
            </h2>
            <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
              Des espaces partagés aux salles de formation, en passant par les salles confort et les espaces de détente.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.2 }}
            className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {galleryItems.map((item) => (
              <motion.div
                key={item.title}
                variants={cardVariant}
                className='group relative overflow-hidden rounded-2xl bg-white/80 shadow-[0_14px_36px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/85 dark:ring-slate-700/70 cursor-pointer'
                onClick={() => openLightbox(findImageIndex(item.image))}>
                <div className='relative h-64 w-full overflow-hidden'>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
                    className='object-cover transition duration-500 group-hover:scale-105'
                  />
                </div>
                <div className='p-4 space-y-1'>
                  <h3 className='text-base font-semibold text-[#0A004B] dark:text-white'>
                    {item.title}
                  </h3>
                  <p className='text-xs text-slate-600 dark:text-slate-300'>{item.description}</p>
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
        title="Galerie d'infrastructures INOTEQIA Academy"
      />
    </main>
  )
}

