'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  title?: string
}

export default function ImageLightbox({
  images,
  currentIndex: initialIndex,
  isOpen,
  onClose,
  title = 'Galerie d\'images',
}: ImageLightboxProps) {
  const [lightboxIndex, setLightboxIndex] = useState(initialIndex)

  // Update lightbox index when currentIndex changes
  useEffect(() => {
    setLightboxIndex(initialIndex)
  }, [initialIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
      } else if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, images.length, onClose])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || images.length === 0) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm'
          onClick={onClose}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className='absolute top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
            aria-label='Fermer'>
            <X className='h-6 w-6' />
          </button>

          {/* Lightbox Image */}
          <div className='relative max-w-7xl max-h-[90vh] w-full mx-4' onClick={(e) => e.stopPropagation()}>
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
                  className='absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
                  aria-label='Image précédente'>
                  <ChevronLeft className='h-7 w-7' />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setLightboxIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
                  }}
                  className='absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
                  aria-label='Image suivante'>
                  <ChevronRight className='h-7 w-7' />
                </button>
              </>
            )}

            {/* Lightbox Counter */}
            {images.length > 1 && (
              <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/50 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur'>
                {lightboxIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


