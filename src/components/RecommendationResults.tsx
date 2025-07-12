
import { useState, useEffect } from "react";
import { ArrowLeft, Star, Users, MapPin, Clock, DollarSign, Sparkles, TrendingUp, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Background decorative elements - reduced on mobile */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-2xl md:blur-3xl floating-animation"></div>
          <div className="absolute top-3/4 right-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="text-center animate-fade-in-up px-4">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-lg opacity-30"></div>
            <div className="relative bg-gradient-to-br from-orange-100 to-red-100 p-4 md:p-6 rounded-full">
              <Loader2 className="h-8 w-8 md:h-12 md:w-12 text-gradient animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-gray-900">
            Analyzing <span className="text-gradient">{city}</span>...
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">Finding the best and worst spots for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background decorative elements - reduced on mobile */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-2xl md:blur-3xl floating-animation"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="px-4 py-8 md:py-12 max-w-7xl mx-auto animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center mb-8 md:mb-10">
          <Button 
            variant="ghost" 
            onClick={onNewSearch}
            className="mr-0 md:mr-6 mb-4 md:mb-0 hover:bg-white/80 glass-effect rounded-xl w-fit"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            New Search
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-2">
              Recommendations for <span className="text-gradient">{city}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">Smart analysis of local dining options</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 md:mb-10 glass-effect p-1">
            <TabsTrigger value="overview" className="flex items-center gap-1 md:gap-2 data-[state=active]:bg-white data-[state=active]:shadow-soft transition-all duration-300 text-xs md:text-sm">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">All</span>
            </TabsTrigger>
            <TabsTrigger value="avoid" className="flex items-center gap-1 md:gap-2 data-[state=active]:bg-white data-[state=active]:shadow-soft transition-all duration-300 text-xs md:text-sm">
              <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Avoid</span>
              <span className="sm:hidden">Skip</span>
            </TabsTrigger>
            <TabsTrigger value="visit" className="flex items-center gap-1 md:gap-2 data-[state=active]:bg-white data-[state=active]:shadow-soft transition-all duration-300 text-xs md:text-sm">
              <Heart className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Visit</span>
              <span className="sm:hidden">Go</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            <div className="animate-fade-in-up">
              <div className="flex flex-col md:flex-row md:items-center mb-6 md:mb-8">
                <div className="relative mb-4 md:mb-0 md:mr-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-xl blur-md opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-red-100 to-red-200 p-2 md:p-3 rounded-xl">
                    <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <Badge variant="destructive" className="mb-2">Avoid</Badge>
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900">Potential Tourist Traps</h2>
                </div>
              </div>
              <div className="space-y-4 md:space-y-6">
                {touristTraps.slice(0, 3).map((restaurant, index) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} compact style={{ animationDelay: `${index * 0.1}s` }} />
                ))}
              </div>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col md:flex-row md:items-center mb-6 md:mb-8">
                <div className="relative mb-4 md:mb-0 md:mr-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-xl blur-md opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-green-100 to-green-200 p-2 md:p-3 rounded-xl">
                    <Heart className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <Badge className="bg-green-500 hover:bg-green-600 mb-2">Visit</Badge>
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-900">Hidden Gems</h2>
                </div>
              </div>
              <div className="space-y-4 md:space-y-6">
                {hiddenGems.slice(0, 3).map((restaurant, index) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} compact style={{ animationDelay: `${index * 0.1}s` }} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="avoid" className="animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {touristTraps.map((restaurant, index) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} style={{ animationDelay: `${index * 0.1}s` }} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="visit" className="animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {hiddenGems.map((restaurant, index) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} style={{ animationDelay: `${index * 0.1}s` }} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface RestaurantCardProps {
  restaurant: Restaurant;
  compact?: boolean;
  style?: React.CSSProperties;
}

const RestaurantCard = ({ restaurant, compact = false, style }: RestaurantCardProps) => {
  return (
    <Card className={`glass-card overflow-hidden hover:scale-105 transition-all duration-300 animate-fade-in-up ${compact ? 'p-4 md:p-6' : 'p-0'}`} style={style}>
      {!compact && (
        <div className="h-32 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-red-200/20"></div>
          <span className="text-gray-500 relative z-10 text-sm md:text-base">Restaurant Image</span>
        </div>
      )}
      
      <div className={compact ? '' : 'p-4 md:p-6'}>
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-lg md:text-xl mb-1 md:mb-2 text-gray-900">{restaurant.name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">{restaurant.cuisine}</p>
          </div>
          <Badge 
            variant={restaurant.authenticity === "tourist-trap" ? "destructive" : "default"}
            className={`${restaurant.authenticity === "hidden-gem" ? "bg-green-500 hover:bg-green-600" : ""} shadow-soft text-xs`}
          >
            {restaurant.authenticity === "tourist-trap" ? "Avoid" : "Visit"}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm">
          <div className="flex items-center bg-yellow-50 px-2 md:px-3 py-1 rounded-lg">
            <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium text-yellow-700">{restaurant.rating}</span>
          </div>
          <div className="flex items-center text-muted-foreground bg-gray-50 px-2 md:px-3 py-1 rounded-lg">
            <Users className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span>{restaurant.reviewCount} reviews</span>
          </div>
          <div className="flex items-center text-muted-foreground bg-gray-50 px-2 md:px-3 py-1 rounded-lg">
            <DollarSign className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span>{restaurant.priceRange}</span>
          </div>
        </div>

        {restaurant.waitTime && (
          <div className="flex items-center text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 bg-blue-50 px-2 md:px-3 py-1 rounded-lg w-fit">
            <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            <span>Wait: {restaurant.waitTime}</span>
          </div>
        )}

        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 leading-relaxed">{restaurant.description}</p>

        <div className="flex items-center text-xs md:text-sm text-muted-foreground bg-gray-50 px-2 md:px-3 py-1.5 md:py-2 rounded-lg">
          <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-orange-500" />
          <span>{restaurant.address}</span>
        </div>
      </div>
    </Card>
  );
};
