'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                login(data.user);
                setIsRedirecting(true);
                // Delay redirect to allow the loading animation to display beautifully
                setTimeout(() => {
                    router.push('/admin');
                    router.refresh();
                }, 2000);
            } else {
                setError(data.message || 'Login failed');
                setLoading(false);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    if (isRedirecting) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-darkmode transition-colors duration-300">
                <div className="flex flex-col items-center space-y-6 max-w-md px-6 text-center animate-gentle-pulse">
                    {/* Inner glowing spinner container */}
                    <div className="relative flex items-center justify-center w-24 h-24">
                        {/* Outer pulsing ring */}
                        <div className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/20 blur-xl animate-pulse"></div>
                        {/* Spinning border ring */}
                        <div className="w-16 h-16 rounded-full border-4 border-neutral-100 dark:border-white/5 border-t-primary dark:border-t-primary animate-spin"></div>
                        {/* Center static key/lock icon or brand indicator */}
                        <div className="absolute">
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-darkblue dark:text-white">
                            Connexion réussie !
                        </h2>
                        <p className="text-sm text-lightgrey dark:text-gray-400">
                            Préparation de votre espace administrateur en cours...
                        </p>
                    </div>

                    {/* Progress bar container */}
                    <div className="w-48 h-1.5 bg-neutral-100 dark:bg-white/5 rounded-full overflow-hidden relative">
                        <div className="h-full bg-gradient-brand rounded-full animate-progress-loading"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-darkmode p-4 transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 p-10 bg-neutral-50 dark:bg-darklight rounded-2xl shadow-xl dark:shadow-2xl border border-black/5 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-darkblue dark:text-white">
                        Connexion
                    </h2>
                    <p className="mt-2 text-sm text-lightgrey dark:text-gray-400">
                        Accédez à votre compte administrateur
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 placeholder-gray-400 dark:placeholder-gray-500 text-darkblue dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transParent transition-all sm:text-sm"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" title="Mot de passe" className="sr-only">Mot de passe</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 placeholder-gray-400 dark:placeholder-gray-500 text-darkblue dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transParent transition-all sm:text-sm"
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transParent text-sm font-semibold rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-xs text-lightgrey/50">
                        Utilisez les identifiants fournis pour accéder à l'administration.
                    </p>
                </div>
            </div>
        </div>
    );
}
