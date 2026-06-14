'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@iconify/react';

export default function AdminSettings() {
    const { user, login } = useAuth();

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

    // Load user data into profile form
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || ''
            });
        }
    }, [user]);

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

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Header */}
            <div className="bg-white dark:bg-darklight p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl transition-colors">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Paramètres du Compte</h1>
                <p className="text-slate-500 dark:text-lightgrey text-sm font-medium">Gérez vos informations personnelles et sécurisez votre compte.</p>
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
                                <div className="h-5 w-5 border-2 border-t-transParent border-white rounded-full animate-spin" />
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
                                <div className="h-5 w-5 border-2 border-t-transParent border-white rounded-full animate-spin" />
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
        </div>
    );
}
