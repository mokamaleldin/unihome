'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface AppliancesSectionProps {
    formData: {
        tv?: boolean;
        wifi?: boolean;
        airConditioning?: boolean;
        microwave?: boolean;
        dishwasher?: boolean;
        coffeeMachine?: boolean;
        washingMachine?: boolean;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AppliancesSection = ({ formData, handleChange }: AppliancesSectionProps) => {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                🏠 {t('admin.propertyForm.appliances.title')}
            </h3>

            <div className={`grid md:grid-cols-2 gap-8 `}>
                <div>
                    <h4 className="font-semibold text-gray-700 mb-4">📺 {t('admin.propertyForm.appliances.electronics')}</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className={`flex items-center`}>
                            <input
                                name="tv"
                                type="checkbox"
                                checked={formData.tv || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className={` block text-sm text-gray-900`}>📺 {t('admin.propertyForm.appliances.tv')}</label>
                        </div>

                        <div className={`flex items-center`}>
                            <input
                                name="wifi"
                                type="checkbox"
                                checked={formData.wifi || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className={`block text-sm text-gray-900`}>📶 {t('admin.propertyForm.appliances.wifi')}</label>
                        </div>

                        <div className={`flex items-center`}>
                            <input
                                name="airConditioning"
                                type="checkbox"
                                checked={formData.airConditioning || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className={` block text-sm text-gray-900`}>❄️ {t('admin.propertyForm.appliances.airConditioning')}</label>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-700 mb-4">🍳 {t('admin.propertyForm.appliances.kitchen')}</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className={`flex items-center `}>
                            <input
                                name="microwave"
                                type="checkbox"
                                checked={formData.microwave || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className={` block text-sm text-gray-900`}>🍽️ {t('admin.propertyForm.appliances.microwave')}</label>
                        </div>

                        <div className={`flex items-center `}>
                            <input
                                name="dishwasher"
                                type="checkbox"
                                checked={formData.dishwasher || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className={` block text-sm text-gray-900`}>🍽️ {t('admin.propertyForm.appliances.dishwasher')}</label>
                        </div>

                        <div className={`flex items-center `}>
                            <input
                                name="coffeeMachine"
                                type="checkbox"
                                checked={formData.coffeeMachine || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className={` block text-sm text-gray-900`}>☕ {t('admin.propertyForm.appliances.coffeeMachine')}</label>
                        </div>

                        <div className={`flex items-center`}>
                            <input
                                name="washingMachine"
                                type="checkbox"
                                checked={formData.washingMachine || false}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className={` block text-sm text-gray-900`}>🧺 {t('admin.propertyForm.appliances.washingMachine')}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppliancesSection;
