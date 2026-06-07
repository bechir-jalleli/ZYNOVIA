'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Building2,
  Users,
  Sparkles,
  HeartHandshake,
  Gauge,
  ShieldCheck,
  Rocket,
  TrendingUp,
  SmilePlus,
  Network,
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
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

export default function EntrepriseContent() {
  return (
    <main className='bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* SECTION 1 – HERO ENTREPRISE */}
      <section className='relative py-24 lg:py-32 overflow-hidden'>
        {/* Background glow */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.28),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.45),transparent_55%)]'
        />

        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)] lg:items-center'>
            {/* Text column */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className='space-y-6 md:text-left'
            >
              <p className='inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/85 dark:text-cyan-300 dark:ring-white/10'>
                <span className='h-2 w-2 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] animate-pulse' />
                Espace entreprise
              </p>

              <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#0A004B] dark:text-white'>
                Offrir l’avenir aux enfants de vos collaborateurs grâce à l’IA
              </h1>

              <p className='text-lg sm:text-xl font-semibold text-primary/90 dark:text-cyan-300'>
                Un avantage social innovant pour les entreprises qui souhaitent investir dans
                l’éducation, l’innovation et le bien-être des familles de leurs salariés.
              </p>

              <p className='max-w-2xl mx-auto md:mx-0 text-sm sm:text-base text-slate-700 dark:text-slate-300'>
                ZYNOVIA Academy conçoit des expériences IA inspirantes pour les enfants de vos
                collaborateurs : projets concrets, ateliers encadrés et bootcamps pendant les
                vacances scolaires, au cœur d’un environnement professionnel.
              </p>

              <div className='mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start'>
                <Link
                  href='/programmes'
                  className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/30 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                >
                  Découvrir le programme entreprise
                </Link>
                <Link
                  href='/contact?type=entreprise#contact-form'
                  className='inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white/85 px-5 py-2.5 text-sm font-semibold text-[#0A004B] shadow-sm backdrop-blur hover:border-primary hover:text-primary dark:bg-slate-900/80 dark:text-white'
                >
                  Prendre rendez-vous avec notre équipe
                </Link>
              </div>
            </motion.div>

            {/* Side panel */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
              className='relative rounded-3xl bg-white/90 p-6 sm:p-7 shadow-[0_18px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur-2xl dark:bg-slate-900/90 dark:ring-white/10'
            >
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#00C3D9]/60 via-[#0091E6]/50 to-[#0067E0]/45 blur-2xl'
              />
              <div className='relative space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                <div className='inline-flex items-center gap-2 rounded-full bg-secondary/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary dark:bg-slate-900/70 dark:text-cyan-300'>
                  <Building2 className='h-3.5 w-3.5' />
                  Programme IA entreprise
                </div>
                <p className='font-semibold text-[#0A004B] dark:text-white'>
                  Créez un pont entre votre stratégie RH et l’avenir des enfants de vos
                  collaborateurs.
                </p>
                <p>
                  Un format clé-en-main qui associe apprentissage de l’IA, projets concrets et
                  valorisation de votre marque employeur.
                </p>
                <ul className='grid grid-cols-2 gap-3 pt-2'>
                  <li className='rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-200/80 dark:bg-slate-900/85 dark:ring-slate-700/70'>
                    <p className='text-[11px] font-semibold text-[#0A004B] dark:text-white'>
                      Avantage social différenciant
                    </p>
                    <p className='mt-1 text-[11px] text-slate-500 dark:text-slate-300'>
                      Un bénéfice unique pour les familles de vos collaborateurs.
                    </p>
                  </li>
                  <li className='rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-200/80 dark:bg-slate-900/85 dark:ring-slate-700/70'>
                    <p className='text-[11px] font-semibold text-[#0A004B] dark:text-white'>
                      Aligné RSE & marque employeur
                    </p>
                    <p className='mt-1 text-[11px] text-slate-500 dark:text-slate-300'>
                      Donnez du sens concret à vos engagements sociétaux.
                    </p>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 – Pourquoi proposer l’IA aux enfants de vos salariés ? */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Pourquoi proposer l&apos;IA aux enfants de vos salariés ?
            </p>
            <h2 className='mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Préparer la prochaine génération, tout en renforçant votre stratégie RH
            </h2>
            <p className='mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300'>
              Dans un monde où l’intelligence artificielle transforme les métiers, la société et
              l’économie, les entreprises ont un rôle clé à jouer pour préparer les jeunes aux
              compétences du futur.
            </p>
            <p className='mt-3 text-sm sm:text-base text-slate-700 dark:text-slate-300'>
              ZYNOVIA Academy offre aux entreprises une opportunité unique : donner aux enfants de
              vos collaborateurs les compétences technologiques qui feront leur succès, à travers
              des projets inspirés de votre réalité métier.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-10 grid grid-cols-1 gap-6 md:grid-cols-3'
          >
            {/* Pour l’entreprise */}
            <motion.div
              variants={cardVariant}
              className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
            >
              <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#00C3D9]/30 via-[#0091E6]/35 to-[#0067E0]/30 blur-3xl opacity-80'
              />
              <div className='relative'>
                <div className='inline-flex items-center gap-2 rounded-full bg-secondary/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary dark:bg-slate-900/70 dark:text-cyan-300'>
                  <Building2 className='h-3.5 w-3.5' />
                  Pour l’entreprise
                </div>
                <ul className='mt-4 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                  {[
                    'Renforcer le sentiment d’appartenance',
                    'Valoriser une image d’entreprise moderne et responsable',
                    'Fidéliser les talents et attirer de nouveaux profils',
                    'Améliorer le climat social et la qualité de vie au travail',
                    'Soutenir une démarche RSE forte et visible',
                    'Offrir un avantage social rare et différenciant',
                  ].map((item) => (
                    <li
                      key={item}
                      className='flex items-start gap-2 rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 dark:bg-slate-900/80 dark:ring-slate-700/70'
                    >
                      <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Pour les enfants */}
            <motion.div
              variants={cardVariant}
              className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
            >
              <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-emerald-400/20 via-cyan-400/25 to-blue-400/20 blur-3xl opacity-80'
              />
              <div className='relative'>
                <div className='inline-flex items-center gap-2 rounded-full bg-secondary/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary dark:bg-slate-900/70 dark:text-cyan-300'>
                  <Users className='h-3.5 w-3.5' />
                  Pour les enfants
                </div>
                <ul className='mt-4 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                  {[
                    'Développer des compétences digitales clés',
                    'Comprendre le monde de demain et les usages de l’IA',
                    'Stimuler créativité, curiosité et pensée analytique',
                    'Réaliser des projets inspirés du métier de leurs parents',
                    'Participer à des challenges concrets et ludiques',
                  ].map((item) => (
                    <li
                      key={item}
                      className='flex items-start gap-2 rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 dark:bg-slate-900/80 dark:ring-slate-700/70'
                    >
                      <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-400' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Pour les parents */}
            <motion.div
              variants={cardVariant}
              className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
            >
              <div
                aria-hidden='true'
                className='pointer-events-none absolute inset-x-6 -top-12 h-28 rounded-full bg-gradient-to-r from-[#FACC15]/20 via-[#FB923C]/25 to-[#F97316]/20 blur-3xl opacity-80'
              />
              <div className='relative'>
                <div className='inline-flex items-center gap-2 rounded-full bg-secondary/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary dark:bg-slate-900/70 dark:text-cyan-300'>
                  <HeartHandshake className='h-3.5 w-3.5' />
                  Pour les parents
                </div>
                <ul className='mt-4 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                  {[
                    'Fierté de voir leurs enfants travailler sur des projets innovants',
                    'Lien renforcé entre l’entreprise et la famille',
                    'Visibilité concrète sur les compétences développées',
                  ].map((item) => (
                    <li
                      key={item}
                      className='flex items-start gap-2 rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 dark:bg-slate-900/80 dark:ring-slate-700/70'
                    >
                      <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#FACC15] via-[#FB923C] to-[#F97316]' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 – Programme clé-en-main */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Un programme clé-en-main, flexible et adapté à votre entreprise
            </p>
            <h2 className='mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Bootcamp IA – Enfants de salariés (vacances scolaires)
            </h2>
            <p className='mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300'>
              Un format intensif sur les vacances scolaires pour plonger les enfants de vos
              collaborateurs dans un véritable projet IA, de l’idée au prototype présenté devant les
              parents.
            </p>
          </motion.div>

          <div className='mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] lg:items-start'>
            {/* Content list */}
            <motion.div
              variants={staggerContainer}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.3 }}
              className='space-y-6'
            >
              <motion.div
                variants={cardVariant}
                className='relative overflow-hidden rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-primary/10 backdrop-blur dark:bg-slate-950/95 dark:ring-cyan-400/30'
              >
                <div
                  aria-hidden='true'
                  className='pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-t from-[#00C3D9]/18 via-[#0091E6]/24 to-[#0067E0]/18 blur-2xl'
                />
                <div className='relative flex items-center gap-3'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40'>
                    <Sparkles className='h-5 w-5' />
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                      Format du bootcamp
                    </h3>
                  </div>
                </div>
                <ul className='relative mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200'>
                  {[
                    '20h de formation sur une semaine de vacances',
                    'Création d’un projet IA réel de A à Z',
                    'Initiation à la programmation (niveau adapté)',
                    'Atelier ChatGPT & outils IA responsables',
                    'Challenge final présenté devant les parents',
                  ].map((item) => (
                    <li
                      key={item}
                      className='flex items-start gap-2 rounded-2xl bg-slate-50/90 px-3 py-2 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 dark:bg-slate-900/80 dark:ring-slate-700/70'
                    >
                      <span className='mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0]' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={cardVariant}
                className='rounded-3xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] p-[1px] shadow-[0_18px_40px_rgba(0,145,230,0.45)]'
              >
                <div className='flex flex-col gap-4 rounded-[22px] bg-white/95 px-5 py-5 text-left sm:flex-row sm:items-center sm:justify-between dark:bg-slate-950/95'>
                  <div className='flex items-start gap-3'>
                    <div className='mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white/15 via-white/20 to-white/15 text-white'>
                      <Rocket className='h-4 w-4' />
                    </div>
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                        Pour votre entreprise
                      </p>
                      <p className='mt-1 text-sm font-semibold text-[#0A004B] dark:text-white'>
                        Co-construire un bootcamp IA pour les enfants de vos salariés
                      </p>
                    </div>
                  </div>
                  <Link
                    href='/contact?type=entreprise#contact-form'
                    className='inline-flex items-center justify-center rounded-xl bg-white/95 px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-slate-900/10 backdrop-blur hover:bg-primary hover:text-white hover:shadow-primary/40 dark:bg-slate-900/90 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950'
                  >
                    Échanger avec notre équipe
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Highlight card */}
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className='space-y-5 rounded-3xl bg-white/95 p-6 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.16)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-100 dark:ring-slate-700/80'
            >
              <h3 className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                Une expérience pédagogique alignée sur vos métiers
              </h3>
              <p className='text-xs sm:text-sm'>
                Nous construisons des projets inspirés du quotidien de vos équipes : données,
                problématiques métiers, enjeux sectoriels. Les enfants se projettent concrètement
                dans le monde professionnel de leurs parents, tout en restant dans un cadre ludique
                et sécurisé.
              </p>
              <ul className='grid grid-cols-1 gap-3 text-xs sm:text-sm'>
                {[
                  {
                    icon: Gauge,
                    label: 'Niveaux adaptés',
                    text: 'Contenus différenciés selon l’âge et le niveau des enfants.',
                  },
                  {
                    icon: ShieldCheck,
                    label: 'Encadrement sécurisé',
                    text: 'Formateurs qualifiés, pédagogie adaptée et cadre éthique IA.',
                  },
                  {
                    icon: SmilePlus,
                    label: 'Expérience positive',
                    text: 'Une semaine mémorable pour les enfants… et pour les parents.',
                  },
                ].map(({ icon: Icon, label, text }) => (
                  <li
                    key={label}
                    className='flex items-start gap-3 rounded-2xl bg-slate-50/90 px-3 py-3 ring-1 ring-slate-100/90 shadow-sm shadow-slate-900/5 dark:bg-slate-900/80 dark:ring-slate-700/70'
                  >
                    <div className='mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9]/15 via-[#0091E6]/20 to-[#0067E0]/15 text-primary dark:text-cyan-300'>
                      <Icon className='h-4 w-4' />
                    </div>
                    <div>
                      <p className='text-xs font-semibold text-[#0A004B] dark:text-white'>
                        {label}
                      </p>
                      <p className='text-xs text-slate-600 dark:text-slate-300'>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 – Points forts pour l’entreprise */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Les points forts pour l&apos;entreprise
            </p>
            <h2 className='mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Un programme innovant, concret et valorisant pour votre stratégie RH
            </h2>
            <p className='mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300'>
              Au-delà d’un simple atelier, le programme ZYNOVIA pour les enfants de vos salariés
              devient un véritable levier de marque employeur, de fidélisation et d’engagement.
            </p>
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
                icon: TrendingUp,
                label: 'Satisfaction & fidélité des collaborateurs',
                text: 'Renforce le lien affectif à l’entreprise en impliquant la famille.',
              },
              {
                icon: Building2,
                label: 'Image d’entreprise innovante',
                text: 'Positionne votre organisation comme actrice de l’éducation et de l’IA.',
              },
              {
                icon: Sparkles,
                label: 'Avantage social différenciant',
                text: 'Un bénéfice rare qui vous distingue sur le marché des talents.',
              },
              {
                icon: Users,
                label: 'Culture d’entreprise renforcée',
                text: 'Crée un esprit familial et intergénérationnel autour de vos métiers.',
              },
              {
                icon: Network,
                label: 'Compétences STEAM développées',
                text: 'Encourage science, technologie, arts et mathématiques chez les jeunes.',
              },
              {
                icon: ShieldCheck,
                label: 'Égalité d’accès aux technologies d’avenir',
                text: 'Offre à tous les enfants la possibilité de comprendre et pratiquer l’IA.',
              },
            ].map(({ icon: Icon, label, text }) => (
              <motion.div
                key={label}
                variants={cardVariant}
                className='group flex flex-col gap-3 rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.22)] dark:bg-slate-900/95 dark:ring-slate-700/80'
              >
                <div className='inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C3D9]/16 via-[#0091E6]/24 to-[#0067E0]/18 text-primary shadow-sm shadow-[#0091E6]/20 dark:text-cyan-300'>
                  <Icon className='h-5 w-5' />
                </div>
                <p className='text-sm font-semibold text-[#0A004B] dark:text-white'>{label}</p>
                <p className='text-xs sm:text-sm text-slate-600 dark:text-slate-300'>{text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA final entreprise */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className='mt-12'
          >
            <div className='rounded-3xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] p-[1px] shadow-[0_22px_55px_rgba(0,145,230,0.55)]'>
              <div className='flex flex-col items-start gap-5 rounded-[22px] bg-white/95 px-6 py-7 text-left sm:px-8 sm:py-8 md:flex-row md:items-center md:justify-between dark:bg-slate-950/95'>
                <div className='space-y-1'>
                  <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                    Espace entreprise
                  </p>
                  <h3 className='text-lg font-semibold text-[#0A004B] sm:text-xl dark:text-white'>
                    Vous souhaitez construire un programme IA pour les enfants de vos salariés ?
                  </h3>
                </div>
                <div className='flex flex-wrap gap-3'>
                  <Link
                    href='/contact?type=entreprise#contact-form'
                    className='inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-slate-900/10 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:bg-slate-900 dark:text-cyan-300 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950'
                  >
                    Planifier un échange
                  </Link>
                  <Link
                    href='/partenariats'
                    className='inline-flex items-center justify-center rounded-xl border border-white/70 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur hover:bg-white/10'
                  >
                    Découvrir nos autres partenariats
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 – Bénéfices parents, Notre engagement, FAQ */}
      <section className='py-12 lg:py-16'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6 lg:space-y-8'>
          {/* Bénéfices parents */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='md:text-left'
          >
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Bénéfices parents
            </h2>
            <motion.div
              variants={staggerContainer}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.2 }}
              className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'
            >
              {[
                { stat: '+60 %', label: "d'amélioration STEM" },
                { stat: '95 %', label: 'des parents voient un gain de confiance' },
                { stat: '90 %', label: 'des élèves poursuivent dans la tech' },
                { stat: '99%', label: 'satisfaction globale' },
              ].map(({ stat, label }) => (
                <motion.div
                  key={label}
                  variants={cardVariant}
                  className='rounded-2xl bg-white/95 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
                >
                  <p className='text-2xl sm:text-3xl font-bold text-primary dark:text-cyan-300'>
                    {stat}
                  </p>
                  <p className='mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300'>
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Notre engagement */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className='md:text-left'
          >
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              Notre engagement
            </h2>
            <motion.div
              variants={staggerContainer}
              initial='initial'
              whileInView='whileInView'
              viewport={{ once: true, amount: 0.2 }}
              className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-3'
            >
              {[
                {
                  title: 'Transparence',
                  description: 'Rapports réguliers et suivi des progrès',
                },
                {
                  title: 'Sécurité',
                  description: 'Un cadre bienveillant et responsable',
                },
                {
                  title: 'Orientation',
                  description: 'Conseils pour STEM, concours et études supérieures',
                },
              ].map(({ title, description }) => (
                <motion.div
                  key={title}
                  variants={cardVariant}
                  className='rounded-2xl bg-white/95 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
                >
                  <p className='text-base sm:text-lg font-semibold text-[#0A004B] dark:text-white'>
                    {title}
                  </p>
                  <p className='mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300'>
                    {description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className='md:text-left'
          >
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
              FAQ
            </h2>
            <div className='mt-6 space-y-4'>
              <div className='rounded-2xl border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70'>
                <p className='text-sm font-semibold text-[#0A004B] dark:text-white'>
                  Questions fréquentes
                </p>
                <p className='mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300'>
                  Pour toute question supplémentaire, n&apos;hésitez pas à nous contacter.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}


