'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { staticFormations } from './FormationsList'
import { fadeInUp, scaleIn } from './SectionHeading'
import DownloadModal from './DownloadModal'

type PaymentMethod = 'especes' | 'virement' | 'mandat' | ''

const paymentMethods: {
  value: Exclude<PaymentMethod, ''>
  label: string
  description: string
  icon: string
}[] = [
  {
    value: 'especes',
    label: 'Espèces',
    description: 'Règlement sur place',
    icon: 'solar:banknote-2-bold-duotone',
  },
  {
    value: 'virement',
    label: 'Virement bancaire',
    description: 'Transfert vers notre compte',
    icon: 'solar:card-transfer-bold-duotone',
  },
  {
    value: 'mandat',
    label: 'Mandat postal',
    description: 'Envoi par la poste',
    icon: 'solar:mailbox-bold-duotone',
  },
]

const fieldGroups = [
  {
    legend: 'Coordonnées du parent',
    icon: 'solar:user-bold-duotone',
    fields: [
      { placeholder: 'Nom', icon: 'solar:user-id-bold-duotone' },
      { placeholder: 'Prénom', icon: 'solar:user-id-bold-duotone' },
      { placeholder: 'Téléphone', icon: 'solar:phone-bold-duotone', type: 'tel' },
      { placeholder: 'E-mail', icon: 'solar:letter-bold-duotone', type: 'email' },
    ],
  },
  {
    legend: "Informations sur l'enfant",
    icon: 'solar:smile-circle-bold-duotone',
    fields: [
      { placeholder: "Nom de l'enfant", icon: 'solar:user-heart-bold-duotone' },
      { placeholder: "Âge de l'enfant", icon: 'solar:cake-bold-duotone' },
    ],
  },
]

