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
    <>
      <style>{`
        @keyframes inscription-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(63, 169, 223, 0.7), 0 20px 40px rgba(39, 57, 127, 0.15);
            transform: scale(1);
          }
          30% {
            box-shadow: 0 0 0 10px rgba(63, 169, 223, 0.25), 0 20px 40px rgba(39, 57, 127, 0.15);
            transform: scale(1.06);
          }
          50% {
            box-shadow: 0 0 0 18px rgba(63, 169, 223, 0), 0 20px 40px rgba(39, 57, 127, 0.15);
            transform: scale(1);
          }
        }

        @keyframes inscription-wiggle {
          0%, 60%, 100% { transform: rotate(0deg) scale(1); }
          10%  { transform: rotate(-6deg) scale(1.05); }
          20%  { transform: rotate(6deg)  scale(1.05); }
          30%  { transform: rotate(-4deg) scale(1.03); }
          40%  { transform: rotate(4deg)  scale(1.03); }
          50%  { transform: rotate(-2deg) scale(1.01); }
        }

        .inscription-btn {
          animation:
            inscription-pulse 3s ease-in-out 1.5s infinite,
            inscription-wiggle 6s ease-in-out 2s infinite;
        }

        .inscription-btn:hover,
        .inscription-btn:focus-visible {
          animation: none;
        }
      `}</style>

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
          aria-label="S'Inscrire à la formation"
          className="inscription-btn flex h-14 items-center gap-2 rounded-full bg-gradient-to-r from-[#27397F] to-[#3FA9DF] px-4 text-white shadow-xl shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-primary/25 active:scale-95 group cursor-pointer"
        >
          <Icon icon="tabler:user-plus" width={24} height={24} className="shrink-0" />
          <span className="max-w-0 overflow-hidden font-semibold text-sm transition-all duration-300 ease-out group-hover:max-w-xs group-hover:pr-1 md:max-w-xs md:pr-1">
            Inscrire mon enfant
          </span>
        </button>
      </div>
    </>
  )
}
