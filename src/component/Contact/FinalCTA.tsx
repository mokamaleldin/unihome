'use client';
import { useLanguage } from '@/contexts/LanguageContext';

const FinalCTA = () => {
    const { t } = useLanguage();
    return (
        <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[#588157] to-[#344E41] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{t('contact.finalCTA.title')}</h3>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                    {t('contact.finalCTA.description')}
                </p>
                <p className="text-xl font-semibold">
                    {t('contact.finalCTA.closing')}
                </p>
            </div>
        </div>
    );
};

export default FinalCTA;
