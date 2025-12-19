'use client';
import { useLanguage } from "@/contexts/LanguageContext";

const FilterExplanation = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-[#588157] text-white rounded-xl px-6 py-6 h-fit">
            <h3 className="font-bold text-lg mb-3">{t('search.explanation.title')}</h3>
            <p className="text-sm leading-relaxed">
                {t('search.explanation.description')}
                <br /><br />
                • <strong>{t('search.explanation.location')}:</strong> {t('search.explanation.locationDesc')}
                <br />
                • <strong>{t('search.explanation.university')}:</strong> {t('search.explanation.universityDesc')}
                <br />
                • <strong>{t('search.explanation.priceRange')}:</strong> {t('search.explanation.priceRangeDesc')}
                <br />
                • <strong>{t('search.explanation.roomTypes')}:</strong> {t('search.explanation.roomTypesDesc')}
                <br /><br />
                {t('search.explanation.mixMatch')}
            </p>
        </div>
    );
};

export default FilterExplanation;
