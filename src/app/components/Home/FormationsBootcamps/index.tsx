'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import DownloadModal from '@/app/inscription/components/DownloadModal'

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const getModeStyles = (mode?: string) => {
  const m = mode?.toUpperCase()
  if (m === 'EN LIGNE') {
    return {
      modeColor: 'bg-[#0091E6]',
      accentFrom: '#0091E6',
      accentTo: '#0067E0',
      buttonClass: 'bg-[#0091E6] hover:bg-[#0079C2]',
    }
  } else if (m === 'HYBRIDE') {
    return {
      modeColor: 'bg-[#FF9F0A]',
      accentFrom: '#FF9F0A',
      accentTo: '#FF3B30',
      buttonClass: 'bg-[#FF9F0A] hover:bg-[#E08A07]',
    }
  } else {
    // PRÉSENTIEL or default
    return {
      modeColor: 'bg-[#7C3AED]',
      accentFrom: '#7C3AED',
      accentTo: '#4C1D95',
      buttonClass: 'bg-[#7C3AED] hover:bg-[#6D28D9]',
    }
  }
}

const FormationsBootcamps = () => {
  const [formations, setFormations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        const rawFormations = data.FormationData || []
        
        const mapped = rawFormations.map((f: any) => {
          const styles = getModeStyles(f.mode)
          
          const details: { icon: string; label: string }[] = []
          if (f.startDate) {
            details.push({
              icon: 'solar:calendar-bold',
              label: f.startDate.toLowerCase().startsWith('démarrage')
                ? f.startDate
                : `Démarrage : ${f.startDate}`,
            })
          }
          if (f.schedule) {
            details.push({ icon: 'solar:clock-circle-bold', label: f.schedule })
          }
          if (f.duration) {
            details.push({ icon: 'solar:hourglass-bold', label: f.duration })
          }
          if (f.ageRange) {
            details.push({ icon: 'solar:users-group-rounded-bold', label: f.ageRange })
          }
          if (f.location) {
            const isOnline =
              f.location.toLowerCase().includes('en ligne') ||
              f.mode?.toUpperCase() === 'EN LIGNE'
            details.push({
              icon: isOnline ? 'solar:global-bold' : 'solar:map-point-bold',
              label: f.location,
            })
          }

          return {
            title: f.title,
            mode: f.mode || 'PRÉSENTIEL',
            modeColor: styles.modeColor,
            accentFrom: styles.accentFrom,
            accentTo: styles.accentTo,
            details,
            program: f.programme || [],
            priceNew: f.price ? `${f.price} DT` : '',
            priceOld: f.originalPrice ? `${f.originalPrice} DT` : null,
            priceNote: f.originalPrice ? 'au lieu de' : null,
            image: f.image || '/images/parent/image.png',
            buttonClass: styles.buttonClass,
            programmePdfPath: f.programmePdfPath || '',
            enrollmentLink: f.enrollmentLink || '',
          }
        })
        setFormations(mapped)
      } catch (error) {
        console.error('Error fetching formations', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section className='py-24 lg:py-32 bg-gradient-to-b from-transparent via-secondary/5 to-secondary/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          variants={staggerContainer}
          initial='initial'
          whileInView='whileInView'
          viewport={{ once: true }}
          className='flex flex-col items-center'
        >
          <motion.div variants={fadeInUp} className='text-center mb-16 max-w-3xl'>
            <h2 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A004B] dark:text-white mb-6 tracking-tight'>
              Nos <span className='text-[#3FA9DF]'>formations</span>
            </h2>
            <p className='text-lg text-slate-600 dark:text-lightgrey font-medium leading-relaxed'>
              Découvrez nos programmes de formation en Intelligence Artificielle et technologies du futur
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className='w-full'>
            {loading ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className='h-[500px] rounded-3xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse'
                  />
                ))}
              </div>
            ) : formations.length === 0 ? (
              <div className='rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 px-6 py-16 text-center'>
                <p className='text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2'>
                  Aucun programme trouvé
                </p>
                <p className='text-slate-500 dark:text-slate-400'>
                  Revenez plus tard.
                </p>
              </div>
            ) : (
              <AnimatePresence mode='wait'>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'
                >
                  {formations.map((f, index) => {
                    return (
                      <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.06 }}
                        className='relative flex flex-col rounded-[24px] bg-white dark:bg-slate-900 border-2 shadow-[0_10px_40px_rgba(15,23,42,0.06)] overflow-hidden'
                        style={{ borderColor: f.accentFrom }}
                      >
                        <div className='flex flex-col flex-1 p-6 sm:p-7'>
                          {/* Title + mode badge on top */}
                          <div className='flex items-center justify-between gap-3 mb-4 flex-wrap'>
                            <h3 className='text-lg sm:text-xl font-extrabold text-[#0A004B] dark:text-white'>
                              {f.title}
                            </h3>
                            <span
                              className={`text-white text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${f.modeColor}`}
                            >
                              {f.mode}
                            </span>
                          </div>

                          {/* Image (left, wide) + details with price underneath (right) */}
                          <div className='flex items-stretch gap-4 mb-5'>
                            <div className='relative w-36 sm:w-48 h-28 sm:h-32 flex-shrink-0 rounded-2xl overflow-hidden'>
                              <Image src={f.image} alt={f.title} fill className='object-cover' />
                            </div>

                            <div className='flex flex-1 flex-col justify-between'>
                              <div className='flex flex-col gap-2'>
                                {f.details.map((d: any) => (
                                  <div key={d.label} className='flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300'>
                                    <Icon icon={d.icon} className='w-4 h-4 flex-shrink-0' style={{ color: f.accentFrom }} />
                                    <span>{d.label}</span>
                                  </div>
                                ))}
                              </div>

                              {f.priceNew && (
                                <div
                                  className='self-end mt-2 flex-shrink-0 flex flex-col items-center justify-center rounded-2xl px-4 py-3 text-white text-center'
                                  style={{ background: `linear-gradient(135deg, ${f.accentFrom}, ${f.accentTo})` }}
                                >
                                  {f.priceOld && (
                                    <span className='text-[11px] leading-tight opacity-80'>
                                      {f.priceNote} <span className='line-through'>{f.priceOld}</span>
                                    </span>
                                  )}
                                  <span className='text-xl font-extrabold leading-tight whitespace-nowrap'>{f.priceNew}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Au programme : two-column list */}
                          {f.program && f.program.length > 0 && (
                            <div className='mb-5'>
                              <p className='text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2'>
                                Au programme :
                              </p>
                              <div
                                className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5'
                                style={{ gridAutoFlow: 'column', gridTemplateRows: `repeat(${Math.ceil(f.program.length / 2)}, auto)` }}
                              >
                                {f.program.map((p: string) => (
                                  <li key={p} className='flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 list-none'>
                                    <Icon icon='solar:check-circle-bold' className='w-4 h-4 mt-0.5 flex-shrink-0' style={{ color: f.accentFrom }} />
                                    <span>{p}</span>
                                  </li>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className='mt-auto flex flex-col sm:flex-row gap-3'>
                            <Link
                              href={`/inscription?program=${encodeURIComponent(f.title)}&role=Parent`}
                              className={`flex-1 text-center px-6 py-3.5 text-sm sm:text-base font-semibold text-white rounded-[12px] transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${f.buttonClass}`}
                            >
                              Inscrire mon enfant
                            </Link>
                            <button
                              onClick={() => {
                                if (f.programmePdfPath) {
                                  setSelectedPdfUrl(f.programmePdfPath)
                                  setDownloadModalOpen(true)
                                }
                              }}
                              disabled={!f.programmePdfPath}
                              className={`flex-1 px-6 py-3.5 text-sm sm:text-base font-semibold rounded-[12px] border-2 bg-white dark:bg-transparent transition-all duration-300 ${
                                f.programmePdfPath 
                                  ? 'hover:shadow-lg hover:scale-[1.01] cursor-pointer' 
                                  : 'opacity-50 cursor-not-allowed'
                              }`}
                              style={{ borderColor: f.accentFrom, color: f.accentFrom }}
                            >
                              Télécharger le programme
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        pdfUrl={selectedPdfUrl}
      />
    </section>
  )
}

export default FormationsBootcamps
