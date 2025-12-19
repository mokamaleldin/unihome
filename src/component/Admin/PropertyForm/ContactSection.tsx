'use client';

import { universities } from '@/data/data';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactSectionProps {
    formData: {
        university?: string;
        contactName?: string;
        contactEmail?: string;
        contactPhone?: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const ContactSection = ({ formData, handleChange }: ContactSectionProps) => {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                🎓 {t('admin.propertyForm.contact.title')}
            </h3>
            <div className={`grid md:grid-cols-1 gap-6 mb-4`}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🏫 {t('admin.propertyForm.contact.nearestUniversity')}</label>
                    <select
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        required
                    >
                        <option value="">{t('admin.propertyForm.contact.selectUniversity')}</option>
                        {universities.map((university) => (
                            <option key={university} value={university}>{university}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={`grid md:grid-cols-3 gap-6 `}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">👤 {t('admin.propertyForm.contact.contactName')}</label>
                    <input
                        name="contactName"
                        type="text"
                        value={formData.contactName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder={t('admin.propertyForm.contact.contactNamePlaceholder')}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">📧 {t('admin.propertyForm.contact.contactEmail')}</label>
                    <input
                        name="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder={t('admin.propertyForm.contact.contactEmailPlaceholder')}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">📱 {t('admin.propertyForm.contact.contactPhone')}</label>
                    <input
                        name="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder={t('admin.propertyForm.contact.contactPhonePlaceholder')}
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
