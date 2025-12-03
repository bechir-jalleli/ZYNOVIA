'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  User,
  Building2,
  School,
  Handshake,
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

type Role = 'Parent' | 'Établissement' | 'Entreprise' | 'Institution' | ''

const ContactContent = () => {
  const [role, setRole] = useState<Role>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

  const isFormValid =
    name.trim().length > 0 &&
    isValidEmail(email) &&
    role !== '' &&
    message.trim().length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setIsSubmitting(true)

    try {
      // Placeholder submit – ready to be wired to an API route later
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSubmitted(true)
      setName('')
      setEmail('')
      setPhone('')
      setRole('')
      setMessage('')
      setTimeout(() => setSubmitted(false), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* HERO */}
      <section className='relative py-24 lg:py-32'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.24),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.4),transparent_55%)]'
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
                Contact
              </p>
              <h1 className='text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
                Contactez INOTEQIA Academy
              </h1>
              <p className='text-lg font-medium text-primary/90 dark:text-cyan-300'>
                Nous sommes à votre écoute pour répondre à toutes vos questions.
              </p>
              <p className='max-w-2xl text-sm sm:text-base text-slate-700 dark:text-slate-300'>
                Parents, établissements, entreprises ou institutions : notre équipe vous accompagne
                pour trouver la meilleure solution.
              </p>
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
              className='relative rounded-3xl bg-white/85 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur-2xl dark:bg-slate-900/90 dark:ring-white/10'
            >
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-[#00C3D9]/55 via-[#0091E6]/45 to-[#0067E0]/45 blur-2xl'
              />
              <div className='relative space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-200'>
                <div className='flex items-center gap-2'>
                  <CalendarDays className='h-5 w-5 text-primary dark:text-cyan-300' />
                  <p className='font-semibold text-[#0A004B] dark:text-white'>
                    Un rendez-vous pour clarifier vos besoins
                  </p>
                </div>
                <p>
                  Que vous souhaitiez inscrire votre enfant, mettre en place un programme dans votre
                  établissement ou lancer un projet RSE, nous prenons le temps d’étudier votre
                  situation et de vous proposer un accompagnement adapté.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Comment pouvons-nous vous aider ? */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Comment pouvons-nous vous aider ?
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'
          >
            {[
              {
                title: 'Parents — Informations programmes & inscription',
                icon: User,
              },
              {
                title: 'Établissements scolaires — Partenariats & intégration IA',
                icon: School,
              },
              {
                title: 'Entreprises — Programmes enfants-salariés & RSE',
                icon: Building2,
              },
              {
                title: 'Institutions & associations — Inclusion numérique & projets',
                icon: Handshake,
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

      {/* SECTION – Nos coordonnées */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Nos coordonnées
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-3'
          >
            <motion.div
              variants={cardVariant}
              className='space-y-2 rounded-3xl bg-white/95 p-5 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'
            >
              <div className='mb-1 flex items-center gap-2'>
                <MapPin className='h-5 w-5 text-primary dark:text-cyan-300' />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Localisation</p>
              </div>
              <p>Tunis, Tunisie</p>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className='space-y-2 rounded-3xl bg-white/95 p-5 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'
            >
              <div className='mb-1 flex items-center gap-2'>
                <Mail className='h-5 w-5 text-primary dark:text-cyan-300' />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Email</p>
              </div>
              <p>contact@inoteqia.com</p>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className='space-y-2 rounded-3xl bg-white/95 p-5 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'
            >
              <div className='mb-1 flex items-center gap-2'>
                <CalendarDays className='h-5 w-5 text-primary dark:text-cyan-300' />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Horaires</p>
              </div>
              <p>Lundi – Vendredi, 8h–17h</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Formulaire de contact */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Formulaire de contact
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='mt-8 rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
          >
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='name'
                    className='mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Nom &amp; prénom
                  </label>
                  <div className='relative'>
                    <input
                      id='name'
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    />
                    <User className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Email
                  </label>
                  <div className='relative'>
                    <input
                      id='email'
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    />
                    <Mail className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='phone'
                    className='mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Téléphone (optionnel)
                  </label>
                  <div className='relative'>
                    <input
                      id='phone'
                      type='tel'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    />
                    <Phone className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='role'
                    className='mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Rôle
                  </label>
                  <div className='relative'>
                    <select
                      id='role'
                      value={role}
                      onChange={(e) => setRole(e.target.value as Role)}
                      className='w-full appearance-none rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    >
                      <option value=''>Sélectionner</option>
                      <option value='Parent'>Parent</option>
                      <option value='Établissement'>Établissement</option>
                      <option value='Entreprise'>Entreprise</option>
                      <option value='Institution'>Institution</option>
                    </select>
                    <Handshake className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className='w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                />
              </div>

              <div className='flex flex-wrap items-center gap-4'>
                <button
                  type='submit'
                  disabled={!isFormValid || isSubmitting}
                  className={`inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
                    ${
                      !isFormValid || isSubmitting
                        ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500'
                        : 'bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-[#0091E6]/40 hover:scale-[1.02] hover:shadow-xl'
                    }`}
                >
                  Envoyer le message
                </button>
                {submitted && (
                  <p className='text-xs text-emerald-600 dark:text-emerald-400'>
                    Votre message a été envoyé. Nous reviendrons vers vous rapidement.
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Rendez-vous & démonstrations */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='rounded-3xl bg-white/95 p-6 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-100 dark:ring-slate-700/80'
          >
            <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
              <div className='space-y-2'>
                <h2 className='text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-cyan-300'>
                  Rendez-vous &amp; démonstrations
                </h2>
                <p className='text-sm text-slate-700 dark:text-slate-200'>
                  Nous pouvons organiser une réunion en visio ou sur site pour découvrir nos
                  programmes ou établir un partenariat.
                </p>
              </div>
              <div className='flex flex-wrap gap-3'>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0091E6]/40 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary dark:focus-visible:ring-offset-slate-950'
                >
                  Réserver un rendez-vous
                </Link>
                <Link
                  href='/contact'
                  className='inline-flex items-center justify-center rounded-xl border border-primary/20 bg-white/90 px-5 py-2.5 text-sm font-semibold text-primary shadow-sm backdrop-blur hover:border-white hover:bg-primary hover:text-white dark:bg-slate-900/90 dark:text-cyan-300 dark:hover:bg-cyan-400 dark:hover:text-slate-950'
                >
                  Télécharger la brochure
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Réseaux & communauté */}
      <section className='py-24 lg:py-32'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Réseaux &amp; communauté
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='mt-8 rounded-3xl bg-white/95 p-6 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-100 dark:ring-slate-700/80'
          >
            <p className='text-sm text-slate-700 dark:text-slate-200'>
              Retrouvez INOTEQIA Academy sur les réseaux sociaux pour suivre les projets des élèves,
              les prochaines sessions et les actualités autour de l’IA pour les jeunes.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ContactContent


