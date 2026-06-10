'use client'

import Image from 'next/image'
import CloudImage from '@/app/components/Infrastructure/CloudImage'
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
        const res = await fetch('/api/data', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setProject(data.ProjectData || [])
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
    infinite: project.length > 4,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: project.length > 4,
    speed: 500,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          infinite: project.length > 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          infinite: project.length > 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          infinite: project.length > 1,
        },
      },
    ],
  }

  return (
    <section
      id='project'
      className='scroll-mt-12 py-24 lg:py-32 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden'
    >
      <div className='relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Decorative patterns */}
        <div className='pointer-events-none absolute -top-12 -left-12 h-48 w-48 opacity-20 dark:opacity-10'>
          <Image
            src='/images/banner/pattern1.svg'
            alt='pattern decorative'
            width={141}
            height={141}
            className='h-full w-full object-contain rotate-12'
          />
        </div>

        <div className='relative mb-16 text-center max-w-3xl mx-auto'>
          <h2 className='mb-6 text-3xl font-extrabold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
            Projets de nos <span className="text-gradient">Élèves</span>
          </h2>
          <p className='text-base font-medium text-slate-600 sm:text-lg lg:text-xl dark:text-slate-300 leading-relaxed'>
            Découvrez les projets concrets réalisés par nos élèves en Intelligence Artificielle. Des applications innovantes qui démontrent leur maîtrise des technologies du futur.
          </p>
        </div>

        <div className='relative z-10'>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => <ProjectSkeleton key={i} />)}
            </div>
          ) : project.length > 0 ? (
            <Slider {...settings} className="project-slider -mx-4">
              {project.map((item: any, i) => (
                <div key={item._id || i} className="px-4 py-8">
                  <div className='group relative rounded-[2.5rem] bg-white/95 dark:bg-slate-900/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-slate-200/50 dark:ring-slate-800/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] flex flex-col h-full overflow-hidden'>

                    {/* Cover Image Container */}
                    <div className='relative mb-6 w-full h-56 overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-800'>
                      <CloudImage
                        src={item.coverImg}
                        alt={item.name}
                        fill
                        optimizedWidth={480}
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                        sizes='(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw'
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Project Info */}
                    <div className='px-1 flex-grow'>
                      <h3 className='text-lg font-extrabold text-[#0A004B] dark:text-white mb-3 tracking-tight group-hover:text-[#3FA9DF] transition-colors'>
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className='text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6'>
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Creator Section */}
                    <div className='flex items-center gap-3.5 border-t border-slate-100 dark:border-white/5 pt-5 mt-auto'>
                      <div className='relative group-hover:scale-110 transition-transform duration-300'>
                        <div className='flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-[#3FA9DF]/30 bg-slate-50 dark:bg-white/5 flex items-center justify-center shadow-inner'>
                          {item.creator?.picture ? (
                            <CloudImage
                              src={item.creator.picture}
                              alt={item.creator.firstName}
                              width={48}
                              height={48}
                              optimizedWidth={96}
                              className='h-full w-full object-cover'
                            />
                          ) : (
                            <div className='text-[#3FA9DF]/40'>
                              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' /></svg>
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                      </div>

                      <div className='flex flex-col min-w-0'>
                        <p className='text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-0.5'>
                          Créé par
                        </p>
                        <p className='text-[13px] font-extrabold text-slate-900 dark:text-slate-100 truncate'>
                          {item.creator?.firstName || 'Élève'} {item.creator?.lastName || ''}
                        </p>
                        <p className='text-[9px] font-bold text-[#3FA9DF] uppercase tracking-tighter truncate'>
                          {item.creator?.school || 'Académie ZYNOVIA'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center py-20 text-slate-400 font-medium italic">
              Aucun projet à afficher pour le moment.
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
                .project-slider .slick-dots {
                    bottom: -40px;
                }
                .project-slider .slick-dots li button:before {
                    color: #3FA9DF;
                    font-size: 10px;
                    opacity: 0.2;
                }
                .project-slider .slick-dots li.slick-active button:before {
                    color: #27397F;
                    opacity: 1;
                }
            `}</style>
    </section>
  )
}

export default Project
