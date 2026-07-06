'use client'

import { motion } from 'framer-motion'

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

interface SectionHeadingProps {
  label: string
}

export default function SectionHeading({ label }: SectionHeadingProps) {
  return (
    <motion.div {...fadeInUp} className='flex items-center justify-center gap-4'>
      <span className='h-px w-10 sm:w-16 bg-slate-300 dark:bg-white/20' />
      <h2 className='text-sm sm:text-base font-extrabold tracking-[0.15em] text-[#27397F] dark:text-[#3FA9DF] uppercase whitespace-nowrap'>
        {label}
      </h2>
      <span className='h-px w-10 sm:w-16 bg-slate-300 dark:bg-white/20' />
    </motion.div>
  )
}