export default function ReservationPaymentSection({ preselectedFormation = '' }: { preselectedFormation?: string }) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('')
  const [formations, setFormations] = useState<any[]>([])
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    parentNom: '',
    parentPrenom: '',
    parentPhone: '',
    parentEmail: '',
    childName: '',
    childAge: '',
    selectedFormation: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Auto-select the formation when triggered from a card
  useEffect(() => {
    if (preselectedFormation) {
      setFormData(prev => ({ ...prev, selectedFormation: preselectedFormation }))
      setSuccess(false)
      setError('')
    }
  }, [preselectedFormation])

  useEffect(() => {
    async function loadFormations() {
      try {
        const res = await fetch('/api/formations')
        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) {
            setFormations(data)
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic formations in checkout:', err)
      }
    }
    loadFormations()
  }, [])

  const handleInputChange = (fieldPlaceholder: string, value: string) => {
    const keyMap: Record<string, string> = {
      'Nom': 'parentNom',
      'Prénom': 'parentPrenom',
      'Téléphone': 'parentPhone',
      'E-mail': 'parentEmail',
      "Nom de l'enfant": 'childName',
      "Âge de l'enfant": 'childAge',
    }
    const key = keyMap[fieldPlaceholder]
    if (key) {
      setFormData(prev => ({ ...prev, [key]: value }))
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.parentEmail.trim())) {
      setError("Format d'email du parent invalide.")
      return
    }

    const phoneRegex = /^[0-9]{8}$/
    if (!phoneRegex.test(formData.parentPhone.trim())) {
      setError('Le numéro de téléphone du parent doit contenir exactement 8 chiffres.')
      return
    }

    if (!formData.selectedFormation) {
      setError('Veuillez sélectionner une formation.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.parentNom} ${formData.parentPrenom}`,
          email: formData.parentEmail,
          phone: formData.parentPhone,
          role: 'Inscription',
          message: `Nom de l'enfant: ${formData.childName}\nÂge de l'enfant: ${formData.childAge}\nFormation souhaitée: ${formData.selectedFormation}\nMode de paiement: ${paymentMethod}\nMessage: ${formData.message}`,
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({
          parentNom: '',
          parentPrenom: '',
          parentPhone: '',
          parentEmail: '',
          childName: '',
          childAge: '',
          selectedFormation: '',
          message: '',
        })
        setPaymentMethod('')
      } else {
        const data = await res.json()
        setError(data.error || "Une erreur est survenue lors de la soumission.")
      }
    } catch (err) {
      console.error(err)
      setError("Une erreur est survenue lors de la soumission.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id='inscription-form' className='py-16 lg:py-20 scroll-mt-24'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-5 gap-6 lg:gap-8 items-start'>
          {/* Reservation form + payment */}
          <motion.div
            {...fadeInUp}
            className='lg:col-span-3 relative overflow-hidden rounded-[28px] bg-[#0A004B] p-6 sm:p-10'
          >
            {/* ambient glow accents */}
            <div className='pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#3FA9DF]/20 blur-3xl' />
            <div className='pointer-events-none absolute -bottom-28 -left-16 w-64 h-64 rounded-full bg-[#27397F]/30 blur-3xl' />

            <div className='relative'>
              <span className='inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#3FA9DF] bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4'>
                <Icon icon='solar:calendar-add-bold-duotone' className='w-3.5 h-3.5' />
                Places limitées
              </span>
              <h3 className='text-xl sm:text-2xl font-extrabold text-white mb-1'>
                Réservez la place de votre enfant
              </h3>
              <p className='text-sm text-white/50 mb-4'>
                Quelques informations suffisent, nous nous occupons du reste.
              </p>

              {/* Formation pre-selected banner */}
              {formData.selectedFormation && (
                <div className='flex items-center gap-3 rounded-[12px] bg-[#3FA9DF]/10 border border-[#3FA9DF]/30 px-4 py-3 mb-6'>
                  <Icon icon='solar:diploma-bold-duotone' className='w-5 h-5 text-[#3FA9DF] shrink-0' />
                  <div>
                    <p className='text-[11px] font-bold uppercase tracking-wider text-[#3FA9DF]/70'>Formation sélectionnée</p>
                    <p className='text-sm font-semibold text-white'>{formData.selectedFormation}</p>
                  </div>
                </div>
              )}

              <form className='flex flex-col gap-8' onSubmit={handleFormSubmit}>
                {fieldGroups.map((group) => (
                  <fieldset key={group.legend}>
                    <legend className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 mb-3'>
                      <Icon icon={group.icon} className='w-4 h-4 text-[#3FA9DF]' />
                      {group.legend}
                    </legend>
                    <div className='grid sm:grid-cols-2 gap-4'>
                      {group.fields.map((field) => {
                        const keyMap: Record<string, keyof typeof formData> = {
                          'Nom': 'parentNom',
                          'Prénom': 'parentPrenom',
                          'Téléphone': 'parentPhone',
                          'E-mail': 'parentEmail',
                          "Nom de l'enfant": 'childName',
                          "Âge de l'enfant": 'childAge',
                        }
                        const stateKey = keyMap[field.placeholder]
                        return (
                          <div key={field.placeholder} className='relative'>
                           
                            <input
                              id={field.placeholder === 'Nom' ? 'parent-nom-input' : undefined}
                              placeholder={field.placeholder}
                              type={field.type || 'text'}
                              className='formation-input pl-10'
                              value={stateKey ? formData[stateKey] : ''}
                              onChange={(e) => stateKey && handleInputChange(field.placeholder, e.target.value)}
                              required
                            />
                          </div>
                        )
                      })}
                    </div>
                  </fieldset>
                ))}

                <fieldset>
                  <legend className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 mb-3'>
                    <Icon icon='solar:notebook-bold-duotone' className='w-4 h-4 text-[#3FA9DF]' />
                    Formation souhaitée
                  </legend>
                  <div className='flex flex-col gap-4'>
                    <div className='relative'>
                      
                      <select 
                        className='formation-input pl-10 appearance-none text-slate-300' 
                        value={formData.selectedFormation}
                        onChange={(e) => setFormData(prev => ({ ...prev, selectedFormation: e.target.value }))}
                        required
                      >
                        <option value='' className='text-slate-900'>
                          Sélectionnez une formation
                        </option>
                        {formations.map((f) => (
                          <option key={f.title} value={f.title} className='text-slate-900'>
                            {f.title}
                          </option>
                        ))}
                      </select>
                      <Icon
                        icon='solar:alt-arrow-down-bold'
                        className='pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35'
                      />
                    </div>
                    <textarea
                      placeholder='Message (optionnel)'
                      rows={3}
                      className='formation-input resize-none'
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </div>
                </fieldset>

                <fieldset>
                  <legend className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 mb-3'>
                    <Icon icon='solar:wallet-money-bold-duotone' className='w-4 h-4 text-[#3FA9DF]' />
                    Mode de paiement
                    <span className='text-[#3FA9DF]' aria-hidden='true'>*</span>
                  </legend>
                  <div className='grid sm:grid-cols-3 gap-3' role='radiogroup' aria-required='true'>
                    {paymentMethods.map((method, index) => {
                      const isSelected = paymentMethod === method.value
                      return (
                        <label
                          key={method.value}
                          className={`group relative flex flex-col items-center gap-2 rounded-[14px] border px-3 py-4 cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'border-[#3FA9DF] bg-[#3FA9DF]/10 shadow-[0_0_0_1px_rgba(63,169,223,0.4)]'
                              : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.07]'
                          }`}
                        >
                          <input
                            type='radio'
                            name='paymentMethod'
                            value={method.value}
                            required={index === 0}
                            checked={isSelected}
                            onChange={() => setPaymentMethod(method.value)}
                            className='sr-only'
                          />
                          <span
                            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 ${
                              isSelected
                                ? 'bg-[#3FA9DF]/20 text-[#3FA9DF]'
                                : 'bg-white/10 text-white/50 group-hover:text-[#3FA9DF]'
                            }`}
                          >
                            <Icon icon={method.icon} className='w-5 h-5' />
                          </span>
                          <span className='text-xs font-semibold text-white text-center leading-tight'>
                            {method.label}
                          </span>
                          <span className='text-[10px] text-white/40 text-center leading-snug'>
                            {method.description}
                          </span>
                          {isSelected && (
                            <span className='absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-[#3FA9DF] text-white'>
                              <Icon icon='solar:check-circle-bold' className='w-3.5 h-3.5' />
                            </span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                  <p className='mt-4 flex items-start gap-2.5 rounded-[12px] bg-white/[0.04] border border-white/10 px-3.5 py-3 text-xs text-white/45 leading-relaxed'>
                    <Icon
                      icon='solar:info-circle-bold-duotone'
                      className='w-4 h-4 text-[#3FA9DF] shrink-0 mt-0.5'
                    />
                    Le règlement est effectué après validation de votre inscription par notre équipe.
                  </p>
                </fieldset>

                {error && (
                  <div className='flex items-start gap-3 rounded-[12px] bg-red-500/10 border border-red-500/30 px-4 py-3'>
                    <Icon icon='solar:danger-circle-bold-duotone' className='w-5 h-5 text-red-400 shrink-0 mt-0.5' />
                    <p className='text-sm text-red-300'>{error}</p>
                  </div>
                )}

                {success && (
                  <div className='flex items-start gap-3 rounded-[12px] bg-emerald-500/10 border border-emerald-500/30 px-4 py-3'>
                    <Icon icon='solar:check-circle-bold-duotone' className='w-5 h-5 text-emerald-400 shrink-0 mt-0.5' />
                    <div>
                      <p className='text-sm font-semibold text-emerald-300'>Inscription envoyée avec succès !</p>
                      <p className='text-xs text-emerald-400/70 mt-0.5'>Nous vous rappelons sous 24h pour finaliser votre inscription.</p>
                    </div>
                  </div>
                )}

                <button
                  type='submit'
                  disabled={!paymentMethod || loading}
                  className='group w-full px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-brand hover:shadow-xl hover:scale-[1.01] duration-300 rounded-[12px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none'
                >
                  {loading ? (
                    <>
                      <Icon icon='solar:spinner-bold' className='w-4 h-4 animate-spin' />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Inscrire mon enfant
                      <Icon
                        icon='solar:arrow-right-bold'
                        className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-disabled:translate-x-0'
                      />
                    </>
                  )}
                </button>
                <p className='text-center text-xs text-white/40 -mt-4'>
                  Nous vous rappelons sous 24h pour finaliser votre inscription.
                </p>
              </form>
            </div>

            <style>{`
              .formation-input {
                width: 100%;
                padding: 0.75rem 1rem;
                border-radius: 10px;
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.12);
                color: white;
                font-size: 0.875rem;
                transition: border-color 0.2s ease, background 0.2s ease;
              }
              .formation-input::placeholder { color: rgba(255,255,255,0.45); }
              .formation-input:focus {
                outline: none;
                border-color: #3FA9DF;
                background: rgba(255,255,255,0.09);
              }
              .formation-input option {
                color: #0f172a;
                background: white;
              }
            `}</style>
          </motion.div>

          {/* CTA */}
          <motion.div
            {...scaleIn}
            className='lg:col-span-2 h-full rounded-[28px] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-8 sm:p-10 flex flex-col items-center justify-center text-center gap-5'
          >
            <span className='flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-brand text-white'>
              <Icon icon='solar:cpu-bolt-bold-duotone' className='w-7 h-7' />
            </span>
            <h3 className='text-lg sm:text-xl font-extrabold text-[#0A004B] dark:text-white leading-snug'>
              Les métiers évoluent. <br /> Les compétences aussi.
            </h3>
            <p className='text-sm text-slate-500 dark:text-slate-400 max-w-xs'>
              Offrez à votre enfant une longueur d&apos;avance grâce à l&apos;Intelligence Artificielle.
            </p>
            <div className='flex flex-col gap-3 w-full mt-2'>
              <button
                onClick={() => {
                  const el = document.getElementById('inscription-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className='w-full px-6 py-3 text-sm font-semibold text-white bg-gradient-brand rounded-[12px] hover:shadow-lg duration-300'
              >
                Inscrire mon enfant
              </button>
              <button 
                onClick={() => setDownloadModalOpen(true)}
                className='w-full px-6 py-3 text-sm font-semibold text-slate-700 dark:text-white bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-[12px] hover:shadow-md duration-300 flex items-center justify-center gap-2'
              >
                <Icon icon='solar:file-download-bold-duotone' className='w-4 h-4' />
                Télécharger le programme
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        showProgrammeSelector
      />
    </section>
  )
}