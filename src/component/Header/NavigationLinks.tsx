'use client';
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const NavigationLinks = () => {
    const { t } = useLanguage();

    return (
        <nav className="hidden md:flex items-center space-x-8">
            <Link
                href="/"
                className="text-[#F3ECDC] hover:text-white transition-colors duration-200 font-medium"
            >
                {t('header.home')}
            </Link>
            <Link
                href="/Search"
                className="text-[#F3ECDC] hover:text-white transition-colors duration-200 font-medium"
            >
                {t('header.search')}
            </Link>
            <Link
                href="/Contact"
                className="text-[#F3ECDC] hover:text-white transition-colors duration-200 font-medium"
            >
                {t('header.contact')}
            </Link>
            <Link
                href="/Admin"
                className="text-[#F3ECDC] hover:text-white transition-colors duration-200 font-medium"
            >
                {t('header.admin')}
            </Link>
        </nav>
    );
};

export default NavigationLinks;