'use client';
import { useLanguage } from "@/contexts/LanguageContext";

const Why = () => {
    const { t } = useLanguage();
  return (
      <section className="bg-[#344E41] py-16 lg:py-20 text-[#F3ECDC]">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                  {/* Left  */}
                  <div >
                      <p className=" text-sm uppercase tracking-wider mb-6 opacity-80">
                          {t('home.why.subtitle')}
                      </p>

                      <h2 className=" text-4xl lg:text-5xl font-bold leading-tight">
                          {t('home.why.title')}
                      </h2>
                  </div>

                  {/* Right  */}
                  <div className="bg-[#588157] px-8 py-14 rounded-lg space-y-6">
                    <div className="mb-8">
                          <div className=" text-6xl leading-none mb-4">&quot;</div>
                          <p className=" text-lg italic mb-4 font-medium">
                              &quot;{t('home.why.testimonial')}&quot;
                          </p>
                          <p className=" text-sm opacity-80 leading-relaxed">
                              {t('home.why.testimonialDescription')}
                          </p>
                      </div>

                      {/* Features List */}
                      <div className="space-y-4">
                          <div className={`flex items-center space-x-3  `}>
                              <div className="w-2 h-2 bg-[#F3ECDC] rounded-full"></div>
                              <span className=" text-sm">{t('home.why.feature1')}</span>
                          </div>

                          <div className={`flex items-center space-x-3  `}>
                              <div className="w-2 h-2 bg-[#F3ECDC] rounded-full"></div>
                              <span className=" text-sm">{t('home.why.feature2')}</span>
                          </div>

                          <div className={`flex items-center space-x-3  `}>
                              <div className="w-2 h-2 bg-[#F3ECDC] rounded-full"></div>
                              <span className=" text-sm">{t('home.why.feature3')}</span>
                          </div>

                          <div className={`flex items-center space-x-3  `}>
                              <div className="w-2 h-2 bg-[#F3ECDC] rounded-full"></div>
                              <span className=" text-sm">{t('home.why.feature4')}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

  )
}
export default Why