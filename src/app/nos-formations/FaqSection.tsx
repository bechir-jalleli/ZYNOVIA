'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { fadeInUp } from './animations'
import { faqItems } from './data'

interface FaqSectionProps {
  openFaq: number | null
  onToggleFaq: (index: number) => void
}

export default function FaqSection({ openFaq, onToggleFaq }: FaqSectionProps) {
  return (
    <section className='py-20 lg:py-28'>
      <div className='container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        <motion.div {...fadeInUp} className='text-center mb-12'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A004B] dark:text-white mb-4'>
            Questions fréquentes
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-4'>
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index
            return (
              <motion.div
                key={index}
                {...fadeInUp}
                className='border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-darkmode rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md'
              >
                <button
                  onClick={() => onToggleFaq(index)}
                  className='w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-[#0A004B] dark:text-white hover:text-sky-600 dark:hover:text-[#3FA9DF] transition-colors focus:outline-none'
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <div
                    className={`flex-shrink-0 ml-3 p-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-[#3FA9DF]'
                        : ''
                    }`}
                  >
                    <Icon icon='fluent:chevron-down-24-filled' width={16} height={16} />
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? 'max-h-[300px] border-t border-slate-100 dark:border-slate-800/60'
                      : 'max-h-0'
                  }`}
                >
                  <div className='p-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed bg-slate-50/50 dark:bg-slate-900/30'>
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
