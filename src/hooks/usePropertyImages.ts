'use client';

import { useState, useEffect } from 'react';
import { PropertyWithImages, fetchPropertyWithImages } from '@/lib/fetchPropertyImages';
import { MappedProperty } from '@/lib/mapProperty';

export function usePropertyImages(propertyId: string, baseProperty: MappedProperty | null) {
    const [propertyWithImages, setPropertyWithImages] = useState<PropertyWithImages | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPropertyImages = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!baseProperty) {
                    setLoading(false);
                    return;
                }

                const propertyData = await fetchPropertyWithImages(propertyId, baseProperty);
                setPropertyWithImages(propertyData);
            } catch (err) {
                console.error('Error loading property images:', err);
                setError('Failed to load property images');
                // Set property without images as fallback
                if (baseProperty) {
                    setPropertyWithImages({
                        ...baseProperty,
                        id: propertyId,
                        images: [],
                        mainImage: undefined
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        if (propertyId && baseProperty) {
            loadPropertyImages();
        }
    }, [propertyId, baseProperty]);

    return { propertyWithImages, loading, error };
}
