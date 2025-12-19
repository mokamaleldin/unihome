"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getPropertyById } from '@/lib/fetchProperties';
import { mapSupabaseProperty, MappedProperty } from '@/lib/mapProperty';
import { usePropertyImages } from '@/hooks/usePropertyImages';
import { PropertyWithImages } from '@/lib/fetchPropertyImages';
import BackButton from '@/component/Property/BackButton';
import PropertyHeader from '@/component/Property/PropertyHeader';
import PropertyGallery from '@/component/Property/PropertyGallery';
import PropertyDetailsCard from '@/component/Property/PropertyDetailsCard';
import PropertyFeatures from '@/component/Property/PropertyFeatures';
import PropertyDescription from '@/component/Property/PropertyDescription';
import BookingCard from '@/component/Property/BookingCard';
import LocationMap from '@/component/Property/LocationMap';

const PropertyDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [property, setProperty] = useState<MappedProperty | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Use the property images hook
    const { propertyWithImages, loading: imagesLoading } = usePropertyImages(id, property);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                setError(null);

                const supabaseProperty = await getPropertyById(id);

                if (!supabaseProperty) {
                    setError("Property not found");
                    return;
                }

                const mappedProperty = mapSupabaseProperty(supabaseProperty);
                setProperty(mappedProperty);
            } catch (err) {
                console.error("Error fetching property:", err);
                setError("Failed to load property. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

    // Loading state - show loading if either property or images are loading
    if (loading || (property && imagesLoading)) {
        return (
            <div className="min-h-screen bg-[#F6F3EA] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#344E41] mx-auto mb-4"></div>
                    <p className="text-[#344E41] text-lg">
                        {loading ? 'Loading property...' : 'Loading images...'}
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !property) {
        return (
            <div className="min-h-screen bg-[#F6F3EA] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-[#344E41] mb-4">
                        {error || "Property Not Found"}
                    </h1>
                    <p className="text-gray-600 mb-6">
                        {error || "The property you're looking for doesn't exist or has been removed."}
                    </p>
                    <button
                        onClick={() => router.push('/Search')}
                        className="bg-[#588157] hover:bg-[#344E41] text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        );
    }

    // Use property with images if available, otherwise convert base property to PropertyWithImages format
    // At this point, property is guaranteed to exist due to the early return above
    const displayProperty: PropertyWithImages = propertyWithImages || {
        ...property,
        id: id, // Convert number id to string
        images: [],
        mainImage: property.image
    };

    return (
        <div className="min-h-screen bg-[#F6F3EA]">
            <BackButton />

            <div className="relative">
                <PropertyHeader property={displayProperty} />
                <PropertyGallery property={displayProperty} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto px-8 py-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <PropertyFeatures property={displayProperty} />
                        <PropertyDetailsCard property={property} />
                        <PropertyDescription property={property} />
                    </div>
                </div>

                <div className="space-y-8">
                    <BookingCard property={property} />
                    <LocationMap property={property} />
                </div>
            </div>

        </div>
    );
};

export default PropertyDetailsPage;
