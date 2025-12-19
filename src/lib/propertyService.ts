import { supabase } from '@/supabase/supabase-client';
import { Property, PropertyImage, PropertyFormData } from '@/types/property';

/**
 * Create a new property in the database
 */
export async function createProperty(formData: PropertyFormData): Promise<Property> {
    // Transform form data to match the exact database schema from your SQL
    const propertyData = {
        google_maps_link: formData.googleMapsAddress || null,
        city: formData.city,
        district: formData.district,
        neighborhood: formData.neighborhood,
        street_address: formData.fullAddress,
        property_title: formData.title,
        property_type: formData.propertyType,
        room_configuration: formData.rooms,
        gross_area: formData.grossArea,
        net_area: formData.netArea,
        building_age: formData.buildingAge,
        floor_number: formData.floor,
        total_floors: formData.totalFloors,
        heating_system: formData.heating,
        bathrooms: formData.bathrooms,
        kitchen_type: formData.kitchen,
        monthly_rent: parseFloat(formData.price),
        security_deposit: parseFloat(formData.deposit),
        parking: formData.parking,
        nearest_university: formData.university,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        description: formData.description,

        // Features - matching your exact schema
        in_residential_complex: formData.inComplex,
        elevator_available: formData.elevator,
        balcony_terrace: formData.balcony,
        garden_access: formData.garden,
        fully_furnished: formData.furnished,
        smoking_allowed: formData.smokingAllowed,

        // Amenities - matching your exact schema
        gym_fitness: formData.gym,
        swimming_pool: formData.swimmingPool,
        garden_green_area: formData.greenArea,

        // Appliances - matching your exact schema
        tv: formData.tv,
        wifi: formData.wifi,
        air_conditioning: formData.airConditioning,
        microwave: formData.microwave,
        dishwasher: formData.dishwasher,
        coffee_machine: formData.coffeeMachine,
        washing_machine: formData.washingMachine
    };

    const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
        .single();

    if (error) {
        console.error('Error creating property:', error);
        throw new Error(`Failed to create property: ${error.message}`);
    }

    return data;
}

/**
 * Upload images to Supabase storage and create image records
 */
export async function uploadPropertyImages(
    propertyId: number,
    imageFiles: File[]
): Promise<PropertyImage[]> {
    const uploadedImages: PropertyImage[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];

        try {
            // Create unique filename with timestamp
            const fileExt = file.name.split('.').pop();
            const timestamp = Date.now();
            const fileName = `properties/property-${propertyId}/${timestamp}-${i}.${fileExt}`;

            // Upload to Supabase storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('properties')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                throw new Error(`Failed to upload image ${file.name}: ${uploadError.message}`);
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('properties')
                .getPublicUrl(uploadData.path);

            // Save image record to database
            const { data: imageRecord, error: insertError } = await supabase
                .from('property_images')
                .insert({
                    property_id: propertyId,
                    image_url: urlData.publicUrl
                })
                .select()
                .single();

            if (insertError) {
                console.error('Error saving image record:', insertError);
                throw new Error(`Failed to save image record: ${insertError.message}`);
            }

            uploadedImages.push(imageRecord);
        } catch (error) {
            console.error('Error processing image:', error);
            // Clean up any successfully uploaded images if one fails
            await cleanupFailedUploads(uploadedImages);
            throw error;
        }
    }

    return uploadedImages;
}

/**
 * Create property with images in a transaction-like manner
 */
export async function createPropertyWithImages(
    formData: PropertyFormData
): Promise<{ property: Property; images: PropertyImage[] }> {
    try {
        // First, create the property
        const property = await createProperty(formData);

        let images: PropertyImage[] = [];

        // Then upload images if any
        if (formData.images && formData.images.length > 0) {
            try {
                images = await uploadPropertyImages(property.id!, formData.images);
            } catch (imageError) {
                // If image upload fails, we could either:
                // 1. Delete the property and throw error (strict approach)
                // 2. Keep the property but notify about image failure (lenient approach)

                console.error('Image upload failed:', imageError);

                // For now, we'll keep the property but throw a specific error
                throw new Error(`Property created successfully, but image upload failed: ${imageError}`);
            }
        }

        return { property, images };
    } catch (error) {
        console.error('Error in createPropertyWithImages:', error);
        throw error;
    }
}

/**
 * Clean up uploaded images in case of failure
 */
async function cleanupFailedUploads(uploadedImages: PropertyImage[]): Promise<void> {
    for (const image of uploadedImages) {
        try {
            // Extract file path from URL
            const url = new URL(image.image_url);
            const filePath = url.pathname.split('/').slice(-3).join('/'); // Get last 3 parts: properties/property-X/filename

            // Delete from storage
            await supabase.storage
                .from('properties')
                .remove([filePath]);

            // Delete from database
            await supabase
                .from('property_images')
                .delete()
                .eq('id', image.id);
        } catch (error) {
            console.error('Error cleaning up failed upload:', error);
        }
    }
}

/**
 * Get all properties with their images
 */
export async function getPropertiesWithImages(): Promise<(Property & { images: PropertyImage[] })[]> {
    const { data, error } = await supabase
        .from('properties')
        .select(`
      *,
      property_images (*)
    `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching properties:', error);
        throw new Error(`Failed to fetch properties: ${error.message}`);
    }

    return data.map(property => ({
        ...property,
        images: property.property_images || []
    }));
}

/**
 * Get a single property by ID with its images
 */
export async function getPropertyById(id: number): Promise<(Property & { images: PropertyImage[] }) | null> {
    const { data, error } = await supabase
        .from('properties')
        .select(`
      *,
      property_images (*)
    `)
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return null; // Property not found
        }
        console.error('Error fetching property:', error);
        throw new Error(`Failed to fetch property: ${error.message}`);
    }

    return {
        ...data,
        images: data.property_images || []
    };
}

/**
 * Delete a property and all its images
 */
export async function deleteProperty(id: number): Promise<void> {
    try {
        // First get all images for this property
        const { data: images, error: fetchError } = await supabase
            .from('property_images')
            .select('*')
            .eq('property_id', id);

        if (fetchError) {
            throw new Error(`Failed to fetch property images: ${fetchError.message}`);
        }

        // Delete images from storage
        if (images && images.length > 0) {
            const filePaths = images.map(image => {
                const url = new URL(image.image_url);
                return url.pathname.split('/').slice(-3).join('/');
            });

            const { error: storageError } = await supabase.storage
                .from('properties')
                .remove(filePaths);

            if (storageError) {
                console.error('Error deleting images from storage:', storageError);
            }
        }

        // Delete image records from database
        const { error: imageDeleteError } = await supabase
            .from('property_images')
            .delete()
            .eq('property_id', id);

        if (imageDeleteError) {
            throw new Error(`Failed to delete image records: ${imageDeleteError.message}`);
        }

        // Finally, delete the property
        const { error: propertyDeleteError } = await supabase
            .from('properties')
            .delete()
            .eq('id', id);

        if (propertyDeleteError) {
            throw new Error(`Failed to delete property: ${propertyDeleteError.message}`);
        }
    } catch (error) {
        console.error('Error in deleteProperty:', error);
        throw error;
    }
}
