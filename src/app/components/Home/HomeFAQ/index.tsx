'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'

interface FAQItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Qu'est-ce que ZYNOVIA Academy ?",
    answer: "ZYNOVIA Academy est la première académie en  spécialisée dans l'initiation et la formation en Intelligence Artificielle (IA), robotique et programmation pour les jeunes (collégiens et lycéens). Notre mission est de préparer la prochaine génération aux métiers du futur."
  },
  {
    question: "À qui s'adressent les formations de ZYNOVIA ?",
    answer: "Nos cours et ateliers s'adressent principalement aux collégiens et lycéens (âgés de 12 à 18 ans). Les programmes sont adaptés à tous les niveaux, du débutant absolu à l'élève intermédiaire, sans aucun prérequis technique nécessaire."
  },
  {
    question: "Où se situe l'académie ZYNOVIA ?",
    answer: "Nos locaux sont situés au Bureau B2-2, Immeuble Mak Crown, 2 Rue du Lac Léman, Les Berges du Lac 1, 1053 Tunis, . Nous y accueillons les élèves dans un cadre moderne et adapté à l'apprentissage technologique."
  },
  {
    question: "Quels sont les différents programmes proposés ?",
    answer: "Nous proposons deux formules principales : le Programme Annuel IA (à raison d'une heure par semaine durant toute l'année scolaire) et les Bootcamps IA (des sessions d'apprentissage intensives durant les vacances scolaires)."
  },
  {
    question: "Comment puis-je inscrire mon enfant ?",
    answer: "L'inscription peut se faire facilement en remplissant le formulaire sur notre page de contact, en nous appelant directement au +216 25 857 621, ou en planifiant un rendez-vous en ligne avec nos conseillers d'orientation."
  },
  {
    question: "Les programmes sont-ils disponibles pour les écoles et les entreprises ?",
    answer: "Oui, tout à fait. Nous collaborons avec des établissements scolaires pour intégrer l'IA dans leur cursus et nous proposons également des bootcamps exclusifs pour les enfants des salariés des entreprises partenaires."
  }
]

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate FAQPage JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  }

  return (
    <section id="faq" className="scroll-mt-12 py-20 lg:py-28 bg-[#F6F8FB] dark:bg-slate-900/50">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A004B] dark:text-white mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes sur ZYNOVIA Academy, nos cours d'IA et nos modalités d'inscription.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-darkmode rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left text-base sm:text-lg font-semibold text-[#0A004B] dark:text-white hover:text-sky-600 dark:hover:text-[#3FA9DF] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <div
                    className={`flex-shrink-0 ml-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-[#3FA9DF]' : ''
                      }`}
                  >
                    <Icon icon="fluent:chevron-down-24-filled" width={18} height={18} />
                  </div>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] border-t border-slate-100 dark:border-slate-800/60' : 'max-h-0'
                    }`}
                >
                  <div className="p-5 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-50/50 dark:bg-slate-900/30">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeFAQ
