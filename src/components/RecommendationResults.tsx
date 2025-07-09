
import { useState, useEffect } from "react";
import { ArrowLeft, Star, Users, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RecommendationResultsProps {
  city: string;
  onNewSearch: () => void;
}

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  cuisine: string;
  address: string;
  description: string;
  imageUrl: string;
  waitTime?: string;
  authenticity: "tourist-trap" | "hidden-gem";
}

export const RecommendationResults = ({ city, onNewSearch }: RecommendationResultsProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const generateMockData = () => {
      const touristTraps: Restaurant[] = [
        {
          id: "1",
          name: "Central Plaza Bistro",
          rating: 4.2,
          reviewCount: 2847,
          priceRange: "$$$",
          cuisine: "International",
          address: "123 Tourist Square",
          description: "Popular spot in the main square, often crowded with tourists.",
          imageUrl: "/api/placeholder/300/200",
          waitTime: "45-60 min",
          authenticity: "tourist-trap"
        },
        {
          id: "2",
          name: "Famous Historic Café",
          rating: 4.0,
          reviewCount: 1923,
          priceRange: "$$$$",
          cuisine: "European",
          address: "456 Heritage Street",
          description: "Historic location with premium prices and mixed service quality.",
          imageUrl: "/api/placeholder/300/200",
          waitTime: "30-45 min",
          authenticity: "tourist-trap"
        },
        {
          id: "3",
          name: "Sky View Restaurant", 
          rating: 4.3,
          reviewCount: 3241,
          priceRange: "$$$$",
          cuisine: "Fine Dining",
          address: "789 Tower Heights",
          description: "Great views but food quality doesn't match the price point.",
          imageUrl: "/api/placeholder/300/200",
          waitTime: "60-90 min",
          authenticity: "tourist-trap"
        }
      ];

      const hiddenGems: Restaurant[] = [
        {
          id: "4",
          name: "Nonna's Kitchen",
          rating: 4.8,
          reviewCount: 287,
          priceRange: "$$",
          cuisine: "Italian",
          address: "12 Via Local",
          description: "Family-run trattoria serving authentic homemade pasta.",
          imageUrl: "/api/placeholder/300/200",
          waitTime: "15-20 min",
          authenticity: "hidden-gem"
        },
        {
          id: "5",
          name: "The Neighborhood Spot",
          rating: 4.7,
          reviewCount: 156,
          priceRange: "$",
          cuisine: "Local Comfort",
          address: "34 Residential Ave",
          description: "Cozy local favorite with incredible breakfast and friendly staff.",
          imageUrl: "/api/placeholder/300/200",
          waitTime: "10-15 min",
          authenticity: "hidden-gem"
        },
        {
          id: "6",
          name: "Artisan Coffee & Bites",
          rating: 4.9,
          reviewCount: 203,
          priceRange: "$$",
          cuisine: "Café",
          address: "78 Creative Quarter",
          description: "Third-wave coffee shop with amazing pastries and local art.",
          imageUrl: "/api/placeholder/300/200",
          waitTime: "5-10 min",
          authenticity: "hidden-gem"
        }
      ];

      return [...touristTraps, ...hiddenGems];
    };

    setTimeout(() => {
      setRestaurants(generateMockData());
      setLoading(false);
    }, 1500);
  }, [city]);

  const touristTraps = restaurants.filter(r => r.authenticity === "tourist-trap");
  const hiddenGems = restaurants.filter(r => r.authenticity === "hidden-gem");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-display font-semibold mb-2">Analyzing {city}...</h2>
          <p className="text-muted-foreground">Finding the best and worst spots for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={onNewSearch}
          className="mr-4 hover:bg-white/80"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          New Search
        </Button>
        <div>
          <h1 className="text-3xl font-display font-bold">
            Recommendations for <span className="text-primary">{city}</span>
          </h1>
          <p className="text-muted-foreground">Smart analysis of local dining options</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="avoid">Avoid (Tourist Traps)</TabsTrigger>
          <TabsTrigger value="visit">Visit (Hidden Gems)</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <Badge variant="destructive" className="mr-3">Avoid</Badge>
              <h2 className="text-2xl font-display font-semibold">Potential Tourist Traps</h2>
            </div>
            <div className="space-y-4">
              {touristTraps.slice(0, 3).map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} compact />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <Badge className="bg-green-500 hover:bg-green-600 mr-3">Visit</Badge>
              <h2 className="text-2xl font-display font-semibold">Hidden Gems</h2>
            </div>
            <div className="space-y-4">
              {hiddenGems.slice(0, 3).map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} compact />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="avoid">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {touristTraps.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="visit">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {hiddenGems.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface RestaurantCardProps {
  restaurant: Restaurant;
  compact?: boolean;
}

const RestaurantCard = ({ restaurant, compact = false }: RestaurantCardProps) => {
  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${compact ? 'p-4' : 'p-0'}`}>
      {!compact && (
        <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Restaurant Image</span>
        </div>
      )}
      
      <div className={compact ? '' : 'p-6'}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-lg mb-1">{restaurant.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
          </div>
          <Badge 
            variant={restaurant.authenticity === "tourist-trap" ? "destructive" : "default"}
            className={restaurant.authenticity === "hidden-gem" ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {restaurant.authenticity === "tourist-trap" ? "Avoid" : "Visit"}
          </Badge>
        </div>

        <div className="flex items-center space-x-4 mb-3 text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium">{restaurant.rating}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            <span>{restaurant.reviewCount} reviews</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{restaurant.priceRange}</span>
          </div>
        </div>

        {restaurant.waitTime && (
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Clock className="h-4 w-4 mr-1" />
            <span>Wait: {restaurant.waitTime}</span>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-3">{restaurant.description}</p>

        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{restaurant.address}</span>
        </div>
      </div>
    </Card>
  );
};
