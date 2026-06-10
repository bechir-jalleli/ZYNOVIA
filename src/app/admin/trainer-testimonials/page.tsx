'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

interface TrainerTestimonial {
    _id: string;
    quote: string;
    student: string;
    focus: string;
}

const defaultFormData = {
    quote: '',
    student: '',
    focus: '',
};

export default function ManageTrainerTestimonials() {
    const [testimonials, setTestimonials] = useState<TrainerTestimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState(defaultFormData);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('/api/trainer-testimonials', { cache: 'no-store' });
            const data = await res.json();
            if (Array.isArray(data)) {
                setTestimonials(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const resetForm = () => {
        setFormData(defaultFormData);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/trainer-testimonials/${editingId}` : '/api/trainer-testimonials';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                resetForm();
                fetchTestimonials();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;
        try {
            const res = await fetch(`/api/trainer-testimonials/${id}`, { method: 'DELETE' });
            if (res.ok) fetchTestimonials();
        } catch (err) {
            console.error(err);
        }
    };

    const startEdit = (item: TrainerTestimonial) => {
        setEditingId(item._id);
        setFormData({
            quote: item.quote,
            student: item.student,
            focus: item.focus,
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Témoignages Apprenants</h1>
                    <p className="text-slate-500 dark:text-lightgrey text-sm font-medium">
                        Gérez les retours d&apos;expérience affichés sur la page Nos Formateurs.
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingId(null);
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <Icon icon="solar:add-circle-bold" width="20" />
                    Nouveau Témoignage
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-lg group transition-all hover:shadow-2xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2 text-primary">
                                    <Icon icon="solar:quote-up-bold" width="20" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Feedback</span>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => startEdit(item)}
                                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <Icon icon="solar:pen-bold" width="18" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                                    >
                                        <Icon icon="solar:trash-bin-trash-bold" width="18" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm italic leading-relaxed line-clamp-4">
                                &ldquo;{item.quote}&rdquo;
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                <p className="font-bold text-slate-900 dark:text-white text-sm">{item.student}</p>
                                <p className="text-xs font-semibold text-primary mt-1">{item.focus}</p>
                            </div>
                        </div>
                    ))}
                    {testimonials.length === 0 && (
                        <div className="col-span-full bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-12 text-center text-slate-500">
                            Aucun témoignage enregistré.
                        </div>
                    )}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-darklight w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Icon icon={editingId ? 'solar:pen-new-square-bold' : 'solar:add-circle-bold'} width="24" />
                                </span>
                                {editingId ? 'Modifier le Témoignage' : 'Nouveau Témoignage'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                            >
                                <Icon icon="solar:close-circle-bold" width="24" className="text-slate-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                                    Témoignage
                                </label>
                                <textarea
                                    rows={4}
                                    required
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                    placeholder="Les ateliers IA m'ont permis de..."
                                    value={formData.quote}
                                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                                    Apprenant
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white font-bold"
                                    placeholder="ex: Amine, Lycéen – Parcours IA"
                                    value={formData.student}
                                    onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                                    Thème / Focus
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white font-bold"
                                    placeholder="ex: Prototype IA"
                                    value={formData.focus}
                                    onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    {editingId ? 'Mettre à jour' : 'Ajouter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
