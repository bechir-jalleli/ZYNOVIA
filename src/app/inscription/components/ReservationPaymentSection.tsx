'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fadeInUp, scaleIn } from './SectionHeading'
import DownloadModal from './DownloadModal'

type Role = 'Parent' | 'Établissement scolaire' | 'Entreprise'
type PaymentMethod = 'especes' | 'virement' | 'mandat' | ''

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

const paymentMethods: {
  value: Exclude<PaymentMethod, ''>
  label: string
  description: string
  icon: string
}[] = [
    { value: 'especes', label: 'Espèces', description: 'Règlement sur place', icon: 'solar:banknote-2-bold-duotone' },
    { value: 'virement', label: 'Virement bancaire', description: 'Transfert vers notre compte', icon: 'solar:card-transfer-bold-duotone' },
    { value: 'mandat', label: 'Mandat postal', description: 'Envoi par la poste', icon: 'solar:mailbox-bold-duotone' },
  ]

const roles: { value: Role; label: string; icon: string }[] = [
  { value: 'Parent', label: 'Parent', icon: 'solar:user-bold-duotone' },
  { value: 'Établissement scolaire', label: 'Établissement scolaire', icon: 'solar:buildings-bold-duotone' },
  { value: 'Entreprise', label: 'Entreprise', icon: 'solar:bag-bold-duotone' },
]

