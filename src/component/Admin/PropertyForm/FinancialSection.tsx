'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { parkingTypes } from '@/data/data';

interface FinancialSectionProps {
    formData: {
        price?: string;
        deposit?: string;
        parking?: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const FinancialSection = ({ formData, handleChange }: FinancialSectionProps) => {
    const { t } = useLanguage();

    return (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                💰 {t('admin.propertyForm.financial.title')}
            </h3>
            <div className={`grid md:grid-cols-3 gap-6 `}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">💵 {t('admin.propertyForm.financial.monthlyRent')}</label>
                    <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        placeholder={t('admin.propertyForm.financial.monthlyRentPlaceholder')}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🔒 {t('admin.propertyForm.financial.securityDeposit')}</label>
                    <input
                        name="deposit"
                        type="number"
                        value={formData.deposit}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        placeholder={t('admin.propertyForm.financial.securityDepositPlaceholder')}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🚗 {t('admin.propertyForm.financial.parking')}</label>
                    <select
                        name="parking"
                        value={formData.parking}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        required
                    >
                        <option value="">{t('admin.propertyForm.financial.parkingPlaceholder')}</option>
                        {parkingTypes.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FinancialSection;
