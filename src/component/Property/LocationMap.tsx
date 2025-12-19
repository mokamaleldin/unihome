interface LocationMapProps {
    property: {
        area: string;
        coordinates?: string;
        googleMapsLink?: string;
        lat?: number;
        lng?: number;
    };
}

const LocationMap = ({ property }: LocationMapProps) => {
    let latitude = property.lat;
    let longitude = property.lng;

    if (property.coordinates && !latitude && !longitude) {
        const coords = property.coordinates.split(',').map(coord => parseFloat(coord.trim()));
        if (coords.length === 2) {
            latitude = coords[0];
            longitude = coords[1];
        }
    }

    const defaultLat = 41.0082;
    const defaultLng = 28.9784;
    const finalLat = latitude || defaultLat;
    const finalLng = longitude || defaultLng;

    // Google Maps embed URL with marker
    const embedUrl = property.googleMapsLink
        ? property.googleMapsLink.replace('maps.google.com/maps', 'www.google.com/maps/embed')
        : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.2157!2d${finalLng}!3d${finalLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${finalLat}%2C${finalLng}!5e0!3m2!1sen!2s!4v1705851234567!5m2!1sen!2s&markers=color:red%7Clabel:H%7C${finalLat},${finalLng}`;

    const handleExpandMap = () => {
        const mapsUrl = property.googleMapsLink || `https://www.google.com/maps?q=${finalLat},${finalLng}`;
        window.open(mapsUrl, '_blank');
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#344E41]">Map</h3>
                <button
                    onClick={handleExpandMap}
                    className="text-sm bg-[#588157] text-white px-3 py-1 rounded-lg hover:bg-[#344E41] transition-colors"
                >
                    Expand Map
                </button>
            </div>

            {/* Interactive Map Container */}
            <div className="h-96 rounded-lg overflow-hidden">
                <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${property.area} Location Map`}
                />
            </div>
        </div>
    );
};

export default LocationMap;
