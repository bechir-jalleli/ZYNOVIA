'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

interface RendezVousSubmission {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentType: 'visio' | 'onsite' | '';
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

function formatAppointmentType(type: string) {
    if (type === 'visio') return 'Visioconférence';
    if (type === 'onsite') return 'Sur site';
    return '—';
}

export default function AdminRendezVousSubmissions() {
    const [submissions, setSubmissions] = useState<RendezVousSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchSubmissions = async () => {
        try {
            const res = await fetch('/api/submissions?type=rendez-vous', { cache: 'no-store' });
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
        if (!confirm('Supprimer cette demande de rendez-vous ?')) return;
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
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Demandes de rendez-vous</h1>
                    <p className="text-slate-500 dark:text-lightgrey text-sm font-medium">
                        Toutes les réservations envoyées via le formulaire rendez-vous.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl font-bold text-sm">
                    <Icon icon="solar:calendar-bold" width="18" />
                    {submissions.length} demande{submissions.length !== 1 ? 's' : ''}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                </div>
            ) : submissions.length === 0 ? (
                <div className="bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-12 text-center text-slate-500">
                    Aucune demande de rendez-vous pour le moment.
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
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                            <Icon icon="solar:calendar-mark-bold" width="24" />
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
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {s.appointmentDate && (
                                                    <span className="text-xs font-bold px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center gap-1">
                                                        <Icon icon="solar:calendar-bold" width="12" />
                                                        {s.appointmentDate}
                                                    </span>
                                                )}
                                                {s.appointmentTime && (
                                                    <span className="text-xs font-bold px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full flex items-center gap-1">
                                                        <Icon icon="solar:clock-circle-bold" width="12" />
                                                        {s.appointmentTime}
                                                    </span>
                                                )}
                                                <span className="text-xs font-bold px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full flex items-center gap-1">
                                                    <Icon icon={s.appointmentType === 'visio' ? 'solar:videocamera-record-bold' : 'solar:map-point-bold'} width="12" />
                                                    {formatAppointmentType(s.appointmentType)}
                                                </span>
                                                <span className="text-xs text-slate-400 dark:text-lightgrey/70 self-center">
                                                    Reçu le {formatDate(s.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => setExpandedId(expandedId === s._id ? null : s._id)}
                                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            title="Voir les détails"
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
                                        <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">Message / Notes</p>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                                            {s.message || 'Aucun message supplémentaire.'}
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
