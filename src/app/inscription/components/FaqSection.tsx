'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import SectionHeading from './SectionHeading'

const faqs = [
  {
    q: 'Faut-il déjà savoir programmer ?',
    a: 'Non. La formation est accessible aux débutants et ne nécessite aucune connaissance préalable en programmation ou en Intelligence Artificielle. Les notions sont expliquées progressivement, avec des exercices adaptés à l’âge et au niveau de chaque participant.',
  },
  {
    q: 'Mon enfant doit-il apporter un ordinateur ?',
    a: 'Oui. Chaque participant doit venir avec un ordinateur portable et son chargeur afin de réaliser les ateliers, les exercices de programmation et le projet final dans les meilleures conditions.',
  },
  {
    q: 'Une certification est-elle délivrée ?',
    a: 'Oui. Une certification de fin de formation Zynovia est remise à chaque participant. Elle atteste de sa participation au Bootcamp et des compétences abordées en Intelligence Artificielle, Python et création de projets.',
  },
  {
    q: 'Les groupes sont-ils limités ?',
    a: 'Oui. Le nombre de participants est volontairement limité afin de garantir un accompagnement personnalisé, une meilleure interaction avec le formateur et davantage de temps consacré à chaque jeune.',
  },
  {
    q: 'Que va réellement apprendre mon enfant ?',
    a: 'Votre enfant découvrira les bases de l’Intelligence Artificielle et du Machine Learning, s’initiera à Python, utilisera des outils comme Google Colab et apprendra à créer un premier modèle d’IA. Il réalisera également un projet concret qu’il présentera à la fin du Bootcamp.',
  },
  {
    q: 'La formation est-elle pratique ou théorique ?',
    a: 'La formation est principalement orientée vers la pratique. Les jeunes apprennent en réalisant des exercices, des défis et des projets concrets. L’objectif n’est pas seulement de comprendre l’IA, mais de savoir l’utiliser pour créer.',
  },
  {
    q: 'Mon enfant doit-il être fort en mathématiques ?',
    a: 'Non. Un niveau avancé en mathématiques n’est pas nécessaire. Le programme privilégie la logique, la curiosité, la créativité et l’apprentissage progressif. Les notions techniques sont expliquées de manière simple et accessible.',
  },
];

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
