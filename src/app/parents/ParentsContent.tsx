'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  Star,
  Sparkles,
  LineChart,
  Brain,
  Lightbulb,
} from 'lucide-react'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariant = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
}

type FaqItem = {
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    question: 'À qui s’adresse INOTEQIA ?',
    answer:
      'INOTEQIA Academy s’adresse aux collégiens et lycéens curieux, motivés et intéressés par la technologie, qu’ils soient débutants ou déjà avancés.',
  },
  {
    question: 'Faut-il déjà programmer ?',
    answer:
      'Non, ce n’est pas nécessaire. Les parcours sont conçus par niveaux, avec une progression adaptée et un accompagnement étape par étape.',
  },
  {
    question: 'Comment accompagnez-vous les parents ?',
    answer:
      'Les parents sont tenus informés grâce à des bilans réguliers, des retours personnalisés, des démos de projets et des temps d’échanges dédiés.',
  },
  {
    question: 'Comment cela aide-t-il pour les études ?',
    answer:
      'Les programmes renforcent les matières STEM, développent la logique, l’autonomie et la capacité à présenter un projet, des atouts clés pour l’orientation et les études supérieures.',
  },
]

const ParentsContent = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  return (
    <main className='bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* HERO */}
      <section className='relative py-24 lg:py-32'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.25),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.4),transparent_55%)]'
        />
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-center'
          >
            <div className='space-y-5 text-center md:text-left'>
              <p className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:text-cyan-300 dark:ring-white/10'>
                <span className='h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                Page Parents
              </p>
              <h1 className='text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
                Page Parents
              </h1>
              <p className='text-lg font-medium text-primary/90 dark:text-cyan-300'>
                Parce que l’avenir de votre enfant mérite une préparation exceptionnelle
              </p>
              <p className='max-w-2xl text-sm sm:text-base text-slate-700 dark:text-slate-300'>
                INOTEQIA Academy accompagne les familles en offrant aux enfants un environnement
                moderne, stimulant et parfaitement aligné avec les besoins du monde de demain.
              </p>

              <div className='mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start'>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/30 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                >
                  Réserver une session découverte
                </Link>
                <Link
                  href='/programmes'
                  className='inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#0A004B] shadow-sm backdrop-blur hover:border-primary hover:text-primary dark:bg-slate-900/70 dark:text-white'
                >
                  Voir les programmes
                </Link>
              </div>

              <div className='mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 md:justify-start dark:text-slate-300'>
                <div className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm backdrop-blur dark:bg-slate-900/70'>
                  <Users className='h-4 w-4 text-primary dark:text-cyan-300' />
                  <span>Accompagnement dédié aux familles</span>
                </div>
                <div className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm backdrop-blur dark:bg-slate-900/70'>
                  <ShieldCheck className='h-4 w-4 text-emerald-500' />
                  <span>Cadre sécurisé et bienveillant</span>
                </div>
              </div>
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
              className='relative rounded-3xl bg-white/85 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur-2xl dark:bg-slate-900/90 dark:ring-white/10'
            >
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#00C3D9]/50 via-[#0091E6]/40 to-[#0067E0]/40 blur-2xl'
              />
              <div className='relative space-y-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                  Ce que recherchent les parents
                </p>
                <div className='space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-200'>
                  <p>
                    Un apprentissage sérieux mais motivant, qui parle à la fois aux exigences
                    scolaires et aux passions des élèves.
                  </p>
                  <p>
                    Une équipe de confiance, capable de traduire les enjeux de l’IA en projets
                    concrets, sécurisés et valorisants pour le futur de votre enfant.
                  </p>
                </div>
                <div className='mt-4 grid grid-cols-2 gap-3 text-xs sm:text-sm'>
                  <div className='rounded-2xl bg-slate-50/90 p-3 ring-1 ring-slate-200/80 dark:bg-slate-900/80 dark:ring-slate-700/70'>
                    <div className='mb-1 flex items-center gap-2 text-slate-700 dark:text-slate-100'>
                      <LineChart className='h-4 w-4 text-primary dark:text-cyan-300' />
                      <span className='font-semibold'>Résultats scolaires</span>
                    </div>
                    <p className='text-[11px] text-slate-500 dark:text-slate-300'>
                      Un impact concret sur les matières STEM et l’orientation.
                    </p>
                  </div>
                  <div className='rounded-2xl bg-slate-50/90 p-3 ring-1 ring-slate-200/80 dark:bg-slate-900/80 dark:ring-slate-700/70'>
                    <div className='mb-1 flex items-center gap-2 text-slate-700 dark:text-slate-100'>
                      <HeartHandshake className='h-4 w-4 text-rose-500' />
                      <span className='font-semibold'>Épanouissement</span>
                    </div>
                    <p className='text-[11px] text-slate-500 dark:text-slate-300'>
                      Confiance, autonomie et plaisir d’apprendre avec l’IA.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Pourquoi les parents choisissent INOTEQIA ? */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Pourquoi les parents choisissent INOTEQIA ?
            </p>
            <h2 className='mt-3 text-2xl font-semibold text-[#0A004B] sm:text-3xl dark:text-white'>
              Un partenaire de confiance pour l’éducation de votre enfant
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'
          >
            {[
              {
                title: 'Un apprentissage moderne, utile et motivant',
                icon: Sparkles,
              },
              {
                title: 'Un impact visible sur les résultats scolaires',
                icon: LineChart,
              },
              {
                title: 'Une montée en confiance et en autonomie',
                icon: Star,
              },
              {
                title: 'Un accompagnement structuré',
                icon: Users,
              },
              {
                title: 'Un environnement sûr, valorisant et inspirant',
                icon: ShieldCheck,
              },
            ].map(({ title, icon: Icon }, index) => (
              <motion.div
                key={title}
                variants={cardVariant}
                transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.03 }}
                className='group flex flex-col gap-3 rounded-3xl bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'
              >
                <div className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40'>
                  <Icon className='h-5 w-5' />
                </div>
                <p className='text-sm font-semibold text-[#0A004B] dark:text-white'>{title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION – Ce que votre enfant saura faire */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Ce que votre enfant saura faire
            </p>
            <h2 className='mt-3 text-2xl font-semibold text-[#0A004B] sm:text-3xl dark:text-white'>
              Des compétences concrètes pour l’école et pour demain
            </h2>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='mt-8 rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
          >
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
              {[
                'Comprendre les bases de l’IA et des algorithmes',
                'Créer des mini-projets technologiques',
                'Utiliser l’IA de manière responsable',
                'Développer logique, analyse et esprit critique',
                'Présenter un projet devant un jury',
                'Collaborer efficacement',
              ].map((item, index) => (
                <div
                  key={item}
                  className='flex items-start gap-3 rounded-2xl bg-slate-50/90 px-3 py-3 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 dark:bg-slate-900/80 dark:ring-slate-700/70'
                >
                  <div className='mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9]/15 via-[#0091E6]/20 to-[#0067E0]/15 text-primary dark:text-cyan-300'>
                    {index % 2 === 0 ? (
                      <Brain className='h-4 w-4' />
                    ) : (
                      <Lightbulb className='h-4 w-4' />
                    )}
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Bénéfices parents */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Bénéfices parents
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
          >
            {[
              '+60 % d’amélioration STEM',
              '95 % des parents voient un gain de confiance',
              '90 % des élèves poursuivent dans la tech',
              '4/5 satisfaction globale',
            ].map((label) => (
              <motion.div
                key={label}
                variants={cardVariant}
                className='rounded-2xl bg-white/90 p-4 text-sm text-slate-700 shadow-md shadow-slate-900/5 ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:text-slate-200 dark:ring-slate-700/80'
              >
                <div className='flex items-center gap-2'>
                  <Star className='h-4 w-4 text-amber-400' />
                  <p className='font-semibold'>{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION – Notre engagement */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Notre engagement
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-3'
          >
            {[
              {
                title: 'Transparence — Rapports réguliers et suivi des progrès',
                icon: LineChart,
              },
              {
                title: 'Sécurité — Un cadre bienveillant et responsable',
                icon: ShieldCheck,
              },
              {
                title: 'Orientation — Conseils pour STEM, concours et études supérieures',
                icon: HeartHandshake,
              },
            ].map(({ title, icon: Icon }) => (
              <motion.div
                key={title}
                variants={cardVariant}
                className='flex flex-col gap-3 rounded-3xl bg-white/95 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
              >
                <div className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9]/20 via-[#0091E6]/30 to-[#0067E0]/20 text-primary dark:text-cyan-300'>
                  <Icon className='h-5 w-5' />
                </div>
                <p className='text-sm font-semibold text-[#0A004B] dark:text-white'>{title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION – FAQ */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='space-y-2 text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              FAQ
            </p>
            <h2 className='text-2xl font-semibold text-[#0A004B] sm:text-3xl dark:text-white'>
              Questions fréquentes des parents
            </h2>
          </motion.div>

          <div className='mt-6 space-y-3'>
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <motion.div
                  key={item.question}
                  {...fadeInUp}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
                  className='overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70'
                >
                  <button
                    type='button'
                    className='flex w-full items-center justify-between px-4 py-3 text-left sm:px-5 sm:py-4'
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                      {item.question}
                    </span>
                    <span className='text-primary dark:text-cyan-300'>
                      {isOpen ? '–' : '+'}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
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
        </div>
      </section>

      {/* FINAL CTA */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='rounded-3xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] p-[1px] shadow-[0_22px_55px_rgba(0,145,230,0.55)]'
          >
            <div className='flex flex-col items-start gap-5 rounded-[22px] bg-white/95 px-6 py-7 text-left sm:px-8 sm:py-8 md:flex-row md:items-center md:justify-between dark:bg-slate-950/95'>
              <div className='space-y-2'>
                <h2 className='text-lg font-semibold text-[#0A004B] sm:text-xl dark:text-white'>
                  Offrez à votre enfant un avantage décisif pour son avenir
                </h2>
              </div>
              <div className='flex flex-wrap gap-3'>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                >
                  Réserver une session découverte
                </Link>
                <Link
                  href='/programmes'
                  className='inline-flex items-center justify-center rounded-xl border border-primary/20 bg-white/90 px-5 py-2.5 text-sm font-semibold text-primary shadow-sm backdrop-blur hover:border-white hover:bg-primary hover:text-white dark:bg-slate-900/90 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950'
                >
                  Voir les programmes
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ParentsContent


