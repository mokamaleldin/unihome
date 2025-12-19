'use client';
import { useLanguage } from '@/contexts/LanguageContext';

const ComingFeatures = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: "💬",
            title: t('contact.features.messaging.title'),
            description: t('contact.features.messaging.description'),
            timeline: t('contact.features.messaging.timeline')
        },
        {
            icon: "⭐",
            title: t('contact.features.reviews.title'),
            description: t('contact.features.reviews.description'),
            timeline: t('contact.features.reviews.timeline')
        },
        {
            icon: "✅",
            title: t('contact.features.verified.title'),
            description: t('contact.features.verified.description'),
            timeline: t('contact.features.verified.timeline')
        }
    ];

    return (
        <div className="mt-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#344E41] mb-4">
                    {t('contact.features.title')}
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {t('contact.features.description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-[#F3ECDC] rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-[#588157] text-2xl">{feature.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#344E41] mb-4">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                        </p>
                        <div className="mt-6">
                            <span className="bg-[#588157]/10 text-[#588157] px-3 py-1 rounded-full text-sm font-semibold">
                                {feature.timeline}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComingFeatures;
