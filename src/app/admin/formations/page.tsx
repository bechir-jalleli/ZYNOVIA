'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { uploadImageClient, ClientUploadError } from '@/lib/uploadImageClient';

interface Formation {
    _id: string;
    title: string;
    type: string;
    level: string;
    duration: string;
    description: string;
    image: string;
    imagePublicId?: string;
    features: string[];
    badge?: string;
    startDate?: string;
}

export default function ManageFormations() {
    const [formations, setFormations] = useState<Formation[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const defaultFormData = {
        title: '',
        type: 'formation',
        level: '',
        duration: '',
        description: '',
        image: '/images/formations/default.jpg',
        imagePublicId: '',
        features: [''],
        badge: '',
        startDate: ''
    };

    // Form State
    const [formData, setFormData] = useState(defaultFormData);

    const fetchFormations = async () => {
        try {
            const res = await fetch('/api/formations', { cache: 'no-store' });
            const data = await res.json();
            setFormations(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFormations();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const filteredFeatures = formData.features.filter(f => f.trim() !== '');
        const dataToSave = { ...formData, features: filteredFeatures };

        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/formations/${editingId}` : '/api/formations';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSave)
            });
            if (res.ok) {
                setIsModalOpen(false);
                setEditingId(null);
                setFormData(defaultFormData);
                fetchFormations();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
            try {
                await fetch(`/api/formations/${id}`, { method: 'DELETE' });
                fetchFormations();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const startEdit = (f: Formation | any) => {
        setEditingId(f._id);
        setFormData({
            ...f,
            features: f.features?.length > 0 ? f.features : [''],
            description: f.description || '',
            image: f.image || '/images/formations/default.jpg',
            imagePublicId: f.imagePublicId || '',
            startDate: f.startDate || ''
        });
        setIsModalOpen(true);
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [''] });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadError(null);
        setUploading(true);

        try {
            const entity = formData.type === 'bootcamp' ? 'bootcamps' : 'formations';
            const result = await uploadImageClient(file, entity);
            setFormData({ ...formData, image: result.url, imagePublicId: result.publicId });
        } catch (err) {
            const message = err instanceof ClientUploadError ? err.message : 'Upload failed';
            setUploadError(message);
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Gestion des Formations</h1>
                    <p className="text-slate-500 dark:text-lightgrey text-sm font-medium">Créez et modifiez les programmes de l'académie.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData(defaultFormData);
                        setIsModalOpen(true);
                    }}
                    className="mt-4 sm:mt-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <Icon icon="solar:add-circle-bold" width="20" />
                    Nouvelle Formation
                </button>
            </div>

            <div className="bg-white dark:bg-darklight rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-lightgrey text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Titre</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Niveau</th>
                                <th className="px-6 py-4">Détails</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {loading ? (
                                <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-400">Chargement...</td></tr>
                            ) : formations.map((f) => (
                                <tr key={f._id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                                                <img src={f.image || '/images/formations/default.jpg'} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="text-slate-900 dark:text-white font-semibold">{f.title}</div>
                                                <div className="text-[10px] text-primary font-bold uppercase">{f.badge}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${f.type === 'bootcamp' ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'}`}>
                                            {f.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-lightgrey text-sm font-medium">{f.level}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs text-slate-500 dark:text-lightgrey truncate max-w-[200px]">{f.description}</div>
                                        <div className="text-[10px] text-slate-400 mt-1">{f.features?.length || 0} caractéristiques</div>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => startEdit(f)} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                                            <Icon icon="solar:pen-bold" width="18" />
                                        </button>
                                        <button onClick={() => handleDelete(f._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                                            <Icon icon="solar:trash-bin-trash-bold" width="18" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-darklight w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300 transition-colors max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{editingId ? 'Modifier la Formation' : 'Nouvelle Formation'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><Icon icon="solar:close-circle-bold" width="24" /></button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div className="col-span-2">
                                        <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Titre du programme</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                            placeholder="ex: Programme IA — Formation Annuelle"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Type</label>
                                            <select
                                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            >
                                                <option value="formation">Formation</option>
                                                <option value="bootcamp">Bootcamp</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Badge / Label</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                                placeholder="ex: Populaire"
                                                value={formData.badge}
                                                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Durée</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                                placeholder="ex: 1 semaine / Année"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Date de début</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                                placeholder="ex: 22/12/2025"
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Cible / Niveau</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                                placeholder="ex: Collège & Lycée"
                                                value={formData.level}
                                                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Image de la formation</label>
                                        <div className="mt-1 flex flex-col gap-3">
                                            <div className="relative group/upload">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl text-slate-500 dark:text-lightgrey flex items-center justify-center gap-2 group-hover/upload:border-primary group-hover/upload:text-primary transition-all">
                                                    <Icon icon="solar:upload-minimalistic-bold" width="20" />
                                                    <span className="text-sm font-semibold">{uploading ? 'Téléversement...' : 'Choisir une image'}</span>
                                                </div>
                                            </div>
                                            {uploadError && (
                                                <p className="text-xs font-semibold text-red-500">{uploadError}</p>
                                            )}
                                            {uploading && (
                                                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden relative">
                                                    <div className="bg-gradient-to-r from-primary to-blue-600 rounded-full animate-progress-loading"></div>
                                                </div>
                                            )}
                                            <input
                                                type="text"
                                                readOnly
                                                className="w-full px-4 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-400 dark:text-slate-500 font-mono text-[10px]"
                                                value={formData.image}
                                            />
                                        </div>
                                        <div className="mt-3 w-full h-40 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800">
                                            <img src={formData.image} alt="Prévisualisation" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content & Features */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Description courte</label>
                                        <textarea
                                            rows={5}
                                            className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                            placeholder="Détails du programme..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-xs font-bold uppercase text-primary font-mono italic">Points clés (Features)</label>
                                            <button type="button" onClick={addFeature} className="flex items-center gap-1 text-[10px] font-bold uppercase px-3 py-1.5 bg-primary text-white rounded-lg hover:scale-105 transition-transform">
                                                <Icon icon="solar:add-circle-bold" width="14" /> Ajouter
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {formData.features.map((feature, index) => (
                                                <div key={index} className="flex gap-2 group/feature">
                                                    <div className="flex-1 relative">
                                                        <Icon icon="solar:check-circle-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" width="16" />
                                                        <input
                                                            type="text"
                                                            className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-sm dark:text-white outline-none focus:border-primary transition-colors"
                                                            placeholder="ex: 1h par semaine"
                                                            value={feature}
                                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                        />
                                                    </div>
                                                    <button type="button" onClick={() => removeFeature(index)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                                                        <Icon icon="solar:trash-bin-trash-bold" width="20" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 sticky bottom-0 bg-white dark:bg-darklight py-4 border-t border-slate-200 dark:border-white/10">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all">Annuler</button>
                                <button type="submit" className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                                    {editingId ? 'Mettre à jour la formation' : 'Créer la formation'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
