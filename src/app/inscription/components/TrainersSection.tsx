'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GraduationCap, Linkedin, RefreshCw, AlertTriangle } from 'lucide-react'
import { Trainer } from '@/data/trainers'
import SectionHeading from './SectionHeading'

type TrainerFromAPI = Trainer & { _id?: string }

const fadeInUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
}

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

export default function TrainersSection() {
  const [trainersList, setTrainersList] = useState<TrainerFromAPI[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setFetchError(null)
      try {
        const res = await fetch('/api/data', { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setTrainersList(data.TrainerData ?? [])
      } catch (err: any) {
        setFetchError(err?.message ?? 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [retryCount])

  return (
    <section className='py-16 lg:py-20'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <SectionHeading label='Nos formateurs' />

        <div className='mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {loading ? (
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
              <p className='text-red-500 font-medium text-center'>Impossible de charger les formateurs.</p>
              <button
                onClick={() => setRetryCount((c) => c + 1)}
                className='inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white shadow transition hover:scale-[1.02]'
                style={{ background: 'linear-gradient(to right, #27397F, #4490C7)' }}
              >
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
                style={{ background: 'linear-gradient(to right, #27397F, #4490C7)' }}
              >
                <RefreshCw className='h-4 w-4' />
                Actualiser
              </button>
            </div>
          ) : (
            trainersList.map((trainer, i) => (
              <motion.div
                key={trainer.id || trainer._id || `trainer-${i}`}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className='relative overflow-hidden rounded-2xl bg-white/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'
              >
                <div className='flex items-center gap-4'>
                  <div
                    className='relative h-16 w-16 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0'
                    style={{ boxShadow: '0 0 0 2px rgba(68,144,199,0.4)' }}
                  >
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
                      className='rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'
                    >
                      {item}
                    </span>
                  ))}
                </div>

              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}