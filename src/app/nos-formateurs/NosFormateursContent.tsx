'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { trainers, trainerTestimonials } from '@/data/trainers'
import { Sparkles, GraduationCap, Quote, Linkedin, Star } from 'lucide-react'

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

export default function NosFormateursContent() {
  return (
    <main className='bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* HERO */}
      <section className='relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-24'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.25),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.35),transparent_55%)]'
        />
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className='space-y-6'>
              <div className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10'>
                <span className='h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] animate-pulse' />
                Nos Formateurs
              </div>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A004B] dark:text-white'>
                Nos Formateurs
              </h1>
              <p className='text-lg font-semibold text-primary dark:text-cyan-300'>
                Une équipe d&apos;experts passionnés
              </p>
              <p className='max-w-3xl text-base sm:text-lg text-slate-700 dark:text-slate-200'>
                Des spécialistes de l’IA, du développement, de la robotique et du produit. Ils
                conçoivent des parcours pratiques, coachent les apprenants et les aident à transformer
                leurs idées en projets concrets.
              </p>
              <div className='flex flex-wrap gap-3'>
                <span className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-slate-100 dark:ring-white/10'>
                  <Sparkles className='h-4 w-4 text-primary' />
                  Mentorat personnalisé
                </span>
                <span className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-slate-100 dark:ring-white/10'>
                  <GraduationCap className='h-4 w-4 text-emerald-500' />
                  Expertise terrain
                </span>
              </div>
              <div className='flex flex-wrap gap-3'>
                <Link
                  href='/programmes'
                  className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/30 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'>
                  Découvrir les parcours
                </Link>
                <Link
                  href='/contact'
                  className='inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#0A004B] shadow-sm backdrop-blur hover:border-primary hover:text-primary dark:bg-slate-900/70 dark:text-white'>
                  Parler à un formateur
                </Link>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
              className='relative'>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-12 -top-10 h-48 w-48 rounded-full bg-gradient-to-br from-[#00C3D9]/45 via-[#0091E6]/30 to-[#0067E0]/25 blur-3xl'
              />
              <div className='relative overflow-hidden rounded-3xl bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/85 dark:ring-white/10'>
                <Image
                  src='/images/review/marcus.webp'
                  alt='Formateurs en session'
                  width={1100}
                  height={820}
                  className='h-full w-full object-cover'
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRAINER GRID */}
      <section className='py-20 lg:py-24'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>Notre équipe</p>
            <h2 className='mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Des mentors engagés pour chaque apprenant
            </h2>
            <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
              Coaching, revues de sprint et retours individualisés pour progresser vite.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.2 }}
            className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {trainers.map((trainer) => (
              <motion.div
                key={trainer.id}
                variants={cardVariant}
                className='relative overflow-hidden rounded-2xl bg-white/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'>
                <div className='flex items-center gap-4'>
                  <div className='relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-primary/40 bg-slate-200 dark:bg-slate-700'>
                    <Image
                      src={trainer.photo || '/images/default-avatar.png'}
                      alt={trainer.name}
                      fill
                      sizes='64px'
                      className='object-cover'
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/images/default-avatar.png'
                      }}
                    />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-[#0A004B] dark:text-white'>{trainer.name}</h3>
                    <p className='text-sm text-primary dark:text-cyan-300'>{trainer.title}</p>
                  </div>
                </div>
                <p className='mt-4 text-sm text-slate-600 dark:text-slate-200'>{trainer.bio}</p>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {trainer.expertise.map((item) => (
                    <span
                      key={item}
                      className='rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'>
                      {item}
                    </span>
                  ))}
                </div>
                {trainer.linkedin && (
                  <Link
                    href={trainer.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 dark:text-cyan-300'>
                    <Linkedin className='h-4 w-4' />
                    Voir le profil
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className='pb-24'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Témoignages apprenants
            </p>
            <h2 className='mt-3 text-2xl sm:text-3xl font-bold text-[#0A004B] dark:text-white'>
              Ils parlent de leurs formateurs
            </h2>
            <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
              Retour d&apos;expérience sur le mentorat, les sprints et les démos finales.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.2 }}
            className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2'>
            {trainerTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.quote}
                variants={cardVariant}
                className='relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'>
                <div className='flex items-center gap-2 text-primary'>
                  <Quote className='h-5 w-5' />
                  <span className='text-xs font-semibold uppercase tracking-[0.2em]'>Feedback</span>
                </div>
                <p className='mt-3 text-sm text-slate-700 dark:text-slate-200'>{testimonial.quote}</p>
                <div className='mt-4 flex items-center justify-between text-sm font-semibold text-[#0A004B] dark:text-white'>
                  <div>
                    <p>{testimonial.student}</p>
                    <p className='text-xs text-primary dark:text-cyan-300'>{testimonial.focus}</p>
                  </div>
                  <div className='flex items-center gap-1 text-amber-500'>
                    <Star className='h-4 w-4 fill-amber-400' />
                    <Star className='h-4 w-4 fill-amber-400' />
                    <Star className='h-4 w-4 fill-amber-400' />
                    <Star className='h-4 w-4 fill-amber-400' />
                    <Star className='h-4 w-4 fill-amber-400' />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

