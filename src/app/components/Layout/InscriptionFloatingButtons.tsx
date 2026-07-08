'use client'

import { Icon } from '@iconify/react'

export default function InscriptionFloatingButtons() {
  const handleScrollToForm = () => {
    const el = document.getElementById('inscription-form')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const firstInput = document.getElementById('parent-nom-input') as HTMLInputElement | null
      if (firstInput) {
        firstInput.focus({ preventScroll: true })
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3 select-none">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/21625857621"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-[#128C7E] to-[#25D366] px-4 text-white shadow-xl shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-emerald-500/25 active:scale-95 group"
      >
        <Icon icon="tabler:brand-whatsapp" width={26} height={26} className="shrink-0" />
        <span className="max-w-0 overflow-hidden font-semibold text-sm transition-all duration-300 ease-out group-hover:max-w-xs group-hover:pr-1 md:max-w-xs md:pr-1">
          WhatsApp
        </span>
      </a>

      {/* Inscription Button */}
      <button
        onClick={handleScrollToForm}
        aria-label="S'inscrire à la formation"
        className="flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-[#27397F] to-[#3FA9DF] px-4 text-white shadow-xl shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-primary/25 active:scale-95 group cursor-pointer"
      >
        <Icon icon="tabler:user-plus" width={24} height={24} className="shrink-0" />
        <span className="max-w-0 overflow-hidden font-semibold text-sm transition-all duration-300 ease-out group-hover:max-w-xs group-hover:pr-1 md:max-w-xs md:pr-1">
          S&apos;inscrire
        </span>
      </button>
    </div>
  )
}
