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
        <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-20 gap-5'>
          <div className='w-fit'>
            <Logo />
          </div>

        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 xl:gap-8'>
          {/* CLOUMN-1 */}
          <div className='lg:col-span-4 sm:col-span-2 flex flex-col gap-5'>
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
          <div className='lg:col-span-4 col-span-1'>
            <div className='flex gap-20'>
              {footerlink.map((product, i) => (
                <div key={i} className='group relative col-span-2'>
                  <p className='text-xl font-semibold mb-9'>
                    {product.section}
                  </p>
                  <ul>
                    {product.links.map((item, i) => (
                      <li key={i} className='mb-3'>
                        <Link
                          href={item.href}
                          className='text-darkblue/60 dark:text-white/60 hover:text-primary dark:hover:text-primary text-base font-normal mb-6'>
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
          <div className='lg:col-span-4 col-span-1'>
            <div className='flex gap-2'>
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
                className='text-base font-normal text-offwhite hover:text-primary dark:hover:text-primary transition-colors duration-200'>
                V74G+2MP, Tunis
              </Link>
            </div>
            <div className='flex gap-2 mt-10'>
              <Icon
                icon={'tabler:phone'}
                width={22}
                height={22}
                className='text-lightgrey'
              />
              <Link href='tel:+216 25 857 621 '>
                <p className='text-base font-normal text-offwhite hover:text-primary dark:hover:text-primary'>
                  +216 25 857 621 
                </p>
              </Link>
            </div>
            <div className='flex gap-2 mt-10'>
              <Icon
                icon={'tabler:mail'}
                width={22}
                height={22}
                className='text-lightgrey'
              />
              <Link href='mailto:academy@inoteqia.com '>
                <p className='text-base font-normal text-offwhite hover:text-primary dark:hover:text-primary'>
                  academy@inoteqia.com 
                </p>
              </Link>
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
