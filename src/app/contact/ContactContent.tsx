'use client'

import React, { useState } from 'react'
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
import Image from 'next/image'
import { Icon } from '@iconify/react'
import ContactFormSection from '@/app/components/ContactFormSection'

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

const ContactContent = () => {
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
      const response = await fetch('/api/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appointmentName,
          email: appointmentEmail,
          phone: appointmentPhone,
          role: `Rendez-vous - ${appointmentType === 'visio' ? 'Visio' : 'Sur site'}`,
          message: `Demande de rendez-vous\n\nDate souhaitée: ${appointmentDate}\nHeure souhaitée: ${appointmentTime}\nType: ${appointmentType === 'visio' ? 'Visioconférence' : 'Sur site'}\n\nMessage: ${appointmentMessage || 'Aucun message supplémentaire'}`,
          formType: 'rendez-vous',
          appointmentDate,
          appointmentTime,
          appointmentType,
          website: '', // Honeypot field (should be empty)
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Échec de l'envoi de la demande de rendez-vous")
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
      const errorMessage =
        err instanceof Error ? err.message : "Une erreur est survenue. Veuillez réessayer."
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

  return (
    <main className='bg-gradient-to-b from-secondary/20 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      {/* HERO */}
      <section className='relative overflow-hidden py-20 lg:py-28'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-72'
          style={{ background: 'radial-gradient(circle at top, rgba(68,144,199,0.24), transparent 55%)' }}
        />
        <div
          aria-hidden='true'
          className='pointer-events-none absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full blur-3xl'
          style={{ background: 'linear-gradient(to bottom right, rgba(39,57,127,0.20), rgba(68,144,199,0.15), rgba(63,169,223,0.20))' }}
        />
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center'
          >
            <div className='space-y-6 text-center md:text-left'>
              <p className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:ring-white/10' style={{ color: '#27397F' }}>
                <span className='h-2 w-2 rounded-full' style={{ background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)' }} />
                Contact
              </p>
              <h1 className='text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
                Contactez ZYNOVIA Academy
              </h1>
              <p className='text-lg font-medium font-semibold' style={{ background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} data-grad=''>
                Nous sommes à votre écoute pour répondre à toutes vos questions.
              </p>
              <p className='max-w-2xl text-sm sm:text-base text-slate-700 dark:text-slate-300'>
                Parents, établissements, entreprises ou institutions : notre équipe vous accompagne
                pour trouver la meilleure solution.
              </p>
              <p className='text-lg font-medium font-semibold' style={{ background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} data-grad=''>
                Un rendez-vous pour clarifier vos besoins
              </p>
              <p className='max-w-2xl text-sm sm:text-base text-slate-700 dark:text-slate-300'>
                Que vous souhaitiez inscrire votre enfant, mettre en place un programme dans votre
                établissement ou lancer un projet RSE, nous prenons le temps d’étudier votre situation
                et de vous proposer un accompagnement adapté.
              </p>
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
              className='relative mx-auto w-full max-w-xl lg:max-w-none'
            >
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full blur-2xl'
                style={{ background: 'linear-gradient(to bottom right, rgba(68,144,199,0.55), rgba(46,83,145,0.45), rgba(39,57,127,0.45))' }}
              />
              <div className='relative overflow-hidden rounded-3xl shadow-[0_22px_60px_rgba(15,23,42,0.22)] ring-1 ring-white/80 dark:ring-white/10'>
                <Image
                  src='/images/contact/cnr.jpg'
                  alt='Contactez-nous — téléphone, e-mail, site web et localisation'
                  width={612}
                  height={612}
                  priority
                  sizes='(max-width: 1024px) 100vw, 520px'
                  className='h-full w-full object-cover object-center'
                />
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
            className='mx-auto max-w-3xl text-center md:text-left mb-12'>
            <p className='text-base sm:text-lg font-semibold uppercase tracking-[0.22em]' style={{ color: '#27397F' }}>
              Comment pouvons-nous vous aider ?
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
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
                className='group flex flex-col gap-4 rounded-3xl bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70'>
                <div className='inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md' style={{ background: 'linear-gradient(to bottom right, #27397F, #2E5391, #4490C7, #3FA9DF)', boxShadow: '0 4px 12px rgba(46,83,145,0.40)' }}>
                  <Icon className='h-5 w-5' />
                </div>
                <p className='text-sm font-semibold leading-relaxed text-[#0A004B] dark:text-white'>{title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ContactFormSection />

      {/* SECTION – Nos coordonnées */}
      <section className='py-20 lg:py-28'>
        <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left mb-12'>
            <p className='text-base sm:text-lg font-semibold uppercase tracking-[0.22em]' style={{ color: '#27397F' }}>
              Nos coordonnées
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-6 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'>
              <div className='mb-2 flex items-center gap-3'>
                <MapPin className='h-5 w-5' style={{ color: '#4490C7' }} />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Localisation</p>
              </div>
              <Link
                href='https://www.google.com/maps/place/ZYNOVIA/@36.8550972,10.274117,17z/data=!3m1!4b1!4m6!3m5!1s0x12e2b5128a5ef2f1:0x4f3e6d7fbd54d6e2!8m2!3d36.8550929!4d10.2766919!16s%2Fg%2F11rr91xr_w?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D'
                target='_blank'
                rel='noopener noreferrer'
                className='text-slate-700 dark:text-slate-200 transition-colors duration-200' onMouseEnter={e => (e.currentTarget.style.color='#4490C7')} onMouseLeave={e => (e.currentTarget.style.color='')}>
                V74G+2MP, Tunis
              </Link>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-6 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'
            >
              <div className='mb-2 flex items-center gap-3'>
                <Phone className='h-5 w-5' style={{ color: '#4490C7' }} />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Téléphone</p>
              </div>
              <Link
                href='tel:+21625857621'
                className='text-slate-700 dark:text-slate-200 transition-colors duration-200' onMouseEnter={e => (e.currentTarget.style.color='#4490C7')} onMouseLeave={e => (e.currentTarget.style.color='')}>
                +216 25 857 621
              </Link>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-6 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'
            >
              <div className='mb-2 flex items-center gap-3'>
                <Mail className='h-5 w-5' style={{ color: '#4490C7' }} />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Email</p>
              </div>
              <div className='space-y-1'>
                <Link
                  href='mailto:academy@inoteqia.com'
                  className='block text-slate-700 dark:text-slate-200 transition-colors duration-200' onMouseEnter={e => (e.currentTarget.style.color='#4490C7')} onMouseLeave={e => (e.currentTarget.style.color='')}>
                  academy@inoteqia.com
                </Link>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariant}
              className='space-y-3 rounded-3xl bg-white/95 p-6 text-sm text-slate-700 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-200 dark:ring-slate-700/80'
            >
              <div className='mb-2 flex items-center gap-3'>
                <CalendarDays className='h-5 w-5' style={{ color: '#4490C7' }} />
                <p className='font-semibold text-[#0A004B] dark:text-white'>Horaires</p>
              </div>
              <p>Lundi – Vendredi, 8h–17h</p>
            </motion.div>
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
            <p className='text-base sm:text-lg font-semibold uppercase tracking-[0.22em]' style={{ color: '#27397F' }}>
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
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    />
                    <User className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>

                <div className='space-y-3'>
                  <label
                    htmlFor='appointment-email'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Email
                  </label>
                  <div className='relative'>
                    <input
                      id='appointment-email'
                      type='email'
                      value={appointmentEmail}
                      onChange={(e) => setAppointmentEmail(e.target.value)}
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
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
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
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
                      className='w-full appearance-none rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
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
                <div className='space-y-3'>
                  <label
                    htmlFor='appointment-date'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
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
                      className='w-full rounded-xl border-2 border-slate-200/80 bg-white/90 px-4 py-3 pr-12 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all duration-300 ease-in-out hover:border-[#4490C7]/50 hover:shadow-lg hover:bg-white dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-[#4490C7]/50 dark:hover:bg-slate-900 focus:border-[#4490C7] focus:ring-2 focus:ring-[#4490C7]/30 focus:shadow-xl dark:focus:border-[#4490C7] dark:focus:ring-[#4490C7]/40'
                    />
                    <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300' style={{ background: 'linear-gradient(to bottom right, rgba(39,57,127,0.10), rgba(68,144,199,0.10), rgba(63,169,223,0.10))' }}>
                      <CalendarDays className='h-4 w-4 text-slate-500 group-hover:text-[#4490C7] dark:text-slate-400 dark:group-hover:text-[#3FA9DF] transition-colors duration-300' />
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
                      className='w-full rounded-xl border-2 border-slate-200/80 bg-white/90 px-4 py-3 pr-12 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all duration-300 ease-in-out hover:border-[#4490C7]/50 hover:shadow-lg hover:bg-white dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-[#4490C7]/50 dark:hover:bg-slate-900 focus:border-[#4490C7] focus:ring-2 focus:ring-[#4490C7]/30 focus:shadow-xl dark:focus:border-[#4490C7] dark:focus:ring-[#4490C7]/40'
                    />
                    <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300' style={{ background: 'linear-gradient(to bottom right, rgba(39,57,127,0.10), rgba(68,144,199,0.10), rgba(63,169,223,0.10))' }}>
                      <Clock className='h-4 w-4 text-slate-500 group-hover:text-[#4490C7] dark:text-slate-400 dark:group-hover:text-[#3FA9DF] transition-colors duration-300' />
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
                  className='w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
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
                      ${!isAppointmentFormValid || isSubmittingAppointment
                        ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500'
                        : 'text-white hover:scale-[1.02] hover:shadow-xl'
                      }`}
                    style={(!isAppointmentFormValid || isSubmittingAppointment) ? {} : { background: 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)', boxShadow: '0 8px 24px -6px rgba(46,83,145,0.40)' }}
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
            <p className='text-base sm:text-lg font-semibold uppercase tracking-[0.22em]' style={{ color: '#27397F' }}>
              Réseaux &amp; communauté
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className='rounded-3xl bg-white/95 p-8 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:text-slate-100 dark:ring-slate-700/80'
          >
            <p className='mb-10 text-center text-base leading-relaxed text-slate-700 dark:text-slate-200'>
              Retrouvez ZYNOVIA Academy sur les réseaux sociaux pour suivre les projets des élèves,
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
                  className='text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 hover:text-[#4490C7] dark:hover:text-[#3FA9DF] hover:bg-[#27397F]/10 dark:hover:bg-[#4490C7]/20 transition-all duration-300'
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
                  className='text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 hover:text-[#4490C7] dark:hover:text-[#3FA9DF] hover:bg-[#27397F]/10 dark:hover:bg-[#4490C7]/20 transition-all duration-300'
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
                  className='text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl p-4 hover:text-[#4490C7] dark:hover:text-[#3FA9DF] hover:bg-[#27397F]/10 dark:hover:bg-[#4490C7]/20 transition-all duration-300'
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


