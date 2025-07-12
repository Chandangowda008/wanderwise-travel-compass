-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  travel_preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create travel destinations table
CREATE TABLE public.destinations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT,
  coordinates JSONB,
  safety_rating INTEGER CHECK (safety_rating >= 1 AND safety_rating <= 5),
  best_time_to_visit TEXT,
  average_cost_per_day DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create itineraries table
CREATE TABLE public.itineraries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  destination_id UUID REFERENCES public.destinations(id),
  start_date DATE,
  end_date DATE,
  budget DECIMAL(10,2),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create budget tracking table
CREATE TABLE public.budget_expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  itinerary_id UUID REFERENCES public.itineraries(id),
  category TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  expense_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create travel recommendations table
CREATE TABLE public.travel_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  destination_id UUID REFERENCES public.destinations(id),
  recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('restaurant', 'attraction', 'hotel', 'activity')),
  title TEXT NOT NULL,
  description TEXT,
  rating DECIMAL(3,2),
  price_range TEXT,
  coordinates JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create local alerts table
CREATE TABLE public.local_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  destination_id UUID REFERENCES public.destinations(id),
  alert_type TEXT NOT NULL CHECK (alert_type IN ('weather', 'safety', 'transport', 'health')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high')),
  active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create travel analytics table
CREATE TABLE public.travel_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  metric_type TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_alerts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

-- Create RLS policies for itineraries
CREATE POLICY "Users can view their own itineraries" 
ON public.itineraries 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own itineraries" 
ON public.itineraries 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own itineraries" 
ON public.itineraries 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own itineraries" 
ON public.itineraries 
FOR DELETE 
USING (auth.uid()::text = user_id::text);

-- Create RLS policies for budget expenses
CREATE POLICY "Users can view their own expenses" 
ON public.budget_expenses 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own expenses" 
ON public.budget_expenses 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own expenses" 
ON public.budget_expenses 
FOR UPDATE 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own expenses" 
ON public.budget_expenses 
FOR DELETE 
USING (auth.uid()::text = user_id::text);

-- Create RLS policies for travel recommendations
CREATE POLICY "Users can view their own recommendations" 
ON public.travel_recommendations 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own recommendations" 
ON public.travel_recommendations 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

-- Create RLS policies for travel analytics
CREATE POLICY "Users can view their own analytics" 
ON public.travel_analytics 
FOR SELECT 
USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own analytics" 
ON public.travel_analytics 
FOR INSERT 
WITH CHECK (auth.uid()::text = user_id::text);

-- Public read access for destinations and alerts
CREATE POLICY "Anyone can view destinations" 
ON public.destinations 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can view active alerts" 
ON public.local_alerts 
FOR SELECT 
USING (active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_itineraries_updated_at
  BEFORE UPDATE ON public.itineraries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample destinations data
INSERT INTO public.destinations (name, country, description, coordinates, safety_rating, best_time_to_visit, average_cost_per_day) VALUES
('Paris', 'France', 'The City of Light, known for its art, fashion, and culture', '{"lat": 48.8566, "lng": 2.3522}', 4, 'April to June, September to October', 150.00),
('Tokyo', 'Japan', 'A vibrant metropolis blending traditional and modern culture', '{"lat": 35.6762, "lng": 139.6503}', 5, 'March to May, September to November', 200.00),
('Bali', 'Indonesia', 'Tropical paradise with beautiful beaches and temples', '{"lat": -8.4095, "lng": 115.1889}', 4, 'April to October', 75.00),
('New York', 'USA', 'The Big Apple, a global hub for business, arts, and culture', '{"lat": 40.7128, "lng": -74.0060}', 3, 'April to June, September to November', 250.00),
('Rome', 'Italy', 'The Eternal City, rich in history and ancient architecture', '{"lat": 41.9028, "lng": 12.4964}', 4, 'April to June, September to October', 120.00);

-- Insert sample local alerts
INSERT INTO public.local_alerts (destination_id, alert_type, title, message, severity, expires_at) VALUES
((SELECT id FROM public.destinations WHERE name = 'Paris'), 'transport', 'Metro Strike', 'Public transportation delays expected due to worker strikes', 'medium', now() + interval '7 days'),
((SELECT id FROM public.destinations WHERE name = 'Tokyo'), 'weather', 'Typhoon Warning', 'Severe weather conditions expected this weekend', 'high', now() + interval '3 days'),
((SELECT id FROM public.destinations WHERE name = 'Bali'), 'health', 'Dengue Fever Alert', 'Increased cases of dengue fever reported. Use mosquito repellent', 'medium', now() + interval '30 days');