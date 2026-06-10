'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import Logo from '@/app/components/Layout/Header/Logo';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
    { label: 'Tableau de bord', href: '/admin', icon: 'solar:widget-bold' },
    { label: 'Formations', href: '/admin/formations', icon: 'solar:book-bookmark-bold' },
    { label: 'Projets', href: '/admin/projects', icon: 'solar:folder-bold' },
    { label: 'Avis Clients', href: '/admin/reviews', icon: 'solar:star-bold' },
    { label: 'Formateurs', href: '/admin/trainers', icon: 'solar:users-group-rounded-bold' },
    { label: 'Témoignages Formateurs', href: '/admin/trainer-testimonials', icon: 'solar:chat-round-dots-bold' },
    { label: 'Contact', href: '/admin/contact', icon: 'solar:letter-bold' },
    { label: 'Rendez-vous', href: '/admin/rendez-vous', icon: 'solar:calendar-bold' },
    { label: 'Paramètres', href: '/admin/settings', icon: 'solar:settings-bold' },
];

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function AdminSidebar({ open, onClose }: Props) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <aside
            className={`
                w-64 bg-white dark:bg-darklight border-r border-slate-200 dark:border-white/5
                h-screen fixed left-0 top-0 flex flex-col transition-transform duration-300 z-50
                xl:translate-x-0
                ${open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
                xl:shadow-none
            `}
        >
            {/* Logo */}
            <div className="h-16 xl:h-20 px-6 flex items-center justify-between border-b border-slate-100 dark:border-white/5 shrink-0">
                <div className="scale-90 origin-left">
                    <Logo variant="header" />
                </div>
                <button
                    onClick={onClose}
                    className="xl:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    aria-label="Fermer le menu"
                >
                    <Icon icon="solar:close-circle-bold" width="22" />
                </button>
            </div>

            {/* Scrollable nav — min-h-0 is required so flex-1 can shrink below its content size */}
            <nav className="p-4 space-y-1.5 flex-1 min-h-0 overflow-y-auto mt-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                                isActive
                                    ? 'bg-primary text-white shadow-md shadow-primary/20 font-semibold'
                                    : 'text-slate-600 dark:text-lightgrey hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary dark:hover:text-white font-medium'
                            }`}
                        >
                            {isActive && (
                                <span className="absolute left-0 top-3 bottom-3 w-1.5 bg-white rounded-r-md" />
                            )}
                            <Icon
                                icon={item.icon}
                                width="22"
                                className={`transition-transform duration-200 group-hover:scale-110 ${
                                    isActive
                                        ? 'text-white'
                                        : 'text-slate-400 dark:text-lightgrey group-hover:text-primary dark:group-hover:text-white'
                                }`}
                            />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/5 shrink-0">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-2.5 text-slate-500 dark:text-lightgrey hover:text-primary dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5 rounded-xl transition-all w-full font-medium text-sm group"
                >
                    <Icon icon="solar:home-2-bold" width="18" className="text-slate-400 dark:text-lightgrey group-hover:text-primary dark:group-hover:text-white transition-colors" />
                    <span>Retour au site</span>
                </Link>

                {user && (
                    <div className="p-3 bg-white dark:bg-darkmode border border-slate-100 dark:border-white/5 rounded-2xl flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="h-9 w-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-slate-800 dark:text-white truncate">
                                    {user.name || 'Admin'}
                                </p>
                                <p className="text-[10px] text-slate-400 dark:text-lightgrey truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => logout()}
                            title="Se déconnecter"
                            className="p-1.5 text-slate-400 hover:text-red-500 dark:text-lightgrey dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors shrink-0"
                        >
                            <Icon icon="solar:logout-3-bold" width="18" />
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}