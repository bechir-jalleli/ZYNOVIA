'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fadeInUp, scaleIn } from './SectionHeading'
import DownloadModal from './DownloadModal'

type Role = 'Parent' | 'Établissement scolaire' | 'Entreprise'

// Exact formation titles available per role.
// Parent sees everything loaded from the API.
// Établissement & Entreprise get fixed lists defined here.
const ROLE_FIXED_FORMATIONS: Partial<Record<Role, string[]>> = {
  'Établissement scolaire': [
    'Programme IA — 1 heure par semaine',
    'Bootcamp IA — Vacances scolaires',
  ],
  'Entreprise': [
    'Bootcamp IA — Enfants de salariés',
  ],
}

const roles: { value: Role; label: string; icon: string }[] = [
  { value: 'Parent', label: 'Parent', icon: 'solar:user-bold-duotone' },
  { value: 'Établissement scolaire', label: 'Établissement scolaire', icon: 'solar:buildings-bold-duotone' },
  { value: 'Entreprise', label: 'Entreprise', icon: 'solar:bag-bold-duotone' },
]

export default function ReservationPaymentSection({ preselectedFormation = '' }: { preselectedFormation?: string }) {
  const [selectedRole, setSelectedRole] = useState<Role>('Parent')
  const [formations, setFormations] = useState<any[]>([])
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // ─── Shared fields ───────────────────────────────────────────────────────────
  const [selectedFormation, setSelectedFormation] = useState('')
  const [message, setMessage] = useState('')

  // ─── Parent fields ───────────────────────────────────────────────────────────
  const [parentNom, setParentNom] = useState('')
  const [parentPrenom, setParentPrenom] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [childName, setChildName] = useState('')
  const [childAge, setChildAge] = useState('')

  // ─── Établissement scolaire fields ──────────────────────────────────────────
  const [etabNom, setEtabNom] = useState('')           // Nom de l'établissement
  const [etabResponsable, setEtabResponsable] = useState('') // Nom du responsable
  const [etabPhone, setEtabPhone] = useState('')
  const [etabEmail, setEtabEmail] = useState('')
  const [etabNbEnfants, setEtabNbEnfants] = useState('')
  const [etabTrancheAge, setEtabTrancheAge] = useState('')

  // ─── Entreprise fields ───────────────────────────────────────────────────────
  const [entNom, setEntNom] = useState('')             // Nom de l'entreprise
  const [entResponsable, setEntResponsable] = useState('') // Nom du responsable
  const [entPoste, setEntPoste] = useState('')
  const [entPhone, setEntPhone] = useState('')
  const [entEmail, setEntEmail] = useState('')
  const [entNbParticipants, setEntNbParticipants] = useState('')

  // Formations shown for the active role:
  // — Parent      → all formations from the API
  // — other roles → fixed hardcoded list (objects with just { title })
  const filteredFormations: { title: string }[] =
    ROLE_FIXED_FORMATIONS[selectedRole]
      ? ROLE_FIXED_FORMATIONS[selectedRole]!.map(t => ({ title: t }))
      : formations

  // Auto-select formation from props
  useEffect(() => {
    if (preselectedFormation) {
      setSelectedFormation(preselectedFormation)
      setSuccess(false)
      setError('')
    }
  }, [preselectedFormation])

  // Auto-select formation if there is only one option, or reset when the available options change
  useEffect(() => {
    if (filteredFormations.length === 1) {
      setSelectedFormation(filteredFormations[0].title)
    } else {
      if (selectedFormation && !filteredFormations.some(f => f.title === selectedFormation)) {
        setSelectedFormation('')
      }
    }
  }, [filteredFormations, selectedFormation])


  // Load formations from API
  useEffect(() => {
    async function loadFormations() {
      try {
        const res = await fetch('/api/formations')
        if (res.ok) {
          const data = await res.json()
          if (data && data.length > 0) setFormations(data)
        }
      } catch (err) {
        console.error('Failed to load formations:', err)
      }
    }
    loadFormations()
  }, [])

  const resetForm = () => {
    setParentNom(''); setParentPrenom(''); setParentPhone(''); setParentEmail('')
    setChildName(''); setChildAge('')
    setEtabNom(''); setEtabResponsable(''); setEtabPhone(''); setEtabEmail('')
    setEtabNbEnfants(''); setEtabTrancheAge('')
    setEntNom(''); setEntResponsable(''); setEntPoste(''); setEntPhone(''); setEntEmail('')
    setEntNbParticipants('')
    setSelectedFormation(''); setMessage('')
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Determine name, email, phone based on role
    let name = ''
    let email = ''
    let phone = ''

    if (selectedRole === 'Parent') {
      name = `${parentNom.trim()} ${parentPrenom.trim()}`.trim()
      email = parentEmail.trim()
      phone = parentPhone.trim()
    } else if (selectedRole === 'Établissement scolaire') {
      name = etabNom.trim() || etabResponsable.trim()
      email = etabEmail.trim()
      phone = etabPhone.trim()
    } else {
      name = entNom.trim() || entResponsable.trim()
      email = entEmail.trim()
      phone = entPhone.trim()
    }

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Format d'email invalide.")
      return
    }
    const phoneRegex = /^[0-9]{8}$/
    if (!phoneRegex.test(phone)) {
      setError('Le numéro de téléphone doit contenir exactement 8 chiffres.')
      return
    }
    if (!selectedFormation) {
      setError('Veuillez sélectionner une formation.')
      return
    }

    // Build detail message
    let detailLines: string[] = [`Formation souhaitée: ${selectedFormation}`]
    if (selectedRole === 'Parent') {
      detailLines.push(`Enfant: ${childName} (${childAge} ans)`)
    } else if (selectedRole === 'Établissement scolaire') {
      detailLines.push(`Établissement: ${etabNom}`)
      detailLines.push(`Responsable: ${etabResponsable}`)
      detailLines.push(`Nb enfants: ${etabNbEnfants}`, `Tranche d'âge: ${etabTrancheAge}`)
    } else {
      detailLines.push(`Entreprise: ${entNom}`)
      detailLines.push(`Responsable: ${entResponsable} (${entPoste})`)
      detailLines.push(`Nb participants: ${entNbParticipants}`)
    }
    if (message) detailLines.push(`Message: ${message}`)

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          role: selectedRole,
          message: detailLines.join('\n'),
        }),
      })

      if (res.ok) {
        setSuccess(true)
        resetForm()
      } else {
        const data = await res.json()
        setError(data.error || 'Une erreur est survenue lors de la soumission.')
      }
    } catch (err) {
      console.error(err)
      setError('Une erreur est survenue lors de la soumission.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id='inscription-form' className='py-10 sm:py-16 lg:py-20 scroll-mt-24'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-5 gap-6 lg:gap-8 items-start'>

          {/* ── Left: Reservation form ── */}
          <motion.div
            {...fadeInUp}
            className='lg:col-span-3 relative overflow-hidden rounded-[28px] bg-white dark:bg-slate-900 border border-[#0091e6]/20 shadow-[0_0_40px_rgba(0,145,230,0.1)] dark:shadow-[0_0_40px_rgba(0,145,230,0.15)] group/form transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,145,230,0.2)] dark:hover:shadow-[0_0_60px_rgba(0,145,230,0.3)] hover:border-[#0091e6]/50 p-6 sm:p-10'
          >
            {/* ambient glow accents */}
            <div className='pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#0091e6]/10 blur-3xl transition-all duration-700 group-hover/form:bg-[#0091e6]/20 group-hover/form:scale-110' />
            <div className='pointer-events-none absolute -bottom-28 -left-16 w-64 h-64 rounded-full bg-[#3FA9DF]/10 blur-3xl transition-all duration-700 group-hover/form:bg-[#3FA9DF]/20 group-hover/form:scale-110' />

            <div className='relative'>
              <form className='flex flex-col gap-8' onSubmit={handleFormSubmit}>

                {/* Dynamic Title, Subtitle, and Badge based on selectedRole */}
                <div>
                  <span className='inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#0091e6] bg-[#0091e6]/10 border border-[#0091e6]/20 rounded-full px-3 py-1 mb-4 shadow-[0_0_10px_rgba(0,145,230,0.1)]'>
                    <Icon icon='solar:calendar-add-bold-duotone' className='w-3.5 h-3.5' />
                    {selectedRole === 'Parent'
                      ? 'Places limitées'
                      : selectedRole === 'Établissement scolaire'
                      ? 'Collaboration Éducative'
                      : 'Impact RSE & Innovation'}
                  </span>
                  <h3 className='text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-1'>
                    {selectedRole === 'Parent'
                      ? 'Réservez la place de votre enfant'
                      : selectedRole === 'Établissement scolaire'
                      ? 'Propulsez votre établissement dans l\'ère de l\'IA'
                      : 'Innovez avec un impact social concret'}
                  </h3>
                  <p className='text-sm font-medium text-slate-500 dark:text-slate-400'>
                    {selectedRole === 'Parent'
                      ? 'Quelques informations suffisent pour assurer son avenir technologique avec Zynovia.'
                      : selectedRole === 'Établissement scolaire'
                      ? 'Collaborez avec nos ingénieurs pour concevoir des ateliers et des programmes IA sur-mesure pour vos élèves.'
                      : 'Offrez à vos collaborateurs un projet d\'initiation technologique unique pour leurs enfants.'}
                  </p>
                </div>

                {/* Formation pre-selected banner */}
                {selectedFormation && (
                  <div className='flex items-center gap-3 rounded-[12px] bg-white dark:bg-slate-800 border border-[#0091e6]/30 px-4 py-3 shadow-[0_0_15px_rgba(0,145,230,0.05)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,145,230,0.2)] hover:border-[#0091e6]/60 relative overflow-hidden group/banner'>
                    <div className='absolute inset-0 bg-gradient-to-r from-[#0091e6]/0 via-[#0091e6]/5 to-[#0091e6]/0 translate-x-[-100%] group-hover/banner:translate-x-[100%] transition-transform duration-1000' />
                    <Icon icon='solar:diploma-bold-duotone' className='w-5 h-5 text-[#0091e6] shrink-0 relative z-10' />
                    <div className='relative z-10'>
                      <p className='text-[11px] font-bold uppercase tracking-wider text-[#0091e6]/70'>Formation sélectionnée</p>
                      <p className='text-sm font-semibold text-slate-900 dark:text-white'>{selectedFormation}</p>
                    </div>
                  </div>
                )}

                {/* ══════════════════════════════════════════════
                    PARENT FORM
                ══════════════════════════════════════════════ */}
                {selectedRole === 'Parent' && (
                  <>
                    <fieldset>
                      <legend className='flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-[#0091e6] mb-3'>
                        <Icon icon='solar:user-bold' className='w-4 h-4 text-[#0091e6]' />
                        Coordonnées du parent
                      </legend>
                      <div className='grid sm:grid-cols-2 gap-4'>
                        <div className='relative'>
                          <Icon icon='solar:user-bold' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            id='parent-nom-input'
                            placeholder='Nom'
                            type='text'
                            className='formation-input pl-14'
                            value={parentNom}
                            onChange={e => setParentNom(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:user-bold' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder='Prénom'
                            type='text'
                            className='formation-input pl-14'
                            value={parentPrenom}
                            onChange={e => setParentPrenom(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:phone-bold' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder='Téléphone'
                            type='tel'
                            className='formation-input pl-14'
                            value={parentPhone}
                            onChange={e => setParentPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:letter-bold' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder='E-mail'
                            type='email'
                            className='formation-input pl-14'
                            value={parentEmail}
                            onChange={e => setParentEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className='flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-[#0091e6] mb-3'>
                        <Icon icon='solar:smile-circle-bold' className='w-4 h-4 text-[#0091e6]' />
                        Informations sur l'enfant
                      </legend>
                      <div className='grid sm:grid-cols-2 gap-4'>
                        <div className='relative'>
                          <Icon icon='solar:user-heart-bold' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder="Nom complet de l'enfant"
                            type='text'
                            className='formation-input pl-14'
                            value={childName}
                            onChange={e => setChildName(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:cake-bold' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder="Âge de l'enfant"
                            type='number'
                            min={5}
                            max={25}
                            className='formation-input pl-14'
                            value={childAge}
                            onChange={e => setChildAge(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </fieldset>
                  </>
                )}

                {/* ══════════════════════════════════════════════
                    ÉTABLISSEMENT SCOLAIRE FORM
                ══════════════════════════════════════════════ */}
                {selectedRole === 'Établissement scolaire' && (
                  <>
                    <fieldset>
                      <legend className='flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-[#0091e6] mb-3'>
                        <Icon icon='solar:buildings-bold-duotone' className='w-4 h-4 text-[#0091e6]' />
                        Coordonnées de l'établissement
                      </legend>
                      <div className='grid sm:grid-cols-2 gap-4'>
                        <div className='relative sm:col-span-2'>
                          <Icon icon='solar:buildings-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder="Nom de l'établissement"
                            type='text'
                            className='formation-input pl-14'
                            value={etabNom}
                            onChange={e => setEtabNom(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:user-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder='Nom du responsable'
                            type='text'
                            className='formation-input pl-14'
                            value={etabResponsable}
                            onChange={e => setEtabResponsable(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:phone-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder='Téléphone'
                            type='tel'
                            className='formation-input pl-14'
                            value={etabPhone}
                            onChange={e => setEtabPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative sm:col-span-2'>
                          <Icon icon='solar:letter-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder='E-mail'
                            type='email'
                            className='formation-input pl-14'
                            value={etabEmail}
                            onChange={e => setEtabEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className='flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-[#0091e6] mb-3'>
                        <Icon icon='solar:users-group-rounded-bold-duotone' className='w-4 h-4 text-[#0091e6]' />
                        Informations sur les participants
                      </legend>
                      <div className='grid sm:grid-cols-2 gap-4'>
                        <div className='relative'>
                          <Icon icon='solar:users-group-rounded-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder="Nombre d'enfants"
                            type='number'
                            min={1}
                            className='formation-input pl-14'
                            value={etabNbEnfants}
                            onChange={e => setEtabNbEnfants(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:cake-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder="Tranche d'âge (ex: 10–14 ans)"
                            type='text'
                            className='formation-input pl-14'
                            value={etabTrancheAge}
                            onChange={e => setEtabTrancheAge(e.target.value)}
                          />
                        </div>
                      </div>
                    </fieldset>
                  </>
                )}

                {/* ══════════════════════════════════════════════
                    ENTREPRISE FORM
                ══════════════════════════════════════════════ */}
                {selectedRole === 'Entreprise' && (
                  <>
                    <fieldset>
                      <legend className='flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-[#0091e6] mb-3'>
                        <Icon icon='solar:bag-bold-duotone' className='w-4 h-4 text-[#0091e6]' />
                        Coordonnées de l'entreprise
                      </legend>
                      <div className='grid sm:grid-cols-2 gap-4'>
                        <div className='relative sm:col-span-2'>
                          <Icon icon='solar:bag-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder="Nom de l'entreprise"
                            type='text'
                            className='formation-input pl-14'
                            value={entNom}
                            onChange={e => setEntNom(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:user-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder='Nom du responsable'
                            type='text'
                            className='formation-input pl-14'
                            value={entResponsable}
                            onChange={e => setEntResponsable(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:diploma-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder='Poste / Fonction'
                            type='text'
                            className='formation-input pl-14'
                            value={entPoste}
                            onChange={e => setEntPoste(e.target.value)}
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:phone-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder='Téléphone'
                            type='tel'
                            className='formation-input pl-14'
                            value={entPhone}
                            onChange={e => setEntPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:letter-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <input
                            placeholder='E-mail'
                            type='email'
                            className='formation-input pl-14'
                            value={entEmail}
                            onChange={e => setEntEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 mb-3'>
                        <Icon icon='solar:users-group-rounded-bold-duotone' className='w-4 h-4 text-[#3FA9DF]' />
                        Informations sur les participants
                      </legend>
                      <div className='relative'>
                        <Icon icon='solar:users-group-rounded-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                        <input
                          placeholder='Nombre de participants'
                          type='number'
                          min={1}
                          className='formation-input pl-10'
                          value={entNbParticipants}
                          onChange={e => setEntNbParticipants(e.target.value)}
                          required
                        />
                      </div>
                    </fieldset>
                  </>
                )}

                {/* ── Formation souhaitée ── */}
                <fieldset>
                  <legend className='flex items-center gap-3 text-xs font-bold uppercase tracking-wide text-[#0091e6] mb-3'>
                    <Icon icon='solar:notebook-bold-duotone' className='w-4 h-4 text-[#0091e6]' />
                    Formation souhaitée
                  </legend>
                  <div className='flex flex-col gap-4'>
                    <div className='relative'>
                      {filteredFormations.length === 1 ? (
                        /* Single option — show locked badge, value already auto-selected */
                        <div className='flex items-center gap-3 rounded-[10px] bg-white dark:bg-slate-800 border border-[#3FA9DF]/30 px-4 py-3 shadow-sm'>
                          <Icon icon='solar:diploma-bold-duotone' className='w-4 h-4 text-[#3FA9DF] shrink-0' />
                          <span className='text-sm font-semibold text-slate-900 dark:text-white flex-1'>{filteredFormations[0].title}</span>
                          <Icon icon='solar:lock-bold-duotone' className='w-3.5 h-3.5 text-[#3FA9DF]/60 shrink-0' />
                        </div>
                      ) : (
                        <>
                          <select
                            className='formation-input pl-14 appearance-none'
                            value={selectedFormation}
                            onChange={e => setSelectedFormation(e.target.value)}
                            required
                          >
                            <option value='' className='text-slate-900 dark:text-white'>Sélectionnez une formation</option>
                            {filteredFormations.map(f => (
                              <option key={f.title} value={f.title} className='text-slate-900 dark:text-white'>{f.title}</option>
                            ))}
                          </select>
                          <Icon icon='solar:alt-arrow-down-bold' className='pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                          <Icon icon='solar:notebook-bold-duotone' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0091e6]/35' />
                        </>
                      )}
                    </div>
                    <textarea
                      placeholder='Message (optionnel)'
                      rows={3}
                      className='formation-input resize-none'
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    />
                  </div>
                </fieldset>


                {/* ── Error / Success banners ── */}
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

                {/* ── Submit ── */}
                <button
                  type='submit'
                  disabled={loading}
                  className='group relative overflow-hidden w-full px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#0091e6] hover:shadow-[0_0_30px_rgba(0,145,230,0.4)] hover:scale-[1.01] duration-300 rounded-[12px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none'
                >
                  <div className='absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out' />
                  {loading ? (
                    <>
                      <Icon icon='solar:spinner-bold' className='w-4 h-4 animate-spin' />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      {selectedRole === 'Parent' ? 'Inscrire mon enfant' : 'Envoyer ma demande'}
                      <Icon icon='solar:arrow-right-bold' className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-disabled:translate-x-0' />
                    </>
                  )}
                </button>
                <p className='text-center text-xs text-slate-400 -mt-4'>
                  Nous vous rappelons sous 24h pour finaliser votre inscription.
                </p>
              </form>
            </div>

            <style>{`
              .formation-input {
                width: 100%;
                padding: 0.75rem 1rem 0.75rem 3.5rem;
                border-radius: 10px;
                background: #f8fafc;
                border: 1px solid rgba(0, 145, 230, 0.2);
                color: #0f172a;
                font-size: 0.875rem;
                transition: all 0.3s ease;
              }
              .formation-input::placeholder { color: #94a3b8; }
              .formation-input:focus {
                outline: none;
                border-color: #0091e6;
                background: white;
                box-shadow: 0 0 20px rgba(0, 145, 230, 0.2);
              }
              .formation-input:hover {
                border-color: rgba(0, 145, 230, 0.4);
                box-shadow: 0 0 15px rgba(0, 145, 230, 0.1);
              }
              .input-icon {
                color: #0091e6;
                opacity: 0.6;
                transition: all 0.3s ease;
              }
              .relative:focus-within .input-icon, .relative:hover .input-icon {
                opacity: 1;
                filter: drop-shadow(0 0 5px rgba(0,145,230,0.5));
              }
              .formation-input option {
                color: #0f172a;
                background: white;
              }
              
              /* Dark mode overrides */
              .dark .formation-input {
                background: rgba(15, 23, 42, 0.6);
                border: 1px solid rgba(0, 145, 230, 0.3);
                color: white;
              }
              .dark .formation-input::placeholder { color: #64748b; }
              .dark .formation-input:focus {
                background: rgba(30, 41, 59, 0.8);
                border-color: #0091e6;
                box-shadow: 0 0 20px rgba(0, 145, 230, 0.3);
              }
              .dark .formation-input:hover {
                border-color: rgba(0, 145, 230, 0.6);
              }
              .dark .formation-input option {
                color: white;
                background: #0f172a;
              }
            `}</style>
          </motion.div>

          {/* ── Right: CTA panel ── */}
          <motion.div
            {...scaleIn}
            className='lg:col-span-2 h-full rounded-[28px] bg-white dark:bg-slate-900    p-8 sm:p-10 flex flex-col items-center justify-center text-center gap-5 shadow-[0_0_40px_rgba(0,145,230,0.1)] dark:shadow-[0_0_40px_rgba(0,145,230,0.15)] group/cta transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,145,230,0.2)] dark:hover:shadow-[0_0_60px_rgba(0,145,230,0.3)] hover:border-[#0091e6]/50 relative overflow-hidden'
          >
            {/* ambient glow */}
            <div className='absolute inset-0 bg-gradient-to-b from-[#0091e6]/5 to-transparent opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500' />

            <span className='flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0091e6]/10 text-[#0091e6] border border-[#0091e6]/20 shadow-[0_0_15px_rgba(0,145,230,0.1)] group-hover/cta:shadow-[0_0_25px_rgba(0,145,230,0.3)] transition-all duration-500 relative z-10'>
              <Icon icon='solar:cpu-bolt-bold-duotone' className='w-7 h-7' />
            </span>
            <h3 className='text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug relative z-10'>
              Les métiers évoluent. <br /> Les compétences aussi.
            </h3>
            <p className='text-sm text-slate-500 dark:text-slate-400 max-w-xs relative z-10'>
              Offrez à votre enfant une longueur d&apos;avance grâce à l&apos;Intelligence Artificielle.
            </p>
            <div className='flex flex-col gap-3 w-full mt-2 relative z-10'>
              <button
                onClick={() => {
                  setSelectedRole('Parent')
                  const el = document.getElementById('inscription-form')
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className='w-full px-6 py-3 text-sm font-semibold text-white bg-[#0091e6] rounded-[12px] hover:shadow-[0_0_25px_rgba(0,145,230,0.4)] hover:scale-[1.02] duration-300'
              >
                Inscrire mon enfant
              </button>
              <button
                onClick={() => setDownloadModalOpen(true)}
                className='w-full px-6 py-3 text-sm font-semibold text-[#0091e6] bg-transparent border border-[#0091e6]/30 rounded-[12px] hover:bg-[#0091e6]/5 hover:border-[#0091e6] hover:shadow-[0_0_15px_rgba(0,145,230,0.2)] duration-300 flex items-center justify-center gap-2'
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