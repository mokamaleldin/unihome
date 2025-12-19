'use client';
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link"

const Links = () => {
    const { t } = useLanguage();
  return (
      <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#F3ECDC]">{t('footer.links.title')}</h3>
          <ul className="space-y-3">
              <li>
                  <Link
                      href="/"
                      className={`text-[#F3ECDC] hover:text-white transition-colors duration-200 flex items-center space-x-2  `}
                  >
                      <span>{t('footer.links.home')}</span>
                  </Link>
              </li>
              <li>
                  <Link
                      href="/Search"
                      className={`text-[#F3ECDC] hover:text-white transition-colors duration-200 flex items-center space-x-2  `}
                  >
                      <span>{t('footer.links.search')}</span>
                  </Link>
              </li>
              <li>
                  <Link
                      href="/Contact"
                      className={`text-[#F3ECDC] hover:text-white transition-colors duration-200 flex items-center space-x-2  `}
                  >
                      <span>{t('footer.links.contact')}</span>
                  </Link>
              </li>
              <li>
                  <Link
                      href="/Admin"
                      className={`text-[#F3ECDC] hover:text-white transition-colors duration-200 flex items-center space-x-2  `}
                  >
                      <span>{t('footer.links.admin')}</span>
                  </Link>
              </li>
          </ul>
      </div>
  )
}
export default Links