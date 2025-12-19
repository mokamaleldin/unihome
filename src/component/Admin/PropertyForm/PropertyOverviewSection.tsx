'use client';

import {
    propertyTypes,
    roomTypes,
    heatingTypes,
    kitchenTypes,
} from '@/data/data';
import { useLanguage } from '@/contexts/LanguageContext';

interface PropertyOverviewSectionProps {
    formData: {
        title?: string;
        propertyType?: string;
        rooms?: string;
        grossArea?: number;
        netArea?: number;
        buildingAge?: number;
        floor?: number;
        totalFloors?: number;
        heating?: string;
        bathrooms?: number;
        kitchen?: string;
    };


    
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const PropertyOverviewSection = ({ formData, handleChange }: PropertyOverviewSectionProps) => {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                🏢 {t('admin.propertyForm.overview.title')}
            </h3>

            {/* Property Name & Type */}
            <div className={`grid md:grid-cols-2 gap-6 mb-6 `}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🏷️ {t('admin.propertyForm.overview.propertyName')}</label>
                    <input
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={t('admin.propertyForm.overview.propertyNamePlaceholder')}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🏠 {t('admin.propertyForm.overview.propertyType')}</label>
                    <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                    >
                        <option value="">{t('admin.propertyForm.overview.propertyTypePlaceholder')}</option>
                        {propertyTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Room Configuration & Measurements */}
            <div className={`grid md:grid-cols-4 gap-4 mb-6 `}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🚪 {t('admin.propertyForm.overview.rooms')}</label>
                    <select
                        name="rooms"
                        value={formData.rooms}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                    >
                        <option value="">{t('admin.propertyForm.overview.roomsPlaceholder')}</option>
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">📏 {t('admin.propertyForm.overview.grossArea')}</label>
                    <input
                        name="grossArea"
                        type="number"
                        value={formData.grossArea}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={t('admin.propertyForm.overview.grossAreaPlaceholder')}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">📐 {t('admin.propertyForm.overview.netArea')}</label>
                    <input
                        name="netArea"
                        type="number"
                        value={formData.netArea}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={t('admin.propertyForm.overview.netAreaPlaceholder')}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🏗️ {t('admin.propertyForm.overview.buildingAge')}</label>
                    <input
                        name="buildingAge"
                        type="number"
                        value={formData.buildingAge}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={t('admin.propertyForm.overview.buildingAgePlaceholder')}
                        required
                    />
                </div>
            </div>

            {/* Floor Information & Building Details */}
            <div className={`grid md:grid-cols-5 gap-4 `}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🏢 {t('admin.propertyForm.overview.floor')}</label>
                    <input
                        name="floor"
                        type="number"
                        value={formData.floor}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={t('admin.propertyForm.overview.floorPlaceholder')}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🏬 {t('admin.propertyForm.overview.totalFloors')}</label>
                    <input
                        name="totalFloors"
                        type="number"
                        value={formData.totalFloors}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={t('admin.propertyForm.overview.totalFloorsPlaceholder')}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🔥 {t('admin.propertyForm.overview.heating')}</label>
                    <select
                        name="heating"
                        value={formData.heating}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                    >
                        <option value="">{t('admin.propertyForm.overview.heatingPlaceholder')}</option>
                        {heatingTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🚿 {t('admin.propertyForm.overview.bathrooms')}</label>
                    <input
                        name="bathrooms"
                        type="number"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder={t('admin.propertyForm.overview.bathroomsPlaceholder')}
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🍳 {t('admin.propertyForm.overview.kitchen')}</label>
                    <select
                        name="kitchen"
                        value={formData.kitchen}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                    >
                        <option value="">{t('admin.propertyForm.overview.kitchenPlaceholder')}</option>
                        {kitchenTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PropertyOverviewSection;
