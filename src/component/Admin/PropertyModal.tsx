'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PropertyForm from './PropertyForm';
import { useLanguage } from '@/contexts/LanguageContext';

interface PropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: {
        title?: string;
        city?: string;
        district?: string;
        neighborhood?: string;
        fullAddress?: string;
        googleMapsAddress?: string;
        rooms?: string;
        university?: string;
        description?: string;
        contactName: string;
        contactEmail: string;
        contactPhone: string;

        propertyType?: string;
        grossArea?: number;
        netArea?: number;
        buildingAge?: number;
        floor?: number;
        totalFloors?: number;
        heating?: string;
        bathrooms?: number;
        kitchen?: string;

        price?: string;
        deposit?: string;
        parking?: string;

        inComplex?: boolean;
        elevator?: boolean;
        balcony?: boolean;
        garden?: boolean;
        furnished?: boolean;
        smokingAllowed?: boolean;

        gym?: boolean;
        swimmingPool?: boolean;
        greenArea?: boolean;
        tv?: boolean;
        wifi?: boolean;
        airConditioning?: boolean;
        microwave?: boolean;
        dishwasher?: boolean;
        coffeeMachine?: boolean;
        washingMachine?: boolean;

        images?: File[];
        imageUrls?: string[];
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleImageChange?: (files: FileList | null) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isSubmitting?: boolean;
    submitMessage?: { type: 'success' | 'error', text: string } | null;
}

const PropertyModal = ({ isOpen, onClose, formData, handleChange, handleImageChange, handleSubmit, isSubmitting = false, submitMessage }: PropertyModalProps) => {
    const { t } = useLanguage();

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-4xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <div className={`flex justify-between items-center mb-6 `}>
                                        <DialogTitle as="h3" className="text-2xl font-semibold text-gray-900">
                                            {t('admin.propertyModal.title')}
                                        </DialogTitle>
                                        <button
                                            onClick={onClose}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <XMarkIcon className="h-6 w-6" />
                                        </button>
                                    </div>

                                    <PropertyForm
                                        formData={formData}
                                        handleChange={handleChange}
                                        handleImageChange={handleImageChange}
                                        handleSubmit={handleSubmit}
                                    />

                                    {/* Submit Message */}
                                    {submitMessage && (
                                        <div className={`mt-4 p-4 rounded-lg ${submitMessage.type === 'success'
                                                ? 'bg-green-50 border border-green-200 text-green-800'
                                                : 'bg-red-50 border border-red-200 text-red-800'
                                            }`}>
                                            <div className="flex items-center">
                                                <span className="mr-2">
                                                    {submitMessage.type === 'success' ? '✅' : '❌'}
                                                </span>
                                                {submitMessage.text}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={`bg-gray-50 px-4 py-3 sm:flex  sm:px-6`}>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:w-auto ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-500'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Property...
                                    </>
                                ) : (
                                    t('admin.propertyModal.submit')
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className={`mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {t('admin.propertyModal.cancel')}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default PropertyModal;
