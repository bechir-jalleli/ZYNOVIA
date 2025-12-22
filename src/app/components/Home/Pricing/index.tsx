'use client'

import { PlanType } from '@/app/types/plan'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { SetStateAction, useEffect, useState } from 'react'
import PricingSkeleton from '../../Skeleton/Pricing'

const Pricing = () => {
  const [plan, setPlan] = useState<PlanType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setPlan(data.PlanData)
      } catch (error) {
        console.error('Error fetching service', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  //
  const [selectedCategory, setSelectedCategory] = useState<
    'etablissement' | 'entreprise'
  >('etablissement')

  const handleCategoryChange = (
    category: SetStateAction<'etablissement' | 'entreprise'>
  ) => {
    setSelectedCategory(category)
  }

  const contentConfig: Record<
    'etablissement' | 'entreprise',
    Record<
      string,
      {
        title: string
        desc?: string
        options?: string[]
        cta: string
      }
    >
  > = {
    etablissement: {
      'Programme une heure par semaine': {
        title: 'Programme IA — 1 heure par semaine',
        desc: 'Programme annuel intégré au cursus scolaire',
        options: [
          '1h de formation IA par semaine',
          'Contenus adaptés collège & lycée',
          "Bases de l’IA et pensée algorithmique",
          'Mini-projets pratiques trimestriels',
          'Encadrement par formateurs INOTEQIA',
          'Évaluation pédagogique et suivi',
        ],
        cta: 'Découvrir le programme',
      },
      'Bootcamp AI': {
        title: 'Bootcamp IA — Vacances scolaires',
        desc: 'Immersion intensive pour les élèves',
        options: [
          'Programme intensif pendant les vacances',
          'Projets IA concrets et collaboratifs',
          'Initiation à la programmation et outils IA',
          'Travail en équipe et créativité',
          'Challenge final et présentation orale',
          'Certificat INOTEQIA Academy',
        ],
        cta: ' Découvrir les bootcamps',
      },
    },
    entreprise: {
      'Programme une heure par semaine': {
        title: 'Bootcamp IA — Enfants de salariés',
        desc: 'Un avantage social innovant pour les entreprises',
        options: [
          'Bootcamp IA pendant les vacances scolaires',
          'Programme éducatif adapté aux enfants',
          'Découverte de l’IA et des technologies du futur',
          'Projets inspirés du monde professionnel',
          'Encadrement par experts pédagogiques',
          'Restitution finale devant les parents',
        ],
        cta: 'Découvrir le programme entreprise',
      },
    },
  }

  return (
    <section
      id='pricing'
      className='scroll-mt-12 py-24 lg:py-32 bg-gradient-to-b from-transparent via-secondary/5 to-secondary/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'
    >
      <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-10'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0A004B] dark:text-white'>
            Nos Programmes
          </h2>
          <p className='text-lg font-normal max-w-xl mx-auto my-6 text-slate-700 dark:text-slate-200'>
            Des formats adaptés aux établissements scolaires et aux entreprises.
          </p>
        </div>
        {/* toggle button */}
        {/* Établissement scolaire/Entreprise Toggle Buttons */}
        <div className='mb-8'>
          <div className='flex justify-center'>
            <div className='inline-flex bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-1.5 rounded-2xl shadow-[0_8px_30px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 dark:ring-slate-700/70 gap-2'>
              <button
                className={`text-sm sm:text-base font-semibold cursor-pointer py-2.5 px-4 sm:py-3 sm:px-7 whitespace-nowrap rounded-xl transition-all duration-300 ${
                  selectedCategory === 'etablissement'
                    ? 'bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40 scale-105'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-700/60'
                }`}
                onClick={() => handleCategoryChange('etablissement')}>
                Établissements scolaires
              </button>
              <button
                className={`text-sm sm:text-base font-semibold cursor-pointer py-2.5 px-4 sm:py-3 sm:px-7 whitespace-nowrap rounded-xl transition-all duration-300 ${
                  selectedCategory === 'entreprise'
                    ? 'bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white shadow-md shadow-[#0091E6]/40 scale-105'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-700/60'
                }`}
                onClick={() => handleCategoryChange('entreprise')}>
                Entreprises
              </button>
            </div>
          </div>
        </div>
        {/* grid layout */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {/* card-1 */}
          <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00C3D9] via-[#0091E6] to-[#0067E0] lg:col-span-1 md:col-span-2 animate-gentle-pulse transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.35)]'>
            {/* shimmer overlay */}
            <div className='pointer-events-none absolute inset-0 animate-shimmer opacity-0 transition-opacity duration-500 hover:opacity-100' />

            {/* content */}
            <div className='relative z-10 flex w-full min-h-[500px] flex-col items-center justify-center gap-8 p-6 sm:p-8 md:min-h-[600px] lg:min-h-full lg:gap-10 lg:p-10'>
              {/* text */}
              <h3 className='max-w-xs text-center text-xl font-semibold leading-relaxed text-white lg:text-left lg:text-2xl lg:leading-10'>
                Les entreprises partenaires bénéficient de conditions préférentielles sur nos
                programmes.
              </h3>

              {/* image */}
              <div className='flex w-full items-center justify-center flex-shrink-0'>
                <div className='relative w-full max-w-[280px] animate-float sm:max-w-[320px] md:max-w-[360px] lg:w-full lg:max-w-none'>
                  <Image
                    src='/images/pricing/child.png'
                    alt='Illustration enfant programme'
                    width={320}
                    height={360}
                    className='h-auto w-full object-contain transition-transform duration-300 hover:scale-105'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* plans card */}
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <PricingSkeleton key={i} />
              ))
            : plan
                .filter((item) => {
                  // For entreprise, filter out "Bootcamp AI" (Pro) plan
                  if (selectedCategory === 'entreprise' && item.type === 'Bootcamp AI') {
                    return false
                  }
                  return true
                })
                .map((item, i) => {
                  const config =
                    contentConfig[selectedCategory][item.type] ?? {
                      title: item.type,
                      desc: item.desc,
                      options: item.option,
                      cta: 'Réserver maintenant',
                    }
                  const features = config.options ?? item.option
                  return (
                    <div key={i}>
                      <div className='flex h-full flex-col rounded-3xl border border-black/10 bg-white px-7 py-10 shadow-lg dark:border-white/10 dark:bg-darkmode dark:shadow-neutral-50/10'>
                        <div className='flex flex-col gap-6 border-b border-black/10 dark:border-white/10 pb-6'>
                          <p className='text-lg font-bold whitespace-nowrap'>{config.title}</p>
                          {config.desc && (
                            <p className='text-base font-normal'>{config.desc}</p>
                          )}
                        </div>
                        {/* options */}
                        <div className='flex-1 flex flex-col'>
                          <ul className='flex flex-col gap-6 my-6'>
                            {features.map((feat, i) => (
                              <li key={i}>
                                <div className='flex items-center gap-3'>
                                  <div className='p-1 rounded-full bg-primary/10 text-primary'>
                                    <Icon
                                      icon={'material-symbols:check-rounded'}
                                      width={19}
                                      height={19}
                                    />
                                  </div>
                                  <p className='text-base font-normal'>{feat}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <button className='mt-auto w-full rounded-xl border border-transparent bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] py-3 text-sm font-semibold text-white shadow-md shadow-[#0091E6]/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:cursor-pointer'>
                            {config.cta}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
        </div>
      </div>
    </section>
  )
}

export default Pricing
