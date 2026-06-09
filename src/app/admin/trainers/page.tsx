'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

interface Trainer {
    id: string;
    name: string;
    title: string;
    bio: string;
    expertise: string[];
    photo: string;
    linkedin?: string;
}

export default function ManageTrainers() {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        bio: '',
        expertiseStr: '', // comma-separated input string
        photo: '',
        linkedin: ''
    });

    const fetchTrainers = async () => {
        try {
            const res = await fetch('/api/trainers', { cache: 'no-store' });
            const data = await res.json();
            if (Array.isArray(data)) {
                setTrainers(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainers();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/trainers/${editingId}` : '/api/trainers';

        const expertise = formData.expertiseStr
            ? formData.expertiseStr.split(',').map(item => item.trim()).filter(Boolean)
            : [];

        const payload = {
            name: formData.name,
            title: formData.title,
            bio: formData.bio,
            expertise,
            photo: formData.photo,
            linkedin: formData.linkedin
        };

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                resetForm();
                fetchTrainers();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            title: '',
            bio: '',
            expertiseStr: '',
            photo: '',
            linkedin: ''
        });
    };

    const handleDelete = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce formateur ?')) {
            try {
                await fetch(`/api/trainers/${id}`, { method: 'DELETE' });
                fetchTrainers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const startEdit = (t: Trainer) => {
        setEditingId(t._id);
        setFormData({
            name: t.name,
            title: t.title,
            bio: t.bio,
            expertiseStr: t.expertise ? t.expertise.join(', ') : '',
            photo: t.photo || '',
            linkedin: t.linkedin || ''
        });
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData
            });
            const data = await res.json();
            if (data.filePath) {
                setFormData(prev => ({ ...prev, photo: data.filePath }));
            }
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Gestion des Formateurs</h1>
                    <p className="text-slate-505 dark:text-lightgrey text-sm font-medium">Gérez l'équipe d'experts et de mentors qui encadrent les élèves.</p>
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
                    Nouveau Formateur
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center text-slate-400">Chargement des formateurs...</div>
                ) : trainers.length === 0 ? (
                    <div className="col-span-full py-20 text-center text-slate-400 italic">Aucun formateur enregistré.</div>
                ) : trainers.map((t) => (
                    <div key={t._id} className="bg-white dark:bg-darklight rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl group transition-all flex flex-col justify-between">
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-100 flex-shrink-0">
                                        <img src={t.photo || '/images/default-avatar.png'} alt={t.name} className="w-full h-full object-cover" onError={(e)=>{(e.target as HTMLImageElement).src='/images/default-avatar.png'}} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t.name}</h3>
                                        <p className="text-sm font-semibold text-primary">{t.title}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={() => startEdit(t)} className="p-2 bg-slate-50 dark:bg-white/5 hover:bg-primary hover:text-white dark:hover:bg-primary rounded-lg text-slate-500 transition-all">
                                        <Icon icon="solar:pen-bold" width="16" />
                                    </button>
                                    <button onClick={() => handleDelete(t._id)} className="p-2 bg-slate-50 dark:bg-white/5 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 rounded-lg text-red-500 transition-all">
                                        <Icon icon="solar:trash-bin-trash-bold" width="16" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-lightgrey line-clamp-3">{t.bio}</p>
                            <div className="flex flex-wrap gap-1.5 pt-2">
                                {t.expertise?.map((exp, i) => (
                                    <span key={i} className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-lightgrey rounded-full">
                                        {exp}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {t.linkedin && (
                            <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/5 flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 dark:text-lightgrey font-mono truncate">LinkedIn lié</span>
                                <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
                                    <Icon icon="solar:link-round-angle-bold" width="18" />
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-darklight w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300 transition-colors max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{editingId ? 'Modifier le Formateur' : 'Nouveau Formateur'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><Icon icon="solar:close-circle-bold" width="24" /></button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Nom Complet</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                        placeholder="ex: Dr. Ghofran"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Titre / Rôle</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                        placeholder="ex: Formatrice IA & Data"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Expertise (séparées par des virgules)</label>
                                <input
                                    type="text"
                                    className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                    placeholder="ex: Python, Machine Learning, MLOps"
                                    value={formData.expertiseStr}
                                    onChange={(e) => setFormData({ ...formData, expertiseStr: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Biographie (Bio)</label>
                                <textarea
                                    rows={3}
                                    required
                                    className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                    placeholder="Biographie courte..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Lien LinkedIn (Optionnel)</label>
                                <input
                                    type="url"
                                    className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                    placeholder="https://linkedin.com/..."
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Photo du Formateur</label>
                                <div className="mt-1 flex items-center gap-6">
                                    <div className="relative group/photo w-24 h-24 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                                        {formData.photo ? (
                                            <img src={formData.photo} className="w-full h-full object-cover" />
                                        ) : (
                                            <Icon icon="solar:user-bold" className="text-slate-400" width="32" />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 dark:text-lightgrey italic mb-2">Cliquez sur le cercle pour télécharger la photo du formateur.</p>
                                        <input
                                            type="text"
                                            readOnly
                                            className="w-full px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-400 dark:text-slate-500 font-mono text-[9px]"
                                            value={formData.photo}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all">Annuler</button>
                                <button type="submit" className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                                    {editingId ? 'Mettre à jour' : 'Ajouter le formateur'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
