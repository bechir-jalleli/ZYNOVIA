'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  CalendarDays,
  User,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
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

const brandGradient = 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)'
const brandShadow = '0 8px 24px -6px rgba(46,83,145,0.40)'

const RendezVousContent = () => {
  const [appointmentName, setAppointmentName] = useState('')
  const [appointmentEmail, setAppointmentEmail] = useState('')
  const [appointmentPhone, setAppointmentPhone] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [appointmentType, setAppointmentType] = useState<'visio' | 'onsite' | ''>('')
  const [appointmentMessage, setAppointmentMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

  const isFormValid =
    appointmentName.trim().length > 0 &&
    isValidEmail(appointmentEmail) &&
    appointmentDate !== '' &&
    appointmentTime !== '' &&
    appointmentType !== ''

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setIsSubmitting(true)
    setError(null)

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
          website: '',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Échec de l'envoi de la demande de rendez-vous")
      }

      setSubmitted(true)
      setAppointmentName('')
      setAppointmentEmail('')
      setAppointmentPhone('')
      setAppointmentDate('')
      setAppointmentTime('')
      setAppointmentType('')
      setAppointmentMessage('')
      setTimeout(() => setSubmitted(false), 6000)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.'
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
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
              <p
                className='inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] shadow-sm ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:ring-white/10'
                style={{ color: '#27397F' }}
              >
                <span className='h-2 w-2 rounded-full' style={{ background: brandGradient }} />
                Rendez-vous
              </p>

              <h1 className='text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
                Prenez rendez-vous avec ZYNOVIA Academy
              </h1>

              <p
                className='text-lg font-semibold'
                style={{ background: brandGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                Un échange personnalisé pour répondre à vos besoins
              </p>

              <p className='max-w-2xl text-sm sm:text-base text-slate-700 dark:text-slate-300'>
                Que vous souhaitiez inscrire votre enfant, mettre en place un programme dans votre établissement
                ou lancer un projet RSE, réservez un créneau en visioconférence ou sur site.
              </p>

              {/* Info cards */}
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4'>
                {[
                  { icon: Video, label: 'Visioconférence', desc: 'Échange à distance, flexible et rapide' },
                  { icon: MapPin, label: 'Sur site – Tunis', desc: 'Rencontre dans nos locaux à Tunis' },
                  { icon: Clock, label: 'Lun – Ven, 8h–19h', desc: 'Créneaux disponibles en semaine' },
                  { icon: CheckCircle2, label: 'Confirmation par email', desc: 'Nous confirmons votre rendez-vous' },
                ].map(({ icon: Ic, label, desc }) => (
                  <div
                    key={label}
                    className='flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-900/80 dark:ring-slate-700/60'
                  >
                    <div
                      className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white'
                      style={{ background: brandGradient, boxShadow: '0 4px 12px rgba(46,83,145,0.35)' }}
                    >
                      <Ic className='h-4 w-4' />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-[#0A004B] dark:text-white'>{label}</p>
                      <p className='text-xs text-slate-500 dark:text-slate-400'>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration */}
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
                  alt='Prenez rendez-vous avec ZYNOVIA Academy'
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

      {/* SECTION – Rendez-vous form */}
      <section id='appointment-form' className='py-20 lg:py-28 scroll-mt-24'>
        <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left mb-12'
          >
            <p className='text-base sm:text-lg font-semibold uppercase tracking-[0.22em]' style={{ color: '#27397F' }}>
              Réservez un créneau
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
                Réservez un rendez-vous en visioconférence ou sur site pour découvrir nos programmes ou établir un partenariat.
                Notre équipe vous contactera pour confirmer la date et l&apos;heure.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className='flex flex-col items-center gap-4 py-12 text-center'
              >
                <div
                  className='flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg'
                  style={{ background: brandGradient }}
                >
                  <CheckCircle2 className='h-8 w-8' />
                </div>
                <h3 className='text-lg font-semibold text-[#0A004B] dark:text-white'>
                  Demande envoyée avec succès !
                </h3>
                <p className='max-w-md text-sm text-slate-600 dark:text-slate-300'>
                  Votre demande de rendez-vous a été reçue. Nous vous confirmerons la date et l&apos;heure par email sous 24h.
                </p>
                <Link
                  href='/contact'
                  className='mt-2 text-sm font-semibold underline underline-offset-2'
                  style={{ color: '#4490C7' }}
                >
                  Retour à la page Contact
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Name & Email */}
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                  <div className='space-y-3'>
                    <label htmlFor='rdv-name' className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'>
                      Nom &amp; prénom
                    </label>
                    <div className='relative'>
                      <input
                        id='rdv-name'
                        type='text'
                        value={appointmentName}
                        onChange={(e) => setAppointmentName(e.target.value)}
                        placeholder='Jean Dupont'
                        className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                      />
                      <User className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <label htmlFor='rdv-email' className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'>
                      Email
                    </label>
                    <div className='relative'>
                      <input
                        id='rdv-email'
                        type='email'
                        value={appointmentEmail}
                        onChange={(e) => setAppointmentEmail(e.target.value)}
                        placeholder='vous@exemple.com'
                        className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                      />
                      <Mail className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                    </div>
                  </div>
                </div>

                {/* Phone & Type */}
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                  <div className='space-y-3'>
                    <label htmlFor='rdv-phone' className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'>
                      Téléphone (optionnel)
                    </label>
                    <div className='relative'>
                      <input
                        id='rdv-phone'
                        type='tel'
                        value={appointmentPhone}
                        onChange={(e) => setAppointmentPhone(e.target.value)}
                        placeholder='+216 XX XXX XXX'
                        className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                      />
                      <Phone className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <label htmlFor='rdv-type' className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'>
                      Type de rendez-vous
                    </label>
                    <div className='relative'>
                      <select
                        id='rdv-type'
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

                {/* Date & Time */}
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                  <div className='space-y-3'>
                    <label htmlFor='rdv-date' className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'>
                      Date souhaitée
                    </label>
                    <div className='relative group'>
                      <input
                        id='rdv-date'
                        type='date'
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        min={getMinDate()}
                        className='w-full rounded-xl border-2 border-slate-200/80 bg-white/90 px-4 py-3 pr-12 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all duration-300 hover:border-[#4490C7]/50 hover:shadow-lg hover:bg-white dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-[#4490C7]/50 focus:border-[#4490C7] focus:ring-2 focus:ring-[#4490C7]/30 focus:shadow-xl'
                      />
                      <div
                        className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300'
                        style={{ background: 'linear-gradient(to bottom right, rgba(39,57,127,0.10), rgba(68,144,199,0.10), rgba(63,169,223,0.10))' }}
                      >
                        <CalendarDays className='h-4 w-4 text-slate-500 group-hover:text-[#4490C7] dark:text-slate-400 transition-colors duration-300' />
                      </div>
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <label htmlFor='rdv-time' className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'>
                      Heure souhaitée
                    </label>
                    <div className='relative group'>
                      <input
                        id='rdv-time'
                        type='time'
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        className='w-full rounded-xl border-2 border-slate-200/80 bg-white/90 px-4 py-3 pr-12 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all duration-300 hover:border-[#4490C7]/50 hover:shadow-lg hover:bg-white dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-[#4490C7]/50 focus:border-[#4490C7] focus:ring-2 focus:ring-[#4490C7]/30 focus:shadow-xl'
                      />
                      <div
                        className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300'
                        style={{ background: 'linear-gradient(to bottom right, rgba(39,57,127,0.10), rgba(68,144,199,0.10), rgba(63,169,223,0.10))' }}
                      >
                        <Clock className='h-4 w-4 text-slate-500 group-hover:text-[#4490C7] dark:text-slate-400 transition-colors duration-300' />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className='space-y-3'>
                  <label htmlFor='rdv-message' className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'>
                    Message (optionnel)
                  </label>
                  <textarea
                    id='rdv-message'
                    value={appointmentMessage}
                    onChange={(e) => setAppointmentMessage(e.target.value)}
                    rows={3}
                    placeholder='Précisez le sujet de votre rendez-vous ou toute information supplémentaire...'
                    className='w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                  />
                </div>

                {/* Errors & Submit */}
                <div className='flex flex-col gap-3'>
                  {error && (
                    <div className='rounded-xl bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-800'>
                      {error}
                    </div>
                  )}
                  <div className='flex flex-wrap items-center gap-4'>
                    <button
                      id='rdv-submit'
                      type='submit'
                      disabled={!isFormValid || isSubmitting}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold shadow-lg transition focus-visible:outline-none
                        ${!isFormValid || isSubmitting
                          ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500'
                          : 'text-white hover:scale-[1.02] hover:shadow-xl'
                        }`}
                      style={(!isFormValid || isSubmitting) ? {} : { background: brandGradient, boxShadow: brandShadow }}
                    >
                      <CalendarDays className='h-4 w-4' />
                      {isSubmitting ? 'Envoi en cours...' : 'Réserver le rendez-vous'}
                    </button>

                    <Link
                      href='/contact'
                      className='text-sm font-medium text-slate-500 underline underline-offset-2 hover:text-[#4490C7] transition-colors'
                    >
                      Plutôt envoyer un message ?
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION – Autres moyens de contact */}
      <section className='py-20 lg:py-24'>
        <div className='container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='mx-auto max-w-3xl text-center md:text-left mb-12'
          >
            <p className='text-base sm:text-lg font-semibold uppercase tracking-[0.22em]' style={{ color: '#27397F' }}>
              Autres moyens de nous contacter
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='initial'
            whileInView='whileInView'
            viewport={{ once: true, amount: 0.3 }}
            className='grid grid-cols-1 gap-6 sm:grid-cols-3'
          >
            {[
              {
                icon: Phone,
                label: 'Téléphone',
                value: '+216 25 857 621',
                href: 'tel:+21625857621',
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'contact@zynovia-academy.com',
                href: 'mailto:contact@zynovia-academy.com',
              },
              {
                icon: MapPin,
                label: 'Localisation',
                value: 'V74G+2MP, Tunis',
                href: 'https://www.google.com/maps/place/ZYNOVIA/@36.8550972,10.274117,17z',
              },
            ].map(({ icon: Ic, label, value, href }) => (
              <motion.div
                key={label}
                variants={cardVariant}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className='group flex flex-col gap-3 rounded-3xl bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-700/70 hover:shadow-xl transition-shadow duration-300'
              >
                <div
                  className='inline-flex h-11 w-11 items-center justify-center rounded-xl text-white'
                  style={{ background: brandGradient, boxShadow: '0 4px 12px rgba(46,83,145,0.40)' }}
                >
                  <Ic className='h-5 w-5' />
                </div>
                <p className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>{label}</p>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel='noopener noreferrer'
                  className='text-sm font-medium text-[#0A004B] dark:text-white hover:text-[#4490C7] dark:hover:text-[#3FA9DF] transition-colors duration-200'
                >
                  {value}
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className='mt-12 flex justify-center gap-6'
          >
            {[
              { icon: 'tabler:brand-facebook-filled', href: 'https://www.facebook.com/Inoteqiaacademy?locale=fr_FR', label: 'Facebook' },
              { icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/inoteqiaacademy/', label: 'Instagram' },
              { icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/company/inoteqia-academy/about/', label: 'LinkedIn' },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='group transition-transform duration-300 hover:scale-110'
              >
                <Icon
                  icon={icon}
                  width={56}
                  height={56}
                  className='text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl p-3 hover:text-[#4490C7] dark:hover:text-[#3FA9DF] hover:bg-[#27397F]/10 dark:hover:bg-[#4490C7]/20 transition-all duration-300'
                />
              </a>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default RendezVousContent
