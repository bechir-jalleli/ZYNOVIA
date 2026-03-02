'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from './components/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-darkmode">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-darkmode transition-colors duration-300">
            <AdminSidebar />
            <div className="xl:pl-64 flex-1">
                <main className="p-4 sm:p-8 pt-32 min-h-screen">
                    <div className="max-w-7xl mx-auto mt-14">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
