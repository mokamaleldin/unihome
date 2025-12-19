export interface Property {
    id?: number;
    google_maps_link?: string;
    city: string;
    district: string;
    neighborhood: string;
    street_address: string;
    property_title: string;
    property_type: string;
    room_configuration: string;
    gross_area: number;
    net_area: number;
    building_age: number;
    floor_number: number;
    total_floors: number;
    heating_system: string;
    bathrooms: number;
    kitchen_type: string;
    monthly_rent: number;
    security_deposit: number;
    parking: string;
    nearest_university: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    description: string;

    // Features
    in_residential_complex: boolean;
    elevator_available: boolean;
    balcony_terrace: boolean;
    garden_access: boolean;
    fully_furnished: boolean;
    smoking_allowed: boolean;

    // Amenities
    gym_fitness: boolean;
    swimming_pool: boolean;
    garden_green_area: boolean;

    // Appliances
    tv: boolean;
    wifi: boolean;
    air_conditioning: boolean;
    microwave: boolean;
    dishwasher: boolean;
    coffee_machine: boolean;
    washing_machine: boolean;

    // Metadata
    created_at?: string;
    updated_at?: string;
}

export interface PropertyImage {
    id?: number;
    property_id: number;
    image_url: string;
    created_at?: string;
}

export interface PropertyFormData {
    // Basic Information
    title: string;
    city: string;
    district: string;
    neighborhood: string;
    fullAddress: string;
    googleMapsAddress?: string;

    // Property Details
    propertyType: string;
    rooms: string;
    grossArea: number;
    netArea: number;
    buildingAge: number;
    floor: number;
    totalFloors: number;
    heating: string;
    bathrooms: number;
    kitchen: string;

    // Financial
    price: string;
    deposit: string;
    parking: string;

    // Contact & University
    university: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;

    // Description
    description: string;

    // Features
    inComplex: boolean;
    elevator: boolean;
    balcony: boolean;
    garden: boolean;
    furnished: boolean;
    smokingAllowed: boolean;

    // Amenities
    gym: boolean;
    swimmingPool: boolean;
    greenArea: boolean;

    // Appliances
    tv: boolean;
    wifi: boolean;
    airConditioning: boolean;
    microwave: boolean;
    dishwasher: boolean;
    coffeeMachine: boolean;
    washingMachine: boolean;

    // Images
    images: File[];
    imageUrls: string[];
}
