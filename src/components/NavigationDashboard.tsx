
import { useState } from "react";
import { Compass, Map, Navigation, Route, Sparkles, User, Wallet, TrendingUp, Cloud, WifiOff, Layers, Share2, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
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

function AppSidebar({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (section: string) => void }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent className="bg-white/95 backdrop-blur-sm">
        <div className="p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-display font-bold text-primary">WanderWise</h1>
              <p className="text-xs text-muted-foreground">Navigation Hub</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-gray-600 px-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full justify-start gap-3 px-3 py-2 transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                          : 'hover:bg-gray-100 text-gray-700 hover:text-primary'
                      }`}
                      tooltip={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="text-xs text-muted-foreground text-center">
              AI-powered travel companion
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

export const NavigationDashboard = () => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [activeSection, setActiveSection] = useState("compass");

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

  const currentItem = navigationItems.find(item => item.id === activeSection);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex w-full">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header with Sidebar Trigger */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-primary/10" />
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    {currentItem?.label || "Navigation Hub"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your complete AI-powered travel companion for smart navigation and intelligent planning
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${currentLocation ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-sm text-muted-foreground">
                  {currentLocation ? 'GPS Connected' : 'Searching GPS...'}
                </span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
