'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const { t } = useLanguage();
    const { signOut } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut();
            router.push('/'); // Redirect to home page after logout
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const menuItems = [
        {
            id: 'dashboard',
            label: t('admin.sidebar.dashboard'),
            icon: '📊'
        },
        {
            id: 'properties',
            label: t('admin.sidebar.properties'),
            icon: '🏠'
        },
        {
            id: 'messages',
            label: t('admin.sidebar.messages'),
            icon: '📧'
        },
        {
            id: 'settings',
            label: t('admin.sidebar.settings'),
            icon: '⚙️'
        },
        {
            id: 'profile',
            label: t('admin.sidebar.profile'),
            icon: '👤'
        }
    ];

    return (
        <div className="w-64 bg-[#588157] min-h-screen p-4">
            <div className="mb-8">
                <div className="text-white text-xl font-bold">{t('admin.sidebar.propertyPortal')}</div>
                <div className="text-green-200 text-sm">{t('admin.sidebar.studentHousing')}</div>
            </div>

            <div className="space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === item.id
                            ? 'bg-[#344E41] text-white'
                            : 'text-green-100 hover:bg-[#344E41] hover:text-white'
                            }`}
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="mt-8 pt-8 border-t border-[#344E41]">
                <button
                    onClick={handleLogout}
                    className="w-full text-left p-3 rounded-lg flex items-center gap-3 text-green-100 hover:bg-red-600 hover:text-white transition-colors"
                >
                    <span>🚪</span>
                    {t('admin.sidebar.logout')}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
