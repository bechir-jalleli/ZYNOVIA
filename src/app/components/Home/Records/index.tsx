'use client'

import { useEffect, useRef, useState } from 'react'
import { RecordType } from '@/app/types/record'
import Image from 'next/image'
import RecordSkeleton from '../../Skeleton/Record'

type AnimatedDigitProps = {
  value: string
  start: boolean
}

const AnimatedDigit = ({ value, start }: AnimatedDigitProps) => {
  const [display, setDisplay] = useState(0)

  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!start || target === 0) return

    let frameId: number
    const duration = 1500
    const startTime = performance.now()

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1)
      const current = Math.floor(target * progress)
      setDisplay(current)

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [start, target])

  if (target === 0) {
    return <span>{value}</span>
  }

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

const Records = () => {
  const [record, setRecord] = useState<RecordType[]>([])
  const [Loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setRecord(data.RecordData)
      } catch (error) {
        console.error('Error fetching service', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id='records' className='py-16'>
      <div className='container'>
        <div className='text-center mb-10'>
          <p className='text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary/80'>
            IA &amp; futur
          </p>
          <h2 className='mt-3 text-3xl sm:text-4xl font-semibold'>
            Pourquoi{' '}
            <span className='bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent'>
              apprendre l&apos;IA ?
            </span>
          </h2>
          <p className='mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto'>
            Ces chiffres montrent à quel point l&apos;intelligence artificielle
            transforme déjà nos études, nos métiers et les entreprises. C&apos;est
            maintenant qu&apos;il faut se préparer.
          </p>
        </div>

        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-stretch gap-6'>
          {Loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <RecordSkeleton key={i} />
              ))
            : record.map((item, i) => (
                <div
                  key={i}
                  className={`h-full transition-all duration-700 ease-out ${
                    visible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className='border border-darkblue/10 dark:border-white/10 rounded-2xl flex flex-col gap-4 items-center justify-center px-6 py-8 shadow-sm dark:shadow-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm'>
                    <div className='p-3 bg-primary/10 rounded-full w-fit flex items-center justify-center'>
                      <Image
                        src={item.imgSrc}
                        alt={item.imgSrc}
                        width={36}
                        height={36}
                        className='drop-shadow-sm'
                      />
                    </div>
                    <h4 className='text-center text-2xl sm:text-3xl font-semibold text-darkblue dark:text-white'>
                      <AnimatedDigit value={item.digit} start={visible} />
                    </h4>
                    <p className='text-center text-sm sm:text-base font-normal text-slate-600 dark:text-slate-300 leading-relaxed'>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Records
