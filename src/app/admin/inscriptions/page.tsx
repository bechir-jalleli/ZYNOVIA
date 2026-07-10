'use client';

import { useEffect, useState, useMemo } from 'react';
import { Icon } from '@iconify/react';

interface InscriptionSubmission {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    message: string;
    createdAt: string;
}

function formatDate(date: string) {
    return new Date(date).toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function parseInscriptionMessage(message: string) {
    const lines = message.split('\n').filter(Boolean);
    const data: Record<string, string> = {};
    lines.forEach((line) => {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
            const key = line.slice(0, colonIdx).trim();
            const value = line.slice(colonIdx + 1).trim();
            data[key] = value;
        }
    });
    return data;
}

// ─── Role helpers ─────────────────────────────────────────────────────────────
type RoleKind = 'parent' | 'etablissement' | 'entreprise' | 'download' | 'other';

function getRoleKind(role: string): RoleKind {
    if (role === 'Téléchargement Programme') return 'download';
    if (role === 'Parent' || role === 'Inscription') return 'parent';
    if (role === 'Établissement scolaire') return 'etablissement';
    if (role === 'Entreprise') return 'entreprise';
    return 'other';
}

const ROLE_CONFIG: Record<RoleKind, { label: string; icon: string; avatarBg: string; avatarText: string; badgeBg: string; badgeText: string }> = {
    parent: {
        label: 'Parent',
        icon: 'solar:user-bold',
        avatarBg: 'bg-emerald-500/10',
        avatarText: 'text-emerald-500',
        badgeBg: 'bg-emerald-500/10',
        badgeText: 'text-emerald-600 dark:text-emerald-400',
    },
    etablissement: {
        label: 'Établissement scolaire',
        icon: 'solar:buildings-bold',
        avatarBg: 'bg-blue-500/10',
        avatarText: 'text-blue-500',
        badgeBg: 'bg-blue-500/10',
        badgeText: 'text-blue-600 dark:text-blue-400',
    },
    entreprise: {
        label: 'Entreprise',
        icon: 'solar:bag-bold',
        avatarBg: 'bg-amber-500/10',
        avatarText: 'text-amber-500',
        badgeBg: 'bg-amber-500/10',
        badgeText: 'text-amber-600 dark:text-amber-400',
    },
    download: {
        label: 'Téléchargement',
        icon: 'solar:file-download-bold',
        avatarBg: 'bg-violet-500/10',
        avatarText: 'text-violet-500',
        badgeBg: 'bg-violet-500/10',
        badgeText: 'text-violet-600 dark:text-violet-400',
    },
    other: {
        label: 'Autre',
        icon: 'solar:diploma-bold',
        avatarBg: 'bg-slate-500/10',
        avatarText: 'text-slate-500',
        badgeBg: 'bg-slate-500/10',
        badgeText: 'text-slate-600 dark:text-slate-400',
    },
};

function BadgeRole({ role }: { role: string }) {
    const kind = getRoleKind(role);
    const cfg = ROLE_CONFIG[kind];
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
            <Icon icon={cfg.icon} width="13" />
            {cfg.label}
        </span>
    );
}

// ─── Tab types ────────────────────────────────────────────────────────────────
type Tab = 'all' | 'parent' | 'etablissement' | 'entreprise' | 'download';

