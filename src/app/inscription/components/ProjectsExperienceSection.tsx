'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fadeInUp } from './SectionHeading'

const projectItems = [
  { title: "Prédire le prix\nd'une maison", icon: 'solar:home-2-bold-duotone', color: 'text-[#0091E6]' },
  { title: 'Détecter certaines\nmaladies', icon: 'solar:health-bold-duotone', color: 'text-[#E14B4B]' },
  { title: 'Recommander\ndes produits', icon: 'solar:cart-large-2-bold-duotone', color: 'text-[#E19B3C]' },
  { title: 'Reconnaître\ndes plantes', icon: 'solar:leaf-bold-duotone', color: 'text-[#3CA35A]' },
  { title: 'Classer\ndes déchets', icon: 'solar:trash-bin-trash-bold-duotone', color: 'text-[#3CA35A]' },
  { title: 'Prévoir\nle trafic', icon: 'solar:signpost-bold-duotone', color: 'text-[#4490C7]' },
  { title: 'Créer un assistant\npédagogique', icon: 'solar:notebook-bold-duotone', color: 'text-[#27397F]' },
  { title: 'Reconnaître\ndes émotions', icon: 'solar:emoji-funny-square-bold-duotone', color: 'text-[#E19B3C]' },
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
        <div className='grid lg:grid-cols-2 gap-6 lg:gap-8'>
          {/* Left: Projects */}
          <motion.div
            {...fadeInUp}
            className='rounded-[24px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-sm p-6 sm:p-8'
          >
            <h3 className='text-lg sm:text-xl font-extrabold text-[#0A004B] dark:text-white mb-6'>
              Des projets inspirés du monde professionnel
            </h3>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {projectItems.map((p, idx) => (
                <div key={p.title ?? idx} className='flex flex-col items-center text-center gap-2'>
                  <div
                    className={`flex items-center justify-center w-11 h-11 rounded-xl bg-slate-50 dark:bg-white/5 ${p.color}`}
                  >
                    <Icon icon={p.icon} className='w-[22px] h-[22px]' />
                  </div>
                  <span className='text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-pre-line leading-snug'>
                    {p.title}
                  </span>
                </div>
              ))}
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