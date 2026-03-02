'use client';

import { useAuth } from '@/context/AuthContext';
import { Icon } from '@iconify/react';

export default function AdminOverview() {
    const { user } = useAuth();

    const stats = [
        { label: 'Formations', value: '12', icon: 'solar:book-bookmark-bold', color: 'text-blue-500' },
        { label: 'Projets', value: '8', icon: 'solar:folder-favourite-bold', color: 'text-purple-500' },
        { label: 'Avis Clients', value: '45', icon: 'solar:star-bold', color: 'text-yellow-500' },
        { label: 'Membres', value: '1,240', icon: 'solar:users-group-rounded-bold', color: 'text-green-500' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-darklight p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-black/20 transition-colors">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Bonjour, {user?.name || 'Administrateur'} 👋</h1>
                    <p className="text-slate-500 dark:text-lightgrey mt-2 text-base sm:text-lg font-medium">Voici un aperçu de l'activité de votre plateforme.</p>
                </div>
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Dernière connexion</span>
                    <span className="text-slate-800 dark:text-white font-semibold">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all group cursor-pointer shadow-lg hover:shadow-primary/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl bg-neutral-100 dark:bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                <Icon icon={stat.icon} width="28" />
                            </div>
                            <span className="text-green-600 dark:text-green-500 text-xs font-bold bg-green-500/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
                                <Icon icon="solar:arrow-up-bold" width="12" /> +12%
                            </span>
                        </div>
                        <h3 className="text-slate-500 dark:text-lightgrey font-semibold text-sm mb-1 uppercase tracking-wider">{stat.label}</h3>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-darklight p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Activités Récentes</h2>
                        <button className="text-primary text-sm font-bold hover:underline">Voir tout</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4 items-center p-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Icon icon="solar:user-plus-bold" width="24" />
                                </div>
                                <div>
                                    <p className="text-slate-900 dark:text-white font-bold text-sm sm:text-base">Nouvelle inscription</p>
                                    <p className="text-slate-500 dark:text-lightgrey text-xs sm:text-sm">sami.b@gmail.com vient de rejoindre la plateforme.</p>
                                </div>
                                <span className="ml-auto text-[10px] sm:text-xs text-slate-400 dark:text-lightgrey/50 font-bold uppercase">2h</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-darklight p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden group transition-colors">
                    <div className="relative z-10 flex flex-col h-full bg-gradient-to-br from-primary/10 to-transparent rounded-2xl p-6 border border-primary/20">
                        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">Mettre à jour vos<br />formations</h2>
                        <p className="text-slate-600 dark:text-lightgrey mt-4 mb-8 max-w-xs font-medium">Gérez vos programmes et bootcamps pour offrir le meilleur contenu à vos élèves.</p>
                        <button className="mt-auto px-8 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all self-start">
                            Gérer les programmes
                        </button>
                    </div>
                    <Icon
                        icon="solar:book-bookmark-bold"
                        className="absolute -right-8 -bottom-8 text-primary/5 dark:text-primary/10 transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12"
                        width="240"
                    />
                </div>
            </div>
        </div>
    );
}
