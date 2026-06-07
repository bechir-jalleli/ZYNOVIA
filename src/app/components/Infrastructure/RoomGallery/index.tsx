'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
interface RoomGalleryProps {
  images: string[]
  title?: string
}

export default function RoomGallery({ images, title = 'Salle immersive d\'ZYNOVIA Academy' }: RoomGalleryProps) {
  // Start with the first image
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Reset to first image when images array changes
  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0)
    }
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden' // Prevent body scroll when lightbox is open
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (event.key === 'ArrowLeft') {
          setLightboxIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
        } else if (event.key === 'ArrowRight') {
          setLightboxIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
        } else if (event.key === 'Escape') {
          closeLightbox()
        }
      } else {
        if (event.key === 'ArrowLeft') {
          setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
        } else if (event.key === 'ArrowRight') {
          setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length, isLightboxOpen])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <div className='relative w-full'>
        {/* Main Image Container */}
        <div className='relative overflow-hidden rounded-3xl bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:ring-white/10 group cursor-pointer' onClick={() => openLightbox(currentIndex)}>
          <div className='relative aspect-[4/3] w-full'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='absolute inset-0'>
                <Image
                  src={images[currentIndex]}
                  alt={`${title} - Image ${currentIndex + 1}`}
                  fill
                  sizes='(min-width: 1024px) 100vw, 100vw'
                  className='object-cover'
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Only visible on hover */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToPrevious()
                  }}
                  className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-all hover:bg-white hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:bg-slate-900/90 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 duration-300'
                  aria-label='Image précédente'>
                  <ChevronLeft className='h-5 w-5 sm:h-6 sm:w-6 text-[#0A004B] dark:text-white' />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToNext()
                  }}
                  className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-all hover:bg-white hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:bg-slate-900/90 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 duration-300'
                  aria-label='Image suivante'>
                  <ChevronRight className='h-5 w-5 sm:h-6 sm:w-6 text-[#0A004B] dark:text-white' />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail Navigation - Horizontal scroll with hidden scrollbar */}
        {images.length > 1 && (
          <div className='mt-3 sm:mt-4 overflow-x-auto scrollbar-hide'>
            <div className='flex gap-1.5 sm:gap-2 justify-center min-w-max'>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    goToSlide(index)
                  }}
                  className={`relative overflow-hidden rounded-md sm:rounded-lg transition-all flex-shrink-0 ${
                    index === currentIndex
                      ? 'ring-2 ring-primary scale-105'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                  aria-label={`Aller à l'image ${index + 1}`}>
                  <div className='relative h-12 w-20 sm:h-16 sm:w-24'>
                    <Image
                      src={image}
                      alt={`Miniature ${index + 1}`}
                      fill
                      sizes='96px'
                      className='object-cover'
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm'
            onClick={closeLightbox}>
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className='absolute top-2 right-2 sm:top-4 sm:right-4 z-50 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
              aria-label='Fermer'>
              <X className='h-5 w-5 sm:h-6 sm:w-6' />
            </button>

            {/* Lightbox Image */}
            <div className='relative max-w-7xl max-h-[90vh] w-full mx-2 sm:mx-4' onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className='relative w-full h-full'>
                  <Image
                    src={images[lightboxIndex]}
                    alt={`${title} - Image ${lightboxIndex + 1}`}
                    width={1920}
                    height={1080}
                    className='w-full h-auto max-h-[90vh] object-contain rounded-lg'
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Lightbox Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
                    }}
                    className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    aria-label='Image précédente'>
                    <ChevronLeft className='h-5 w-5 sm:h-7 sm:w-7' />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
                    }}
                    className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    aria-label='Image suivante'>
                    <ChevronRight className='h-5 w-5 sm:h-7 sm:w-7' />
                  </button>
                </>
              )}

              {/* Lightbox Counter - Only visible on hover */}
              {images.length > 1 && (
                <div className='absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/50 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-white backdrop-blur'>
                  {lightboxIndex + 1} / {images.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
