'use client'

import { useState } from 'react'
import HeroSection from './components/HeroSection'
import FormationsList from './components/FormationsList'
import LearnSection from './components/LearnSection'
import ProjectsExperienceSection from './components/ProjectsExperienceSection'
import WhyChooseSection from './components/WhyChooseSection'
import TrainersSection from './components/TrainersSection'
import TestimonialsSection from './components/TestimonialsSection'
import FaqSection from './components/FaqSection'
import ReservationPaymentSection from './components/ReservationPaymentSection'

export default function NosFormationsContent() {
  const [preselectedFormation, setPreselectedFormation] = useState('')

  return (
    <main className='bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden'>
      <HeroSection />
      
      <div id='programmes-section'>
        <div className='bg-gradient-to-b from-transparent via-secondary/5 to-transparent dark:via-slate-900'>
          <FormationsList onEnroll={(formationTitle) => setPreselectedFormation(formationTitle)} />
          <LearnSection />
          <ProjectsExperienceSection />
          <WhyChooseSection />
          <TrainersSection />
          <TestimonialsSection />
          <FaqSection />
          <ReservationPaymentSection preselectedFormation={preselectedFormation} />
        </div>
      </div>
    </main>
  )
}
