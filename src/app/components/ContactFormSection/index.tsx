'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Handshake, CheckCircle2, XCircle, Send } from 'lucide-react'

type Role = 'Parent' | 'school' | 'company' | 'institution' | ''

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
}

const roleLabels: Record<string, string> = {
  Parent: 'Parent',
  school: 'Établissement scolaire',
  company: 'Entreprise',
  institution: 'Institution & associations',
}

const brandGradient = 'linear-gradient(to right, #27397F, #2E5391, #4490C7, #3FA9DF)'
const brandShadow = '0 8px 24px -6px rgba(46,83,145,0.40)'

interface ContactFormSectionProps {
  prefillRole?: Role
  scrollOnPrefill?: boolean
}

const ContactFormSection = ({ prefillRole, scrollOnPrefill = true }: ContactFormSectionProps) => {
  const [role, setRole] = useState<Role>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

  const isFormValid =
    name.trim().length > 0 && isValidEmail(email) && role !== '' && message.trim().length > 0

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const type = params.get('profil')


    let resolvedRole: Role = prefillRole || ''
    if (type === 'Parent') resolvedRole = 'Parent'
    else if (type === 'etablissement') resolvedRole = 'school'
    else if (type === 'Entreprise') resolvedRole = 'company'
    else if (type === 'institution') resolvedRole = 'institution'

    if (resolvedRole) {
      setRole(resolvedRole)
      if (scrollOnPrefill) {
        setTimeout(() => {
          const formSection = document.getElementById('contact-form')
          formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [prefillRole, scrollOnPrefill])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid || honeypot) {
      if (honeypot) {
        console.warn('Form submission blocked by spam protection (honeypot triggered). Value:', honeypot);
      }
      return
    }
    setIsSubmitting(true)
    setError(null)
    setSubmitted(false)

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
          formType: 'contact',
          website: honeypot,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || "Échec de l'envoi du message.")
      }

      setSubmitted(true)
      setName('')
      setEmail('')
      setPhone('')
      setRole('')
      setMessage('')
      setHoneypot('')
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
    <section id='contact-form' className='py-20 lg:py-28 scroll-mt-24'>
      <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='max-w-3xl text-center md:text-left mb-12'
        >
          <p className='mx-auto w-fit text-base sm:text-lg font-semibold uppercase tracking-[0.22em]' style={{ color: '#27397F' }}>
            Envoyez-nous votre message
          </p>


        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className='rounded-3xl bg-white/95 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.14)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/80'
        >
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
                Message envoyé avec succès !
              </h3>
              <p className='max-w-md text-sm text-slate-600 dark:text-slate-300'>
                Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
              </p>
              <Link
                href='/rendez-vous'
                className='mt-2 text-sm font-semibold underline underline-offset-2'
                style={{ color: '#4490C7' }}
              >
                Réserver un rendez-vous ?
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Honeypot */}
              <input
                type='text'
                name='contact_bot_check'
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete='off'
                style={{ position: 'absolute', left: '-9999px' }}
                aria-hidden='true'
              />

              {/* Name & Email */}
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div className='space-y-3'>
                  <label
                    htmlFor='contact-name'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Nom &amp; prénom
                  </label>
                  <div className='relative'>
                    <input
                      id='contact-name'
                      type='text'
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Jean Dupont'
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    />
                    <User className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>

                <div className='space-y-3'>
                  <label
                    htmlFor='contact-email'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Adresse e-mail
                  </label>
                  <div className='relative'>
                    <input
                      id='contact-email'
                      type='email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='vous@exemple.com'
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    />
                    <Mail className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>
              </div>

              {/* Phone & Role */}
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <div className='space-y-3'>
                  <label
                    htmlFor='contact-phone'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Téléphone <span className='normal-case font-normal text-slate-400'>(optionnel)</span>
                  </label>
                  <div className='relative'>
                    <input
                      id='contact-phone'
                      type='tel'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='+216 XX XXX XXX'
                      className='w-full rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    />
                    <Phone className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>

                <div className='space-y-3'>
                  <label
                    htmlFor='contact-role'
                    className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                  >
                    Profil
                  </label>
                  <div className='relative'>
                    <select
                      id='contact-role'
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value as Role)}
                      className='w-full appearance-none rounded-xl border border-slate-200/80 bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                    >
                      <option value=''>Sélectionner votre profil</option>
                      <option value='Parent'>{roleLabels.Parent}</option>
                      <option value='school'>{roleLabels.school}</option>
                      <option value='company'>{roleLabels.company}</option>
                      <option value='institution'>{roleLabels.institution}</option>
                    </select>
                    <Handshake className='pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400' />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className='space-y-3'>
                <label
                  htmlFor='contact-message'
                  className='block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300'
                >
                  Message
                </label>
                <textarea
                  id='contact-message'
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder='Décrivez votre demande ou votre question...'
                  className='w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4490C7] focus:ring-1 focus:ring-[#4490C7]/40 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100'
                />
              </div>

              {/* Status messages & Submit */}
              <div className='flex flex-col gap-4'>

                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex items-start gap-3 rounded-xl bg-red-50 p-4 ring-1 ring-red-200 dark:bg-red-900/20 dark:ring-red-800'
                  >
                    <XCircle className='h-5 w-5 shrink-0 mt-0.5 text-red-500 dark:text-red-400' />
                    <div>
                      <p className='text-sm font-semibold text-red-700 dark:text-red-400'>
                        Échec de l&apos;envoi
                      </p>
                      <p className='mt-0.5 text-xs text-red-600 dark:text-red-500'>
                        {error}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Submit button */}
                <div className='flex flex-wrap items-center gap-4'>
                  <button
                    type='submit'
                    disabled={!isFormValid || isSubmitting}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold shadow-lg transition focus-visible:outline-none
                    ${!isFormValid || isSubmitting
                        ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500'
                        : 'text-white hover:scale-[1.02] hover:shadow-xl'
                      }`}
                    style={(!isFormValid || isSubmitting) ? {} : { background: brandGradient, boxShadow: brandShadow }}
                  >
                    <Send className='h-4 w-4' />
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>

                  <Link
                    href='/rendez-vous'
                    className='text-sm font-medium text-slate-500 underline underline-offset-2 hover:text-[#4490C7] transition-colors'
                  >
                    Plutôt réserver un rendez-vous ?
                  </Link>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default ContactFormSection