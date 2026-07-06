'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@iconify/react';

type TimestampedItem = { createdAt?: string };

type StatConfig = {
    label: string;
    icon: string;
    color: string;
    iconBg: string;
    href: string;
    endpoint: string;
    section: 'content' | 'inbound';
};

type DashboardStat = StatConfig & {
    value: string;
    growth: number;
    loading: boolean;
};

function countInMonth(items: TimestampedItem[], year: number, month: number): number {
    return items.filter((item) => {
        if (!item.createdAt) return false;
        const d = new Date(item.createdAt);
        return d.getFullYear() === year && d.getMonth() === month;
    }).length;
}

function calculateGrowth(items: TimestampedItem[]): number {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const current = countInMonth(items, currentYear, currentMonth);
    const previous = countInMonth(items, prevYear, prevMonth);

    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
}

const STAT_CONFIG: StatConfig[] = [
    {
        label: 'Formations',
        icon: 'solar:book-bookmark-bold',
        color: 'text-blue-500',
        iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
        href: '/admin/formations',
        endpoint: '/api/formations',
        section: 'content',
    },
    {
        label: 'Projets',
        icon: 'solar:folder-favourite-bold',
        color: 'text-purple-500',
        iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',
        href: '/admin/projects',
        endpoint: '/api/projects',
        section: 'content',
    },
    {
        label: 'Avis Clients',
        icon: 'solar:star-bold',
        color: 'text-amber-500',
        iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
        href: '/admin/reviews',
        endpoint: '/api/reviews',
        section: 'content',
    },
    {
        label: 'Contact',
        icon: 'solar:letter-bold',
        color: 'text-primary',
        iconBg: 'bg-primary/10 dark:bg-primary/15',
        href: '/admin/contact',
        endpoint: '/api/submissions?type=contact',
        section: 'inbound',
    },
    {
        label: 'Rendez-vous',
        icon: 'solar:calendar-bold',
        color: 'text-emerald-500',
        iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        href: '/admin/rendez-vous',
        endpoint: '/api/submissions?type=rendez-vous',
        section: 'inbound',
    },
    {
        label: 'Inscriptions',
        icon: 'solar:diploma-bold',
        color: 'text-teal-500',
        iconBg: 'bg-teal-500/10 dark:bg-teal-500/15',
        href: '/admin/inscriptions',
        endpoint: '/api/inscriptions',
        section: 'inbound',
    },
];

const QUICK_ACTIONS = [
    {
        title: 'Gérer les programmes',
        description: 'Formations, bootcamps et contenus pédagogiques.',
        href: '/admin/formations',
        icon: 'solar:book-bookmark-bold',
        gradient: 'from-blue-500/20 via-primary/10 to-transParent',
        border: 'border-blue-500/20',
    },
    {
        title: 'Voir les demandes',
        description: 'Messages contact et rendez-vous à traiter.',
        href: '/admin/contact',
        icon: 'solar:inbox-bold',
        gradient: 'from-primary/20 via-emerald-500/10 to-transParent',
        border: 'border-primary/20',
    },
];

