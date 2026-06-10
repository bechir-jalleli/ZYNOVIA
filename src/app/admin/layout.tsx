'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from './components/Sidebar';
import { Icon } from '@iconify/react';
import Logo from '@/app/components/Layout/Header/Logo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-darkmode">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
    );

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-darkmode transition-colors duration-300">
            {/* Mobile top bar */}
            <header className="xl:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-white dark:bg-darklight border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-4 shadow-sm">
                <div className="scale-90 origin-left">
                    <Logo variant="header" />
                </div>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-xl text-slate-500 hover:text-primary hover:bg-slate-100 dark:text-lightgrey dark:hover:bg-white/10 transition-colors"
                    aria-label="Ouvrir le menu"
                >
                    <Icon icon="solar:hamburger-menu-bold" width="24" />
                </button>
            </header>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="xl:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="xl:pl-64 flex-1">
                <main className="p-4 sm:p-8 pt-24 xl:pt-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}