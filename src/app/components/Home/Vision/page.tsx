'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Briefcase, Cpu, GraduationCap, Users } from 'lucide-react'
import Link from 'next/link'

import Hero from './Hero'
import DonutChartFutureJobs from '../../Charts/DonutChartFutureJobs'
import RadarChartSkills from '../../Charts/RadarChartSkills'
import RoundedBarChartOpportunities from '../../Charts/RoundedBarChartOpportunities'
// SmoothLineChartVision kept for potential future use in this section layout
// import SmoothLineChartVision from '../../Charts/SmoothLineChartVision'

type FaqItem = {
  question: string
  answer: string
}

type FeatureCardProps = {
  icon: React.ElementType
  title: string
  description: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
}

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.2 },
}

const featureListVariants = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const featureCardVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
}

const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({
  value,
  suffix,
}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame: number
    const duration = 900
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(value * eased))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}


const FeatureCard: React.FC<FeatureCardProps> = ({ icon: IconComponent, title, description }) => (
  <motion.div
    variants={featureCardVariants}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
    className='group flex flex-col gap-3 rounded-2xl bg-white/85 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-primary/10 backdrop-blur-sm dark:bg-slate-900/80 dark:ring-white/10'>
    <div className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-black/15'>
      <IconComponent className='h-5 w-5' aria-hidden='true' />
    </div>
    <div className='space-y-1'>
      <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>{title}</h3>
      <p className='text-xs sm:text-sm text-slate-600 dark:text-slate-300'>{description}</p>
    </div>
  </motion.div>
)

const BridgeStep: React.FC<{
  icon: string
  title: string
  subtitle: string
}> = ({ icon, title, subtitle }) => (
  <div className='relative flex flex-col items-center text-center'>
    <div className='relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-lg shadow-black/10'>
      <Icon icon={icon} className='h-7 w-7' />
    </div>
    <div className='mt-3 space-y-1'>
      <p className='text-sm font-semibold text-[#0A004B] dark:text-white'>
        {title}
      </p>
      <p className='text-xs text-slate-500 dark:text-slate-300'>{subtitle}</p>
    </div>
  </div>
)

