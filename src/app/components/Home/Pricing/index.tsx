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

  return (
    <section id='pricing' className='scroll-mt-12'>
      <div className='container'>
        <div className='text-center'>
          <h2>Choose the Plan That Fits You Best</h2>
          <p className='text-lg font-normal max-w-lg mx-auto my-6'>
            Explore pricing that aligns with your goals and delivers measurable
            results.
          </p>
        </div>
        {/* toggle button */}
        {/* Établissement scolaire/Entreprise Toggle Buttons */}
        <div className='mb-8'>
          <div className='flex justify-center'>
            <div className='bg-secondary dark:bg-darklight flex p-2 rounded-lg'>
              <button
                className={`text-base sm:text-lg font-medium cursor-pointer py-2 px-4 sm:py-4 sm:px-8 whitespace-nowrap ${
                  selectedCategory === 'etablissement'
                    ? 'text-primary bg-white dark:bg-darkmode rounded-lg shadow dark:shadow-neutral-50/20'
                    : 'text-black dark:text-white'
                }`}
                onClick={() => handleCategoryChange('etablissement')}>
                Établissement scolaire
              </button>
              <button
                className={`text-base sm:text-lg font-medium cursor-pointer py-2 px-4 sm:py-4 sm:px-8 whitespace-nowrap ${
                  selectedCategory === 'entreprise'
                    ? 'text-primary bg-white dark:bg-darkmode rounded-lg shadow dark:shadow-neutral-50/20'
                    : 'text-black dark:text-white'
                }`}
                onClick={() => handleCategoryChange('entreprise')}>
                Entreprise
              </button>
            </div>
          </div>
        </div>
        {/* grid layout */}
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
          {/* card-1 */}
          <div className='bg-primary rounded-lg lg:col-span-1 md:col-span-2'>
            <div className='flex lg:flex-col sm:flex-row flex-col justify-between w-full h-full'>
              <div className='pl-8 pr-2.5 pt-14'>
                <h3 className='lg:max-w-xs leading-10'>
                  Choisir le plan entreprise vous donne{' '}
                  <span className='font-bold'> une réduction de 35% </span>
                </h3>
              </div>
              <div>
                <Image
                  src={'/images/pricing/actor.webp'}
                  alt='actor'
                  width={360}
                  height={380}                
                />
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
                  // Change "Programme une heure par semaine" to "Bootcamp AI" for entreprise
                  const displayType =
                    selectedCategory === 'entreprise' && item.type === 'Programme une heure par semaine'
                      ? 'Bootcamp AI'
                      : item.type

                  return (
                    <div key={i}>
                      <div className='bg-white dark:bg-darkmode rounded-lg shadow-lg dark:shadow-neutral-50/10 border border-black/10 dark:border-white/10 px-7 py-10 h-full'>
                        <div className='flex flex-col gap-6 border-b border-black/10 dark:border-white/10 pb-6'>
                          <p className='text-lg font-bold whitespace-nowrap'>{displayType}</p>
                          {item.desc && (
                            <p className='text-base font-normal'>{item.desc}</p>
                          )}
                        </div>
                        {/* options */}
                        <div>
                          <ul className='flex flex-col gap-6 my-6'>
                            {item.option.map((feat, i) => (
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
                        </div>
                        <button className='bg-primary border border-primary py-3 w-full rounded-lg text-white hover:bg-transparent hover:text-primary hover:cursor-pointer duration-300'>
                          Buy Now
                        </button>
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
