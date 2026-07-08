'use client'

import { useState, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import FormationsList from './components/FormationsList'
import LearnSection from './components/LearnSection'
import ProjectsExperienceSection from './components/ProjectsExperienceSection'
import WhyChooseSection from './components/WhyChooseSection'
import TrainersSection from './components/TrainersSection'
import TestimonialsSection from './components/TestimonialsSection'
import FaqSection from './components/FaqSection'
import ReservationPaymentSection from './components/ReservationPaymentSection'
import PictureGallery from '../components/Home/PictureGallery';

export default function NosFormationsContent() {
  const [preselectedFormation, setPreselectedFormation] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const prog = params.get('program')
      if (prog) {
        setPreselectedFormation(prog)
        
        // Scroll directly to the form and focus the first field after rendering.
        // We use multiple timeouts to handle layout shifts dynamically as content (e.g. reviews/images) loads.
        const performScrollAndFocus = () => {
          const el = document.getElementById('inscription-form')
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            const firstInput = document.getElementById('parent-nom-input') as HTMLInputElement | null
            if (firstInput) {
              firstInput.focus({ preventScroll: true })
            }
          }
        }

        const timer1 = setTimeout(performScrollAndFocus, 150)
        const timer2 = setTimeout(performScrollAndFocus, 800)

        return () => {
          clearTimeout(timer1)
          clearTimeout(timer2)
        }
      }
    }
  }, [])

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
          <ReservationPaymentSection preselectedFormation={preselectedFormation} />
                      <PictureGallery />

          <FaqSection />
        </div>
      </div>
    </main>
  )
}
