'use client'

import { useEffect, useState } from 'react'
import { ReviewType } from '@/app/types/review'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ReviewSkeleton from '../../Skeleton/Review'

const Review = () => {
  const [review, setReview] = useState<ReviewType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setReview(data.ReviewData)
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
    slidesToShow: 3,
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

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const halfStars = rating % 1 >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStars

    return (
      <div className='flex items-center gap-0.5'>
        {[...Array(fullStars)].map((_, i) => (
          <Icon
            key={`full-${i}`}
            icon='tabler:star-filled'
            className='text-yellow-500 text-base'
          />
        ))}
        {halfStars > 0 && (
          <Icon
            key='half'
            icon='tabler:star-half-filled'
            className='text-yellow-500 text-base'
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon
            key={`empty-${i}`}
            icon='tabler:star-filled'
            className='text-gray-400 text-base'
          />
        ))}
      </div>
    )
  }

  return (
    <section className='py-24 lg:py-32 bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'>
      <div className='container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-10 text-center'>
          <h2 className='mb-4 text-3xl font-bold leading-tight text-[#0A004B] sm:text-4xl lg:text-5xl dark:text-white'>
            Témoignages
          </h2>
          <p className='mx-auto max-w-2xl text-base font-medium text-slate-700 sm:text-lg lg:text-xl dark:text-slate-200'>
            Ce que disent les parents, élèves et partenaires de leurs expériences avec ZYNOVIA Academy.
          </p>
        </div>
        {/* slider */}
        <Slider {...settings}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <ReviewSkeleton key={i} />)
            : review.map((item: any, i) => (
              <div key={item._id || i}>
                <div className='m-3 rounded-3xl bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80 backdrop-blur dark:bg-slate-900/95 dark:ring-slate-700/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)]'>
                  <div className='mb-5 flex items-center gap-4'>
                    <div className='relative'>
                      <Image
                        src={item.imgSrc}
                        alt={item.name}
                        width={48}
                        height={48}
                        className='h-12 w-12 rounded-full object-cover'
                      />
                      <div className='absolute bottom-0 right-0'>
                        <Image
                          src={'/images/banner/greentick.svg'}
                          alt='tick'
                          width={15}
                          height={15}
                        />
                      </div>
                    </div>
                    <div>
                      <h6 className='text-base font-semibold text-slate-900 dark:text-slate-50'>
                        {item.name}
                      </h6>
                      <div>{renderStars(item.rating)}</div>
                    </div>
                  </div>
                  <div>
                    <p className='text-sm font-normal leading-relaxed text-slate-700 sm:text-base dark:text-slate-200'>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  )
}

export default Review
