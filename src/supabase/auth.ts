import { supabase } from './supabase-client';

export const signInWithGoogle = async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://pxeotczpqqmckyqstsnx.supabase.co/auth/v1/callback',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('Google sign-in error:', error);
        return { data: null, error };
    }
};

export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        return { error: null };
    } catch (error) {
        console.error('Sign-out error:', error);
        return { error };
    }
};

export const getCurrentUser = async () => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            throw error;
        }
        return { user, error: null };
    } catch (error) {
        console.error('Get user error:', error);
        return { user: null, error };
    }
};
