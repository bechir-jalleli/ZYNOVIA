'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import SectionHeading, { fadeInUp } from './SectionHeading'

const learnItems = [
  { title: 'IA Générative', icon: 'solar:magic-stick-3-bold-duotone', color: '#3FA9DF', bg: 'rgba(63, 169, 223, 0.1)' },
  { title: 'Python', icon: 'tabler:brand-python', color: '#3776AB', bg: 'rgba(55, 118, 171, 0.1)' },
  { title: 'Machine Learning', icon: 'solar:cpu-bolt-bold-duotone', color: '#27397F', bg: 'rgba(39, 57, 127, 0.1)' },
  { title: 'Data', icon: 'solar:chart-2-bold-duotone', color: '#0091E6', bg: 'rgba(0, 145, 230, 0.1)' },
  { title: 'Prompt Engineering', icon: 'solar:chat-square-code-bold-duotone', color: '#4490C7', bg: 'rgba(68, 144, 199, 0.1)' },
  { title: 'Projet Final & Soutenance', icon: 'solar:rocket-2-bold-duotone', color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.1)' },
]

export default function LearnSection() {
  return (
    <section className='py-20 lg:py-24 bg-slate-50/30 dark:bg-slate-950/20'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <SectionHeading label='Ce que votre enfant va apprendre' />

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-16'>
          {learnItems.map((item, idx) => (
            <motion.div
              key={item.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className='group flex flex-col items-center justify-center gap-4 text-center p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-[0_20px_50px_rgba(39,57,127,0.08)] hover:border-slate-200 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-1.5'
            >
              <div 
                className='flex items-center justify-center w-16 h-16 rounded-2xl transition-transform duration-300 group-hover:scale-110 shadow-inner'
                style={{ backgroundColor: item.bg, color: item.color }}
              >
                <Icon icon={item.icon} className='w-8 h-8' />
              </div>
              <span className='text-sm sm:text-base font-extrabold text-slate-800 dark:text-white leading-snug'>{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
