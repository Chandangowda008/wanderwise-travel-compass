-- Create world_destinations table
CREATE TABLE IF NOT EXISTS world_destinations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    continent TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    rating DECIMAL(2,1),
    price_range TEXT CHECK (price_range IN ('Budget', 'Mid-range', 'Luxury')),
    best_time_to_visit TEXT[],
    attractions TEXT[],
    cuisine TEXT[],
    activities TEXT[],
    coordinates JSONB,
    climate TEXT,
    languages TEXT[],
    currency TEXT,
    timezone TEXT,
    safety_level TEXT CHECK (safety_level IN ('Low', 'Medium', 'High')),
    visa_required BOOLEAN DEFAULT false,
    avg_temperature JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create travel_tips table
CREATE TABLE IF NOT EXISTS travel_tips (
    id TEXT PRIMARY KEY,
    destination_name TEXT NOT NULL,
    category TEXT CHECK (category IN ('Transportation', 'Accommodation', 'Food', 'Culture', 'Safety', 'Budget')),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    importance TEXT CHECK (importance IN ('Low', 'Medium', 'High')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_favorites table for saving destinations
CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    destination_id TEXT REFERENCES world_destinations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, destination_id)
);

-- Create user_visited_destinations table
CREATE TABLE IF NOT EXISTS user_visited_destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    destination_id TEXT REFERENCES world_destinations(id) ON DELETE CASCADE,
    visit_date DATE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_world_destinations_continent ON world_destinations(continent);
CREATE INDEX IF NOT EXISTS idx_world_destinations_price_range ON world_destinations(price_range);
CREATE INDEX IF NOT EXISTS idx_world_destinations_climate ON world_destinations(climate);
CREATE INDEX IF NOT EXISTS idx_world_destinations_rating ON world_destinations(rating);
CREATE INDEX IF NOT EXISTS idx_travel_tips_destination ON travel_tips(destination_name);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_visited_user_id ON user_visited_destinations(user_id);

