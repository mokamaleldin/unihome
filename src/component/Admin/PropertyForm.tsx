'use client';

import {
    LocationSection,
    PropertyOverviewSection,
    FinancialSection,
    ContactSection,
    DescriptionSection,
    FeaturesSection,
    AppliancesSection,
    ImageUploadSection
} from './PropertyForm/index';

interface PropertyFormProps {
    formData: {
        title?: string;
        city?: string;
        district?: string;
        neighborhood?: string;
        fullAddress?: string;
        googleMapsAddress?: string;
        rooms?: string;
        university?: string;
        description?: string;
        contactName: string;
        contactEmail: string;
        contactPhone: string;

        propertyType?: string;
        grossArea?: number;
        netArea?: number;
        buildingAge?: number;
        floor?: number;
        totalFloors?: number;
        heating?: string;
        bathrooms?: number;
        kitchen?: string;

        price?: string;
        deposit?: string;
        parking?: string;

        inComplex?: boolean;
        elevator?: boolean;
        balcony?: boolean;
        garden?: boolean;
        furnished?: boolean;
        smokingAllowed?: boolean;

        gym?: boolean;
        swimmingPool?: boolean;
        greenArea?: boolean;
        tv?: boolean;
        wifi?: boolean;
        airConditioning?: boolean;
        microwave?: boolean;
        dishwasher?: boolean;
        coffeeMachine?: boolean;
        washingMachine?: boolean;

        images?: File[];
        imageUrls?: string[];
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleImageChange?: (files: FileList | null) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const PropertyForm = ({ formData, handleChange, handleImageChange, handleSubmit }: PropertyFormProps) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <LocationSection formData={formData} handleChange={handleChange} />
            <PropertyOverviewSection formData={formData} handleChange={handleChange} />
            <FinancialSection formData={formData} handleChange={handleChange} />
            <ContactSection formData={formData} handleChange={handleChange} />
            <DescriptionSection formData={formData} handleChange={handleChange} />
            <FeaturesSection formData={formData} handleChange={handleChange} />
            <AppliancesSection formData={formData} handleChange={handleChange} />
            <ImageUploadSection formData={formData} handleImageChange={handleImageChange} />
        </form>
    );
};

export default PropertyForm;
