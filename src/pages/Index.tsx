
import { useState } from "react";
import { SearchHeader } from "@/components/SearchHeader";
import { HeroSection } from "@/components/HeroSection";
import { RecommendationResults } from "@/components/RecommendationResults";
import { FeatureHighlights } from "@/components/FeatureHighlights";
import { NavigationDashboard } from "@/components/NavigationDashboard";
import { Button } from "@/components/ui/button";
import { Navigation, Sparkles } from "lucide-react";

const Index = () => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

  const handleSearch = (city: string) => {
    console.log("Searching for city:", city);
    setSearchCity(city);
    setShowResults(true);
    setShowNavigation(false);
  };

  const handleNavigationToggle = () => {
    setShowNavigation(!showNavigation);
    setShowResults(false);
  };

  if (showNavigation) {
    return <NavigationDashboard />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 -z-10"></div>
      
      {/* Floating background elements */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl floating-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl floating-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <SearchHeader onSearch={handleSearch} />
      
      {/* Enhanced Navigation Hub Button */}
      <div className="fixed top-24 right-6 z-40">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <Button
            onClick={handleNavigationToggle}
            className="relative gradient-bg shadow-soft-hover hover:scale-105 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-2xl"
            size="lg"
          >
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              <span>Navigation Hub</span>
              <Sparkles className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </div>
      
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
