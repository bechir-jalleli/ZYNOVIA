'use client'

import Link from 'next/link'
import Logo from '../Header/Logo'
import { Icon } from '@iconify/react'

const Footer = () => {
  return (
    <footer>
      <div className='container py-14'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-3 xl:gap-10'>
          {/* LEFT COLUMN - Logo, Description, Social Media */}
          <div className='flex flex-col gap-5'>
            <div className='w-fit'>
              <Logo />
            </div>
            <p className='max-w-xs text-sm text-darkblue/60 dark:text-white/60'>
              Inoteqia Academy accompagne les jeunes, les familles et les partenaires dans la
              découverte et la maîtrise de l&apos;IA.
            </p>
            <div className='flex gap-4'>
              <Link
                href='https://www.facebook.com/Inoteqiaacademy?locale=fr_FR'
                target='_blank'
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
                href='https://www.linkedin.com/company/inoteqia-academy/about/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'>
                <Icon
                  icon='tabler:brand-linkedin'
                  width={45}
                  height={45}
                  className='text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-primary dark:hover:text-primary duration-300'
                />
              </Link>
              <Link
                href='https://www.instagram.com/inoteqiaacademy/'
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
            </div>
          </div>

          {/* MIDDLE COLUMN - Contact Information */}
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
                href='https://www.google.com/maps/place/INOTEQIA/@36.8550972,10.274117,17z/data=!3m1!4b1!4m6!3m5!1s0x12e2b5128a5ef2f1:0x4f3e6d7fbd54d6e2!8m2!3d36.8550929!4d10.2766919!16s%2Fg%2F11rr91xr_w?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm font-normal text-darkblue/60 dark:text-white/60 transition-colors duration-200 hover:text-primary dark:hover:text-primary'>
                V74G+2MP, Tunis
              </Link>
            </div>
            <div className='flex items-start gap-2'>
              <Icon
                icon={'tabler:phone'}
                width={22}
                height={22}
                className='text-lightgrey flex-shrink-0 mt-0.5'
              />
              <Link href='tel:+21625857621'>
                <p className='text-sm font-normal text-darkblue/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-colors duration-200'>
                  +216 25 857 621
                </p>
              </Link>
            </div>
            <div className='flex items-start gap-2'>
              <Icon
                icon={'tabler:mail'}
                width={22}
                height={22}
                className='text-lightgrey flex-shrink-0 mt-0.5'
              />
              <Link href='mailto:academy@inoteqia.com'>
                <p className='text-sm font-normal text-darkblue/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-colors duration-200'>
                  academy@inoteqia.com
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
                  Lundi – Vendredi, 8h–17h
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Map */}
          <div className='flex flex-col'>
            <div className='overflow-hidden rounded-xl border border-slate-200/50 dark:border-slate-700/50 h-full min-h-[300px]'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.4731121011414!2d10.274116975491433!3d36.85509287223157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2b5128a5ef2f1%3A0x4f3e6d7fbd54d6e2!2sINOTEQIA!5e0!3m2!1sen!2stn!4v1764779777716!5m2!1sen!2stn'
                width='100%'
                height='100%'
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='w-full h-full'
                title='INOTEQIA Academy Location'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='py-3'>
        <p className='text-center text-sm text-darkblue/60 dark:text-white/60'>
          © 2025 - All Rights Reserved by{' '}
          <Link
            href='/'
            className='hover:text-primary dark:hover:text-primary transition-colors duration-200'>
            Inoteqia Academy
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
