'use client'

import Link from 'next/link'
import Logo from '../Header/Logo'
import { Icon } from '@iconify/react'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return (
    <footer>
      <div className='container py-14'>
        <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10'>
          {/* LEFT COLUMN - Logo, Description, Social Media */}
          <div className='flex flex-col gap-5'>
            <div className='w-fit'>
              <Logo />
            </div>
            <p className='max-w-xs text-sm text-darkblue/60 dark:text-white/60'>
              Zynovia Academy accompagne les jeunes, les familles et les partenaires dans la
              découverte et la maîtrise de l&apos;IA.
            </p>
            <div className='flex gap-4 flex-wrap'>
              <Link
                href='https://www.facebook.com/profile.php?id=61590195886623' target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'>
                <Icon
                  icon='tabler:brand-facebook-filled'
                  width={45}
                  height={45}
                  className='text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-primary dark:hover:text-primary duration-300'
                />
              </Link>

              <Link
                href='https://www.instagram.com/zynovia_academy/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'>
                <Icon
                  icon='tabler:brand-instagram'
                  width={45}
                  height={45}
                  className='text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-primary dark:hover:text-primary duration-300'
                />
              </Link>

              <Link
                href='https://wa.me/21625857621'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='WhatsApp'>
                <Icon
                  icon='tabler:brand-whatsapp'
                  width={45}
                  height={45}
                  className='text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-[#25D366] dark:hover:text-[#25D366] duration-300'
                />
              </Link>
            </div>
            <Link
              href="/inscription?role=Parent"
              onClick={(e) => {
                if (pathname === '/inscription') {
                  e.preventDefault()
                  const el = document.getElementById('inscription-form')
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    const firstInput = document.getElementById('parent-nom-input') as HTMLInputElement | null
                    if (firstInput) {
                      firstInput.focus({ preventScroll: true })
                    }
                  }
                }
              }}
              className="text-center px-4 py-2 text-sm sm:text-base font-semibold text-white rounded-[12px] bg-gradient-to-r from-[#0091E6] to-[#0063B1] hover:from-[#0079C2] hover:to-[#005A9C] shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              Inscrire mon enfant
            </Link>
          </div>

          {/* SECOND COLUMN - Navigation Links */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-darkblue dark:text-white mb-2'>
              Liens utiles
            </h3>
            <ul className='flex flex-col gap-2.5'>
              <li>
                <Link href='/' className='text-sm font-normal text-darkblue/60 hover:text-primary dark:text-white/60 dark:hover:text-primary transition-colors duration-200'>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href='/a-propos' className='text-sm font-normal text-darkblue/60 hover:text-primary dark:text-white/60 dark:hover:text-primary transition-colors duration-200'>
                  À propos de Zynovia Academy
                </Link>
              </li>
              <li>
                <Link href='/programmes' className='text-sm font-normal text-darkblue/60 hover:text-primary dark:text-white/60 dark:hover:text-primary transition-colors duration-200'>
                  Nos Programmes
                </Link>
              </li>
              <li>
                <Link href='/vision' className='text-sm font-normal text-darkblue/60 hover:text-primary dark:text-white/60 dark:hover:text-primary transition-colors duration-200'>
                  Notre Vision
                </Link>
              </li>
              <li>
                <Link href='/nos-formateurs' className='text-sm font-normal text-darkblue/60 hover:text-primary dark:text-white/60 dark:hover:text-primary transition-colors duration-200'>
                  Nos Formateurs
                </Link>
              </li>
              <li>
                <Link href='/ressources' className='text-sm font-normal text-darkblue/60 hover:text-primary dark:text-white/60 dark:hover:text-primary transition-colors duration-200'>
                  Ressources & Blog
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-sm font-normal text-darkblue/60 hover:text-primary dark:text-white/60 dark:hover:text-primary transition-colors duration-200'>
                  Contact & Inscriptions
                </Link>
              </li>
            </ul>

          </div>

          {/* THIRD COLUMN - Contact Information */}
          <div className='flex flex-col gap-5'>
            <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-darkblue dark:text-white mb-2'>
              Nos coordonnées
            </h3>
            <Link
              href='/contact'
              className='text-sm font-normal text-darkblue/60 hover:text-primary dark:text-white/60 dark:hover:text-primary transition-colors duration-200'>
              Prendre rendez-vous
            </Link>
            <div className='flex items-start gap-2'>
              <Icon
                icon={'tabler:map-pin'}
                width={22}
                height={22}
                className='text-lightgrey flex-shrink-0 mt-0.5'
              />
              <Link
                href='https://www.google.com/maps/place/ZYNOVIA/@36.8550972,10.274117,17z/data=!3m1!4b1!4m6!3m5!1s0x12e2b5128a5ef2f1:0x4f3e6d7fbd54d6e2!8m2!3d36.8550929!4d10.2766919!16s%2Fg%2F11rr91xr_w?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm font-normal text-darkblue/60 dark:text-white/60 transition-colors duration-200 hover:text-primary dark:hover:text-primary'>
                B2-2 Immeuble Mak Crown, rue du Lac Léman, Les Berges du Lac 1053 Tunis
              </Link>
            </div>
            <div className='flex items-start gap-2'>
              <Icon
                icon={'tabler:phone'}
                width={22}
                height={22}
                className='text-lightgrey flex-shrink-0 mt-0.5'
              />
              <div className='flex flex-col gap-1'>
                <Link href='tel:+21625857621'>
                  <p className='text-sm font-normal text-darkblue/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-colors duration-200'>
                    +216 25 857 621
                  </p>
                </Link>
                <Link href='tel:+21690145046'>
                  <p className='text-sm font-normal text-darkblue/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-colors duration-200'>
                    +216 90 145 046
                  </p>
                </Link>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <Icon
                icon={'tabler:mail'}
                width={22}
                height={22}
                className='text-lightgrey flex-shrink-0 mt-0.5'
              />
              <Link href='mailto:contact@zynovia-academy.com'>
                <p className='text-sm font-normal text-darkblue/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-colors duration-200'>
                  contact@zynovia-academy.com
                </p>
              </Link>
            </div>
            <div className='flex items-start gap-2'>
              <Icon
                icon={'tabler:clock'}
                width={22}
                height={22}
                className='text-lightgrey flex-shrink-0 mt-0.5'
              />
              <div>
                <p className='text-sm font-semibold text-darkblue dark:text-white mb-1'>
                  Horaires
                </p>
                <p className='text-sm font-normal text-darkblue/60 dark:text-white/60'>
                  Lundi – Vendredi, 8h–19h
                </p>
              </div>
            </div>
          </div>

          {/* FOURTH COLUMN - Map */}
          <div className='flex flex-col'>
            <div className='overflow-hidden rounded-xl border border-slate-200/50 dark:border-slate-700/50 h-full min-h-[300px]'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3193.095126408207!2d10.241040175304933!3d36.840197765444806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd35442439218b%3A0xf94daf30bad489ca!2sBureau%20N%C2%B0%20B2%2C%20Immeuble%20Mak%20Crown%2C%202%20Rue%20Du%20Lac%20L%C3%A9man%D8%8C%20Tunis%201053!5e0!3m2!1sen!2stn!4v1781179372702!5m2!1sen!2stn'
                width='100%'
                height='100%'
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='w-full h-full'
                title='ZYNOVIA Academy Location'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='py-3'>
        <p className='text-center text-sm text-darkblue/60 dark:text-white/60'>
          © 2026 - All Rights Reserved by{' '}
          <Link
            href='/'
            className='hover:text-primary dark:hover:text-primary transition-colors duration-200'>
            Zynovia Academy
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
