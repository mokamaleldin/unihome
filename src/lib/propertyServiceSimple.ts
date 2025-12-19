import { supabase } from '@/supabase/supabase-client';
import { PropertyFormData } from '@/types/property';

/**
 * Simple property creation with only essential fields
 * This should work with most basic property table schemas
 */
export async function createPropertySimple(formData: PropertyFormData) {
    // Start with absolute minimum fields that every property table should have
    const baseData = {
        title: formData.title,
        city: formData.city,
        district: formData.district,
        neighborhood: formData.neighborhood,
        address: formData.fullAddress,
        price: parseFloat(formData.price),
        university: formData.university,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        description: formData.description
    };

    // Try the insert with base data
    let { data, error } = await supabase
        .from('properties')
        .insert([baseData])
        .select()
        .single();

    // If that fails, try with alternative field names
    if (error && error.message.includes('column')) {
        console.log('First attempt failed, trying alternative field names...');

        const altData = {
            property_title: formData.title,
            property_name: formData.title,
            name: formData.title,
            city: formData.city,
            district: formData.district,
            neighborhood: formData.neighborhood,
            street_address: formData.fullAddress,
            full_address: formData.fullAddress,
            address: formData.fullAddress,
            monthly_rent: parseFloat(formData.price),
            rent: parseFloat(formData.price),
            price: parseFloat(formData.price),
            university: formData.university,
            nearest_university: formData.university,
            contact_name: formData.contactName,
            contact_email: formData.contactEmail,
            contact_phone: formData.contactPhone,
            description: formData.description
        };

        ({ data, error } = await supabase
            .from('properties')
            .insert([altData])
            .select()
            .single());
    }

    if (error) {
        console.error('Property creation failed:', error);
        throw new Error(`Failed to create property: ${error.message}`);
    }

    return data;
}

/**
 * Upload images to Supabase storage and create image records
 */
export async function uploadPropertyImagesSimple(
    propertyId: number,
    imageFiles: File[]
) {
    const uploadedImages = [];

    for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];

        try {
            // Create unique filename
            const fileExt = file.name.split('.').pop();
            const timestamp = Date.now();
            const fileName = `properties/property-${propertyId}/${timestamp}-${i}.${fileExt}`;

            // Upload to Supabase storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('properties')
                .upload(fileName, file);

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                throw new Error(`Failed to upload image: ${uploadError.message}`);
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('properties')
                .getPublicUrl(uploadData.path);

            // Try to save image record to database with different possible field names
            let imageRecord;
            let insertError;

            // Try standard naming first
            ({ data: imageRecord, error: insertError } = await supabase
                .from('property_images')
                .insert({
                    property_id: propertyId,
                    image_url: urlData.publicUrl
                })
                .select()
                .single());

            // If that fails, try alternative naming
            if (insertError) {
                ({ data: imageRecord, error: insertError } = await supabase
                    .from('property_images')
                    .insert({
                        property_id: propertyId,
                        url: urlData.publicUrl
                    })
                    .select()
                    .single());
            }

            if (insertError) {
                console.error('Error saving image record:', insertError);
                throw new Error(`Failed to save image record: ${insertError.message}`);
            }

            uploadedImages.push(imageRecord);
        } catch (error) {
            console.error('Error processing image:', error);
            throw error;
        }
    }

    return uploadedImages;
}

/**
 * Complete property creation with images
 */
export async function createPropertyWithImagesSimple(formData: PropertyFormData) {
    try {
        // Create the property first
        const property = await createPropertySimple(formData);

        let images = [];

        // Upload images if any
        if (formData.images && formData.images.length > 0) {
            try {
                images = await uploadPropertyImagesSimple(property.id, formData.images);
            } catch (imageError) {
                console.error('Image upload failed:', imageError);
                // Property is created but images failed
                throw new Error(`Property created but image upload failed: ${imageError}`);
            }
        }

        return { property, images };
    } catch (error) {
        console.error('Error in createPropertyWithImagesSimple:', error);
        throw error;
    }
}
