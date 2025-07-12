
import { useState } from "react";
import { Search, MapPin, Sparkles, Menu, X, Navigation, Compass, Globe, Heart, TrendingUp, Clock, Users, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchHeaderProps {
  onSearch: (city: string) => void;
  onNavigationToggle?: () => void;
  onNavigateToFeature?: (feature: string) => void;
}

export const SearchHeader = ({ onSearch, onNavigationToggle, onNavigateToFeature }: SearchHeaderProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setIsSheetOpen(false);
    }
  };

  const handleQuickSearch = (city: string) => {
    onSearch(city);
    setIsSheetOpen(false);
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

  const popularCities = ["Paris", "Tokyo", "New York", "Barcelona", "Rome"];

  const profileFeatures = [
    { icon: User, label: "My Profile", description: "View and edit your profile", action: () => handleFeatureClick("profile") },
    { icon: Heart, label: "Liked Posts", description: "Posts you've liked", action: () => handleFeatureClick("liked-posts") },
    { icon: Settings, label: "Settings", description: "App preferences and settings", action: () => handleFeatureClick("settings") },
  ];

  const navigationFeatures = [
    { icon: Compass, label: "Navigation Hub", description: "Access all navigation features", action: () => handleNavigationClick(), feature: "navigation" },
    { icon: Globe, label: "Interactive Map", description: "Explore destinations visually", action: () => handleFeatureClick("interactive-map"), feature: "interactive-map" },
    { icon: Heart, label: "Saved Places", description: "Your favorite destinations", action: () => handleFeatureClick("saved-places"), feature: "saved-places" },
    { icon: TrendingUp, label: "Travel Analytics", description: "View your travel insights", action: () => handleFeatureClick("travel-analytics"), feature: "travel-analytics" },
    { icon: Clock, label: "Itinerary Planner", description: "Plan your perfect trip", action: () => handleFeatureClick("itinerary-planner"), feature: "itinerary-planner" },
    { icon: Users, label: "Social Sharing", description: "Share your adventures", action: () => handleFeatureClick("social-sharing"), feature: "social-sharing" },
  ];

  return (
    <header className="glass-effect sticky top-0 z-50 px-4 py-3 shadow-soft">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Profile Icon (Left) */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFeatureClick("profile")}
            className="p-2 hover:bg-orange-50"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-orange-100 to-red-100 text-orange-600 text-sm">
                A
              </AvatarFallback>
            </Avatar>
          </Button>
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative bg-white rounded-xl p-2 shadow-soft">
                <MapPin className="h-6 w-6 md:h-8 md:w-8 text-gradient" />
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
        </div>
        
        {/* Desktop Search */}
        {!isMobile && (
          <form onSubmit={handleSubmit} className="flex items-center space-x-3 max-w-md w-full">
            <div className="relative flex-1 group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative flex items-center bg-white/90 backdrop-blur-sm rounded-xl border border-orange-200/50 overflow-hidden shadow-soft">
                <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Enter your destination city..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="gradient-bg hover:opacity-90 transition-all duration-300 shadow-soft-hover text-white font-medium"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        )}

        {/* Mobile Navigation Hub */}
        {isMobile && (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0">
              <div className="p-6 h-full flex flex-col">
                {/* Header with Navigation Hub title */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="bg-gradient-to-br from-orange-100 to-red-100 p-2 rounded-lg">
                    <Navigation className="h-5 w-5 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-gradient">Navigation Hub</h2>
                </div>

                {/* Search Section */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Search Destination
                  </h3>
                  <form onSubmit={handleSubmit} className="mb-4">
                    <div className="relative group mb-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl blur-md opacity-20"></div>
                      <div className="relative flex items-center bg-white/90 backdrop-blur-sm rounded-xl border border-orange-200/50 overflow-hidden shadow-soft">
                        <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
                        <Input
                          type="text"
                          placeholder="Enter your destination city..."
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          className="pl-10 pr-4 py-3 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400 text-base"
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full gradient-bg hover:opacity-90 transition-all duration-300 shadow-soft-hover text-white font-medium py-3"
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </form>

                  {/* Quick Search Options */}
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Popular Destinations</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {popularCities.map((city) => (
                        <Button
                          key={city}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickSearch(city)}
                          className="justify-start text-sm py-2 px-3 rounded-lg border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                        >
                          {city}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile Features */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </h3>
                  <div className="space-y-2">
                    {profileFeatures.map((feature, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        onClick={feature.action}
                        className="w-full justify-start text-left p-3 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-blue-200 group-hover:to-cyan-200 transition-colors">
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
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Compass className="h-4 w-4" />
                    Navigation Features
                  </h3>
                  <div className="space-y-2">
                    {navigationFeatures.map((feature, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        onClick={feature.action}
                        className="w-full justify-start text-left p-3 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-orange-100 to-red-100 p-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-orange-200 group-hover:to-red-200 transition-colors">
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
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left p-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
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
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};
