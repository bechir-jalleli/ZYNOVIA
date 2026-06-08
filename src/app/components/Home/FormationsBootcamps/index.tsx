'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { FormationType } from '@/app/types/formation'

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

const normalizeFormationType = (
  formation: FormationType & { _id?: string }
): 'formation' | 'bootcamp' => {
  const rawType = formation.type?.toLowerCase().trim()

  if (rawType === 'bootcamp' || rawType === 'formation') {
    return rawType
  }

  const title = formation.title?.toLowerCase() ?? ''
  const badge = formation.badge?.toLowerCase() ?? ''

  if (title.includes('bootcamp') || badge.includes('bootcamp')) {
    return 'bootcamp'
  }

  return 'formation'
}

const FormationsBootcamps = () => {
  const [formations, setFormations] = useState<FormationType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'formation' | 'bootcamp'>('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setFormations(data.FormationData || [])
      } catch (error) {
        console.error('Error fetching formations', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredFormations = formations.filter((formation) => {
    if (selectedFilter === 'all') return true
    return normalizeFormationType(formation) === selectedFilter
  })

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
              Nos <span className='text-gradient'>Formations</span> Actuelles
            </h2>
            <p className='text-lg text-slate-600 dark:text-lightgrey font-medium leading-relaxed'>
              Découvrez nos programmes de formation en Intelligence Artificielle et technologies du futur
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={fadeInUp}
            className='flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl mb-16 backdrop-blur-md shadow-inner'
          >
            {[
              { id: 'all', label: 'Tous', icon: 'solar:Users-group-rounded-bold' },
              { id: 'formation', label: 'Formations', icon: 'solar:book-bookmark-bold' },
              { id: 'bootcamp', label: 'Bootcamps', icon: 'solar:rocket-bold' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${selectedFilter === tab.id
                  ? 'bg-gradient-brand text-white shadow-lg'
                  : 'text-slate-500 dark:text-slate-400 hover:text-gradient-hover'
                  }`}
              >
                <Icon icon={tab.icon} className='w-4 h-4' />
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Grid Layout */}
          <div className='w-full'>
            {loading ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className='h-[520px] rounded-3xl bg-slate-200/60 dark:bg-slate-800/60 animate-pulse'
                  />
                ))}
              </div>
            ) : filteredFormations.length === 0 ? (
              <div className='rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 px-6 py-16 text-center'>
                <p className='text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2'>
                  Aucun programme trouvé
                </p>
                <p className='text-slate-500 dark:text-slate-400'>
                  Essayez un autre filtre ou revenez plus tard.
                </p>
              </div>
            ) : (
              <AnimatePresence mode='wait'>
                <motion.div
                  key={selectedFilter}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
                >
                  {filteredFormations.map((formation: FormationType & { _id?: string }, index) => {
                    const formationType = normalizeFormationType(formation)

                    return (
                  <motion.div
                    key={formation.id || formation._id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className='group relative overflow-hidden rounded-3xl bg-white/95 dark:bg-slate-900/95 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 dark:ring-slate-700/70 backdrop-blur transition-all duration-500 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)] hover:-translate-y-2 flex flex-col h-full'
                  >
                    {/* Gradient Background Effect */}
                    <div
                      aria-hidden='true'
                      className='pointer-events-none absolute inset-x-6 -top-12 h-32 rounded-full bg-gradient-to-r from-[#27397F]/30 to-[#3FA9DF]/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    />

                    {/* Badge */}
                    {formation.badge && (
                      <div className='absolute top-4 right-4 z-20'>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className='inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-brand text-white shadow-lg shadow-[#27397F]/30 backdrop-blur-sm'
                        >
                          {formation.badge}
                        </motion.span>
                      </div>
                    )}

                    {/* Image */}
                    <div className='relative h-56 sm:h-64 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900'>
                      <Image
                        src={formation.image}
                        alt={formation.title}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent' />

                      {/* Type Badge on Image */}
                      <div className='absolute bottom-4 left-4 right-4'>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-lg ${formationType === 'bootcamp'
                            ? 'bg-gradient-to-r from-orange-500/95 to-orange-600/95 text-white'
                            : 'bg-gradient-brand text-white shadow-[#27397F]/20'
                            }`}
                        >
                          {formationType === 'bootcamp' ? (
                            <>
                              <Icon icon='material-symbols:rocket-launch' className='w-4 h-4' />
                              <span>Bootcamp</span>
                            </>
                          ) : (
                            <>
                              <Icon icon='material-symbols:menu-book' className='w-4 h-4' />
                              <span>Formation</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className='relative flex flex-col flex-grow p-6 sm:p-8'>
                      <h3 className='text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 line-clamp-2 leading-tight group-hover:text-[#3FA9DF] transition-colors duration-300'>
                        {formation.title}
                      </h3>
                      <p className='text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-5 line-clamp-2 flex-grow leading-relaxed'>
                        {formation.description}
                      </p>

                      {/* Info Icons */}
                      <div className='flex flex-wrap gap-3 sm:gap-4 mb-5 pb-5 border-b border-slate-200/60 dark:border-slate-700/60'>
                        <div className='flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400'>
                          <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-soft text-[#27397F] dark:text-[#3FA9DF]'>
                            <Icon
                              icon='material-symbols:schedule'
                              className='w-4 h-4'
                            />
                          </div>
                          <span className='font-medium'>{formation.duration}</span>
                        </div>
                        <div className='flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400'>
                          <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-soft text-[#27397F] dark:text-[#3FA9DF]'>
                            <Icon
                              icon='material-symbols:school'
                              className='w-4 h-4'
                            />
                          </div>
                          <span className='font-medium'>{formation.level}</span>
                        </div>
                        {formation.startDate && (
                          <div className='flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400'>
                            <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-soft text-[#27397F] dark:text-[#3FA9DF]'>
                              <Icon
                                icon='material-symbols:calendar-today'
                                className='w-4 h-4'
                              />
                            </div>
                            <span className='font-medium'>{formation.startDate}</span>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      {formation.features && formation.features.length > 0 && (
                        <div className='mb-6 space-y-2.5'>
                          {formation.features.slice(0, 3).map((feature: string, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className='flex items-start gap-2.5'
                            >
                              <div className='flex-shrink-0 mt-0.5'>
                                <Icon
                                  icon='material-symbols:check-circle-rounded'
                                  className='w-5 h-5 text-[#3FA9DF]'
                                  style={{ color: '#3FA9DF' }}
                                />
                              </div>
                              <span className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed'>
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Price & CTA */}
                      <div className='mt-auto pt-5 border-t border-slate-200/60 dark:border-slate-700/60'>
                        <div className='flex items-center justify-between'>
                        </div>
                        <Link
                          href={formation.href || '/programmes'}
                          className='group/btn block w-full px-6 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-center btn-primary btn-hover rounded-xl shadow-md'
                        >
                          <span className='relative z-10 flex items-center justify-center gap-2'>
                            En savoir plus
                            <Icon
                              icon='material-symbols:arrow-forward-rounded'
                              className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300'
                            />
                          </span>
                        </Link>
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
    </section>
  )
}

export default FormationsBootcamps
