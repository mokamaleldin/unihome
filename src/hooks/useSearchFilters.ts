import { useState, useMemo, useEffect } from "react";
import { getProperties } from "@/lib/fetchProperties";
import { mapSupabaseProperty, MappedProperty } from "@/lib/mapProperty";

export const useSearchFilters = () => {
    const [selectedUni, setSelectedUni] = useState<string>("");
    const [selectedLoc, setSelectedLoc] = useState<string>("");
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");
    const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

    // State for properties data
    const [properties, setProperties] = useState<MappedProperty[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch properties from Supabase on component mount
    useEffect(() => {
        const fetchPropertiesData = async () => {
            try {
                setLoading(true);
                setError(null);
                const supabaseProperties = await getProperties();
                const mappedProperties = supabaseProperties.map(mapSupabaseProperty);
                setProperties(mappedProperties);
            } catch (err) {
                console.error("Error fetching properties:", err);
                setError("Failed to load properties. Please try again later.");
                setProperties([]); // Fallback to empty array
            } finally {
                setLoading(false);
            }
        };

        fetchPropertiesData();
    }, []);

    // Filter and sort logic
    const filteredProperties = useMemo(() => {
        const filtered = properties.filter((p: MappedProperty) => {
            let pass = true;
            if (selectedUni && p.university !== selectedUni) pass = false;
            if (selectedLoc && p.area !== selectedLoc) pass = false;

            // Extract numeric price value
            const priceNum = parseInt(p.price.replace(/\D/g, ""));
            if (minPrice && priceNum < parseInt(minPrice)) pass = false;
            if (maxPrice && priceNum > parseInt(maxPrice)) pass = false;
            if (selectedRooms.length > 0 && !selectedRooms.includes(p.rooms)) pass = false;
            return pass;
        });

        // Sort by price ascending by default
        return filtered.sort((a, b) => {
            const priceA = parseInt(a.price.replace(/\D/g, ""));
            const priceB = parseInt(b.price.replace(/\D/g, ""));
            return priceA - priceB;
        });
    }, [properties, selectedUni, selectedLoc, minPrice, maxPrice, selectedRooms]);

    return {
        // Filter states
        selectedUni,
        setSelectedUni,
        selectedLoc,
        setSelectedLoc,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        selectedRooms,
        setSelectedRooms,

        // Data states
        loading,
        error,

        filteredProperties,
    };
};
