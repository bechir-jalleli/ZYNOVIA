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

const cardVariant = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

const FormationsBootcamps = () => {
  const [formations, setFormations] = useState<FormationType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'formation' | 'bootcamp'>('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
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
    return formation.type === selectedFilter
  })

  return (
    <section className='py-24 lg:py-32 bg-gradient-to-b from-transparent via-secondary/5 to-secondary/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          variants={staggerContainer}
          initial='initial'
          whileInView='whileInView'
          viewport={{ once: true, amount: 0.25 }}
          className='w-full'
        >
          {/* Header */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='text-center mb-12 lg:mb-16'
          >
            <p className='text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary/80 mb-3'>
              Formations & Bootcamps
            </p>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A004B] dark:text-white mb-4'>
              Nos Formations Actuelles
            </h2>
            <p className='text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed'>
              Découvrez nos programmes de formation en Intelligence Artificielle et technologies du futur
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className='flex justify-center mb-12 lg:mb-16'
          >
            <div className='inline-flex bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-1.5 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 dark:ring-slate-700/70 gap-2'>
              {(['all', 'formation', 'bootcamp'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`relative px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 whitespace-nowrap ${
                    selectedFilter === filter
                      ? 'bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-primary/30 scale-105'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-700/50 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {filter === 'all'
                    ? 'Tous'
                    : filter === 'formation'
                      ? 'Formations'
                      : 'Bootcamps'}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cards Grid */}
          {loading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className='h-[600px] bg-slate-200/50 dark:bg-slate-800/50 rounded-3xl animate-pulse'
                />
              ))}
            </div>
          ) : filteredFormations.length === 0 ? (
            <motion.div
              {...fadeInUp}
              className='text-center py-20'
            >
              <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6'>
                <Icon icon='material-symbols:search-off' className='w-10 h-10 text-slate-400' />
              </div>
              <p className='text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-400'>
                Aucune formation disponible pour le moment.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode='wait'>
              <motion.div
                key={selectedFilter}
                variants={staggerContainer}
                initial='initial'
                animate='whileInView'
                exit='initial'
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
              >
                {filteredFormations.map((formation) => (
                  <motion.div
                    key={formation.id}
                    variants={cardVariant}
                    viewport={{ once: false, amount: 0.2 }}
                    className='group relative overflow-hidden rounded-3xl bg-white/95 dark:bg-slate-900/95 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 dark:ring-slate-700/70 backdrop-blur transition-all duration-500 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)] hover:-translate-y-2 flex flex-col h-full'
                  >
                    {/* Gradient Background Effect */}
                    <div
                      aria-hidden='true'
                      className='pointer-events-none absolute inset-x-6 -top-12 h-32 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/40 to-[#0067E0]/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    />

                    {/* Badge */}
                    {formation.badge && (
                      <div className='absolute top-4 right-4 z-20'>
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className='inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-lg shadow-primary/40 backdrop-blur-sm'
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
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-lg ${
                            formation.type === 'bootcamp'
                              ? 'bg-gradient-to-r from-orange-500/95 to-orange-600/95 text-white'
                              : 'bg-gradient-to-r from-blue-500/95 to-blue-600/95 text-white'
                          }`}
                        >
                          {formation.type === 'bootcamp' ? (
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
                      <h3 className='text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3 line-clamp-2 leading-tight group-hover:text-primary dark:group-hover:text-cyan-300 transition-colors duration-300'>
                        {formation.title}
                      </h3>
                      <p className='text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-5 line-clamp-2 flex-grow leading-relaxed'>
                        {formation.description}
                      </p>

                      {/* Info Icons */}
                      <div className='flex flex-wrap gap-3 sm:gap-4 mb-5 pb-5 border-b border-slate-200/60 dark:border-slate-700/60'>
                        <div className='flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400'>
                          <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary'>
                            <Icon
                              icon='material-symbols:schedule'
                              className='w-4 h-4'
                            />
                          </div>
                          <span className='font-medium'>{formation.duration}</span>
                        </div>
                        <div className='flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400'>
                          <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary'>
                            <Icon
                              icon='material-symbols:school'
                              className='w-4 h-4'
                            />
                          </div>
                          <span className='font-medium'>{formation.level}</span>
                        </div>
                        {formation.startDate && (
                          <div className='flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400'>
                            <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary'>
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
                          {formation.features.slice(0, 3).map((feature, index) => (
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
                                  className='w-5 h-5 text-primary'
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
                        <div className='flex items-center justify-between mb-4'>
                          {formation.price && (
                            <div>
                              <span className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium'>
                                À partir de
                              </span>
                              <div>
                                <span className='text-2xl sm:text-3xl font-bold text-[#0A004B] dark:text-white'>
                                  {formation.price}
                                </span>
                                <span className='text-base sm:text-lg text-slate-600 dark:text-slate-400 ml-1'>
                                  TND
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <Link
                          href={formation.href}
                          className='group/btn block w-full px-6 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-center text-white border rounded-xl border-transparent bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md relative overflow-hidden'
                        >
                          <span className='relative z-10 flex items-center justify-center gap-2'>
                            En savoir plus
                            <Icon
                              icon='material-symbols:arrow-forward-rounded'
                              className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300'
                            />
                          </span>
                          <div className='absolute inset-0 bg-gradient-to-r from-[#0091E6] via-[#0067E0] to-[#00C3D9] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300' />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default FormationsBootcamps

