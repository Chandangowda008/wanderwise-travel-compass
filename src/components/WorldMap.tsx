
import { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';

interface WorldMapProps {
  waypoints: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    type: 'destination' | 'waypoint';
  }>;
  onMapClick: (lat: number, lng: number) => void;
  currentLocation?: { lat: number; lng: number };
}

export const WorldMap = ({ waypoints, onMapClick, currentLocation }: WorldMapProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  // Convert lat/lng to SVG coordinates
  const latLngToSVG = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 400;
    return { x, y };
  };

  const handleMapClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert SVG coordinates back to lat/lng
    const lng = (x / 800) * 360 - 180;
    const lat = 90 - (y / 400) * 180;
    
    onMapClick(lat, lng);
  };

  return (
    <div className="relative w-full h-96 border rounded-lg overflow-hidden bg-blue-50">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 400"
        className="cursor-crosshair"
        onClick={handleMapClick}
      >
        {/* Simple world map outline */}
        <rect width="800" height="400" fill="#e0f2fe" className="fill-blue-50" />
        
        {/* Continents - simplified shapes */}
        {/* North America */}
        <path
          d="M150 120 L200 100 L250 110 L280 130 L260 180 L200 190 L160 170 Z"
          fill="#10b981"
          className="fill-green-500 opacity-80"
        />
        
        {/* South America */}
        <path
          d="M220 200 L250 190 L270 220 L260 280 L240 300 L220 290 L210 250 Z"
          fill="#10b981"
          className="fill-green-500 opacity-80"
        />
        
        {/* Europe */}
        <path
          d="M380 100 L420 90 L450 110 L440 140 L400 150 L370 130 Z"
          fill="#10b981"
          className="fill-green-500 opacity-80"
        />
        
        {/* Africa */}
        <path
          d="M380 160 L420 150 L450 170 L460 220 L440 270 L410 280 L380 260 L370 200 Z"
          fill="#10b981"
          className="fill-green-500 opacity-80"
        />
        
        {/* Asia */}
        <path
          d="M460 80 L580 70 L650 90 L680 120 L660 160 L600 170 L520 150 L480 130 Z"
          fill="#10b981"
          className="fill-green-500 opacity-80"
        />
        
        {/* Australia */}
        <path
          d="M580 280 L630 270 L650 290 L640 310 L600 315 L580 300 Z"
          fill="#10b981"
          className="fill-green-500 opacity-80"
        />

        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#grid)" />

        {/* Current location */}
        {currentLocation && (
          <g>
            {(() => {
              const { x, y } = latLngToSVG(currentLocation.lat, currentLocation.lng);
              return (
                <>
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="#3b82f6"
                    className="fill-blue-500"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    className="stroke-blue-500 animate-pulse"
                  />
                </>
              );
            })()}
          </g>
        )}

        {/* Waypoints */}
        {waypoints.map((waypoint) => {
          const { x, y } = latLngToSVG(waypoint.lat, waypoint.lng);
          return (
            <g key={waypoint.id}>
              <circle
                cx={x}
                cy={y}
                r="6"
                fill="#ef4444"
                className="fill-red-500 cursor-pointer"
                onMouseEnter={() => setHoveredPoint(waypoint.id)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              {hoveredPoint === waypoint.id && (
                <g>
                  <rect
                    x={x + 10}
                    y={y - 15}
                    width={waypoint.name.length * 8 + 10}
                    height="20"
                    fill="white"
                    stroke="#ccc"
                    rx="3"
                  />
                  <text
                    x={x + 15}
                    y={y - 2}
                    fontSize="12"
                    fill="#333"
                  >
                    {waypoint.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border rounded-lg p-3 text-sm">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Current Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Waypoints</span>
        </div>
      </div>
      
      {/* Click instruction */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border rounded-lg p-2 text-xs text-muted-foreground">
        Click anywhere to add waypoint
      </div>
    </div>
  );
};
