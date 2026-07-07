'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'

type MenuItem = {
  href: string
  label: string
  icon: string
  color: string
}

const menuItems: MenuItem[] = [
  { href: '/inscription', label: 'Inscription', icon: 'tabler:user-plus', color: '#6C5CE7' },
  { href: 'https://wa.me/21625857621', label: 'WhatsApp', icon: 'tabler:brand-whatsapp', color: '#25D366' },
  { href: 'https://www.facebook.com/profile.php?id=61590195886623', label: 'Facebook', icon: 'tabler:brand-facebook-filled', color: '#1877F2' },
  { href: 'https://www.instagram.com/zynovia_academy/', label: 'Instagram', icon: 'tabler:brand-instagram', color: '#E1306C' },
]

const BUTTON_SIZE = 64
const MARGIN = 16

export default function FloatingSocialMenu() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [open, setOpen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const dragInfo = useRef({ startX: 0, startY: 0, originX: 0, originY: 0, moved: false })

  useEffect(() => {
    const x = window.innerWidth - BUTTON_SIZE - MARGIN
    const y = window.innerHeight - BUTTON_SIZE - MARGIN - 100
    setPosition({ x, y })
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return prev
        const maxX = window.innerWidth - BUTTON_SIZE - MARGIN
        const maxY = window.innerHeight - BUTTON_SIZE - MARGIN
        return { x: Math.min(prev.x, maxX), y: Math.min(prev.y, maxY) }
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleOutside = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    window.addEventListener('pointerdown', handleOutside)
    return () => window.removeEventListener('pointerdown', handleOutside)
  }, [open])

  const clamp = (x: number, y: number) => {
    const maxX = window.innerWidth - BUTTON_SIZE - MARGIN
    const maxY = window.innerHeight - BUTTON_SIZE - MARGIN
    return { x: Math.min(Math.max(x, MARGIN), maxX), y: Math.min(Math.max(y, MARGIN), maxY) }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!position) return
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    dragInfo.current = { startX: e.clientX, startY: e.clientY, originX: position.x, originY: position.y, moved: false }
    setDragging(true)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !position) return
    const dx = e.clientX - dragInfo.current.startX
    const dy = e.clientY - dragInfo.current.startY
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragInfo.current.moved = true
    }
    setPosition(clamp(dragInfo.current.originX + dx, dragInfo.current.originY + dy))
  }

  const handlePointerUp = () => {
    setDragging(false)
    if (!dragInfo.current.moved) {
      setOpen((prev) => !prev)
    }
  }

  if (!position) return null

  return (
    <div ref={containerRef} className='fixed z-[1000] select-none' style={{ left: position.x, top: position.y }}>
      <div className={`absolute bottom-full right-0 mb-4 flex flex-col items-end gap-3 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {menuItems.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={() => setOpen(false)}
            className='group/item flex items-center gap-3'
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.6)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.35s',
              transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)',
              transitionDelay: open ? `${index * 60}ms` : `${(menuItems.length - index) * 40}ms`,
            }}
          >
            <span className='translate-x-2 whitespace-nowrap rounded-full bg-darkblue px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100 dark:bg-white dark:text-darkblue'>
              {item.label}
            </span>
            <span className='flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95' style={{ backgroundColor: item.color }}>
              <Icon icon={item.icon} width={24} height={24} />
            </span>
          </Link>
        ))}
      </div>

      <button
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setDragging(false)}
        aria-label='Menu rapide Zynovia'
        className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-2xl ring-4 ring-primary/20 transition-transform duration-200 dark:bg-darkblue ${dragging ? 'scale-105 cursor-grabbing' : 'cursor-grab hover:scale-105'}`}
        style={{ touchAction: 'none' }}
      >
        {!open && !dragging && <span className='animate-zynovia-pulse absolute inset-0 rounded-full bg-primary/30' />}
        <span className='relative flex h-full w-full items-center justify-center overflow-hidden rounded-full transition-transform duration-500' style={{ transform: open ? 'rotate(360deg)' : 'rotate(0deg)' }}>
          <Image src='/images/logo/ZYNOVIAPNGG-removebg-preview.png' alt='Zynovia' width={40} height={40} className='object-contain' draggable={false} />
        </span>
      </button>

      <style jsx>{`
        @keyframes zynovia-pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          70%, 100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-zynovia-pulse { animation: zynovia-pulse 2s ease-out infinite; }
      `}</style>
    </div>
  )
}