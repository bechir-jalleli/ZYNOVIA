'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { fadeInUp } from './animations'
import { comparisonRows } from './data'

export default function ComparisonSection() {
  return (
    <section className='py-16 lg:py-24'>
      <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <motion.div {...fadeInUp} className='text-center mb-14'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
            Quel programme choisir ?
          </h2>
        </motion.div>

        <div className='grid lg:grid-cols-5 gap-8 items-start'>
          {/* Comparison Table */}
          <motion.div
            {...fadeInUp}
            className='lg:col-span-3 rounded-3xl bg-white dark:bg-slate-900 shadow-md ring-1 ring-slate-100 dark:ring-slate-800 overflow-hidden'
          >
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='border-b border-slate-100 dark:border-slate-800'>
                    <th className='text-left px-6 py-5 text-sm font-semibold text-slate-500 dark:text-slate-400'>
                      Critère
                    </th>
                    <th className='px-6 py-5 text-sm font-semibold text-blue-600 text-center border-l border-slate-100 dark:border-slate-800'>
                      Bootcamp IA
                    </th>
                    <th className='px-6 py-5 text-sm font-semibold text-emerald-600 text-center border-l border-slate-100 dark:border-slate-800'>
                      IA Générative
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className='border-b border-slate-100 dark:border-slate-800 last:border-b-0'
                    >
                      <td className='px-6 py-4.5 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-[200px]'>
                        {row.criteria}
                      </td>
                      <td className='px-6 py-4.5 text-center border-l border-slate-100 dark:border-slate-800 bg-blue-50/5 dark:bg-blue-900/5'>
                        {row.bootcamp ? (
                          <div className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white'>
                            <Icon icon='solar:check-read-bold' className='w-3 h-3' />
                          </div>
                        ) : (
                          <span className='text-slate-400 dark:text-slate-600 text-sm font-semibold'>—</span>
                        )}
                      </td>
                      <td className='px-6 py-4.5 text-center border-l border-slate-100 dark:border-slate-800 bg-emerald-50/5 dark:bg-emerald-900/5'>
                        {row.generative ? (
                          <div className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white'>
                            <Icon icon='solar:check-read-bold' className='w-3 h-3' />
                          </div>
                        ) : (
                          <span className='text-slate-400 dark:text-slate-600 text-sm font-semibold'>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* "Vous hésitez?" CTA */}
          <motion.div
            {...fadeInUp}
            className='lg:col-span-2 rounded-3xl bg-blue-50/40 dark:bg-slate-900/40 p-8 shadow-sm ring-1 ring-blue-100 dark:ring-slate-800 flex flex-col justify-between min-h-full'
          >
            {/* Top row: Headset icon on left + Title/Description on right */}
            <div className='flex items-start gap-6 mb-10'>
              {/* Headset Icon Container */}
              <div className='flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 shadow-sm'>
                <Icon icon='solar:headphones-round-bold-duotone' className='w-11 h-11' />
              </div>

              <div className='flex-1 min-w-0'>
                <h3 className='text-xl font-bold text-[#0A004B] dark:text-white mb-2.5'>
                  Vous hésitez ?
                </h3>
                <p className='text-sm text-slate-650 dark:text-slate-350 leading-relaxed'>
                  Nos conseillers sont là pour vous aider à choisir le programme le plus adapté aux besoins et objectifs de votre enfant.
                </p>
              </div>
            </div>

            {/* Bottom row: Centered button with more spacing */}
            <div className='w-full flex justify-center mt-auto'>
              <Link href='/contact?profil=Parent' className='w-full max-w-xs'>
                <button className='w-full px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md group'>
                  Être conseillé par Zynovia
                  <Icon
                    icon='solar:alt-arrow-right-bold'
                    className='w-4 h-4 transition-transform group-hover:translate-x-1'
                  />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
