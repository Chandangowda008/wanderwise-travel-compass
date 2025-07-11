
import { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Navigation, Plus, Minus, Settings, Eye, EyeOff, Globe } from "lucide-react";
import { WorldMap } from "./WorldMap";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Waypoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'destination' | 'waypoint';
}

interface InteractiveMapProps {
  currentLocation?: { lat: number; lng: number };
  onWaypointAdd?: (waypoint: Waypoint) => void;
}

export const InteractiveMap = ({ currentLocation, onWaypointAdd }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [waypointName, setWaypointName] = useState("");
  const [showAddWaypoint, setShowAddWaypoint] = useState(false);
  const [mapboxToken, setMapboxToken] = useState("");
  const [mapInitialized, setMapInitialized] = useState(false);
  const [showWaypointsList, setShowWaypointsList] = useState(true);
  const [useMapbox, setUseMapbox] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Initialize map when token is provided and mapbox is enabled
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || mapInitialized || !useMapbox) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.006, 40.7128], // NYC coordinates
        zoom: 10,
        pitch: 0,
        bearing: 0
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      // Add click handler for adding waypoints
      map.current.on('click', (e) => {
        if (!showAddWaypoint) {
          setSelectedLocation({ lat: e.lngLat.lat, lng: e.lngLat.lng });
          setShowAddWaypoint(true);
        }
      });

      setMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        setMapInitialized(false);
      }
    };
  }, [mapboxToken, mapInitialized, useMapbox]);

  // Update current location marker for Mapbox
  useEffect(() => {
    if (!map.current || !currentLocation || !useMapbox) return;

    const currentLocationMarker = new mapboxgl.Marker({ color: '#3B82F6' })
      .setLngLat([currentLocation.lng, currentLocation.lat])
      .addTo(map.current);

    return () => {
      currentLocationMarker.remove();
    };
  }, [currentLocation, mapInitialized, useMapbox]);

  // Update waypoint markers for Mapbox
  useEffect(() => {
    if (!map.current || !useMapbox) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    waypoints.forEach(waypoint => {
      const marker = new mapboxgl.Marker({ color: '#EF4444' })
        .setLngLat([waypoint.lng, waypoint.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${waypoint.name}</strong>`))
        .addTo(map.current!);
      
      markersRef.current.push(marker);
    });
  }, [waypoints, mapInitialized, useMapbox]);

  const handleWorldMapClick = (lat: number, lng: number) => {
    if (!showAddWaypoint) {
      setSelectedLocation({ lat, lng });
      setShowAddWaypoint(true);
    }
  };

  const addWaypoint = () => {
    if (selectedLocation && waypointName.trim()) {
      const newWaypoint: Waypoint = {
        id: Date.now().toString(),
        name: waypointName.trim(),
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        type: 'waypoint'
      };
      
      setWaypoints(prev => [...prev, newWaypoint]);
      onWaypointAdd?.(newWaypoint);
      setWaypointName("");
      setShowAddWaypoint(false);
      setSelectedLocation(null);
    }
  };

  const removeWaypoint = (id: string) => {
    setWaypoints(prev => prev.filter(w => w.id !== id));
  };

  const flyToLocation = (lat: number, lng: number) => {
    if (map.current && useMapbox) {
      map.current.flyTo({
        center: [lng, lat],
        zoom: 14,
        duration: 2000
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-display font-semibold">Interactive World Map</h3>
            <p className="text-sm text-muted-foreground">
              {waypoints.length} waypoints • {useMapbox ? 'Mapbox Mode' : 'World Map Mode'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseMapbox(!useMapbox)}
            >
              <Globe className="h-4 w-4 mr-2" />
              {useMapbox ? 'World Map' : 'Mapbox'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowWaypointsList(!showWaypointsList)}
            >
              {showWaypointsList ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Map Settings</SheetTitle>
                  <SheetDescription>
                    Configure your map preferences and add your Mapbox token for enhanced features.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 mt-6">
                  <div>
                    <label className="text-sm font-medium">Mapbox Public Token (Optional)</label>
                    <Input
                      placeholder="Enter your Mapbox public token"
                      value={mapboxToken}
                      onChange={(e) => setMapboxToken(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Get your token from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
                    </p>
                  </div>
                  {currentLocation && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Location</label>
                      <div className="text-sm text-muted-foreground">
                        Lat: {currentLocation.lat.toFixed(6)}<br />
                        Lng: {currentLocation.lng.toFixed(6)}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => flyToLocation(currentLocation.lat, currentLocation.lng)}
                        disabled={!useMapbox}
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Go to Current Location
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative">
          {useMapbox && mapboxToken ? (
            <div
              ref={mapContainer}
              className="w-full h-96 rounded-lg border shadow-sm"
              style={{ minHeight: '400px' }}
            />
          ) : (
            <WorldMap
              waypoints={waypoints}
              onMapClick={handleWorldMapClick}
              currentLocation={currentLocation}
            />
          )}

          {/* Add Waypoint Overlay */}
          {showAddWaypoint && selectedLocation && (
            <div className="absolute top-4 left-4 right-4 bg-background/95 backdrop-blur-sm border rounded-lg p-4 shadow-lg z-10">
              <h4 className="font-medium mb-2">Add Waypoint</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Waypoint name"
                  value={waypointName}
                  onChange={(e) => setWaypointName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addWaypoint()}
                  className="flex-1"
                />
                <Button onClick={addWaypoint} disabled={!waypointName.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowAddWaypoint(false);
                  setSelectedLocation(null);
                  setWaypointName("");
                }}>
                  Cancel
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Location: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Waypoints List */}
      {showWaypointsList && waypoints.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Waypoints ({waypoints.length})</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWaypointsList(false)}
            >
              <EyeOff className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-2 max-h-48 overflow-y-auto">
            {waypoints.map((waypoint, index) => (
              <div key={waypoint.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 rounded-full p-1">
                    <MapPin className="h-3 w-3 text-white" />
                  </div>
                  <div>
                    <span className="font-medium">{waypoint.name}</span>
                    <div className="text-xs text-muted-foreground">
                      {waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => flyToLocation(waypoint.lat, waypoint.lng)}
                    disabled={!useMapbox}
                  >
                    <Navigation className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeWaypoint(waypoint.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
