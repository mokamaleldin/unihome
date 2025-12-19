interface BookingCardProps {
    property: {
        price: string;
        rooms: string;
        area: string;
        university: string;
        propertyType?: string;
        availability?: string;
        contactName?: string;
        contactEmail?: string;
        contactPhone?: string;
    };
}

const BookingCard = ({ property }: BookingCardProps) => {
    const contactPhone = property.contactPhone || "+90 555 123 4567";
    const whatsappNumber = contactPhone.replace(/\s+/g, '').replace('+', '');

    const handleWhatsApp = () => {
        const message = `Hello, I'm interested in the ${property.rooms} property in ${property.area}.`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg ">
            <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[#588157] mb-2">{property.price}</div>
                <div className="text-gray-600">per month</div>
            </div>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-semibold">{property.area}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">University:</span>
                    <span className="font-semibold text-sm">{property.university}</span>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-[#588157] mb-3">Contact Information</h4>
                <div className="text-sm space-y-2">
                    {property.contactName && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">👤 Name:</span>
                            <span className="font-medium text-[#588157]">{property.contactName}</span>
                        </div>
                    )}
                    {property.contactEmail && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">📧 Email:</span>
                            <span className="font-medium text-[#588157] text-xs">{property.contactEmail}</span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <span className="text-gray-600">📱 Phone:</span>
                        <span className="font-medium text-[#588157]">{contactPhone}</span>
                    </div>
                </div>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3">
                <button
                    onClick={handleWhatsApp}
                    className="w-full bg-[#588157] text-[#F3ECDC] py-3 rounded-lg font-semibold hover:bg-[#344E41] transition-colors flex items-center justify-center gap-2"
                >
                    📱 WhatsApp
                </button>
            </div>
        </div>
    );
};

export default BookingCard;
