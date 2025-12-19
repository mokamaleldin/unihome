'use client';
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
    const { t } = useLanguage();


  return (
      <section
          className="relative  bg-cover bg-center bg-no-repeat"
          style={{
              backgroundImage: "url('/Hero.png')",
              backgroundAttachment: 'fixed'
          }}
      >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative z-10 flex items-center min-h-screen">
              <div className="max-w-7xl mx-auto px-6 py-20">
                  <div className="max-w-2xl">


                      {/* Main heading */}
                      <h1 className="text-[#F3ECDC] text-5xl md:text-6xl font-bold leading-tight mb-6">
                          {t('home.hero.commissionFree')} <span className="text-[#588157]">{t('home.hero.studentHousing')}</span>
                          <br />
                          {t('home.hero.impian')} <span className="text-[#588157]">{t('home.hero.simpleFastSecure')}</span>
                      </h1>

                      {/* Description */}
                      <p className="text-[#F3ECDC] text-lg leading-relaxed mb-8 max-w-lg">
                          {t('home.hero.description')}
                      </p>

                      {/* Buttons */}
                      <div className={`flex flex-col sm:flex-row gap-4 `}>
                          <Link
                              href="/Search"
                              className="inline-block bg-[#F3ECDC] text-[#344E41] px-8 py-3 rounded-full font-semibold text-lg hover:bg-white transition-colors duration-300 shadow-lg text-center"
                          >
                              {t('home.hero.browseListings')}
                          </Link>


                      </div>
                  </div>
              </div>
          </div>
      </section>
  )
}
export default Hero