export default function AdminInscriptionsPage() {
    const [submissions, setSubmissions] = useState<InscriptionSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('all');

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/inscriptions', { cache: 'no-store' });
            const data = await res.json();
            if (Array.isArray(data)) setSubmissions(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Supprimer cette soumission ?')) return;
        try {
            const res = await fetch(`/api/submissions/${id}`, { method: 'DELETE' });
            if (res.ok) fetchSubmissions();
        } catch (err) {
            console.error(err);
        }
    };

    // Counts per kind
    const counts = useMemo(() => ({
        all: submissions.length,
        parent: submissions.filter((s) => getRoleKind(s.role) === 'parent').length,
        etablissement: submissions.filter((s) => getRoleKind(s.role) === 'etablissement').length,
        entreprise: submissions.filter((s) => getRoleKind(s.role) === 'entreprise').length,
        download: submissions.filter((s) => getRoleKind(s.role) === 'download').length,
    }), [submissions]);

    const filtered = useMemo(() => {
        let result = submissions;

        if (activeTab !== 'all') {
            result = result.filter((s) => getRoleKind(s.role) === activeTab);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (s) =>
                    s.name?.toLowerCase().includes(q) ||
                    s.email?.toLowerCase().includes(q) ||
                    s.phone?.toLowerCase().includes(q) ||
                    s.message?.toLowerCase().includes(q)
            );
        }

        return result;
    }, [submissions, activeTab, search]);

    const tabs: { key: Tab; label: string; icon: string; color: string }[] = [
        { key: 'all', label: 'Tout', icon: 'solar:list-bold', color: 'primary' },
        { key: 'parent', label: 'Parents', icon: 'solar:user-bold', color: 'emerald' },
        { key: 'etablissement', label: 'Établissements', icon: 'solar:buildings-bold', color: 'blue' },
        { key: 'entreprise', label: 'Entreprises', icon: 'solar:bag-bold', color: 'amber' },
        { key: 'download', label: 'Téléchargements', icon: 'solar:file-download-bold', color: 'violet' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="relative overflow-hidden bg-white dark:bg-darklight p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors">
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
                <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-violet-500/5 blur-2xl pointer-events-none" />
                <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
                            <Icon icon="solar:diploma-bold" width="14" />
                            Inscriptions &amp; Téléchargements
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Inscriptions
                        </h1>
                        <p className="text-slate-500 dark:text-lightgrey text-sm font-medium mt-1 max-w-xl">
                            Toutes les demandes d'inscription et les téléchargements de programme.
                        </p>
                    </div>
                    {/* Stat chips */}
                    <div className="flex flex-wrap gap-3">
                        <div className="flex flex-col items-center px-4 py-2.5 bg-emerald-500/10 rounded-2xl text-center">
                            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{counts.parent}</span>
                            <span className="text-[10px] font-bold text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-wide mt-0.5">Parents</span>
                        </div>
                        <div className="flex flex-col items-center px-4 py-2.5 bg-blue-500/10 rounded-2xl text-center">
                            <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{counts.etablissement}</span>
                            <span className="text-[10px] font-bold text-blue-600/70 dark:text-blue-400/70 uppercase tracking-wide mt-0.5">Établissements</span>
                        </div>
                        <div className="flex flex-col items-center px-4 py-2.5 bg-amber-500/10 rounded-2xl text-center">
                            <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400">{counts.entreprise}</span>
                            <span className="text-[10px] font-bold text-amber-600/70 dark:text-amber-400/70 uppercase tracking-wide mt-0.5">Entreprises</span>
                        </div>
                        <div className="flex flex-col items-center px-4 py-2.5 bg-violet-500/10 rounded-2xl text-center">
                            <span className="text-xl font-extrabold text-violet-600 dark:text-violet-400">{counts.download}</span>
                            <span className="text-[10px] font-bold text-violet-600/70 dark:text-violet-400/70 uppercase tracking-wide mt-0.5">Téléchargements</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs + Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Tabs — scrollable on small screens */}
                <div className="flex gap-1.5 p-1.5 bg-white dark:bg-darklight rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                                activeTab === tab.key
                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                    : 'text-slate-500 dark:text-lightgrey hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
                            }`}
                        >
                            <Icon icon={tab.icon} width="15" />
                            {tab.label}
                            <span
                                className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                                    activeTab === tab.key
                                        ? 'bg-white/20 text-white'
                                        : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-lightgrey'
                                }`}
                            >
                                {counts[tab.key]}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative flex-1 sm:max-w-xs">
                    <Icon
                        icon="solar:magnifer-bold"
                        width="18"
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-lightgrey pointer-events-none"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher un nom, email..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-darklight border border-slate-200 dark:border-white/5 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-lightgrey focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white dark:bg-darklight border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <Icon icon="solar:inbox-bold" width="32" className="text-slate-400 dark:text-lightgrey" />
                    </div>
                    <p className="text-slate-500 dark:text-lightgrey font-semibold text-base">Aucune soumission trouvée</p>
                    <p className="text-slate-400 dark:text-lightgrey/60 text-sm mt-1">
                        {search ? 'Essayez une autre recherche.' : 'Les inscriptions apparaîtront ici.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((s) => {
                        const kind = getRoleKind(s.role);
                        const cfg = ROLE_CONFIG[kind];
                        const isDownload = kind === 'download';
                        const isExpanded = expandedId === s._id;
                        const parsed = parseInscriptionMessage(s.message);

                        return (
                            <div
                                key={s._id}
                                className="bg-white dark:bg-darklight rounded-3xl border border-slate-200 dark:border-white/5 shadow-lg overflow-hidden hover:border-primary/20 hover:shadow-primary/5 transition-all duration-300"
                            >
                                <div className="p-5 sm:p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                        <div className="flex items-start gap-4 min-w-0">
                                            {/* Avatar */}
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${cfg.avatarBg} ${cfg.avatarText}`}>
                                                <Icon icon={cfg.icon} width="24" />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">
                                                        {s.name}
                                                    </h3>
                                                    <BadgeRole role={s.role} />
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-lightgrey">
                                                    <a
                                                        href={`mailto:${s.email}`}
                                                        className="hover:text-primary transition-colors flex items-center gap-1"
                                                    >
                                                        <Icon icon="solar:letter-bold" width="13" />
                                                        {s.email}
                                                    </a>
                                                    {s.phone && s.phone !== 'Non fourni' && (
                                                        <span className="flex items-center gap-1">
                                                            <Icon icon="solar:phone-bold" width="13" />
                                                            {s.phone}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {/* Parent-specific: child info */}
                                                    {kind === 'parent' && parsed['Enfant'] && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-lightgrey rounded-full">
                                                            <Icon icon="solar:user-heart-bold" width="12" />
                                                            Enfant : {parsed['Enfant']}
                                                        </span>
                                                    )}
                                                    {/* Établissement-specific */}
                                                    {kind === 'etablissement' && parsed['Établissement'] && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
                                                            <Icon icon="solar:buildings-bold" width="12" />
                                                            {parsed['Établissement']}
                                                        </span>
                                                    )}
                                                    {kind === 'etablissement' && parsed['Nb enfants'] && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-lightgrey rounded-full">
                                                            <Icon icon="solar:users-group-rounded-bold" width="12" />
                                                            {parsed['Nb enfants']} enfants
                                                        </span>
                                                    )}
                                                    {/* Entreprise-specific */}
                                                    {kind === 'entreprise' && parsed['Entreprise'] && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full">
                                                            <Icon icon="solar:bag-bold" width="12" />
                                                            {parsed['Entreprise']}
                                                        </span>
                                                    )}
                                                    {kind === 'entreprise' && parsed['Nb participants'] && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-lightgrey rounded-full">
                                                            <Icon icon="solar:users-group-rounded-bold" width="12" />
                                                            {parsed['Nb participants']} participants
                                                        </span>
                                                    )}
                                                    {/* Formation (all inscription types) */}
                                                    {!isDownload && parsed['Formation souhaitée'] && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
                                                            <Icon icon="solar:book-bookmark-bold" width="12" />
                                                            {parsed['Formation souhaitée']}
                                                        </span>
                                                    )}
                                                    {/* Payment */}
                                                    {!isDownload && parsed['Mode de paiement'] && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full">
                                                            <Icon icon="solar:wallet-bold" width="12" />
                                                            {parsed['Mode de paiement']}
                                                        </span>
                                                    )}
                                                    {/* Download */}
                                                    {isDownload && (
                                                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full">
                                                            <Icon icon="solar:document-text-bold" width="12" />
                                                            Programme téléchargé
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-slate-400 dark:text-lightgrey/70 flex items-center gap-1">
                                                        <Icon icon="solar:clock-bold" width="12" />
                                                        {formatDate(s.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 shrink-0">
                                            <button
                                                onClick={() => setExpandedId(isExpanded ? null : s._id)}
                                                className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors"
                                                title="Voir les détails"
                                            >
                                                <Icon
                                                    icon={isExpanded ? 'solar:alt-arrow-up-bold' : 'solar:alt-arrow-down-bold'}
                                                    width="18"
                                                />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(s._id)}
                                                className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                                                title="Supprimer"
                                            >
                                                <Icon icon="solar:trash-bin-trash-bold" width="18" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded details */}
                                    {isExpanded && (
                                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 space-y-4">
                                            {!isDownload && Object.keys(parsed).length > 0 && (
                                                <div>
                                                    <p className="text-xs font-extrabold text-slate-400 dark:text-lightgrey/60 uppercase tracking-widest mb-3">
                                                        Détails de l'inscription
                                                    </p>
                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                        {Object.entries(parsed).map(([key, value]) => (
                                                            <div
                                                                key={key}
                                                                className="bg-slate-50 dark:bg-white/5 rounded-xl px-4 py-3"
                                                            >
                                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-lightgrey/60 mb-0.5">
                                                                    {key}
                                                                </p>
                                                                <p className="text-sm font-semibold text-slate-700 dark:text-white">
                                                                    {value || '—'}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <p className="text-xs font-extrabold text-slate-400 dark:text-lightgrey/60 uppercase tracking-widest mb-2">
                                                    Message complet
                                                </p>
                                                <p className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed bg-slate-50 dark:bg-white/5 rounded-xl px-4 py-3">
                                                    {s.message}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
