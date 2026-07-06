'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

interface Formation {
  _id: string
  title: string
  programmePdfPath?: string
}

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  /** Pass a specific PDF URL to skip the programme selector */
  pdfUrl?: string
  /** When true, shows a dropdown so the user picks which programme to download */
  showProgrammeSelector?: boolean
}

export default function DownloadModal({
  isOpen,
  onClose,
  pdfUrl,
  showProgrammeSelector = false,
}: DownloadModalProps) {
  const [parentName, setParentName] = useState('')
  const [childName, setChildName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Programme selector state
  const [formations, setFormations] = useState<Formation[]>([])
  const [loadingFormations, setLoadingFormations] = useState(false)
  const [selectedFormationId, setSelectedFormationId] = useState('')

  // Fetch formations with PDFs when selector mode is on
  useEffect(() => {
    if (!isOpen || !showProgrammeSelector) return
    setLoadingFormations(true)
    fetch('/api/formations')
      .then((r) => r.json())
      .then((data: Formation[]) => {
        const withPdf = data.filter((f) => f.programmePdfPath)
        setFormations(withPdf)
        if (withPdf.length > 0) setSelectedFormationId(withPdf[0]._id)
      })
      .catch(() => setFormations([]))
      .finally(() => setLoadingFormations(false))
  }, [isOpen, showProgrammeSelector])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setParentName('')
      setChildName('')
      setEmail('')
      setPhone('')
      setError('')
      setSelectedFormationId('')
    }
  }, [isOpen])

  const resolvedPdfUrl = showProgrammeSelector
    ? formations.find((f) => f._id === selectedFormationId)?.programmePdfPath ?? ''
    : (pdfUrl ?? '')

  const selectedTitle = formations.find((f) => f._id === selectedFormationId)?.title ?? ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (showProgrammeSelector && !resolvedPdfUrl) {
      setError('Veuillez sélectionner un programme avec un PDF disponible.')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError("Format d'email invalide.")
      return
    }

    // Phone validation (exactly 8 digits)
    const phoneRegex = /^[0-9]{8}$/
    if (!phoneRegex.test(phone.trim())) {
      setError('Le numéro de téléphone doit contenir exactement 8 chiffres.')
      return
    }

    setLoading(true)

    try {
      const programmeName = showProgrammeSelector ? selectedTitle : ''
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: parentName,
          email: email,
          phone: phone,
          role: 'Téléchargement Programme',
          message: `Nom du parent: ${parentName}\nNom de l'enfant: ${childName}\nProgramme demandé: ${programmeName || 'Non spécifié'}${showProgrammeSelector && selectedFormationId ? `\nFormation ID: ${selectedFormationId}` : ''}\nDemande de téléchargement du programme.`,
        }),
      })

      if (res.ok) {
        // Trigger download
        const link = document.createElement('a')
        link.href = resolvedPdfUrl
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        onClose()
      } else {
        const data = await res.json()
        setError(data.error || "Une erreur est survenue lors de l'envoi.")
      }
    } catch (err) {
      console.error(err)
      setError("Une erreur est survenue lors de l'envoi.")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#0A004B] p-6 sm:p-8 shadow-2xl border border-white/10"
        >
          {/* ambient background glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#3FA9DF]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-[#7C3AED]/20 blur-3xl" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors duration-150"
          >
            <Icon icon="solar:close-circle-bold" className="w-7 h-7" />
          </button>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#3FA9DF]/10 text-[#3FA9DF]">
                <Icon icon="solar:document-text-bold-duotone" className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Télécharger le programme
                </h3>
                <p className="text-xs text-white/50">
                  Remplissez ce formulaire pour accéder au document.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-xs flex items-center gap-2">
                <Icon icon="solar:danger-bold" className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Programme selector — shown only when no specific pdfUrl is given */}
              {showProgrammeSelector && (
                <div>
                  <label className="block text-xs font-bold uppercase text-white/40 ml-1 mb-1.5 font-mono">
                    Programme souhaité
                  </label>
                  <div className="relative">
                    <Icon
                      icon="solar:book-bold-duotone"
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/35"
                    />
                    {loadingFormations ? (
                      <div className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/40 text-sm flex items-center gap-2">
                        <Icon icon="svg-spinners:ring-resize" className="w-4 h-4" />
                        Chargement…
                      </div>
                    ) : formations.length === 0 ? (
                      <div className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/40 text-sm">
                        Aucun programme disponible pour le moment.
                      </div>
                    ) : (
                      <select
                        required
                        value={selectedFormationId}
                        onChange={(e) => setSelectedFormationId(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-[#3FA9DF] outline-none transition-colors appearance-none cursor-pointer"
                        style={{ backgroundImage: 'none' }}
                      >
                        {formations.map((f) => (
                          <option
                            key={f._id}
                            value={f._id}
                            className="bg-[#0A004B] text-white"
                          >
                            {f.title}
                          </option>
                        ))}
                      </select>
                    )}
                    {formations.length > 0 && !loadingFormations && (
                      <Icon
                        icon="solar:alt-arrow-down-bold"
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35"
                      />
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-white/40 ml-1 mb-1.5 font-mono">
                  Nom du parent
                </label>
                <div className="relative">
                  <Icon
                    icon="solar:user-bold-duotone"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/35"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Nom complet"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:ring-2 focus:ring-[#3FA9DF] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-white/40 ml-1 mb-1.5 font-mono">
                  Nom de l'enfant
                </label>
                <div className="relative">
                  <Icon
                    icon="solar:smile-circle-bold-duotone"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/35"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Prénom ou nom de l'enfant"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:ring-2 focus:ring-[#3FA9DF] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-white/40 ml-1 mb-1.5 font-mono">
                  E-mail
                </label>
                <div className="relative">
                  <Icon
                    icon="solar:letter-bold-duotone"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/35"
                  />
                  <input
                    type="email"
                    required
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:ring-2 focus:ring-[#3FA9DF] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-white/40 ml-1 mb-1.5 font-mono">
                  Téléphone du parent (8 chiffres)
                </label>
                <div className="relative">
                  <Icon
                    icon="solar:phone-bold-duotone"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/35"
                  />
                  <input
                    type="tel"
                    required
                    maxLength={8}
                    placeholder="99999999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:ring-2 focus:ring-[#3FA9DF] outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (showProgrammeSelector && (loadingFormations || formations.length === 0))}
                className="w-full mt-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#3FA9DF] hover:bg-[#3596c7] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#3FA9DF]/20"
              >
                {loading ? (
                  <Icon icon="svg-spinners:ring-resize" className="w-4 h-4" />
                ) : (
                  <>
                    <Icon icon="solar:file-download-bold" className="w-4.5 h-4.5" />
                    Télécharger le programme
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
