'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface DescriptionSectionProps {
    formData: {
        description?: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const DescriptionSection = ({ formData, handleChange }: DescriptionSectionProps) => {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                📝 {t('admin.propertyForm.description.title')}
            </h3>
            <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 `}
                placeholder={t('admin.propertyForm.description.placeholder')}
                required
            />
            <p className="text-xs text-gray-500 mt-2">
                💡 {t('admin.propertyForm.description.tip')}
            </p>
        </div>
    );
};

export default DescriptionSection;
