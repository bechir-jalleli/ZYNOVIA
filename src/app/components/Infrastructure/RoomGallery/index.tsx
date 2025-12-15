'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface RoomGalleryProps {
  images: string[]
  title?: string
}

export default function RoomGallery({ images, title = 'Salle immersive d\'INOTEQIA Academy' }: RoomGalleryProps) {
  // Start with the last image (reverse order)
  const [currentIndex, setCurrentIndex] = useState(() => 
    images.length > 0 ? images.length - 1 : 0
  )

  // Reset to last image when images array changes
  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(images.length - 1)
    }
  }, [images.length])

  const goToPrevious = () => {
    // In reverse order, "previous" means going forward in the original array
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const goToNext = () => {
    // In reverse order, "next" means going backward in the original array
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Keyboard navigation (reversed: left goes forward, right goes backward)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        // In reverse order, left arrow goes forward in original array
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
      } else if (event.key === 'ArrowRight') {
        // In reverse order, right arrow goes backward in original array
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  if (images.length === 0) {
    return null
  }

  return (
    <div className='relative w-full'>
      {/* Main Image Container */}
      <div className='relative overflow-hidden rounded-3xl bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.18)] ring-1 ring-white/80 backdrop-blur dark:bg-slate-900/80 dark:ring-white/10'>
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
                priority={currentIndex === images.length - 1}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className='absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-all hover:bg-white hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:bg-slate-900/90 dark:hover:bg-slate-800'
                aria-label='Image précédente'>
                <ChevronLeft className='h-6 w-6 text-[#0A004B] dark:text-white' />
              </button>
              <button
                onClick={goToNext}
                className='absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition-all hover:bg-white hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:bg-slate-900/90 dark:hover:bg-slate-800'
                aria-label='Image suivante'>
                <ChevronRight className='h-6 w-6 text-[#0A004B] dark:text-white' />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/50 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur'>
              {images.length - currentIndex} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className='mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
          {images.slice().reverse().map((image, reversedIndex) => {
            const originalIndex = images.length - 1 - reversedIndex
            return (
              <button
                key={originalIndex}
                onClick={() => goToSlide(originalIndex)}
                className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  originalIndex === currentIndex
                    ? 'ring-2 ring-primary scale-105'
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
                aria-label={`Aller à l'image ${originalIndex + 1}`}>
                <div className='relative h-16 w-24'>
                  <Image
                    src={image}
                    alt={`Miniature ${originalIndex + 1}`}
                    fill
                    sizes='96px'
                    className='object-cover'
                  />
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