export default function ReservationPaymentSection({ preselectedFormation = '' }: { preselectedFormation?: string }) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('')
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

  // Auto-select role from URL query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const roleParam = params.get('role')
      if (roleParam) {
        const lower = roleParam.toLowerCase()
        if (lower === 'parent') setSelectedRole('Parent')
        else if (lower.includes('etablissement') || lower.includes('établissement')) setSelectedRole('Établissement scolaire')
        else if (lower === 'entreprise') setSelectedRole('Entreprise')
      }
    }
  }, [])

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
    setSelectedFormation(''); setMessage(''); setPaymentMethod('')
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
    if (!paymentMethod) {
      setError('Veuillez choisir un mode de paiement.')
      return
    }

    // Build detail message
    let detailLines: string[] = [`Formation souhaitée: ${selectedFormation}`, `Mode de paiement: ${paymentMethod}`]
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
    <section id='inscription-form' className='py-16 lg:py-20 scroll-mt-24'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-5 gap-6 lg:gap-8 items-start'>

          {/* ── Left: Reservation form ── */}
          <motion.div
            {...fadeInUp}
            className='lg:col-span-3 relative overflow-hidden rounded-[28px] bg-[#0A004B] p-6 sm:p-10'
          >
            {/* ambient glow accents */}
            <div className='pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#3FA9DF]/20 blur-3xl' />
            <div className='pointer-events-none absolute -bottom-28 -left-16 w-64 h-64 rounded-full bg-[#27397F]/30 blur-3xl' />

            <div className='relative'>
              <form className='flex flex-col gap-8' onSubmit={handleFormSubmit}>
                {/* ── Role selector (First in the form) ── */}
                <fieldset>
                  <legend className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 mb-3'>
                    <Icon icon='solar:user-bold-duotone' className='w-4 h-4 text-[#3FA9DF]' />
                    Type d'inscription
                  </legend>
                  <div className='grid grid-cols-3 gap-3'>
                    {roles.map(r => (
                      <label key={r.value} className='cursor-pointer'>
                        <input
                          type='radio'
                          name='roleSelection'
                          value={r.value}
                          checked={selectedRole === r.value}
                          onChange={() => setSelectedRole(r.value)}
                          className='sr-only'
                        />
                        <span className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-[12px] border text-center text-[11px] font-semibold transition-all duration-200 ${selectedRole === r.value
                          ? 'border-[#3FA9DF] bg-[#3FA9DF]/15 text-[#3FA9DF] shadow-[0_0_0_1px_rgba(63,169,223,0.35)]'
                          : 'border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:bg-white/[0.07]'
                          }`}>
                          <Icon icon={r.icon} className='w-5 h-5' />
                          {r.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Dynamic Title, Subtitle, and Badge based on selectedRole */}
                <div>
                  <span className='inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#3FA9DF] bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4'>
                    <Icon icon='solar:calendar-add-bold-duotone' className='w-3.5 h-3.5' />
                    {selectedRole === 'Parent'
                      ? 'Places limitées'
                      : selectedRole === 'Établissement scolaire'
                      ? 'Collaboration Éducative'
                      : 'Impact RSE & Innovation'}
                  </span>
                  <h3 className='text-xl sm:text-2xl font-extrabold text-white mb-1'>
                    {selectedRole === 'Parent'
                      ? 'Réservez la place de votre enfant'
                      : selectedRole === 'Établissement scolaire'
                      ? 'Propulsez votre établissement dans l\'ère de l\'IA'
                      : 'Innovez avec un impact social concret'}
                  </h3>
                  <p className='text-sm text-white/50'>
                    {selectedRole === 'Parent'
                      ? 'Quelques informations suffisent pour assurer son avenir technologique avec Zynovia.'
                      : selectedRole === 'Établissement scolaire'
                      ? 'Collaborez avec nos ingénieurs pour concevoir des ateliers et des programmes IA sur-mesure pour vos élèves.'
                      : 'Offrez à vos collaborateurs un projet d\'initiation technologique unique pour leurs enfants.'}
                  </p>
                </div>

                {/* Formation pre-selected banner */}
                {selectedFormation && (
                  <div className='flex items-center gap-3 rounded-[12px] bg-[#3FA9DF]/10 border border-[#3FA9DF]/30 px-4 py-3'>
                    <Icon icon='solar:diploma-bold-duotone' className='w-5 h-5 text-[#3FA9DF] shrink-0' />
                    <div>
                      <p className='text-[11px] font-bold uppercase tracking-wider text-[#3FA9DF]/70'>Formation sélectionnée</p>
                      <p className='text-sm font-semibold text-white'>{selectedFormation}</p>
                    </div>
                  </div>
                )}

                {/* ══════════════════════════════════════════════
                    PARENT FORM
                ══════════════════════════════════════════════ */}
                {selectedRole === 'Parent' && (
                  <>
                    <fieldset>
                      <legend className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 mb-3'>
                        <Icon icon='solar:user-bold-duotone' className='w-4 h-4 text-[#3FA9DF]' />
                        Coordonnées du parent
                      </legend>
                      <div className='grid sm:grid-cols-2 gap-4'>
                        <div className='relative'>
                          <Icon icon='solar:user-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            id='parent-nom-input'
                            placeholder='Nom'
                            type='text'
                            className='formation-input pl-10'
                            value={parentNom}
                            onChange={e => setParentNom(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:user-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder='Prénom'
                            type='text'
                            className='formation-input pl-10'
                            value={parentPrenom}
                            onChange={e => setParentPrenom(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:phone-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder='Téléphone'
                            type='tel'
                            className='formation-input pl-10'
                            value={parentPhone}
                            onChange={e => setParentPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:letter-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder='E-mail'
                            type='email'
                            className='formation-input pl-10'
                            value={parentEmail}
                            onChange={e => setParentEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 mb-3'>
                        <Icon icon='solar:smile-circle-bold-duotone' className='w-4 h-4 text-[#3FA9DF]' />
                        Informations sur l'enfant
                      </legend>
                      <div className='grid sm:grid-cols-2 gap-4'>
                        <div className='relative'>
                          <Icon icon='solar:user-heart-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder="Nom complet de l'enfant"
                            type='text'
                            className='formation-input pl-10'
                            value={childName}
                            onChange={e => setChildName(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:cake-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder="Âge de l'enfant"
                            type='number'
                            min={5}
                            max={25}
                            className='formation-input pl-10'
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
                      <legend className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 mb-3'>
                        <Icon icon='solar:buildings-bold-duotone' className='w-4 h-4 text-[#3FA9DF]' />
                        Coordonnées de l'établissement
                      </legend>
                      <div className='grid sm:grid-cols-2 gap-4'>
                        <div className='relative sm:col-span-2'>
                          <Icon icon='solar:buildings-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder="Nom de l'établissement"
                            type='text'
                            className='formation-input pl-10'
                            value={etabNom}
                            onChange={e => setEtabNom(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:user-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder='Nom du responsable'
                            type='text'
                            className='formation-input pl-10'
                            value={etabResponsable}
                            onChange={e => setEtabResponsable(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:phone-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder='Téléphone'
                            type='tel'
                            className='formation-input pl-10'
                            value={etabPhone}
                            onChange={e => setEtabPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative sm:col-span-2'>
                          <Icon icon='solar:letter-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder='E-mail'
                            type='email'
                            className='formation-input pl-10'
                            value={etabEmail}
                            onChange={e => setEtabEmail(e.target.value)}
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
                      <div className='grid sm:grid-cols-2 gap-4'>
                        <div className='relative'>
                          <Icon icon='solar:users-group-rounded-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder="Nombre d'enfants"
                            type='number'
                            min={1}
                            className='formation-input pl-10'
                            value={etabNbEnfants}
                            onChange={e => setEtabNbEnfants(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:cake-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder="Tranche d'âge (ex: 10–14 ans)"
                            type='text'
                            className='formation-input pl-10'
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
                      <legend className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 mb-3'>
                        <Icon icon='solar:bag-bold-duotone' className='w-4 h-4 text-[#3FA9DF]' />
                        Coordonnées de l'entreprise
                      </legend>
                      <div className='grid sm:grid-cols-2 gap-4'>
                        <div className='relative sm:col-span-2'>
                          <Icon icon='solar:bag-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder="Nom de l'entreprise"
                            type='text'
                            className='formation-input pl-10'
                            value={entNom}
                            onChange={e => setEntNom(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:user-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder='Nom du responsable'
                            type='text'
                            className='formation-input pl-10'
                            value={entResponsable}
                            onChange={e => setEntResponsable(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:diploma-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder='Poste / Fonction'
                            type='text'
                            className='formation-input pl-10'
                            value={entPoste}
                            onChange={e => setEntPoste(e.target.value)}
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:phone-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder='Téléphone'
                            type='tel'
                            className='formation-input pl-10'
                            value={entPhone}
                            onChange={e => setEntPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className='relative'>
                          <Icon icon='solar:letter-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <input
                            placeholder='E-mail'
                            type='email'
                            className='formation-input pl-10'
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
                        <Icon icon='solar:users-group-rounded-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
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
                  <legend className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/40 mb-3'>
                    <Icon icon='solar:notebook-bold-duotone' className='w-4 h-4 text-[#3FA9DF]' />
                    Formation souhaitée
                  </legend>
                  <div className='flex flex-col gap-4'>
                    <div className='relative'>
                      {filteredFormations.length === 1 ? (
                        /* Single option — show locked badge, value already auto-selected */
                        <div className='flex items-center gap-3 rounded-[10px] bg-[#3FA9DF]/10 border border-[#3FA9DF]/30 px-4 py-3'>
                          <Icon icon='solar:diploma-bold-duotone' className='w-4 h-4 text-[#3FA9DF] shrink-0' />
                          <span className='text-sm font-semibold text-white flex-1'>{filteredFormations[0].title}</span>
                          <Icon icon='solar:lock-bold-duotone' className='w-3.5 h-3.5 text-[#3FA9DF]/60 shrink-0' />
                        </div>
                      ) : (
                        <>
                          <select
                            className='formation-input pl-10 appearance-none text-slate-300'
                            value={selectedFormation}
                            onChange={e => setSelectedFormation(e.target.value)}
                            required
                          >
                            <option value='' className='text-slate-900'>Sélectionnez une formation</option>
                            {filteredFormations.map(f => (
                              <option key={f.title} value={f.title} className='text-slate-900'>{f.title}</option>
                            ))}
                          </select>
                          <Icon icon='solar:alt-arrow-down-bold' className='pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
                          <Icon icon='solar:notebook-bold-duotone' className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35' />
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

                {/* ── Mode de paiement ── */}
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
                          className={`group relative flex flex-col items-center gap-2 rounded-[14px] border px-3 py-4 cursor-pointer transition-all duration-200 ${isSelected
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
                          <span className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 ${isSelected ? 'bg-[#3FA9DF]/20 text-[#3FA9DF]' : 'bg-white/10 text-white/50 group-hover:text-[#3FA9DF]'
                            }`}>
                            <Icon icon={method.icon} className='w-5 h-5' />
                          </span>
                          <span className='text-xs font-semibold text-white text-center leading-tight'>{method.label}</span>
                          <span className='text-[10px] text-white/40 text-center leading-snug'>{method.description}</span>
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
                    <Icon icon='solar:info-circle-bold-duotone' className='w-4 h-4 text-[#3FA9DF] shrink-0 mt-0.5' />
                    Le règlement est effectué après validation de votre inscription par notre équipe.
                  </p>
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
                      {selectedRole === 'Parent' ? 'Inscrire mon enfant' : 'Envoyer ma demande'}
                      <Icon icon='solar:arrow-right-bold' className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-disabled:translate-x-0' />
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

          {/* ── Right: CTA panel ── */}
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
                  setSelectedRole('Parent')
                  const el = document.getElementById('inscription-form')
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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