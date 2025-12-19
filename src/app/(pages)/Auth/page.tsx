'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/component/Auth/LoginForm';
import { supabase } from '@/supabase/supabase-client';
import { useLanguage } from '@/contexts/LanguageContext';

const AuthPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const { t } = useLanguage();

    // Check if user is already authenticated
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    setIsAuthenticated(true);
                    router.push('/');
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Auth check error:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setIsAuthenticated(false);
                setIsLoading(false);
            } else if (session && event === 'SIGNED_IN') {
                setIsAuthenticated(true);
                router.push('/');
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [router]);

    // Render content after all hooks
    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#588157] flex items-center justify-center">
                <p className="text-white">{t('auth.redirecting')}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#588157] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {isLoading ? (
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-white text-lg">{t('auth.checkingAuth')}</p>
                </div>
            ) : (
                <div className="max-w-md w-full space-y-8">
                    <div className="bg-[#F6F3EA] rounded-2xl shadow-2xl p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-[#344E41] mb-2">
                                    {t('auth.welcome')}
                                </h2>
                                <p className="text-[#588157] text-sm">
                                {t('auth.signInDescription')}
                            </p>
                        </div>
                        <LoginForm />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthPage;
