
import { useState } from "react";
import { SearchHeader } from "@/components/SearchHeader";
import { HeroSection } from "@/components/HeroSection";
import { RecommendationResults } from "@/components/RecommendationResults";
import { FeatureHighlights } from "@/components/FeatureHighlights";
import { NavigationDashboard } from "@/components/NavigationDashboard";
import { InteractiveMap } from "@/components/InteractiveMap";
import { TravelAnalytics } from "@/components/TravelAnalytics";
import { SmartItineraryPlanner } from "@/components/SmartItineraryPlanner";
import { SocialSharing } from "@/components/SocialSharing";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const [currentFeature, setCurrentFeature] = useState<string>("");
  const isMobile = useIsMobile();

  const handleSearch = (city: string) => {
    console.log("Searching for city:", city);
    setSearchCity(city);
    setShowResults(true);
    setShowNavigation(false);
    setCurrentFeature("");
  };

  const handleNavigationToggle = () => {
    setShowNavigation(!showNavigation);
    setShowResults(false);
    setCurrentFeature("");
  };

  const handleNavigateToFeature = (feature: string) => {
    console.log("Navigating to feature:", feature);
    setCurrentFeature(feature);
    setShowResults(false);
    setShowNavigation(false);
  };

  // Render specific feature components
  const renderFeatureComponent = () => {
    switch (currentFeature) {
      case "navigation":
        return <NavigationDashboard />;
      case "interactive-map":
        return <InteractiveMap />;
      case "travel-analytics":
        return <TravelAnalytics />;
      case "itinerary-planner":
        return <SmartItineraryPlanner />;
      case "social-sharing":
        return <SocialSharing />;
      case "saved-places":
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Saved Places</h2>
              <p className="text-muted-foreground">Your favorite destinations will appear here</p>
            </div>
          </div>
        );
      case "my-trips":
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">My Trips</h2>
              <p className="text-muted-foreground">Your travel history will appear here</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (showNavigation) {
    return <NavigationDashboard />;
  }

  if (currentFeature) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 -z-10"></div>
        
        {/* Floating background elements */}
        <div className="fixed inset-0 -z-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-2xl md:blur-3xl floating-animation"></div>
          <div className="absolute top-3/4 right-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '4s' }}></div>
        </div>

        <SearchHeader 
          onSearch={handleSearch} 
          onNavigationToggle={handleNavigationToggle}
          onNavigateToFeature={handleNavigateToFeature}
        />
        
        <div className="animate-scale-in">
          {renderFeatureComponent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 -z-10"></div>
      
      {/* Floating background elements - reduced on mobile */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-2xl md:blur-3xl floating-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl md:blur-2xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <SearchHeader 
        onSearch={handleSearch} 
        onNavigationToggle={handleNavigationToggle}
        onNavigateToFeature={handleNavigateToFeature}
      />
      
      {!showResults ? (
        <div className="animate-fade-in-up">
          <HeroSection onSearch={handleSearch} />
          <FeatureHighlights />
        </div>
      ) : (
        <div className="animate-scale-in">
          <RecommendationResults city={searchCity} onNewSearch={() => setShowResults(false)} />
        </div>
      )}
    </div>
  );
};

export default Index;
