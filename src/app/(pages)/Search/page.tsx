"use client";
import { useLanguage } from '@/contexts/LanguageContext';
import SearchFilters from "@/component/Search/SearchFilters";
import SearchResults from "@/component/Search/SearchResults";
import SearchMap from "@/component/Search/SearchMap";
import FilterExplanation from "@/component/Search/FilterExplanation";
import { useSearchFilters } from "@/hooks/useSearchFilters";

const Page = () => {
  const { t } = useLanguage();
  const {
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
    loading,
    error,
    filteredProperties,
  } = useSearchFilters();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F3EA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#344E41] mx-auto mb-4"></div>
          <p className="text-[#344E41] text-lg">{t('search.loading')}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F6F3EA] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-[#344E41] mb-4">{t('search.error.title')}</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#588157] hover:bg-[#344E41] text-white px-6 py-3 rounded-lg transition-colors"
          >
            {t('search.error.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F3EA] p-6 lg:p-12">

      {/* filter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 mb-8">
        <div className="lg:col-span-2">
          <SearchFilters
            selectedUni={selectedUni}
            setSelectedUni={setSelectedUni}
            selectedLoc={selectedLoc}
            setSelectedLoc={setSelectedLoc}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
          />
        </div>
        <FilterExplanation />
      </div>

      {/* main */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <SearchResults properties={filteredProperties} />
        <SearchMap propertiesCount={filteredProperties.length} />
      </div>
    </div>
  );
};

export default Page;

