'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import SectionHeading, { fadeInUp } from './SectionHeading'
import { FormationType } from '@/app/types/formation'
import DownloadModal from './DownloadModal'

export const staticFormations = [
  {
    mode: 'PRÉSENTIEL',
    modeColor: 'bg-[#7C3AED]',
    title: 'Bootcamp IA & Machine Learning',
    accentFrom: '#7C3AED',
    accentTo: '#4C1D95',
    details: [
      { icon: 'solar:calendar-bold', label: 'Démarrage : 27 juillet' },
      { icon: 'solar:clock-circle-bold', label: 'Du lundi au vendredi' },
      { icon: 'solar:hourglass-bold', label: '20 heures (5 jours)' },
      { icon: 'solar:users-group-rounded-bold', label: '12 à 18 ans' },
      { icon: 'solar:map-point-bold', label: 'Lac 1 - Tunis' },
    ],
    program: [
      "Comprendre l'IA et le Machine Learning",
      'Créer son premier modèle d\u2019IA',
      'Programmer en Python',
      'Manipuler des données',
      'Réaliser un projet concret',
      'Présenter son projet',
    ],
    priceNew: '349 DT',
    priceOld: '599 DT',
    priceNote: 'au lieu de',
    image: '/images/nos-formation/ia-20h.webp',
    video: '/videos/bootcamp-ia.mp4',
    buttonClass: 'bg-[#7C3AED] hover:bg-[#6D28D9]',
    programmePdfPath: '/formation/Prog_20h_Intelligence-Artificielle-and-Machine-Learning_pdf.pdf',
    enrollmentLink: '',
  }
]

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

interface FormationsListProps {
  onEnroll?: (formationTitle: string) => void
}

const AutoPlayVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = videoRef.current?.play()
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay with sound was blocked. Mute and try again.
                if (videoRef.current) {
                  videoRef.current.muted = true
                  videoRef.current.play().catch(() => {})
                }
              })
            }
          } else {
            videoRef.current?.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      playsInline
      controls
      className='w-full h-full object-contain'
    />
  )
}

export default function FormationsList({ onEnroll }: FormationsListProps) {
  const [formationsList, setFormationsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('')

  useEffect(() => {
    // Force static data for now
    setFormationsList(staticFormations)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <section className='py-16 lg:py-24'>
        <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-[300px]'>
          <Icon icon='svg-spinners:ring-resize' className='text-primary' width='40' />
        </div>
      </section>
    )
  }

  return (
    <section className='py-16 lg:py-24'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <SectionHeading label='Nos formations' />
        <p className='text-center text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 mb-12 max-w-2xl mx-auto font-medium leading-relaxed'>
          Découvrez nos programmes de formation en Intelligence Artificielle et technologies du futur
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
          {formationsList.map((f, idx) => {
            const hasVideo = !!f.video;
            return (
            <div key={f.title} className={hasVideo ? 'col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch' : 'col-span-1'}>
              <motion.div
                {...fadeInUp}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className='relative flex flex-col rounded-[24px] bg-white dark:bg-slate-900 border-2 shadow-[0_10px_40px_rgba(15,23,42,0.06)] overflow-hidden w-full h-full'
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
                <div className='flex flex-col xs:flex-row items-start gap-4 mb-5'>
                  <div className='relative w-full xs:w-44 sm:w-48 h-48 xs:h-28 sm:h-32 flex-shrink-0 rounded-2xl overflow-hidden'>
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
                        className='self-start xs:self-end mt-3 xs:mt-2 flex-shrink-0 flex flex-row xs:flex-col items-center justify-center rounded-2xl px-4 py-2 xs:py-3 text-white text-center gap-2 xs:gap-0'
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

                <div className='mt-auto flex flex-col gap-3 sm:flex-row'>
                  <button
                    onClick={() => {
                      if (onEnroll) onEnroll(f.title)
                      const el = document.getElementById('inscription-form')
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        const firstInput = document.getElementById('parent-nom-input') as HTMLInputElement | null
                        if (firstInput) {
                          setTimeout(() => {
                            firstInput.focus({ preventScroll: true })
                          }, 100)
                        }
                      }
                    }}
                    className={`flex-1 px-6 py-3.5 text-sm sm:text-base font-semibold text-white rounded-[12px] transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${f.buttonClass}`}
                  >
                    Inscrire mon enfant
                  </button>
                  <button
                    onClick={() => {
                      if (f.programmePdfPath) {
                        setSelectedPdfUrl(f.programmePdfPath)
                        setDownloadModalOpen(true)
                      }
                    }}
                    disabled={!f.programmePdfPath}
                    className={`flex-1 px-6 py-3.5 text-sm sm:text-base font-semibold rounded-[12px] border-2 bg-white dark:bg-transparent transition-all duration-300 ${f.programmePdfPath
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

              {hasVideo && (
                <motion.div
                  {...fadeInUp}
                  transition={{ duration: 0.6, delay: idx * 0.1 + 0.2 }}
                  className='relative rounded-[24px] overflow-hidden shadow-xl bg-black flex items-center justify-center h-[80vh] lg:h-[90vh]'
                >
                  <AutoPlayVideo src={f.video} />
                </motion.div>
              )}
            </div>
          )})}
        </div>
      </div>
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        pdfUrl={selectedPdfUrl}
      />
    </section>
  )
}