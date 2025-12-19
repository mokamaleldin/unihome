import Image from 'next/image';
import { useState } from 'react';
import { PropertyWithImages, getMainImageUrl } from '@/lib/fetchPropertyImages';

interface PropertyHeaderProps {
    property: PropertyWithImages;
}

const PropertyHeader = ({ property }: PropertyHeaderProps) => {
    const [imageError, setImageError] = useState(false);
    const mainImageUrl = getMainImageUrl(property);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="h-[400px] lg:h-[500px] relative">
            <Image
                src={imageError ? '/Hero.png' : mainImageUrl}
                alt={`Property in ${property.location}`}
                fill
                className="object-cover"
                onError={handleImageError}
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Property title overlay */}
            <div className="absolute bottom-8 left-8 text-white">
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                    {property.title || `Student Housing ${property.location}`}
                </h1>
                <p className="text-xl opacity-90">{property.area}, Istanbul</p>
            </div>
        </div>
    );
};

export default PropertyHeader;
