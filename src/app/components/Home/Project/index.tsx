'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react'
import { ProjectType } from '@/app/types/project'
import ProjectSkeleton from '../../Skeleton/Project'

const Project = () => {
  const [project, setProject] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setProject(data.ProjectData)
      } catch (error) {
        console.error('Error fetching service', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <section
      id='project'
      className='scroll-mt-12 py-24 lg:py-32 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'
    >
      <div className='relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        {/* Decorative patterns */}
        <div className='pointer-events-none absolute -top-6 -left-10 h-32 w-32 opacity-70 dark:opacity-40'>
          <Image
            src='/images/banner/pattern1.svg'
            alt='pattern decorative'
            width={141}
            height={141}
            className='h-full w-full object-contain'
          />
        </div>
        <div className='pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 opacity-70 dark:opacity-40'>
          <Image
            src='/images/banner/pattern2.svg'
            alt='pattern decorative'
            width={141}
            height={141}
            className='h-full w-full object-contain'
          />
        </div>

        {/* Header */}
        <div className='relative mb-10 text-center'>
          <h2 className='mb-4 text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
            Projets de nos Élèves
          </h2>
          <p className='mx-auto max-w-2xl text-base font-medium text-slate-700 sm:text-lg lg:text-xl dark:text-slate-200'>
            Découvrez les projets concrets réalisés par nos élèves en Intelligence Artificielle. Des applications innovantes qui démontrent leur maîtrise des technologies du futur.
          </p>
        </div>

        {/* Slider */}
        <div className='relative z-10'>
          <Slider {...settings}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <ProjectSkeleton key={i} />)
              : project.map((item, i) => (
                  <div key={i}>
                    <div className='m-3 rounded-3xl bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80 backdrop-blur sm:p-5 dark:bg-slate-900/95 dark:ring-slate-700/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)]'>
                      <div className='mb-4 w-full overflow-hidden rounded-2xl'>
                        <Image
                          src={item.coverImg}
                          alt={item.coverImg}
                          width={234}
                          height={236}
                          className='h-full w-full object-cover'
                        />
                      </div>
                      <div className='flex items-center gap-3'>
                        <Image
                          src='/images/project/get-nextjs-logo.svg'
                          alt='logo'
                          width={32}
                          height={32}
                          className='h-8 w-8 rounded-full'
                        />
                        <p className='text-base font-semibold text-slate-900 sm:text-lg dark:text-slate-50'>
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Project
