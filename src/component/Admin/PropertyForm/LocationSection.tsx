'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface LocationSectionProps {
    formData: {
        googleMapsAddress?: string;
        city?: string;
        district?: string;
        neighborhood?: string;
        fullAddress?: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const LocationSection = ({ formData, handleChange }: LocationSectionProps) => {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                🗺️ {t('admin.propertyForm.location.title')}
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        📍 {t('admin.propertyForm.location.googleMaps')}
                    </label>
                    <input
                        name="googleMapsAddress"
                        type="url"
                        value={formData.googleMapsAddress || ''}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={t('admin.propertyForm.location.googleMapsPlaceholder')}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        🔗 {t('admin.propertyForm.location.googleMapsDesc')}
                    </p>
                </div>

                <div className={`grid md:grid-cols-3 gap-4 `}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">🏙️ {t('admin.propertyForm.location.city')}</label>
                        <input
                            name="city"
                            type="text"
                            value={formData.city || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder={t('admin.propertyForm.location.cityPlaceholder')}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">🏘️ {t('admin.propertyForm.location.district')}</label>
                        <input
                            name="district"
                            type="text"
                            value={formData.district || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder={t('admin.propertyForm.location.districtPlaceholder')}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">🏠 {t('admin.propertyForm.location.neighborhood')}</label>
                        <input
                            name="neighborhood"
                            type="text"
                            value={formData.neighborhood || ''}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder={t('admin.propertyForm.location.neighborhoodPlaceholder')}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">📮 {t('admin.propertyForm.location.fullAddress')}</label>
                    <input
                        name="fullAddress"
                        type="text"
                        value={formData.fullAddress || ''}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={t('admin.propertyForm.location.fullAddressPlaceholder')}
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default LocationSection;
