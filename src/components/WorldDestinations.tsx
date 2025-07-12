import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Globe, DollarSign, Thermometer, Clock, Users, Shield, Plane } from "lucide-react";
import { 
  worldDestinations, 
  travelTips, 
  Destination, 
  TravelTip,
  getDestinationsByContinent,
  getDestinationsByBudget,
  getDestinationsByClimate,
  searchDestinations,
  getRandomDestinations,
  getDestinationsByRating
} from "@/data/worldData";

export const WorldDestinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [selectedClimate, setSelectedClimate] = useState<string>("");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const continents = Array.from(new Set(worldDestinations.map(dest => dest.continent)));
  const budgets = ['Budget', 'Mid-range', 'Luxury'];
  const climates = Array.from(new Set(worldDestinations.map(dest => dest.climate)));

  const filteredDestinations = worldDestinations.filter(dest => {
    const matchesSearch = searchQuery === "" || 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesContinent = selectedContinent === "" || dest.continent === selectedContinent;
    const matchesBudget = selectedBudget === "" || dest.priceRange === selectedBudget;
    const matchesClimate = selectedClimate === "" || dest.climate === selectedClimate;

    return matchesSearch && matchesContinent && matchesBudget && matchesClimate;
  });

  const getDestinationTips = (destinationName: string): TravelTip[] => {
    return travelTips.filter(tip => tip.destination === destinationName);
  };

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case 'Budget': return 'bg-green-100 text-green-800';
      case 'Mid-range': return 'bg-yellow-100 text-yellow-800';
      case 'Luxury': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSafetyColor = (safety: string) => {
    switch (safety) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold text-gradient mb-4">
          Explore World Destinations
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover amazing places around the world with detailed information about attractions, 
          cuisine, activities, and travel tips.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="glass-card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <Input
              placeholder="Search destinations, countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={selectedContinent} onValueChange={setSelectedContinent}>
            <SelectTrigger>
              <SelectValue placeholder="All Continents" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Continents</SelectItem>
              {continents.map(continent => (
                <SelectItem key={continent} value={continent}>{continent}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedBudget} onValueChange={setSelectedBudget}>
            <SelectTrigger>
              <SelectValue placeholder="All Budgets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Budgets</SelectItem>
              {budgets.map(budget => (
                <SelectItem key={budget} value={budget}>{budget}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedClimate} onValueChange={setSelectedClimate}>
            <SelectTrigger>
              <SelectValue placeholder="All Climates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Climates</SelectItem>
              {climates.map(climate => (
                <SelectItem key={climate} value={climate}>{climate}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Globe className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{worldDestinations.length}</div>
            <div className="text-sm text-muted-foreground">Destinations</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{continents.length}</div>
            <div className="text-sm text-muted-foreground">Continents</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">4.7</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Plane className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{travelTips.length}</div>
            <div className="text-sm text-muted-foreground">Travel Tips</div>
          </CardContent>
        </Card>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <Card 
            key={destination.id} 
            className="glass-card hover:shadow-soft-hover transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedDestination(destination)}
          >
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {destination.rating}
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{destination.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {destination.country}
                  </CardDescription>
                </div>
                <Badge className={getPriceRangeColor(destination.priceRange)}>
                  {destination.priceRange}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {destination.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Thermometer className="h-3 w-3 text-blue-500" />
                  <span>{destination.climate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-3 w-3 text-green-500" />
                  <span>Safety: </span>
                  <Badge variant="outline" className={getSafetyColor(destination.safetyLevel)}>
                    {destination.safetyLevel}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-3 w-3 text-orange-500" />
                  <span>Best: {destination.bestTimeToVisit[0]}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex flex-wrap gap-1">
                  {destination.attractions.slice(0, 3).map((attraction, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {attraction}
                    </Badge>
                  ))}
                  {destination.attractions.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{destination.attractions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 overflow-hidden rounded-t-lg">
              <img 
                src={selectedDestination.image} 
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => setSelectedDestination(null)}
              >
                ✕
              </Button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-display font-bold">{selectedDestination.name}</h2>
                  <p className="text-lg text-muted-foreground">{selectedDestination.country}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriceRangeColor(selectedDestination.priceRange)}>
                    {selectedDestination.priceRange}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedDestination.rating}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{selectedDestination.description}</p>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="attractions">Attractions</TabsTrigger>
                  <TabsTrigger value="cuisine">Cuisine</TabsTrigger>
                  <TabsTrigger value="tips">Travel Tips</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Thermometer className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                      <div className="font-semibold">{selectedDestination.climate}</div>
                      <div className="text-sm text-muted-foreground">Climate</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                      <div className="font-semibold">{selectedDestination.bestTimeToVisit.join(', ')}</div>
                      <div className="text-sm text-muted-foreground">Best Time</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Shield className="h-6 w-6 mx-auto mb-2 text-green-500" />
                      <div className="font-semibold">{selectedDestination.safetyLevel}</div>
                      <div className="text-sm text-muted-foreground">Safety</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                      <div className="font-semibold">{selectedDestination.currency}</div>
                      <div className="text-sm text-muted-foreground">Currency</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Languages</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedDestination.language.map((lang, index) => (
                          <Badge key={index} variant="outline">{lang}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Activities</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedDestination.activities.map((activity, index) => (
                          <Badge key={index} variant="secondary">{activity}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="attractions">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDestination.attractions.map((attraction, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold">{attraction}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cuisine">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedDestination.cuisine.map((dish, index) => (
                      <div key={index} className="p-3 bg-orange-50 rounded-lg">
                        <div className="font-semibold text-orange-800">{dish}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="tips">
                  <div className="space-y-4">
                    {getDestinationTips(selectedDestination.name).map((tip) => (
                      <Card key={tip.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{tip.title}</CardTitle>
                            <Badge className={tip.importance === 'High' ? 'bg-red-100 text-red-800' : 
                                              tip.importance === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                              'bg-green-100 text-green-800'}>
                              {tip.importance}
                            </Badge>
                          </div>
                          <CardDescription className="capitalize">{tip.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{tip.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                    {getDestinationTips(selectedDestination.name).length === 0 && (
                      <p className="text-muted-foreground text-center py-8">
                        No specific travel tips available for this destination yet.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 