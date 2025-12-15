'use client'

import { useState } from 'react'
import React from 'react'
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
  Clock,
  Video,
} from 'lucide-react'
import Link from 'next/link'
import { Icon } from '@iconify/react'

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

type Role = 'parent' | 'school' | 'company' | ''

const ContactContent = () => {
  const [role, setRole] = useState<Role>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('') // Honeypot field for spam protection

  // Appointment form states
  const [appointmentName, setAppointmentName] = useState('')
  const [appointmentEmail, setAppointmentEmail] = useState('')
  const [appointmentPhone, setAppointmentPhone] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [appointmentType, setAppointmentType] = useState<'visio' | 'onsite' | ''>('')
  const [appointmentMessage, setAppointmentMessage] = useState('')
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false)
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false)
  const [appointmentError, setAppointmentError] = useState<string | null>(null)

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

  const isFormValid =
    name.trim().length > 0 &&
    isValidEmail(email) &&
    role !== '' &&
    message.trim().length > 0

  // Get dynamic label for name field based on role
  const getNameLabel = () => {
    switch (role) {
      case 'parent':
        return 'Nom & prénom'
      case 'school':
        return 'Nom de l\'établissement'
      case 'company':
        return 'Nom de l\'entreprise'
      default:
        return 'Nom & prénom'
    }
  }

  // Appointment form validation
  const isAppointmentFormValid =
    appointmentName.trim().length > 0 &&
    isValidEmail(appointmentEmail) &&
    appointmentDate !== '' &&
    appointmentTime !== '' &&
    appointmentType !== ''

  // Handle appointment form submission
  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAppointmentFormValid) return
    setIsSubmittingAppointment(true)
    setAppointmentError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appointmentName,
          email: appointmentEmail,
          phone: appointmentPhone,
          role: `Rendez-vous - ${appointmentType === 'visio' ? 'Visio' : 'Sur site'}`,
          message: `Demande de rendez-vous\n\nDate souhaitée: ${appointmentDate}\nHeure souhaitée: ${appointmentTime}\nType: ${appointmentType === 'visio' ? 'Visioconférence' : 'Sur site'}\n\nMessage: ${appointmentMessage || 'Aucun message supplémentaire'}`,
          website: '', // Honeypot field (should be empty)
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Échec de l\'envoi de la demande de rendez-vous')
      }

      setAppointmentSubmitted(true)
      setAppointmentName('')
      setAppointmentEmail('')
      setAppointmentPhone('')
      setAppointmentDate('')
      setAppointmentTime('')
      setAppointmentType('')
      setAppointmentMessage('')
      setTimeout(() => setAppointmentSubmitted(false), 5000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.'
      setAppointmentError(errorMessage)
      console.error('Appointment form error:', err)
    } finally {
      setIsSubmittingAppointment(false)
    }
  }

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Handle URL query params to pre-fill role and scroll to form
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const type = params.get('type')
      if (type === 'parent') {
        setRole('parent')
        // Scroll to form section after a short delay to ensure DOM is ready
        setTimeout(() => {
          const formSection = document.getElementById('contact-form')
          if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      } else if (type === 'etablissement') {
        setRole('school')
        setTimeout(() => {
          const formSection = document.getElementById('contact-form')
          if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      } else if (type === 'entreprise') {
        setRole('company')
        setTimeout(() => {
          const formSection = document.getElementById('contact-form')
          if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          role,
          message,
          website: honeypot, // Honeypot field (should be empty)
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Échec de l\'envoi du message')
      }

      setSubmitted(true)
      setName('')
      setEmail('')
      setPhone('')
      setRole('')
      setMessage('')
      setHoneypot('')
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.'
      setError(errorMessage)
      console.error('Contact form error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* HERO */}
      <section className='relative py-20 lg:py-28'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.24),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,195,217,0.4),transparent_55%)]'
        />
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-center'
          >
            <div className='space-y-6 text-center md:text-left'>
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
      <section className='py-20 lg:py-28'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left mb-12'
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
            className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'
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
                className='group flex flex-col gap-4 rounded-3xl bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'
              >
                <div className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40'>
                  <Icon className='h-5 w-5' />
                </div>
                <p className='text-sm font-semibold leading-relaxed text-[#0A004B] dark:text-white'>{title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION – Nos coordonnées */}
      <section className='py-20 lg:py-28'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left mb-12'
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
            className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
          >
            

            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-6 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'
            >
              <div className='mb-2 flex items-center gap-3'>
                <MapPin className='h-5 w-5 text-primary dark:text-cyan-300' />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Localisation</p>
              </div>
              <Link
                href='https://www.google.com/maps/place/INOTEQIA/@36.8550972,10.274117,17z/data=!3m1!4b1!4m6!3m5!1s0x12e2b5128a5ef2f1:0x4f3e6d7fbd54d6e2!8m2!3d36.8550929!4d10.2766919!16s%2Fg%2F11rr91xr_w?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D'
                target='_blank'
                rel='noopener noreferrer'
                className='text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary transition-colors duration-200'>
                V74G+2MP, Tunis
              </Link>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-6 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'
            >
              <div className='mb-2 flex items-center gap-3'>
                <Phone className='h-5 w-5 text-primary dark:text-cyan-300' />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Téléphone</p>
              </div>
              <Link
                href='tel:+21625857621'
                className='text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary transition-colors duration-200'>
                +216 25 857 621
              </Link>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-6 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'
            >
              <div className='mb-2 flex items-center gap-3'>
                <Mail className='h-5 w-5 text-primary dark:text-cyan-300' />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Email</p>
              </div>
              <div className='space-y-1'>
                <Link
                  href='mailto:academy@inoteqia.com'
                  className='block text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary transition-colors duration-200'>
                  academy@inoteqia.com
                </Link>
                
              </div>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-6 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'
            >
              <div className='mb-2 flex items-center gap-3'>
                <CalendarDays className='h-5 w-5 text-primary dark:text-cyan-300' />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Horaires</p>
              </div>
              <p>Lundi – Vendredi, 8h–17h</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Formulaire de contact */}
      <section id='contact-form' className='py-20 lg:py-28 scroll-mt-24'>
        <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left mb-12'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Formulaire de contact
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='rounded-3xl bg-white/95 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
          >
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Honeypot field for spam protection - hidden from users */}
              <input
                type='text'
                name='website'
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete='off'
                style={{ position: 'absolute', left: '-9999px' }}
                aria-hidden='true'
              />
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div className='space-y-3'>
                  <label
                    htmlFor='name'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    {getNameLabel()}
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

                <div className='space-y-3'>
                  <label
                    htmlFor='email'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
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

              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div className='space-y-3'>
                  <label
                    htmlFor='phone'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
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

                <div className='space-y-3'>
                  <label
                    htmlFor='role'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
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
                      <option value=''>Sélectionner votre profil</option>
                      <option value='parent'>Parent</option>
                      <option value='school'>Établissement scolaire</option>
                      <option value='company'>Entreprise</option>

                    </select>
                    <Handshake className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <label
                  htmlFor='message'
                  className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
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

              <div className='flex flex-col gap-3'>
                {error && (
                  <div className='rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-800'>
                    {error}
                  </div>
                )}
                {submitted && (
                  <div className='rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-800'>
                    Votre message a été envoyé avec succès. Nous reviendrons vers vous rapidement.
                  </div>
                )}
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
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Réservez un rendez-vous */}
      <section id='appointment-form' className='py-20 lg:py-28 scroll-mt-24'>
        <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left mb-12'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Réservez un rendez-vous
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='rounded-3xl bg-white/95 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
          >
            <div className='mb-8 space-y-3'>
              <h2 className='text-xl font-semibold text-[#0A004B] dark:text-white'>
                Rendez-vous &amp; démonstrations
              </h2>
              <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-300'>
                Réservez un rendez-vous en visioconférence ou sur site pour découvrir nos programmes
                ou établir un partenariat.
              </p>
            </div>

            <form onSubmit={handleAppointmentSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div className='space-y-3'>
                  <label
                    htmlFor='appointment-name'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Nom &amp; prénom
                  </label>
                  <div className='relative'>
                    <input
                      id='appointment-name'
                      type='text'
                      value={appointmentName}
                      onChange={(e) => setAppointmentName(e.target.value)}
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    />
                    <User className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='appointment-email'
                    className='mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Email
                  </label>
                  <div className='relative'>
                    <input
                      id='appointment-email'
                      type='email'
                      value={appointmentEmail}
                      onChange={(e) => setAppointmentEmail(e.target.value)}
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    />
                    <Mail className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div className='space-y-3'>
                  <label
                    htmlFor='appointment-phone'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Téléphone (optionnel)
                  </label>
                  <div className='relative'>
                    <input
                      id='appointment-phone'
                      type='tel'
                      value={appointmentPhone}
                      onChange={(e) => setAppointmentPhone(e.target.value)}
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    />
                    <Phone className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>

                <div className='space-y-3'>
                  <label
                    htmlFor='appointment-type'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Type de rendez-vous
                  </label>
                  <div className='relative'>
                    <select
                      id='appointment-type'
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value as 'visio' | 'onsite' | '')}
                      className='w-full appearance-none rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    >
                      <option value=''>Sélectionner</option>
                      <option value='visio'>Visioconférence</option>
                      <option value='onsite'>Sur site</option>
                    </select>
                    <Video className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <label
                    htmlFor='appointment-date'
                    className='mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Date souhaitée
                  </label>
                  <div className='relative group'>
                    <input
                      id='appointment-date'
                      type='date'
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      min={getMinDate()}
                      className='w-full rounded-xl border-2 border-slate-200/80 bg-white/90 px-4 py-3 pr-12 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-lg hover:bg-white dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-cyan-300/50 dark:hover:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:shadow-xl dark:focus:border-cyan-300 dark:focus:ring-cyan-300/40'
                    />
                    <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#00C3D9]/10 via-[#0091E6]/10 to-[#0067E0]/10 group-hover:from-[#00C3D9]/20 group-hover:via-[#0091E6]/20 group-hover:to-[#0067E0]/20 dark:from-cyan-300/10 dark:via-cyan-300/10 dark:to-cyan-300/10 dark:group-hover:from-cyan-300/20 dark:group-hover:via-cyan-300/20 dark:group-hover:to-cyan-300/20 transition-all duration-300'>
                      <CalendarDays className='h-4 w-4 text-slate-500 group-hover:text-primary dark:text-slate-400 dark:group-hover:text-cyan-300 transition-colors duration-300' />
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <label
                    htmlFor='appointment-time'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Heure souhaitée
                  </label>
                  <div className='relative group'>
                    <input
                      id='appointment-time'
                      type='time'
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className='w-full rounded-xl border-2 border-slate-200/80 bg-white/90 px-4 py-3 pr-12 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all duration-300 ease-in-out hover:border-primary/50 hover:shadow-lg hover:bg-white dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-cyan-300/50 dark:hover:bg-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/30 focus:shadow-xl dark:focus:border-cyan-300 dark:focus:ring-cyan-300/40'
                    />
                    <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#00C3D9]/10 via-[#0091E6]/10 to-[#0067E0]/10 group-hover:from-[#00C3D9]/20 group-hover:via-[#0091E6]/20 group-hover:to-[#0067E0]/20 dark:from-cyan-300/10 dark:via-cyan-300/10 dark:to-cyan-300/10 dark:group-hover:from-cyan-300/20 dark:group-hover:via-cyan-300/20 dark:group-hover:to-cyan-300/20 transition-all duration-300'>
                      <Clock className='h-4 w-4 text-slate-500 group-hover:text-primary dark:text-slate-400 dark:group-hover:text-cyan-300 transition-colors duration-300' />
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <label
                  htmlFor='appointment-message'
                  className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                >
                  Message (optionnel)
                </label>
                <textarea
                  id='appointment-message'
                  value={appointmentMessage}
                  onChange={(e) => setAppointmentMessage(e.target.value)}
                  rows={3}
                  placeholder='Précisez le sujet de votre rendez-vous ou toute information supplémentaire...'
                  className='w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/60 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                />
              </div>

              <div className='flex flex-col gap-3'>
                {appointmentError && (
                  <div className='rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-800'>
                    {appointmentError}
                  </div>
                )}
                {appointmentSubmitted && (
                  <div className='rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-800'>
                    Votre demande de rendez-vous a été envoyée avec succès. Nous vous confirmerons la date et l&apos;heure par email.
                  </div>
                )}
                <div className='flex flex-wrap items-center gap-4'>
                  <button
                    type='submit'
                    disabled={!isAppointmentFormValid || isSubmittingAppointment}
                    className={`inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
                      ${
                        !isAppointmentFormValid || isSubmittingAppointment
                          ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500'
                          : 'bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-[#0091E6]/40 hover:scale-[1.02] hover:shadow-xl'
                      }`}
                  >
                    {isSubmittingAppointment ? 'Envoi en cours...' : 'Réserver le rendez-vous'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* SECTION – Réseaux & communauté */}
      <section className='py-20 lg:py-28'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left mb-12'
          >
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
              Réseaux &amp; communauté
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='rounded-3xl bg-white/95 p-8 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-100 dark:ring-slate-700/80'
          >
            <p className='mb-10 text-center text-base leading-relaxed text-slate-700 dark:text-slate-200'>
              Retrouvez INOTEQIA Academy sur les réseaux sociaux pour suivre les projets des élèves,
              les prochaines sessions et les actualités autour de l&apos;IA pour les jeunes.
            </p>
            <div className='flex justify-center gap-8'>
              <Link
                href='https://www.facebook.com/Inoteqiaacademy?locale=fr_FR'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
                className='group transition-transform duration-300 hover:scale-110'>
                <Icon
                  icon='tabler:brand-facebook-filled'
                  width={80}
                  height={80}
                  className='text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300'
                />
              </Link>
              <Link
                href='https://www.instagram.com/inoteqiaacademy/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
                className='group transition-transform duration-300 hover:scale-110'>
                <Icon
                  icon='tabler:brand-instagram'
                  width={80}
                  height={80}
                  className='text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300'
                />
              </Link>
              <Link
                href='https://www.linkedin.com/company/inoteqia-academy/about/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'
                className='group transition-transform duration-300 hover:scale-110'>
                <Icon
                  icon='tabler:brand-linkedin'
                  width={80}
                  height={80}
                  className='text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300'
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ContactContent


