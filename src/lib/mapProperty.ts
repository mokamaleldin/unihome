// Type definition for the mapped property object
export interface MappedProperty {
    id: number;
    title: string;
    location: string;
    price: string;
    university: string;
    rooms: string;
    image: string;
    area: string;
    link: string;
    lat?: number;
    lng?: number;

    // Location fields
    googleMapsAddress?: string;
    city?: string;
    district?: string;
    neighborhood?: string;
    fullAddress?: string;

    // Property Overview fields
    propertyType?: string;
    grossArea?: number;
    netArea?: number;
    buildingAge?: number;
    floor?: number;
    totalFloors?: number;
    heating?: string;
    bathrooms?: number;
    kitchen?: string;

    // Financial fields
    deposit?: number;
    bills?: number;

    // Contact fields
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;

    // Property Features
    inComplex?: boolean;
    elevator?: boolean;
    balcony?: boolean;
    garden?: boolean;
    furnished?: boolean;
    smokingAllowed?: boolean;

    // Amenities
    amenities?: string[];

    // Interior Features
    interiorFeatures?: string[];

    // Description
    description?: string;

    // Legacy fields for backward compatibility
    availability?: string;
    titleStatus?: string;
    parking?: string;
}

// Incoming row type from Supabase
export interface SupabasePropertyRow {
    id: number;
    property_title: string | null;
    city: string | null;
    monthly_rent: string | null;
    nearest_university: string | null;
    room_configuration: string | null;
    image_url: string | null;
    district: string | null;
    latitude: number | null;
    longitude: number | null;
    google_maps_link: string | null;
    neighborhood: string | null;
    street_address: string | null;
    property_type: string | null;
    gross_area: number | null;
    net_area: number | null;
    building_age: number | null;
    floor_number: number | null;
    total_floors: number | null;
    heating_system: string | null;
    bathrooms: number | null;
    kitchen_type: string | null;
    security_deposit: number | null;
    monthly_bills: number | null;
    contact_name: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    in_residential_complex: boolean | null;
    elevator_available: boolean | null;
    balcony_terrace: boolean | null;
    garden_access: boolean | null;
    fully_furnished: boolean | null;
    smoking_allowed: boolean | null;
    amenities: string[] | string | null;
    interior_features: string[] | string | null;
    description: string | null;
    availability_status: string | null;
    title_status: string | null;
    parking: string | null;
}

// Mapping function
export function mapSupabaseProperty(row: SupabasePropertyRow): MappedProperty {
    return {
        id: row.id,
        title: row.property_title || "Property",
        location: row.city || "Unknown",
        price: row.monthly_rent ? `₺${row.monthly_rent}` : "₺0",
        university: row.nearest_university || "Unknown",
        rooms: row.room_configuration || "Unknown",

        image: row.image_url || "/Hero.png",
        area: row.district || row.city || "Unknown",
        link: `/property/${row.id}`,
        lat: row.latitude ?? undefined,
        lng: row.longitude ?? undefined,

        googleMapsAddress: row.google_maps_link || "",
        city: row.city || "",
        district: row.district || "",
        neighborhood: row.neighborhood || "",
        fullAddress: row.street_address || "",

        propertyType: row.property_type || "",
        grossArea: row.gross_area ?? undefined,
        netArea: row.net_area ?? undefined,
        buildingAge: row.building_age ?? undefined,
        floor: row.floor_number ?? undefined,
        totalFloors: row.total_floors ?? undefined,
        heating: row.heating_system || "",
        bathrooms: row.bathrooms ?? undefined,
        kitchen: row.kitchen_type || "",

        deposit: row.security_deposit ?? undefined,
        bills: row.monthly_bills ?? undefined,

        contactName: row.contact_name || "",
        contactEmail: row.contact_email || "",
        contactPhone: row.contact_phone || "",

        inComplex: Boolean(row.in_residential_complex),
        elevator: Boolean(row.elevator_available),
        balcony: Boolean(row.balcony_terrace),
        garden: Boolean(row.garden_access),
        furnished: Boolean(row.fully_furnished),
        smokingAllowed: Boolean(row.smoking_allowed),

        amenities: row.amenities
            ? Array.isArray(row.amenities)
                ? row.amenities
                : JSON.parse(row.amenities || "[]")
            : [],
        interiorFeatures: row.interior_features
            ? Array.isArray(row.interior_features)
                ? row.interior_features
                : JSON.parse(row.interior_features || "[]")
            : [],

        description: row.description || "",

        availability: row.availability_status ?? undefined,
        titleStatus: row.title_status ?? undefined,
        parking: row.parking || "",
    };
}
