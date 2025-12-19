'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface FeaturesSectionProps {
    formData: {
        inComplex?: boolean;
        elevator?: boolean;
        balcony?: boolean;
        garden?: boolean;
        furnished?: boolean;
        smokingAllowed?: boolean;
        gym?: boolean;
        swimmingPool?: boolean;
        greenArea?: boolean;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const FeaturesSection = ({ formData, handleChange }: FeaturesSectionProps) => {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                🏠 {t('admin.propertyForm.features.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">🏢 {t('admin.propertyForm.features.buildingType')}</h4>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                name="inComplex"
                                type="checkbox"
                                checked={formData.inComplex || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">🏘️ {t('admin.propertyForm.features.inComplex')}</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                name="elevator"
                                type="checkbox"
                                checked={formData.elevator || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">🛗 {t('admin.propertyForm.features.elevator')}</label>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">🌟 {t('admin.propertyForm.features.outdoorFeatures')}</h4>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                name="balcony"
                                type="checkbox"
                                checked={formData.balcony || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">🌅 {t('admin.propertyForm.features.balcony')}</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                name="garden"
                                type="checkbox"
                                checked={formData.garden || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">🌳 {t('admin.propertyForm.features.garden')}</label>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">🛋️ {t('admin.propertyForm.features.furnishingPolicies')}</h4>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <input
                                name="furnished"
                                type="checkbox"
                                checked={formData.furnished || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">🛋️ {t('admin.propertyForm.features.furnished')}</label>
                        </div>

                        <div className="flex items-center">
                            <input
                                name="smokingAllowed"
                                type="checkbox"
                                checked={formData.smokingAllowed || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">🚬 {t('admin.propertyForm.features.smoking')}</label>
                        </div>
                    </div>
                </div>
            </div>




            {/* Community Amenities */}
            <div className="mt-8">
                <h4 className="font-semibold text-gray-700 mb-4">🏢 {t('admin.propertyForm.features.communityAmenities')}</h4>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                        <input
                            name="gym"
                            type="checkbox"
                            checked={formData.gym || false}
                            onChange={handleChange}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">🏋️ {t('admin.propertyForm.features.gym')}</label>
                    </div>

                    <div className="flex items-center">
                        <input
                            name="swimmingPool"
                            type="checkbox"
                            checked={formData.swimmingPool || false}
                            onChange={handleChange}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">🏊 {t('admin.propertyForm.features.swimmingPool')}</label>
                    </div>

                    <div className="flex items-center">
                        <input
                            name="greenArea"
                            type="checkbox"
                            checked={formData.greenArea || false}
                            onChange={handleChange}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">🌳 {t('admin.propertyForm.features.greenArea')}</label>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default FeaturesSection;
