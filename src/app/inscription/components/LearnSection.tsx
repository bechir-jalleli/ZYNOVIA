'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import SectionHeading, { fadeInUp } from './SectionHeading'

const learnItems = [
  { title: 'IA Générative', icon: 'solar:magic-stick-3-bold-duotone', color: 'text-[#3FA9DF]' },
  { title: 'Python', icon: 'skill-icons:python-dark', color: 'text-[#3776AB]' },
  { title: 'Machine Learning', icon: 'solar:cpu-bolt-bold-duotone', color: 'text-[#27397F]' },
  { title: 'Data', icon: 'solar:chart-2-bold-duotone', color: 'text-[#0091E6]' },
  { title: 'Prompt Engineering', icon: 'solar:chat-square-code-bold-duotone', color: 'text-[#4490C7]' },
  { title: 'Projet Final & Soutenance', icon: 'solar:rocket-2-bold-duotone', color: 'text-[#7C3AED]' },
]

export default function LearnSection() {
  return (
    <section className='py-16 lg:py-20'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <SectionHeading label='Ce que votre enfant va apprendre' />

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12'>
          {learnItems.map((item, idx) => (
            <motion.div
              key={item.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className='flex flex-col items-center justify-center gap-3 text-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300'
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 ${item.color}`}>
                <Icon icon={item.icon} className='w-6 h-6' />
              </div>
              <span className='text-sm font-bold text-slate-800 dark:text-white'>{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
