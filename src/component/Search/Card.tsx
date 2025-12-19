'use client';
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
    id?: number;
    image: string;
    location: string;
    price: string;
    rooms: string;
    university: string;
    area: string;
    link: string;
}

const Card = ({
    image,
    location,
    price,
    rooms,
    university,
    area,
    link,
}: CardProps) => {
    const { t } = useLanguage();
    return (
        <Link href={link} className="block">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Side - Image */}
                    <div className="relative h-96 lg:h-full">
                        <Image
                            src={image}
                            width={500}
                            height={300}
                            alt="Property"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Overlay Info */}
                        <div className="absolute top-6 left-6">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                                <h3 className="text-[#344E41] font-semibold mb-1">{location}</h3>
                                <p className="text-[#588157] text-sm">{price}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Info */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <h3 className="text-[#344E41] text-lg font-semibold mb-8">
                            {t('search.card.propertyInfo')}
                        </h3>

                        <div className="space-y-4 mb-8">
                            <div className="bg-[#F3ECDC] rounded-full px-6 py-3 border border-[#588157]/20">
                                <span className="text-[#344E41] text-sm">{rooms}</span>
                            </div>
                            <div className="bg-[#F3ECDC] rounded-full px-6 py-3 border border-[#588157]/20">
                                <span className="text-[#344E41] text-sm">{university}</span>
                            </div>
                            <div className="bg-[#F3ECDC] rounded-full px-6 py-3 border border-[#588157]/20">
                                <span className="text-[#344E41] text-sm">{area}</span>
                            </div>
                        </div>

                        <div className="bg-[#588157] text-white rounded-full px-8 py-4 font-semibold text-lg group-hover:bg-[#344E41] transition-colors duration-300 shadow-lg text-center">
                            {t('search.card.viewDetails')}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
