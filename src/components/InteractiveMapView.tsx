
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Camera, Utensils, Hotel, ShoppingBag, Landmark, Eye, EyeOff, Layers } from "lucide-react";

interface POI {
  id: string;
  name: string;
  type: 'restaurant' | 'hotel' | 'attraction' | 'shopping' | 'photo';
  lat: number;
  lng: number;
  rating: number;
  description: string;
  image?: string;
}

interface MapLayer {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  visible: boolean;
  count: number;
}

export const InteractiveMapView = () => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: 'restaurants', name: 'Restaurants', icon: Utensils, color: '#ef4444', visible: true, count: 24 },
    { id: 'hotels', name: 'Hotels', icon: Hotel, color: '#3b82f6', visible: true, count: 12 },
    { id: 'attractions', name: 'Attractions', icon: Landmark, color: '#8b5cf6', visible: true, count: 18 },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: '#f59e0b', visible: false, count: 15 },
    { id: 'photos', name: 'Photo Spots', icon: Camera, color: '#10b981', visible: true, count: 31 }
  ]);

  const [pois] = useState<POI[]>([
    {
      id: '1',
      name: 'Le Petit Bistro',
      type: 'restaurant',
      lat: 48.8566,
      lng: 2.3522,
      rating: 4.5,
      description: 'Authentic French cuisine in a cozy setting'
    },
    {
      id: '2',
      name: 'Eiffel Tower',
      type: 'attraction',
      lat: 48.8584,
      lng: 2.2945,
      rating: 4.8,
      description: 'Iconic iron lattice tower and symbol of Paris'
    },
    {
      id: '3',
      name: 'Hotel Luxe',
      type: 'hotel',
      lat: 48.8698,
      lng: 2.3078,
      rating: 4.3,
      description: 'Luxury accommodation near the Louvre'
    },
    {
      id: '4',
      name: 'Seine Sunset Point',
      type: 'photo',
      lat: 48.8534,
      lng: 2.3488,
      rating: 4.7,
      description: 'Perfect spot for golden hour photography'
    }
  ]);

  const toggleLayerVisibility = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible }
        : layer
    ));
  };

  const getVisiblePOIs = () => {
    const visibleLayerIds = layers.filter(l => l.visible).map(l => l.id);
    return pois.filter(poi => {
      const layerId = poi.type === 'attraction' ? 'attractions' : 
                     poi.type === 'restaurant' ? 'restaurants' :
                     poi.type === 'hotel' ? 'hotels' :
                     poi.type === 'shopping' ? 'shopping' : 'photos';
      return visibleLayerIds.includes(layerId);
    });
  };

  const latLngToSVG = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 400;
    return { x, y };
  };

  const getIconForPOI = (type: POI['type']) => {
    switch (type) {
      case 'restaurant': return Utensils;
      case 'hotel': return Hotel;
      case 'attraction': return Landmark;
      case 'shopping': return ShoppingBag;
      case 'photo': return Camera;
      default: return MapPin;
    }
  };

  const getColorForPOI = (type: POI['type']) => {
    const layer = layers.find(l => 
      (type === 'attraction' && l.id === 'attractions') ||
      (type === 'restaurant' && l.id === 'restaurants') ||
      (type === 'hotel' && l.id === 'hotels') ||
      (type === 'shopping' && l.id === 'shopping') ||
      (type === 'photo' && l.id === 'photos')
    );
    return layer?.color || '#6b7280';
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-display font-semibold">Interactive Map View</h3>
            <p className="text-sm text-muted-foreground">
              Explore {getVisiblePOIs().length} recommended points of interest
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Layers className="h-3 w-3" />
            {layers.filter(l => l.visible).length} Layers Active
          </Badge>
        </div>

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="layers">Layer Controls</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            {/* Interactive Map with POI Layers */}
            <div className="relative">
              <div className="relative w-full h-96 border rounded-lg overflow-hidden bg-blue-50">
                <svg width="100%" height="100%" viewBox="0 0 800 400" className="cursor-pointer">
                  {/* Map Background */}
                  <rect width="800" height="400" fill="#e0f2fe" />
                  
                  {/* Simplified Paris Map */}
                  <rect x="300" y="150" width="200" height="100" fill="#10b981" opacity="0.8" rx="5" />
                  
                  {/* POI Markers */}
                  {getVisiblePOIs().map((poi) => {
                    const { x, y } = latLngToSVG(poi.lat, poi.lng);
                    const IconComponent = getIconForPOI(poi.type);
                    return (
                      <g key={poi.id}>
                        <circle
                          cx={x}
                          cy={y}
                          r="8"
                          fill={getColorForPOI(poi.type)}
                          className="cursor-pointer hover:opacity-80"
                          onClick={() => setSelectedPOI(poi)}
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="12"
                          fill="none"
                          stroke={getColorForPOI(poi.type)}
                          strokeWidth="2"
                          opacity="0.5"
                          className="animate-pulse"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* POI Details Popup */}
                {selectedPOI && (
                  <div className="absolute top-4 right-4 bg-background border rounded-lg p-4 shadow-lg max-w-sm">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{selectedPOI.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPOI(null)}
                      >
                        ×
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="capitalize">
                        {selectedPOI.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">{selectedPOI.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {selectedPOI.description}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm">Get Directions</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layers" className="space-y-4">
            <div className="grid gap-3">
              {layers.map((layer) => {
                const IconComponent = layer.icon;
                return (
                  <div
                    key={layer.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: layer.color }}
                      />
                      <IconComponent className="h-4 w-4" />
                      <div>
                        <span className="font-medium">{layer.name}</span>
                        <div className="text-xs text-muted-foreground">
                          {layer.count} locations
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLayerVisibility(layer.id)}
                    >
                      {layer.visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
