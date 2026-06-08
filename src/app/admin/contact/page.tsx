'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

interface ContactSubmission {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    message: string;
    createdAt: string;
}

const roleLabels: Record<string, string> = {
    parent: 'Parent',
    school: 'Établissement scolaire',
    company: 'Entreprise',
    institution: 'Institution & associations',
    'Contact General': 'Contact général',
};

function formatRole(role: string) {
    return roleLabels[role] || role || '—';
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

export default function AdminContactSubmissions() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchSubmissions = async () => {
        try {
            const res = await fetch('/api/submissions?type=contact', { cache: 'no-store' });
            const data = await res.json();
            if (Array.isArray(data)) {
                setSubmissions(data);
            }
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Formulaire de contact</h1>
                    <p className="text-slate-500 dark:text-lightgrey text-sm font-medium">
                        Toutes les demandes envoyées via le formulaire de contact.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm">
                    <Icon icon="solar:letter-bold" width="18" />
                    {submissions.length} soumission{submissions.length !== 1 ? 's' : ''}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                </div>
            ) : submissions.length === 0 ? (
                <div className="bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-12 text-center text-slate-500">
                    Aucune soumission pour le moment.
                </div>
            ) : (
                <div className="space-y-4">
                    {submissions.map((s) => (
                        <div
                            key={s._id}
                            className="bg-white dark:bg-darklight rounded-3xl border border-slate-200 dark:border-white/5 shadow-lg overflow-hidden"
                        >
                            <div className="p-5 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 min-w-0">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Icon icon="solar:user-bold" width="24" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{s.name}</h3>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500 dark:text-lightgrey">
                                                <a href={`mailto:${s.email}`} className="hover:text-primary transition-colors flex items-center gap-1">
                                                    <Icon icon="solar:letter-bold" width="14" />
                                                    {s.email}
                                                </a>
                                                {s.phone && (
                                                    <span className="flex items-center gap-1">
                                                        <Icon icon="solar:phone-bold" width="14" />
                                                        {s.phone}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-lightgrey rounded-full">
                                                    {formatRole(s.role)}
                                                </span>
                                                <span className="text-xs text-slate-400 dark:text-lightgrey/70">
                                                    {formatDate(s.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => setExpandedId(expandedId === s._id ? null : s._id)}
                                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            title="Voir le message"
                                        >
                                            <Icon icon={expandedId === s._id ? 'solar:alt-arrow-up-bold' : 'solar:alt-arrow-down-bold'} width="18" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(s._id)}
                                            className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                                            title="Supprimer"
                                        >
                                            <Icon icon="solar:trash-bin-trash-bold" width="18" />
                                        </button>
                                    </div>
                                </div>

                                {expandedId === s._id && (
                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                        <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">Message</p>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                                            {s.message}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
