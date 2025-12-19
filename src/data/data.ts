// Istanbul universities
export const universities = [
    "Istanbul University",
    "Istanbul Technical University",
    "Boğaziçi University",
    "Mimar Sinan Fine Arts University",
    "Marmara University",
    "Yıldız Technical University",
    "Galatasaray University",
    "Istanbul Medeniyet University",
    "İstanbul University‑Cerrahpaşa",
    "Koç University",
    "Sabancı University",
    "Bahçeşehir University",
    "Istanbul Bilgi University",
    "Kadir Has University",
    "Özyeğin University",
    "MEF University",
    "Yeditepe University",
    "Maltepe University",
    "Istanbul Aydın University",
    "Istanbul Medipol University",
];

// Istanbul districts
export const locations = [
    // European Side
    "Fatih", "Beyoğlu", "Beşiktaş", "Şişli", "Bakırköy", "Zeytinburnu",
    "Bahçelievler", "Bağcılar", "Güngören", "Esenler", "Gaziosmanpaşa",
    "Eyüpsultan", "Kağıthane", "Sultangazi", "Bayrampaşa", "Avcılar",
    "Küçükçekmece", "Büyükçekmece", "Beylikdüzü", "Esenyurt", "Arnavutköy",
    "Başakşehir", "Çatalca",
    // Asian Side  
    "Kadıköy", "Üsküdar", "Ümraniye", "Ataşehir", "Maltepe", "Kartal",
    "Pendik", "Tuzla", "Sancaktepe", "Sultanbeyli", "Çekmeköy", "Beykoz",
    "Şile", "Silivri"
];

// Room type options
export const roomTypes = ["1+0", "1+1", "2+0", "2+1", "3+0", "3+1", "4+0", "4+1"];

// Property types - values match database constraints
export const propertyTypes = [
  { label: "Apartment for Rent", value: "apartment_for_rent" },
  { label: "Room for Rent", value: "room_for_rent" },
  { label: "Shared Apartment", value: "shared_apartment" },
  { label: "Studio", value: "studio" }
];

// Heating types - values match database constraints
export const heatingTypes = [
  { label: "Natural Gas", value: "natural_gas" },
  { label: "Central Heating", value: "central_heating" },
  { label: "Electric", value: "electric" },
  { label: "Underfloor Heating", value: "underfloor" },
  { label: "Stove", value: "stove" },
  { label: "Combi Boiler", value: "combi" }
];

// Kitchen types - values match database constraints
export const kitchenTypes = [
  { label: "Separate Kitchen", value: "closed_kitchen" },
  { label: "Open Kitchen (American style)", value: "open_kitchen" },
  { label: "Semi-open Kitchen", value: "semi_open_kitchen" }
];

// Parking types - values match database constraints
export const parkingTypes = [
  { label: "Garage", value: "garage" },
  { label: "Private Garage", value: "private_garage" },
  { label: "Open Parking", value: "open_parking" },
  { label: "Closed Parking", value: "closed_parking" },
  { label: "Street Parking", value: "street_parking" },
  { label: "No Parking", value: "no_parking" }
];

// Title status types
export const titleStatusTypes = ["Title Deed (Tapu)", "Floor Easement (Kat İrtifakı)", "Land Registry"];

// Interior features
export const interiorFeatures = [
  "Internet infrastructure ready",
  "Washing machine",
  "TV",
  "Bed and wardrobe",
  "Steel entrance door",
  "Air conditioning",
  "Dishwasher",
  "Microwave",
  "Refrigerator",
  "WiFi",
  "Balcony",
  "Parking",
  "Security",
  "Elevator"
];

// Realistic Istanbul property data
export const properties = [
  {
    id: 1,
    image: "/Hero.png",
    location: "Kadıköy",
    price: "₺8,500/mo",
    rooms: "2+0",
    university: "Marmara University",
    area: "Kadıköy",
    link: "/property/1",
    lat: 40.9916,
    lng: 29.0256,

    // Form fields that match PropertyForm structure
    title: "Modern 2+0 Apartment Near Marmara University",
    googleMapsAddress: "https://maps.google.com/?q=Kad%C4%B1k%C3%B6y,Istanbul",
    city: "Istanbul",
    district: "Kadıköy",
    neighborhood: "Moda Mahallesi",
    fullAddress: "Moda Cad. No:123, Moda Mahallesi, Kadıköy/Istanbul",

    // Property Overview
    propertyType: "Apartment for Rent",
    grossArea: 65,
    netArea: 55,
    buildingAge: 5,
    floor: 3,
    totalFloors: 8,
    heating: "Central Heating",
    bathrooms: 1,
    kitchen: "Separate",

    // Financial Details
    deposit: 5000,
    bills: 800,

    // Contact Information
    contactName: "Ahmet Yılmaz",
    contactEmail: "ahmet.yilmaz@email.com",
    contactPhone: "+90 537 123 45 67",

    // Property Features
    inComplex: false,
    elevator: true,
    balcony: true,
    garden: false,
    furnished: true,
    smokingAllowed: false,

    // Community Amenities (matches form options)
    amenities: ["🏋️ Gym/Fitness Center", "🌳 Garden/Green Area"],

    // Interior Features (matches form options)
    interiorFeatures: ["📺 TV", "📶 WiFi", "❄️ Air Conditioning", "Washing machine"],

    // Description from form
    description: "Beautiful modern apartment in the heart of Kadıköy, just 10 minutes walk to Marmara University. The apartment is fully furnished with modern amenities and located in a safe, student-friendly neighborhood. Close to shops, restaurants, and public transportation.",

    // Legacy fields for backward compatibility
    availability: "Vacant (Ready to Move In)",
    titleStatus: "Title Deed (Tapu)",
    parking: "Street Parking"
  },
  {
    id: 2,
    image: "/Hero.png",
    location: "Beşiktaş",
    price: "₺12,000/mo",
    rooms: "3+1",
    university: "Boğaziçi University",
    area: "Beşiktaş",
    link: "/property/2",
    lat: 41.0420,
    lng: 29.0094,

    // Form fields
    title: "Luxury 3+1 Apartment Close to Boğaziçi University",
    googleMapsAddress: "https://maps.google.com/?q=Be%C5%9Fikta%C5%9F,Istanbul",
    city: "Istanbul",
    district: "Beşiktaş",
    neighborhood: "Etiler Mahallesi",
    fullAddress: "Etiler Cad. No:456, Etiler Mahallesi, Beşiktaş/Istanbul",

    propertyType: "Apartment for Rent",
    grossArea: 110,
    netArea: 95,
    buildingAge: 2,
    floor: 5,
    totalFloors: 12,
    heating: "Combi Boiler",
    bathrooms: 2,
    kitchen: "Open (American style)",

    deposit: 8000,
    bills: 1200,

    contactName: "Elif Demir",
    contactEmail: "elif.demir@email.com",
    contactPhone: "+90 532 987 65 43",

    inComplex: true,
    elevator: true,
    balcony: true,
    garden: true,
    furnished: true,
    smokingAllowed: false,

    amenities: ["🏋️ Gym/Fitness Center", "🏊 Swimming Pool", "🌳 Garden/Green Area"],
    interiorFeatures: ["📺 TV", "📶 WiFi", "❄️ Air Conditioning", "🍽️ Dishwasher", "Washing machine"],

    description: "Stunning luxury apartment in prestigious Etiler district. Modern complex with full amenities including gym, pool, and garden. Perfect for students who want comfort and style. Easy access to Boğaziçi University and city center.",

    availability: "Vacant (Ready to Move In)",
    titleStatus: "Title Deed (Tapu)",
    parking: "Closed Parking"
  },
];