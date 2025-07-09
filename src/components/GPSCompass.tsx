
import { useState, useEffect } from "react";
import { Navigation, MapPin, Compass } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GPSCompassProps {
  onLocationFound?: (location: { lat: number; lng: number }) => void;
}

export const GPSCompass = ({ onLocationFound }: GPSCompassProps) => {
  const [heading, setHeading] = useState<number>(0);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  useEffect(() => {
    let watchId: number;
    
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(newLocation);
          setAccuracy(position.coords.accuracy);
          onLocationFound?.(newLocation);
        },
        (error) => {
          console.error("GPS Error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [onLocationFound]);

  useEffect(() => {
    let orientationHandler: ((event: DeviceOrientationEvent) => void) | null = null;

    if (window.DeviceOrientationEvent) {
      orientationHandler = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          setHeading(360 - event.alpha);
        }
      };

      window.addEventListener('deviceorientation', orientationHandler);
    }

    return () => {
      if (orientationHandler) {
        window.removeEventListener('deviceorientation', orientationHandler);
      }
    };
  }, []);

  const calibrateCompass = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
    }, 3000);
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-display font-semibold mb-2">GPS Compass</h3>
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          {location ? (
            <>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
              </div>
              {accuracy && (
                <span className="text-xs">±{Math.round(accuracy)}m</span>
              )}
            </>
          ) : (
            <span>Acquiring GPS signal...</span>
          )}
        </div>
      </div>

      <div className="relative w-48 h-48 mx-auto mb-6">
        {/* Compass Circle */}
        <div className="absolute inset-0 rounded-full border-4 border-muted bg-background shadow-lg">
          {/* Cardinal directions */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-red-600">N</div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-bold">E</div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-bold">S</div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm font-bold">W</div>
          
          {/* Compass needle */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
            style={{ transform: `rotate(${heading}deg)` }}
          >
            <Navigation className="h-16 w-16 text-primary" />
          </div>
        </div>

        {/* Heading display */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium">
            {Math.round(heading)}°
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          variant="outline" 
          onClick={calibrateCompass} 
          disabled={isCalibrating}
          className="w-full"
        >
          <Compass className="h-4 w-4 mr-2" />
          {isCalibrating ? "Calibrating..." : "Calibrate Compass"}
        </Button>
        
        <div className="text-xs text-center text-muted-foreground">
          {location ? "GPS signal acquired" : "Searching for GPS signal..."}
        </div>
      </div>
    </Card>
  );
};
