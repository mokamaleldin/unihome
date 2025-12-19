'use client';
import { useLanguage } from '@/contexts/LanguageContext';

const CommunityMessage = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-[#588157] text-white rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-4">{t('contact.community.title')}</h3>
            <p className="text-lg leading-relaxed mb-4">
                {t('contact.community.description1')}
            </p>
            <p className="text-lg leading-relaxed mb-6">
                {t('contact.community.description2')}
            </p>

            <div className="bg-white/10 rounded-lg p-4">
                <p className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    {t('contact.community.ideaText')}
                </p>
                <p className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-xl">❓</span>
                    {t('contact.community.questionsText')}
                </p>
                <p className="font-semibold flex items-center gap-2">
                    <span className="text-xl">🐛</span>
                    {t('contact.community.bugText')}
                </p>
            </div>
        </div>
    );
};

export default CommunityMessage;
