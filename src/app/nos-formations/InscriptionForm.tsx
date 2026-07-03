'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fadeInUp } from './animations'

export default function InscriptionForm() {
  const [formTab] = useState(0)
  const [parentName, setParentName] = useState('')
  const [parentSurname, setParentSurname] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [parentCity, setParentCity] = useState('')
  const [parentRelation, setParentRelation] = useState('')
  const [childName, setChildName] = useState('')
  const [childSurname, setChildSurname] = useState('')
  const [childAge, setChildAge] = useState('')
  const [childGender, setChildGender] = useState('')
  const [childSchool, setChildSchool] = useState('')
  const [childLevel, setChildLevel] = useState('')
  const [childAiUsage, setChildAiUsage] = useState('')
  const [formationChoice, setFormationChoice] = useState('')
  const [preferredSchedule, setPreferredSchedule] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [consent1, setConsent1] = useState(false)
  const [consent2, setConsent2] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [counseling, setCounseling] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent1 || !consent2) return
    setIsSubmitting(true)
    setFormError(null)

    try {
      const response = await fetch('/api/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${parentName} ${parentSurname}`,
          email: parentEmail,
          phone: parentPhone,
          role: 'Parent',
          formType: 'inscription',
          message: `--- Demande d'inscription ---
Parent: ${parentName} ${parentSurname}
Téléphone: ${parentPhone}
Email: ${parentEmail}
Ville: ${parentCity}
Relation: ${parentRelation}

Enfant: ${childName} ${childSurname}
Âge: ${childAge}
Genre: ${childGender}
École: ${childSchool}
Niveau: ${childLevel}
Usage IA: ${childAiUsage}

Formation choisie: ${formationChoice}
Période souhaitée: ${preferredSchedule}
Préférence horaire: ${preferredTime}
Souhaite être conseillé: ${counseling ? 'Oui' : 'Non'}

Message: ${formMessage || 'Aucun'}`,
          website: '',
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Échec de l'envoi")

      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 6000)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Une erreur est survenue.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id='inscription-form' className='py-20 lg:py-28 scroll-mt-24'>
      <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <motion.div {...fadeInUp} className='text-center mb-14'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white'>
            Formulaire d&apos;inscription
          </h2>
        </motion.div>

        <motion.div
          {...fadeInUp}
          className='rounded-3xl bg-white dark:bg-slate-900 shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 overflow-hidden'
        >
          {/* Form Tabs Header - 4 Steps */}
          <div className='grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 dark:border-slate-700'>
            {[
              { label: 'Informations du parent' },
              { label: 'Informations de l\'enfant' },
              { label: 'Choix de la formation' },
              { label: 'Disponibilités et message' },
            ].map((tab, idx) => (
              <div
                key={idx}
                className='flex items-center gap-2.5 p-4 text-xs font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800 last:border-r-0'
              >
                <div className='flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0'>
                  {idx + 1}
                </div>
                <span className='leading-tight'>{tab.label}</span>
              </div>
            ))}
          </div>

          {submitted ? (
            <div className='p-12 text-center'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand text-white shadow-lg mx-auto mb-4'>
                <Icon icon='solar:check-read-bold' className='w-8 h-8' />
              </div>
              <h3 className='text-lg font-bold text-[#0A004B] dark:text-white mb-2'>
                Demande envoyée avec succès !
              </h3>
              <p className='text-sm text-slate-600 dark:text-slate-300'>
                Notre équipe vous contactera rapidement pour confirmer les détails de la formation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className='p-6 sm:p-8'>
              {/* 4 Columns layout inside the form */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start'>

                {/* Column 1: Parent Info */}
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold'>1</div>
                    <h4 className='text-xs font-bold text-[#0A004B] dark:text-white'>Informations du parent</h4>
                  </div>
                  
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Nom du parent *</label>
                    <input type='text' required value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder='Nom' className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100' />
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Prénom du parent *</label>
                    <input type='text' required value={parentSurname} onChange={(e) => setParentSurname(e.target.value)} placeholder='Prénom' className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100' />
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Téléphone *</label>
                    <div className='relative'>
                      <Icon icon='solar:phone-calling-bold' className='absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400' />
                      <input type='tel' required value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} placeholder='+216 XX XXX XXX' className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9 pr-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100' />
                    </div>
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Email *</label>
                    <div className='relative'>
                      <Icon icon='solar:letter-bold' className='absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400' />
                      <input type='email' required value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} placeholder='exemple@email.com' className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9 pr-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100' />
                    </div>
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Ville *</label>
                    <select required value={parentCity} onChange={(e) => setParentCity(e.target.value)} className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:14px] bg-[right_10px_center] bg-no-repeat pr-8'>
                      <option value=''>Sélectionnez votre ville</option>
                      <option value='Tunis'>Tunis</option>
                      <option value='Ariana'>Ariana</option>
                      <option value='Ben Arous'>Ben Arous</option>
                      <option value='La Manouba'>La Manouba</option>
                      <option value='Autre'>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Relation avec l&apos;enfant *</label>
                    <select required value={parentRelation} onChange={(e) => setParentRelation(e.target.value)} className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:14px] bg-[right_10px_center] bg-no-repeat pr-8'>
                      <option value=''>Sélectionnez</option>
                      <option value='Père'>Père</option>
                      <option value='Mère'>Mère</option>
                      <option value='Tuteur'>Tuteur</option>
                      <option value='Autre'>Autre</option>
                    </select>
                  </div>
                </div>

                {/* Column 2: Child Info */}
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold'>2</div>
                    <h4 className='text-xs font-bold text-[#0A004B] dark:text-white'>Informations de l&apos;enfant</h4>
                  </div>

                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Nom de l&apos;enfant *</label>
                    <input type='text' required value={childName} onChange={(e) => setChildName(e.target.value)} placeholder='Nom' className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100' />
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Prénom de l&apos;enfant *</label>
                    <input type='text' required value={childSurname} onChange={(e) => setChildSurname(e.target.value)} placeholder='Prénom' className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100' />
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Âge *</label>
                    <select required value={childAge} onChange={(e) => setChildAge(e.target.value)} className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:14px] bg-[right_10px_center] bg-no-repeat pr-8'>
                      <option value=''>Sélectionnez</option>
                      <option value='11'>11 ans</option>
                      <option value='12'>12 ans</option>
                      <option value='13'>13 ans</option>
                      <option value='14'>14 ans</option>
                      <option value='15'>15 ans</option>
                      <option value='16'>16 ans</option>
                      <option value='17'>17 ans</option>
                      <option value='18'>18 ans</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Niveau scolaire *</label>
                    <select required value={childSchool} onChange={(e) => setChildSchool(e.target.value)} className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:14px] bg-[right_10px_center] bg-no-repeat pr-8'>
                      <option value=''>Sélectionnez</option>
                      <option value='Primaire'>Primaire</option>
                      <option value='Collège'>Collège</option>
                      <option value='Lycée'>Lycée</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Niveau en informatique *</label>
                    <select required value={childLevel} onChange={(e) => setChildLevel(e.target.value)} className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:14px] bg-[right_10px_center] bg-no-repeat pr-8'>
                      <option value='Débutant'>Débutant</option>
                      <option value='Intermédiaire'>Intermédiaire</option>
                      <option value='Avancé'>Avancé</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>A déjà utilisé des outils IA ? *</label>
                    <select required value={childAiUsage} onChange={(e) => setChildAiUsage(e.target.value)} className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:14px] bg-[right_10px_center] bg-no-repeat pr-8'>
                      <option value=''>Sélectionnez</option>
                      <option value='Oui'>Oui</option>
                      <option value='Non'>Non</option>
                    </select>
                  </div>
                </div>

                {/* Column 3: Formation Choice */}
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold'>3</div>
                    <h4 className='text-xs font-bold text-[#0A004B] dark:text-white'>Choix de la formation</h4>
                  </div>
                  <p className='text-[10px] text-slate-500 dark:text-slate-400'>
                    Sélectionnez le programme qui vous intéresse
                  </p>

                  <div className='space-y-3'>
                    {/* Bootcamp Option */}
                    <label
                      className={`block p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formationChoice === 'bootcamp'
                          ? 'border-blue-600 bg-blue-50/10'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className='flex items-start gap-2.5'>
                        <input
                          type='radio'
                          name='formation'
                          value='bootcamp'
                          checked={formationChoice === 'bootcamp'}
                          onChange={(e) => setFormationChoice(e.target.value)}
                          className='mt-1 accent-blue-600'
                        />
                        <div>
                          <span className='text-xs font-bold text-[#0A004B] dark:text-white block leading-tight'>
                            Bootcamp IA &amp; Machine Learning
                          </span>
                          <span className='text-[10px] text-blue-600 font-medium'>
                            Programme intensif 20h
                          </span>
                        </div>
                      </div>
                    </label>

                    {/* Generative Option */}
                    <label
                      className={`block p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        formationChoice === 'generative'
                          ? 'border-emerald-600 bg-emerald-50/10'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className='flex items-start gap-2.5'>
                        <input
                          type='radio'
                          name='formation'
                          value='generative'
                          checked={formationChoice === 'generative'}
                          onChange={(e) => setFormationChoice(e.target.value)}
                          className='mt-1 accent-emerald-600'
                        />
                        <div>
                          <span className='text-xs font-bold text-[#0A004B] dark:text-white block leading-tight'>
                            IA Générative &amp; Outils du Futur
                          </span>
                          <span className='text-[10px] text-emerald-600 font-medium'>
                            Session pratique 9h
                          </span>
                        </div>
                      </div>
                    </label>

                    {/* Counseling option */}
                    <label className={`block p-3.5 rounded-xl border cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      counseling ? 'border-blue-600 bg-blue-50/5' : 'border-dashed border-slate-200 dark:border-slate-700'
                    }`}>
                      <div className='flex items-start gap-2.5'>
                        <input
                          type='checkbox'
                          checked={counseling}
                          onChange={(e) => setCounseling(e.target.checked)}
                          className='mt-0.5 accent-blue-600'
                        />
                        <div>
                          <span className='text-xs font-medium text-[#0A004B] dark:text-white block leading-tight'>
                            Je souhaite être conseillé
                          </span>
                          <span className='text-[10px] text-slate-400 dark:text-slate-500'>
                            Je ne suis pas encore sûr(e)
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Column 4: Schedule & Message */}
                <div className='space-y-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold'>4</div>
                    <h4 className='text-xs font-bold text-[#0A004B] dark:text-white'>Disponibilités et message</h4>
                  </div>
                  
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Période souhaitée *</label>
                    <select required value={preferredSchedule} onChange={(e) => setPreferredSchedule(e.target.value)} className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:14px] bg-[right_10px_center] bg-no-repeat pr-8'>
                      <option value=''>Sélectionnez</option>
                      <option value='Vacances été'>Vacances d&apos;été</option>
                      <option value='Vacances automne'>Vacances d&apos;automne</option>
                      <option value='Vacances hiver'>Vacances d&apos;hiver</option>
                      <option value='Vacances printemps'>Vacances de printemps</option>
                      <option value='Flexible'>Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Préférence horaire *</label>
                    <select required value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:14px] bg-[right_10px_center] bg-no-repeat pr-8'>
                      <option value=''>Sélectionnez</option>
                      <option value='Matin'>Matin</option>
                      <option value='Après-midi'>Après-midi</option>
                      <option value='Flexible'>Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1'>Message / Question</label>
                    <textarea
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      rows={3}
                      placeholder='Votre message...'
                      className='w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-slate-900 dark:text-slate-100 resize-none'
                    />
                  </div>
                </div>

              </div>

              {/* Consent + Submit Footer */}
              <div className='mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6'>
                <div className='space-y-2 flex-1'>
                  <label className='flex items-start gap-2.5 cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={consent1}
                      onChange={(e) => setConsent1(e.target.checked)}
                      className='mt-0.5 accent-blue-600 rounded'
                    />
                    <span className='text-[10px] text-slate-500 dark:text-slate-400 leading-normal'>
                      J&apos;accepte que mes informations soient utilisées pour me recontacter concernant cette demande. *
                    </span>
                  </label>
                  <label className='flex items-start gap-2.5 cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={consent2}
                      onChange={(e) => setConsent2(e.target.checked)}
                      className='mt-0.5 accent-blue-600 rounded'
                    />
                    <span className='text-[10px] text-slate-500 dark:text-slate-400 leading-normal'>
                      J&apos;accepte les conditions générales d&apos;utilisation et la politique de confidentialité de Zynovia Academy. *
                    </span>
                  </label>
                </div>

                {formError && (
                  <div className='rounded-xl bg-red-50 dark:bg-red-900/20 p-2.5 text-xs text-red-700 dark:text-red-400 ring-1 ring-red-200 dark:ring-red-800 mb-2'>
                    {formError}
                  </div>
                )}

                <div className='flex flex-col sm:flex-row items-center gap-4 lg:w-auto w-full'>
                  <button
                    type='submit'
                    disabled={!consent1 || !consent2 || isSubmitting}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold shadow-md transition-all duration-300 ${
                      !consent1 || !consent2 || isSubmitting
                        ? 'cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                        : 'text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-[1.01]'
                    }`}
                  >
                    {isSubmitting ? 'Envoi...' : "Envoyer ma demande d'inscription"}
                    <Icon icon='solar:send-square-bold' className='w-4 h-4' />
                  </button>
                </div>
              </div>

              {/* Bottom confirmation line with checkmark */}
              <div className='mt-5 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs border-t border-slate-100 dark:border-slate-800/40 pt-4'>
                <Icon icon='solar:verified-check-bold' className='w-4 h-4 text-blue-500' />
                <span>Notre équipe vous contactera rapidement pour confirmer les détails de la formation.</span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
