'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fadeInUp } from './animations'
import { programs } from './data'

interface ProgramContentAccordionsProps {
  openAccordions: Record<string, boolean>
  onToggleAccordion: (id: string) => void
}

export default function ProgramContentAccordions({
  openAccordions,
  onToggleAccordion,
}: ProgramContentAccordionsProps) {
  return (
    <section className='py-16 lg:py-24 bg-[#F6F8FB] dark:bg-slate-900/50'>
      <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <motion.div {...fadeInUp} className='text-center mb-14'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
            Contenu des programmes
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8'>
          {programs.map((prog) => {
            const isOpen = openAccordions[prog.id]
            const isBootcamp = prog.id === 'bootcamp'
            
            // Accordion Styles from mockup
            const ringColor = isBootcamp
              ? 'ring-2 ring-blue-100 dark:ring-blue-900 border border-blue-200 dark:border-blue-800'
              : 'ring-2 ring-emerald-100 dark:ring-emerald-900 border border-emerald-200 dark:border-emerald-800'
            
            const titleColor = isBootcamp ? 'text-blue-600' : 'text-emerald-600'
            const headerIcon = isBootcamp ? 'solar:cpu-bolt-bold' : 'solar:magic-stick-bold'
            const headerIconColor = isBootcamp ? 'text-blue-500' : 'text-emerald-500'

            return (
              <motion.div
                key={prog.id}
                {...fadeInUp}
                className={`rounded-3xl bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 overflow-hidden ${ringColor}`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => onToggleAccordion(prog.id)}
                  className='w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'
                >
                  <div className='flex items-center gap-3.5'>
                    <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 ${headerIconColor}`}>
                      <Icon icon={headerIcon} className='w-6 h-6' />
                    </div>
                    <h3 className={`text-base font-bold whitespace-pre-line leading-tight ${titleColor}`}>
                      {prog.title.replace('\n', ' ')}
                    </h3>
                  </div>
                  <div
                    className={`flex-shrink-0 p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <Icon
                      icon='fluent:chevron-down-24-filled'
                      className='w-5 h-5'
                    />
                  </div>
                </button>

                {/* Accordion Body */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? 'max-h-[600px] border-t border-slate-100 dark:border-slate-800'
                      : 'max-h-0'
                  }`}
                >
                  <div className='divide-y divide-slate-100 dark:divide-slate-800/60'>
                    {prog.modules.map((mod, idx) => (
                      <div
                        key={idx}
                        className='flex items-center justify-between p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors gap-4'
                      >
                        <span className='text-xs sm:text-sm text-slate-700 dark:text-slate-350 font-medium leading-relaxed'>
                          {mod}
                        </span>
                        <Icon 
                          icon='solar:alt-arrow-right-bold' 
                          className='w-3.5 h-3.5 text-slate-400 dark:text-slate-600 flex-shrink-0' 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
