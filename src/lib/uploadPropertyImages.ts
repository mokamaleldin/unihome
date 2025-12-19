import { supabase } from '@/supabase/supabase-client';

export interface PropertyImage {
    id: string;
    property_id: string;
    image_url: string;
    created_at: string;
}

/**
 * Upload images to Supabase storage and save image records
 */
export async function uploadPropertyImages(
    propertyId: string,
    imageFiles: File[]
): Promise<PropertyImage[]> {
    const uploadedImages: PropertyImage[] = [];

    for (const file of imageFiles) {
        try {
            // Create unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${propertyId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

            // Upload to Supabase storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('properties')
                .upload(fileName, file);

            if (uploadError) {
                console.error('Error uploading image:', uploadError);
                continue;
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
                continue;
            }

            uploadedImages.push(imageRecord);
        } catch (error) {
            console.error('Error processing image:', error);
        }
    }

    return uploadedImages;
}

/**
 * Delete property images from storage and database
 */
export async function deletePropertyImages(propertyId: string): Promise<void> {
    try {
        // Get all image records for the property
        const { data: images, error: fetchError } = await supabase
            .from('property_images')
            .select('*')
            .eq('property_id', propertyId);

        if (fetchError || !images) {
            console.error('Error fetching images for deletion:', fetchError);
            return;
        }

        // Delete from storage
        for (const image of images) {
            try {
                const filePath = image.image_url.split('/').slice(-3).join('/'); // Get last 3 parts for path
                await supabase.storage
                    .from('properties')
                    .remove([filePath]);
            } catch (error) {
                console.error('Error deleting image from storage:', error);
            }
        }

        // Delete from database
        const { error: deleteError } = await supabase
            .from('property_images')
            .delete()
            .eq('property_id', propertyId);

        if (deleteError) {
            console.error('Error deleting image records:', deleteError);
        }
    } catch (error) {
        console.error('Error in deletePropertyImages:', error);
    }
}
