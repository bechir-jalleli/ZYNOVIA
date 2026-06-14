'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
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
                router.push('/admin');
                router.refresh();
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
