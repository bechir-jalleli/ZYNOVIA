'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { fadeInUp } from './animations'
import { programs } from './data'

interface ProgramCardsProps {
  selectedProgram: string
  onSelectProgram: (id: string) => void
}

export default function ProgramCards({ selectedProgram, onSelectProgram }: ProgramCardsProps) {
  return (
    <section id='programmes-section' className='py-20 lg:py-28 scroll-mt-16'>
      <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <motion.div {...fadeInUp} className='text-center mb-14'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
            Choisissez le programme adapté à votre enfant
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8'>
          {programs.map((prog) => {
              const isSelected = selectedProgram === prog.id
              const isBootcamp = prog.id === 'bootcamp'
              
              // Mockup colors
              const activeRingColor = isBootcamp 
                ? 'ring-2 ring-blue-600 border-blue-600' 
                : 'ring-2 ring-emerald-600 border-emerald-600'
              
              const borderStyles = isSelected
                ? activeRingColor
                : 'border border-slate-200 dark:border-slate-700'

              return (
                <motion.div
                  key={prog.id}
                  {...fadeInUp}
                  onClick={() => onSelectProgram(prog.id)}
                  className={`relative cursor-pointer rounded-3xl bg-white dark:bg-slate-900 p-6 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col justify-between ${borderStyles}`}
                >
                  {/* Selection indicator */}
                  <div className='absolute top-4 right-4 z-10'>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? isBootcamp
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-emerald-600 bg-emerald-600'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isSelected ? (
                        <Icon icon='solar:check-read-bold' className='w-3.5 h-3.5 text-white' />
                      ) : (
                        <div className='w-2.5 h-2.5 rounded-full bg-transparent' />
                      )}
                    </div>
                  </div>

                  {/* Image + Content layout: Row format */}
                  <div className='flex flex-col sm:flex-row gap-5 items-start mb-6'>

                    {/* Left side Image with rounded corners and border */}
                    <div className='flex-shrink-0 mx-auto sm:mx-0'>
                      <div className='relative w-[180px] h-[210px] rounded-2xl overflow-hidden shadow-inner border border-slate-100 dark:border-slate-800'>
                        <Image
                          src={prog.image}
                          alt={prog.title.replace('\n', ' ')}
                          fill
                          className='object-cover'
                          sizes='180px'
                        />
                      </div>
                    </div>

                    {/* Right side Content */}
                    <div className='flex-1 min-w-0 w-full'>
                      {/* Badge */}
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 border ${
                          isBootcamp
                            ? 'bg-blue-50 text-blue-600 border-blue-200'
                            : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        }`}
                      >
                        {prog.badge}
                      </span>

                      {/* Title */}
                      <h3 className='text-lg sm:text-xl font-bold text-[#0A004B] dark:text-white mb-2 whitespace-pre-line leading-snug'>
                        {prog.title}
                      </h3>

                      {/* Description */}
                      <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4'>
                        {prog.description}
                      </p>

                      {/* Details — vertical list */}
                      <div className='flex flex-col gap-2'>
                        {prog.details.map((detail, idx) => (
                          <div key={idx} className='flex items-center gap-2 text-slate-600 dark:text-slate-350'>
                            <Icon
                              icon={detail.icon}
                              className={`w-4 h-4 flex-shrink-0 ${
                                isBootcamp ? 'text-blue-500' : 'text-emerald-500'
                              }`}
                            />
                            <span className='text-xs'>
                              <span className='font-medium text-slate-400 dark:text-slate-500'>
                                {detail.label}
                              </span>{' '}
                              : {detail.value}
                            </span>
                          </div>
                        ))}
                        {prog.certification && (
                          <div className='flex items-center gap-2 text-slate-600 dark:text-slate-350'>
                            <Icon
                              icon='solar:verified-check-bold'
                              className={`w-4 h-4 flex-shrink-0 ${
                                isBootcamp ? 'text-blue-500' : 'text-emerald-500'
                              }`}
                            />
                            <span className='text-xs font-medium'>
                              Certification incluse
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* CTAs at the bottom */}
                  <div className='flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60'>
                    <Link href='#inscription-form' className='flex-1'>
                      <button
                        className={`w-full px-4 py-2.5 text-xs font-semibold text-white rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-md ${
                          isBootcamp
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-emerald-600 hover:bg-emerald-700'
                        }`}
                      >
                        {prog.ctaLabel}
                        <Icon icon='solar:alt-arrow-right-bold' className='w-3.5 h-3.5' />
                      </button>
                    </Link>
                    <button className='flex-1 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300'>
                      <Icon icon='solar:document-text-bold' className='w-3.5 h-3.5' />
                      Télécharger la brochure
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
      </div>
    </section>
  )
}
