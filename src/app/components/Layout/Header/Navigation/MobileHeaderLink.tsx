import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavLinkType } from '@/app/types/navlink'

const MobileHeaderLink: React.FC<{ item: NavLinkType; onItemClick: () => void }> = ({ item, onItemClick }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setSubmenuOpen(!submenuOpen)
  }

  const handleItemClick = () => {
    if (!item.submenu) {
      onItemClick()
    }
  }

  const handleSubItemClick = () => {
    onItemClick()
  }

  const path = usePathname()

  return (
    <div className='relative w-full'>
      <Link
        href={item.href}
        onClick={item.submenu ? handleToggle : handleItemClick}
        className={`flex items-center justify-between w-full py-2 text-darkblue dark:text-white focus:outline-none transition-all duration-300 ${
          item.href === path || path.startsWith(`/${item.label.toLowerCase()}`)
            ? 'text-gradient font-bold'
            : 'hover:text-gradient-hover'
        }`}>
        {item.label}
        {item.submenu && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.5em'
            height='1.5em'
            viewBox='0 0 24 24'>
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
      {submenuOpen && item.submenu && (
        <div className='bg-white dark:bg-white/10 p-2 w-full'>
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              onClick={handleSubItemClick}
              className='block py-2 text-darkblue dark:text-white transition-all duration-300 hover:text-gradient-hover'>
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileHeaderLink
