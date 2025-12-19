import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Language = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const { currentLanguage, setLanguage, t } = useLanguage();

    const languages = [
        { code: 'EN', flag: 'EN' },
        { code: 'TR', flag: 'TR' },
        { code: 'AR', flag: 'AR' }
    ];

    const handleLanguageChange = (lang: 'EN' | 'TR' | 'AR') => {
        setLanguage(lang);
    };

    const handleLoginClick = () => {
        router.push('/Auth');
    };

    // Don't render until authentication state is loaded
    if (loading) {
        return null;
    }

  return (
      <div className={`flex items-center space-x-4 `}>
          {/* Language Selector */}
          <div className="relative">
              <select
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as 'EN' | 'TR' | 'AR')}
                  className={`bg-[#F3ECDC] text-[#344E41] px-4 py-2 rounded-full border-none outline-none font-medium appearance-none cursor-pointer pr-8 `}
              >
                  {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                          {lang.flag}
                      </option>
                  ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-[#344E41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
              </div>
          </div>

          {/* Auth Button - Only show login when not authenticated */}
          {!user && (
              <button
                  onClick={handleLoginClick}
                  className="bg-[#F3ECDC] text-[#344E41] px-6 py-2 rounded-full font-medium hover:bg-white transition-colors duration-200"
              >
                  {t('common.login')}
              </button>
          )}
      </div>
  )
}
export default Language