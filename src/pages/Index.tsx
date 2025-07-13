
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
import { ProfileManager } from "@/components/ProfileManager";
import MainFeed from "@/components/MainFeed";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

const Index = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [currentFeature, setCurrentFeature] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Set to true for demo

  const handleSearch = (city: string) => {
    console.log("Searching for city:", city);
    setSearchCity(city);
    setShowResults(true);
    setCurrentFeature("");
  };

  const handleNavigationToggle = () => {
    // Navigate directly to Navigation Dashboard
    setCurrentFeature("navigation");
    setShowResults(false);
  };

  const handleNavigateToFeature = (feature: string) => {
    console.log("Navigating to feature:", feature);
    if (feature === "home") {
      setCurrentFeature("");
      setShowResults(false);
    } else {
      setCurrentFeature(feature);
      setShowResults(false);
    }
  };

  // Render specific feature components
  const renderFeatureComponent = () => {
    switch (currentFeature) {
      case "navigation":
        return <NavigationDashboard />;
      case "ai-assistant":
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto px-4">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Mic className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">AI Travel Assistant</h2>
              <p className="text-muted-foreground mb-8">Your voice-activated travel companion</p>
              <div className="space-y-4 text-left max-w-md mx-auto mb-8">
                <p className="text-sm text-muted-foreground">• "Plan a 3-day trip to Paris"</p>
                <p className="text-sm text-muted-foreground">• "Find the best restaurants nearby"</p>
                <p className="text-sm text-muted-foreground">• "Translate this menu"</p>
                <p className="text-sm text-muted-foreground">• "What's the weather like?"</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Mic className="h-4 w-4 mr-2" />
                Start Voice Assistant
              </Button>
            </div>
          </div>
        );
      case "travel-analytics":
        return <TravelAnalytics />;
      case "itinerary-planner":
        return <SmartItineraryPlanner />;
      case "social-sharing":
        return <SocialSharing />;
      case "ai-recommendations":
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
              <p className="text-muted-foreground">Discover hidden gems and personalized recommendations</p>
            </div>
          </div>
        );
      case "challenges":
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Travel Challenges</h2>
              <p className="text-muted-foreground">Complete missions and earn rewards</p>
            </div>
          </div>
        );
      case "ar-guide":
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">AR Travel Guide</h2>
              <p className="text-muted-foreground">Explore cities with augmented reality</p>
            </div>
          </div>
        );
      case "profile":
        return <ProfileManager />;
      case "sign-out":
        setIsLoggedIn(false);
        return null;
      default:
        return null;
    }
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
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

        <HeroSection onSearch={handleSearch} />
        <FeatureHighlights />
      </div>
    );
  }

  // If a specific feature is selected, show that feature
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
          currentFeature={currentFeature}
        />
        
        <div className="animate-scale-in">
          {renderFeatureComponent()}
        </div>
      </div>
    );
  }

  // Main logged-in view - Travel Feed
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
        currentFeature={currentFeature}
      />
      
      {!showResults ? (
        <div className="animate-fade-in-up">
          <MainFeed />
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
