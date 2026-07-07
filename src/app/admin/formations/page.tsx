'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { uploadImageClient, ClientUploadError } from '@/lib/uploadImageClient';

/* ─── Types ───────────────────────────────────────────────────── */
interface Formation {
    _id: string;
    title: string;
    type: string;
    mode?: string;
    startDate?: string;
    schedule?: string;
    duration?: string;
    ageRange?: string;
    location?: string;
    price?: number;
    originalPrice?: number;
    programme: string[];
    image?: string;
    imagePublicId?: string;
    programmePdfPath?: string;
    enrollmentLink?: string;
}

const LABEL = 'block text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono mb-1';
const INPUT = 'w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors text-sm';
const SECTION = 'rounded-2xl border border-slate-100 dark:border-white/5 p-5 space-y-4 bg-slate-50/40 dark:bg-white/[0.02]';
const SECTION_TITLE = 'text-[10px] font-black uppercase tracking-widest text-primary font-mono flex items-center gap-2 mb-3';

/* ─── PDF Upload helpers ───────────────────────────────────────── */
async function uploadPdfClient(file: File, onProgress?: (pct: number) => void): Promise<string> {
    const CHUNK_SIZE = 3 * 1024 * 1024; // 3 MB chunks
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE) || 1;
    const uploadId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    let responsePath = '';

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunkBlob = file.slice(start, end);

        const fd = new FormData();
        fd.append('file', chunkBlob, file.name);
        fd.append('uploadId', uploadId);
        fd.append('chunkIndex', String(chunkIndex));
        fd.append('totalChunks', String(totalChunks));
        fd.append('fileName', file.name);
        fd.append('fileSize', String(file.size));

        const res = await fetch('/api/upload-pdf', {
            method: 'POST',
            body: fd,
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || `Failed to upload chunk ${chunkIndex + 1}/${totalChunks}`);
        }

        if (onProgress) {
            const pct = Math.round(((chunkIndex + 1) / totalChunks) * 100);
            onProgress(pct);
        }

        if (data.path) {
            responsePath = data.path;
        }
    }

    if (!responsePath) {
        throw new Error('Upload completed but server did not return a file path');
    }

    return responsePath;
}

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ─── Component ───────────────────────────────────────────────── */
export default function ManageFormations() {
    const [formations, setFormations] = useState<Formation[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    /* Image upload state */
    const [imgUploading, setImgUploading] = useState(false);
    const [imgError, setImgError] = useState<string | null>(null);

    /* PDF upload state */
    const [pdfUploading, setPdfUploading] = useState(false);
    const [pdfUploadProgress, setPdfUploadProgress] = useState<number | null>(null);
    const [pdfError, setPdfError] = useState<string | null>(null);
    const [pdfFileName, setPdfFileName] = useState<string | null>(null);
    const [pdfFileSize, setPdfFileSize] = useState<number | null>(null);

    const pdfInputRef = useRef<HTMLInputElement>(null);

    const blank = {
        title: '',
        type: 'bootcamp',
        mode: 'PRÉSENTIEL',
        startDate: '',
        schedule: '',
        duration: '',
        ageRange: '12 à 18 ans',
        location: '',
        price: '',
        originalPrice: '',
        programme: [''],
        image: '',
        imagePublicId: '',
        programmePdfPath: '',
        enrollmentLink: '',
    };

    const [form, setForm] = useState<typeof blank>(blank);

    /* ── Data fetching ── */
    const fetchFormations = async () => {
        try {
            const res = await fetch('/api/formations', { cache: 'no-store' });
            setFormations(await res.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchFormations(); }, []);

    /* ── Open modal ── */
    const openNew = () => {
        setEditingId(null);
        setForm(blank);
        setPdfFileName(null);
        setPdfFileSize(null);
        setImgError(null);
        setPdfError(null);
        setIsModalOpen(true);
    };

    const openEdit = (f: Formation) => {
        setEditingId(f._id);
        setForm({
            title: f.title,
            type: f.type,
            mode: f.mode || 'PRÉSENTIEL',
            startDate: f.startDate || '',
            schedule: f.schedule || '',
            duration: f.duration || '',
            ageRange: f.ageRange || '12 à 18 ans',
            location: f.location || '',
            price: f.price != null ? String(f.price) : '',
            originalPrice: f.originalPrice != null ? String(f.originalPrice) : '',
            programme: f.programme?.length ? f.programme : [''],
            image: f.image || '',
            imagePublicId: f.imagePublicId || '',
            programmePdfPath: f.programmePdfPath || '',
            enrollmentLink: f.enrollmentLink || '',
        });
        setPdfFileName(f.programmePdfPath ? f.programmePdfPath.split('/').pop() || null : null);
        setPdfFileSize(null);
        setImgError(null);
        setPdfError(null);
        setIsModalOpen(true);
    };

    /* ── Save ── */
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const payload = {
            ...form,
            price: form.price ? Number(form.price) : undefined,
            originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
            programme: form.programme.filter(p => p.trim()),
        };
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `/api/formations/${editingId}` : '/api/formations';
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setIsModalOpen(false);
                fetchFormations();
            }
        } catch (e) { console.error(e); }
        finally { setSaving(false); }
    };

    /* ── Delete ── */
    const handleDelete = async (id: string) => {
        if (!confirm('Supprimer cette formation ? Le PDF et l\'image seront aussi supprimés.')) return;
        await fetch(`/api/formations/${id}`, { method: 'DELETE' });
        fetchFormations();
    };

    /* ── Image upload ── */
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImgError(null);
        setImgUploading(true);
        try {
            const entity = form.type === 'bootcamp' ? 'bootcamps' : 'formations';
            const result = await uploadImageClient(file, entity);
            setForm(f => ({ ...f, image: result.url, imagePublicId: result.publicId }));
        } catch (err) {
            setImgError(err instanceof ClientUploadError ? err.message : 'Upload échoué');
        } finally {
            setImgUploading(false);
            e.target.value = '';
        }
    };

    /* ── PDF upload ── */
    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPdfError(null);
        setPdfUploading(true);
        setPdfUploadProgress(0);
        setPdfFileName(null);
        setPdfFileSize(null);
        try {
            const path = await uploadPdfClient(file, (pct) => {
                setPdfUploadProgress(pct);
            });
            setForm(f => ({ ...f, programmePdfPath: path }));
            setPdfFileName(file.name);
            setPdfFileSize(file.size);
        } catch (err) {
            setPdfError(err instanceof Error ? err.message : 'Upload PDF échoué');
        } finally {
            setPdfUploading(false);
            setPdfUploadProgress(null);
            e.target.value = '';
        }
    };

    /* ── Programme bullets ── */
    const progChange = (i: number, v: string) => {
        const p = [...form.programme]; p[i] = v;
        setForm(f => ({ ...f, programme: p }));
    };
    const progAdd = () => setForm(f => ({ ...f, programme: [...f.programme, ''] }));
    const progRemove = (i: number) => {
        const p = form.programme.filter((_, idx) => idx !== i);
        setForm(f => ({ ...f, programme: p.length ? p : [''] }));
    };

    /* ── Render ── */
    return (
        <div className="space-y-6">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Gestion des Formations</h1>
                    <p className="text-slate-500 dark:text-lightgrey text-sm font-medium mt-1">Créez et gérez les programmes de l&apos;académie.</p>
                </div>
                <button onClick={openNew}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                    <Icon icon="solar:add-circle-bold" width="20" />
                    Nouvelle Formation
                </button>
            </div>

            {/* ── Table ── */}
            <div className="bg-white dark:bg-darklight rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-xl transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-lightgrey text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Formation</th>
                                <th className="px-6 py-4">Mode</th>
                                <th className="px-6 py-4">Démarrage</th>
                                <th className="px-6 py-4">Prix</th>
                                <th className="px-6 py-4">Lieu</th>
                                <th className="px-6 py-4">PDF</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {loading ? (
                                <tr><td colSpan={7} className="px-6 py-20 text-center">
                                    <div className="flex justify-center">
                                        <Icon icon="svg-spinners:ring-resize" className="text-primary" width="28" />
                                    </div>
                                </td></tr>
                            ) : formations.length === 0 ? (
                                <tr><td colSpan={7} className="px-6 py-20 text-center text-slate-400 text-sm">
                                    Aucune formation. Créez-en une.
                                </td></tr>
                            ) : formations.map(f => (
                                <tr key={f._id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {f.image ? (
                                                <img src={f.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-slate-100" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                                    <Icon icon="solar:book-bookmark-bold" className="text-slate-300" width="18" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-semibold text-slate-900 dark:text-white text-sm">{f.title}</div>
                                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${f.type === 'bootcamp' ? 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'}`}>
                                                    {f.type}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {f.mode && (
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${f.mode === 'EN LIGNE' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400'}`}>
                                                {f.mode}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-lightgrey">{f.startDate || '—'}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900 dark:text-white text-sm">{f.price ? `${f.price} DT` : '—'}</div>
                                        {f.originalPrice && <div className="text-[11px] text-slate-400 line-through">{f.originalPrice} DT</div>}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-lightgrey">{f.location || '—'}</td>
                                    <td className="px-6 py-4">
                                        {f.programmePdfPath ? (
                                            <a href={f.programmePdfPath} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-primary hover:underline text-xs font-semibold">
                                                <Icon icon="solar:file-download-bold" width="16" />
                                                PDF
                                            </a>
                                        ) : (
                                            <span className="text-slate-300 dark:text-slate-600 text-xs">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-1">
                                        <button onClick={() => openEdit(f)} title="Modifier"
                                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all">
                                            <Icon icon="solar:pen-bold" width="18" />
                                        </button>
                                        <button onClick={() => handleDelete(f._id)} title="Supprimer"
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                                            <Icon icon="solar:trash-bin-trash-bold" width="18" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ══════════════ MODAL ══════════════ */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-darklight w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">

                        {/* Modal Header */}
                        <div className="flex justify-between items-start p-6 sm:p-8 pb-0 sticky top-0 bg-white dark:bg-darklight z-10 border-b border-slate-100 dark:border-white/5 mb-6">
                            <div>
                                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                                    {editingId ? 'Modifier la formation' : 'Nouvelle formation'}
                                </h2>
                                <p className="text-xs text-slate-400 mt-1">Tous les champs marqués * sont requis</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all">
                                <Icon icon="solar:close-circle-bold" width="22" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="px-6 sm:px-8 pb-8 space-y-6">

                            {/* ── 1. Identité ── */}
                            <div className={SECTION}>
                                <p className={SECTION_TITLE}><Icon icon="solar:document-bold" width="13" />Identité</p>
                                <div>
                                    <label className={LABEL}>Titre *</label>
                                    <input required className={INPUT} placeholder="ex: Bootcamp IA & Machine Learning"
                                        value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={LABEL}>Type *</label>
                                        <select required className={INPUT} value={form.type}
                                            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                                            <option value="bootcamp">Bootcamp</option>
                                            <option value="formation">Formation</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={LABEL}>Mode</label>
                                        <select className={INPUT} value={form.mode}
                                            onChange={e => setForm(f => ({ ...f, mode: e.target.value }))}>
                                            <option value="PRÉSENTIEL">PRÉSENTIEL</option>
                                            <option value="EN LIGNE">EN LIGNE</option>
                                            <option value="HYBRIDE">HYBRIDE</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* ── 2. Planning & Logistique ── */}
                            <div className={SECTION}>
                                <p className={SECTION_TITLE}><Icon icon="solar:calendar-bold" width="13" />Planning & Logistique</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={LABEL}>Démarrage</label>
                                        <input className={INPUT} placeholder="ex: 27 juillet"
                                            value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label className={LABEL}>Jours / Horaires</label>
                                        <input className={INPUT} placeholder="ex: Du lundi au vendredi"
                                            value={form.schedule} onChange={e => setForm(f => ({ ...f, schedule: e.target.value }))} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={LABEL}>Durée</label>
                                        <input className={INPUT} placeholder="ex: 20 heures (5 jours)"
                                            value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label className={LABEL}>Tranche d&apos;âge</label>
                                        <input className={INPUT} placeholder="ex: 12 à 18 ans"
                                            value={form.ageRange} onChange={e => setForm(f => ({ ...f, ageRange: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label className={LABEL}>Lieu / Localisation</label>
                                    <input className={INPUT} placeholder="ex: Lac 1 - Tunis  |  100% en ligne"
                                        value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                                </div>
                            </div>

                            {/* ── 3. Tarification ── */}
                            <div className={SECTION}>
                                <p className={SECTION_TITLE}><Icon icon="solar:tag-price-bold" width="13" />Tarification</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={LABEL}>Prix actuel (DT)</label>
                                        <input type="number" min="0" step="0.5" className={INPUT} placeholder="ex: 349"
                                            value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label className={LABEL}>Prix barré — avant promo (DT)</label>
                                        <input type="number" min="0" step="0.5" className={INPUT} placeholder="ex: 599 (optionnel)"
                                            value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} />
                                    </div>
                                </div>
                                {(form.price || form.originalPrice) && (
                                    <div className="flex items-baseline gap-3 px-4 py-3 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10">
                                        <span className="text-xs text-slate-400">Aperçu :</span>
                                        {form.originalPrice && <span className="text-slate-400 line-through text-sm">au lieu de {form.originalPrice} DT</span>}
                                        {form.price && <span className="text-2xl font-extrabold text-primary">{form.price} DT</span>}
                                    </div>
                                )}
                            </div>

                            {/* ── 4. Image ── */}
                            <div className={SECTION}>
                                <p className={SECTION_TITLE}><Icon icon="solar:gallery-bold" width="13" />Image de couverture</p>
                                <label className="relative flex flex-col items-center justify-center gap-2 w-full py-6 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/[0.02] transition-all group">
                                    <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                                    <Icon icon={imgUploading ? 'svg-spinners:ring-resize' : 'solar:upload-minimalistic-bold'}
                                        className={imgUploading ? 'text-primary' : 'text-slate-400 group-hover:text-primary'} width="24" />
                                    <span className="text-sm font-semibold text-slate-500 group-hover:text-primary">
                                        {imgUploading ? 'Téléversement…' : 'Choisir une image'}
                                    </span>
                                </label>
                                {imgError && <p className="text-xs text-red-500 font-semibold">{imgError}</p>}
                                {form.image && (
                                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                                        <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                        <span className="absolute bottom-2 left-3 text-white text-[10px] font-mono opacity-80 truncate max-w-[90%]">{form.image.split('/').pop()}</span>
                                    </div>
                                )}
                            </div>

                            {/* ── 5. Au programme ── */}
                            <div className="rounded-2xl border border-blue-100 dark:border-blue-500/10 p-5 bg-blue-50/40 dark:bg-blue-500/[0.03]">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 font-mono flex items-center gap-2">
                                            <Icon icon="solar:list-check-bold" width="13" />
                                            Au programme
                                        </p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">Curriculum détaillé affiché sur la page de la formation</p>
                                    </div>
                                    <button type="button" onClick={progAdd}
                                        className="flex items-center gap-1 text-[10px] font-bold uppercase px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:scale-105 transition-transform">
                                        <Icon icon="solar:add-circle-bold" width="13" /> Ajouter
                                    </button>
                                </div>
                                <div className="space-y-2.5">
                                    {form.programme.map((item, i) => (
                                        <div key={i} className="flex gap-2">
                                            <div className="flex-1 relative">
                                                <Icon icon="solar:arrow-right-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" width="13" />
                                                <input type="text"
                                                    className="w-full pl-8 pr-3 py-2.5 bg-white dark:bg-white/10 border border-blue-200 dark:border-blue-500/20 rounded-xl text-sm dark:text-white outline-none focus:border-blue-500 transition-colors"
                                                    placeholder="ex: Créer son premier modèle d'IA"
                                                    value={item}
                                                    onChange={e => progChange(i, e.target.value)} />
                                            </div>
                                            <button type="button" onClick={() => progRemove(i)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                                                <Icon icon="solar:trash-bin-trash-bold" width="17" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── 6. PDF Programme ── */}
                            <div className={SECTION}>
                                <p className={SECTION_TITLE}><Icon icon="solar:file-download-bold" width="13" />Programme PDF</p>

                                <label className={`relative flex flex-col items-center justify-center gap-2 w-full py-5 border-2 border-dashed rounded-xl cursor-pointer transition-all group
                                    ${form.programmePdfPath
                                        ? 'border-emerald-300 dark:border-emerald-500/30 hover:border-emerald-400'
                                        : 'border-slate-200 dark:border-white/10 hover:border-primary hover:bg-primary/[0.02]'}`}>
                                    <input ref={pdfInputRef} type="file" accept="application/pdf" className="sr-only" onChange={handlePdfUpload} />
                                    <Icon
                                        icon={pdfUploading ? 'svg-spinners:ring-resize' : form.programmePdfPath ? 'solar:file-check-bold' : 'solar:upload-minimalistic-bold'}
                                        className={pdfUploading ? 'text-primary' : form.programmePdfPath ? 'text-emerald-500' : 'text-slate-400 group-hover:text-primary'}
                                        width="26" />
                                    <span className={`text-sm font-semibold ${form.programmePdfPath ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 group-hover:text-primary'}`}>
                                        {pdfUploading
                                            ? pdfUploadProgress !== null
                                                ? `Téléversement du PDF (${pdfUploadProgress}%)…`
                                                : 'Téléversement du PDF…'
                                            : form.programmePdfPath
                                            ? 'PDF chargé — cliquer pour remplacer'
                                            : 'Choisir un fichier PDF'}
                                    </span>
                                </label>

                                {pdfError && <p className="text-xs text-red-500 font-semibold">{pdfError}</p>}

                                {/* PDF preview card */}
                                {form.programmePdfPath && !pdfUploading && (
                                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-white/5 rounded-xl border border-emerald-200 dark:border-emerald-500/20">
                                        <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                            <Icon icon="vscode-icons:file-type-pdf2" width="22" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                                                {pdfFileName || form.programmePdfPath.split('/').pop()}
                                            </p>
                                            {pdfFileSize && (
                                                <p className="text-[10px] text-slate-400">{formatBytes(pdfFileSize)}</p>
                                            )}
                                            <a href={form.programmePdfPath} target="_blank" rel="noopener noreferrer"
                                                className="text-[10px] text-primary hover:underline font-mono">
                                                {form.programmePdfPath}
                                            </a>
                                        </div>
                                        <button type="button"
                                            onClick={() => { setForm(f => ({ ...f, programmePdfPath: '' })); setPdfFileName(null); setPdfFileSize(null); }}
                                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all flex-shrink-0"
                                            title="Supprimer le PDF">
                                            <Icon icon="solar:close-circle-bold" width="16" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* ── Submit ── */}
                            <div className="flex gap-4 pt-2 sticky bottom-0 bg-white dark:bg-darklight py-5 border-t border-slate-200 dark:border-white/10 -mx-6 sm:-mx-8 px-6 sm:px-8">
                                <button type="button" onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                                    Annuler
                                </button>
                                <button type="submit" disabled={saving || imgUploading || pdfUploading}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100">
                                    {saving && <Icon icon="svg-spinners:ring-resize" width="18" />}
                                    {editingId ? 'Mettre à jour' : 'Créer la formation'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
