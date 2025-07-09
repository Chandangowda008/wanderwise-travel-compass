
import { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Plus, Minus } from "lucide-react";

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
  const mapRef = useRef<HTMLDivElement>(null);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [waypointName, setWaypointName] = useState("");
  const [showAddWaypoint, setShowAddWaypoint] = useState(false);

  // Simulate map functionality (would integrate with actual map service)
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

  // Simulate map click
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to mock coordinates
    const lat = 40.7128 + (y - rect.height / 2) / 1000;
    const lng = -74.0060 + (x - rect.width / 2) / 1000;
    
    setSelectedLocation({ lat, lng });
    setShowAddWaypoint(true);
  };

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-xl font-display font-semibold mb-2">Interactive Map</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{waypoints.length} waypoints added</span>
          {currentLocation && (
            <span>Current: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}</span>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border-2 border-dashed border-muted cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
      >
        {/* Mock map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Current Location */}
        {currentLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-blue-500 rounded-full p-2 shadow-lg animate-pulse">
              <Navigation className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        {/* Waypoints */}
        {waypoints.map((waypoint, index) => (
          <div
            key={waypoint.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ 
              left: `${50 + (waypoint.lng + 74.0060) * 1000}%`, 
              top: `${50 - (waypoint.lat - 40.7128) * 1000}%` 
            }}
            onClick={(e) => {
              e.stopPropagation();
              removeWaypoint(waypoint.id);
            }}
          >
            <div className="bg-red-500 rounded-full p-2 shadow-lg hover:bg-red-600 transition-colors">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
              <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                {waypoint.name}
              </div>
            </div>
          </div>
        ))}

        {/* Selected Location */}
        {selectedLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${50 + (selectedLocation.lng + 74.0060) * 1000}%`, 
              top: `${50 - (selectedLocation.lat - 40.7128) * 1000}%` 
            }}
          >
            <div className="bg-yellow-500 rounded-full p-2 shadow-lg animate-bounce">
              <Plus className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
          Click to add waypoint
        </div>
      </div>

      {/* Add Waypoint Form */}
      {showAddWaypoint && selectedLocation && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Add Waypoint</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Waypoint name"
              value={waypointName}
              onChange={(e) => setWaypointName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addWaypoint()}
            />
            <Button onClick={addWaypoint} disabled={!waypointName.trim()}>
              Add
            </Button>
            <Button variant="outline" onClick={() => {
              setShowAddWaypoint(false);
              setSelectedLocation(null);
              setWaypointName("");
            }}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Waypoints List */}
      {waypoints.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Waypoints ({waypoints.length})</h4>
          <div className="space-y-2">
            {waypoints.map((waypoint, index) => (
              <div key={waypoint.id} className="flex items-center justify-between p-2 bg-muted rounded">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-red-500" />
                  <span className="font-medium">{waypoint.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWaypoint(waypoint.id)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
