'use client'

import Image from 'next/image'

const partners = [
  { name: 'Charlemagne', image: '/images/partenaire/harlemagne.png' },
  { name: 'Louis Pasteur', image: '/images/partenaire/louisPasteur.png' },
  { name: 'Salim', image: '/images/partenaire/salim.png' },
  { name: 'Essor', image: '/images/partenaire/essor.png' },
  { name: 'Bouebdelli', image: '/images/partenaire/bouebdelli.png' },
  { name: 'École Canadienne de Tunis', image: '/images/partenaire/ECT.png' },
]

// Duplicate the array multiple times for seamless infinite scroll
const duplicatedPartners = [...partners, ...partners, ...partners]

const PartnersBanner = () => {
  return (
    <section className='py-12 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 overflow-hidden'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='text-center mb-8'>
          <p className='text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary dark:text-cyan-300 mb-2'>
            Nos partenaires
          </p>
          <h3 className='text-lg sm:text-xl font-semibold text-[#0A004B] dark:text-white'>
            Établissements qui nous font confiance
          </h3>
        </div>

        {/* Animated scrolling banner */}
        <div className='relative'>
          <div className='overflow-hidden'>
            <div className='flex gap-8 md:gap-12 animate-scroll'>
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className='flex-shrink-0 flex items-center justify-center'
                  style={{ width: '200px' }}
                >
                  <div className='relative w-full h-20 sm:h-24 flex items-center justify-center px-4'>
                    <Image
                      src={partner.image}
                      alt={`Logo ${partner.name}`}
                      width={180}
                      height={80}
                      className='object-contain max-h-full w-auto opacity-90 hover:opacity-100 transition-opacity duration-300'
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for fade effect */}
          <div className='absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 pointer-events-none z-10' />
          <div className='absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/80 pointer-events-none z-10' />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-200px * ${partners.length} - 2rem * ${partners.length}));
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default PartnersBanner

