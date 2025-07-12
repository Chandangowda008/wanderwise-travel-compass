export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  description: string;
  image: string;
  rating: number;
  priceRange: 'Budget' | 'Mid-range' | 'Luxury';
  bestTimeToVisit: string[];
  attractions: string[];
  cuisine: string[];
  activities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  climate: string;
  language: string[];
  currency: string;
  timezone: string;
  safetyLevel: 'Low' | 'Medium' | 'High';
  visaRequired: boolean;
  avgTemperature: {
    summer: number;
    winter: number;
  };
}

export interface TravelTip {
  id: string;
  destination: string;
  category: 'Transportation' | 'Accommodation' | 'Food' | 'Culture' | 'Safety' | 'Budget';
  title: string;
  content: string;
  importance: 'Low' | 'Medium' | 'High';
}

export const worldDestinations: Destination[] = [
  // Asia
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    description: 'A fascinating blend of ultramodern and traditional, Tokyo offers everything from neon-lit skyscrapers to ancient temples.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    rating: 4.8,
    priceRange: 'Mid-range',
    bestTimeToVisit: ['March-May', 'September-November'],
    attractions: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree', 'Tsukiji Fish Market', 'Meiji Shrine'],
    cuisine: ['Sushi', 'Ramen', 'Tempura', 'Sashimi', 'Bento'],
    activities: ['Visit temples', 'Shopping in Harajuku', 'Cherry blossom viewing', 'Robot restaurant', 'Hot springs'],
    coordinates: { lat: 35.6762, lng: 139.6503 },
    climate: 'Temperate',
    language: ['Japanese'],
    currency: 'JPY',
    timezone: 'Asia/Tokyo',
    safetyLevel: 'High',
    visaRequired: false,
    avgTemperature: { summer: 25, winter: 5 }
  },
  {
    id: 'bangkok-thailand',
    name: 'Bangkok',
    country: 'Thailand',
    continent: 'Asia',
    description: 'Thailand\'s bustling capital is known for its vibrant street life, cultural landmarks, and delicious street food.',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c079365?w=800',
    rating: 4.6,
    priceRange: 'Budget',
    bestTimeToVisit: ['November-February'],
    attractions: ['Grand Palace', 'Wat Phra Kaew', 'Chatuchak Market', 'Khao San Road', 'Wat Arun'],
    cuisine: ['Pad Thai', 'Tom Yum', 'Green Curry', 'Mango Sticky Rice', 'Street Food'],
    activities: ['Temple hopping', 'Street food tour', 'Floating markets', 'Thai massage', 'Night markets'],
    coordinates: { lat: 13.7563, lng: 100.5018 },
    climate: 'Tropical',
    language: ['Thai'],
    currency: 'THB',
    timezone: 'Asia/Bangkok',
    safetyLevel: 'Medium',
    visaRequired: false,
    avgTemperature: { summer: 30, winter: 25 }
  },
  {
    id: 'singapore-singapore',
    name: 'Singapore',
    country: 'Singapore',
    continent: 'Asia',
    description: 'A modern city-state known for its multicultural heritage, futuristic architecture, and world-class attractions.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
    rating: 4.7,
    priceRange: 'Luxury',
    bestTimeToVisit: ['February-April', 'July-September'],
    attractions: ['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Chinatown', 'Little India'],
    cuisine: ['Hainanese Chicken Rice', 'Laksa', 'Chili Crab', 'Satay', 'Kaya Toast'],
    activities: ['Visit Universal Studios', 'Night Safari', 'Shopping on Orchard Road', 'Clarke Quay', 'Botanic Gardens'],
    coordinates: { lat: 1.3521, lng: 103.8198 },
    climate: 'Tropical',
    language: ['English', 'Mandarin', 'Malay', 'Tamil'],
    currency: 'SGD',
    timezone: 'Asia/Singapore',
    safetyLevel: 'High',
    visaRequired: false,
    avgTemperature: { summer: 30, winter: 25 }
  },

  // Europe
  {
    id: 'paris-france',
    name: 'Paris',
    country: 'France',
    continent: 'Europe',
    description: 'The City of Light offers world-class art, fashion, gastronomy, and culture with iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1502602898535-0bdb3d77b2e8?w=800',
    rating: 4.9,
    priceRange: 'Luxury',
    bestTimeToVisit: ['April-June', 'September-October'],
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Arc de Triomphe', 'Champs-Élysées'],
    cuisine: ['Croissants', 'Escargot', 'Coq au Vin', 'Ratatouille', 'Macarons'],
    activities: ['Museum visits', 'Seine River cruise', 'Shopping', 'Wine tasting', 'Café culture'],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    climate: 'Temperate',
    language: ['French'],
    currency: 'EUR',
    timezone: 'Europe/Paris',
    safetyLevel: 'High',
    visaRequired: false,
    avgTemperature: { summer: 20, winter: 5 }
  },
  {
    id: 'rome-italy',
    name: 'Rome',
    country: 'Italy',
    continent: 'Europe',
    description: 'The Eternal City is a living museum with ancient ruins, Renaissance art, and vibrant street life.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    rating: 4.8,
    priceRange: 'Mid-range',
    bestTimeToVisit: ['April-June', 'September-October'],
    attractions: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Pantheon', 'Roman Forum'],
    cuisine: ['Pizza', 'Pasta', 'Gelato', 'Espresso', 'Tiramisu'],
    activities: ['Historical tours', 'Art galleries', 'Wine tasting', 'Shopping', 'Gelato tasting'],
    coordinates: { lat: 41.9028, lng: 12.4964 },
    climate: 'Mediterranean',
    language: ['Italian'],
    currency: 'EUR',
    timezone: 'Europe/Rome',
    safetyLevel: 'High',
    visaRequired: false,
    avgTemperature: { summer: 25, winter: 10 }
  },
  {
    id: 'barcelona-spain',
    name: 'Barcelona',
    country: 'Spain',
    continent: 'Europe',
    description: 'A vibrant city known for its unique architecture, beautiful beaches, and rich Catalan culture.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
    rating: 4.7,
    priceRange: 'Mid-range',
    bestTimeToVisit: ['May-June', 'September-October'],
    attractions: ['Sagrada Familia', 'Park Güell', 'La Rambla', 'Gothic Quarter', 'Casa Batlló'],
    cuisine: ['Paella', 'Tapas', 'Sangria', 'Jamón', 'Churros'],
    activities: ['Architecture tours', 'Beach activities', 'Flamenco shows', 'Wine tasting', 'Shopping'],
    coordinates: { lat: 41.3851, lng: 2.1734 },
    climate: 'Mediterranean',
    language: ['Spanish', 'Catalan'],
    currency: 'EUR',
    timezone: 'Europe/Madrid',
    safetyLevel: 'High',
    visaRequired: false,
    avgTemperature: { summer: 25, winter: 10 }
  },

  // North America
  {
    id: 'new-york-usa',
    name: 'New York City',
    country: 'USA',
    continent: 'North America',
    description: 'The Big Apple offers world-class entertainment, diverse culture, and iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    rating: 4.8,
    priceRange: 'Luxury',
    bestTimeToVisit: ['April-June', 'September-November'],
    attractions: ['Statue of Liberty', 'Times Square', 'Central Park', 'Empire State Building', 'Broadway'],
    cuisine: ['Pizza', 'Hot Dogs', 'Bagels', 'Cheesecake', 'Street Food'],
    activities: ['Broadway shows', 'Museum visits', 'Shopping', 'Food tours', 'Walking tours'],
    coordinates: { lat: 40.7128, lng: -74.0060 },
    climate: 'Temperate',
    language: ['English'],
    currency: 'USD',
    timezone: 'America/New_York',
    safetyLevel: 'High',
    visaRequired: true,
    avgTemperature: { summer: 25, winter: 0 }
  },
  {
    id: 'san-francisco-usa',
    name: 'San Francisco',
    country: 'USA',
    continent: 'North America',
    description: 'A hilly city known for its iconic Golden Gate Bridge, cable cars, and tech innovation.',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
    rating: 4.6,
    priceRange: 'Luxury',
    bestTimeToVisit: ['September-November'],
    attractions: ['Golden Gate Bridge', 'Alcatraz', 'Fisherman\'s Wharf', 'Chinatown', 'Pier 39'],
    cuisine: ['Sourdough Bread', 'Dungeness Crab', 'Mission Burritos', 'Clam Chowder', 'Wine'],
    activities: ['Cable car rides', 'Wine tasting', 'Tech tours', 'Hiking', 'Food tours'],
    coordinates: { lat: 37.7749, lng: -122.4194 },
    climate: 'Mediterranean',
    language: ['English'],
    currency: 'USD',
    timezone: 'America/Los_Angeles',
    safetyLevel: 'High',
    visaRequired: true,
    avgTemperature: { summer: 18, winter: 10 }
  },
  {
    id: 'mexico-city-mexico',
    name: 'Mexico City',
    country: 'Mexico',
    continent: 'North America',
    description: 'A vibrant metropolis with rich history, colorful culture, and world-renowned cuisine.',
    image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800',
    rating: 4.5,
    priceRange: 'Budget',
    bestTimeToVisit: ['March-May', 'October-November'],
    attractions: ['Zócalo', 'Frida Kahlo Museum', 'Teotihuacan', 'Chapultepec Castle', 'Xochimilco'],
    cuisine: ['Tacos', 'Mole', 'Guacamole', 'Churros', 'Mezcal'],
    activities: ['Historical tours', 'Food tours', 'Art galleries', 'Floating gardens', 'Lucha libre'],
    coordinates: { lat: 19.4326, lng: -99.1332 },
    climate: 'Subtropical',
    language: ['Spanish'],
    currency: 'MXN',
    timezone: 'America/Mexico_City',
    safetyLevel: 'Medium',
    visaRequired: false,
    avgTemperature: { summer: 25, winter: 15 }
  },

  // South America
  {
    id: 'rio-de-janeiro-brazil',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    continent: 'South America',
    description: 'Famous for its stunning beaches, Carnival celebrations, and the iconic Christ the Redeemer statue.',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
    rating: 4.6,
    priceRange: 'Mid-range',
    bestTimeToVisit: ['March-May', 'September-November'],
    attractions: ['Christ the Redeemer', 'Copacabana Beach', 'Sugarloaf Mountain', 'Ipanema Beach', 'Carnival'],
    cuisine: ['Feijoada', 'Churrasco', 'Caipirinha', 'Pão de Queijo', 'Açaí'],
    activities: ['Beach activities', 'Hiking', 'Samba dancing', 'Carnival', 'Favela tours'],
    coordinates: { lat: -22.9068, lng: -43.1729 },
    climate: 'Tropical',
    language: ['Portuguese'],
    currency: 'BRL',
    timezone: 'America/Sao_Paulo',
    safetyLevel: 'Medium',
    visaRequired: false,
    avgTemperature: { summer: 30, winter: 20 }
  },
  {
    id: 'machu-picchu-peru',
    name: 'Machu Picchu',
    country: 'Peru',
    continent: 'South America',
    description: 'The ancient Incan citadel set high in the Andes Mountains is one of the world\'s most impressive archaeological sites.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
    rating: 4.9,
    priceRange: 'Mid-range',
    bestTimeToVisit: ['April-October'],
    attractions: ['Inca Trail', 'Sacred Valley', 'Cusco', 'Rainbow Mountain', 'Lima'],
    cuisine: ['Ceviche', 'Lomo Saltado', 'Pisco Sour', 'Quinoa', 'Alpaca'],
    activities: ['Hiking', 'Archaeological tours', 'Cultural experiences', 'Photography', 'Adventure sports'],
    coordinates: { lat: -13.1631, lng: -72.5450 },
    climate: 'Highland',
    language: ['Spanish', 'Quechua'],
    currency: 'PEN',
    timezone: 'America/Lima',
    safetyLevel: 'Medium',
    visaRequired: false,
    avgTemperature: { summer: 20, winter: 15 }
  },

  // Africa
  {
    id: 'cape-town-south-africa',
    name: 'Cape Town',
    country: 'South Africa',
    continent: 'Africa',
    description: 'A stunning coastal city with Table Mountain, beautiful beaches, and rich cultural heritage.',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
    rating: 4.7,
    priceRange: 'Mid-range',
    bestTimeToVisit: ['March-May', 'September-November'],
    attractions: ['Table Mountain', 'Robben Island', 'Cape of Good Hope', 'V&A Waterfront', 'Kirstenbosch Gardens'],
    cuisine: ['Braai', 'Bobotie', 'Biltong', 'Malva Pudding', 'Wine'],
    activities: ['Mountain hiking', 'Wine tasting', 'Beach activities', 'Wildlife safaris', 'Cultural tours'],
    coordinates: { lat: -33.9249, lng: 18.4241 },
    climate: 'Mediterranean',
    language: ['English', 'Afrikaans', 'Xhosa'],
    currency: 'ZAR',
    timezone: 'Africa/Johannesburg',
    safetyLevel: 'Medium',
    visaRequired: false,
    avgTemperature: { summer: 25, winter: 15 }
  },
  {
    id: 'marrakech-morocco',
    name: 'Marrakech',
    country: 'Morocco',
    continent: 'Africa',
    description: 'A magical city with bustling souks, stunning palaces, and the vibrant Jemaa el-Fnaa square.',
    image: 'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?w=800',
    rating: 4.5,
    priceRange: 'Budget',
    bestTimeToVisit: ['March-May', 'September-November'],
    attractions: ['Jemaa el-Fnaa', 'Medina', 'Bahia Palace', 'Majorelle Gardens', 'Atlas Mountains'],
    cuisine: ['Tagine', 'Couscous', 'Mint Tea', 'Pastilla', 'Harira'],
    activities: ['Souk shopping', 'Hammam spa', 'Desert tours', 'Cooking classes', 'Palace visits'],
    coordinates: { lat: 31.6295, lng: -7.9811 },
    climate: 'Desert',
    language: ['Arabic', 'French'],
    currency: 'MAD',
    timezone: 'Africa/Casablanca',
    safetyLevel: 'Medium',
    visaRequired: false,
    avgTemperature: { summer: 35, winter: 15 }
  },

  // Oceania
  {
    id: 'sydney-australia',
    name: 'Sydney',
    country: 'Australia',
    continent: 'Oceania',
    description: 'Australia\'s largest city is famous for its iconic Opera House, beautiful harbor, and laid-back lifestyle.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    rating: 4.8,
    priceRange: 'Luxury',
    bestTimeToVisit: ['September-November', 'March-May'],
    attractions: ['Sydney Opera House', 'Bondi Beach', 'Harbor Bridge', 'Darling Harbor', 'Blue Mountains'],
    cuisine: ['Meat Pies', 'Vegemite', 'Tim Tams', 'Barramundi', 'Wine'],
    activities: ['Beach activities', 'Harbor cruises', 'Hiking', 'Surfing', 'Wine tasting'],
    coordinates: { lat: -33.8688, lng: 151.2093 },
    climate: 'Temperate',
    language: ['English'],
    currency: 'AUD',
    timezone: 'Australia/Sydney',
    safetyLevel: 'High',
    visaRequired: true,
    avgTemperature: { summer: 25, winter: 15 }
  },
  {
    id: 'queenstown-new-zealand',
    name: 'Queenstown',
    country: 'New Zealand',
    continent: 'Oceania',
    description: 'The adventure capital of the world offers stunning landscapes and thrilling outdoor activities.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    rating: 4.7,
    priceRange: 'Mid-range',
    bestTimeToVisit: ['December-February', 'June-August'],
    attractions: ['Milford Sound', 'Arrowtown', 'Wanaka', 'Fiordland National Park', 'Lake Wakatipu'],
    cuisine: ['Lamb', 'Hangi', 'Pavlova', 'Fish & Chips', 'Wine'],
    activities: ['Bungee jumping', 'Skiing', 'Hiking', 'Wine tasting', 'Scenic flights'],
    coordinates: { lat: -45.0312, lng: 168.6626 },
    climate: 'Temperate',
    language: ['English', 'Māori'],
    currency: 'NZD',
    timezone: 'Pacific/Auckland',
    safetyLevel: 'High',
    visaRequired: true,
    avgTemperature: { summer: 20, winter: 5 }
  }
];

