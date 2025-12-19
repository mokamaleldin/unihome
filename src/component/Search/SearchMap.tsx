'use client';
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchMapProps {
    propertiesCount: number;
}

const SearchMap = ({ propertiesCount }: SearchMapProps) => {
    const { t } = useLanguage();
    return (
        <div className="lg:col-span-1 flex flex-col gap-6">
            <h2 className="text-[#588157] font-bold text-2xl mb-4 text-center">{t('search.map.title')}</h2>

            <div className="bg-white rounded-3xl shadow-xl p-5 h-[600px] ">
                <div className="w-full h-full flex-1 rounded-2xl overflow-hidden relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385396.32103536274!2d28.68252073486524!3d41.005369636291395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2sIstanbul%2C%20Turkey!5e0!3m2!1sen!2s!4v1705851234567!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-2xl"
                        title="Istanbul Map"
                    />
                    {/* Property count overlay */}
                    <div className="absolute top-4 right-4 bg-[#588157] text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg">
                        {propertiesCount} {t('search.map.properties')}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SearchMap;
