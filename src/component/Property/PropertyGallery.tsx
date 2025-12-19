import Image from 'next/image';
import { useState } from 'react';
import { PropertyWithImages, getGalleryImages } from '@/lib/fetchPropertyImages';

interface PropertyGalleryProps {
    property: PropertyWithImages;
}

const PropertyGallery = ({ property }: PropertyGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    const galleryImages = getGalleryImages(property);

    const openModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleImageError = (index: number) => {
        setImageErrors(prev => new Set(prev).add(index));
    };

    return (
        <>
            <div className="bg-white p-8">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-2xl font-bold text-[#344E41] mb-6">Property Gallery</h3>

                    {galleryImages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {galleryImages.map((imageUrl, index) => (
                                <div
                                    key={index}
                                    className="aspect-[4/3] relative rounded-lg overflow-hidden cursor-pointer group"
                                    onClick={() => openModal(imageUrl)}
                                >
                                    <Image
                                        src={imageErrors.has(index) ? '/Hero.png' : imageUrl}
                                        alt={`Property view ${index + 1}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={() => handleImageError(index)}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {index === 0 && (
                                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                            Main
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No images available for this property</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Property view"
                            width={800}
                            height={600}
                            className="object-contain max-h-[80vh] w-auto"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyGallery;
