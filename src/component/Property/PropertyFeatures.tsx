import { PropertyWithImages } from '@/lib/fetchPropertyImages';

interface PropertyFeaturesProps {
    property: PropertyWithImages;
}

const PropertyFeatures = ({ property }: PropertyFeaturesProps) => {
    const getFeatureIcon = (feature: string) => {
        const iconMap: { [key: string]: string } = {
            rooms: '🏠',
            floor: '🏢',
            area: '📍',
            propertyType: '🏡',
        };
        return iconMap[feature] || '✨';
    };

    const features = [
        {
            key: 'rooms',
            value: property.rooms,
            label: 'Room Configuration',
            icon: getFeatureIcon('rooms')
        },

        {
            key: 'floor',
            value: property.floor ? `${property.floor}/${property.totalFloors || '?'}` : property.floor,
            label: 'Floor',
            icon: getFeatureIcon('floor')
        },
        {
            key: 'area',
            value: property.area,
            label: 'Area',
            icon: '📍'
        },

        {
            key: 'propertyType',
            value: property.propertyType,
            label: 'Property Type',
            icon: '🏡'
        }

    ];

    // Filter out features with no values
    const visibleFeatures = features.filter(feature => feature.value !== undefined && feature.value !== null && feature.value !== '');

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[#344E41] mb-2">
                        {property.title || `${property.rooms} ${property.propertyType || 'Property'}`}
                    </h2>
                    <p className="text-gray-600">Perfect for students near {property.university}</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-[#588157]">{property.price}</div>
                    <div className="text-sm text-gray-500">per month</div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                {visibleFeatures.map((feature) => (
                    <div key={feature.key} className="text-center p-4 bg-[#F3ECDC] rounded-lg">
                        <div className="text-2xl mb-2">{feature.icon}</div>
                        <div className="font-semibold text-[#344E41]">{feature.value}</div>
                        <div className="text-sm text-gray-600">{feature.label}</div>
                    </div>
                ))}
            </div>

        </>
    );
};

export default PropertyFeatures;

