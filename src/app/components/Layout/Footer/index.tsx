'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from '../Header/Logo'
import { Icon } from '@iconify/react'
import { FooterLinkType } from '@/app/types/footerlinks'

const Footer = () => {
  const [footerlink, SetFooterlink] = useState<FooterLinkType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        SetFooterlink(data.FooterLinkData)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <footer>
      <div className='container py-14'>
        <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center mb-10 sm:mb-16'>
          <div className='w-fit'>
            <Logo />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 xl:gap-10'>
          {/* CLOUMN-1 */}
          <div className='flex flex-col gap-5 sm:col-span-2 lg:col-span-4'>
            <p className='max-w-xs text-sm text-darkblue/60 dark:text-white/60'>
              Inoteqia Academy accompagne les jeunes, les familles et les partenaires dans la
              découverte et la maîtrise de l’IA.
            </p>
            <div className='flex gap-4'>
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
            </div>
          </div>
          {/* CLOUMN-2 */}
          <div className='col-span-1 lg:col-span-4'>
            <div className='grid grid-cols-2 gap-x-8 gap-y-10 md:gap-x-10'>
              {footerlink.map((product, i) => (
                <div key={i} className='group relative'>
                  <p className='mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-darkblue dark:text-white'>
                    {product.section}
                  </p>
                  <ul className='space-y-2'>
                    {product.links.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className='text-sm font-normal text-darkblue/60 hover:text-primary dark:text-white/60 dark:hover:text-primary'>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* CLOUMN-3 */}
          <div className='col-span-1 space-y-5 lg:col-span-4'>
            <div className='flex items-start gap-2'>
              <Icon
                icon={'tabler:map-pin'}
                width={22}
                height={22}
                className='text-lightgrey'
              />
              <Link
                href='https://www.google.com/maps/place/INOTEQIA/@36.8550972,10.274117,17z/data=!3m1!4b1!4m6!3m5!1s0x12e2b5128a5ef2f1:0x4f3e6d7fbd54d6e2!8m2!3d36.8550929!4d10.2766919!16s%2Fg%2F11rr91xr_w?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D'
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm font-normal text-offwhite transition-colors duration-200 hover:text-primary dark:hover:text-primary'>
                V74G+2MP, Tunis
              </Link>
            </div>
            <div className='flex items-start gap-2'>
              <Icon
                icon={'tabler:phone'}
                width={22}
                height={22}
                className='text-lightgrey'
              />
              <Link href='tel:+216 25 857 621 '>
                <p className='text-sm font-normal text-offwhite hover:text-primary dark:hover:text-primary'>
                  +216 25 857 621 
                </p>
              </Link>
            </div>
            <div className='flex items-start gap-2'>
              <Icon
                icon={'tabler:mail'}
                width={22}
                height={22}
                className='text-lightgrey'
              />
              <Link href='mailto:academy@inoteqia.com '>
                <p className='text-sm font-normal text-offwhite hover:text-primary dark:hover:text-primary'>
                  academy@inoteqia.com 
                </p>
              </Link>
            </div>
            {/* Google Maps */}
            <div className='mt-6 overflow-hidden rounded-xl border border-slate-200/50 dark:border-slate-700/50'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.4731121011414!2d10.274116975491433!3d36.85509287223157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2b5128a5ef2f1%3A0x4f3e6d7fbd54d6e2!2sINOTEQIA!5e0!3m2!1sen!2stn!4v1764779777716!5m2!1sen!2stn'
                width='100%'
                height='300'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className='w-full'
                title='INOTEQIA Academy Location'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='py-3'>
        <p className='text-center'>
          © 2025 - All Rights Reserved by{' '}
          <Link
            href='/'
            className='hover:text-primary dark:hover:text-primary'>
            Inoteqia Academy
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