export const travelTips: TravelTip[] = [
  {
    id: 'tip-1',
    destination: 'Tokyo',
    category: 'Transportation',
    title: 'Get a Japan Rail Pass',
    content: 'If you\'re planning to visit multiple cities, the Japan Rail Pass offers unlimited travel on JR trains and can save you significant money.',
    importance: 'High'
  },
  {
    id: 'tip-2',
    destination: 'Bangkok',
    category: 'Food',
    title: 'Try Street Food Safely',
    content: 'Street food is delicious and safe in Bangkok. Look for vendors with high turnover and clean cooking practices.',
    importance: 'Medium'
  },
  {
    id: 'tip-3',
    destination: 'Paris',
    category: 'Culture',
    title: 'Learn Basic French Phrases',
    content: 'Locals appreciate when visitors make an effort to speak French. Learn basic greetings and thank you phrases.',
    importance: 'Medium'
  },
  {
    id: 'tip-4',
    destination: 'New York City',
    category: 'Transportation',
    title: 'Use the Subway',
    content: 'The NYC subway is the most efficient way to get around. Get a MetroCard and avoid traffic congestion.',
    importance: 'High'
  },
  {
    id: 'tip-5',
    destination: 'Rio de Janeiro',
    category: 'Safety',
    title: 'Stay in Safe Areas',
    content: 'Stick to well-lit, tourist-friendly areas, especially at night. Avoid displaying expensive items.',
    importance: 'High'
  },
  {
    id: 'tip-6',
    destination: 'Cape Town',
    category: 'Accommodation',
    title: 'Book in Advance',
    content: 'Cape Town is popular year-round. Book your accommodation at least 3-6 months in advance for the best rates.',
    importance: 'Medium'
  },
  {
    id: 'tip-7',
    destination: 'Sydney',
    category: 'Budget',
    title: 'Use Public Transport',
    content: 'Sydney\'s public transport system is excellent and much cheaper than taxis. Get an Opal card for convenience.',
    importance: 'High'
  },
  {
    id: 'tip-8',
    destination: 'Marrakech',
    category: 'Culture',
    title: 'Respect Local Customs',
    content: 'Dress modestly, especially when visiting religious sites. Ask permission before taking photos of people.',
    importance: 'High'
  }
];

export const getDestinationsByContinent = (continent: string): Destination[] => {
  return worldDestinations.filter(dest => dest.continent === continent);
};

export const getDestinationsByBudget = (budget: string): Destination[] => {
  return worldDestinations.filter(dest => dest.priceRange === budget);
};

export const getDestinationsByClimate = (climate: string): Destination[] => {
  return worldDestinations.filter(dest => dest.climate === climate);
};

export const searchDestinations = (query: string): Destination[] => {
  const lowercaseQuery = query.toLowerCase();
  return worldDestinations.filter(dest => 
    dest.name.toLowerCase().includes(lowercaseQuery) ||
    dest.country.toLowerCase().includes(lowercaseQuery) ||
    dest.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRandomDestinations = (count: number): Destination[] => {
  const shuffled = [...worldDestinations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getDestinationsByRating = (minRating: number): Destination[] => {
  return worldDestinations.filter(dest => dest.rating >= minRating);
}; 