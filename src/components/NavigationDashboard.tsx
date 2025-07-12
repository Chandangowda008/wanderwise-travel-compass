
import { useState } from "react";
import { Navigation, Route, Sparkles, User, Wallet, TrendingUp, WifiOff, Share2, Bell, Home, Settings, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { useNavigate } from "react-router-dom";
import { TravelAdvisoryDashboard } from "./TravelAdvisoryDashboard";
import { SmartItineraryPlanner } from "./SmartItineraryPlanner";
import { AITravelRecommendations } from "./AITravelRecommendations";
import { TravelProfileManager } from "./TravelProfileManager";
import { BudgetTracker } from "./BudgetTracker";
import { TravelAnalytics } from "./TravelAnalytics";
import { OfflineMode } from "./OfflineMode";
import { SocialSharing } from "./SocialSharing";
import { LocalAlerts } from "./LocalAlerts";
import { AppSettings } from "./AppSettings";
import { GlobalExplorer } from "./GlobalExplorer";

const navigationItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "global-explorer", label: "Global Explorer", icon: Globe },
  { id: "advisory", label: "Travel Advisory", icon: Navigation },
  { id: "itinerary", label: "Smart Planner", icon: Route },
  { id: "ai-recommendations", label: "AI Recommendations", icon: Sparkles },
  { id: "profile", label: "Travel Profile", icon: User },
  { id: "budget", label: "Budget Tracker", icon: Wallet },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "offline", label: "Offline Mode", icon: WifiOff },
  { id: "social", label: "Social Sharing", icon: Share2 },
  { id: "alerts", label: "Local Alerts", icon: Bell },
  { id: "settings", label: "App Settings", icon: Settings },
];

function AppSidebar({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (section: string) => void }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border/40 bg-gradient-to-b from-background to-background/80 backdrop-blur-md">
      <SidebarContent className="bg-gradient-to-b from-background/95 to-background/90 backdrop-blur-sm">
        <div className="p-6 border-b border-border/20">
          {!isCollapsed && (
            <div className="text-center">
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                WanderWise
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Navigation Hub</p>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-orange-500 rounded-full mx-auto mt-2"></div>
            </div>
          )}
        </div>

        <div className="px-3 py-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground px-3 mb-2 uppercase tracking-wider">
              Features
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton 
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full justify-start gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                          isActive 
                            ? 'bg-gradient-to-r from-primary/10 to-orange-500/10 text-primary border border-primary/20 shadow-sm' 
                            : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground hover:scale-[1.02]'
                        }`}
                        tooltip={isCollapsed ? item.label : undefined}
                      >
                        <Icon className={`h-5 w-5 flex-shrink-0 transition-colors ${
                          isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                        }`} />
                        {!isCollapsed && (
                          <span className={`font-medium transition-colors ${
                            isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                          }`}>
                            {item.label}
                          </span>
                        )}
                        {isActive && !isCollapsed && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {!isCollapsed && (
          <div className="mt-auto p-6 border-t border-border/20">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-2">
                AI-powered travel companion
              </div>
              <div className="flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-green-600 font-medium">Connected</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

export const NavigationDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="space-y-8">
            {/* Welcome Hero Section */}
            <div className="text-center py-12">
              <div className="mb-6">
                <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent mb-4">
                  Welcome to WanderWise
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Your complete AI-powered travel companion for smart navigation and intelligent planning
                </p>
              </div>
              
              {/* Quick Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
                {[
                  { id: "global-explorer", title: "Global Explorer", desc: "Interactive world map", icon: Globe, color: "cyan" },
                  { id: "advisory", title: "Travel Advisory", desc: "Check safety & alerts", icon: Navigation, color: "blue" },
                  { id: "itinerary", title: "Smart Planner", desc: "Plan your journey", icon: Route, color: "green" },
                  { id: "ai-recommendations", title: "AI Recommendations", desc: "Discover hidden gems", icon: Sparkles, color: "purple" },
                  { id: "budget", title: "Budget Tracker", desc: "Manage expenses", icon: Wallet, color: "orange" },
                  { id: "analytics", title: "Travel Analytics", desc: "Track your journeys", icon: TrendingUp, color: "pink" }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card 
                      key={item.id}
                      className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 border-border/50"
                      onClick={() => setActiveSection(item.id)}
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-${item.color}-500/10 to-${item.color}-600/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-8 w-8 text-${item.color}-600`} />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Navigation Options */}
              <div className="mt-12 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate("/")} 
                    variant="outline"
                    className="px-8 py-3 text-lg hover:scale-105 transition-transform"
                  >
                    ← Back to Home Page
                  </Button>
                  <Button 
                    onClick={() => navigate("/login")} 
                    className="px-8 py-3 text-lg hover:scale-105 transition-transform"
                  >
                    Access Full Features →
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sign in to unlock personalized travel planning and analytics
                </p>
              </div>
            </div>
          </div>
        );
      case "advisory":
        return (
          <div className="animate-fade-in">
            <TravelAdvisoryDashboard destination="Paris" />
          </div>
        );
      case "itinerary":
        return (
          <div className="animate-fade-in">
            <SmartItineraryPlanner />
          </div>
        );
      case "ai-recommendations":
        return (
          <div className="animate-fade-in">
            <AITravelRecommendations />
          </div>
        );
      case "profile":
        return (
          <div className="animate-fade-in">
            <TravelProfileManager />
          </div>
        );
      case "budget":
        return (
          <div className="animate-fade-in">
            <BudgetTracker />
          </div>
        );
      case "analytics":
        return (
          <div className="animate-fade-in">
            <TravelAnalytics />
          </div>
        );
      case "offline":
        return (
          <div className="animate-fade-in">
            <OfflineMode />
          </div>
        );
      case "social":
        return (
          <div className="animate-fade-in">
            <SocialSharing />
          </div>
        );
      case "alerts":
        return (
          <div className="animate-fade-in">
            <LocalAlerts />
          </div>
        );
      case "global-explorer":
        return (
          <div className="animate-fade-in">
            <GlobalExplorer />
          </div>
        );
      case "settings":
        return (
          <div className="animate-fade-in">
            <AppSettings />
          </div>
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Select a feature from the sidebar to get started</p>
          </div>
        );
    }
  };

  const currentItem = navigationItems.find(item => item.id === activeSection);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-blue-50/50 flex w-full">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header with Sidebar Trigger */}
          <header className="bg-white/90 backdrop-blur-md border-b border-border/30 px-4 sm:px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-2 sm:gap-4">
                <SidebarTrigger className="hover:bg-primary/10 transition-colors rounded-lg p-2" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-2xl font-display font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent truncate">
                    {currentItem?.label || "Navigation Hub"}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                    Your complete AI-powered travel companion for smart navigation and intelligent planning
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 bg-green-50 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">
                  Connected
                </span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="min-h-full flex items-start justify-center p-4 sm:p-6 lg:p-8">
              <div className="w-full max-w-7xl">
                <div key={activeSection} className="animate-fade-in">
                  {renderContent()}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