function GrowthBadge({ growth }: { growth: number }) {
    const isPositive = growth > 0;
    const isNegative = growth < 0;
    const label = `${isPositive ? '+' : ''}${growth}%`;

    return (
        <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 ${isNegative
                    ? 'text-red-600 dark:text-red-400 bg-red-500/10'
                    : isPositive
                        ? 'text-green-600 dark:text-green-400 bg-green-500/10'
                        : 'text-slate-500 dark:text-lightgrey bg-slate-500/10'
                }`}
        >
            <Icon
                icon={isNegative ? 'solar:arrow-down-bold' : isPositive ? 'solar:arrow-up-bold' : 'solar:minus-circle-bold'}
                width="12"
            />
            {label}
        </span>
    );
}

function StatCard({ stat }: { stat: DashboardStat }) {
    return (
        <Link
            href={stat.href}
            className="group relative bg-white dark:bg-darklight p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-primary/10 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/[0.03] group-hover:to-transParent transition-colors pointer-events-none" />
            <div className="relative">
                <div className="flex justify-between items-start mb-5">
                    <div className={`p-3 rounded-2xl ${stat.iconBg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon icon={stat.icon} width="26" />
                    </div>
                    {!stat.loading && <GrowthBadge growth={stat.growth} />}
                    {stat.loading && (
                        <span className="h-6 w-14 rounded-lg bg-slate-100 dark:bg-white/5 animate-pulse" />
                    )}
                </div>
                <p className="text-slate-500 dark:text-lightgrey font-semibold text-xs mb-1 uppercase tracking-wider">
                    {stat.label}
                </p>
                {stat.loading ? (
                    <div className="h-9 w-16 rounded-lg bg-slate-100 dark:bg-white/5 animate-pulse" />
                ) : (
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                )}
                <p className="mt-3 text-xs font-medium text-slate-400 dark:text-lightgrey/70 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Voir le détail
                    <Icon icon="solar:arrow-right-linear" width="14" className="group-hover:translate-x-0.5 transition-transform" />
                </p>
            </div>
        </Link>
    );
}

function SectionHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon: string }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Icon icon={icon} width="20" />
            </div>
            <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{title}</h2>
                <p className="text-sm text-slate-500 dark:text-lightgrey font-medium">{subtitle}</p>
            </div>
        </div>
    );
}

export default function AdminOverview() {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStat[]>(
        STAT_CONFIG.map((config) => ({ ...config, value: '—', growth: 0, loading: true }))
    );

    useEffect(() => {
        const fetchStats = async () => {
            const results = await Promise.all(
                STAT_CONFIG.map(async (config) => {
                    try {
                        const res = await fetch(config.endpoint, { cache: 'no-store' });
                        if (!res.ok) throw new Error(`Failed to fetch ${config.label}`);
                        const data: TimestampedItem[] = await res.json();
                        const items = Array.isArray(data) ? data : [];
                        return {
                            ...config,
                            value: String(items.length),
                            growth: calculateGrowth(items),
                            loading: false,
                        };
                    } catch (error) {
                        console.error(`Error fetching ${config.label}`, error);
                        return { ...config, value: '0', growth: 0, loading: false };
                    }
                })
            );
            setStats(results);
        };

        fetchStats();
    }, []);

    const contentStats = useMemo(() => stats.filter((s) => s.section === 'content'), [stats]);
    const inboundStats = useMemo(() => stats.filter((s) => s.section === 'inbound'), [stats]);
    const totalCount = useMemo(
        () => stats.reduce((sum, s) => sum + (s.loading ? 0 : Number(s.value) || 0), 0),
        [stats]
    );
    const isLoading = stats.some((s) => s.loading);

    const today = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero header */}
            <header className="relative overflow-hidden bg-white dark:bg-darklight p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-black/20 transition-colors">
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-blue-500/5 blur-2xl pointer-events-none" />
                <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                            <Icon icon="solar:widget-bold" width="14" />
                            Tableau de bord
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Bonjour, {user?.name || 'Administrateur'}
                        </h1>
                        <p className="text-slate-500 dark:text-lightgrey mt-2 text-base sm:text-lg font-medium max-w-xl">
                            Voici un aperçu de l&apos;activité de votre plateforme.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <div className="flex-1 lg:min-w-[160px] px-5 py-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-lightgrey mb-1">
                                Aujourd&apos;hui
                            </p>
                            <p className="text-sm font-semibold text-slate-800 dark:text-white capitalize">{today}</p>
                        </div>

                    </div>
                </div>
            </header>

            {/* Content stats */}
            <section>
                <SectionHeader
                    title="Contenu plateforme"
                    subtitle="Formations, projets et avis publiés"
                    icon="solar:layers-bold"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {contentStats.map((stat) => (
                        <StatCard key={stat.label} stat={stat} />
                    ))}
                </div>
            </section>

            {/* Inbound stats */}
            <section>
                <SectionHeader
                    title="Demandes entrantes"
                    subtitle="Messages de contact et rendez-vous planifiés"
                    icon="solar:inbox-in-bold"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {inboundStats.map((stat) => (
                        <StatCard key={stat.label} stat={stat} />
                    ))}
                </div>
            </section>




        </div>
    );
}
