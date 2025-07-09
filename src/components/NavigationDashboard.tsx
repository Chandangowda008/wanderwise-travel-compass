
import { useState } from "react";
import { Compass, Map, Navigation, Route } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GPSCompass } from "./GPSCompass";
import { InteractiveMap } from "./InteractiveMap";
import { TravelAdvisoryDashboard } from "./TravelAdvisoryDashboard";
import { SmartItineraryPlanner } from "./SmartItineraryPlanner";

export const NavigationDashboard = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationFound = (location: { lat: number; lng: number }) => {
    setCurrentLocation(location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-center mb-2">
            WanderWise <span className="text-primary">Navigation Hub</span>
          </h1>
          <p className="text-xl text-center text-muted-foreground">
            Your complete travel companion for smart navigation and planning
          </p>
        </div>

        <Tabs defaultValue="compass" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="compass" className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              GPS Compass
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Interactive Map
            </TabsTrigger>
            <TabsTrigger value="advisory" className="flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Travel Advisory
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              Smart Planner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compass" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <GPSCompass onLocationFound={handleLocationFound} />
              <Card className="p-6">
                <h3 className="text-xl font-display font-semibold mb-4">Navigation Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Location:</span>
                    <span className="font-medium">
                      {currentLocation 
                        ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`
                        : "Acquiring GPS..."
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GPS Status:</span>
                    <span className={`font-medium ${currentLocation ? 'text-green-600' : 'text-yellow-600'}`}>
                      {currentLocation ? "Connected" : "Searching..."}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Compass Accuracy:</span>
                    <span className="font-medium">High</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <InteractiveMap currentLocation={currentLocation || undefined} />
          </TabsContent>

          <TabsContent value="advisory" className="space-y-6">
            <TravelAdvisoryDashboard destination="Paris" />
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-6">
            <SmartItineraryPlanner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
