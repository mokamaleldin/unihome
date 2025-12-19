interface PropertyDetailsCardProps {
    property: {
        id: number;
        title?: string;
        location: string;
        price: string;
        university: string;
        rooms: string;

        // Location fields from form
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
    };
}

const PropertyDetailsCard = ({ property }: PropertyDetailsCardProps) => {
    return (
        <div className="mb-8">


            {/* Location Information */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-[#344E41] mb-3 flex items-center">
                    📍 Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                    {property.city && (
                        <div>
                            <span className="font-medium text-gray-700">🏙️ City:</span>
                            <span className="ml-2 text-gray-600">{property.city}</span>
                        </div>
                    )}
                    {property.district && (
                        <div>
                            <span className="font-medium text-gray-700">🏘️ District:</span>
                            <span className="ml-2 text-gray-600">{property.district}</span>
                        </div>
                    )}
                    {property.neighborhood && (
                        <div>
                            <span className="font-medium text-gray-700">🏠 Neighborhood:</span>
                            <span className="ml-2 text-gray-600">{property.neighborhood}</span>
                        </div>
                    )}
                    {property.university && (
                        <div>
                            <span className="font-medium text-gray-700">🏫 Nearby University:</span>
                            <span className="ml-2 text-gray-600">{property.university}</span>
                        </div>
                    )}
                </div>
                {property.fullAddress && (
                    <div className="text-sm">
                        <span className="font-medium text-gray-700">📮 Full Address:</span>
                        <span className="ml-2 text-gray-600">{property.fullAddress}</span>
                    </div>
                )}
            </div>

            {/* Financial Information */}
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-[#344E41] mb-3 flex items-center">
                    💰 Financial Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                        <span className="font-medium text-gray-700">💵 Monthly Rent:</span>
                        <span className="ml-2 text-gray-600">{property.price}</span>
                    </div>
                    {property.deposit && (
                        <div>
                            <span className="font-medium text-gray-700">🔒 Security Deposit:</span>
                            <span className="ml-2 text-gray-600">₺{property.deposit}</span>
                        </div>
                    )}
                    {property.bills && (
                        <div>
                            <span className="font-medium text-gray-700">🧾 Monthly Bills:</span>
                            <span className="ml-2 text-gray-600">₺{property.bills}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Property Overview */}
            <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-[#344E41] mb-4 flex items-center">
                    🏢 Property Overview
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <tbody className="space-y-2">
                            {property.propertyType && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🏠 Property Type</td>
                                    <td className="py-2 text-gray-600">{property.propertyType}</td>
                                </tr>
                            )}
                            <tr className="border-b border-gray-200">
                                <td className="py-2 font-medium text-gray-700">� Rooms</td>
                                <td className="py-2 text-gray-600">{property.rooms}</td>
                            </tr>
                            {property.grossArea && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">📐 Gross Area</td>
                                    <td className="py-2 text-gray-600">{property.grossArea} m²</td>
                                </tr>
                            )}
                            {property.netArea && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">📏 Net Area</td>
                                    <td className="py-2 text-gray-600">{property.netArea} m²</td>
                                </tr>
                            )}
                            {property.buildingAge !== undefined && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🏗 Building Age</td>
                                    <td className="py-2 text-gray-600">{property.buildingAge} years</td>
                                </tr>
                            )}
                            {property.floor && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🏢 Floor</td>
                                    <td className="py-2 text-gray-600">{property.floor}{property.floor === 1 ? 'st' : property.floor === 2 ? 'nd' : property.floor === 3 ? 'rd' : 'th'} Floor</td>
                                </tr>
                            )}
                            {property.totalFloors && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">� Total Floors</td>
                                    <td className="py-2 text-gray-600">{property.totalFloors}</td>
                                </tr>
                            )}
                            {property.heating && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🔥 Heating</td>
                                    <td className="py-2 text-gray-600">{property.heating}</td>
                                </tr>
                            )}
                            {property.bathrooms && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🛁 Bathrooms</td>
                                    <td className="py-2 text-gray-600">{property.bathrooms}</td>
                                </tr>
                            )}
                            {property.kitchen && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🍽 Kitchen</td>
                                    <td className="py-2 text-gray-600">{property.kitchen}</td>
                                </tr>
                            )}
                            {property.inComplex !== undefined && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">� In a Complex</td>
                                    <td className="py-2 text-gray-600">{property.inComplex ? 'Yes' : 'No'}</td>
                                </tr>
                            )}
                            {property.elevator !== undefined && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🛗 Elevator</td>
                                    <td className="py-2 text-gray-600">{property.elevator ? 'Yes' : 'No'}</td>
                                </tr>
                            )}
                            {property.balcony !== undefined && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🌅 Balcony/Terrace</td>
                                    <td className="py-2 text-gray-600">{property.balcony ? 'Yes' : 'No'}</td>
                                </tr>
                            )}
                            {property.garden !== undefined && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🌳 Garden Access</td>
                                    <td className="py-2 text-gray-600">{property.garden ? 'Yes' : 'No'}</td>
                                </tr>
                            )}
                            {property.furnished !== undefined && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🛋 Furnished</td>
                                    <td className="py-2 text-gray-600">{property.furnished ? 'Yes' : 'No'}</td>
                                </tr>
                            )}
                            {property.smokingAllowed !== undefined && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">� Smoking Allowed</td>
                                    <td className="py-2 text-gray-600">{property.smokingAllowed ? 'Yes' : 'No'}</td>
                                </tr>
                            )}
                            {property.availability && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🚪 Availability</td>
                                    <td className="py-2 text-gray-600">{property.availability}</td>
                                </tr>
                            )}
                            {property.parking && (
                                <tr className="border-b border-gray-200">
                                    <td className="py-2 font-medium text-gray-700">🚗 Parking</td>
                                    <td className="py-2 text-gray-600">{property.parking}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsCard;
