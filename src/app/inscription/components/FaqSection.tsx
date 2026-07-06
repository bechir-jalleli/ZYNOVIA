'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import SectionHeading from './SectionHeading'

const faqs = [
  {
    q: 'Faut-il déjà savoir programmer ?',
    a: 'Non, la formation est accessible à tous, débutants compris.',
  },
  {
    q: 'Mon enfant doit-il apporter un ordinateur ?',
    a: 'Oui, un ordinateur portable est nécessaire pour suivre les ateliers pratiques.',
  },
  {
    q: 'Une certification est-elle délivrée ?',
    a: 'Oui, chaque participant reçoit un certificat et son projet final.',
  },
  {
    q: 'Les groupes sont-ils limités ?',
    a: 'Oui, nous limitons le nombre de participants pour garantir un suivi de qualité.',
  },
]

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <section className='py-16 lg:py-20'>
      <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        <SectionHeading label='Questions fréquentes' />

        <div className='mt-12 grid sm:grid-cols-2 gap-4'>
          {faqs.map((f, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={f.q}
                className='rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-sm overflow-hidden h-fit'
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className='w-full flex items-center justify-between gap-3 px-5 py-4 text-left'
                >
                  <span className='text-sm font-bold text-slate-800 dark:text-white'>{f.q}</span>
                  <Icon
                    icon='solar:alt-arrow-down-bold'
                    className={`w-4 h-4 flex-shrink-0 text-[#3FA9DF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className='overflow-hidden'
                    >
                      <p className='px-5 pb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed'>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
