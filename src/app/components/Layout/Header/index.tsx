'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'
import { NavLinkType } from '@/app/types/navlink'
import { Icon } from '@iconify/react'
import { useTheme } from 'next-themes'
import { useAuth } from '@/context/AuthContext'

const Header: React.FC = () => {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  if (pathname?.startsWith('/admin')) return null

  const [navlink, setNavlink] = useState<NavLinkType[]>([])
  const { theme, setTheme } = useTheme()
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const signInRef = useRef<HTMLDivElement>(null)
  const signUpRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  //   fetchData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setNavlink(data.NavLinkData)
      } catch (error) {
        console.error('Error fetching service', error)
      }
    }
    fetchData()
  }, [])

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        signInRef.current &&
        !signInRef.current.contains(event.target as Node)
      ) {
        setIsSignInOpen(false)
      }
      if (
        signUpRef.current &&
        !signUpRef.current.contains(event.target as Node)
      ) {
        setIsSignUpOpen(false)
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        navbarOpen
      ) {
        setNavbarOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen, isSignInOpen, isSignUpOpen])

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen])

  return (
    <header
      className={`fixed top-0 py-1 z-50 w-full bg-transparent transition-all ${sticky ? 'shadow-lg dark:shadow-neutral-50/5 bg-white dark:bg-darklight' : 'shadow-none'
        }`}>
      <div
        className={`container flex items-center justify-between gap-10 duration-300  ${sticky ? 'py-3' : 'py-4'
          }`}>
        <Logo />
        <nav>
          <ul className='hidden xl:flex flex-grow items-center justify-start gap-10 '>
            {navlink.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </ul>
        </nav>
        <div className='flex items-center gap-4'>
          <button
            aria-label='Toggle theme'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='flex items-center justify-center text-body-color duration-300 hover:cursor-pointer hover:text-primary dark:text-white bg-neutral-50 rounded-full dark:bg-darklight p-2 outline-none'>
            <Icon
              icon='solar:sun-2-bold'
              width='24'
              height='24'
              className='hidden dark:block'
            />
            <Icon
              icon='solar:moon-bold'
              width='24'
              height='24'
              className='dark:hidden block'
            />
          </button>
          <Link
            href='/contact#appointment-form'
            className='hidden xl:block px-6 py-2 bg-gradient-to-r from-[#00C3D9] via-[#0091E6] to-[#0067E0] text-white rounded-[10px] outline-none hover:shadow-lg hover:shadow-primary/30 hover:scale-105 border border-transparent hover:border-primary/20 duration-300 text-sm font-semibold tracking-wide transition-all'>
            Rendez-vous
          </Link>

          {user ? (
            <div className='relative group hidden xl:block'>
              <button className='flex items-center gap-2 px-5 py-2 bg-neutral-100 dark:bg-white/10 text-darkblue dark:text-white rounded-xl font-bold text-sm transition-all group-hover:bg-primary group-hover:text-white'>
                <Icon icon="solar:user-circle-bold" width="22" />
                Compte
                <Icon icon="solar:alt-arrow-down-bold" width="14" className="transition-transform group-hover:rotate-180" />
              </button>

              <div className='absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50'>
                <div className='w-56 bg-white dark:bg-darklight rounded-2xl shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden flex flex-col p-2 gap-1'>
                  {user.role === 'admin' && (
                    <Link
                      href='/admin'
                      className='flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 rounded-xl transition-all'
                    >
                      <Icon icon="solar:widget-bold" width="20" />
                      Tableau de bord
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className='flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-left w-full'
                  >
                    <Icon icon="solar:logout-3-bold" width="20" />
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href='/auth/login'
              className='hidden xl:flex items-center gap-2 px-6 py-2 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-darkblue dark:text-white rounded-xl font-semibold text-sm hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300'
            >
              <Icon icon="solar:user-bold" width="18" />
              Connexion
            </Link>
          )}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className='block xl:hidden p-2 rounded-lg hover:cursor-pointer'
            aria-label='Toggle mobile menu'>
            <span className='block w-6 h-0.5 bg-darkblue dark:bg-white'></span>
            <span className='block w-6 h-0.5 bg-darkblue dark:bg-white mt-1.5'></span>
            <span className='block w-6 h-0.5 bg-darkblue dark:bg-white mt-1.5'></span>
          </button>
        </div>
      </div>
      {navbarOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
      )}
      <div
        ref={mobileMenuRef}
        className={`xl:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-darklight shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50`}>
        <div className='flex items-center justify-between p-4'>
          <Logo />
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label='Close mobile menu'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='dark:text-white dark:hover:text-primary hover:text-primary hover:cursor-pointer'>
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <nav className='flex flex-col items-start p-4'>
          {navlink.map((item, index) => (
            <MobileHeaderLink key={index} item={item} onItemClick={() => setNavbarOpen(false)} />
          ))}
          <div className='mt-4 flex flex-col gap-4 w-full'>

            {user?.role === 'admin' && (
              <Link
                href='/admin'
                className='flex items-center justify-center gap-2 px-6 py-4 bg-primary/10 text-primary border border-primary/20 rounded-xl font-semibold text-sm text-center w-full'
                onClick={() => setNavbarOpen(false)}
              >
                <Icon icon="solar:widget-bold" width="20" />
                Tableau de bord
              </Link>
            )}

            <Link
              href='/contact#appointment-form'
              className='flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-semibold text-sm text-center w-full shadow-lg shadow-primary/20 transition-all active:scale-95'
              onClick={() => {
                setNavbarOpen(false)
              }}>
              <Icon icon="solar:calendar-date-bold" width="20" />
              Rendez-vous
            </Link>

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setNavbarOpen(false);
                }}
                className='flex items-center justify-center gap-2 px-6 py-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 rounded-xl font-semibold text-sm text-center w-full'
              >
                <Icon icon="solar:logout-3-bold" width="20" />
                Déconnexion
              </button>
            ) : (
              <Link
                href='/auth/login'
                className='flex items-center justify-center gap-2 px-6 py-4 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-darkblue dark:text-white rounded-xl font-semibold text-sm text-center w-full'
                onClick={() => setNavbarOpen(false)}
              >
                <Icon icon="solar:user-bold" width="20" />
                Connexion
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
