'use client';

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trainer, TrainerTestimonial } from '@/data/trainers'
import { Sparkles, GraduationCap, Quote, Linkedin, Star, RefreshCw, AlertTriangle, CheckCircle2, Bug } from 'lucide-react'

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
}

const cardVariant = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type TrainerFromAPI = Trainer & { _id?: string }
type TestimonialFromAPI = TrainerTestimonial & { _id?: string }

type DebugInfo = {
  source: 'db' | 'static-fallback' | null
  durationMs?: number
  trainersCount?: number
  testimonialsCount?: number
  timestamp?: string
  error?: string
  httpStatus?: number
  fetchError?: string
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function TrainerPhoto({ photo, name }: { photo?: string; name: string }) {
  const [error, setError] = useState(false)

  if (!photo || error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-200 dark:bg-slate-700">
        <GraduationCap className="h-7 w-7 text-slate-400" />
      </div>
    )
  }

  return (
    <Image
      src={photo}
      alt={name}
      fill
      sizes="64px"
      className="object-cover"
      onError={() => setError(true)}
    />
  )
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default function NosFormateursContent() {
  const [trainersList, setTrainersList] = useState<TrainerFromAPI[]>([])
  const [testimonialsList, setTestimonialsList] = useState<TestimonialFromAPI[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [debug, setDebug] = useState<DebugInfo>({ source: null })

  const fetchData = useCallback(async () => {
    console.log(`[NosFormateurs] fetchData called (retry: ${retryCount})`)
    setLoading(true)
    setFetchError(null)

    try {
      const res = await fetch('/api/data', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      })

      console.log(`[NosFormateurs] Response status: ${res.status}`)

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`)
      }

      const data = await res.json()

      console.log('[NosFormateurs] Raw API data._debug:', data._debug)
      console.log('[NosFormateurs] TrainerData length:', data.TrainerData?.length)
      console.log('[NosFormateurs] TrainerTestimonialData length:', data.TrainerTestimonialData?.length)

      setDebug({
        ...(data._debug ?? {}),
        httpStatus: res.status,
        source: data._debug?.source ?? 'db',
      })

      const trainers: TrainerFromAPI[] = data.TrainerData ?? []
      const testimonials: TestimonialFromAPI[] = data.TrainerTestimonialData ?? []

      if (trainers.length === 0) {
        console.warn('[NosFormateurs] TrainerData is empty — DB may not have seeded yet')
      }

      setTrainersList(trainers)
      setTestimonialsList(testimonials)
    } catch (err: any) {
      const msg = err?.message ?? 'Unknown error'
      console.error('[NosFormateurs] Fetch error:', msg)
      setFetchError(msg)
      setDebug((prev) => ({ ...prev, fetchError: msg }))
    } finally {
      setLoading(false)
    }
  }, [retryCount])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Stable keys
  const trainerKey = (t: TrainerFromAPI, i: number) => t.id || t._id || `trainer-${i}`
  const testimonialKey = (t: TestimonialFromAPI, i: number) => t._id || `testimonial-${i}`

  return (
    <main className='bg-gradient-to-b from-secondary/20 via-secondary/5 to-transParent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>

      {/* HERO */}
      <section className='relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-24'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-80'
          style={{
            background: 'radial-gradient(circle at top, rgba(68,144,199,0.25), transParent 55%)',
          }}
        />
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className='space-y-6'>

              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A004B] dark:text-white'>
                Nos{' '}
                <span className='text-gradient'>Formateurs</span>
              </h1>
              <p
                className='text-lg font-semibold'
                style={{
                  background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transParent',
                  backgroundClip: 'text',
                }}>
                Une équipe d&apos;experts passionnés
              </p>
              <p className='max-w-3xl text-base sm:text-lg text-slate-700 dark:text-slate-200'>
                Des spécialistes de l&apos;IA, du développement, de la robotique et du produit. Ils
                conçoivent des parcours pratiques, coachent les apprenants et les aident à transformer
                leurs idées en projets concrets.
              </p>
              <div className='flex flex-wrap gap-3'>
                <span className='inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-slate-100 dark:ring-white/10'>
                  <Sparkles className='h-4 w-4' style={{ color: '#27397F' }} />
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
                  className='inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950'
                  style={{
                    background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)',
                    boxShadow: '0 8px 24px -6px rgba(46,83,145,0.40)',
                  }}>
                  Découvrir les parcours
                </Link>
                <Link
                  href='/contact'
                  className='inline-flex items-center gap-2 rounded-xl border bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#0A004B] shadow-sm backdrop-blur dark:bg-slate-900/70 dark:text-white'
                  style={{ borderColor: 'rgba(39,57,127,0.25)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#4490C7')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(39,57,127,0.25)')}>
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
                className='pointer-events-none absolute -right-12 -top-10 h-48 w-48 rounded-full blur-3xl'
                style={{ background: 'linear-gradient(to br, rgba(68,144,199,0.45), rgba(63,169,223,0.30), rgba(39,57,127,0.25))' }}
              />
              <div className='relative overflow-hidden rounded-3xl bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/85 dark:ring-white/10'>
                <Image
                  src='/images/formateurs/nos-formateurs.jpg'
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
            <p
              className='text-xs font-semibold uppercase tracking-[0.22em]'
              style={{ color: '#27397F' }}>
              Notre équipe
            </p>
            <h2 className='mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Des mentors engagés pour chaque apprenant
            </h2>
            <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
              Coaching, revues de sprint et retours individualisés pour progresser vite.
            </p>
          </motion.div>

          <motion.div
            key={loading ? 'loading-trainers' : 'loaded-trainers'}
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.2 }}
            className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>

            {loading ? (
              // Skeleton cards while loading
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className='animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800 p-5 h-52 ring-1 ring-slate-200 dark:ring-slate-700'
                >
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700' />
                    <div className='space-y-2 flex-1'>
                      <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4' />
                      <div className='h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2' />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='h-3 bg-slate-200 dark:bg-slate-700 rounded' />
                    <div className='h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6' />
                  </div>
                </div>
              ))
            ) : fetchError ? (
              <div className='col-span-full py-12 flex flex-col items-center gap-4'>
                <AlertTriangle className='h-8 w-8 text-red-400' />
                <p className='text-red-500 font-medium text-center'>
                  Impossible de charger les formateurs.
                </p>
                <p className='text-slate-400 text-xs font-mono text-center max-w-xs break-all'>{fetchError}</p>
                <button
                  onClick={() => setRetryCount((c) => c + 1)}
                  className='inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white shadow transition hover:scale-[1.02]'
                  style={{ background: 'linear-gradient(to right, #27397F, #4490C7)' }}>
                  <RefreshCw className='h-4 w-4' />
                  Réessayer
                </button>
              </div>
            ) : trainersList.length === 0 ? (
              <div className='col-span-full py-12 flex flex-col items-center gap-4'>
                <p className='text-slate-500 font-medium italic text-center'>Aucun formateur trouvé.</p>
                <button
                  onClick={() => setRetryCount((c) => c + 1)}
                  className='inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white shadow transition hover:scale-[1.02]'
                  style={{ background: 'linear-gradient(to right, #27397F, #4490C7)' }}>
                  <RefreshCw className='h-4 w-4' />
                  Actualiser
                </button>
              </div>
            ) : trainersList.map((trainer, i) => (
              <motion.div
                key={trainerKey(trainer, i)}
                variants={cardVariant}
                className='relative overflow-hidden rounded-2xl bg-white/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'>
                <div className='flex items-center gap-4'>
                  <div
                    className='relative h-16 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700'
                    style={{ boxShadow: '0 0 0 2px rgba(68,144,199,0.4)' }}>
                    <TrainerPhoto photo={trainer.photo} name={trainer.name} />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-[#0A004B] dark:text-white'>{trainer.name}</h3>
                    <p className='text-sm font-medium' style={{ color: '#4490C7' }}>{trainer.title}</p>
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
                    className='mt-4 inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-75'
                    style={{ color: '#27397F' }}>
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
            <p
              className='text-xs font-semibold uppercase tracking-[0.22em]'
              style={{ color: '#27397F' }}>
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
            key={loading ? 'loading-testimonials' : 'loaded-testimonials'}
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.2 }}
            className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2'>
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={`skeleton-testimonial-${i}`}
                  className='animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800 p-6 h-40 ring-1 ring-slate-200 dark:ring-slate-700'
                >
                  <div className='space-y-2'>
                    <div className='h-3 bg-slate-200 dark:bg-slate-700 rounded' />
                    <div className='h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6' />
                    <div className='h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/6' />
                  </div>
                </div>
              ))
            ) : testimonialsList.length === 0 ? (
              <div className='col-span-full py-8 text-center text-slate-500 font-medium italic'>
                Aucun témoignage pour le moment.
              </div>
            ) : testimonialsList.map((testimonial, i) => (
              <motion.div
                key={testimonialKey(testimonial, i)}
                variants={cardVariant}
                className='relative overflow-hidden rounded-2xl bg-white/90 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'>
                <div className='flex items-center gap-2' style={{ color: '#2E5391' }}>
                  <Quote className='h-5 w-5' />
                  <span className='text-xs font-semibold uppercase tracking-[0.2em]'>Feedback</span>
                </div>
                <p className='mt-3 text-sm text-slate-700 dark:text-slate-200'>{testimonial.quote}</p>
                <div className='mt-4 flex items-center justify-between text-sm font-semibold text-[#0A004B] dark:text-white'>
                  <div>
                    <p>{testimonial.student}</p>
                    <p className='text-xs font-medium' style={{ color: '#4490C7' }}>{testimonial.focus}</p>
                  </div>
                  <div className='flex items-center gap-1 text-amber-500'>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className='h-4 w-4 fill-amber-400' />
                    ))}
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