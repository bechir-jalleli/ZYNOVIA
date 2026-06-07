'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

const menuItems = [
    { label: 'Vue d\'ensemble', href: '/admin', icon: 'solar:widget-bold' },
    { label: 'Formations', href: '/admin/formations', icon: 'solar:book-bookmark-bold' },
    { label: 'Projets', href: '/admin/projects', icon: 'solar:folder-favourite-bold' },
    { label: 'Avis Clients', href: '/admin/reviews', icon: 'solar:star-bold' },
    { label: 'Utilisateurs', href: '/admin/users', icon: 'solar:users-group-rounded-bold' },
    { label: 'Paramètres', href: '/admin/settings', icon: 'solar:settings-bold' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white dark:bg-darklight border-r border-slate-200 dark:border-white/5 min-h-screen fixed left-0 top-0 pt-20 hidden xl:flex flex-col transition-colors duration-300">
            <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-600 dark:text-lightgrey hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary dark:hover:text-white'
                                }`}
                        >
                            <Icon icon={item.icon} width="22" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-slate-200 dark:border-white/5 space-y-4">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-lightgrey hover:text-primary dark:hover:text-white transition-all w-full font-semibold"
                >
                    <Icon icon="solar:home-2-bold" width="22" />
                    <span className="font-medium">Retour au site</span>
                </Link>

                <div className="flex justify-center gap-4 px-4">
                    <Link href="https://facebook.com" target="_blank" className="text-slate-400 hover:text-primary transition-colors">
                        <Icon icon="tabler:brand-facebook" width="20" />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank" className="text-slate-400 hover:text-primary transition-colors">
                        <Icon icon="tabler:brand-linkedin" width="20" />
                    </Link>
                    <Link href="https://instagram.com" target="_blank" className="text-slate-400 hover:text-primary transition-colors">
                        <Icon icon="tabler:brand-instagram" width="20" />
                    </Link>
                </div>

                <div className="px-4 text-[10px] text-slate-400 dark:text-lightgrey/40 text-center leading-relaxed font-medium">
                    © 2025 ZYNOVIA ACADEMY.<br />All rights reserved.
                </div>
            </div>
        </aside>
    );
}
