'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ReviewType } from '@/app/types/review'
import SectionHeading, { fadeInUp } from './SectionHeading'

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<ReviewType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setReviews(data.ReviewData)
      } catch (error) {
        console.error('Error fetching reviews', error)
      }
    }
    fetchData()
  }, [])

  return (
    <section className='py-16 lg:py-20'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <SectionHeading label='Ils parlent de nous' />

        <div className='grid sm:grid-cols-3 gap-6 mt-12'>
          {reviews.map((item, idx) => (
            <motion.div
              key={item.name + idx}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className='rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-sm p-6 flex flex-col gap-3'
            >
              <div className='flex gap-1 text-[#F5A623]'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} icon='solar:star-bold' className='w-4 h-4' />
                ))}
              </div>
              <p className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic'>&ldquo;{item.desc}&rdquo;</p>
              <p className='text-xs font-bold text-[#27397F] dark:text-[#3FA9DF] mt-auto'>— {item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
