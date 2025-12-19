import { supabase } from "@/supabase/supabase-client";

// Get all properties
export async function getProperties() {
    try {
        const { data, error } = await supabase
            .from("properties")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching properties:", error.message);
            throw new Error(`Failed to fetch properties: ${error.message}`);
        }

        return data || [];
    } catch (error) {
        console.error("Error in getProperties:", error);
        throw error;
    }
}

// Get single property by ID
export async function getPropertyById(id: string) {
    try {
        const { data, error } = await supabase
            .from("properties")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error fetching property:", error.message);
            if (error.code === 'PGRST116') {
                // No rows returned
                return null;
            }
            throw new Error(`Failed to fetch property: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error("Error in getPropertyById:", error);
        throw error;
    }
}
