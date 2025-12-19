'use client';
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image"
import Link from "next/link"

const Brand = () => {
    const { t } = useLanguage();
  return (
      <>
          <Link href={"/"} className={`flex items-center space-x-3 `}>
              <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
              />
              <span className="text-xl font-bold tracking-wider">
                  SAKNTALEB
              </span>
          </Link>
          <p className="text-[#F3ECDC] leading-relaxed">
              {t('footer.brand.description1')}
          </p>
          <p className="text-[#F3ECDC] leading-relaxed">
              {t('footer.brand.description2')}
          </p>
      </>
  )
}
export default Brand