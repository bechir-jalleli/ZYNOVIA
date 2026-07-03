'use client'

import { useState } from 'react'
import HeroSection from './HeroSection'
import ProgramCards from './ProgramCards'
import ComparisonSection from './ComparisonSection'
import ProgramContentAccordions from './ProgramContentAccordions'
import InscriptionForm from './InscriptionForm'
import BrochureSection from './BrochureSection'
import FaqSection from './FaqSection'

export default function NosFormationsContent() {
  const [selectedProgram, setSelectedProgram] = useState<string>('bootcamp')
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    bootcamp: true,
    generative: true,
  })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleToggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <main className='bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden'>
      {/* SECTION 1 — HERO */}
      <HeroSection />

      {/* SECTION 2 — PROGRAM CARDS */}
      <ProgramCards
        selectedProgram={selectedProgram}
        onSelectProgram={setSelectedProgram}
      />

      {/* SECTION 3 — COMPARISON TABLE + CTA */}
      <ComparisonSection />

      {/* SECTION 4 — PROGRAM CONTENT ACCORDIONS */}
      <ProgramContentAccordions
        openAccordions={openAccordions}
        onToggleAccordion={toggleAccordion}
      />

      {/* SECTION 5 — INSCRIPTION FORM */}
      <InscriptionForm />

      {/* SECTION 6 — BROCHURE DOWNLOADS */}
      <BrochureSection />

      {/* SECTION 7 — FAQ */}
      <FaqSection
        openFaq={openFaq}
        onToggleFaq={handleToggleFaq}
      />
    </main>
  )
}