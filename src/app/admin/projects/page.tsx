'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

interface Project {
    _id: string;
    name: string;
    description: string;
    coverImg: string;
    creator: {
        firstName: string;
        lastName: string;
        picture: string;
        school: string;
    };
}

export default function ManageProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        coverImg: '',
        creator: {
            firstName: '',
            lastName: '',
            picture: '',
            school: ''
        }
    });

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects', { cache: 'no-store' });
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/projects/${editingId}` : '/api/projects';

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
                fetchProjects();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            coverImg: '',
            creator: {
                firstName: '',
                lastName: '',
                picture: '',
                school: ''
            }
        });
    };

    const handleDelete = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            try {
                await fetch(`/api/projects/${id}`, { method: 'DELETE' });
                fetchProjects();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const startEdit = (p: Project) => {
        setEditingId(p._id);
        setFormData({
            name: p.name,
            description: p.description || '',
            coverImg: p.coverImg,
            creator: {
                firstName: p.creator?.firstName || '',
                lastName: p.creator?.lastName || '',
                picture: p.creator?.picture || '',
                school: p.creator?.school || ''
            }
        });
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'coverImg' | 'creator.picture') => {
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
                if (targetField === 'coverImg') {
                    setFormData({ ...formData, coverImg: data.filePath });
                } else {
                    setFormData({
                        ...formData,
                        creator: { ...formData.creator, picture: data.filePath }
                    });
                }
            }
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Projets des Élèves</h1>
                    <p className="text-slate-500 dark:text-lightgrey text-sm font-medium">Gérez les réalisations innovantes de nos élèves.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingId(null);
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
                >
                    <Icon icon="solar:add-circle-bold" width="20" />
                    Nouveau Projet
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center text-slate-400">Chargement...</div>
                ) : projects.map((p) => (
                    <div key={p._id} className="bg-white dark:bg-darklight rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl group transition-all">
                        <div className="relative h-48 overflow-hidden">
                            <img src={p.coverImg || '/images/projects/default.jpg'} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => startEdit(p)} className="p-2 bg-white/90 dark:bg-darklight/90 backdrop-blur-md rounded-lg text-primary hover:bg-primary hover:text-white transition-all">
                                    <Icon icon="solar:pen-bold" width="18" />
                                </button>
                                <button onClick={() => handleDelete(p._id)} className="p-2 bg-white/90 dark:bg-darklight/90 backdrop-blur-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <Icon icon="solar:trash-bin-trash-bold" width="18" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{p.name}</h3>
                                <p className="text-xs text-slate-500 dark:text-lightgrey mt-1 line-clamp-2">{p.description}</p>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-100 flex items-center justify-center">
                                    {p.creator?.picture ? (
                                        <img src={p.creator.picture} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <Icon icon="solar:user-bold" className="text-slate-400" width="20" />
                                    )}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">{p.creator?.firstName} {p.creator?.lastName}</div>
                                    <div className="text-[10px] text-primary font-bold uppercase">{p.creator?.school}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-darklight w-full max-w-4xl rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300 transition-colors max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{editingId ? 'Modifier le Projet' : 'Nouveau Projet'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><Icon icon="solar:close-circle-bold" width="24" /></button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Project Info */}
                                <div className="space-y-6">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/10 pb-2">Informations du Projet</h3>

                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Nom du Projet</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                            placeholder="ex: Assistant IA de Recyclage"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Description</label>
                                        <textarea
                                            rows={4}
                                            className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                            placeholder="Détails du projet..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Image de couverture</label>
                                        <div className="mt-1 flex flex-col gap-3">
                                            <div className="relative group/upload h-40 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center">
                                                {formData.coverImg ? (
                                                    <img src={formData.coverImg} className="absolute inset-0 w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-slate-400 flex flex-col items-center gap-2">
                                                        <Icon icon="solar:camera-bold" width="32" />
                                                        <span className="text-xs font-bold">Ajouter une image</span>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, 'coverImg')}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                readOnly
                                                className="w-full px-4 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-400 dark:text-slate-500 font-mono text-[10px]"
                                                value={formData.coverImg}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Creator Info */}
                                <div className="space-y-6">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 border-b border-emerald-500/10 pb-2">Informations de l'Élève</h3>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Prénom</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                                                value={formData.creator.firstName}
                                                onChange={(e) => setFormData({ ...formData, creator: { ...formData.creator, firstName: e.target.value } })}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Nom</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                                                value={formData.creator.lastName}
                                                onChange={(e) => setFormData({ ...formData, creator: { ...formData.creator, lastName: e.target.value } })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">École / Institution</label>
                                        <input
                                            type="text"
                                            className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-colors"
                                            placeholder="ex: Tunis International School"
                                            value={formData.creator.school}
                                            onChange={(e) => setFormData({ ...formData, creator: { ...formData.creator, school: e.target.value } })}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Photo de l'élève</label>
                                        <div className="mt-1 flex items-center gap-6">
                                            <div className="relative group/avatar w-24 h-24 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                                                {formData.creator.picture ? (
                                                    <img src={formData.creator.picture} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Icon icon="solar:user-bold" className="text-slate-400" width="32" />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, 'creator.picture')}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-slate-500 dark:text-lightgrey italic mb-2">Cliquez sur le cercle pour télécharger la photo de l'élève.</p>
                                                <input
                                                    type="text"
                                                    readOnly
                                                    className="w-full px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-400 dark:text-slate-500 font-mono text-[9px]"
                                                    value={formData.creator.picture}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all">Annuler</button>
                                <button type="submit" className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all">
                                    {editingId ? 'Mettre à jour le projet' : 'Publier le projet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
