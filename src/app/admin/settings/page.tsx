'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@iconify/react';
import { useSearchParams } from 'next/navigation';

function AdminSettingsContent() {
    const { user, login } = useAuth();
    const searchParams = useSearchParams();

    // Profile Form State
    const [profileData, setProfileData] = useState({
        name: '',
        email: ''
    });
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Password Form State
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Google Drive Integration State
    const [googleConnected, setGoogleConnected] = useState<boolean | null>(null);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleMessage, setGoogleMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Load user data into profile form
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || ''
            });
        }
    }, [user]);

    const checkGoogleStatus = async () => {
        try {
            const res = await fetch('/api/auth/google/status');
            if (res.ok) {
                const data = await res.json();
                setGoogleConnected(data.isConnected);
            } else {
                setGoogleConnected(false);
            }
        } catch (err) {
            console.error('Failed to fetch Google Drive status:', err);
            setGoogleConnected(false);
        }
    };

    // Handle Google Auth URL params (success / error redirect from callback)
    useEffect(() => {
        const authStatus = searchParams.get('google_auth');
        const errMsg = searchParams.get('message');
        if (authStatus === 'success') {
            setGoogleMessage({ type: 'success', text: 'Compte Google Drive associé avec succès !' });
        } else if (authStatus === 'error') {
            setGoogleMessage({ type: 'error', text: errMsg || "Échec de l'association avec Google Drive." });
        }
        checkGoogleStatus();
    }, [searchParams]);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileMessage(null);

        try {
            const res = await fetch('/api/auth/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: profileData.name,
                    email: profileData.email
                })
            });

            const data = await res.json();
            if (res.ok) {
                setProfileMessage({ type: 'success', text: 'Profil mis à jour avec succès.' });
                // Update local auth context
                if (data.user) {
                    login(data.user);
                }
            } else {
                setProfileMessage({ type: 'error', text: data.message || 'Une erreur est survenue.' });
            }
        } catch (err) {
            console.error(err);
            setProfileMessage({ type: 'error', text: 'Erreur de connexion au serveur.' });
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMessage(null);

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
            return;
        }

        setPasswordLoading(true);

        try {
            const res = await fetch('/api/auth/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            const data = await res.json();
            if (res.ok) {
                setPasswordMessage({ type: 'success', text: 'Mot de passe modifié avec succès.' });
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                setPasswordMessage({ type: 'error', text: data.message || 'Une erreur est survenue.' });
            }
        } catch (err) {
            console.error(err);
            setPasswordMessage({ type: 'error', text: 'Erreur de connexion au serveur.' });
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleGoogleDisconnect = async () => {
        setGoogleLoading(true);
        setGoogleMessage(null);
        try {
            const res = await fetch('/api/auth/google/disconnect', { method: 'POST' });
            const data = await res.json();
            if (res.ok) {
                setGoogleConnected(false);
                setGoogleMessage({ type: 'success', text: 'Intégration Google Drive déconnectée avec succès.' });
            } else {
                setGoogleMessage({ type: 'error', text: data.message || 'Une erreur est survenue.' });
            }
        } catch (err) {
            console.error(err);
            setGoogleMessage({ type: 'error', text: 'Erreur lors de la déconnexion.' });
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Header */}
            <div className="bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Paramètres du Compte</h1>
                <p className="text-slate-500 dark:text-lightgrey text-sm font-medium">Gerez vos informations personnelles et sécurisez votre compte.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Settings */}
                <div className="bg-white dark:bg-darklight p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl space-y-6 transition-colors">
                    <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                            <Icon icon="solar:user-rounded-bold" width="22" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Informations de Profil</h2>
                            <p className="text-xs text-slate-500 dark:text-lightgrey">Mettez à jour vos identifiants administrateur.</p>
                        </div>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        {profileMessage && (
                            <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${profileMessage.type === 'success'
                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                }`}>
                                <Icon icon={profileMessage.type === 'success' ? "solar:check-circle-bold" : "solar:danger-bold"} width="18" />
                                <span>{profileMessage.text}</span>
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Nom complet</label>
                            <input
                                type="text"
                                required
                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Adresse Email</label>
                            <input
                                type="email"
                                required
                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-colors"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={profileLoading}
                            className="w-full py-3 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                            {profileLoading ? (
                                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Icon icon="solar:diskette-bold" width="18" />
                                    Sauvegarder le profil
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Password Settings */}
                <div className="bg-white dark:bg-darklight p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl space-y-6 transition-colors">
                    <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                        <div className="p-2.5 bg-red-500/10 text-red-500 rounded-xl">
                            <Icon icon="solar:lock-keyhole-bold" width="22" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sécurité du Compte</h2>
                            <p className="text-xs text-slate-500 dark:text-lightgrey">Modifier votre mot de passe d'accès.</p>
                        </div>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        {passwordMessage && (
                            <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${passwordMessage.type === 'success'
                                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                }`}>
                                <Icon icon={passwordMessage.type === 'success' ? "solar:check-circle-bold" : "solar:danger-bold"} width="18" />
                                <span>{passwordMessage.text}</span>
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Mot de passe actuel</label>
                            <input
                                type="password"
                                required
                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-colors"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Nouveau mot de passe</label>
                            <input
                                type="password"
                                required
                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-colors"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase text-slate-500 dark:text-lightgrey ml-1 font-mono">Confirmer le nouveau mot de passe</label>
                            <input
                                type="password"
                                required
                                className="w-full mt-1 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-colors"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={passwordLoading}
                            className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                            {passwordLoading ? (
                                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Icon icon="solar:shield-keyhole-bold" width="18" />
                                    Mettre à jour le mot de passe
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Google Drive Integration Section */}
            <div className="bg-white dark:bg-darklight p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl space-y-6 transition-colors">
                <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
                    <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
                        <Icon icon="solar:cloud-storage-bold" width="22" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Intégration Google Drive</h2>
                        <p className="text-xs text-slate-500 dark:text-lightgrey">Configurez l'accès Google Drive pour le stockage des PDF des formations.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {googleMessage && (
                        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                            googleMessage.type === 'success'
                                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                        }`}>
                            <Icon icon={googleMessage.type === 'success' ? "solar:check-circle-bold" : "solar:danger-bold"} width="18" />
                            <span>{googleMessage.text}</span>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 gap-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                                googleConnected === true 
                                    ? 'bg-emerald-500/10 text-emerald-500' 
                                    : googleConnected === false 
                                    ? 'bg-slate-300/10 text-slate-400 dark:text-slate-500'
                                    : 'bg-amber-500/10 text-amber-500'
                            }`}>
                                <Icon 
                                    icon={googleConnected === true ? "solar:shield-check-bold" : "solar:shield-warning-bold"} 
                                    width="24" 
                                    className={googleConnected === null ? "animate-pulse" : ""}
                                />
                            </div>
                            <div>
                                <span className="block text-xs font-semibold text-slate-400 dark:text-lightgrey uppercase tracking-wider font-mono">Statut de connexion</span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">
                                    {googleConnected === true ? 'Connecté (Prêt à l\'utilisation)' : googleConnected === false ? 'Non connecté' : 'Vérification du statut...'}
                                </span>
                            </div>
                        </div>

                        {googleConnected === true ? (
                            <button
                                onClick={handleGoogleDisconnect}
                                disabled={googleLoading}
                                className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold rounded-xl text-xs transition-colors flex items-center gap-2"
                            >
                                {googleLoading ? (
                                    <div className="h-4 w-4 border-2 border-t-transparent border-red-500 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Icon icon="solar:link-broken-bold" width="16" />
                                        Déconnecter Google Drive
                                    </>
                                )}
                            </button>
                        ) : googleConnected === false ? (
                            <a
                                href="/api/auth/google/initiate"
                                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                            >
                                <Icon icon="solar:link-bold" width="16" />
                                Associer Google Drive
                            </a>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminSettings() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Chargement...</div>}>
            <AdminSettingsContent />
        </Suspense>
    );
}
