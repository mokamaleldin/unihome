'use client';

import Image from "next/image";
import { useLanguage } from '@/contexts/LanguageContext';

interface UserProperty {
    id: number;
    image: string;
    location: string;
    rooms: string;
    university: string;
    price: string;
    status: "approved" | "pending" | "rejected";
    uploadDate: string;
    views: number;
    inquiries: number;
    rejectionReason?: string;
}

interface PropertyListProps {
    userProperties: UserProperty[];
    onAddProperty: () => void;
}

const PropertyList = ({ userProperties, onAddProperty }: PropertyListProps) => {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className={`flex justify-between items-center mb-6 `}>
                    <h2 className="text-xl font-bold text-gray-800">{t('admin.propertyList.title')}</h2>
                    <button
                        onClick={onAddProperty}
                        className="bg-[#344E41] text-white px-4 py-2 rounded-lg hover:bg-[#588157]"
                    >
                        {t('admin.propertyList.addProperty')}
                    </button>
                </div>

                {userProperties.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏠</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('admin.propertyList.noProperties')}</h3>
                        <p className="text-gray-500 mb-6">{t('admin.propertyList.noPropertiesDesc')}</p>
                        <button
                            onClick={onAddProperty}
                            className="bg-[#344E41] text-white px-6 py-3 rounded-lg hover:bg-[#588157]"
                        >
                            {t('admin.propertyList.addFirstProperty')}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {userProperties.map((property) => (
                            <div key={property.id} className="border border-gray-200 rounded-lg p-4">
                                <div className={`flex items-start gap-4 `}>
                                    <Image src={property.image} alt="Property" width={400} height={400} className="rounded-lg object-cover" />

                                    <div className="flex-1">
                                        <div className={`flex items-start justify-between mb-2 `}>
                                            <div className={``}>
                                                <h3 className="font-semibold text-lg">{property.location}</h3>
                                                <p className="text-gray-600">{property.rooms} • {t('admin.propertyList.near')} {property.university}</p>
                                                <p className="text-[#344E41] font-bold text-lg">{property.price}</p>
                                            </div>

                                            <div >
                                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${property.status === 'approved' ? 'bg-green-100 text-[#588157]' :
                                                    property.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {property.status === 'approved' ? `✅ ${t('admin.propertyList.status.live')}` :
                                                        property.status === 'pending' ? `⏳ ${t('admin.propertyList.status.underReview')}` :
                                                            `❌ ${t('admin.propertyList.status.rejected')}`}
                                                </span>
                                            </div>
                                        </div>

                                        <div className={`flex items-center gap-4 text-sm text-gray-500 mb-3   `}>
                                            <span>📅 {t('admin.propertyList.uploaded')}: {property.uploadDate}</span>
                                            <span>👁️ {t('admin.propertyList.views')}: {property.views}</span>
                                            <span>📧 {t('admin.propertyList.inquiries')}: {property.inquiries}</span>
                                        </div>

                                        {/* Rejection Reason */}
                                        {property.status === 'rejected' && property.rejectionReason && (
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                                                <div className={`flex items-start gap-2   `}>
                                                    <span className="text-red-500 text-sm">⚠️</span>
                                                    <div >
                                                        <div className="text-sm font-medium text-red-800">{t('admin.propertyList.rejectionReason')}</div>
                                                        <div className="text-sm text-red-600">{property.rejectionReason}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className={`flex gap-2   `}>
                                            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm">
                                                ✏️ {t('admin.propertyList.actions.edit')}
                                            </button>
                                            <button className="px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm">
                                                🗑️ {t('admin.propertyList.actions.delete')}
                                            </button>
                                            {property.status === 'approved' && (
                                                <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded hover:bg-gray-100 text-sm">
                                                    📊 {t('admin.propertyList.actions.viewStats')}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default PropertyList;
