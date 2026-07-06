'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fadeInUp } from './SectionHeading'

const projectItems = [
  { title: "Prédire le prix\nd'une maison", icon: 'solar:home-2-bold-duotone', color: '#0091E6', bg: 'rgba(0, 145, 230, 0.08)' },
  { title: 'Détecter certaines\nmaladies', icon: 'solar:pulse-bold-duotone', color: '#E14B4B', bg: 'rgba(225, 75, 75, 0.08)' },
  { title: 'Recommander\ndes produits', icon: 'solar:bag-heart-bold-duotone', color: '#E19B3C', bg: 'rgba(225, 155, 60, 0.08)' },
  { title: 'Reconnaître\ndes plantes', icon: 'solar:leaf-bold-duotone', color: '#3CA35A', bg: 'rgba(60, 163, 90, 0.08)' },
  { title: 'Classer\ndes déchets', icon: 'solar:trash-bin-minimalistic-bold-duotone', color: '#3CA35A', bg: 'rgba(60, 163, 90, 0.08)' },
  { title: 'Prévoir\nle trafic', icon: 'solar:routing-bold-duotone', color: '#4490C7', bg: 'rgba(68, 144, 199, 0.08)' },
  { title: 'Créer un assistant\npédagogique', icon: 'solar:square-academic-cap-bold-duotone', color: '#27397F', bg: 'rgba(39, 57, 127, 0.08)' },
  { title: 'Reconnaître\ndes émotions', icon: 'solar:emoji-funny-square-bold-duotone', color: '#E19B3C', bg: 'rgba(225, 155, 60, 0.08)' },
]

const stats = [
  { value: '+2 000', label: 'jeunes accompagnés', color: 'text-[#D6249F]' },
  { value: '+1 960', label: 'heures de formation', color: 'text-[#3FA9DF]' },
  { value: '+50', label: 'projets réalisés', color: 'text-[#3FA9DF]' },
  { value: '', label: 'Des centaines  de certificats délivrés', color: 'text-[#0A004B]' },
]

export default function ProjectsExperienceSection() {
  return (
    <section className='py-16 lg:py-20'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-10'>
          {/* Left: Projects */}
          <motion.div
            {...fadeInUp}
            className='rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm p-6 sm:p-10 flex flex-col justify-between'
          >
            <div>
              <h3 className='text-xl sm:text-2xl font-extrabold text-[#0A004B] dark:text-white mb-8 tracking-tight'>
                Des projets inspirés du monde professionnel
              </h3>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-5'>
                {projectItems.map((p, idx) => (
                  <div
                    key={p.title ?? idx}
                    className='group flex flex-col items-center text-center justify-between gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100/80 dark:border-white/5 hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:border-slate-200/80 dark:hover:border-white/10 transition-all duration-300'
                  >
                    <div
                      className='flex items-center justify-center w-14 h-14 rounded-2xl transition-transform duration-300 group-hover:scale-110 shadow-inner'
                      style={{ backgroundColor: p.bg, color: p.color }}
                    >
                      <Icon icon={p.icon} className='w-7 h-7' />
                    </div>
                    <span className='text-[13px] sm:text-[14px] font-bold text-slate-700 dark:text-slate-300 whitespace-pre-line leading-snug flex-grow flex items-center justify-center'>
                      {p.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Experience / stats */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='rounded-[24px] bg-[#0A004B] text-white p-6 sm:p-8 flex flex-col justify-between'
          >
            <div>
              <h3 className='text-lg sm:text-xl font-extrabold mb-4 leading-snug'>
                L&apos;expérience qui a donné naissance à ZYNOVIA
              </h3>
              <p className='text-sm sm:text-base text-white/80 leading-relaxed mb-3'>
                Avant de créer ZYNOVIA, notre équipe a conçu, organisé et animé des programmes de formation en
                Intelligence Artificielle auprès de milliers de jeunes.
              </p>
              <p className='text-sm sm:text-base text-white/80 leading-relaxed'>
                Aujourd&apos;hui, nous mettons cette expérience au service des familles à travers ZYNOVIA.
              </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8'>
              {stats.map((s, idx) => (
                <div key={s.label ?? idx} className='rounded-2xl bg-white p-4 text-center'>
                  <p className={`text-lg sm:text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                  <p className='text-xs sm:text-sm text-[#0A004B]/80 mt-1 leading-snug'>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}