import { supabase } from '@/supabase/supabase-client';
import { MappedProperty } from '@/lib/mapProperty';

export interface PropertyImage {
    id: string;
    property_id: string;
    image_url: string;
    created_at: string;
}

export interface PropertyWithImages extends Omit<MappedProperty, 'id'> {
    id: string;
    images?: PropertyImage[];
    mainImage?: string;
}

/**
 * Fetch property images from Supabase
 */
export async function fetchPropertyImages(propertyId: string): Promise<PropertyImage[]> {
    try {
        const { data, error } = await supabase
            .from('property_images')
            .select('*')
            .eq('property_id', propertyId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching property images:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching property images:', error);
        return [];
    }
}

/**
 * Get the main image URL (first image or fallback)
 */
export function getMainImageUrl(property: PropertyWithImages, fallbackImage: string = '/Hero.png'): string {
    if (property.images && property.images.length > 0) {
        return property.images[0].image_url;
    }
    return property.mainImage || fallbackImage;
}

/**
 * Get all image URLs for gallery
 */
export function getGalleryImages(property: PropertyWithImages, fallbackImage: string = '/Hero.png'): string[] {
    if (property.images && property.images.length > 0) {
        return property.images.map(img => img.image_url);
    }
    // Return fallback image multiple times for demo purposes
    return [fallbackImage, fallbackImage, fallbackImage];
}

/**
 * Fetch property with images
 */
export async function fetchPropertyWithImages(propertyId: string, baseProperty: MappedProperty): Promise<PropertyWithImages> {
    const images = await fetchPropertyImages(propertyId);

    return {
        ...baseProperty,
        id: propertyId, // Convert to string
        images,
        mainImage: images.length > 0 ? images[0].image_url : undefined
    };
}
