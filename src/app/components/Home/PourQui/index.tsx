'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
}

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
}

const cardVariant = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
}

const cibles = [
  {
    image: '/images/home/parentes.jpg',
    titre: 'Parents',
    description: "Accompagner votre enfant pour les métiers de demain grâce à l'IA",
    cta: 'Découvrir le parcours élève',
    href: '/inscription?role=Parent',   
    accent: 'from-[#27397F] to-[#4490C7]',
    label: 'Famille',
  },
  {
    image: '/images/home/school.jpg',
    titre: 'Établissements scolaires',
    description: "Intégrer l'IA dans le cursus scolaire avec un programme clé en main",
    cta: 'Devenir établissement partenaire',
    href: '/inscription?role=etablissement',   
    accent: 'from-[#2E5391] to-[#3FA9DF]',
    label: 'Éducation',
  },
  {
    image: '/images/home/entreprise.jpg',
    titre: 'Entreprises',
    description: "Offrir un avenir meilleur aux enfants de vos employés grâce à l'IA",
    cta: 'Explorer les partenariats',
    href: '/inscription?role=Entreprise',  
    accent: 'from-[#3FA9DF] to-[#27397F]',
    label: 'Partenaires',
  },
]   

const PourQui = () => {
  return (
    <section className='py-24 lg:py-32 bg-gradient-to-b from-transparent via-secondary/5 to-secondary/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>

        {/* Header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='text-center mb-14 lg:mb-20'
        >
          <p className='mb-3 text-xs font-semibold uppercase tracking-[0.22em]' style={{ color: '#4490C7' }}>
            Qui nous accompagnons
          </p>
          <h2 className='text-3xl sm:text-4xl font-bold'>
            <span className='text-gradient'>ZYNOVIA Academy</span>{' '}
            <span className='text-[#0A004B] dark:text-white'>s'adresse à :</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial='initial'
          whileInView='whileInView'
          viewport={{ once: true, amount: 0.2 }}
          className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'
        >
          {cibles.map((cible) => (
            <motion.div
              key={cible.titre}
              variants={cardVariant}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className='group relative flex flex-col overflow-hidden rounded-3xl ring-1 ring-slate-200/60 dark:ring-slate-700/50 shadow-[0_12px_40px_rgba(15,23,42,0.10)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.20)] transition-all duration-500 hover:-translate-y-2'
            >
              {/* Image */}
              <div className='relative h-64 w-full overflow-hidden'>
                <Image
                  src={cible.image}
                  alt={`Formation IA pour ${cible.titre} - ZYNOVIA Academy`}
                  fill
                  sizes='(max-width: 768px) 100vw, 33vw'
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                />
                {/* Dark overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10' />

                {/* Label pill */}
                <div className='absolute top-4 left-4'>
                  <span className='inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold tracking-wide text-white ring-1 ring-white/20'>
                    {cible.label}
                  </span>
                </div>

                {/* Title on image */}
                <h3 className='absolute bottom-5 left-5 right-5 text-2xl font-bold text-white leading-tight'>
                  {cible.titre}
                </h3>

                {/* Accent bar on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cible.accent} translate-y-full group-hover:translate-y-0 transition-transform duration-300`} />
              </div>

              {/* Content */}
              <div className='flex flex-col flex-1 gap-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-7 py-6'>
                <p className='text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed flex-1'>
                  {cible.description}
                </p>

                <Link
                  href={cible.href}
                  className='group/link inline-flex items-center justify-between gap-3 w-full px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg'
                  style={{ background: `linear-gradient(to right, ${cible.accent.includes('27397F') ? '#27397F' : '#2E5391'}, #4490C7)` }}
                >
                  {cible.cta}
                  <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1 shrink-0' />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default PourQui