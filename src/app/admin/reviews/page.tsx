'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { ReviewType } from '@/app/types/review';
import { uploadImageClient, ClientUploadError } from '@/lib/uploadImageClient';

interface Review extends ReviewType {
    _id: string;
}

export default function AdminReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        imgSrc: '',
        imgSrcPublicId: '',
        rating: 5,
        desc: ''
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await fetch('/api/reviews', { cache: 'no-store' });
            const data = await res.json();
            setReviews(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            imgSrc: '',
            imgSrcPublicId: '',
            rating: 5,
            desc: ''
        });
        setUploadError(null);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadError(null);
        setUploading(true);

        try {
            const result = await uploadImageClient(file, 'reviews');
            setFormData({ ...formData, imgSrc: result.url, imgSrcPublicId: result.publicId });
        } catch (err) {
            const message = err instanceof ClientUploadError ? err.message : 'Upload failed';
            setUploadError(message);
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/reviews/${editingId}` : '/api/reviews';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                resetForm();
                fetchReviews();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteReview = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return;
        try {
            const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
            if (res.ok) fetchReviews();
        } catch (err) {
            console.error(err);
        }
    };

    const startEdit = (r: Review) => {
        setEditingId(r._id);
        setFormData({
            name: r.name,
            imgSrc: r.imgSrc,
            imgSrcPublicId: r.imgSrcPublicId || '',
            rating: r.rating,
            desc: r.desc
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Gestion des Avis Clients</h1>
                    <p className="text-slate-500 dark:text-lightgrey text-sm font-medium">Fidélisez vos futurs clients avec des avis réels.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingId(null);
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                >
                    <Icon icon="solar:star-ring-bold" width="20" />
                    Nouveau Avis Clients
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((r) => (
                        <div key={r._id} className="bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-lg group transition-all hover:shadow-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                                        {r.imgSrc ? (
                                            <img src={r.imgSrc} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <Icon icon="solar:user-bold" className="text-slate-400" width="24" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{r.name}</h3>
                                        <div className="flex text-amber-500">
                                            {[...Array(5)].map((_, i) => {
                                                const starValue = i + 1;
                                                return (
                                                    <Icon
                                                        key={i}
                                                        icon={r.rating >= starValue ? "solar:star-bold" : (r.rating >= starValue - 0.5 ? "solar:star-half-bold" : "solar:star-linear")}
                                                        width="16"
                                                    />
                                                );
                                            })}
                                            <span className="ml-1 text-xs font-bold">{r.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => startEdit(r)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                        <Icon icon="solar:pen-bold" width="18" />
                                    </button>
                                    <button onClick={() => deleteReview(r._id)} className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
                                        <Icon icon="solar:trash-bin-trash-bold" width="18" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-sm italic line-clamp-4 leading-relaxed">
                                "{r.desc}"
                            </p>
                        </div>
                    ))}
                    {reviews.length === 0 && (
                        <div className="col-span-full bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl p-12 text-center text-slate-500">
                            Aucun témoignage trouvé.
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
                                    <Icon icon={editingId ? "solar:pen-new-square-bold" : "solar:add-circle-bold"} width="24" />
                                </span>
                                {editingId ? 'Modifier le Témoignage' : 'Nouveau Témoignage'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                                <Icon icon="solar:close-circle-bold" width="24" className="text-slate-400" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 flex items-center justify-center shadow-inner">
                                        {formData.imgSrc ? (
                                            <img src={formData.imgSrc} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <Icon icon="solar:user-bold" className="text-slate-300" width="48" />
                                        )}
                                    </div>
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-[2px]">
                                        <Icon icon="solar:camera-bold" width="24" />
                                        <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleFileUpload} />
                                    </label>
                                </div>
                                {uploadError && (
                                    <p className="text-xs font-semibold text-red-500">{uploadError}</p>
                                )}
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Nom Complet</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-5 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white font-bold"
                                            placeholder="ex: Jean Dupont"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
                                            Note: <span className="text-primary">{formData.rating}</span> étoiles
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="range"
                                                min="0"
                                                max="5"
                                                step="0.5"
                                                className="flex-1 h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                                                value={formData.rating}
                                                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                            />
                                            <div className="flex text-amber-500 min-w-[100px] justify-end">
                                                {[...Array(5)].map((_, i) => (
                                                    <Icon
                                                        key={i}
                                                        icon={formData.rating >= i + 1 ? "solar:star-bold" : (formData.rating >= i + 0.5 ? "solar:star-half-bold" : "solar:star-linear")}
                                                        width="20"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Commentaire</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white font-medium resize-none"
                                    placeholder="Partagez l'expérience du client..."
                                    value={formData.desc}
                                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[1.5] px-6 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    {editingId ? 'Mettre à jour' : 'Publier le Témoignage'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
