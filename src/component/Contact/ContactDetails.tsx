'use client';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactDetails = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-[#344E41] mb-6">{t('contact.details.title')}</h3>

            <div className="space-y-4">
                <div className={`flex items-center gap-4    `}>
                    <div className="w-12 h-12 bg-[#F3ECDC] rounded-full flex items-center justify-center">
                        <span className="text-[#588157] text-xl">📧</span>
                    </div>
                    <div>
                        <p className="font-semibold text-[#344E41]">{t('contact.details.emailLabel')}</p>
                        <p className="text-gray-600">{t('contact.details.emailAddress')}</p>
                    </div>
                </div>

                <div className={`flex items-center gap-4    `}>
                    <div className="w-12 h-12 bg-[#F3ECDC] rounded-full flex items-center justify-center">
                        <span className="text-[#588157] text-xl">📱</span>
                    </div>
                    <div>
                        <p className="font-semibold text-[#344E41]">{t('contact.details.whatsappLabel')}</p>
                        <p className="text-gray-600">{t('contact.details.whatsappNumber')}</p>
                    </div>
                </div>

                <div className={`flex items-center gap-4    `}>
                    <div className="w-12 h-12 bg-[#F3ECDC] rounded-full flex items-center justify-center">
                        <span className="text-[#588157] text-xl">⏰</span>
                    </div>
                    <div>
                        <p className="font-semibold text-[#344E41]">{t('contact.details.responseLabel')}</p>
                        <p className="text-gray-600">{t('contact.details.responseTime')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
