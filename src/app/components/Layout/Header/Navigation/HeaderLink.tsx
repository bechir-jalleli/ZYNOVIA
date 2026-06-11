'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavLinkType } from '@/app/types/navlink'

const HeaderLink: React.FC<{ item: NavLinkType }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const path = usePathname()

  return (
    <li
      className='relative'
      onMouseEnter={() => item.submenu && setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}>
      <Link
        href={item.href}
        className={`text-lg flex items-center font-medium transition-all duration-300 ${
          item.href === path || path.startsWith(`/${item.label.toLowerCase()}`)
            ? 'text-gradient font-bold'
            : 'text-darkblue dark:text-white hover:text-gradient-hover'
        }`}>
        {item.label}
        {item.submenu && (
          <svg xmlns='http://www.w3.org/2000/svg' width='1.6em' height='1.6em' viewBox='0 0 24 24'>
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='m7 10l5 5l5-5'
            />
          </svg>
        )}
      </Link>
      {submenuOpen && (
        <ul className='absolute py-2 left-0 mt-0.5 w-64 bg-white dark:bg-white/10 shadow-lg rounded-lg'>
          {item.submenu?.map((subItem, index) => (
            <li key={index}>
              <Link
                href={subItem.href}
                className='block px-5 py-3 text-base text-darkblue dark:text-white hover:bg-neutral-50 dark:hover:bg-darkmode/10 hover:text-primary dark:hover:text-primary'>
                {subItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default HeaderLink