'use client';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactHeaderProps {
    title?: string;
    description?: string;
}

const ContactHeader = ({
    title,
    description
}: ContactHeaderProps) => {
    const { t } = useLanguage();

    const displayTitle = title || t('contact.header.title');
    const displayDescription = description || t('contact.header.description');
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#344E41] mb-4">
                {displayTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {displayDescription}
            </p>
        </div>
    );
};

export default ContactHeader;
