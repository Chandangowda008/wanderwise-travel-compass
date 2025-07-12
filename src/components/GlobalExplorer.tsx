import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Search, 
  Navigation, 
  Star, 
  Heart, 
  Share2, 
  Download, 
  Layers, 
  Compass,
  Globe,
  Plane,
  Car,
  Train,
  Bus,
  Walking,
  Clock,
  DollarSign,
  Users,
  Camera,
  Bookmark,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock Google Maps API - In production, you would use @googlemaps/js-api-loader
const mockGoogleMaps = {
  Map: class MockMap {
    constructor(element: HTMLElement, options: any) {
      this.element = element;
      this.options = options;
      this.markers = [];
      this.infoWindows = [];
    }
    
    setCenter(position: any) {
      this.center = position;
    }
    
    setZoom(zoom: number) {
      this.zoom = zoom;
    }
    
    addListener(event: string, callback: Function) {
      // Mock event listener
    }
  },
  
  Marker: class MockMarker {
    constructor(options: any) {
      this.position = options.position;
      this.map = options.map;
      this.title = options.title;
    }
    
    addListener(event: string, callback: Function) {
      // Mock event listener
    }
  },
  
  InfoWindow: class MockInfoWindow {
    constructor(options: any) {
      this.content = options.content;
      this.position = options.position;
    }
    
    open(map: any, marker: any) {
      // Mock open
    }
  },
  
  places: {
    PlacesService: class MockPlacesService {
      constructor(map: any) {
        this.map = map;
      }
      
      findPlaceFromQuery(request: any, callback: Function) {
        // Mock places search
        setTimeout(() => {
          callback([
            {
              place_id: 'mock_place_1',
              name: 'Eiffel Tower',
              geometry: { location: { lat: 48.8584, lng: 2.2945 } },
              rating: 4.6,
              types: ['tourist_attraction', 'establishment'],
              photos: [{ getUrl: () => 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400' }]
            },
            {
              place_id: 'mock_place_2',
              name: 'Louvre Museum',
              geometry: { location: { lat: 48.8606, lng: 2.3376 } },
              rating: 4.5,
              types: ['museum', 'establishment'],
              photos: [{ getUrl: () => 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400' }]
            }
          ], 'OK');
        }, 1000);
      }
    }
  }
};

interface Place {
  place_id: string;
  name: string;
  geometry: { location: { lat: number; lng: number } };
  rating?: number;
  types: string[];
  photos?: any[];
}

interface SavedLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'favorite' | 'visited' | 'planned';
  notes?: string;
  date?: string;
}

export const GlobalExplorer = () => {
  const [map, setMap] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [mapType, setMapType] = useState("satellite");
  const [showTraffic, setShowTraffic] = useState(true);
  const [showTransit, setShowTransit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = new mockGoogleMaps.Map(mapRef.current, {
        center: currentLocation,
        zoom: 12,
        mapTypeId: mapType,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });
      
      setMap(newMap);
    }
  }, [mapRef, map, currentLocation, mapType]);

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim() || !map) return;
    
    setLoading(true);
    try {
      const placesService = new mockGoogleMaps.places.PlacesService(map);
      
      placesService.findPlaceFromQuery(
        {
          query: searchQuery,
          fields: ['place_id', 'name', 'geometry', 'rating', 'types', 'photos']
        },
        (results: Place[], status: string) => {
          setLoading(false);
          if (status === 'OK' && results) {
            setSearchResults(results);
            toast({
              title: "Search Results",
              description: `Found ${results.length} places matching "${searchQuery}"`,
            });
          } else {
            toast({
              title: "Search Failed",
              description: "No places found. Try a different search term.",
              variant: "destructive",
            });
          }
        }
      );
    } catch (error) {
      setLoading(false);
      toast({
        title: "Search Error",
        description: "Failed to search for places. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle place selection
  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    if (map) {
      map.setCenter(place.geometry.location);
      map.setZoom(15);
    }
  };

  // Save location
  const handleSaveLocation = (type: 'favorite' | 'visited' | 'planned') => {
    if (!selectedPlace) return;
    
    const newLocation: SavedLocation = {
      id: Date.now().toString(),
      name: selectedPlace.name,
      lat: selectedPlace.geometry.location.lat,
      lng: selectedPlace.geometry.location.lng,
      type,
      date: new Date().toISOString().split('T')[0]
    };
    
    setSavedLocations(prev => [...prev, newLocation]);
    
    toast({
      title: "Location Saved",
      description: `${selectedPlace.name} has been saved to your ${type} locations.`,
    });
  };

  // Get current location
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          
          if (map) {
            map.setCenter({ lat: latitude, lng: longitude });
            map.setZoom(15);
          }
          
          toast({
            title: "Location Updated",
            description: "Your current location has been set on the map.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your current location. Please check your permissions.",
            variant: "destructive",
          });
        }
      );
    }
  };

  // Mock popular destinations
  const popularDestinations = [
    { name: "Paris, France", lat: 48.8566, lng: 2.3522, rating: 4.8 },
    { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, rating: 4.7 },
    { name: "New York, USA", lat: 40.7128, lng: -74.0060, rating: 4.6 },
    { name: "London, UK", lat: 51.5074, lng: -0.1278, rating: 4.5 },
    { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, rating: 4.4 },
    { name: "Rome, Italy", lat: 41.9028, lng: 12.4964, rating: 4.6 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold text-gradient mb-4">
          Global Explorer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the world with interactive maps, discover amazing places, and plan your next adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Controls & Search */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-500" />
                Explore Places
              </CardTitle>
              <CardDescription>Search for destinations, landmarks, and attractions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search places, landmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Search Results</h4>
                  {searchResults.map((place) => (
                    <div
                      key={place.place_id}
                      className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handlePlaceSelect(place)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{place.name}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {place.rating && (
                              <>
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{place.rating}</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{place.types[0]?.replace(/_/g, ' ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Map Controls */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-green-500" />
                Map Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Map Type</label>
                <Select value={mapType} onValueChange={setMapType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satellite">Satellite</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                    <SelectItem value="roadmap">Road Map</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Show Traffic</label>
                  <p className="text-xs text-muted-foreground">Real-time traffic data</p>
                </div>
                <Button
                  variant={showTraffic ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowTraffic(!showTraffic)}
                >
                  {showTraffic ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Show Transit</label>
                  <p className="text-xs text-muted-foreground">Public transportation</p>
                </div>
                <Button
                  variant={showTransit ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowTransit(!showTransit)}
                >
                  {showTransit ? "On" : "Off"}
                </Button>
              </div>

              <Button
                onClick={handleGetCurrentLocation}
                variant="outline"
                className="w-full"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Use My Location
              </Button>
            </CardContent>
          </Card>

          {/* Popular Destinations */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-500" />
                Popular Destinations
              </CardTitle>
              <CardDescription>Quick access to popular travel spots</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {popularDestinations.map((dest) => (
                <div
                  key={dest.name}
                  className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    setCurrentLocation({ lat: dest.lat, lng: dest.lng });
                    if (map) {
                      map.setCenter({ lat: dest.lat, lng: dest.lng });
                      map.setZoom(12);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{dest.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{dest.rating}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Map */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-orange-500" />
                Interactive World Map
              </CardTitle>
              <CardDescription>Explore destinations and plan your journey</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div 
                ref={mapRef}
                className="w-full h-[600px] bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg relative overflow-hidden"
              >
                {/* Mock Map Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-lg font-semibold mb-2">Interactive World Map</h3>
                    <p className="text-muted-foreground mb-4">
                      In production, this would display a real Google Maps integration
                    </p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      <div className="p-3 bg-white/80 rounded-lg">
                        <MapPin className="h-6 w-6 mx-auto mb-2 text-red-500" />
                        <div className="text-sm font-medium">Search Places</div>
                      </div>
                      <div className="p-3 bg-white/80 rounded-lg">
                        <Navigation className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                        <div className="text-sm font-medium">Get Directions</div>
                      </div>
                      <div className="p-3 bg-white/80 rounded-lg">
                        <Heart className="h-6 w-6 mx-auto mb-2 text-pink-500" />
                        <div className="text-sm font-medium">Save Favorites</div>
                      </div>
                      <div className="p-3 bg-white/80 rounded-lg">
                        <Share2 className="h-6 w-6 mx-auto mb-2 text-green-500" />
                        <div className="text-sm font-medium">Share Locations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Place Details */}
          {selectedPlace && (
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-500" />
                  {selectedPlace.name}
                </CardTitle>
                <CardDescription>
                  {selectedPlace.types.join(', ').replace(/_/g, ' ')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedPlace.rating || 'N/A'}</span>
                      <span className="text-muted-foreground">rating</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-muted-foreground">Open 24/7</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">Free entry</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSaveLocation('favorite')}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Favorite
                      </Button>
                      <Button
                        onClick={() => handleSaveLocation('planned')}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Bookmark className="h-4 w-4 mr-2" />
                        Plan Visit
                      </Button>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Saved Locations */}
      {savedLocations.length > 0 && (
        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-orange-500" />
              Your Saved Locations
            </CardTitle>
            <CardDescription>Places you've saved for future reference</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="favorites" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="planned">Planned</TabsTrigger>
                <TabsTrigger value="visited">Visited</TabsTrigger>
              </TabsList>

              <TabsContent value="favorites" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedLocations
                    .filter(loc => loc.type === 'favorite')
                    .map((location) => (
                      <div key={location.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{location.name}</h4>
                          <Badge variant="secondary">{location.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Saved on {location.date}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-3 w-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="planned" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedLocations
                    .filter(loc => loc.type === 'planned')
                    .map((location) => (
                      <div key={location.id} className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{location.name}</h4>
                          <Badge variant="secondary">{location.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Planned for {location.date}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Clock className="h-3 w-3 mr-1" />
                            Schedule
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="visited" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedLocations
                    .filter(loc => loc.type === 'visited')
                    .map((location) => (
                      <div key={location.id} className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{location.name}</h4>
                          <Badge variant="secondary">{location.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Visited on {location.date}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Camera className="h-3 w-3 mr-1" />
                            Photos
                          </Button>
                          <Button variant="outline" size="sm">
                            <Star className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 