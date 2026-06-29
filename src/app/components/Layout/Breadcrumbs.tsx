'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="container mx-auto px-4 pt-24 sm:pt-28 -mb-12 relative z-30">
      <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-primary dark:hover:text-[#3FA9DF] transition-colors duration-200"
          >
            <Icon icon="tabler:home" className="h-4.5 w-4.5" />
            <span>Accueil</span>
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={idx} className="flex items-center gap-2">
              <Icon icon="tabler:chevron-right" className="h-3.5 w-3.5 text-slate-400" />
              {isLast || !item.href ? (
                <span className="text-darkblue dark:text-white font-semibold" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary dark:hover:text-[#3FA9DF] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
