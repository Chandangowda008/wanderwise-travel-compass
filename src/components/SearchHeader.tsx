import { useState } from "react";
import { Mountain, Sparkles, Home, Menu, Navigation, Compass, User, Mic, Route, TrendingUp, Share2, Trophy, Camera, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SearchHeaderProps {
  onSearch: (city: string) => void;
  onNavigationToggle?: () => void;
  onNavigateToFeature?: (feature: string) => void;
  currentFeature?: string;
}

export const SearchHeader = ({ onSearch, onNavigationToggle, onNavigateToFeature, currentFeature }: SearchHeaderProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleHomeClick = () => {
    if (onNavigateToFeature) {
      onNavigateToFeature("home");
    }
  };

  const handleNavigationClick = () => {
    if (onNavigationToggle) {
      onNavigationToggle();
      setIsSheetOpen(false);
    }
  };

  const handleFeatureClick = (feature: string) => {
    if (onNavigateToFeature) {
      onNavigateToFeature(feature);
      setIsSheetOpen(false);
    }
  };

  const profileFeatures = [
    { icon: User, label: "Profile Settings", description: "Manage your profile and account", action: () => handleFeatureClick("profile") },
  ];

  const navigationFeatures = [
    { icon: Compass, label: "Navigation Hub", description: "Access all features", action: () => handleNavigationClick(), feature: "navigation" },
    { icon: Mic, label: "AI Assistant", description: "Voice-activated travel help", action: () => handleFeatureClick("ai-assistant"), feature: "ai-assistant" },
    { icon: Route, label: "Smart Planner", description: "Plan your journey", action: () => handleFeatureClick("itinerary-planner"), feature: "itinerary-planner" },
    { icon: Sparkles, label: "AI Recommendations", description: "Discover hidden gems", action: () => handleFeatureClick("ai-recommendations"), feature: "ai-recommendations" },
    { icon: TrendingUp, label: "Travel Analytics", description: "View insights", action: () => handleFeatureClick("travel-analytics"), feature: "travel-analytics" },
    { icon: Share2, label: "Social Hub", description: "Share adventures", action: () => handleFeatureClick("social-sharing"), feature: "social-sharing" },
    { icon: Trophy, label: "Travel Challenges", description: "Complete missions", action: () => handleFeatureClick("challenges"), feature: "challenges" },
    { icon: Camera, label: "AR Guide", description: "Explore with AR", action: () => handleFeatureClick("ar-guide"), feature: "ar-guide" },
  ];

  return (
    <header className="glass-effect sticky top-0 z-50 px-4 py-3 shadow-soft">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Home Button (only when viewing a specific feature) */}
        <div className="flex items-center space-x-3">
          {currentFeature && currentFeature !== "home" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeClick}
              className="p-2 hover:bg-orange-50 transition-all duration-200 hover:scale-105 active:scale-95"
              title="Back to Home"
            >
              <Home className="h-5 w-5 text-orange-600" />
            </Button>
          )}
        </div>

        {/* Center - Logo Section */}
        <div className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-xl p-2 shadow-soft group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Mountain className="h-6 w-6 md:h-8 md:w-8 text-gradient" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-display font-bold text-gradient">WanderWise</h1>
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-orange-500" />
              <span className="text-xs text-muted-foreground">AI Travel Companion</span>
            </div>
          </div>
          <div className="sm:hidden">
            <h1 className="text-lg font-display font-bold text-gradient">WanderWise</h1>
          </div>
        </div>

        {/* Right side - Three-line Menu */}
        <div className="flex items-center space-x-3">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-orange-50 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] md:w-[450px] lg:w-[500px] p-0 overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Header with Navigation Hub title */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-gradient-to-br from-orange-100 to-red-100 p-2 rounded-lg">
                      <Navigation className="h-5 w-5 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-display font-bold text-gradient">Navigation Hub</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">Access all your travel features</p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="p-6 space-y-6">
                    {/* Profile Features */}
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile & Settings
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {profileFeatures.map((feature, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            onClick={feature.action}
                            className="w-full justify-start text-left p-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-cyan-200 transition-all duration-200 group-hover:scale-110">
                                <feature.icon className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1 text-left">
                                <div className="font-medium text-sm">{feature.label}</div>
                                <div className="text-xs text-muted-foreground">{feature.description}</div>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Features */}
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                        <Compass className="h-4 w-4" />
                        Navigation Features
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {navigationFeatures.map((feature, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            onClick={feature.action}
                            className="w-full justify-start text-left p-3 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 group hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-gradient-to-br from-orange-100 to-red-100 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-200 group-hover:scale-110">
                                <feature.icon className="h-4 w-4 text-orange-600" />
                              </div>
                              <div className="flex-1 text-left">
                                <div className="font-medium text-sm">{feature.label}</div>
                                <div className="text-xs text-muted-foreground">{feature.description}</div>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Sign Out */}
                    <div className="pt-6 border-t border-gray-200">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-left p-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 group hover:scale-[1.02] active:scale-[0.98]"
                        onClick={() => handleFeatureClick("sign-out")}
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">Sign Out</div>
                          <div className="text-xs text-muted-foreground">Log out of your account</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};