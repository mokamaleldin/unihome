import { supabase } from '@/supabase/supabase-client';

/**
 * Function to help debug database schema
 * This will try to insert a minimal record to see what columns are required/available
 */
export async function debugDatabaseSchema() {
    try {
        // First, let's try to get the current user
        const { data: { user } } = await supabase.auth.getUser();
        console.log('Current user:', user?.email || 'Not authenticated');

        // Try to fetch existing properties to understand the schema
        const { data: existingProperties, error: fetchError } = await supabase
            .from('properties')
            .select('*')
            .limit(1);

        if (fetchError) {
            console.error('Error fetching properties:', fetchError);
            return { error: fetchError };
        }

        console.log('Sample property schema:', existingProperties?.[0] || 'No properties found');

        // Try to get table info (this might not work depending on permissions)
        const { data: tableInfo, error: tableError } = await supabase
            .rpc('get_table_columns', { table_name: 'properties' });

        if (tableError) {
            console.log('Could not get table schema via RPC:', tableError.message);
        } else {
            console.log('Table columns:', tableInfo);
        }

        return {
            existingProperties,
            tableInfo,
            success: true
        };
    } catch (error) {
        console.error('Debug error:', error);
        return { error };
    }
}

/**
 * Test minimal property creation
 */
export async function testMinimalPropertyCreation() {
    const minimalData = {
        property_title: 'Test Property',
        city: 'Istanbul',
        district: 'Test District',
        neighborhood: 'Test Neighborhood',
        street_address: 'Test Address',
        monthly_rent: 1000,
        university: 'Test University',
        contact_name: 'Test Contact',
        contact_email: 'test@example.com',
        contact_phone: '+90 555 000 0000',
        description: 'Test description'
    };

    try {
        const { data, error } = await supabase
            .from('properties')
            .insert([minimalData])
            .select()
            .single();

        if (error) {
            console.error('Minimal insert error:', error);
            return { error };
        }

        console.log('Minimal insert success:', data);

        // Clean up - delete the test property
        await supabase
            .from('properties')
            .delete()
            .eq('id', data.id);

        return { data, success: true };
    } catch (error) {
        console.error('Test error:', error);
        return { error };
    }
}
