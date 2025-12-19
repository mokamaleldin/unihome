'use client';
import Card from "../Search/Card"
import { useLanguage } from "@/contexts/LanguageContext";

const Listings = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-[#F3ECDC] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className={`flex justify-between items-center mb-12 `}>
          <div>
            <p className="text-[#588157] text-sm uppercase tracking-wider mb-2">
              {t('home.listings.subtitle')}
            </p>
            <h2 className="text-[#344E41] text-4xl lg:text-5xl font-bold">
              {t('home.listings.title')}
            </h2>
          </div>
          <a
            href="/blog"
            className={`text-[#588157] text-sm uppercase tracking-wider hover:text-[#344E41] transition-colors duration-300 flex items-center space-x-2 `}
          >
            <span>{t('home.listings.viewAllBlog')}</span>
            <span>→</span>
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <Card
            image="/Home/pic.png"
            location="Jakarta"
            price="$1,200,000"
            rooms="3 Bedrooms"
            university="University of Indonesia"
            area="1200 sqft"
            link="/property/1"
          />

        </div>
      </div>
    </section>
  )
}
export default Listings