'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/supabase-client';

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (user) {
                    // Successfully authenticated, redirect to home
                    router.push('/');
                } else {
                    // No user found, redirect to auth page
                    router.push('/Auth');
                }
            } catch (error) {
                console.error('Auth callback error:', error);
                // On error, redirect to auth page
                router.push('/Auth');
            }
        };

        getUser();
    }, [router]);

    return (
        <div className="min-h-screen bg-[#F6F3EA] flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#588157] mx-auto mb-4"></div>
                <p className="text-[#344E41] text-lg">Signing you in...</p>
            </div>
        </div>
    );
}
