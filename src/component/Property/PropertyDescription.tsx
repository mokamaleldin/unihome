interface PropertyDescriptionProps {
    property: {
        area?: string;
        location?: string;
        university: string;
        rooms: string;
        description?: string;  // Description from the form
        district?: string;
        neighborhood?: string;
    };
}

const PropertyDescription = ({ property }: PropertyDescriptionProps) => {
    const locationDisplay = property.area || property.district || property.neighborhood || property.location;

    return (
        <div>
            <h3 className="text-xl font-bold text-[#344E41] mb-4">About This Property</h3>

            {/* Use custom description from form if available */}
            {property.description ? (
                <div className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                    {property.description}
                </div>
            ) : (
                /* Fallback to default description */
                <>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            This modern student accommodation is perfectly located in {locationDisplay}, offering easy access to {property.university}.
                            The property features a {property.rooms} layout, ideal for students looking for comfortable and affordable housing.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Located in one of Istanbul&apos;s most vibrant districts, you&apos;ll have access to cafes, restaurants, shopping centers,
                            and excellent public transportation connections. The area is known for its student-friendly atmosphere and safety.
                        </p>
                </>
            )}
        </div>
    );
};

export default PropertyDescription;
