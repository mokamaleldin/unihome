"use client";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { locations, universities, roomTypes } from "@/data/data";

interface SearchFiltersProps {
    selectedUni: string;
    setSelectedUni: (value: string) => void;
    selectedLoc: string;
    setSelectedLoc: (value: string) => void;
    minPrice: string;
    setMinPrice: (value: string) => void;
    maxPrice: string;
    setMaxPrice: (value: string) => void;
    selectedRooms: string[];
    setSelectedRooms: (value: string[]) => void;
}

const SearchFilters = ({
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
}: SearchFiltersProps) => {
    const { t } = useLanguage();
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.getElementById('room-dropdown');
            const button = event.target as HTMLElement;
            if (dropdown && !dropdown.contains(button) && !button.closest('[data-room-filter]')) {
                dropdown.classList.add('hidden');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle room type selection
    const handleRoomToggle = (roomType: string) => {
        setSelectedRooms(
            selectedRooms.includes(roomType)
                ? selectedRooms.filter(r => r !== roomType)
                : [...selectedRooms, roomType]
        );
    };

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            {/* Location filter */}
            <div className="bg-[#F3ECDC] border border-[#588157]/20 rounded-full px-6 py-3 min-w-[200px]">
                <select
                    className="bg-transparent w-full outline-none text-[#344E41]"
                    value={selectedLoc}
                    onChange={(e) => setSelectedLoc(e.target.value)}
                >
                    <option value="">{t('search.filters.location')}</option>
                    {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                    ))}
                </select>
            </div>

            {/* University filter */}
            <div className="bg-[#F3ECDC] border border-[#588157]/20 rounded-full px-6 py-3 min-w-[200px]">
                <select
                    className="bg-transparent w-full outline-none text-[#344E41]"
                    value={selectedUni}
                    onChange={(e) => setSelectedUni(e.target.value)}
                >
                    <option value="">{t('search.filters.university')}</option>
                    {universities.map((uni) => (
                        <option key={uni} value={uni}>{uni}</option>
                    ))}
                </select>
            </div>

            {/* Price range filter */}
            <div className="bg-[#F3ECDC] border border-[#588157]/20 rounded-full px-6 py-3 min-w-[200px] flex items-center gap-2">
                <span className="text-[#344E41] text-sm">{t('search.filters.price')}</span>
                <input
                    type="number"
                    placeholder={t('search.filters.min')}
                    className="bg-transparent w-16 outline-none text-[#344E41] text-sm"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="text-[#344E41]">-</span>
                <input
                    type="number"
                    placeholder={t('search.filters.max')}
                    className="bg-transparent w-16 outline-none text-[#344E41] text-sm"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            {/* Room types selection */}
            <div className="bg-[#F3ECDC] border border-[#588157]/20 rounded-full px-6 py-3 min-w-[200px] flex items-center gap-2 relative" data-room-filter>
                <div className="relative w-full">
                    <button
                        className="flex items-center justify-between w-full text-[#344E41] text-sm"
                        onClick={() => document.getElementById('room-dropdown')?.classList.toggle('hidden')}
                    >
                        <span>
                            {selectedRooms.length === 0
                                ? t('search.filters.roomTypes')
                                : `${t('search.filters.roomTypes')} (${selectedRooms.length})`
                            }
                        </span>
                        <span className="text-[#588157]">▼</span>
                    </button>

                    {/* Dropdown list */}
                    <div
                        id="room-dropdown"
                        className="hidden absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
                    >
                        {roomTypes.map((roomType) => (
                            <div
                                key={roomType}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleRoomToggle(roomType)}
                            >
                                <div className="w-4 h-4 flex items-center justify-center">
                                    {selectedRooms.includes(roomType) ? (
                                        <span className="text-orange-500 font-bold text-sm">✓</span>
                                    ) : (
                                        <div className="w-3 h-3 border border-gray-300 rounded"></div>
                                    )}
                                </div>
                                <span className="text-[#344E41] text-sm">{roomType}</span>
                            </div>
                        ))}

                        {/* Clear all button in the Room types */}
                        {selectedRooms.length > 0 && (
                            <div className="border-t border-gray-200 p-2">
                                <button
                                    onClick={() => {
                                        setSelectedRooms([]);
                                        document.getElementById('room-dropdown')?.classList.add('hidden');
                                    }}
                                    className="w-full text-left text-red-500 text-xs px-2 py-1 hover:bg-red-50 rounded"
                                >
                                    {t('search.filters.clearAll')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
