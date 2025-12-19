'use client';
import { useLanguage } from "@/contexts/LanguageContext";
import Card from "./Card";

interface Property {
    id: number;
    image: string;
    location: string;
    price: string;
    rooms: string;
    university: string;
    area: string;
    link: string;
    lat?: number;
    lng?: number;
}

interface SearchResultsProps {
    properties: Property[];
}

const SearchResults = ({ properties }: SearchResultsProps) => {
    const { t } = useLanguage();
    return (
        <div className="lg:col-span-2 flex flex-col gap-8">
            {properties.length === 0 ? (
                <div className="text-center text-gray-500">{t('search.results.noProperties')}</div>
            ) : (
                <div className="flex flex-col gap-8">
                  {properties.map((prop) => (
                      <Card key={prop.id} {...prop} />
                  ))}
              </div>
          )}
      </div>
  );
};

export default SearchResults;