-- Insert world destinations data
INSERT INTO world_destinations (id, name, country, continent, description, image_url, rating, price_range, best_time_to_visit, attractions, cuisine, activities, coordinates, climate, languages, currency, timezone, safety_level, visa_required, avg_temperature) VALUES
-- Asia
('tokyo-japan', 'Tokyo', 'Japan', 'Asia', 'A fascinating blend of ultramodern and traditional, Tokyo offers everything from neon-lit skyscrapers to ancient temples.', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', 4.8, 'Mid-range', ARRAY['March-May', 'September-November'], ARRAY['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree', 'Tsukiji Fish Market', 'Meiji Shrine'], ARRAY['Sushi', 'Ramen', 'Tempura', 'Sashimi', 'Bento'], ARRAY['Visit temples', 'Shopping in Harajuku', 'Cherry blossom viewing', 'Robot restaurant', 'Hot springs'], '{"lat": 35.6762, "lng": 139.6503}', 'Temperate', ARRAY['Japanese'], 'JPY', 'Asia/Tokyo', 'High', false, '{"summer": 25, "winter": 5}'),

('bangkok-thailand', 'Bangkok', 'Thailand', 'Asia', 'Thailand''s bustling capital is known for its vibrant street life, cultural landmarks, and delicious street food.', 'https://images.unsplash.com/photo-1508009603885-50cf7c079365?w=800', 4.6, 'Budget', ARRAY['November-February'], ARRAY['Grand Palace', 'Wat Phra Kaew', 'Chatuchak Market', 'Khao San Road', 'Wat Arun'], ARRAY['Pad Thai', 'Tom Yum', 'Green Curry', 'Mango Sticky Rice', 'Street Food'], ARRAY['Temple hopping', 'Street food tour', 'Floating markets', 'Thai massage', 'Night markets'], '{"lat": 13.7563, "lng": 100.5018}', 'Tropical', ARRAY['Thai'], 'THB', 'Asia/Bangkok', 'Medium', false, '{"summer": 30, "winter": 25}'),

('singapore-singapore', 'Singapore', 'Singapore', 'Asia', 'A modern city-state known for its multicultural heritage, futuristic architecture, and world-class attractions.', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800', 4.7, 'Luxury', ARRAY['February-April', 'July-September'], ARRAY['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Chinatown', 'Little India'], ARRAY['Hainanese Chicken Rice', 'Laksa', 'Chili Crab', 'Satay', 'Kaya Toast'], ARRAY['Visit Universal Studios', 'Night Safari', 'Shopping on Orchard Road', 'Clarke Quay', 'Botanic Gardens'], '{"lat": 1.3521, "lng": 103.8198}', 'Tropical', ARRAY['English', 'Mandarin', 'Malay', 'Tamil'], 'SGD', 'Asia/Singapore', 'High', false, '{"summer": 30, "winter": 25}'),

-- Europe
('paris-france', 'Paris', 'France', 'Europe', 'The City of Light offers world-class art, fashion, gastronomy, and culture with iconic landmarks.', 'https://images.unsplash.com/photo-1502602898535-0bdb3d77b2e8?w=800', 4.9, 'Luxury', ARRAY['April-June', 'September-October'], ARRAY['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Arc de Triomphe', 'Champs-Élysées'], ARRAY['Croissants', 'Escargot', 'Coq au Vin', 'Ratatouille', 'Macarons'], ARRAY['Museum visits', 'Seine River cruise', 'Shopping', 'Wine tasting', 'Café culture'], '{"lat": 48.8566, "lng": 2.3522}', 'Temperate', ARRAY['French'], 'EUR', 'Europe/Paris', 'High', false, '{"summer": 20, "winter": 5}'),

('rome-italy', 'Rome', 'Italy', 'Europe', 'The Eternal City is a living museum with ancient ruins, Renaissance art, and vibrant street life.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800', 4.8, 'Mid-range', ARRAY['April-June', 'September-October'], ARRAY['Colosseum', 'Vatican City', 'Trevi Fountain', 'Pantheon', 'Roman Forum'], ARRAY['Pizza', 'Pasta', 'Gelato', 'Espresso', 'Tiramisu'], ARRAY['Historical tours', 'Art galleries', 'Wine tasting', 'Shopping', 'Gelato tasting'], '{"lat": 41.9028, "lng": 12.4964}', 'Mediterranean', ARRAY['Italian'], 'EUR', 'Europe/Rome', 'High', false, '{"summer": 25, "winter": 10}'),

('barcelona-spain', 'Barcelona', 'Spain', 'Europe', 'A vibrant city known for its unique architecture, beautiful beaches, and rich Catalan culture.', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800', 4.7, 'Mid-range', ARRAY['May-June', 'September-October'], ARRAY['Sagrada Familia', 'Park Güell', 'La Rambla', 'Gothic Quarter', 'Casa Batlló'], ARRAY['Paella', 'Tapas', 'Sangria', 'Jamón', 'Churros'], ARRAY['Architecture tours', 'Beach activities', 'Flamenco shows', 'Wine tasting', 'Shopping'], '{"lat": 41.3851, "lng": 2.1734}', 'Mediterranean', ARRAY['Spanish', 'Catalan'], 'EUR', 'Europe/Madrid', 'High', false, '{"summer": 25, "winter": 10}'),

-- North America
('new-york-usa', 'New York City', 'USA', 'North America', 'The Big Apple offers world-class entertainment, diverse culture, and iconic landmarks.', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', 4.8, 'Luxury', ARRAY['April-June', 'September-November'], ARRAY['Statue of Liberty', 'Times Square', 'Central Park', 'Empire State Building', 'Broadway'], ARRAY['Pizza', 'Hot Dogs', 'Bagels', 'Cheesecake', 'Street Food'], ARRAY['Broadway shows', 'Museum visits', 'Shopping', 'Food tours', 'Walking tours'], '{"lat": 40.7128, "lng": -74.0060}', 'Temperate', ARRAY['English'], 'USD', 'America/New_York', 'High', true, '{"summer": 25, "winter": 0}'),

('san-francisco-usa', 'San Francisco', 'USA', 'North America', 'A hilly city known for its iconic Golden Gate Bridge, cable cars, and tech innovation.', 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800', 4.6, 'Luxury', ARRAY['September-November'], ARRAY['Golden Gate Bridge', 'Alcatraz', 'Fisherman''s Wharf', 'Chinatown', 'Pier 39'], ARRAY['Sourdough Bread', 'Dungeness Crab', 'Mission Burritos', 'Clam Chowder', 'Wine'], ARRAY['Cable car rides', 'Wine tasting', 'Tech tours', 'Hiking', 'Food tours'], '{"lat": 37.7749, "lng": -122.4194}', 'Mediterranean', ARRAY['English'], 'USD', 'America/Los_Angeles', 'High', true, '{"summer": 18, "winter": 10}'),

('mexico-city-mexico', 'Mexico City', 'Mexico', 'North America', 'A vibrant metropolis with rich history, colorful culture, and world-renowned cuisine.', 'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800', 4.5, 'Budget', ARRAY['March-May', 'October-November'], ARRAY['Zócalo', 'Frida Kahlo Museum', 'Teotihuacan', 'Chapultepec Castle', 'Xochimilco'], ARRAY['Tacos', 'Mole', 'Guacamole', 'Churros', 'Mezcal'], ARRAY['Historical tours', 'Food tours', 'Art galleries', 'Floating gardens', 'Lucha libre'], '{"lat": 19.4326, "lng": -99.1332}', 'Subtropical', ARRAY['Spanish'], 'MXN', 'America/Mexico_City', 'Medium', false, '{"summer": 25, "winter": 15}'),

-- South America
('rio-de-janeiro-brazil', 'Rio de Janeiro', 'Brazil', 'South America', 'Famous for its stunning beaches, Carnival celebrations, and the iconic Christ the Redeemer statue.', 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800', 4.6, 'Mid-range', ARRAY['March-May', 'September-November'], ARRAY['Christ the Redeemer', 'Copacabana Beach', 'Sugarloaf Mountain', 'Ipanema Beach', 'Carnival'], ARRAY['Feijoada', 'Churrasco', 'Caipirinha', 'Pão de Queijo', 'Açaí'], ARRAY['Beach activities', 'Hiking', 'Samba dancing', 'Carnival', 'Favela tours'], '{"lat": -22.9068, "lng": -43.1729}', 'Tropical', ARRAY['Portuguese'], 'BRL', 'America/Sao_Paulo', 'Medium', false, '{"summer": 30, "winter": 20}'),

('machu-picchu-peru', 'Machu Picchu', 'Peru', 'South America', 'The ancient Incan citadel set high in the Andes Mountains is one of the world''s most impressive archaeological sites.', 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800', 4.9, 'Mid-range', ARRAY['April-October'], ARRAY['Inca Trail', 'Sacred Valley', 'Cusco', 'Rainbow Mountain', 'Lima'], ARRAY['Ceviche', 'Lomo Saltado', 'Pisco Sour', 'Quinoa', 'Alpaca'], ARRAY['Hiking', 'Archaeological tours', 'Cultural experiences', 'Photography', 'Adventure sports'], '{"lat": -13.1631, "lng": -72.5450}', 'Highland', ARRAY['Spanish', 'Quechua'], 'PEN', 'America/Lima', 'Medium', false, '{"summer": 20, "winter": 15}'),

-- Africa
('cape-town-south-africa', 'Cape Town', 'South Africa', 'Africa', 'A stunning coastal city with Table Mountain, beautiful beaches, and rich cultural heritage.', 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800', 4.7, 'Mid-range', ARRAY['March-May', 'September-November'], ARRAY['Table Mountain', 'Robben Island', 'Cape of Good Hope', 'V&A Waterfront', 'Kirstenbosch Gardens'], ARRAY['Braai', 'Bobotie', 'Biltong', 'Malva Pudding', 'Wine'], ARRAY['Mountain hiking', 'Wine tasting', 'Beach activities', 'Wildlife safaris', 'Cultural tours'], '{"lat": -33.9249, "lng": 18.4241}', 'Mediterranean', ARRAY['English', 'Afrikaans', 'Xhosa'], 'ZAR', 'Africa/Johannesburg', 'Medium', false, '{"summer": 25, "winter": 15}'),

('marrakech-morocco', 'Marrakech', 'Morocco', 'Africa', 'A magical city with bustling souks, stunning palaces, and the vibrant Jemaa el-Fnaa square.', 'https://images.unsplash.com/photo-1553603229-0f1a5d2c735c?w=800', 4.5, 'Budget', ARRAY['March-May', 'September-November'], ARRAY['Jemaa el-Fnaa', 'Medina', 'Bahia Palace', 'Majorelle Gardens', 'Atlas Mountains'], ARRAY['Tagine', 'Couscous', 'Mint Tea', 'Pastilla', 'Harira'], ARRAY['Souk shopping', 'Hammam spa', 'Desert tours', 'Cooking classes', 'Palace visits'], '{"lat": 31.6295, "lng": -7.9811}', 'Desert', ARRAY['Arabic', 'French'], 'MAD', 'Africa/Casablanca', 'Medium', false, '{"summer": 35, "winter": 15}'),

-- Oceania
('sydney-australia', 'Sydney', 'Australia', 'Oceania', 'Australia''s largest city is famous for its iconic Opera House, beautiful harbor, and laid-back lifestyle.', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800', 4.8, 'Luxury', ARRAY['September-November', 'March-May'], ARRAY['Sydney Opera House', 'Bondi Beach', 'Harbor Bridge', 'Darling Harbor', 'Blue Mountains'], ARRAY['Meat Pies', 'Vegemite', 'Tim Tams', 'Barramundi', 'Wine'], ARRAY['Beach activities', 'Harbor cruises', 'Hiking', 'Surfing', 'Wine tasting'], '{"lat": -33.8688, "lng": 151.2093}', 'Temperate', ARRAY['English'], 'AUD', 'Australia/Sydney', 'High', true, '{"summer": 25, "winter": 15}'),

('queenstown-new-zealand', 'Queenstown', 'New Zealand', 'Oceania', 'The adventure capital of the world offers stunning landscapes and thrilling outdoor activities.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 4.7, 'Mid-range', ARRAY['December-February', 'June-August'], ARRAY['Milford Sound', 'Arrowtown', 'Wanaka', 'Fiordland National Park', 'Lake Wakatipu'], ARRAY['Lamb', 'Hangi', 'Pavlova', 'Fish & Chips', 'Wine'], ARRAY['Bungee jumping', 'Skiing', 'Hiking', 'Wine tasting', 'Scenic flights'], '{"lat": -45.0312, "lng": 168.6626}', 'Temperate', ARRAY['English', 'Māori'], 'NZD', 'Pacific/Auckland', 'High', true, '{"summer": 20, "winter": 5}');

-- Insert travel tips data
INSERT INTO travel_tips (id, destination_name, category, title, content, importance) VALUES
('tip-1', 'Tokyo', 'Transportation', 'Get a Japan Rail Pass', 'If you''re planning to visit multiple cities, the Japan Rail Pass offers unlimited travel on JR trains and can save you significant money.', 'High'),
('tip-2', 'Bangkok', 'Food', 'Try Street Food Safely', 'Street food is delicious and safe in Bangkok. Look for vendors with high turnover and clean cooking practices.', 'Medium'),
('tip-3', 'Paris', 'Culture', 'Learn Basic French Phrases', 'Locals appreciate when visitors make an effort to speak French. Learn basic greetings and thank you phrases.', 'Medium'),
('tip-4', 'New York City', 'Transportation', 'Use the Subway', 'The NYC subway is the most efficient way to get around. Get a MetroCard and avoid traffic congestion.', 'High'),
('tip-5', 'Rio de Janeiro', 'Safety', 'Stay in Safe Areas', 'Stick to well-lit, tourist-friendly areas, especially at night. Avoid displaying expensive items.', 'High'),
('tip-6', 'Cape Town', 'Accommodation', 'Book in Advance', 'Cape Town is popular year-round. Book your accommodation at least 3-6 months in advance for the best rates.', 'Medium'),
('tip-7', 'Sydney', 'Budget', 'Use Public Transport', 'Sydney''s public transport system is excellent and much cheaper than taxis. Get an Opal card for convenience.', 'High'),
('tip-8', 'Marrakech', 'Culture', 'Respect Local Customs', 'Dress modestly, especially when visiting religious sites. Ask permission before taking photos of people.', 'High');

-- Create RLS policies
ALTER TABLE world_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_visited_destinations ENABLE ROW LEVEL SECURITY;

-- World destinations: public read access
CREATE POLICY "World destinations are viewable by everyone" ON world_destinations
    FOR SELECT USING (true);

-- Travel tips: public read access
CREATE POLICY "Travel tips are viewable by everyone" ON travel_tips
    FOR SELECT USING (true);

-- User favorites: users can only see their own favorites
CREATE POLICY "Users can view their own favorites" ON user_favorites
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" ON user_favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON user_favorites
    FOR DELETE USING (auth.uid() = user_id);

-- User visited destinations: users can only see their own visited destinations
CREATE POLICY "Users can view their own visited destinations" ON user_visited_destinations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own visited destinations" ON user_visited_destinations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own visited destinations" ON user_visited_destinations
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own visited destinations" ON user_visited_destinations
    FOR DELETE USING (auth.uid() = user_id);

-- Create functions for common operations
CREATE OR REPLACE FUNCTION get_destinations_by_continent(continent_filter TEXT)
RETURNS TABLE (
    id TEXT,
    name TEXT,
    country TEXT,
    continent TEXT,
    description TEXT,
    image_url TEXT,
    rating DECIMAL(2,1),
    price_range TEXT,
    best_time_to_visit TEXT[],
    attractions TEXT[],
    cuisine TEXT[],
    activities TEXT[],
    coordinates JSONB,
    climate TEXT,
    languages TEXT[],
    currency TEXT,
    timezone TEXT,
    safety_level TEXT,
    visa_required BOOLEAN,
    avg_temperature JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        wd.id, wd.name, wd.country, wd.continent, wd.description,
        wd.image_url, wd.rating, wd.price_range, wd.best_time_to_visit,
        wd.attractions, wd.cuisine, wd.activities, wd.coordinates,
        wd.climate, wd.languages, wd.currency, wd.timezone,
        wd.safety_level, wd.visa_required, wd.avg_temperature
    FROM world_destinations wd
    WHERE wd.continent = continent_filter
    ORDER BY wd.rating DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_destinations_by_budget(budget_filter TEXT)
RETURNS TABLE (
    id TEXT,
    name TEXT,
    country TEXT,
    continent TEXT,
    description TEXT,
    image_url TEXT,
    rating DECIMAL(2,1),
    price_range TEXT,
    best_time_to_visit TEXT[],
    attractions TEXT[],
    cuisine TEXT[],
    activities TEXT[],
    coordinates JSONB,
    climate TEXT,
    languages TEXT[],
    currency TEXT,
    timezone TEXT,
    safety_level TEXT,
    visa_required BOOLEAN,
    avg_temperature JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        wd.id, wd.name, wd.country, wd.continent, wd.description,
        wd.image_url, wd.rating, wd.price_range, wd.best_time_to_visit,
        wd.attractions, wd.cuisine, wd.activities, wd.coordinates,
        wd.climate, wd.languages, wd.currency, wd.timezone,
        wd.safety_level, wd.visa_required, wd.avg_temperature
    FROM world_destinations wd
    WHERE wd.price_range = budget_filter
    ORDER BY wd.rating DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION search_destinations(search_query TEXT)
RETURNS TABLE (
    id TEXT,
    name TEXT,
    country TEXT,
    continent TEXT,
    description TEXT,
    image_url TEXT,
    rating DECIMAL(2,1),
    price_range TEXT,
    best_time_to_visit TEXT[],
    attractions TEXT[],
    cuisine TEXT[],
    activities TEXT[],
    coordinates JSONB,
    climate TEXT,
    languages TEXT[],
    currency TEXT,
    timezone TEXT,
    safety_level TEXT,
    visa_required BOOLEAN,
    avg_temperature JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        wd.id, wd.name, wd.country, wd.continent, wd.description,
        wd.image_url, wd.rating, wd.price_range, wd.best_time_to_visit,
        wd.attractions, wd.cuisine, wd.activities, wd.coordinates,
        wd.climate, wd.languages, wd.currency, wd.timezone,
        wd.safety_level, wd.visa_required, wd.avg_temperature
    FROM world_destinations wd
    WHERE 
        wd.name ILIKE '%' || search_query || '%' OR
        wd.country ILIKE '%' || search_query || '%' OR
        wd.description ILIKE '%' || search_query || '%'
    ORDER BY wd.rating DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_favorites(user_uuid UUID)
RETURNS TABLE (
    destination_id TEXT,
    destination_name TEXT,
    country TEXT,
    continent TEXT,
    image_url TEXT,
    rating DECIMAL(2,1),
    price_range TEXT,
    added_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        wd.id,
        wd.name,
        wd.country,
        wd.continent,
        wd.image_url,
        wd.rating,
        wd.price_range,
        uf.created_at
    FROM user_favorites uf
    JOIN world_destinations wd ON uf.destination_id = wd.id
    WHERE uf.user_id = user_uuid
    ORDER BY uf.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_world_destinations_updated_at
    BEFORE UPDATE ON world_destinations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 