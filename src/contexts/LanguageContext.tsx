'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/locales/en.json';
import tr from '@/locales/tr.json';
import ar from '@/locales/ar.json';

export type Language = 'EN' | 'TR' | 'AR';

interface LanguageContextType {
    currentLanguage: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isRTL: boolean;
    direction: 'ltr' | 'rtl';
}

const translations = {
    EN: en,
    TR: tr,
    AR: ar,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>('EN');

    // Load language from localStorage on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && ['EN', 'TR', 'AR'].includes(savedLang)) {
            setCurrentLanguage(savedLang);
        }
    }, []);

    // Save language to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('language', currentLanguage);

        // Update document direction for RTL support
        if (currentLanguage === 'AR') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = currentLanguage === 'TR' ? 'tr' : 'en';
        }
    }, [currentLanguage]);

    const setLanguage = (lang: Language) => {
        setCurrentLanguage(lang);
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: unknown = translations[currentLanguage];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                // Fallback to English if translation not found
                let fallback: unknown = translations.EN;
                for (const k2 of keys) {
                    if (fallback && typeof fallback === 'object' && k2 in fallback) {
                        fallback = (fallback as Record<string, unknown>)[k2];
                    } else {
                        fallback = key;
                        break;
                    }
                }
                value = fallback;
                break;
            }
        }

        return typeof value === 'string' ? value : key;
    };

    const isRTL = currentLanguage === 'AR';
    const direction = isRTL ? 'rtl' : 'ltr';

    const value: LanguageContextType = {
        currentLanguage,
        setLanguage,
        t,
        isRTL,
        direction,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
