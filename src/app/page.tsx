import Link from 'next/link'

import ContactForm from './components/ContactForm'
import Category from './components/Home/Category'
import Hero from './components/Home/Hero'
import PartnersBanner from './components/Home/PartnersBanner'
import Pricing from './components/Home/Pricing'
import Project from './components/Home/Project'
import Records from './components/Home/Records'
import Review from './components/Home/Review'
import Specialize from './components/Home/Specialize'

export default function Home() {
  return (
    <main>
      {/* Hero – keep short and focused on main value prop & CTAs */}
      <Hero />

      {/* IA & futur - Why learn AI section with statistics */}
      <Records />

      {/* Vision preview – links to full /vision page */}
      <section
        id='vision'
        className='bg-secondary/10 py-16 dark:bg-slate-900/60'>
        <div className='container mx-auto max-w-5xl px-4'>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-primary'>
            Notre vision
          </p>
          <h2 className='mt-2 text-2xl font-semibold text-darkblue dark:text-white'>
            Préparer les collégiens et lycéens à un avenir transformé par l&apos;IA
          </h2>
          <p className='mt-3 max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-300'>
            INOTEQIA Academy construit un pont entre l&apos;école, la technologie et le monde
            professionnel pour aider chaque élève à trouver sa place dans les métiers de demain.
          </p>
          <div className='mt-6 flex flex-wrap gap-3 sm:gap-5'>
            <Link
              href='/vision'
              className='w-full sm:w-auto px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-white border rounded-[10px] border-transparent bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:cursor-pointer duration-300 shadow-md whitespace-nowrap'>
              Découvrir notre vision
            </Link>
            <Link
              href='/programmes'
              className='w-full sm:w-auto px-8 sm:px-10 py-3.5 text-sm sm:text-base font-semibold tracking-wide text-primary border rounded-[10px] border-primary bg-white dark:bg-transparent hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:cursor-pointer duration-300 shadow-sm whitespace-nowrap'>
              Voir nos programmes
            </Link>
          </div>
        </div>
      </section>

      {/* Programme highlights & social proof sections (existing components) */}
      <Specialize />
      <Project />
      <Review />
      <Pricing />
      <Category />

      {/* Partners Banner - moved to end of page */}
      <PartnersBanner />

      {/* Final CTA band leading to /contact (reuses existing contact form anchor) */}
      <ContactForm />
    </main>
  )
}
