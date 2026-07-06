'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import SectionHeading, { fadeInUp } from './SectionHeading'

const whyItems = [
  {
    title: 'Des ingénieurs spécialisés en IA',
    desc: 'Nos formateurs travaillent sur des projets réels en entreprises.',
    icon: 'solar:user-bold-duotone',
  },
  {
    title: 'Learning by Doing',
    desc: '80% pratique, 20% théorie.',
    icon: 'solar:widget-bold-duotone',
  },
  {
    title: 'Projets concrets',
    desc: 'Chaque jeune développe son propre projet d\u2019IA.',
    icon: 'solar:programming-bold-duotone',
  },
  {
    title: 'Certification incluse',
    desc: 'Certificat + Projet + Portfolio.',
    icon: 'solar:diploma-verified-bold-duotone',
  },
  {
    title: 'Groupes limités',
    desc: 'Un accompagnement personnalisé pour chaque participant.',
    icon: 'solar:users-group-two-rounded-bold-duotone',
  },
]

export default function WhyChooseSection() {
  return (
    <section className='py-16 lg:py-20'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <SectionHeading label='Pourquoi choisir ZYNOVIA ?' />

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-12'>
          {whyItems.map((item, idx) => (
            <motion.div
              key={item.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className='flex flex-col items-center text-center gap-3'
            >
              <div className='flex items-center justify-center w-14 h-14 rounded-full bg-[#3FA9DF]/10 text-[#27397F] dark:text-[#3FA9DF]'>
                <Icon icon={item.icon} className='w-7 h-7' />
              </div>
              <h4 className='text-sm font-bold text-slate-800 dark:text-white'>{item.title}</h4>
              <p className='text-xs text-slate-500 dark:text-slate-400 leading-snug'>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
