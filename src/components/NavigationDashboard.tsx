
import { useState } from "react";
import { Compass, Map, Navigation, Route, Sparkles, User, Wallet, TrendingUp, Cloud, WifiOff, Layers, Share2, Bell, ChevronRight, Menu, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GPSCompass } from "./GPSCompass";
import { InteractiveMap } from "./InteractiveMap";
import { TravelAdvisoryDashboard } from "./TravelAdvisoryDashboard";
import { SmartItineraryPlanner } from "./SmartItineraryPlanner";
import { WeatherWidget } from "./WeatherWidget";
import { AITravelRecommendations } from "./AITravelRecommendations";
import { TravelProfileManager } from "./TravelProfileManager";
import { BudgetTracker } from "./BudgetTracker";
import { TravelAnalytics } from "./TravelAnalytics";
import { OfflineMode } from "./OfflineMode";
import { InteractiveMapView } from "./InteractiveMapView";
import { SocialSharing } from "./SocialSharing";
import { LocalAlerts } from "./LocalAlerts";

const navigationItems = [
  { id: "compass", label: "GPS Compass", icon: Compass },
  { id: "map", label: "Interactive Map", icon: Map },
  { id: "advisory", label: "Travel Advisory", icon: Navigation },
  { id: "itinerary", label: "Smart Planner", icon: Route },
  { id: "ai-recommendations", label: "AI Recommendations", icon: Sparkles },
  { id: "profile", label: "Travel Profile", icon: User },
  { id: "budget", label: "Budget Tracker", icon: Wallet },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "offline", label: "Offline Mode", icon: WifiOff },
  { id: "map-view", label: "Map View", icon: Layers },
  { id: "social", label: "Social Sharing", icon: Share2 },
  { id: "alerts", label: "Local Alerts", icon: Bell },
];

export const NavigationDashboard = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [activeSection, setActiveSection] = useState("compass");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLocationFound = (location: { lat: number; lng: number }) => {
    setCurrentLocation(location);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "compass":
        return (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
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

              <WeatherWidget 
                location={currentLocation || undefined} 
                locationName="Paris, France" 
              />
            </div>
          </div>
        );
      case "map":
        return <InteractiveMap currentLocation={currentLocation || undefined} />;
      case "advisory":
        return <TravelAdvisoryDashboard destination="Paris" />;
      case "itinerary":
        return <SmartItineraryPlanner />;
      case "ai-recommendations":
        return <AITravelRecommendations />;
      case "profile":
        return <TravelProfileManager />;
      case "budget":
        return <BudgetTracker />;
      case "analytics":
        return <TravelAnalytics />;
      case "offline":
        return <OfflineMode />;
      case "map-view":
        return <InteractiveMapView />;
      case "social":
        return <SocialSharing />;
      case "alerts":
        return <LocalAlerts />;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 bg-white/90 backdrop-blur-sm border-r border-gray-200 shadow-lg flex flex-col`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-2xl font-display font-bold text-primary">WanderWise</h1>
                <p className="text-sm text-muted-foreground">Navigation Hub</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-primary/10"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'hover:bg-gray-100 text-gray-700 hover:text-primary'
                  }`}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary-foreground' : 'text-gray-500 group-hover:text-primary'}`} />
                  {sidebarOpen && (
                    <>
                      <span className="font-medium truncate">{item.label}</span>
                      <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${isActive ? 'rotate-90' : ''}`} />
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-muted-foreground text-center">
              AI-powered travel companion
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">
                {navigationItems.find(item => item.id === activeSection)?.label}
              </h2>
              <p className="text-sm text-muted-foreground">
                Your complete AI-powered travel companion for smart navigation and intelligent planning
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${currentLocation ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm text-muted-foreground">
                {currentLocation ? 'GPS Connected' : 'Searching GPS...'}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
