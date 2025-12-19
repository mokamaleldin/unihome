'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardProps {
    userProperties: Array<{
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
    }>;
}

const Dashboard = ({ userProperties }: DashboardProps) => {
    const { t } = useLanguage();
    // Calculate statistics
    const totalUploaded = userProperties.length;
    const approvedProperties = userProperties.filter(p => p.status === 'approved').length;
    const pendingProperties = userProperties.filter(p => p.status === 'pending').length;
    const rejectedProperties = userProperties.filter(p => p.status === 'rejected').length;

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{t('admin.dashboard.title')}</h1>
                    <p className="text-gray-600">{t('admin.dashboard.subtitle')}</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">{totalUploaded}</div>
                        <div className="text-sm text-gray-600">{t('admin.dashboard.stats.totalProperties')}</div>
                        <div className="text-xs text-gray-400">{t('admin.dashboard.stats.allTimeUploaded')}</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-[#344E41]">{approvedProperties}</div>
                        <div className="text-sm text-gray-600">{t('admin.dashboard.stats.liveProperties')}</div>
                        <div className="text-xs text-gray-400">{t('admin.dashboard.stats.currentlyActive')}</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-3xl font-bold text-yellow-600">{pendingProperties}</div>
                        <div className="text-sm text-gray-600">{t('admin.dashboard.stats.underReview')}</div>
                        <div className="text-xs text-gray-400">{t('admin.dashboard.stats.waitingApproval')}</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-3xl font-bold text-red-600">{rejectedProperties}</div>
                        <div className="text-sm text-gray-600">{t('admin.dashboard.stats.rejected')}</div>
                        <div className="text-xs text-gray-400">{t('admin.dashboard.stats.needRevision')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