const FaqAccordion: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className='space-y-3'>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <motion.div
            key={item.question}
            {...fadeInUp}
            transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
            className='overflow-hidden rounded-2xl border border-slate-200/70 bg-white/60 shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70'>
            <button
              type='button'
              className='flex w-full items-center justify-between px-4 py-3 text-left sm:px-5 sm:py-4'
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}>
              <span className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                {item.question}
              </span>
              <Icon
                icon={
                  isOpen ? 'solar:minus-circle-outline' : 'solar:add-circle-outline'
                }
                className='h-5 w-5 text-primary'
                aria-hidden='true'
              />
            </button>
            <motion.div
              initial={false}
              animate={{
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}>
              {isOpen && (
                <div className='px-4 pb-4 text-xs text-slate-600 sm:px-5 sm:text-sm dark:text-slate-200'>
                  {item.answer}
                </div>
              )}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

const SourcesSection: React.FC = () => {
  const sources = [
    {
      stat: "40% des emplois transformés par l'IA d'ici 2030",
      organization: 'Fonds Monétaire International (FMI)',
      date: 'Janvier 2024',
      title: "Gen-AI: Artificial Intelligence and the Future of Work",
      url: 'https://www.imf.org/en/Publications/Staff-Discussion-Notes/Issues/2024/01/14/Gen-AI-Artificial-Intelligence-and-the-Future-of-Work-542379',
      type: 'Rapport officiel',
      icon: 'mdi:file-document',
    },
    {
      stat: "85% des métiers de 2030 n'existent pas encore",
      organization: 'Adecco Group & Dell Technologies',
      date: '2021',
      title: 'World Economic Forum - Future of Jobs Report',
      url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/',
      type: 'Étude mondiale',
      icon: 'mdi:briefcase',
    },
    {
      stat: '70% des entreprises investiront massivement dans l’IA',
      organization: 'McKinsey & Company',
      date: '2023',
      title: "The State of AI in 2023: Generative AI's breakout year",
      url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
      type: 'Enquête mondiale',
      icon: 'mdi:chart-line',
    },
  ]

  return (
    <motion.section
      {...fadeInUp}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='rounded-3xl bg-white/95 p-6 text-slate-900 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/80 backdrop-blur-sm dark:bg-slate-950/95 dark:text-slate-100 dark:shadow-2xl dark:shadow-cyan-500/10 dark:ring-cyan-400/30'>
      {/* Header */}
      <div className='mb-6 flex items-center gap-3 border-b border-slate-700 pb-4'>
        <Icon
          icon='solar:book-bookmark-bold-duotone'
          className='h-7 w-7 text-cyan-300'
        />
        <div>
          <h3 className='text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
            Sources et références
          </h3>
          <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>
            Toutes nos statistiques proviennent d&apos;organismes internationaux reconnus
          </p>
        </div>
      </div>

      {/* Sources List */}
      <div className='space-y-5'>
        {sources.map((source, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className='group rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800/70'>
            {/* Stat highlight */}
            <div className='mb-3 flex items-start gap-3'>
              <div className='mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-600/10 dark:from-cyan-500/20 dark:to-blue-600/20'>
                <Icon icon={source.icon} className='h-4 w-4 text-cyan-600 dark:text-cyan-300' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-semibold text-slate-900 dark:text-white'>{source.stat}</p>
                <span className='mt-1 inline-block rounded-full bg-cyan-500/5 px-2 py-0.5 text-[10px] font-medium text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300'>
                  {source.type}
                </span>
              </div>
            </div>

            {/* Source details */}
            <div className='ml-11 space-y-1.5 text-xs'>
              <div className='flex items-center gap-2'>
                <Icon icon='mdi:domain' className='h-3.5 w-3.5 text-slate-400' />
                <span className='text-slate-600 dark:text-slate-300'>
                  <strong className='text-slate-900 dark:text-white'>{source.organization}</strong>
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Icon icon='mdi:calendar' className='h-3.5 w-3.5 text-slate-400' />
                <span className='text-slate-500 dark:text-slate-400'>{source.date}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Icon
                  icon='mdi:file-document-outline'
                  className='h-3.5 w-3.5 text-slate-400'
                />
                <span className='text-slate-600 dark:text-slate-400'>{source.title}</span>
              </div>
            </div>

            {/* Link button */}
            <a
              href={source.url}
              target='_blank'
              rel='noopener noreferrer'
              className='ml-11 mt-3 inline-flex items-center gap-2 rounded-lg bg-cyan-500/5 px-3 py-1.5 text-xs font-medium text-cyan-700 transition hover:bg-cyan-500/10 hover:text-cyan-800 group-hover:gap-3 dark:bg-cyan-500/10 dark:text-cyan-300 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-200'>
              Consulter le rapport complet
              <Icon icon='mdi:arrow-right' className='h-4 w-4' />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className='mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/30'>
        <div className='mb-3 flex items-center gap-2'>
          <Icon icon='mdi:information' className='h-5 w-5 text-cyan-400' />
          <h4 className='text-xs font-semibold uppercase tracking-wider text-cyan-300'>
            Autres ressources recommandées
          </h4>
        </div>
        <ul className='space-y-2 text-xs text-slate-400'>
          <li className='flex items-start gap-2'>
            <span className='mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400' />
            <a
              href='https://www.oecd.org/employment/future-of-work/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-cyan-300 hover:underline'>
              OCDE - The Future of Work
            </a>
          </li>
          <li className='flex items-start gap-2'>
            <span className='mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400' />
            <a
              href='https://www.brookings.edu/articles/what-jobs-are-affected-by-ai/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-cyan-300 hover:underline'>
              Brookings Institution - AI Impact on Jobs
            </a>
          </li>
          <li className='flex items-start gap-2'>
            <span className='mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400' />
            <a
              href='https://www.pwc.com/gx/en/issues/data-and-analytics/artificial-intelligence.html'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-cyan-300 hover:underline'>
              PwC - Global AI Study
            </a>
          </li>
        </ul>
      </div>

      {/* Footer note */}
      <div className='mt-5 flex items-start gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-700'>
        <Icon icon='mdi:shield-check' className='mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400' />
        <p>
          <strong className='text-slate-400'>Vérification régulière :</strong> Nos statistiques sont
          mises à jour chaque trimestre pour refléter les dernières tendances du marché mondial de
          l&apos;IA. Dernière mise à jour : Décembre 2024.
        </p>
      </div>
    </motion.section>
  )
}

export default function NotreVisionPage() {
  const faqItems: FaqItem[] = [
    {
      question: 'À qui s’adresse INOTEQIA Academy ?',
      answer:
        'Aux collégiens et lycéens curieux, motivés et prêts à explorer l’intelligence artificielle, quel que soit leur niveau de départ.',
    },
    {
      question: 'Faut‑il déjà savoir programmer pour rejoindre un programme ?',
      answer:
        'Non. Nos parcours sont conçus par niveau : introduction, initiation puis approfondissement, avec un accompagnement continu.',
    },
    {
      question:
        'Comment INOTEQIA prépare‑t‑elle concrètement aux études supérieures ?',
      answer:
        'Projets, défis, concours blancs, simulations d’oraux et construction d’un portfolio de projets IA valorisable dans les dossiers.',
    },
    {
      question: 'Quel est le niveau d’engagement demandé aux parents ?',
      answer:
        'Nous impliquons les parents par des bilans réguliers, des démos de projets et des temps d’échange autour de l’orientation.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Vision Content Section */}
      <section
        id='vision'
        aria-labelledby='vision-heading'
        className='relative bg-gradient-to-b from-secondary/60 via-secondary/30 to-transparent py-20 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950'>
        {/* decorative background */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.28),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.4),transparent_55%)]'
        />

        <div className='container mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8'>
          {/* Bridge visual section */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] lg:items-center'>
            <div className='space-y-5 text-center md:text-left'>
              <p className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10'>
                <span className='h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                Notre vision
              </p>
              <h2
                id='vision-heading'
                className='text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
                Former une génération prête à affronter l&apos;avenir avec l&apos;IA
              </h2>
              <div className='mx-auto max-w-3xl space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300'>
                <p>
                  INOTEQIA Academy se donne pour mission de devenir la référence tunisienne en
                  matière de formation IA pour les jeunes.
                </p>
              </div>

              <motion.div
                variants={featureListVariants}
                initial='initial'
                whileInView='whileInView'
                viewport={{ once: true, amount: 0.3 }}
                className='mt-6 rounded-2xl border border-primary/10 bg-white/80 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-sm dark:border-white/5 dark:bg-slate-900/70'>
                <p className='mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary/80 dark:text-cyan-300'>
                  Nous construisons un pont solide entre
                </p>

                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                  <FeatureCard
                    icon={GraduationCap}
                    title='Le système scolaire'
                    description='Le système scolaire et ses limites actuelles'
                  />
                  <FeatureCard
                    icon={Cpu}
                    title='Les innovations technologiques'
                    description='Les innovations technologiques qui redéfinissent les compétences'
                  />
                  <FeatureCard
                    icon={Briefcase}
                    title="Les besoins du marché de l'emploi"
                    description="Les besoins réels et évolutifs du marché de l'emploi"
                  />
                  <FeatureCard
                    icon={Users}
                    title='Les attentes des parents & entreprises'
                    description='Les attentes concrètes des parents et des entreprises'
                  />
                </div>
              </motion.div>

              <div className='mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start'>
                <Link
                  href='/#contact'
                  className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/30 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'>
                  Découvrir nos programmes
                </Link>
                <button
                  type='button'
                  className='inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white/70 px-5 py-2.5 text-sm font-semibold text-[#0A004B] shadow-sm backdrop-blur hover:border-primary hover:text-primary dark:bg-slate-900/70 dark:text-white'>
                  <Icon
                    icon='mdi:school'
                    className='h-5 w-5 text-primary'
                  />
                  Voir un exemple de parcours
                </button>
              </div>

              <div className='mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 md:justify-start dark:text-slate-300'>
                <div className='inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm backdrop-blur dark:bg-slate-900/60'>
                  <Icon
                    icon='solar:users-group-rounded-bold-duotone'
                    className='h-4 w-4 text-primary'
                  />
                  <span>+200 élèves accompagnés</span>
                </div>
                <div className='inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm backdrop-blur dark:bg-slate-900/60'>
                  <Icon
                    icon='solar:shield-check-bold-duotone'
                    className='h-4 w-4 text-emerald-500'
                  />
                  <span>Partenariats avec établissements &amp; entreprises</span>
                </div>
              </div>
            </div>

            {/* Bridge visual */}
            <motion.div
              {...fadeIn}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className='relative rounded-3xl bg-white/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur-2xl dark:bg-slate-900/80 dark:ring-white/10'>
              <p className='text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
                Le pont INOTEQIA
              </p>
              <p className='mt-1 text-sm text-slate-600 dark:text-slate-200'>
                Un parcours structuré qui relie l&apos;école, la technologie et le monde professionnel.
              </p>
              <div className='mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4'>
                <BridgeStep
                  icon='mdi:school'
                  title='École'
                  subtitle='Programmes alignés avec les attendus scolaires.'
                />
                <BridgeStep
                  icon='solar:cpu-bolt-bold-duotone'
                  title='Technologie'
                  subtitle='IA, algorithmes, culture numérique avancée.'
                />
                <BridgeStep
                  icon='solar:case-round-bold-duotone'
                  title='Emploi'
                  subtitle='Compétences recherchées par les entreprises.'
                />
                <BridgeStep
                  icon='solar:hand-heart-bold-duotone'
                  title='Parents &amp; entreprises'
                  subtitle='Confiance, visibilité et accompagnement.'
                />
              </div>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-x-4 bottom-2 h-1 rounded-full bg-gradient-to-r from-[#00C3D9]/40 via-[#0091E6]/60 to-[#0067E0]/60 blur-[2px]'
              />
            </motion.div>
          </motion.div>

        {/* Macro trends + line chart */}
        <motion.section
          {...fadeInUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='space-y-8 sm:space-y-10'>
          {/* Title */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='space-y-2 text-center md:text-left'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Tendances du marché
            </p>
            <h2 className='text-xl font-semibold text-[#0A004B] sm:text-2xl dark:text-white'>
              Un monde où l’IA transforme profondément les métiers
            </h2>
            <p className='text-sm sm:text-base text-slate-700 dark:text-slate-200'>
              La part des emplois transformés par l’IA augmente chaque année et redessine en profondeur les
              attentes du marché. Le graphique ci‑dessous illustre cette évolution et montre pourquoi il est
              essentiel de préparer dès aujourd’hui les élèves à ce futur.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={{
              initial: {},
              whileInView: {
                transition: { staggerChildren: 0.08 },
              },
            }}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5'>
            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className='group flex flex-col justify-between rounded-2xl bg-white/80 p-4 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80 backdrop-blur-xl dark:bg-slate-900/80 dark:ring-slate-700/70'>
              <p className='text-xs font-medium uppercase tracking-[0.22em] text-primary/90 dark:text-cyan-300'>
                40%
              </p>
              <p className='mt-2 text-sm sm:text-base text-slate-700 dark:text-slate-200'>
                des emplois mondiaux seront impactés par l’IA d’ici 2030.
              </p>
            </motion.div>

            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.03 }}
              className='group flex flex-col justify-between rounded-2xl bg-white/80 p-4 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80 backdrop-blur-xl dark:bg-slate-900/80 dark:ring-slate-700/70'>
              <p className='text-xs font-medium uppercase tracking-[0.22em] text-primary/90 dark:text-cyan-300'>
                85%
              </p>
              <p className='mt-2 text-sm sm:text-base text-slate-700 dark:text-slate-200'>
                des métiers de demain n&apos;existent pas encore.
              </p>
            </motion.div>

            <motion.div
              variants={{
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.06 }}
              className='group flex flex-col justify-between rounded-2xl bg-white/80 p-4 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80 backdrop-blur-xl dark:bg-slate-900/80 dark:ring-slate-700/70'>
              <p className='text-xs font-medium uppercase tracking-[0.22em] text-primary/90 dark:text-cyan-300'>
                70%
              </p>
              <p className='mt-2 text-sm sm:text-base text-slate-700 dark:text-slate-200'>
                des entreprises investiront massivement dans l’IA.
              </p>
            </motion.div>
          </motion.div>

          {/* Chart block + footer note */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='space-y-3 rounded-3xl bg-white/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/80 backdrop-blur-2xl dark:bg-slate-900/90 dark:ring-slate-700/80'>
            <div className='space-y-1'>
              <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                Horizon 2024 – 2030
              </p>
              <p className='text-xs sm:text-sm text-slate-600 dark:text-slate-200'>
                Projection mondiale des métiers impactés par l&apos;intelligence artificielle.
              </p>
            </div>

            <div
              aria-label="Projection mondiale des métiers impactés par l'intelligence artificielle"
              className='mt-3 flex h-56 items-center justify-center rounded-2xl border border-dashed border-primary/25 bg-gradient-to-br from-[#00C3D9]/5 via-[#0091E6]/5 to-[#0067E0]/5 px-4 py-3 dark:border-cyan-400/40'>
              <div className='flex w-full max-w-xl items-end justify-between gap-2'>
                {Array.from({ length: 7 }).map((_, index) => {
                  const height = 30 + index * 10
                  return (
                    <div
                      key={index}
                      className='flex flex-1 flex-col items-center gap-1'>
                      <div
                        className='w-full rounded-t-xl bg-gradient-to-t from-[#0067E0] via-[#0091E6] to-[#00C3D9] shadow-sm shadow-[#0091E6]/35 dark:shadow-cyan-500/30'
                        style={{ height }}
                      />
                      <span className='h-1 w-1 rounded-full bg-primary/60 dark:bg-cyan-300/80' />
                    </div>
                  )
                })}
              </div>
            </div>

            <p className='pt-2 text-[11px] text-slate-500 dark:text-slate-400'>
              Source: FMI, WEF, McKinsey (2024).
            </p>
          </motion.div>
        </motion.section>

        {/* Future jobs donut + journey timeline */}
        <motion.section
          {...fadeInUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start'>
          <div className='space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Métiers de demain
            </p>
            <h2 className='text-xl font-semibold text-[#0A004B] sm:text-2xl dark:text-white'>
              Préparer les élèves à un monde en constante invention
            </h2>
            <p>Dans un monde où :</p>
            <ul className='space-y-1'>
              <li>• 40&nbsp;% des emplois mondiaux seront transformés par l’IA d’ici 2030,</li>
              <li>• 85&nbsp;% des métiers de demain n’existent pas encore,</li>
              <li>• les entreprises recherchent des profils créatifs capables de collaborer avec l’IA,</li>
            </ul>
            <p>
              nous préparons les élèves à devenir des innovateurs, des créateurs de solutions, des esprits
              critiques et autonomes. Le schéma ci‑dessous met en lumière ce déséquilibre croissant entre les
              métiers actuels et ceux qui restent à inventer.
            </p>
            <div
              aria-label='Répartition entre métiers actuels et métiers de demain'
              className='mt-4 w-full'>
              <DonutChartFutureJobs />
            </div>
          </div>

          {/* Journey timeline */}
          <motion.div
            {...fadeIn}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
            className='relative rounded-3xl bg-white/90 p-5 text-slate-900 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/80 backdrop-blur-sm dark:bg-slate-950/95 dark:text-slate-100 dark:ring-cyan-400/40 dark:shadow-cyan-500/20'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
              Parcours élève ⟶ professionnel
            </p>
            <p className='mt-2 text-sm text-slate-600 dark:text-slate-200'>
              Une trajectoire progressive, de la découverte à la maîtrise, jalonnée de projets concrets.
            </p>
            <ol className='mt-5 space-y-4'>
              {[
                {
                  title: 'Découverte & curiosité',
                  desc: 'Comprendre ce qu’est l’IA, ses usages et ses limites. Développer une première culture numérique.',
                },
                {
                  title: 'Pratique & expérimentation',
                  desc: 'Créer des mini‑projets, manipuler des modèles, explorer des cas d’usage proches de leur quotidien.',
                },
                {
                  title: 'Projets d’impact',
                  desc: 'Imaginer et prototyper des solutions IA pour l’éducation, la santé, le sport, l’environnement…',
                },
                {
                  title: 'Orientation & projection',
                  desc: 'Construire un portfolio, préparer concours et dossiers, se projeter dans les études et métiers de demain.',
                },
              ].map((step, index) => (
                <li key={step.title} className='relative flex gap-3'>
                  <div className='mt-1 flex flex-col items-center'>
                    <div className='flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#00C3D9] to-[#0067E0] text-[11px] font-semibold text-white'>
                      {index + 1}
                    </div>
                    {index < 3 && (
                      <div className='mt-1 h-8 w-px bg-gradient-to-b from-cyan-400/70 to-cyan-500/10' />
                    )}
                  </div>
                  <div className='space-y-1 text-xs sm:text-sm'>
                    <p className='font-semibold text-slate-900 dark:text-white'>{step.title}</p>
                    <p className='text-slate-600 dark:text-slate-300'>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.section>

        {/* Competencies + radar chart */}
        <motion.section
          {...fadeInUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] lg:items-center'>
          <div className='space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Compétences clés
            </p>
            <h2 className='text-xl font-semibold text-[#0A004B] sm:text-2xl dark:text-white'>
              Allier excellence scientifique et soft skills humains
            </h2>
            <p>
              Nous développons chez chaque élève un équilibre entre compétences techniques de haut niveau et
              qualités humaines essentielles pour collaborer avec l’IA et les équipes.
            </p>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2 rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-700/60'>
                <div className='flex items-center gap-2'>
                  <Icon
                    icon='solar:atom-bold-duotone'
                    className='h-5 w-5 text-[#0091E6]'
                    aria-hidden='true'
                  />
                  <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                    Compétences scientifiques avancées
                  </h3>
                </div>
                <ul className='mt-2 space-y-1 text-xs sm:text-sm'>
                  <li>• IA, modèles d’apprentissage, algorithmes</li>
                  <li>• Pensée logique et abstraction</li>
                  <li>• Culture numérique profonde</li>
                </ul>
              </div>

              <div className='space-y-2 rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/70 backdrop-blur dark:bg-slate-900/70 dark:ring-slate-700/60'>
                <div className='flex items-center gap-2'>
                  <Icon
                    icon='solar:people-speak-rounded-bold-duotone'
                    className='h-5 w-5 text-emerald-500'
                    aria-hidden='true'
                  />
                  <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                    Compétences humaines &amp; soft skills
                  </h3>
                </div>
                <ul className='mt-2 space-y-1 text-xs sm:text-sm'>
                  <li>• Collaboration</li>
                  <li>• Communication</li>
                  <li>• Leadership</li>
                  <li>• Esprit critique</li>
                  <li>• Créativité</li>
                </ul>
              </div>
            </div>

            <div className='mt-3 rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3 text-xs text-slate-700 dark:border-cyan-400/40 dark:bg-cyan-500/5 dark:text-slate-200'>
              <p className='font-semibold text-[#0A004B] dark:text-white'>
                Notre conviction&nbsp;:
              </p>
              <p>
                un élève qui comprend l’IA aujourd’hui, dans toutes ses dimensions, devient un adulte
                indispensable demain.
              </p>
            </div>
          </div>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='p-2 sm:p-3'>
            <h3 className='mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-primary'>
              Profil de compétences
            </h3>
            <p className='mb-4 text-xs text-slate-600 dark:text-slate-300'>
              Visualisation de l’équilibre entre compétences techniques et humaines cultivées chez nos
              élèves.
            </p>
            <div
              aria-label='Radar des compétences développées chez les élèves'
              className='h-72 w-full sm:h-80'>
              <RadarChartSkills />
            </div>
          </motion.div>
        </motion.section>

        {/* Opportunities + bar chart + trust */}
        <motion.section
          {...fadeInUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='space-y-10'>
          <div className='grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.05fr)] lg:items-start'>
            <div className='space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200'>
              <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
                Opportunités &amp; débouchés
              </p>
              <h2 className='text-xl font-semibold text-[#0A004B] sm:text-2xl dark:text-white'>
                Une longueur d’avance pour les études supérieures et le monde professionnel
              </h2>
              <p>
                INOTEQIA donne un avantage stratégique déterminant pour les concours, les parcours STEM, les
                écoles d’ingénieurs, les carrières technologiques et toutes les entreprises en recherche de
                talents IA.
              </p>
              <ul className='mt-3 grid gap-2 text-xs sm:grid-cols-2 sm:text-sm'>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                  <span>Concours exigeants et sélectifs</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                  <span>Parcours scientifiques et technologiques (STEM)</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                  <span>Écoles d’ingénieurs</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                  <span>Carrières technologiques et métiers de l’IA</span>
                </li>
                <li className='flex items-start gap-2 sm:col-span-2'>
                  <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                  <span>Entreprises innovantes en recherche de talents IA</span>
                </li>
              </ul>
            </div>

            <motion.div
              {...fadeIn}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className='rounded-3xl bg-white/90 p-4 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80 backdrop-blur-sm dark:bg-slate-900/90 dark:ring-slate-700/80'>
              <div className='flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                  <h3 className='text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-primary'>
                    Impact global sur le parcours
                  </h3>
                  <p className='mt-1 text-xs text-slate-600 dark:text-slate-300'>
                    Niveau de préparation des élèves pour chaque étape clé de leur avenir académique et
                    professionnel.
                  </p>
                </div>
                <p className='mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400'>
                  0% ⟶ 100% | Concours, STEM, écoles, carrières IA
                </p>
              </div>

              <div
                aria-label='Préparation aux concours, filières sélectives et carrières IA'
                className='mt-4 h-64 w-full sm:h-72'>
                <RoundedBarChartOpportunities />
              </div>
            </motion.div>
          </div>

          <div className='mt-16 grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] md:items-center'>
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='space-y-4 rounded-3xl bg-white/95 p-5 text-slate-900 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/80 backdrop-blur-sm dark:bg-slate-900/95 dark:text-slate-100 dark:shadow-cyan-500/20 dark:ring-cyan-400/40'>
              <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                Témoignages &amp; indicateurs de confiance
              </p>
              <p className='text-sm text-slate-700 dark:text-slate-100'>
                « Depuis qu’il suit le programme INOTEQIA, notre fils a gagné en assurance, en curiosité
                scientifique et en capacité à travailler en équipe. Il se projette enfin dans des études qui
                lui ressemblent. »
              </p>
              <p className='text-xs text-slate-500 dark:text-slate-300'>— Parent d’élève, niveau lycée</p>
              <div className='mt-3 grid gap-4 sm:grid-cols-3'>
                <div className='space-y-1'>
                  <p className='text-2xl font-semibold text-slate-900 dark:text-white'>
                    <AnimatedCounter value={95} suffix='%' />
                  </p>
                  <p className='text-xs text-slate-600 dark:text-slate-300'>
                    des parents constatent une progression de la confiance de leur enfant.
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-2xl font-semibold text-slate-900 dark:text-white'>
                    <AnimatedCounter value={90} suffix='%' />
                  </p>
                  <p className='text-xs text-slate-600 dark:text-slate-300'>
                    des élèves souhaitent poursuivre dans un parcours technologique ou scientifique.
                  </p>
                </div>
                <div className='space-y-1'>
                  <p className='text-2xl font-semibold text-slate-900 dark:text-white'>
                    <AnimatedCounter value={4} suffix='/5' />
                  </p>
                  <p className='text-xs text-slate-600 dark:text-slate-300'>
                    note moyenne de satisfaction des familles accompagnées.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className='space-y-4 rounded-3xl bg-white/80 p-5 shadow-md shadow-black/5 ring-1 ring-white/70 backdrop-blur-2xl dark:bg-slate-900/80 dark:ring-white/10'>
              <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                Une décision qui construit l’avenir dès aujourd’hui
              </h3>
              <p className='text-xs sm:text-sm text-slate-600 dark:text-slate-200'>
                Choisir INOTEQIA, c’est offrir aux élèves un terrain d’expérimentation sécurisé, exigeant et
                enthousiasmant, où l’IA devient un levier de créativité et non une source de crainte.
              </p>
              <Link
                href='/#contact'
                className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/30 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'>
                Réserver une session découverte
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Sources Section (détaillée) */}
        <SourcesSection />

        {/* FAQ */}
        <motion.section
          {...fadeInUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          aria-label='Questions fréquentes sur INOTEQIA Academy'
          className='space-y-5'>
          <div className='space-y-2 text-center md:text-left'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Questions fréquentes
            </p>
            <h2 className='text-xl font-semibold text-[#0A004B] sm:text-2xl dark:text-white'>
              Tout ce que vous souhaitez savoir avant d’inscrire votre enfant
            </h2>
            <p className='mx-auto max-w-3xl text-xs sm:text-sm text-slate-600 dark:text-slate-300'>
              Nous accompagnons les familles à chaque étape : choix du parcours, suivi des progrès et
              préparation des prochaines étapes académiques.
            </p>
          </div>
          <FaqAccordion items={faqItems} />
        </motion.section>
      </div>
    </section>
    </>
  )
}


